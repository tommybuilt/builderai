import type { Metadata } from 'next'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { absoluteUrl } from '@/lib/seo'
import { ClaimForm } from './ClaimForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Claim a tool',
  description: 'Re-request a sign-in link to claim a BuilderAI tool listing.',
  alternates: {
    canonical: absoluteUrl('/claim'),
  },
  robots: { index: false, follow: false },
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface PageProps {
  params: Promise<{ tool_id: string }>
}

export default async function ClaimPage({ params }: PageProps) {
  const { tool_id: toolId } = await params

  if (!UUID_REGEX.test(toolId)) {
    return <NotFoundView />
  }

  const supabase = createAdminClient()
  const { data: toolRow } = await supabase
    .from('tools')
    .select('id, name, slug, claimed_by_user_id')
    .eq('id', toolId)
    .maybeSingle()

  if (!toolRow) {
    return <NotFoundView />
  }

  const tool = toolRow as unknown as {
    id: string
    name: string
    slug: string
    claimed_by_user_id: string | null
  }

  if (tool.claimed_by_user_id) {
    return <AlreadyClaimedView toolName={tool.name} slug={tool.slug} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm dark:shadow-none">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Claim {tool.name}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            If you submitted this tool, enter the email address you submitted with. We will send you a sign-in link to claim and manage the listing.
          </p>
          <ClaimForm toolId={toolId} />
        </div>
      </div>
    </div>
  )
}

function NotFoundView() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Tool not found</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          The tool you are trying to claim does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

function AlreadyClaimedView({ toolName, slug }: { toolName: string; slug: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Already claimed</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          This listing has already been claimed by another user.
        </p>
        <Link
          href={`/tool/${slug}`}
          className="inline-flex px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors"
        >
          View {toolName}
        </Link>
      </div>
    </div>
  )
}
