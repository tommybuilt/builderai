'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tool, Category } from '@/lib/types/database'

const CACHE_KEY = 'builderai_tools_cache'
// 60 seconds. Long enough for tab-to-tab navigation to feel instant via the
// memoized list, short enough that newly published tools (or status flips on
// existing tools) become visible to repeat visitors within a minute. The
// previous 5-minute window meant a tool could disappear from a user's
// browse view if they had cached state and no other event invalidated it.
const CACHE_DURATION = 60 * 1000

interface CachedData {
  tools: (Tool & { categories: Category | null })[]
  categories: Category[]
  timestamp: number
}

interface Filters {
  search?: string
  category?: string
  price?: string
  platform?: string
  difficulty?: number
  openSource?: boolean
  selfHosted?: boolean
  offline?: boolean
  gpu?: boolean
  sort?: string
}

export function useToolsCache() {
  const [tools, setTools] = useState<(Tool & { categories: Category | null })[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastFetch, setLastFetch] = useState<number>(0)

  // Load from cache or fetch
  const loadTools = useCallback(async (forceRefresh = false) => {
    // Check cache first
    if (!forceRefresh && typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const data: CachedData = JSON.parse(cached)
          const age = Date.now() - data.timestamp
          
          if (age < CACHE_DURATION) {
            setTools(data.tools)
            setCategories(data.categories)
            setLastFetch(data.timestamp)
            setIsLoading(false)
            return
          }
        }
      } catch (e) {
        // Cache read failed, continue to fetch
      }
    }

    // Fetch from server
    setIsLoading(true)
    const supabase = createClient()

    const [toolsRes, catsRes] = await Promise.all([
      supabase.from('tools').select('*, categories(*)').eq('status', 'published').order('featured', { ascending: false }).order('rating_avg', { ascending: false }),
      supabase.from('categories').select('*').order('name')
    ])

    const newTools = toolsRes.data || []
    const newCategories = catsRes.data || []
    
    setTools(newTools)
    setCategories(newCategories)
    setLastFetch(Date.now())
    setIsLoading(false)

    // Save to cache
    if (typeof window !== 'undefined') {
      try {
        const cacheData: CachedData = {
          tools: newTools,
          categories: newCategories,
          timestamp: Date.now()
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
      } catch (e) {
        // Cache write failed, ignore
      }
    }
  }, [])

  // Initial load
  useEffect(() => {
    loadTools()
  }, [loadTools])

  // Filter function (runs client-side)
  const filterTools = useCallback((filters: Filters, hiddenToolIds: string[] = []): (Tool & { categories: Category | null })[] => {
    let filtered = [...tools]

    // Exclude hidden tools
    if (hiddenToolIds.length > 0) {
      filtered = filtered.filter(t => !hiddenToolIds.includes(t.id))
    }

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const searchTerms = expandSearchTerms(searchLower)
      
      filtered = filtered.filter(tool => {
        const nameLower = tool.name.toLowerCase()
        const descLower = (tool.short_description || '').toLowerCase()
        const tags = tool.tags || []
        
        return searchTerms.some(term => 
          nameLower.includes(term) || 
          descLower.includes(term) ||
          tags.some(tag => tag.toLowerCase().includes(term))
        )
      })
    }

    // Category
    if (filters.category) {
      filtered = filtered.filter(t => t.categories?.slug === filters.category)
    }

    // Price
    if (filters.price) {
      filtered = filtered.filter(t => t.price === filters.price)
    }

    // Platform
    if (filters.platform) {
      filtered = filtered.filter(t => t.platform === filters.platform)
    }

    // Difficulty
    if (filters.difficulty) {
      const maxDifficulty = filters.difficulty
      filtered = filtered.filter(t => t.difficulty <= maxDifficulty)
    }

    // Feature toggles
    if (filters.openSource) {
      filtered = filtered.filter(t => t.is_open_source)
    }
    if (filters.selfHosted) {
      filtered = filtered.filter(t => t.is_self_hosted)
    }
    if (filters.offline) {
      filtered = filtered.filter(t => t.is_offline_capable)
    }
    if (filters.gpu) {
      filtered = filtered.filter(t => t.gpu_required)
    }

    // Sort
    switch (filters.sort) {
      case 'rating':
        filtered.sort((a, b) => b.rating_avg - a.rating_avg)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured !== b.featured) return b.featured ? 1 : -1
          return b.rating_avg - a.rating_avg
        })
    }

    return filtered
  }, [tools])

  return {
    tools,
    categories,
    isLoading,
    lastFetch,
    filterTools,
    refresh: () => loadTools(true)
  }
}

// Expand search terms for better matching
function expandSearchTerms(query: string): string[] {
  const terms = [query]
  
  const expansions: Record<string, string[]> = {
    'tts': ['text-to-speech', 'text to speech', 'speech synthesis'],
    'stt': ['speech-to-text', 'speech to text', 'speech recognition'],
    'llm': ['large language model', 'language model'],
    'rag': ['retrieval augmented generation', 'retrieval-augmented'],
    'ocr': ['optical character recognition', 'text recognition'],
    'nlp': ['natural language processing'],
    'asr': ['automatic speech recognition', 'speech recognition'],
    'cv': ['computer vision', 'image recognition'],
    'ml': ['machine learning'],
    'ai': ['artificial intelligence'],
  }

  for (const [abbr, expanded] of Object.entries(expansions)) {
    if (query.includes(abbr)) {
      terms.push(...expanded)
    }
    for (const exp of expanded) {
      if (query.includes(exp)) {
        terms.push(abbr)
      }
    }
  }

  return Array.from(new Set(terms))
}
