'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Turnstile from 'react-turnstile'
import { RatingStars, useAuth } from '@/components'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

interface ReviewFormProps {
  toolId: string
  toolSlug: string
}

export function ReviewForm({ toolId, toolSlug }: ReviewFormProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [pendingMagicLink, setPendingMagicLink] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)

  // Avoid flicker: don't render the form shape until we know whether the
  // visitor is signed in. Signed-in users get a direct review path via
  // /api/reviews; anonymous users get the magic-link verification flow.
  if (authLoading) {
    return (
      <div className="text-center py-4">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    )
  }

  const isSignedIn = !!user

  if (success) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-green-600 dark:text-green-400">Review submitted successfully.</p>
      </div>
    )
  }

  if (pendingMagicLink) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Check your email for a confirmation link to post your rating. The link expires in 24 hours.
        </p>
      </div>
    )
  }

  // Suppress the toolSlug-unused warning while keeping the prop for future use.
  void toolSlug

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    if (isSignedIn) {
      setLoading(true)
      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolId,
            rating,
            comment: comment.trim() || null,
          }),
        })

        const data = (await response.json().catch(() => ({}))) as { error?: string }

        if (!response.ok) {
          setError(data.error || 'Failed to submit review')
          setLoading(false)
          return
        }

        setSuccess(true)
        setRating(0)
        setComment('')
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit review.')
        console.error('Review submission error:', err)
      } finally {
        setLoading(false)
      }
      return
    }

    // Anonymous flow: verify-then-post via magic link.
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
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
          email: trimmedEmail,
          intent: 'rating',
          context: {
            tool_id: toolId,
            rating,
            comment: comment.trim() || null,
          },
          turnstile_token: turnstileToken,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string }

      if (!res.ok) {
        setError(data.error || 'Could not send confirmation link.')
        setTurnstileToken(null)
        setTurnstileResetKey((k) => k + 1)
        setLoading(false)
        return
      }

      setPendingMagicLink(true)
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

  const inputClass =
    'w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500'

  const submitDisabled =
    loading || rating === 0 || (!isSignedIn && !TURNSTILE_SITE_KEY)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">Rating</label>
        <RatingStars rating={rating} interactive onRate={setRating} size="lg" />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">
          Comment (optional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this tool..."
          rows={3}
          maxLength={2000}
          className={`${inputClass} resize-none`}
        />
      </div>

      {!isSignedIn && (
        <>
          <div>
            <label htmlFor="rating-email" className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="rating-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
            <p className="text-xs text-zinc-500 mt-1">
              We will send a confirmation link to this address. Single-use, expires in 24 hours.
            </p>
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
              Verification widget not configured. Rating is temporarily unavailable.
            </div>
          )}
        </>
      )}

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitDisabled}
        className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-500 disabled:bg-zinc-400 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-colors"
      >
        {loading
          ? isSignedIn
            ? 'Submitting...'
            : 'Sending confirmation link...'
          : isSignedIn
            ? 'Submit Review'
            : 'Verify and submit rating'}
      </button>
    </form>
  )
}
