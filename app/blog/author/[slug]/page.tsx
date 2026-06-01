import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const AUTHORS: Record<string, { name: string; bio: string }> = {
  'billy-c': {
    name: 'Billy C',
    bio: 'Billy is a full-stack developer who writes about practical AI tool usage, terminal workflows, and shipping code faster.',
  },
  'max-p': {
    name: 'Max P',
    bio: 'Max is a developer and technical analyst who specializes in comparing tools, evaluating frameworks, and tracking industry trends.',
  },
}

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = AUTHORS[slug]
  if (!author) return { title: 'Author Not Found' }

  const title = `Articles by ${author.name}`
  const description = author.bio
  const url = absoluteUrl(`/blog/author/${slug}`)

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: getDefaultOpenGraph({ title: `${title} | BuilderAI`, description, url }),
    twitter: getDefaultTwitter({ title: `${title} | BuilderAI`, description }),
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = AUTHORS[slug]
  if (!author) notFound()

  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, published_at, tags')
    .eq('author_slug', slug)
    .eq('is_published', true)
    .order('published_at', { ascending: false })

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
      {
        '@type': 'ListItem',
        position: 3,
        name: author.name,
        item: absoluteUrl(`/blog/author/${slug}`),
      },
    ],
  }

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    url: absoluteUrl(`/blog/author/${slug}`),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-zinc-400">{author.name}</span>
      </nav>

      {/* Author Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white font-bold text-2xl">
            {author.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{author.name}</h1>
            <p className="text-zinc-400 mt-1">{(posts || []).length} article{(posts || []).length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <p className="text-zinc-400 text-lg max-w-2xl">{author.bio}</p>
      </div>

      {/* Posts */}
      {(!posts || posts.length === 0) ? (
        <p className="text-zinc-500">No articles yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                {(post.tags || []).slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{post.excerpt}</p>
              <time className="text-xs text-zinc-500">{formatDate(post.published_at)}</time>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
