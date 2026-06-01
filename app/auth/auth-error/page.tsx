import Link from 'next/link'
import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Authentication Error',
  description: 'An error occurred during authentication.',
  alternates: {
    canonical: absoluteUrl('/auth/auth-error'),
  },
  robots: {
    index: false,
    follow: false,
  },
}

// Allowlist of reasons we'll surface to the user. Any other value is ignored
// (no subtitle rendered) so we never echo arbitrary query input back to the
// page.
const REASON_MESSAGES: Record<string, string> = {
  missing_code: 'The link was missing required information. Try requesting a new one.',
  missing_token: 'The link was missing required information. Try requesting a new one.',
  invalid_type: 'The link format was unrecognized. Try requesting a new one.',
  verify_failed: 'The link is invalid or has already been used. Try requesting a new one.',
  exchange_failed: 'The link could not be verified. Try requesting a new one.',
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string | string[] }>
}) {
  const sp = await searchParams
  const reason = typeof sp.reason === 'string' ? sp.reason : undefined
  const subtitle = reason ? REASON_MESSAGES[reason] : undefined

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Sign-in link is invalid or expired</h1>
        {subtitle && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{subtitle}</p>
        )}
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Magic-link sign-in URLs are single-use and expire shortly after they are issued. Request a fresh one and try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-lg font-medium text-white transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
