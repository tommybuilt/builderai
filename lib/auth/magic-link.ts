import { createAdminClient } from '@/lib/supabase/admin'

// Build a magic-link URL pointing at our own /auth/confirm route.
//
// Why not signInWithOtp: the cookie-aware server-client + signInWithOtp path
// stores a PKCE verifier in cookies, which means the click must happen in the
// same browser session as the request. That's a poor UX (and frequent failure
// mode) when the user requests the link from one browser and clicks from
// another (mobile mail app, default-browser desktop client, etc).
//
// Instead: admin.generateLink returns a hashed_token we embed in our own URL.
// The /auth/confirm route uses verifyOtp({ token_hash, type }) which works
// without a verifier cookie and works across browser sessions.
//
// linkType behavior:
//   - 'magiclink': one direct call. Used by admin signin where the user must
//     already exist in auth.users. If the user does not exist, generateLink
//     errors and we throw.
//   - 'invite': used by claim and rating flows where the email may or may not
//     already have an auth.users row. Tries invite first; if Supabase rejects
//     because the user already exists, falls back to a magiclink call. The
//     constructed /auth/confirm URL carries the type marker that matches the
//     call that succeeded, so verifyOtp on the other end verifies the right
//     token shape.
//
// Note on 'signup': Supabase's GenerateSignupLinkParams requires a `password`
// argument, so it can't share the same shape as 'magiclink' / 'invite'. If a
// later phase needs 'signup', extend GenerateAuthLinkOpts into a discriminated
// union (signup branch carrying a `password` field) and switch internally.

const SITE_URL = 'https://builderai.tools'

export type AuthLinkType = 'magiclink' | 'invite'

export interface GenerateAuthLinkOpts {
  email: string
  linkType: AuthLinkType
  /** Same-origin path beginning with `/`, e.g. `/admin`. */
  redirectPath: string
}

function buildConfirmUrl(
  hashedToken: string,
  type: AuthLinkType,
  encodedNext: string,
): string {
  return (
    `${SITE_URL}/auth/confirm` +
    `?token_hash=${encodeURIComponent(hashedToken)}` +
    `&type=${encodeURIComponent(type)}` +
    `&next=${encodedNext}`
  )
}

// Conservative match: only fall back when Supabase clearly indicates the
// email is already registered. Any other error (network, missing service
// role key, malformed request) must surface so we can debug rather than
// silently swallowing into a magiclink call that may also fail.
function isUserExistsError(error: { message?: string; status?: number; code?: string } | null): boolean {
  if (!error) return false
  if (error.status === 422) return true
  const code = (error.code ?? '').toLowerCase()
  if (code === 'email_exists' || code === 'user_already_exists' || code === 'email_already_in_use') {
    return true
  }
  const msg = (error.message ?? '').toLowerCase()
  if (!msg) return false
  return (
    msg.includes('already registered') ||
    msg.includes('already exists') ||
    msg.includes('already invited') ||
    msg.includes('user already')
  )
}

export async function generateAuthLink(
  opts: GenerateAuthLinkOpts,
): Promise<{ url: string }> {
  const { email, linkType, redirectPath } = opts

  const encodedNext = encodeURIComponent(redirectPath)
  const redirectTo = `${SITE_URL}/auth/confirm?next=${encodedNext}`

  const supabase = createAdminClient()

  if (linkType === 'magiclink') {
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo },
    })
    if (error) {
      throw new Error(`generateLink magiclink failed: ${error.message}`)
    }
    const hashedToken = data?.properties?.hashed_token
    if (!hashedToken) {
      throw new Error('generateLink magiclink failed: missing hashed_token in response')
    }
    return { url: buildConfirmUrl(hashedToken, 'magiclink', encodedNext) }
  }

  // linkType === 'invite'. Try invite first.
  const inviteResp = await supabase.auth.admin.generateLink({
    type: 'invite',
    email,
    options: { redirectTo },
  })

  if (!inviteResp.error && inviteResp.data?.properties?.hashed_token) {
    return {
      url: buildConfirmUrl(inviteResp.data.properties.hashed_token, 'invite', encodedNext),
    }
  }

  if (isUserExistsError(inviteResp.error as never)) {
    const emailDomain = email.split('@')[1] ?? 'unknown'
    console.log(`[auth-link] invite indicated user-exists, falling back to magiclink domain=${emailDomain}`)
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo },
    })
    if (error) {
      throw new Error(`generateLink magiclink fallback failed: ${error.message}`)
    }
    const hashedToken = data?.properties?.hashed_token
    if (!hashedToken) {
      throw new Error('generateLink magiclink fallback failed: missing hashed_token in response')
    }
    return { url: buildConfirmUrl(hashedToken, 'magiclink', encodedNext) }
  }

  // Invite errored for a non-user-exists reason or returned no token. Surface it.
  throw new Error(
    `generateLink invite failed: ${inviteResp.error?.message ?? 'missing hashed_token in response'}`,
  )
}
