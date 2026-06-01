import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl } from '@/lib/seo'
import { EditToolForm } from './EditToolForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Edit tool',
  description: 'Edit your claimed BuilderAI tool listing.',
  alternates: {
    canonical: absoluteUrl('/profile'),
  },
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function EditToolPage({ params }: PageProps) {
  const { slug } = await params

  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    redirect('/?auth_required=edit')
  }

  const { data: toolRow, error: toolError } = await supabase
    .from('tools')
    .select('id, slug, name, description, short_description, website_url, docs_url, tags, claimed_by_user_id')
    .eq('slug', slug)
    .maybeSingle()

  if (toolError || !toolRow) {
    notFound()
  }

  const tool = toolRow as unknown as {
    id: string
    slug: string
    name: string
    description: string | null
    short_description: string
    website_url: string | null
    docs_url: string | null
    tags: string[] | null
    claimed_by_user_id: string | null
  }

  if (tool.claimed_by_user_id !== user.id) {
    redirect('/profile?claim_error=not_owner')
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/profile"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            ← Back to profile
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Edit {tool.name}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            You can edit the description, short description, website URL, docs URL, and tags. Other fields are managed by an admin.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <EditToolForm
            tool={{
              id: tool.id,
              slug: tool.slug,
              name: tool.name,
              description: tool.description,
              short_description: tool.short_description,
              website_url: tool.website_url,
              docs_url: tool.docs_url,
              tags: tool.tags ?? [],
            }}
            hasTagsColumn={true}
          />
        </div>
      </div>
    </div>
  )
}
