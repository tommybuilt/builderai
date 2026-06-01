import type { Metadata } from 'next'
import { AdminSigninForm } from './AdminSigninForm'

export const dynamic = 'force-dynamic'

// Intentionally not linked from the header or footer. Admins know the URL.
// robots blocks indexing.
export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Single-use sign-in link.',
  robots: { index: false, follow: false },
}

export default function AdminSigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm dark:shadow-none">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Sign in</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Enter your email and we will send you a single-use sign-in link. The link expires in 1 hour. No password needed.
          </p>
          <AdminSigninForm />
        </div>
      </div>
    </div>
  )
}
