'use client'

import { useState } from 'react'

interface RatingStarsProps {
  rating: number
  count?: number
  interactive?: boolean
  onRate?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

export function RatingStars({
  rating,
  count,
  interactive = false,
  onRate,
  size = 'md',
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const displayRating = hoverRating || rating

  return (
    <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap">
      <div className="flex flex-shrink-0">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRate?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            <svg
              className={`${sizeClasses[size]} ${
                star <= displayRating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-zinc-300 dark:text-zinc-600 fill-zinc-300 dark:fill-zinc-600'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1 flex-shrink-0">
          {rating.toFixed(1)} ({count})
        </span>
      )}
    </div>
  )
}
