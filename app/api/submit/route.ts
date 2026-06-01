import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import {
  sendEmail,
  notifyAdmins,
  submissionReceived,
  submissionAdminNotification,
} from '@/lib/email'

// Node.js runtime under OpenNext for Cloudflare. getCloudflareContext()
// surfaces the KV binding and Pages env vars from this request handler.
// Edge runtime is intentionally NOT used here: OpenNext does not bundle
// edge-runtime route handlers in this project's configuration.
export const dynamic = 'force-dynamic'

const RATE_LIMIT_PER_IP_PER_DAY = 3
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

// Minimal Cloudflare types so the file compiles under the main tsconfig
// (which does not pull in @cloudflare/workers-types).
interface KVNamespace {
  get(key: string): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
}

interface CloudflareEnv {
  RATE_LIMIT_KV: KVNamespace
  TURNSTILE_SECRET_KEY?: string
  SUPABASE_SERVICE_ROLE_KEY?: string
  NEXT_PUBLIC_SUPABASE_URL?: string
  SUPABASE_URL?: string
}

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  const formData = new FormData()
  formData.append('secret', secret)
  formData.append('response', token)
  formData.append('remoteip', ip)

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  })

  const json = (await result.json().catch(() => ({}))) as { success?: boolean }
  return json.success === true
}

async function checkAndIncrementRateLimit(
  kv: KVNamespace,
  ip: string,
): Promise<{ allowed: boolean; remaining: number }> {
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD UTC
  const key = `submit:${ip}:${today}`
  const current = await kv.get(key)
  const count = current ? parseInt(current, 10) : 0

  if (count >= RATE_LIMIT_PER_IP_PER_DAY) {
    return { allowed: false, remaining: 0 }
  }

  // 25-hour TTL: counter naturally expires the day after.
  await kv.put(key, String(count + 1), { expirationTtl: 60 * 60 * 25 })
  return { allowed: true, remaining: RATE_LIMIT_PER_IP_PER_DAY - count - 1 }
}

interface SubmitBody {
  name?: unknown
  github_url?: unknown
  website_url?: unknown
  description?: unknown
  category_slug?: unknown
  tags?: unknown
  email?: unknown
  turnstile_token?: unknown
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

export async function POST(req: NextRequest) {
  const cfCtx = getCloudflareContext()
  const env = cfCtx.env as unknown as CloudflareEnv

  // 1) Client IP. Cloudflare always sets cf-connecting-ip; fall back for tests.
  const ip =
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'

  // 2) Parse body
  let body: SubmitBody
  try {
    body = (await req.json()) as SubmitBody
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const name = asString(body.name)?.trim()
  const email = asString(body.email)?.trim().toLowerCase()
  const turnstileToken = asString(body.turnstile_token)
  const githubUrl = asString(body.github_url)?.trim()
  const websiteUrl = asString(body.website_url)?.trim()
  const description = asString(body.description)?.trim()
  const categorySlug = asString(body.category_slug)?.trim() || null
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === 'string') : null

  // 3) Required-field validation. Server-side; do not trust the client.
  if (!name || name.length < 1 || name.length > 200) {
    return NextResponse.json({ error: 'Tool name is required (1 to 200 characters)' }, { status: 400 })
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
  }
  if (!turnstileToken) {
    return NextResponse.json({ error: 'Verification challenge missing' }, { status: 400 })
  }
  if (description && description.length > 5000) {
    return NextResponse.json({ error: 'Description too long (max 5000 characters)' }, { status: 400 })
  }

  // 4) Verify Turnstile token with Cloudflare
  if (!env.TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY env var not set on Pages project')
    return NextResponse.json({ error: 'Submission verification not configured' }, { status: 503 })
  }
  const turnstileOk = await verifyTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET_KEY)
  if (!turnstileOk) {
    return NextResponse.json({ error: 'Verification challenge failed. Please try again.' }, { status: 400 })
  }

