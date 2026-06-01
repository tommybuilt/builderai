import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 50
const TABLE_FILTERS = [
  'all',
  'tools',
  'categories',
  'reviews',
  'submissions',
  'user_favorites',
  'blog_posts',
  'site_settings',
] as const

function formatDateTime(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const opVariants: Record<string, string> = {
  INSERT: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  UPDATE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
}

interface PageProps {
  searchParams?: Promise<{ page?: string; table?: string }>
}

export default async function AdminActivityPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {}
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)
  const tableFilter = params.table && (TABLE_FILTERS as readonly string[]).includes(params.table) ? params.table : 'all'

  const supabase = await createClient()

  let countQuery = supabase.from('activity_log').select('id', { count: 'exact', head: true })
  if (tableFilter !== 'all') countQuery = countQuery.eq('table_name', tableFilter)
  const { count } = await countQuery

  let query = supabase
    .from('activity_log')
    .select('id, table_name, operation, record_id, user_id, created_at')
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
  if (tableFilter !== 'all') query = query.eq('table_name', tableFilter)

  const { data: rows, error } = await query

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <p className="text-red-400">Failed to load activity log: {error.message}</p>
      </div>
    )
  }

  const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE))
  const buildHref = (p: number, t: string = tableFilter) =>
    `/admin/activity?page=${p}${t !== 'all' ? `&table=${t}` : ''}`

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Activity Log</h1>
          <p className="text-zinc-400 mt-1">
            {count ?? 0} total event{count === 1 ? '' : 's'}
            {tableFilter !== 'all' ? ` on ${tableFilter}` : ''}
          </p>
        </div>
      </div>

      {/* Table filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABLE_FILTERS.map((t) => (
          <Link
            key={t}
            href={t === 'all' ? '/admin/activity' : `/admin/activity?table=${t}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              tableFilter === t
                ? 'bg-primary-500/20 text-primary-300 border-primary-500/40'
                : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      {!rows || rows.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500">No events match this filter</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    When
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Op
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Record
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    By User
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-3 text-sm text-zinc-400 whitespace-nowrap">
                      {formatDateTime(row.created_at)}
                    </td>
                    <td className="px-6 py-3 text-sm font-mono text-zinc-300">{row.table_name}</td>
                    <td className="px-6 py-3 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${
                          opVariants[row.operation] || 'bg-zinc-700/50 text-zinc-400 border-zinc-600/30'
                        }`}
                      >
                        {row.operation}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-zinc-500 font-mono">
                      {row.record_id ? row.record_id.slice(0, 8) : ''}
                    </td>
                    <td className="px-6 py-3 text-xs text-zinc-500 font-mono">
                      {row.user_id ? row.user_id.slice(0, 8) : 'system'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 text-sm text-zinc-400">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={buildHref(page - 1)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={buildHref(page + 1)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-300 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
