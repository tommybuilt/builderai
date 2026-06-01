import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminSubmissionCard } from '@/components'

export const dynamic = 'force-dynamic'

export default async function AdminSubmissionsPage() {
  const supabase = await createClient()

  const { data: submissions } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  const pending = submissions?.filter((s) => s.status === 'pending') || []
  const reviewed = submissions?.filter((s) => s.status !== 'pending') || []

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Submissions</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Review and manage tool submissions</p>
        </div>
        {pending.length > 0 && (
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium">
            {pending.length} pending
          </div>
        )}
      </div>

      {/* Quick Actions Bar for Mobile */}
      {pending.length > 0 && (
        <div className="lg:hidden mb-6 p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Quick approve/reject pending submissions below. Swipe cards for more options.
          </p>
        </div>
      )}

      {/* Pending */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Pending Review ({pending.length})
        </h2>
        {pending.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pending.map((submission) => (
              <AdminSubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <svg className="w-12 h-12 text-zinc-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-zinc-600 dark:text-zinc-400">No pending submissions</p>
            <p className="text-sm text-zinc-500 mt-1">All caught up!</p>
          </div>
        )}
      </section>

      {/* Reviewed */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Previously Reviewed ({reviewed.length})
        </h2>
        {reviewed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewed.map((submission) => (
              <AdminSubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <p className="text-zinc-600 dark:text-zinc-400">No reviewed submissions yet</p>
          </div>
        )}
      </section>
    </div>
  )
}
