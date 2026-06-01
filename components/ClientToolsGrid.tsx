'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useToolsCache } from '@/lib/hooks/useToolsCache'
import { useAuth } from './AuthProvider'
import { ToolCardWithRating } from './ToolCardWithRating'
import { createClient } from '@/lib/supabase/client'

export function ClientToolsGrid() {
  const searchParams = useSearchParams()
  const { tools, isLoading, filterTools, lastFetch, refresh } = useToolsCache()
  const { user } = useAuth()
  
  const [hiddenToolIds, setHiddenToolIds] = useState<string[]>([])
  const [favoriteToolIds, setFavoriteToolIds] = useState<string[]>([])
  const [userDataLoading, setUserDataLoading] = useState(true)

  // Load user's hidden and favorite tools
  useEffect(() => {
    async function loadUserData() {
      if (!user) {
        setHiddenToolIds([])
        setFavoriteToolIds([])
        setUserDataLoading(false)
        return
      }

      const supabase = createClient()
      
      const [hiddenRes, favRes] = await Promise.all([
        supabase.from('user_hidden_tools').select('tool_id').eq('user_id', user.id),
        supabase.from('user_favorites').select('tool_id').eq('user_id', user.id)
      ])

      setHiddenToolIds(hiddenRes.data?.map(h => h.tool_id) || [])
      setFavoriteToolIds(favRes.data?.map(f => f.tool_id) || [])
      setUserDataLoading(false)
    }

    loadUserData()
  }, [user])

  // Listen for hide/unhide changes from ToolActions
  useEffect(() => {
    const handleHiddenChange = (e: CustomEvent<{ toolId: string; isHidden: boolean }>) => {
      const { toolId, isHidden } = e.detail
      setHiddenToolIds(prev => {
        if (isHidden) {
          // Add to hidden list if not already there
          return prev.includes(toolId) ? prev : [...prev, toolId]
        } else {
          // Remove from hidden list
          return prev.filter(id => id !== toolId)
        }
      })
    }

    window.addEventListener('tool-hidden-change', handleHiddenChange as EventListener)
    return () => {
      window.removeEventListener('tool-hidden-change', handleHiddenChange as EventListener)
    }
  }, [])

  // Parse filters from URL
  const filters = useMemo(() => ({
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    price: searchParams.get('price') || undefined,
    platform: searchParams.get('platform') || undefined,
    difficulty: searchParams.get('difficulty') ? parseInt(searchParams.get('difficulty')!) : undefined,
    openSource: searchParams.get('openSource') === 'true',
    selfHosted: searchParams.get('selfHosted') === 'true',
    offline: searchParams.get('offline') === 'true',
    gpu: searchParams.get('gpu') === 'true',
    sort: searchParams.get('sort') || 'featured',
  }), [searchParams])

  const viewFilter = searchParams.get('filter')

  // Get filtered tools (client-side filtering - instant!)
  const filteredTools = useMemo(() => {
    if (isLoading) return []

    const shouldExcludeHidden = viewFilter !== 'hidden' && viewFilter !== 'favorites'
    const baseFiltered = filterTools(filters, user && shouldExcludeHidden ? hiddenToolIds : [])

    if (viewFilter === 'favorites' && user) {
      return baseFiltered.filter(t => favoriteToolIds.includes(t.id))
    }
    
    if (viewFilter === 'hidden' && user) {
      return baseFiltered.filter(t => hiddenToolIds.includes(t.id))
    }

    return baseFiltered
  }, [tools, filters, filterTools, viewFilter, user, hiddenToolIds, favoriteToolIds, isLoading])

  // Show loading skeleton
  if (isLoading || (user && userDataLoading)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-zinc-200 dark:bg-zinc-800 rounded-xl h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  // Empty state for favorites/hidden
  if (viewFilter === 'favorites' && favoriteToolIds.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No favorites yet</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Click the heart icon on tools to add them to your favorites.</p>
        </div>
      </div>
    )
  }

  if (viewFilter === 'hidden' && hiddenToolIds.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No hidden tools</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Click the eye icon on tools to hide them from your view.</p>
        </div>
      </div>
    )
  }

  // No results
  if (filteredTools.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
        <div className="col-span-full flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No tools found</h3>
          <p className="text-zinc-600 dark:text-zinc-400">Try adjusting your filters or search query.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Cache status indicator */}
      {lastFetch > 0 && (
        <div className="flex items-center justify-between mb-4 text-xs text-zinc-500">
          <span>{filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found</span>
          <button 
            onClick={refresh}
            className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
            title="Refresh tools"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
        {filteredTools.map((tool) => (
          <ToolCardWithRating
            key={tool.id}
            tool={tool}
            suppressInitialHiddenCallback={viewFilter === 'hidden'}
          />
        ))}
      </div>
    </>
  )
}
