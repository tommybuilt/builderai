import { NextRequest, NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

// GET /auth/confirm
//
// Verifies a magic-link token_hash issued by admin.generateLink, sets the
// resulting session in cookies via the cookie-aware server client, and
// redirects to ?next= (constrained to a same-origin path).
//
// This route does NOT require a PKCE verifier cookie. That's the whole point
// of the admin.generateLink + verifyOtp pattern. The user can request the
// link in one browser session and click it in another and the verification
// still works.

export const dynamic = 'force-dynamic'

const VALID_TYPES: ReadonlyArray<EmailOtpType> = ['magiclink', 'invite', 'signup', 'email']

function isValidType(value: unknown): value is EmailOtpType {
  return typeof value === 'string' && (VALID_TYPES as readonly string[]).includes(value)
}

function sanitizeNext(next: string | null): string {
  if (!next || !next.startsWith('/')) return '/'
  if (next.includes('//') || next.includes(':')) return '/'
  return next
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const tokenHash = params.get('token_hash')
  const type = params.get('type')
  const next = sanitizeNext(params.get('next'))

  if (!isValidType(type)) {
    console.error('[auth/confirm] invalid type param: ' + JSON.stringify(type))
    return NextResponse.redirect(new URL('/auth/auth-error?reason=invalid_type', request.url))
  }

  if (!tokenHash) {
    console.error('[auth/confirm] missing token_hash')
    return NextResponse.redirect(new URL('/auth/auth-error?reason=missing_token', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })

  if (error) {
    console.error(
      '[auth/confirm] verify failed: ' + error.message +
      ' type=' + type +
      ' token_prefix=' + tokenHash.slice(0, 8),
    )
    return NextResponse.redirect(new URL('/auth/auth-error?reason=verify_failed', request.url))
  }

  // Capture cf-connecting-ip for the bans system. profiles.last_known_ip
  // is the IP-history source on /admin/users/[id], and is also the IP
  // we feed into the ban check below. Update is fire-and-forget: a
  // failure here must not block sign-in. Falls back to x-forwarded-for
  // for non-Cloudflare environments (local dev).
  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && ip) {
    try {
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ last_known_ip: ip, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
      if (profileErr) {
        console.error('[auth/confirm] last_known_ip update failed: ' + profileErr.message)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[auth/confirm] last_known_ip update threw: ' + message)
    }
  }

  // Post-verify ban check. If the verified email/IP/user_id is banned,
  // sign the session out and redirect to /banned. The middleware would
  // catch this on the next request, but doing it here gives the user
  // an immediate, accurate page rather than a flash of the destination.
  if (user) {
    try {
      const { data: banned, error: banErr } = await supabase.rpc('is_request_banned', {
        p_user_id: user.id,
        p_ip: ip,
        p_email: user.email ?? null,
      })
      if (banErr) {
        console.error('[auth/confirm] is_request_banned rpc failed: ' + banErr.message)
      } else if (banned === true) {
        console.log(`[auth/confirm] verified user is banned domain=${(user.email ?? '').split('@')[1] ?? 'unknown'}`)
        await supabase.auth.signOut()
        return NextResponse.redirect(new URL('/banned', request.url))
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[auth/confirm] is_request_banned threw: ' + message)
    }
  }

  console.log('[auth/confirm] verify success type=' + type)
  return NextResponse.redirect(new URL(next, request.url))
}
