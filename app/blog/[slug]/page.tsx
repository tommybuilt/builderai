import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'
import { MarkdownContent } from '@/components/MarkdownContent'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, meta_title, meta_description, slug, published_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) return { title: 'Post Not Found' }

  const title = post.meta_title || post.title
  const description = post.meta_description || post.excerpt
  const url = absoluteUrl(`/blog/${post.slug}`)

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: { canonical: url },
    openGraph: {
      ...getDefaultOpenGraph({ title, description, url }),
      type: 'article',
    },
    twitter: getDefaultTwitter({ title, description }),
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) notFound()

  // Fetch related tools
  let relatedTools: { name: string; slug: string; short_description: string }[] = []
  if (post.related_tool_slugs && post.related_tool_slugs.length > 0) {
    const { data: tools } = await supabase
      .from('tools')
      .select('name, slug, short_description')
      .in('slug', post.related_tool_slugs)

    relatedTools = tools || []
  }

  let relatedPosts: {
    slug: string
    title: string
    excerpt: string
    published_at: string
  }[] = []

  if (post.tags && post.tags.length > 0) {
    const { data: postsByTag } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, published_at')
      .eq('is_published', true)
      .neq('slug', post.slug)
      .overlaps('tags', post.tags)
      .order('published_at', { ascending: false })
      .limit(3)

    relatedPosts = postsByTag || []
  }

  if (relatedPosts.length === 0) {
    const { data: recentPosts } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, published_at')
      .eq('is_published', true)
      .neq('slug', post.slug)
      .order('published_at', { ascending: false })
      .limit(3)

    relatedPosts = recentPosts || []
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      '@type': 'Person',
      name: post.author_name,
      url: absoluteUrl(`/blog/author/${post.author_slug}`),
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    url: absoluteUrl(`/blog/${post.slug}`),
    publisher: {
      '@type': 'Organization',
      name: 'TPS Worldwide LLC',
      url: absoluteUrl('/'),
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
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: absoluteUrl(`/blog/${post.slug}`),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-zinc-400 truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {(post.tags || []).map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <Link
              href={`/blog/author/${post.author_slug}`}
              className="text-zinc-300 hover:text-primary-400 transition-colors font-medium"
            >
              {post.author_name}
            </Link>
            <span>•</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          </div>
        </header>

        {/* Content */}
        <MarkdownContent content={post.content} />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="mt-16 pt-8 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tool/${tool.slug}`}
                  className="group bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all"
                >
                  <h3 className="text-white font-semibold group-hover:text-primary-400 transition-colors mb-1">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{tool.short_description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-4">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all"
                >
                  <h3 className="text-white font-semibold group-hover:text-primary-400 transition-colors mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-3 mb-3">{relatedPost.excerpt}</p>
                  <time className="text-xs text-zinc-500" dateTime={relatedPost.published_at}>
                    {formatDate(relatedPost.published_at)}
                  </time>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </article>
    </>
  )
}
