// DELETE IN PHASE E: legacy PKCE callback retained for in-flight links from prior deploys.
// New magic links use /auth/confirm with admin.generateLink + verifyOtp pattern.

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    console.error('[auth/callback] missing code param')
    return NextResponse.redirect(`${origin}/auth/auth-error?reason=missing_code`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('[auth/callback] exchange failed: ' + error.message)
    return NextResponse.redirect(`${origin}/auth/auth-error?reason=exchange_failed`)
  }

  // Constrain `next` to same-origin paths so an attacker cannot use the
  // redirect as an open-redirect surface.
  const safeNext = next.startsWith('/') ? next : '/'
  return NextResponse.redirect(`${origin}${safeNext}`)
}
