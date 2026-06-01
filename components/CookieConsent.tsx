'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { applyConsentMode, readStoredPreferences, storePreferences, type CookiePreferences } from '@/lib/consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    advertising: false,
  })

  useEffect(() => {
    setMounted(true)
    const stored = readStoredPreferences()
    if (stored) {
      setPreferences(stored)
    } else {
      // Small delay to prevent flash on page load
      setTimeout(() => setShowBanner(true), 500)
    }

    const handleOpen = () => {
      setShowBanner(true)
      setShowSettings(true)
    }
    window.addEventListener('cookie-settings:open', handleOpen)
    return () => window.removeEventListener('cookie-settings:open', handleOpen)
  }, [])

  const finalizeConsent = (next: CookiePreferences) => {
    storePreferences(next)
    applyConsentMode(next)
    setShowBanner(false)
    setShowSettings(false)
    setPreferences(next)
  }

  const handleAcceptAll = () => {
    finalizeConsent({ necessary: true, analytics: true, advertising: true })
  }

  const handleReject = () => {
    finalizeConsent({ necessary: true, analytics: false, advertising: false })
  }

  const handleSave = () => {
    finalizeConsent(preferences)
  }

  // Don't render during SSR
  if (!mounted) return null

  // Don't show if user already consented
  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          {/* Cookie Icon */}
          <div className="hidden md:flex flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full items-center justify-center">
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              We value your privacy
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              We use strictly necessary cookies to keep you signed in and to remember your cookie preferences. With your consent, we may also use analytics cookies to understand how the site is used. Your dark mode preference is saved in your browser&apos;s local storage and does not require consent. See our{' '}
              <Link
                href="/cookies"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Cookie Policy
              </Link>
              {' '}and{' '}
              <Link
                href="/privacy"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              {' '}for details.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-2.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="px-6 py-2.5 text-center border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg transition-colors"
              >
                Manage
              </button>
            </div>

            {showSettings && (
              <div className="mt-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span>Strictly necessary</span>
                    <input type="checkbox" checked disabled className="h-4 w-4" />
                  </div>
                  <label className="flex items-center justify-between">
                    <span>Analytics</span>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                      }
                      className="h-4 w-4"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span>Advertising</span>
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, advertising: e.target.checked }))
                      }
                      className="h-4 w-4"
                    />
                  </label>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={handleReject}
                    className="px-6 py-2.5 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg transition-colors"
                  >
                    Reject Non-Essential
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Close button (optional - allows dismissing without choice, treats as necessary only) */}
          <button
            onClick={handleReject}
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
