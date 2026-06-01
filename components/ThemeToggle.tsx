'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import { useAuth } from './AuthProvider'
import { createClient } from '@/lib/supabase/client'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next: 'light' | 'dark' = resolvedTheme === 'dark' ? 'light' : 'dark'
    // Local toggle first: visual flip is instant.
    setTheme(next)

    // Best-effort DB persist for authenticated users so the choice
    // syncs across devices. Fire-and-forget: a network or RLS failure
    // here must not block the visual toggle. localStorage already has
    // the new value via setTheme, so the user sees the right theme
    // either way.
    if (user) {
      void persistThemePreference(user.id, next)
    }
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 transition-colors"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800
                 hover:bg-zinc-300 dark:hover:bg-zinc-700
                 transition-colors"
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

async function persistThemePreference(userId: string, theme: 'light' | 'dark'): Promise<void> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ theme_preference: theme })
      .eq('user_id', userId)
    if (error) {
      console.error('[theme-toggle] db persist failed: ' + error.message)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[theme-toggle] db persist threw: ' + message)
  }
}
