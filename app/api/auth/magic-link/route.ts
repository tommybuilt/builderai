import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { verifyTurnstile, clientIpFromRequest } from '@/lib/turnstile'
import { generateAuthLink } from '@/lib/auth/magic-link'
import { sendEmail, magicLinkLogin, getAdminEmails } from '@/lib/email'
import { createAdminClient } from '@/lib/supabase/admin'

// POST /api/auth/magic-link
//
// Body: { email, intent: 'admin' | 'claim' | 'rating', turnstile_token, context? }
//
// Phase B implemented the 'admin' intent. Phase C-1 adds the 'claim' intent,
// gated on submission email match and tool not yet claimed. 'rating' remains
// a not-implemented placeholder that returns the same generic OK so the
// client cannot probe which intents are wired up.
//
// Privacy invariant: every successful path through this route returns the same
// JSON shape. We never reveal whether the email is in the allowlist, whether
// the email matches the submission's submitter_email, or whether an email
// actually went out. Errors are logged server-side only.

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface MagicLinkBody {
  email?: unknown
  intent?: unknown
  turnstile_token?: unknown
  context?: unknown
}

interface CloudflareEnv {
  TURNSTILE_SECRET_KEY?: string
}

function asString(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined
}

// Built fresh on every call. The previous implementation had a module-level
// constant which is fragile in Next route handlers and was also implicated in
// the cookie-write debug we did before switching off PKCE.
function genericOk() {
  return NextResponse.json({
    message: 'If that email is allowed to sign in, a link has been sent.',
  })
}

export async function POST(req: NextRequest) {
  try {
    const cfCtx = getCloudflareContext()
    const env = cfCtx.env as unknown as CloudflareEnv
    const ip = clientIpFromRequest(req.headers)

    let body: MagicLinkBody
    try {
      body = (await req.json()) as MagicLinkBody
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const email = asString(body.email)?.trim().toLowerCase()
    const intent = asString(body.intent)
    const turnstileToken = asString(body.turnstile_token)
    const contextRaw = body.context
    const context =
      contextRaw && typeof contextRaw === 'object' && !Array.isArray(contextRaw)
        ? (contextRaw as Record<string, unknown>)
        : null

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }

    if (intent !== 'admin' && intent !== 'claim' && intent !== 'rating') {
      return NextResponse.json({ error: 'Unknown intent' }, { status: 400 })
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: 'Verification challenge missing' }, { status: 400 })
    }

    if (!env.TURNSTILE_SECRET_KEY) {
      console.error('[magic-link] TURNSTILE_SECRET_KEY not set on Pages project')
      return NextResponse.json({ error: 'Sign-in is not configured' }, { status: 503 })
    }

    const turnstile = await verifyTurnstile(turnstileToken, ip, env.TURNSTILE_SECRET_KEY)
    if (!turnstile.ok) {
      return NextResponse.json({ error: 'Verification challenge failed. Please try again.' }, { status: 400 })
    }

    const emailDomain = email.split('@')[1] ?? 'unknown'

    // Ban check before any handler runs. Returns the same generic OK so
    // the response shape stays indistinguishable from a successful flow,
    // matching the privacy invariant documented at the top of this file.
    // We use the service-role admin client so the SECURITY DEFINER RPC
    // executes regardless of the caller's role.
    try {
      const adminClient = createAdminClient()
      const { data: banned, error: banErr } = await adminClient.rpc('is_request_banned', {
        p_user_id: null,
        p_ip: ip === 'unknown' ? null : ip,
        p_email: email,
      })
      if (banErr) {
        console.error('[magic-link] is_request_banned rpc failed: ' + banErr.message)
      } else if (banned === true) {
        console.log(`[magic-link] blocked by ban check intent=${String(intent)} domain=${emailDomain}`)
        return genericOk()
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[magic-link] is_request_banned threw: ' + message)
      // Fail-open: continue on rpc errors rather than locking the magic
      // link flow when the bans plumbing is unavailable.
    }

    if (intent === 'rating') {
      await handleRatingIntent({ email, emailDomain, context })
      return genericOk()
    }

    if (intent === 'claim') {
      await handleClaimIntent({ email, emailDomain, context })
      return genericOk()
    }

    // intent === 'admin'
    const adminEmails = await getAdminEmails()
    const allowlisted = adminEmails.map((e) => e.toLowerCase()).includes(email)

    if (!allowlisted) {
      console.log(`[magic-link] admin intent rejected (not in allowlist) domain=${emailDomain}`)
      return genericOk()
    }

    try {
      const { url } = await generateAuthLink({
        email,
        linkType: 'magiclink',
        redirectPath: '/admin',
      })

      const { subject, html } = magicLinkLogin({
        variant: 'admin',
        magic_link_url: url,
      })

      const result = await sendEmail({ to: email, subject, html })
      if (result.error) {
        console.error('[magic-link] sendEmail failed: ' + result.error)
      } else {
        console.log(
          `[magic-link] sent domain=${emailDomain} resend_id=${result.id ?? 'unknown'}`,
        )
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[magic-link] admin send failed: ' + message)
    }

    return genericOk()
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[magic-link] unexpected error: ' + message)
    return genericOk()
  }
}

