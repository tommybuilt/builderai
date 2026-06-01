import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { Badge, RatingStars, ToolCard, ScrollToHash, ScrollToTopOnFlash } from '@/components'
import { getDifficultyLabel, getDifficultyColor, getPriceLabel, getPlatformLabel, formatDate } from '@/lib/utils'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'
import { ReviewForm } from './ReviewForm'
import { ToolJsonLd } from './ToolJsonLd'

export const dynamic = 'force-dynamic'

interface ToolPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: tool } = await supabase
    .from('tools')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  const canonicalUrl = absoluteUrl(`/tool/${tool.slug}`)

  return {
    title: tool.name,
    description: tool.short_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...getDefaultOpenGraph({
        title: `${tool.name} - BuilderAI`,
        description: tool.short_description,
        url: canonicalUrl,
      }),
    },
    twitter: getDefaultTwitter({
      title: `${tool.name} - BuilderAI`,
      description: tool.short_description,
    }),
  }
}

export default async function ToolPage({ params, searchParams }: ToolPageProps) {
  const { slug } = await params
  const sp = await searchParams
  const ratingSuccess = sp.rating_success === '1'
  const supabase = await createClient()

  // Fetch tool
  const { data: tool } = await supabase
    .from('tools')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!tool) {
    notFound()
  }

  // Fetch reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('tool_id', tool.id)
    .order('created_at', { ascending: false })
    .limit(20)

  // Fetch related tools (same category)
  const { data: similarTools } = await supabase
    .from('tools')
    .select('*, categories(*)')
    .eq('category_id', tool.category_id)
    .eq('status', 'published')
    .neq('id', tool.id)
    .order('rating_avg', { ascending: false })
    .order('rating_count', { ascending: false })
    .limit(6)

  return (
    <>
      <ScrollToHash />
      <ToolJsonLd tool={tool} />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            <Link href="/tools" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Tools
            </Link>
            {tool.categories && (
              <>
                <span>/</span>
                <Link
                  href={`/category/${tool.categories.slug}`}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {tool.categories.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-zinc-900 dark:text-zinc-200">{tool.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6">
                {tool.featured && (
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 
                                  text-xs font-semibold text-black rounded-full mb-4">
                    Featured Tool
                  </div>
                )}
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{tool.name}</h1>
                <p className="text-lg text-zinc-700 dark:text-zinc-400 mb-4">{tool.short_description}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.is_open_source && <Badge variant="success">Open Source</Badge>}
                  {tool.is_self_hosted && <Badge variant="info">Self Hosted</Badge>}
                  {tool.is_offline_capable && <Badge variant="purple">Offline Capable</Badge>}
                  {tool.gpu_required && (
                    <Badge variant="warning">
                      GPU Required {tool.min_vram_gb ? `(${tool.min_vram_gb}GB+ VRAM)` : ''}
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <RatingStars rating={tool.rating_avg} count={tool.rating_count} size="lg" />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {tool.website_url && (
                    <a
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 
                                 hover:bg-primary-500 rounded-lg font-medium text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Visit Website
                    </a>
                  )}
                  {tool.github_url && (
                    <a
                      href={tool.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 
                                 hover:bg-zinc-700 rounded-lg font-medium text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                  {tool.docs_url && (
                    <a
                      href={tool.docs_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 
                                 hover:bg-zinc-700 rounded-lg font-medium text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Documentation
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              {tool.description && (
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">About</h2>
                  <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{tool.description}</p>
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div id="reviews" className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6">
                <Suspense fallback={null}>
                  <ScrollToTopOnFlash targetId="reviews" />
                </Suspense>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
                  Reviews ({tool.rating_count})
                </h2>

                {ratingSuccess && (
                  <div className="mb-6 px-4 py-3 rounded-lg border bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-800 text-green-800 dark:text-green-300">
                    <p className="text-sm font-medium">Your rating is live. Thanks!</p>
                  </div>
                )}

                {/* Add Review Form (hidden right after a successful rating
                    confirmation; the user just rated) */}
                {!ratingSuccess && (
                  <div className="mb-8 p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
                    <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Leave a Review</h3>
                    <ReviewForm toolId={tool.id} toolSlug={tool.slug} />
                  </div>
                )}

                {/* Reviews List */}
                {reviews && reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="p-4 bg-zinc-100 dark:bg-zinc-800/30 rounded-lg border border-zinc-200 dark:border-zinc-800"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <RatingStars rating={review.rating} size="sm" />
                          <span className="text-xs text-zinc-500">
                            {formatDate(review.created_at)}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-zinc-700 dark:text-zinc-300">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-600 dark:text-zinc-500 text-center py-4">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Details Card */}
              <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-zinc-600 dark:text-zinc-500">Category</dt>
                    <dd className="text-zinc-900 dark:text-white">
                      {tool.categories ? (
                        <Link
                          href={`/category/${tool.categories.slug}`}
                          className="hover:text-primary-400 transition-colors"
                        >
                          {tool.categories.name}
                        </Link>
                      ) : (
                        'Uncategorized'
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-600 dark:text-zinc-500">Price</dt>
                    <dd className="text-zinc-900 dark:text-white">{getPriceLabel(tool.price)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-600 dark:text-zinc-500">Platform</dt>
                    <dd className="text-zinc-900 dark:text-white">{getPlatformLabel(tool.platform)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-600 dark:text-zinc-500">Difficulty</dt>
                    <dd className={getDifficultyColor(tool.difficulty)}>
                      {getDifficultyLabel(tool.difficulty)} ({tool.difficulty}/5)
                    </dd>
                  </div>
                  {tool.license && (
                    <div>
                      <dt className="text-sm text-zinc-600 dark:text-zinc-500">License</dt>
                      <dd className="text-zinc-900 dark:text-white">{tool.license}</dd>
                    </div>
                  )}
                  {tool.gpu_required && tool.min_vram_gb && (
                    <div>
                      <dt className="text-sm text-zinc-600 dark:text-zinc-500">Minimum VRAM</dt>
                      <dd className="text-zinc-900 dark:text-white">{tool.min_vram_gb} GB</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-zinc-600 dark:text-zinc-500">Added</dt>
                    <dd className="text-zinc-900 dark:text-white">{formatDate(tool.created_at)}</dd>
                  </div>
                </dl>
              </div>

              {/* Tags */}
              {tool.tags && tool.tags.length > 0 && (
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/tools?search=${encodeURIComponent(tag)}`}
                        className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-full 
                                   text-sm text-zinc-700 dark:text-zinc-300 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Tools */}
              {similarTools && similarTools.length > 0 && tool.categories && (
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related Tools</h3>
                  <div className="space-y-4">
                    {similarTools.slice(0, 6).map((similar) => (
                      <ToolCard key={similar.id} tool={similar} />
                    ))}
                  </div>
                  <Link
                    href={`/category/${tool.categories.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
                  >
                    Browse all {tool.categories.name} tools
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
