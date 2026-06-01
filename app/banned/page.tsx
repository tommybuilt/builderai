import type { Metadata } from 'next'
import Link from 'next/link'

// Public landing page for users blocked by the ban system. Reachable when
// the middleware redirects, when /auth/confirm rejects a verified-but-
// banned session, or by direct URL. Static page; no DB query.
//
// Returned with index:false so search engines do not crawl it as a real
// destination. The X-Robots-Tag is also set in public/_headers for /banned.

export const metadata: Metadata = {
  title: 'Access Restricted',
  description: 'Your access to BuilderAI.tools has been restricted.',
  robots: { index: false, follow: false },
}

export default function BannedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="max-w-lg w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Access Restricted</h1>
        <p className="text-zinc-400 mb-2">
          Your access to BuilderAI.tools has been restricted.
        </p>
        <p className="text-zinc-500 text-sm mb-8">
          This may be due to a violation of our community guidelines, abuse of
          our submission system, or other policy concerns.
        </p>

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-8 text-left">
          <p className="text-zinc-300 text-sm font-medium mb-2">
            Think this is a mistake?
          </p>
          <p className="text-zinc-400 text-sm">
            If you believe your access was restricted in error, contact us with
            details and we will review your case. Include the date and time of
            this notice and the URL you were trying to reach.
          </p>
        </div>

        <a
          href="mailto:support@tpsworldwidellc.com?subject=Access%20Restriction%20Appeal"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-lg font-medium text-white transition-colors w-full"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact Support
        </a>

        <div className="mt-6">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
