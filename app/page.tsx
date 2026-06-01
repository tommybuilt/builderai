import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { ToolCard, CategoryCard, SearchBar, ScrollToTopOnFlash } from '@/components'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const dynamic = 'force-dynamic'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const metadata: Metadata = {
  title: {
    absolute: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: getDefaultOpenGraph({ url: absoluteUrl('/') }),
  twitter: getDefaultTwitter(),
}

const RATING_ERROR_MESSAGES: Record<string, string> = {
  expired_or_used: 'That confirmation link expired or was already used. Please rate again.',
  email_mismatch: 'That confirmation link was for a different email. Please rate again with the email you will click from.',
  tool_gone: 'The tool you rated is no longer available.',
  insert_failed: 'Something went wrong saving your rating. Please try again.',
  no_session: "Couldn't confirm your rating. Please try again.",
  missing_token: "Couldn't confirm your rating. Please try again.",
  invalid_token: "Couldn't confirm your rating. Please try again.",
}

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams
  const ratingErrorRaw = typeof sp.rating_error === 'string' ? sp.rating_error : null
  const ratingErrorMsg = ratingErrorRaw ? RATING_ERROR_MESSAGES[ratingErrorRaw] : undefined

  const supabase = await createClient()

  // 30 day cutoff for recently added
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Fetch featured tools
  const { data: featuredTools } = await supabase
    .from('tools')
    .select('*')
    .eq('featured', true)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(6)

  // Fetch all categories with tool counts
  const { data: categories } = await supabase
    .from('categories')
    .select('*, tools(count)')
    .order('name')

  // Fetch recent tools (within 30 days)
  const { data: recentTools } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(6)

  // Fetch top rated tools
  const { data: topRatedTools } = await supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .gt('rating_count', 0)
    .order('rating_avg', { ascending: false })
    .order('rating_count', { ascending: false })
    .limit(6)

  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, author_name, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(6)

  // Get total counts
  const { count: totalTools } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <ScrollToTopOnFlash />
      </Suspense>
      {ratingErrorMsg && (
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <div className="px-4 py-3 rounded-lg border bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-300">
            <p className="text-sm font-medium">{ratingErrorMsg}</p>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10 dark:from-violet-600/20 dark:to-cyan-600/20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 pb-2 bg-gradient-to-r from-zinc-800 via-violet-700 to-cyan-700 dark:from-white dark:via-violet-200 dark:to-cyan-200 bg-clip-text text-transparent leading-tight">
            AI Tools for People
            <br />
            Who Actually Build
          </h1>
          <p className="text-xl text-zinc-700 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Discover the best open-source and developer-focused AI tools. LLMs,
            agents, image generation, RAG, and more for indie makers and power
            users.
          </p>
          <Suspense fallback={<div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse w-full max-w-2xl mx-auto" />}>
            <SearchBar />
          </Suspense>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 md:gap-16 mt-12 pt-8 border-t border-zinc-300 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white">{totalTools || 0}+</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">AI Tools</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white">{categories?.length || 0}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white">100%</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Free to Browse</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">Browse Categories</h2>
            <span className="text-zinc-600 dark:text-zinc-500">{categories?.length || 0} categories</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added Section - MOVED UP */}
      {recentTools && recentTools.length > 0 && (
        <section className="py-16 px-4 bg-zinc-100 dark:bg-zinc-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">Recently Added</h2>
              <Link
                href="/tools?sort=newest"
                className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTools.map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} showRatingPrompt />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Tools Section */}
      {featuredTools && featuredTools.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">Featured Tools</h2>
              <Link
                href="/tools"
                className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} showRatingPrompt />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Rated Section */}
      {topRatedTools && topRatedTools.length > 0 && (
        <section className="py-16 px-4 bg-zinc-100 dark:bg-zinc-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">Top Rated</h2>
              <Link
                href="/tools?sort=rating"
                className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRatedTools.map((tool: any) => (
                <ToolCard key={tool.id} tool={tool} showRatingPrompt />
              ))}
            </div>
          </div>
        </section>
      )}

      {latestPosts && latestPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">From the Blog</h2>
              <Link
                href="/blog"
                className="text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors font-medium"
              >
                View all articles →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-zinc-700 dark:text-zinc-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 gap-4">
                    <span className="truncate">{post.author_name}</span>
                    <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-4">Know a great AI tool?</h2>
          <p className="text-zinc-700 dark:text-zinc-400 mb-8">
            Help the community discover amazing tools by submitting your
            favorites.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg font-medium text-white transition-colors"
          >
            Submit a Tool
          </Link>
        </div>
      </section>
    </div>
  )
}
