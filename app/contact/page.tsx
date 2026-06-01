import type { Metadata } from 'next'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact BuilderAI.tools for questions, feedback, or legal requests.',
  alternates: {
    canonical: absoluteUrl('/contact'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'Contact - BuilderAI',
    description: 'Contact BuilderAI.tools for questions, feedback, or legal requests.',
    url: absoluteUrl('/contact'),
  }),
  twitter: getDefaultTwitter({
    title: 'Contact - BuilderAI',
    description: 'Contact BuilderAI.tools for questions, feedback, or legal requests.',
  }),
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Contact</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">TPS Worldwide LLC usually responds to most inquiries within a few business days.</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            BuilderAI.tools is operated by TPS Worldwide LLC.
          </p>
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong>TPS Worldwide LLC</strong><br />
              4539 N 22nd St Ste N<br />
              Phoenix, AZ 85016<br />
              United States<br /><br />
              Phone: (602) 922-3808<br />
              Email:{' '}
              <a
                href="mailto:support@tpsworldwidellc.com"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                support@tpsworldwidellc.com
              </a>
            </p>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            For legal, privacy, copyright, or DMCA requests, please include the relevant page URLs and supporting details so we can respond quickly.
          </p>
        </div>
      </div>
    </div>
  )
}
