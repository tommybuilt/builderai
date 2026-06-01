import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SubmissionReviewForm } from './SubmissionReviewForm'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function SubmissionDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: submission } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (!submission) {
    notFound()
  }

  const { data: categories } = await supabase.from('categories').select('*').order('name')

  const statusVariants: Record<string, 'warning' | 'success' | 'default'> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'default',
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <a href="/admin/submissions" className="text-sm text-zinc-400 hover:text-white">
          ← Back to Submissions
        </a>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{submission.submitted_name}</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Submitted {formatDate(submission.created_at)}
            </p>
          </div>
          <Badge variant={statusVariants[submission.status]} size="md">
            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
          </Badge>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {submission.submitted_url && (
            <div>
              <dt className="text-sm text-zinc-500">Website URL</dt>
              <dd>
                <a
                  href={submission.submitted_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 break-all"
                >
                  {submission.submitted_url}
                </a>
              </dd>
            </div>
          )}
          {submission.submitted_github_url && (
            <div>
              <dt className="text-sm text-zinc-500">GitHub URL</dt>
              <dd>
                <a
                  href={submission.submitted_github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 break-all"
                >
                  {submission.submitted_github_url}
                </a>
              </dd>
            </div>
          )}
          {submission.submitted_category_slug && (
            <div>
              <dt className="text-sm text-zinc-500">Suggested Category</dt>
              <dd className="text-white">{submission.submitted_category_slug}</dd>
            </div>
          )}
          {submission.submitter_email && (
            <div>
              <dt className="text-sm text-zinc-500">Submitter Email</dt>
              <dd className="text-white">{submission.submitter_email}</dd>
            </div>
          )}
        </dl>

        {submission.submitted_description && (
          <div className="mt-6">
            <dt className="text-sm text-zinc-500 mb-2">Description</dt>
            <dd className="text-zinc-300 whitespace-pre-wrap">
              {submission.submitted_description}
            </dd>
          </div>
        )}

        {submission.submitted_tags && submission.submitted_tags.length > 0 && (
          <div className="mt-6">
            <dt className="text-sm text-zinc-500 mb-2">Tags</dt>
            <dd className="flex flex-wrap gap-2">
              {submission.submitted_tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-zinc-800 rounded text-sm text-zinc-300">
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        )}

        {submission.admin_notes && (
          <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
            <dt className="text-sm text-zinc-500 mb-2">Admin Notes</dt>
            <dd className="text-zinc-300">{submission.admin_notes}</dd>
          </div>
        )}
      </div>

      {submission.status === 'pending' && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Review Submission</h2>
          <SubmissionReviewForm submission={submission} categories={categories || []} />
        </div>
      )}
    </div>
  )
}
