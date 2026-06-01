'use client'

import { useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import { useAuth } from './AuthProvider'
import { createClient } from '@/lib/supabase/client'

// Hydrates the theme from `profiles.theme_preference` on the client side
// when an authenticated user mounts the app. Without this, signing in on
// a fresh device would leave the localStorage default (or last unsigned
// session's choice) in place, even though the user has a saved DB
// preference from a different device.
//
// Renders nothing. Side-effect only. Failures are logged and ignored;
// the local theme state stays consistent regardless.
//
// Why a dependency on `user?.id` and not `[]`: AuthProvider's session
// is fetched async on its own mount, so the very first render of this
// component sees user as null. Re-running when user.id transitions from
// null to a real id (post-sign-in) is what actually triggers the sync.

export function ThemeSync() {
  const { resolvedTheme, setTheme } = useTheme()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    let cancelled = false

    const sync = async () => {
      try {
        const supabase = createClient()
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('theme_preference')
          .eq('user_id', user.id)
          .maybeSingle()

        if (cancelled) return
        if (error) {
          console.error('[theme-sync] read failed: ' + error.message)
          return
        }

        const saved = (profile as { theme_preference?: string } | null)?.theme_preference
        if (saved !== 'light' && saved !== 'dark') return
        if (saved === resolvedTheme) return
        setTheme(saved)
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.error('[theme-sync] threw: ' + message)
      }
    }

    sync()
    return () => {
      cancelled = true
    }
  }, [user?.id])

  return null
}
