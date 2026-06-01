'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from './Badge'
import { RatingStars } from './RatingStars'
import { RatingPopup } from './RatingPopup'
import { ToolActions } from './ToolActions'
import type { Tool, Category } from '@/lib/types/database'
import { getDifficultyLabel, getDifficultyColor } from '@/lib/utils'

interface ToolCardWithRatingProps {
  tool: Tool & { categories?: Category | null }
  suppressInitialHiddenCallback?: boolean
}

export function ToolCardWithRating({ tool, suppressInitialHiddenCallback = false }: ToolCardWithRatingProps) {
  const [showRatingPopup, setShowRatingPopup] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const isTopRated = tool.rating_avg >= 4.5 && tool.rating_count >= 3

  if (isHidden) {
    return null
  }

  return (
    <>
      <div className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-5 
                      hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/80 
                      transition-all duration-200 shadow-sm dark:shadow-none overflow-hidden">
        {/* Tags container */}
        <div className="absolute -top-px left-6 flex gap-1">
          {tool.featured && (
            <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 
                            text-xs font-semibold text-black rounded-b-lg">
              Featured
            </div>
          )}
          {isTopRated && (
            <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 
                            text-xs font-semibold text-white rounded-b-lg">
              Top Rated
            </div>
          )}
        </div>

        {/* Favorite/Hide Actions */}
        <div className="absolute top-3 right-3">
          <ToolActions
            toolId={tool.id}
            size="sm"
            onHiddenChange={setIsHidden}
            suppressInitialHiddenCallback={suppressInitialHiddenCallback}
          />
        </div>

        <div className="flex flex-col h-full pt-3">
          {/* Header */}
          <div className="mb-3 pr-16 min-w-0">
            <Link href={`/tool/${tool.slug}`}>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                {tool.name}
              </h3>
            </Link>
            {tool.categories && (
              <Link 
                href={`/category/${tool.categories.slug}`}
                className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors block truncate"
              >
                {tool.categories.name}
              </Link>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-700 dark:text-zinc-400 mb-4 line-clamp-2 flex-grow">
            {tool.short_description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.is_open_source && (
              <Badge variant="success">Open Source</Badge>
            )}
            {tool.is_self_hosted && (
              <Badge variant="info">Self Hosted</Badge>
            )}
            {tool.is_offline_capable && (
              <Badge variant="purple">Offline</Badge>
            )}
            {tool.gpu_required && (
              <Badge variant="warning">
                GPU {tool.min_vram_gb ? `${tool.min_vram_gb}GB+` : ''}
              </Badge>
            )}
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-between gap-2 text-sm mb-4 min-w-0">
            <span className={`font-medium shrink-0 ${getDifficultyColor(tool.difficulty)}`}>
              {getDifficultyLabel(tool.difficulty)}
            </span>
            <div className="flex items-center shrink-0">
              <RatingStars rating={tool.rating_avg} count={tool.rating_count} size="sm" />
              <button 
                onClick={() => setShowRatingPopup(true)}
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline ml-1"
                title="Rate this tool"
              >
                Rate
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            {tool.website_url && (
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 
                           bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 
                           rounded-lg text-sm text-zinc-700 dark:text-zinc-300 
                           hover:text-zinc-900 dark:hover:text-white transition-colors min-w-0"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="truncate">Website</span>
              </a>
            )}
            {tool.github_url && (
              <a
                href={tool.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 
                           bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 
                           rounded-lg text-sm text-zinc-700 dark:text-zinc-300 
                           hover:text-zinc-900 dark:hover:text-white transition-colors min-w-0"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" 
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="truncate">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {showRatingPopup && (
        <RatingPopup
          toolSlug={tool.slug}
          toolName={tool.name}
          onClose={() => setShowRatingPopup(false)}
        />
      )}
    </>
  )
}
