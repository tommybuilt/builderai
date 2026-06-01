import type { Metadata } from 'next'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Disclosures',
  description: 'Required disclosures for BuilderAI.tools, including editorial and affiliate policies.',
  alternates: {
    canonical: absoluteUrl('/disclosures'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'Disclosures - BuilderAI',
    description: 'Required disclosures for BuilderAI.tools, including editorial and affiliate policies.',
    url: absoluteUrl('/disclosures'),
  }),
  twitter: getDefaultTwitter({
    title: 'Disclosures - BuilderAI',
    description: 'Required disclosures for BuilderAI.tools, including editorial and affiliate policies.',
  }),
}

export default function DisclosuresPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Disclosures</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Last updated: March 17, 2026</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Independent Site</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              BuilderAI.tools is an independent directory operated by TPS Worldwide LLC in Phoenix, Arizona. We are not affiliated with or endorsed by the tools listed on this site unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Trademarks</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              All product names, logos, and brands are property of their respective owners. Use of these names and logos
              is for identification only and does not imply endorsement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Affiliate Disclosure</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Some links may be affiliate links. If you click an affiliate link and make a purchase, we may earn a
              commission at no additional cost to you. We only include tools we believe are useful.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Editorial Policy</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Tool listings are curated based on relevance, quality, and usefulness to builders. Sponsored placement does
              not guarantee inclusion or ranking. Reviews and ratings reflect user input.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">Contact</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Questions about these disclosures? Contact TPS Worldwide LLC at{' '}
              <a
                href="mailto:support@tpsworldwidellc.com"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                support@tpsworldwidellc.com
              </a>
              {' '}or{' '}
              <a
                href="mailto:support@tpsworldwidellc.com"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                support@tpsworldwidellc.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
