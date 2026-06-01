'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Badge } from './Badge'
import type { Submission } from '@/lib/types/database'
import { formatDate } from '@/lib/utils'

interface AdminSubmissionCardProps {
  submission: Submission
}

const statusVariants: Record<string, 'warning' | 'success' | 'default'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'default',
}

export function AdminSubmissionCard({ submission }: AdminSubmissionCardProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleQuickAction = async (action: 'approve' | 'reject') => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/submissions/${submission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update')
      }

      // Defense in depth: explicitly clear any prior error and trigger a server
      // refresh so this card's status badge reflects the new state.
      setError(null)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update')
    } finally {
      setIsLoading(false)
    }
  }

  const isPending = submission.status === 'pending'

  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 
                    hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-zinc-900 dark:text-white truncate">{submission.submitted_name}</h3>
          <p className="text-sm text-zinc-500">{formatDate(submission.created_at)}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <Badge variant={statusVariants[submission.status]}>
            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
          </Badge>
          <Badge variant={submission.submitter_user_id ? 'info' : 'default'} size="sm">
            {submission.submitter_user_id ? 'Authenticated' : 'Anonymous'}
          </Badge>
        </div>
      </div>

      {/* Submitter email — admins need this to follow up. */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 truncate">
        <span className="text-zinc-400 dark:text-zinc-500">From: </span>
        <a
          href={`mailto:${submission.submitter_email}?subject=BuilderAI%20submission%3A%20${encodeURIComponent(submission.submitted_name)}`}
          className="text-primary-500 dark:text-primary-400 hover:underline"
        >
          {submission.submitter_email}
        </a>
      </p>

      {submission.submitted_description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
          {submission.submitted_description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        {submission.submitted_url && (
          <a
            href={submission.submitted_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 underline"
          >
            Website
          </a>
        )}
        {submission.submitted_github_url && (
          <a
            href={submission.submitted_github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 underline"
          >
            GitHub
          </a>
        )}
        {submission.submitted_category_slug && (
          <span className="text-zinc-500">
            Category: {submission.submitted_category_slug}
          </span>
        )}
      </div>

      {submission.submitted_tags && submission.submitted_tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {submission.submitted_tags.map((tag: string) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {error && (
        <div className="mb-3 flex items-start justify-between gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
            className="text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
        {isPending ? (
          <>
            {/* Approve goes through the detail page so the admin fills in
                tool fields (category, price, platform, difficulty, tags)
                that the public listing requires. The detail-page form
                posts to /api/admin/submissions/[id]/approve which
                inserts the tool, generates the claim invite, and sends
                the approval email. The PATCH endpoint used by the
                quick-reject button only flips the submission status. */}
            <Link
              href={`/admin/submissions/${submission.id}`}
              className="flex-1 text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500
                         rounded-lg text-sm font-medium text-white transition-colors"
            >
              Review &amp; approve
            </Link>
            <button
              onClick={() => handleQuickAction('reject')}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-red-800
                         rounded-lg text-sm font-medium text-white transition-colors"
            >
              {isLoading ? '...' : '✗ Reject'}
            </button>
          </>
        ) : (
          <Link
            href={`/admin/submissions/${submission.id}`}
            className="flex-1 text-center px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 
                       rounded-lg text-sm font-medium text-zinc-700 dark:text-white transition-colors"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  )
}
