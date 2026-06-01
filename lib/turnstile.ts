// Cloudflare Turnstile server-side verification helper.
//
// Both /api/submit (anonymous tool submissions) and /api/auth/magic-link
// (admin sign-in / claim / rating verification) gate on a Turnstile
// challenge. This module centralizes the siteverify call so the secret
// key handling and response parsing live in one place.

const SITE_VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export interface TurnstileVerifyResult {
  ok: boolean
  /** Reason for failure when ok=false. Used for diagnostics, not user copy. */
  reason?: string
}

export async function verifyTurnstile(
  token: string,
  ip: string,
  secret: string,
): Promise<TurnstileVerifyResult> {
  if (!token) return { ok: false, reason: 'missing_token' }
  if (!secret) return { ok: false, reason: 'missing_secret' }

  const formData = new FormData()
  formData.append('secret', secret)
  formData.append('response', token)
  formData.append('remoteip', ip)

  let res: Response
  try {
    res = await fetch(SITE_VERIFY_ENDPOINT, { method: 'POST', body: formData })
  } catch (err) {
    return { ok: false, reason: `fetch_failed:${err instanceof Error ? err.message : String(err)}` }
  }

  const json = (await res.json().catch(() => ({}))) as { success?: boolean; 'error-codes'?: string[] }
  if (json.success === true) return { ok: true }
  return { ok: false, reason: (json['error-codes'] || []).join(',') || 'siteverify_rejected' }
}

/** Cloudflare always sets cf-connecting-ip; fall back to x-forwarded-for / 'unknown'. */
export function clientIpFromRequest(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}
