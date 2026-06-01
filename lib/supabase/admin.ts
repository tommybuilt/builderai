import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Service-role Supabase client. Bypasses RLS and is the only client allowed to
// call auth.admin.* methods (generateLink, deleteUser, listUsers, etc).
//
// Never expose the service-role key to the client bundle. This module is only
// imported by server-only code (route handlers, server actions). Importing it
// from a client component will leak the key into the bundle.
//
// No cookie store: the service-role client is request-stateless. Each call
// builds a fresh client; the constructor is cheap.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
  }
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
