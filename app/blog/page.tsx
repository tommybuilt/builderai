import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Developer insights, AI tool comparisons, and practical guides for building with AI. Written by developers, for developers.',
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: getDefaultOpenGraph({
    title: 'Blog | BuilderAI',
    description: 'Developer insights, AI tool comparisons, and practical guides for building with AI. Written by developers, for developers.',
    url: absoluteUrl('/blog'),
  }),
  twitter: getDefaultTwitter({
    title: 'Blog | BuilderAI',
    description: 'Developer insights, AI tool comparisons, and practical guides for building with AI. Written by developers, for developers.',
  }),
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, author_name, author_slug, published_at, tags')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'BuilderAI.tools Blog',
    description: 'Developer insights, AI tool comparisons, and practical guides for building with AI. Written by developers, for developers.',
    url: absoluteUrl('/blog'),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (posts || []).slice(0, 20).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: absoluteUrl('/blog'),
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Blog</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Developer insights, AI tool comparisons, and practical guides for building with AI.
        </p>
      </div>

      {(!posts || posts.length === 0) ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">No articles yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-wrap gap-2 mb-3">
                  {(post.tags || []).slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <Link
                  href={`/blog/author/${post.author_slug}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {post.author_name}
                </Link>
                <span>{formatDate(post.published_at)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