  // 5) Rate limit by IP via KV
  if (!env.RATE_LIMIT_KV) {
    console.error('RATE_LIMIT_KV binding missing in Cloudflare environment')
    return NextResponse.json({ error: 'Submission rate limiter not configured' }, { status: 503 })
  }
  const rl = await checkAndIncrementRateLimit(env.RATE_LIMIT_KV, ip)
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: `Daily submission limit reached. You can submit up to ${RATE_LIMIT_PER_IP_PER_DAY} tools per day. Please try again tomorrow.`,
      },
      { status: 429 },
    )
  }

  // 6) Insert via Supabase service role (bypasses RLS for trusted server context).
  //    Falls back to process.env for local dev; OpenNext exposes Pages env vars on
  //    process.env at build time for plaintext vars and on cfCtx.env for runtime.
  const supabaseUrl =
    env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    console.error('Supabase URL or service role key missing in env')
    return NextResponse.json({ error: 'Submission storage not configured' }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  })

  // Ban check. Service-role client bypasses RLS so the SECURITY DEFINER
  // is_request_banned function works. We only check IP and email here:
  // anonymous submissions have no user_id to check, and a banned signed-
  // in user is already caught by the middleware before this route runs.
  // Generic 403 message keeps the response indistinguishable from a
  // policy refusal so banned users can't probe ban state.
  try {
    const { data: banned, error: banErr } = await supabase.rpc('is_request_banned', {
      p_user_id: null,
      p_ip: ip === 'unknown' ? null : ip,
      p_email: email,
    })
    if (banErr) {
      console.error('[submit] is_request_banned rpc failed: ' + banErr.message)
    } else if (banned === true) {
      console.log(`[submit] blocked by ban check ip_prefix=${ip.slice(0, 8)}`)
      return NextResponse.json({ error: 'Submission not allowed' }, { status: 403 })
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[submit] is_request_banned threw: ' + message)
    // Fail-open: surface other errors to logs but proceed with the insert.
  }

  const { data: insertedRow, error: insertError } = await supabase
    .from('submissions')
    .insert({
      submitted_name: name,
      submitted_url: websiteUrl || null,
      submitted_github_url: githubUrl || null,
      submitted_description: description || null,
      submitted_category_slug: categorySlug,
      submitted_tags: tags,
      submitter_email: email,
      submitter_user_id: null, // anonymous submission
      submitter_ip: ip === 'unknown' ? null : ip,
      status: 'pending',
    })
    .select('id')
    .single()

  if (insertError || !insertedRow) {
    console.error('Submission insert failed:', insertError)
    return NextResponse.json({ error: 'Failed to save submission. Please try again.' }, { status: 500 })
  }

  // Send submitter ack + admin notification in parallel and AWAIT the
  // result. Cloudflare Pages Functions cancels pending promises after the
  // response returns; fire-and-forget here was silently dropping every
  // email. Awaiting blocks the response by ~500-2000ms (typical Resend
  // round trip) but guarantees delivery attempts and real log lines.
  //
  // Promise.allSettled (not Promise.all) so one failure does not silence
  // the other's logging. allSettled itself never throws; the surrounding
  // try/catch is belt-and-braces against template-rendering throws or env
  // misconfiguration that fires before the Resend POST.
  const submitterTpl = submissionReceived({ tool_name: name })
  const adminTpl = submissionAdminNotification({
    tool_name: name,
    submitter_email: email,
    github_url: githubUrl || null,
    description: description || null,
    submission_id: insertedRow.id,
  })

  try {
    const emailResults = await Promise.allSettled([
      sendEmail({ to: email, subject: submitterTpl.subject, html: submitterTpl.html }),
      notifyAdmins({ subject: adminTpl.subject, html: adminTpl.html }),
    ])

    emailResults.forEach((r, i) => {
      const which = i === 0 ? 'submitter' : 'admin'
      if (r.status === 'rejected') {
        const reason = r.reason instanceof Error ? r.reason.message : String(r.reason)
        console.error(`[submit] email ${which} failed: ${reason}`)
      } else if (r.value?.error) {
        console.error(`[submit] email ${which} resend error: ${r.value.error}`)
      } else {
        console.log(`[submit] email ${which} sent resend_id=${r.value?.id ?? 'unknown'}`)
      }
    })
  } catch (err) {
    // The submission insert has already committed; do not 500 the response
    // for an email-side failure. Log and fall through.
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[submit] unexpected email error: ${message}`)
  }

  return NextResponse.json({
    success: true,
    message: 'Thanks. Your submission is in our review queue.',
    remaining_today: rl.remaining,
  })
}
