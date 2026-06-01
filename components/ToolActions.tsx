'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from './AuthProvider'
import { createClient } from '@/lib/supabase/client'

interface ToolActionsProps {
  toolId: string
  size?: 'sm' | 'md'
  showLabels?: boolean
  onHiddenChange?: (isHidden: boolean) => void
  onFavoriteChange?: (isFavorite: boolean) => void
  suppressInitialHiddenCallback?: boolean
}

export function ToolActions({
  toolId,
  size = 'sm',
  showLabels = false,
  onHiddenChange,
  onFavoriteChange,
  suppressInitialHiddenCallback = false,
}: ToolActionsProps) {
  const { user, loading: authLoading } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState<'favorite' | 'hide' | null>(null)

  useEffect(() => {
    async function checkStatus() {
      if (!user) return

      const supabase = createClient()

      // Check if favorited. maybeSingle returns null on 0 rows (most common
      // case for any tool the user has not favorited) instead of generating
      // a 406 error. Each ToolCard mounts a ToolActions, so the homepage
      // fires 18+ of these queries on every load; .single() was producing
      // a 406 storm in the network tab.
      const { data: favData } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .maybeSingle()

      setIsFavorite(!!favData)

      // Check if hidden. Same maybeSingle treatment for the same reason.
      const { data: hiddenData } = await supabase
        .from('user_hidden_tools')
        .select('id')
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
        .maybeSingle()

      const hidden = !!hiddenData
      setIsHidden(hidden)
      if (!suppressInitialHiddenCallback) {
        onHiddenChange?.(hidden)
      }
    }

    checkStatus()
  }, [user, toolId])

  // Lock body scroll when auth prompt modal is open
  useEffect(() => {
    if (showAuthPrompt) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [showAuthPrompt])

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Show auth prompt if not logged in
    if (!user) {
      setShowAuthPrompt('favorite')
      return
    }
    
    if (loading) return

    setLoading(true)
    const supabase = createClient()

    if (isFavorite) {
      await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
      setIsFavorite(false)
      onFavoriteChange?.(false)
    } else {
      await supabase
        .from('user_favorites')
        .insert({ user_id: user.id, tool_id: toolId })
      setIsFavorite(true)
      onFavoriteChange?.(true)
    }

    setLoading(false)
  }

  const toggleHidden = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Show auth prompt if not logged in
    if (!user) {
      setShowAuthPrompt('hide')
      return
    }
    
    if (loading) return

    setLoading(true)
    const supabase = createClient()

    if (isHidden) {
      await supabase
        .from('user_hidden_tools')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId)
      setIsHidden(false)
      onHiddenChange?.(false)
      // Dispatch custom event for tools grid to refresh
      window.dispatchEvent(new CustomEvent('tool-hidden-change', { detail: { toolId, isHidden: false } }))
    } else {
      await supabase
        .from('user_hidden_tools')
        .insert({ user_id: user.id, tool_id: toolId })
      setIsHidden(true)
      onHiddenChange?.(true)
      // Dispatch custom event for tools grid to refresh
      window.dispatchEvent(new CustomEvent('tool-hidden-change', { detail: { toolId, isHidden: true } }))
    }

    setLoading(false)
  }

  // Don't render during initial auth check to avoid flicker
  if (authLoading) return null

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const buttonClass = size === 'sm' 
    ? 'p-1.5 rounded-md' 
    : 'p-2 rounded-lg'

  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        disabled={loading}
        className={`${buttonClass} transition-colors ${
          isFavorite 
            ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20' 
            : 'text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
        }`}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg 
          className={iconSize} 
          fill={isFavorite ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        {showLabels && <span className="ml-1 text-xs">{isFavorite ? 'Saved' : 'Save'}</span>}
      </button>

      {/* Hide Button */}
      <button
        onClick={toggleHidden}
        disabled={loading}
        className={`${buttonClass} transition-colors ${
          isHidden 
            ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20' 
            : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }`}
        title={isHidden ? 'Click to unhide this tool' : 'Click to hide this tool'}
      >
        <svg 
          className={iconSize} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isHidden ? (
            // Tool is hidden - show crossed-out eye
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          ) : (
            // Tool is visible - show open eye
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          )}
        </svg>
        {showLabels && <span className="ml-1 text-xs">{isHidden ? 'Show' : 'Hide'}</span>}
      </button>

      {/* Auth Prompt Modal - rendered via portal */}
      {showAuthPrompt && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAuthPrompt(null)}
          />
          
          {/* Modal */}
          <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 max-w-sm w-full shadow-xl">
            <button
              onClick={() => setShowAuthPrompt(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                {showAuthPrompt === 'favorite' ? (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                {showAuthPrompt === 'favorite' ? 'Favorites coming soon' : 'Hidden tools coming soon'}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                {showAuthPrompt === 'favorite'
                  ? 'Saving favorites is part of our upcoming passwordless account flow. Check back shortly.'
                  : 'Hiding tools is part of our upcoming passwordless account flow. Check back shortly.'}
              </p>
              <button
                type="button"
                onClick={() => setShowAuthPrompt(null)}
                className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg text-white font-medium transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
