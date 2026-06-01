import type { Metadata } from 'next'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about BuilderAI.tools and how we curate AI tools for builders.',
  alternates: {
    canonical: absoluteUrl('/about'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'About - BuilderAI',
    description: 'Learn about BuilderAI.tools and how we curate AI tools for builders.',
    url: absoluteUrl('/about'),
  }),
  twitter: getDefaultTwitter({
    title: 'About - BuilderAI',
    description: 'Learn about BuilderAI.tools and how we curate AI tools for builders.',
  }),
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">About</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">BuilderAI.tools is an independent AI tools directory operated by TPS Worldwide LLC in Phoenix, Arizona.</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We curate and organize AI tools so builders can quickly discover software that is useful, practical, and
            developer-friendly.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            We are not affiliated with the tools listed on the site. Each tool is owned and operated by its respective
            company or creator.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Questions about the site, editorial standards, or legal requests can be sent to support@tpsworldwidellc.com or support@tpsworldwidellc.com.
          </p>
        </div>
      </div>
    </div>
  )
}
