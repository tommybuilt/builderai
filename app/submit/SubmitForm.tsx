'use client'

import { useState } from 'react'
import Turnstile from 'react-turnstile'
import type { Category } from '@/lib/types/database'

interface SubmitFormProps {
  categories: Category[]
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export function SubmitForm({ categories }: SubmitFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ email: string } | null>(null)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileResetKey, setTurnstileResetKey] = useState(0)

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    github_url: '',
    description: '',
    category_slug: '',
    tags: '',
    email: '',
    // Honeypot
    website: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Honeypot check (silent succeed for bots)
    if (formData.website) {
      setSuccess({ email: formData.email })
      return
    }

    if (!formData.name.trim()) {
      setError('Tool name is required')
      return
    }

    if (!formData.url.trim()) {
      setError('Website URL is required')
      return
    }

    if (!formData.github_url.trim()) {
      setError('GitHub URL is required')
      return
    }

    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email.trim())) {
      setError('A valid email address is required so we can follow up on your submission')
      return
    }

    if (!turnstileToken) {
      setError('Please complete the verification challenge')
      return
    }

    const tags = formData.tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)

    setLoading(true)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          website_url: formData.url.trim(),
          github_url: formData.github_url.trim(),
          description: formData.description.trim() || null,
          category_slug: formData.category_slug || null,
          tags,
          email: formData.email.trim(),
          turnstile_token: turnstileToken,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as { error?: string; success?: boolean }

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to submit. Please try again.')
        // Force the Turnstile widget to issue a fresh token on next attempt.
        setTurnstileToken(null)
        setTurnstileResetKey((k) => k + 1)
        setLoading(false)
        return
      }

      setSuccess({ email: formData.email.trim() })
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      setFormData({
        name: '',
        url: '',
        github_url: '',
        description: '',
        category_slug: '',
        tags: '',
        email: '',
        website: '',
      })
      setTurnstileToken(null)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Network error. Please try again.')
      setTurnstileToken(null)
      setTurnstileResetKey((k) => k + 1)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white mb-2">Thank you!</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-2">
          Your submission is in the review queue.
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
          We will email you at <span className="font-medium">{success.email}</span> if we have questions or once your submission goes live.
        </p>
        <button
          onClick={() => setSuccess(null)}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium transition-colors"
        >
          Submit another tool
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
  const labelClass = 'block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tool Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Tool Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          maxLength={200}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Ollama"
          className={inputClass}
        />
      </div>

      {/* Website URL */}
      <div>
        <label htmlFor="url" className={labelClass}>
          Website URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://example.com"
          className={inputClass}
        />
      </div>

      {/* GitHub URL */}
      <div>
        <label htmlFor="github_url" className={labelClass}>
          GitHub URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="github_url"
          required
          value={formData.github_url}
          onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          placeholder="https://github.com/owner/repo"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          maxLength={5000}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="What does this tool do? What makes it unique?"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select
          id="category"
          value={formData.category_slug}
          onChange={(e) => setFormData({ ...formData, category_slug: e.target.value })}
          className={inputClass}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className={labelClass}>
          Tags
        </label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="llm, inference, open-source (comma separated)"
          className={inputClass}
        />
        <p className="text-xs text-zinc-500 mt-1">Separate tags with commas</p>
      </div>

      {/* Email (REQUIRED, anonymous flow) */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Your Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={inputClass}
        />
        <p className="text-xs text-zinc-500 mt-1">
          We will only use this to follow up on your submission. We do not sell or share email addresses.
        </p>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Turnstile widget */}
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
          Verification widget not configured. Submissions are temporarily disabled.
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
        {loading ? 'Submitting...' : 'Submit Tool for Review'}
      </button>
    </form>
  )
}
