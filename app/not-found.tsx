import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-zinc-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-zinc-400 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg 
                       font-medium text-white transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/tools"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg 
                       font-medium text-white transition-colors"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
