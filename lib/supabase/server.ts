import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

function getRequiredEnv(name: string, fallbackName?: string) {
  const value = process.env[name] ?? (fallbackName ? process.env[fallbackName] : undefined)
  if (!value) {
    throw new Error(`Missing ${name}${fallbackName ? ` (or ${fallbackName})` : ''}`)
  }
  return value
}

export async function createClient() {
  noStore()
  
  const cookieStore = await cookies()
  // API key loaded from environment variable. Never hardcode secrets.
  const supabaseUrl = getRequiredEnv('SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL')
  const supabaseAnonKey = getRequiredEnv('SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      // Explicit PKCE so signInWithOtp persists the code verifier in
      // cookies; the /auth/callback round-trip can then exchange the
      // ?code=... query param via exchangeCodeForSession. @supabase/ssr
      // defaults to PKCE today; this is documentation plus a guard.
      auth: { flowType: 'pkce' },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  )
}
