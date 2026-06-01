import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SubmitForm } from './SubmitForm'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Submit a Tool',
  description:
    'Submit an AI tool to the BuilderAI.tools directory. Help the community discover great open-source and developer-focused AI tools.',
  alternates: {
    canonical: absoluteUrl('/submit'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'Submit a Tool - BuilderAI',
    description:
      'Submit an AI tool to the BuilderAI.tools directory. Help the community discover great open-source and developer-focused AI tools.',
    url: absoluteUrl('/submit'),
  }),
  twitter: getDefaultTwitter({
    title: 'Submit a Tool - BuilderAI',
    description:
      'Submit an AI tool to the BuilderAI.tools directory. Help the community discover great open-source and developer-focused AI tools.',
  }),
}

export default async function SubmitPage() {
  // No auth gate. Submissions are open to anonymous visitors and protected by
  // server-side Turnstile validation, IP-keyed daily rate limiting, and manual
  // admin approval before anything goes live.
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-2">Submit a Tool</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Submit an open-source AI tool for our directory. All submissions are reviewed by our team before publication. We will email you at the address you provide if we need clarification or once your submission goes live.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3">
            Limit: 3 submissions per day per visitor.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8 shadow-sm dark:shadow-none">
          <SubmitForm categories={categories || []} />
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
          <p>
            Only legitimate, publicly available, open-source software tools will be accepted.
          </p>
        </div>
      </div>
    </div>
  )
}
