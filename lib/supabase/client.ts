import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // These must be statically inlined at build time for the client bundle.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  // API key loaded from environment variable. Never hardcode secrets.
  // Explicit flowType 'pkce' so the magic-link round-trip uses the
  // server-callback path with ?code=... rather than the implicit flow with
  // #access_token=... in the fragment. @supabase/ssr defaults to PKCE
  // today; setting it explicitly documents intent and guards against
  // future default changes.
  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: { flowType: 'pkce' },
  })
}
