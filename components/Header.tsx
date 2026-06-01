'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from './AuthProvider'

// Magic-link-only auth model: there is no public Sign In or Sign Up CTA on
// the marketing site. The user dropdown only renders when an active session
// exists (which only happens after a magic-link callback). Admins reach the
// admin panel via /admin-signin (not linked from anywhere).

export function Header() {
  const { user, loading, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-300 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">
              Builder<span className="text-primary-500">AI</span>
            </span>
          </Link>

          {/* Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link
              href="/tools"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Browse All
            </Link>
            <Link
              href="/tools"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Featured
            </Link>
            <Link
              href="/tools?sort=rating"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Top Rated
            </Link>
            <Link
              href="/blog"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* CTA + (auth-conditional) user menu + Theme Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className="hidden sm:inline-flex px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Submit Tool
            </Link>

            {/* User dropdown only renders for authenticated sessions; nothing
                shows for visitors. No public Sign In or Sign Up button. */}
            {!loading && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white font-medium text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <svg className={`w-4 h-4 text-zinc-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{displayName}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/tools?filter=favorites"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Favorites
                    </Link>
                    <Link
                      href="/submit"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors sm:hidden"
                    >
                      Submit Tool
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setShowDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
