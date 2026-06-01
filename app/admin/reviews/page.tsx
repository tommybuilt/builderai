import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { DeleteReviewButton } from './DeleteReviewButton'

export const dynamic = 'force-dynamic'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}>{n <= rating ? '★' : '☆'}</span>
      ))}
    </span>
  )
}

interface ReviewRow {
  id: string
  rating: number
  comment: string | null
  user_id: string | null
  created_at: string
  tool: { name: string; slug: string } | null
}

export default async function AdminReviewsPage() {
  const supabase = await createClient()

  const { data: rawReviews, error } = await supabase
    .from('reviews')
    .select('id, rating, comment, user_id, created_at, tool:tools(name, slug)')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <p className="text-red-400">Failed to load reviews: {error.message}</p>
      </div>
    )
  }

  // Supabase returns the joined tool as an array even for single FK; normalize.
  const reviews: ReviewRow[] = (rawReviews || []).map((r: any) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    user_id: r.user_id,
    created_at: r.created_at,
    tool: Array.isArray(r.tool) ? (r.tool[0] || null) : r.tool,
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-zinc-400 mt-1">
            {reviews.length} most recent review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500">No reviews yet</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Tool
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Reviewer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-3">
                      {review.tool ? (
                        <Link
                          href={`/tool/${review.tool.slug}`}
                          target="_blank"
                          className="text-white hover:text-primary-400 transition-colors"
                        >
                          {review.tool.name}
                        </Link>
                      ) : (
                        <span className="text-zinc-500">unknown</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <StarRating rating={review.rating} />
                    </td>
                    <td className="px-6 py-3 text-sm text-zinc-300 max-w-xs">
                      <p className="line-clamp-2">{review.comment || <span className="text-zinc-600 italic">no comment</span>}</p>
                    </td>
                    <td className="px-6 py-3 text-xs text-zinc-500 font-mono">
                      {review.user_id ? review.user_id.slice(0, 8) : 'anon'}
                    </td>
                    <td className="px-6 py-3 text-sm text-zinc-400">{formatDate(review.created_at)}</td>
                    <td className="px-6 py-3 text-right">
                      <DeleteReviewButton id={review.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
