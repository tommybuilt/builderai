'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useAuth } from './AuthProvider'
import type { Category } from '@/lib/types/database'

interface FiltersPanelProps {
  categories: Category[]
  basePath?: string
}

export function FiltersPanel({ categories, basePath = '/tools' }: FiltersPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pendingRef = useRef<Set<string>>(new Set())
  const { user } = useAuth()
  const isCategoryPage = basePath.startsWith('/category/')
  const currentCategorySlug = isCategoryPage ? basePath.split('/')[2] ?? '' : ''

  // URL-based state
  const urlOpenSource = searchParams.get('openSource') === 'true'
  const urlSelfHosted = searchParams.get('selfHosted') === 'true'
  const urlOffline = searchParams.get('offline') === 'true'
  const urlGpu = searchParams.get('gpu') === 'true'

  // Optimistic local state for instant UI feedback
  const [localState, setLocalState] = useState({
    openSource: urlOpenSource,
    selfHosted: urlSelfHosted,
    offline: urlOffline,
    gpu: urlGpu,
  })

  // Sync local state with URL when URL changes (after navigation completes)
  useEffect(() => {
    setLocalState({
      openSource: urlOpenSource,
      selfHosted: urlSelfHosted,
      offline: urlOffline,
      gpu: urlGpu,
    })
    pendingRef.current.clear()
  }, [urlOpenSource, urlSelfHosted, urlOffline, urlGpu])

  const handleCheckboxChange = useCallback((key: keyof typeof localState) => {
    // Immediately update local state for instant visual feedback
    const newValue = !localState[key]
    setLocalState(prev => ({ ...prev, [key]: newValue }))

    // Update URL without scroll - use replaceState for instant feel
    const params = new URLSearchParams(searchParams.toString())
    if (newValue) {
      params.set(key, 'true')
    } else {
      params.delete(key)
    }
    const queryString = params.toString()

    // Use router.replace for snappier feel (doesn't add to history for each toggle)
    router.replace(queryString ? `${basePath}?${queryString}` : basePath, { scroll: false })
  }, [basePath, router, searchParams, localState])

  const updateFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === null || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    
    if (key === 'category' && isCategoryPage) {
      const paramsWithoutCategory = new URLSearchParams(params.toString())
      paramsWithoutCategory.delete('category')
      const queryString = paramsWithoutCategory.toString()

      if (!value) {
        router.push(`/tools${queryString ? `?${queryString}` : ''}`, { scroll: false })
        return
      }

      router.push(`/category/${value}${queryString ? `?${queryString}` : ''}`, { scroll: false })
      return
    }

    // Use replace for instant feel without adding to browser history
    const queryString = params.toString()
    router.replace(queryString ? `${basePath}?${queryString}` : basePath, { scroll: false })
  }, [basePath, router, searchParams, isCategoryPage])

  const clearFilters = useCallback(() => {
    router.push(basePath, { scroll: false })
  }, [basePath, router])

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 rounded-xl p-5 shadow-sm dark:shadow-none transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-zinc-900 dark:text-white">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* View Mode - Only for logged in users */}
        {user && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">View</label>
            <select
              value={searchParams.get('filter') || ''}
              onChange={(e) => updateFilter('filter', e.target.value || null)}
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg 
                         text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="">All Tools</option>
              <option value="favorites">My Favorites</option>
              <option value="hidden">Hidden Tools</option>
            </select>
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Category</label>
          <select
            value={searchParams.get('category') || currentCategorySlug || ''}
            onChange={(e) => updateFilter('category', e.target.value || null)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg 
                       text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Price</label>
          <select
            value={searchParams.get('price') || ''}
            onChange={(e) => updateFilter('price', e.target.value || null)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg 
                       text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <option value="">Any Price</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Platform</label>
          <select
            value={searchParams.get('platform') || ''}
            onChange={(e) => updateFilter('platform', e.target.value || null)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg 
                       text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <option value="">Any Platform</option>
            <option value="web">Web</option>
            <option value="local">Local/Desktop</option>
            <option value="api">API</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Max Difficulty</label>
          <select
            value={searchParams.get('difficulty') || ''}
            onChange={(e) => updateFilter('difficulty', e.target.value || null)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg 
                       text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <option value="">Any Difficulty</option>
            <option value="1">Beginner (1)</option>
            <option value="2">Easy (2)</option>
            <option value="3">Intermediate (3)</option>
            <option value="4">Advanced (4)</option>
            <option value="5">Expert (5)</option>
          </select>
        </div>

        {/* Toggle filters - Multi-select with debounce */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Features</label>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={localState.openSource}
              onChange={() => handleCheckboxChange('openSource')}
              className="w-4 h-4 rounded border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 
                         text-primary-500 focus:ring-primary-500 focus:ring-offset-0 transition-colors cursor-pointer"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              Open Source
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={localState.selfHosted}
              onChange={() => handleCheckboxChange('selfHosted')}
              className="w-4 h-4 rounded border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 
                         text-primary-500 focus:ring-primary-500 focus:ring-offset-0 transition-colors cursor-pointer"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              Self Hosted
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={localState.offline}
              onChange={() => handleCheckboxChange('offline')}
              className="w-4 h-4 rounded border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 
                         text-primary-500 focus:ring-primary-500 focus:ring-offset-0 transition-colors cursor-pointer"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              Offline Capable
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={localState.gpu}
              onChange={() => handleCheckboxChange('gpu')}
              className="w-4 h-4 rounded border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 
                         text-primary-500 focus:ring-primary-500 focus:ring-offset-0 transition-colors cursor-pointer"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              GPU Required
            </span>
          </label>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Sort By</label>
          <select
            value={searchParams.get('sort') || 'featured'}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg 
                       text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  )
}
