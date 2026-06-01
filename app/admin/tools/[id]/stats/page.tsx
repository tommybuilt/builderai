'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface ToolStats {
  tool: {
    id: string
    name: string
    slug: string
    short_description: string
    website_url: string | null
    category_name: string | null
    rating_avg: number
    rating_count: number
    featured: boolean
    created_at: string
  }
  reviews: Array<{
    id: string
    user_id: string | null
    user_email: string | null
    rating: number
    comment: string | null
    created_at: string
  }>
  favorites_count: number
  hidden_count: number
  favorited_by: Array<{
    user_id: string
    user_email: string
    created_at: string
  }>
}

export default function ToolStatsPage() {
  const params = useParams()
  const toolId = params.id as string
  
  const [data, setData] = useState<ToolStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchToolStats = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/admin/tools/${toolId}/stats`)
        const result = await res.json()
        
        if (!res.ok) {
          throw new Error(result.error || 'Failed to fetch tool stats')
        }
        
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tool stats')
      } finally {
        setLoading(false)
      }
    }
    
    if (toolId) {
      fetchToolStats()
    }
  }, [toolId])

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !data || !data.tool) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4">{error || 'Tool not found'}</p>
        <Link 
          href="/admin/tools"
          className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white transition-colors inline-block"
        >
          Back to Tools
        </Link>
      </div>
    )
  }

  const { tool, reviews, favorites_count, hidden_count, favorited_by } = data

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/tools"
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
            {tool.featured && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded text-xs font-semibold">
                Featured
              </span>
            )}
          </div>
          <p className="text-zinc-400">{tool.short_description}</p>
        </div>
        <Link
          href={`/admin/tools/${tool.id}/edit`}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg text-white transition-colors"
        >
          Edit Tool
        </Link>
      </div>

      {/* Tool Info Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Tool Info</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-zinc-500 text-sm">Category</p>
            <p className="text-white">{tool.category_name || 'Uncategorized'}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Added</p>
            <p className="text-white">{formatDate(tool.created_at)}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Website</p>
            {tool.website_url ? (
              <a href={tool.website_url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline truncate block">
                {tool.website_url}
              </a>
            ) : (
              <p className="text-zinc-500">None</p>
            )}
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Public Page</p>
            <Link href={`/tool/${tool.slug}`} className="text-primary-400 hover:underline">
              /tool/{tool.slug}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-3xl font-bold text-yellow-400">{Number(tool.rating_avg).toFixed(1)}</span>
          </div>
          <p className="text-zinc-400 text-sm">Avg Rating</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-primary-400">{tool.rating_count}</p>
          <p className="text-zinc-400 text-sm">Reviews</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-pink-400">{favorites_count}</p>
          <p className="text-zinc-400 text-sm">Favorites</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-zinc-400">{hidden_count}</p>
          <p className="text-zinc-400 text-sm">Times Hidden</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Rating Distribution</h2>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-zinc-400 w-6">{rating}★</span>
              <div className="flex-1 bg-zinc-800 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-yellow-500 h-full rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-zinc-400 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">All Reviews ({reviews.length})</h2>
        </div>
        {reviews.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {reviews.map((review) => (
              <div key={review.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {review.user_email ? (
                      <Link href={`/admin/users/${review.user_id}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                        {review.user_email}
                      </Link>
                    ) : (
                      <span className="text-zinc-500">Anonymous</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-zinc-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-zinc-500 text-sm">{formatDate(review.created_at)}</span>
                  </div>
                </div>
                {review.comment && (
                  <p className="text-zinc-400 text-sm">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 text-center text-zinc-500">No reviews yet</p>
        )}
      </div>

      {/* Favorited By */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Favorited By ({favorited_by.length})</h2>
        </div>
        {favorited_by.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {favorited_by.map((fav) => (
              <div key={fav.user_id} className="px-6 py-4 flex items-center justify-between">
                <Link href={`/admin/users/${fav.user_id}`} className="text-white font-medium hover:text-primary-400 transition-colors">
                  {fav.user_email}
                </Link>
                <span className="text-zinc-500 text-sm">{formatDate(fav.created_at)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-6 py-8 text-center text-zinc-500">No one has favorited this tool yet</p>
        )}
      </div>
    </div>
  )
}