async function handleRatingIntent(args: {
  email: string
  emailDomain: string
  context: Record<string, unknown> | null
}): Promise<void> {
  const { email, emailDomain, context } = args

  try {
    const toolId =
      context && typeof context.tool_id === 'string' ? context.tool_id.trim() : null
    if (!toolId || !UUID_REGEX.test(toolId)) {
      console.log(`[magic-link] rating rejected (invalid tool_id) domain=${emailDomain}`)
      return
    }

    const ratingValue = context && typeof context.rating === 'number' ? context.rating : null
    if (ratingValue === null || !Number.isInteger(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      console.log(`[magic-link] rating rejected (invalid rating value) domain=${emailDomain}`)
      return
    }

    const commentRaw = context && context.comment
    let comment: string | null = null
    if (typeof commentRaw === 'string') {
      const trimmed = commentRaw.trim()
      if (trimmed.length > 2000) {
        console.log(`[magic-link] rating rejected (comment too long) domain=${emailDomain}`)
        return
      }
      comment = trimmed.length > 0 ? trimmed : null
    } else if (commentRaw !== null && commentRaw !== undefined) {
      console.log(`[magic-link] rating rejected (comment wrong type) domain=${emailDomain}`)
      return
    }

    const supabase = createAdminClient()

    const { data: toolRow, error: toolError } = await supabase
      .from('tools')
      .select('id, slug, name')
      .eq('id', toolId)
      .maybeSingle()

    if (toolError || !toolRow) {
      console.log(`[magic-link] rating rejected (tool not found) tool_id_prefix=${toolId.slice(0, 8)}`)
      return
    }

    const tool = toolRow as unknown as { id: string; slug: string; name: string }

    const { data: pending, error: insertError } = await (
      supabase.from('pending_ratings' as never) as unknown as {
        insert: (row: Record<string, unknown>) => {
          select: (cols: string) => {
            single: () => Promise<{ data: { id: string } | null; error: { message: string } | null }>
          }
        }
      }
    )
      .insert({
        email: email.toLowerCase().trim(),
        tool_id: toolId,
        rating: ratingValue,
        comment,
      })
      .select('id')
      .single()

    if (insertError || !pending) {
      console.error(
        '[magic-link] rating insert failed: ' + (insertError?.message ?? 'no row returned'),
      )
      return
    }

    console.log(`[magic-link] rating attempt domain=${emailDomain} tool_id=${tool.id}`)

    // invite (not magiclink) so brand-new emails without an auth.users record
    // can verify and post their first rating. generateAuthLink falls back to
    // magiclink internally if Supabase reports the email is already
    // registered, so existing users work too.
    const { url } = await generateAuthLink({
      email,
      linkType: 'invite',
      redirectPath: `/api/auth/finalize-rating?token=${pending.id}`,
    })

    const { subject, html } = magicLinkLogin({
      variant: 'rating',
      magic_link_url: url,
      tool_name: tool.name,
    })

    const result = await sendEmail({ to: email, subject, html })
    if (result.error) {
      console.error('[magic-link] rating sendEmail failed: ' + result.error)
    } else {
      console.log(
        `[magic-link] rating sent domain=${emailDomain} tool_id=${tool.id} resend_id=${result.id ?? 'unknown'}`,
      )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[magic-link] rating handler failed: ' + message)
  }
}

async function handleClaimIntent(args: {
  email: string
  emailDomain: string
  context: Record<string, unknown> | null
}): Promise<void> {
  const { email, emailDomain, context } = args

  try {
    const toolId =
      context && typeof context.tool_id === 'string' ? context.tool_id.trim() : null
    if (!toolId || !UUID_REGEX.test(toolId)) {
      console.log(`[magic-link] claim rejected (invalid tool_id) domain=${emailDomain}`)
      return
    }

    const supabase = createAdminClient()

    // Local type assertion: the new columns (source_submission_id,
    // claimed_by_user_id) are added by 20260508_phase_c_tool_ownership.sql
    // but lib/types/database.ts has not been regenerated yet.
    const { data: toolRow, error: toolError } = await supabase
      .from('tools')
      .select('id, name, claimed_by_user_id, source_submission_id')
      .eq('id', toolId)
      .maybeSingle()

    if (toolError || !toolRow) {
      console.log(`[magic-link] claim rejected (tool not found) tool_id_prefix=${toolId.slice(0, 8)}`)
      return
    }

    const tool = toolRow as unknown as {
      id: string
      name: string
      claimed_by_user_id: string | null
      source_submission_id: string | null
    }

    if (tool.claimed_by_user_id) {
      console.log(`[magic-link] claim rejected (already claimed) tool_id_prefix=${toolId.slice(0, 8)}`)
      return
    }

    if (!tool.source_submission_id) {
      console.log(`[magic-link] claim rejected (no source submission) tool_id_prefix=${toolId.slice(0, 8)}`)
      return
    }

    const { data: submission, error: submissionError } = await supabase
      .from('submissions')
      .select('submitter_email, status')
      .eq('id', tool.source_submission_id)
      .maybeSingle()

    if (submissionError || !submission) {
      console.log(
        `[magic-link] claim rejected (submission lookup failed) tool_id_prefix=${toolId.slice(0, 8)}`,
      )
      return
    }

    if (submission.status !== 'approved') {
      console.log(
        `[magic-link] claim rejected (submission status=${submission.status}) tool_id_prefix=${toolId.slice(0, 8)}`,
      )
      return
    }

    const submitterEmail = submission.submitter_email?.trim().toLowerCase() ?? ''
    if (submitterEmail !== email) {
      console.log(`[magic-link] claim rejected (email mismatch) domain=${emailDomain}`)
      return
    }

    console.log(`[magic-link] claim attempt domain=${emailDomain} tool_id=${tool.id}`)

    // invite (not magiclink) so submitters without an auth.users record can claim.
    // generateAuthLink falls back to magiclink internally if Supabase reports
    // the email is already registered, so existing users work too.
    const { url } = await generateAuthLink({
      email,
      linkType: 'invite',
      redirectPath: `/profile?claim=${tool.id}`,
    })

    const { subject, html } = magicLinkLogin({
      variant: 'claim',
      magic_link_url: url,
      tool_name: tool.name,
    })

    const result = await sendEmail({ to: email, subject, html })
    if (result.error) {
      console.error('[magic-link] claim sendEmail failed: ' + result.error)
    } else {
      console.log(
        `[magic-link] claim sent domain=${emailDomain} resend_id=${result.id ?? 'unknown'}`,
      )
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[magic-link] claim handler failed: ' + message)
  }
}
