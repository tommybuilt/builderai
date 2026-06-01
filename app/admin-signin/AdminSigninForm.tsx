'use client'

import { useState } from 'react'
import Turnstile from 'react-turnstile'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

function redactEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return email
  const visible = local.length <= 2 ? local : `${local[0]}***${local[local.length - 1]}`
  return `${visible}@${domain}`
}

export function AdminSigninForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{ email: string } | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = email.trim().toLowerCase()
    if (!trimmed || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError('Enter a valid email address')
      return
    }
    if (!turnstileToken) {
      setError('Please complete the verification challenge')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          intent: 'admin',
          turnstile_token: turnstileToken,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string }
      if (!res.ok) {
        setError(data.error || 'Sign-in is unavailable right now')
        setTurnstileToken(null)
        setTurnstileResetKey((k) => k + 1)
        setLoading(false)
        return
      }

      setSuccess({ email: trimmed })
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch {
      setError('Network error. Please try again.')
      setTurnstileToken(null)
      setTurnstileResetKey((k) => k + 1)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-2">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">Check your email</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          If <span className="font-medium">{redactEmail(success.email)}</span> is allowed to sign in, a sign-in link is on its way. The link expires in 1 hour.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
  const labelClass = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div style={{ minHeight: 0 }}>
          <Turnstile
            key={turnstileResetKey}
            sitekey={TURNSTILE_SITE_KEY}
            theme="auto"
            appearance="interaction-only"
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
          />
        </div>
      ) : (
        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-300">
          Verification widget not configured. Sign-in is temporarily disabled.
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !TURNSTILE_SITE_KEY}
        className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500
                   disabled:bg-zinc-400 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed
                   rounded-lg font-semibold text-white transition-colors"
      >
        {loading ? 'Sending sign-in link...' : 'Send sign-in link'}
      </button>
    </form>
  )
}
