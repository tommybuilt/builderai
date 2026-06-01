import type { Metadata } from 'next'
import { Chatbot } from '@/components/Chatbot'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'AI Tools Chatbot',
  description: 'Ask questions about BuilderAI.tools and the AI tools listed on the site. Get instant answers sourced from our directory.',
  alternates: {
    canonical: absoluteUrl('/chat'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'AI Tools Chatbot - BuilderAI',
    description: 'Ask questions about BuilderAI.tools and the AI tools listed on the site. Get instant answers sourced from our directory.',
    url: absoluteUrl('/chat'),
  }),
  twitter: getDefaultTwitter({
    title: 'AI Tools Chatbot - BuilderAI',
    description: 'Ask questions about BuilderAI.tools and the AI tools listed on the site. Get instant answers sourced from our directory.',
  }),
}

export default function ChatPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">BuilderAI.tools Chatbot</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Ask about tools, categories, submissions, or site policies. Answers are sourced from
            BuilderAI.tools only.
          </p>
        </div>
        <Chatbot />
      </div>
    </div>
  )
}
