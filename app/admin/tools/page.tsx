import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components'
import { formatDate } from '@/lib/utils'
import { DraftActions } from './DraftActions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

interface AdminToolsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminToolsPage({ searchParams }: AdminToolsPageProps) {
  const resolvedParams = (await searchParams) || {}
  const statusFilter = (resolvedParams.status as string) || 'all'
  const supabase = await createClient()

  let query = supabase
    .from('tools')
    .select('*, categories(*)')
    .order('created_at', { ascending: false })

  if (statusFilter === 'published') {
    query = query.eq('status', 'published')
  } else if (statusFilter === 'draft') {
    query = query.eq('status', 'draft')
  }

  const { data: tools } = await query

  const { count: totalCount } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
  const { count: publishedCount } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
  const { count: draftCount } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Tools</h1>
          <p className="text-zinc-400 mt-1">Manage all tools in the directory</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg 
                     font-medium text-white transition-colors"
        >
          + Add Tool
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Link
          href="/admin/tools?status=all"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          All ({totalCount || 0})
        </Link>
        <Link
          href="/admin/tools?status=published"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'published'
              ? 'bg-emerald-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          Published ({publishedCount || 0})
        </Link>
        <Link
          href="/admin/tools?status=draft"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'draft'
              ? 'bg-amber-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          Draft ({draftCount || 0})
        </Link>
      </div>

      {tools && tools.length > 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Tool</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Rating</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Added</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {tools.map((tool) => (
                <tr key={tool.id} className="hover:bg-zinc-800/30">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{tool.name}</p>
                      <p className="text-sm text-zinc-500 truncate max-w-xs">
                        {tool.short_description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300">
                      {tool.categories?.name || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.status === 'published' ? (
                        <Badge variant="success">Published</Badge>
                      ) : (
                        <Badge variant="warning">Draft</Badge>
                      )}
                      {tool.featured && <Badge variant="info">Featured</Badge>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300">
                      {tool.rating_avg.toFixed(1)} ({tool.rating_count})
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-500">
                      {formatDate(tool.created_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 items-center">
                      <DraftActions toolId={tool.id} toolName={tool.name} status={tool.status} />
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="text-sm text-zinc-400 hover:text-white"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/tools/${tool.id}/stats`}
                        className="text-sm text-yellow-400 hover:text-yellow-300"
                      >
                        Stats
                      </Link>
                      <Link
                        href={`/admin/tools/${tool.id}/edit`}
                        className="text-sm text-primary-400 hover:text-primary-300"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <p className="text-zinc-400 mb-4">
            {statusFilter === 'draft' ? 'No draft tools' : statusFilter === 'published' ? 'No published tools' : 'No tools yet'}
          </p>
          <Link
            href="/admin/tools/new"
            className="text-primary-400 hover:text-primary-300"
          >
            Add your first tool →
          </Link>
        </div>
      )}
    </div>
  )
}
