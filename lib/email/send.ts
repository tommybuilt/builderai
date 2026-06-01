// Resend HTTP-API email sender for BuilderAI.
//
// Why fetch instead of the `resend` npm package: the package adds an extra
// dependency and historically has had bundling issues on Cloudflare Workers
// edge runtimes. The HTTP API is two endpoints; fetching them directly works
// on every runtime we care about (Cloudflare Pages OpenNext server, Edge,
// Node) without configuration.
//
// Usage:
//   import { sendEmail, notifyAdmins } from '@/lib/email'
//   import { magicLinkLogin } from '@/lib/email/templates/magic_link_login'
//
//   const { subject, html } = magicLinkLogin({ variant: 'admin', magic_link_url })
//   await sendEmail({ to: 'someone@example.com', subject, html })

import { createClient } from '@supabase/supabase-js'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

export interface SendEmailArgs {
  to: string | string[]
  subject: string
  html: string
  /** Optional Reply-To override. Defaults to the support address. */
  replyTo?: string
}

export interface SendEmailResult {
  /** Resend message id, present on success. */
  id?: string
  error?: string
}

function getFromAddress(): string {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'notifications@builderai.tools'
  // Friendly From with the BuilderAI display name.
  return `BuilderAI <${fromEmail}>`
}

/**
 * Send a transactional email via Resend.
 *
 * Returns `{ error }` rather than throwing so callers can decide whether a
 * failed email should fail the whole request (it usually shouldn't; the user
 * already got their success response from /api/submit by the time this fires).
 */
export async function sendEmail(args: SendEmailArgs): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[email] RESEND_API_KEY not set; skipping send to', args.to)
    return { error: 'RESEND_API_KEY not configured' }
  }

  const payload = {
    from: getFromAddress(),
    to: args.to,
    subject: args.subject,
    html: args.html,
    ...(args.replyTo ? { reply_to: args.replyTo } : {}),
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}))
      const message = `Resend ${res.status}: ${JSON.stringify(errorBody)}`
      console.error('[email] send failed:', message)
      return { error: message }
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string }
    return { id: data.id }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[email] send threw:', message)
    return { error: message }
  }
}

// ---------------------------------------------------------------------------
// Admin allowlist + notifyAdmins()
// ---------------------------------------------------------------------------

interface AdminEmailsCache {
  value: string[]
  expiresAt: number
}

const ADMIN_EMAILS_CACHE_TTL_MS = 60_000
let adminEmailsCache: AdminEmailsCache | null = null

/**
 * Read the admin email allowlist from `site_settings.admin_emails`.
 *
 * In-process cache for 60 seconds: fine because admin_emails changes rarely
 * and this function is called from email-sending paths that are already async
 * and tolerate slight staleness. Cold isolates pay one DB round trip.
 *
 * Uses the public anon key because `site_settings` has a public SELECT RLS
 * policy. No service-role secret needed for a read.
 */
export async function getAdminEmails(): Promise<string[]> {
  const now = Date.now()
  if (adminEmailsCache && adminEmailsCache.expiresAt > now) {
    return adminEmailsCache.value
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    console.error('[email] Supabase URL or anon key missing; cannot read admin_emails')
    return []
  }

  const supabase = createClient(url, anonKey, { auth: { persistSession: false } })
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'admin_emails')
    .maybeSingle()

  if (error) {
    console.error('[email] Failed to read admin_emails:', error.message)
    return []
  }

  let emails: string[] = []
  if (data?.value && Array.isArray(data.value)) {
    emails = data.value.filter((v): v is string => typeof v === 'string' && v.length > 0)
  }

  adminEmailsCache = { value: emails, expiresAt: now + ADMIN_EMAILS_CACHE_TTL_MS }
  return emails
}

/**
 * Send the same email to every address in the admin allowlist.
 *
 * Returns the Resend result. If the allowlist is empty, logs and returns
 * `{ error: 'No admin emails configured' }` rather than throwing, so the
 * caller's main flow keeps working even when admin notifications are
 * temporarily misconfigured.
 */
export async function notifyAdmins(args: {
  subject: string
  html: string
  replyTo?: string
}): Promise<SendEmailResult> {
  const admins = await getAdminEmails()
  if (admins.length === 0) {
    console.warn('[email] No admin_emails in site_settings; skipping admin notification')
    return { error: 'No admin emails configured' }
  }

  return sendEmail({
    to: admins,
    subject: args.subject,
    html: args.html,
    replyTo: args.replyTo,
  })
}

/** Test-only: clear the in-process cache so tests can re-read fresh values. */
export function _resetAdminEmailsCacheForTesting() {
  adminEmailsCache = null
}
