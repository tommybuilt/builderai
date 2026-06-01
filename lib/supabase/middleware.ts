import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function getRequiredEnv(name: string, fallbackName?: string) {
  const value = process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
  if (!value) {
    throw new Error(`Missing ${name}${fallbackName ? ` (or ${fallbackName})` : ''}`)
  }
  return value
}

// Admin gate: a session is required, and the authenticated email must appear
// in site_settings.admin_emails (JSONB array). Reading site_settings directly
// here keeps the gate consistent with the SQL is_admin() function used by RLS
// policies. site_settings has public SELECT RLS so the anon-key client can
// read it without elevation.
async function isAdminEmail(supabase: ReturnType<typeof createServerClient>, email: string | null): Promise<boolean> {
  if (!email) return false
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'admin_emails')
    .maybeSingle()
  if (error || !data?.value) return false
  if (!Array.isArray(data.value)) return false
  return (data.value as unknown[]).some((entry) => typeof entry === 'string' && entry.toLowerCase() === email.toLowerCase())
}

// Single round-trip ban check: returns true if the user_id, ip, OR email is
// on an active ban. Wraps the SQL function is_request_banned which lives in
// 20260514_add_bans.sql. NULL inputs are skipped at the SQL layer.
//
// Failure mode: if the RPC throws (e.g., DB outage, bans table missing on
// fresh deploy), we treat the request as NOT banned rather than locking the
// site. Loud-fail-shut would brick the entire site if the bans plumbing
// breaks; loud-fail-open keeps the site usable while logging.
async function isRequestBanned(
  supabase: ReturnType<typeof createServerClient>,
  userId: string | null,
  ip: string | null,
  email: string | null,
): Promise<boolean> {
  if (!userId && !ip && !email) return false
  try {
    const { data, error } = await supabase.rpc('is_request_banned', {
      p_user_id: userId,
      p_ip: ip,
      p_email: email,
    })
    if (error) {
      console.error('[middleware] is_request_banned rpc failed: ' + error.message)
      return false
    }
    return data === true
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[middleware] is_request_banned threw: ' + message)
    return false
  }
}

// Returns true if the path should be exempt from ban enforcement. Banned
// users still need to see the ban page, complete sign-out, and have static
// assets load. Auth-callback paths are exempt so a banned user clicking an
// old magic link still redirects cleanly to /banned via the post-callback
// flow rather than 500ing in the middle of OTP verification.
function isBanExemptPath(pathname: string): boolean {
  return (
    pathname === '/banned' ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  )
}

function getClientIp(request: NextRequest): string | null {
  const cf = request.headers.get('cf-connecting-ip')
  if (cf) return cf
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return null
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // API key loaded from environment variable. Never hardcode secrets.
  const supabaseUrl = getRequiredEnv('SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL')
  const supabaseAnonKey = getRequiredEnv('SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      // Explicit PKCE so the middleware's session-refresh path stays in
      // sync with the magic-link callback flow. @supabase/ssr defaults to
      // PKCE; this is documentation plus a guard.
      auth: { flowType: 'pkce' },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const ip = getClientIp(request)

  // Ban enforcement.
  //
  // Admins are exempt: create_ban() blocks self-bans server-side, and we
  // do not want a misconfigured ban (e.g., admin's IP on a public coffee-
  // shop network) to lock all admins out of /admin/bans where they would
  // need to clear it.
  //
  // /banned, /auth/*, /api/auth/*, and static assets are exempt so the
  // ban page itself loads, sign-out flows complete, and bot crawlers can
  // still fetch sitemap.xml and robots.txt.
  const userIsAdmin = user ? await isAdminEmail(supabase, user.email ?? null) : false
  if (!userIsAdmin && !isBanExemptPath(path)) {
    const banned = await isRequestBanned(
      supabase,
      user?.id ?? null,
      ip,
      user?.email ?? null,
    )
    if (banned) {
      // If the banned target was the user account, sign the session out
      // before redirecting so the cookie does not keep them in a half-
      // authenticated state on /banned.
      if (user) {
        await supabase.auth.signOut()
      }
      const url = request.nextUrl.clone()
      url.pathname = '/banned'
      url.search = ''
      return NextResponse.redirect(url)
    }
  }

  // Admin gate (magic-link era): visiting /admin or /admin/* requires a
  // session AND the user's email in site_settings.admin_emails.
  // /admin-signin is the public entry point that issues the magic link
  // and must NOT match this gate (it shares the /admin prefix without
  // the trailing slash so we exclude it explicitly).
  const isAdminRoute = path === '/admin' || path.startsWith('/admin/')
  if (isAdminRoute) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin-signin'
      url.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    if (!userIsAdmin) {
      // Sign the user out so a stale or non-admin session does not loop
      // back here, then send them home with a banner-friendly query param.
      await supabase.auth.signOut()
      const url = request.nextUrl.clone()
      url.pathname = '/'
      url.searchParams.set('auth_error', 'not_admin')
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
