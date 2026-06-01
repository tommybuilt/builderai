'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Tool {
  id: string
  name: string
  slug: string
  short_description: string
  rating_avg: number
  created_at: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface SearchBarProps {
  placeholder?: string
  basePath?: string
  showAutocomplete?: boolean
}

export function SearchBar({
  placeholder = 'Search tools...',
  basePath = '/tools',
  showAutocomplete = true,
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('search') || '')
  const [isOpen, setIsOpen] = useState(false)
  const [topRated, setTopRated] = useState<Tool[]>([])
  const [newest, setNewest] = useState<Tool[]>([])
  const [searchResults, setSearchResults] = useState<Tool[]>([])
  const [categoryResults, setCategoryResults] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setQuery(searchParams.get('search') || '')
  }, [searchParams])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch initial data when dropdown opens
  const fetchInitialData = useCallback(async () => {
    if (!showAutocomplete) return

    const supabase = createClient()

    const [topRatedRes, newestRes] = await Promise.all([
      supabase
        .from('tools')
        .select('id, name, slug, short_description, rating_avg, created_at')
        .eq('status', 'published')
        .gt('rating_count', 0)
        .order('rating_avg', { ascending: false })
        .limit(5),
      supabase
        .from('tools')
        .select('id, name, slug, short_description, rating_avg, created_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(5),
    ])

    if (topRatedRes.data) setTopRated(topRatedRes.data)
    if (newestRes.data) setNewest(newestRes.data)
  }, [showAutocomplete])

  // Search with debounce. Queries tools and categories in parallel.
  const searchTools = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim() || !showAutocomplete) {
        setSearchResults([])
        setCategoryResults([])
        return
      }

      setIsLoading(true)
      const supabase = createClient()

      // Expand search terms (tts -> text-to-speech, etc.)
      const expandedTerms = expandSearchTerms(searchQuery)

      try {
        const [toolsRes, categoriesRes] = await Promise.all([
          supabase
            .from('tools')
            .select('id, name, slug, short_description, rating_avg, created_at')
            .eq('status', 'published')
            .or(
              expandedTerms
                .map(
                  (term) =>
                    `name.ilike.%${term}%,short_description.ilike.%${term}%,tags.cs.{${term}}`,
                )
                .join(','),
            )
            .order('rating_avg', { ascending: false })
            .limit(10),
          supabase
            .from('categories')
            .select('id, name, slug')
            .or(`name.ilike.%${searchQuery}%,slug.ilike.%${searchQuery}%`)
            .limit(3),
        ])

        if (toolsRes.error) {
          console.error('[search] tools query error:', toolsRes.error.message)
        }
        if (categoriesRes.error) {
          console.error('[search] categories query error:', categoriesRes.error.message)
        }

        setSearchResults(toolsRes.data || [])
        setCategoryResults(categoriesRes.data || [])
      } catch (err) {
        console.error('[search] threw:', err instanceof Error ? err.message : String(err))
        setSearchResults([])
        setCategoryResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [showAutocomplete],
  )

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      searchTools(query)
    }, 200)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, searchTools])

  // Reset highlight when results change
  useEffect(() => {
    setHighlightIdx(-1)
  }, [searchResults, categoryResults, isOpen, query])

  const handleFocus = () => {
    setIsOpen(true)
    if (topRated.length === 0) {
      fetchInitialData()
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }
    const queryString = params.toString()
    router.push(queryString ? `${basePath}?${queryString}` : basePath)
  }

  const clearSearch = () => {
    setQuery('')
    setSearchResults([])
    setCategoryResults([])
  }

  const handleToolClick = () => {
    setIsOpen(false)
  }

  // Flat list of navigable items (categories first, then tools) for keyboard nav.
  const navItems = useMemo(() => {
    if (!query) return [] as Array<{ kind: 'category'; slug: string } | { kind: 'tool'; slug: string }>
    const items: Array<{ kind: 'category'; slug: string } | { kind: 'tool'; slug: string }> = []
    for (const c of categoryResults) items.push({ kind: 'category', slug: c.slug })
    for (const t of searchResults) items.push({ kind: 'tool', slug: t.slug })
    return items
  }, [query, categoryResults, searchResults])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || navItems.length === 0) {
      if (e.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIdx((idx) => (idx + 1) % navItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIdx((idx) => (idx <= 0 ? navItems.length - 1 : idx - 1))
    } else if (e.key === 'Enter' && highlightIdx >= 0 && highlightIdx < navItems.length) {
      e.preventDefault()
      const sel = navItems[highlightIdx]
      setIsOpen(false)
      if (sel.kind === 'category') {
        router.push(`${basePath}?category=${encodeURIComponent(sel.slug)}`)
      } else {
        router.push(`/tool/${sel.slug}`)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const highlightClass = (i: number) =>
    i === highlightIdx
      ? 'bg-zinc-100 dark:bg-zinc-800'
      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 bg-white dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700 rounded-xl
                       text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2
                       focus:ring-primary-500 focus:border-transparent transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {showAutocomplete && isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
                        rounded-xl shadow-xl dark:shadow-2xl z-[100] max-h-[400px] overflow-y-auto"
        >
          {isLoading && (
            <div className="p-4 text-center text-zinc-500">
              <div className="animate-spin w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          )}

          {!isLoading && query && (categoryResults.length > 0 || searchResults.length > 0) && (
            <>
              {categoryResults.length > 0 && (
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700">
                  <p className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase">Categories</p>
                  {categoryResults.map((cat, i) => (
                    <Link
                      key={cat.id}
                      href={`${basePath}?category=${encodeURIComponent(cat.slug)}`}
                      onClick={handleToolClick}
                      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors ${highlightClass(i)}`}
                    >
                      <p className="font-medium text-zinc-900 dark:text-white truncate">{cat.name}</p>
                      <span className="text-xs text-zinc-500">View all in category</span>
                    </Link>
                  ))}
                </div>
              )}
              {searchResults.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase">Tools</p>
                  {searchResults.map((tool, i) => (
                    <Link
                      key={tool.id}
                      href={`/tool/${tool.slug}`}
                      onClick={handleToolClick}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${highlightClass(categoryResults.length + i)}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-zinc-900 dark:text-white truncate">{tool.name}</p>
                        <p className="text-sm text-zinc-500 truncate">{tool.short_description}</p>
                      </div>
                      {tool.rating_avg > 0 && (
                        <span className="text-xs text-amber-500">★ {tool.rating_avg.toFixed(1)}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {!isLoading && query && categoryResults.length === 0 && searchResults.length === 0 && (
            <div className="p-4 text-center text-zinc-500">No results for &ldquo;{query}&rdquo;</div>
          )}

          {!isLoading && !query && (
            <>
              {topRated.length > 0 && (
                <div className="p-2 border-b border-zinc-200 dark:border-zinc-700">
                  <p className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase">Top Rated</p>
                  {topRated.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tool/${tool.slug}`}
                      onClick={handleToolClick}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-zinc-900 dark:text-white truncate">{tool.name}</p>
                        <p className="text-sm text-zinc-500 truncate">{tool.short_description}</p>
                      </div>
                      <span className="text-xs text-amber-500">★ {tool.rating_avg.toFixed(1)}</span>
                    </Link>
                  ))}
                </div>
              )}

              {newest.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase">Recently Added</p>
                  {newest.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tool/${tool.slug}`}
                      onClick={handleToolClick}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-zinc-900 dark:text-white truncate">{tool.name}</p>
                        <p className="text-sm text-zinc-500 truncate">{tool.short_description}</p>
                      </div>
                      <span className="text-xs text-emerald-500">New</span>
                    </Link>
                  ))}
                </div>
              )}

              {topRated.length === 0 && newest.length === 0 && (
                <div className="p-4 text-center text-zinc-500">Start typing to search...</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Expand search terms for better matching
function expandSearchTerms(query: string): string[] {
  const terms = [query.toLowerCase()]

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

  const lowerQuery = query.toLowerCase()
  for (const [abbr, expanded] of Object.entries(expansions)) {
    if (lowerQuery.includes(abbr)) {
      terms.push(...expanded)
    }
    for (const exp of expanded) {
      if (lowerQuery.includes(exp)) {
        terms.push(abbr)
      }
    }
  }

  return Array.from(new Set(terms))
}
