import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminNav } from './AdminNav'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Admin Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-lg font-semibold text-white">
                Admin Panel
              </Link>
              <span className="text-zinc-600">|</span>
              <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                View Site
              </Link>
            </div>
            <AdminNav />
          </div>
        </div>
      </header>

      {/* Admin Navigation
          Order: Dashboard | content (Tools, Categories, Blog) |
                 community (Submissions, Users, Reviews) |
                 ops (Activity, Settings) */}
      <nav className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto">
            <Link
              href="/admin"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Dashboard
            </Link>
            <span className="py-4 text-xs text-zinc-600 select-none">|</span>
            <Link
              href="/admin/tools"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/admin/categories"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/admin/blog"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Blog
            </Link>
            <span className="py-4 text-xs text-zinc-600 select-none">|</span>
            <Link
              href="/admin/submissions"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Submissions
            </Link>
            <Link
              href="/admin/users"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Users
            </Link>
            <Link
              href="/admin/reviews"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/admin/bans"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Bans
            </Link>
            <span className="py-4 text-xs text-zinc-600 select-none">|</span>
            <Link
              href="/admin/activity"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Activity
            </Link>
            <Link
              href="/admin/settings"
              className="py-4 text-sm font-medium text-zinc-400 hover:text-white
                         border-b-2 border-transparent hover:border-primary-500 transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
