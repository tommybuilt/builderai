import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get stats
  const [
    { count: toolsCount },
    { count: categoriesCount },
    { count: pendingCount },
    { count: reviewsCount },
  ] = await Promise.all([
    supabase.from('tools').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('reviews').select('*', { count: 'exact', head: true }),
  ])

  // Get recent submissions
  const { data: recentSubmissions } = await supabase
    .from('submissions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { name: 'Total Tools', value: toolsCount || 0, href: '/admin/tools' },
    { name: 'Categories', value: categoriesCount || 0, href: '/admin/categories' },
    { name: 'Pending Submissions', value: pendingCount || 0, href: '/admin/submissions' },
    { name: 'Total Reviews', value: reviewsCount || 0, href: '#' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 
                       hover:border-zinc-700 transition-colors"
          >
            <p className="text-sm text-zinc-400">{stat.name}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Submissions */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Pending Submissions</h2>
            <Link
              href="/admin/submissions"
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              View all →
            </Link>
          </div>
          {recentSubmissions && recentSubmissions.length > 0 ? (
            <div className="space-y-3">
              {recentSubmissions.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/admin/submissions/${sub.id}`}
                  className="block p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <p className="font-medium text-white">{sub.submitted_name}</p>
                  <p className="text-sm text-zinc-400 truncate">{sub.submitted_url}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-center py-4">No pending submissions</p>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/tools/new"
              className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg 
                         hover:bg-zinc-800 transition-colors"
            >
              <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Add Tool</span>
            </Link>
            <Link
              href="/admin/categories"
              className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg 
                         hover:bg-zinc-800 transition-colors"
            >
              <div className="w-10 h-10 bg-accent-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Categories</span>
            </Link>
            <Link
              href="/admin/submissions"
              className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg 
                         hover:bg-zinc-800 transition-colors"
            >
              <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">Submissions</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg 
                         hover:bg-zinc-800 transition-colors"
            >
              <div className="w-10 h-10 bg-zinc-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <span className="text-sm font-medium text-white">View Site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
