import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ToolCard, FiltersPanel, SearchBar } from '@/components'
import { parseFiltersFromParams } from '@/lib/types/filters'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const dynamic = 'force-dynamic'

// Old category slugs merged in May 2026. Returns 308 (permanent) so search
// engines transfer link equity from the old URLs to the keepers.
const MERGED_CATEGORY_SLUGS: Record<string, string> = {
  'agents-automation': 'ai-agents-orchestration',
  'llms-inference': 'llm-inference-serving',
  'rag-search': 'rag-document-retrieval',
  'observability': 'ai-observability-evaluation',
  'dev-tools': 'ai-frameworks-libraries',
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const resolvedSearchParams = (await searchParams) || {}
  const hasFilters = Object.values(resolvedSearchParams).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return typeof value === 'string' && value.length > 0
  })
  const supabase = await createClient()
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} AI Tools`,
    description: category.description || `Browse the best ${category.name} AI tools for developers.`,
    alternates: {
      canonical: absoluteUrl(`/category/${category.slug}`),
    },
    robots: hasFilters
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: getDefaultOpenGraph({
      title: `${category.name} AI Tools | BuilderAI.tools`,
      description: category.description || `Browse the best ${category.name} AI tools for developers.`,
      url: absoluteUrl(`/category/${category.slug}`),
    }),
    twitter: getDefaultTwitter({
      title: `${category.name} AI Tools | BuilderAI.tools`,
      description: category.description || `Browse the best ${category.name} AI tools for developers.`,
    }),
  }
}

async function fetchCategoryTools(categoryId: string, searchParams: URLSearchParams) {
  const supabase = await createClient()
  const filters = parseFiltersFromParams(searchParams)

  let query = supabase.from('tools').select('*, categories(*)').eq('category_id', categoryId).eq('status', 'published')

  // Apply filters
  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`
    )
  }

  if (filters.price) {
    query = query.eq('price', filters.price)
  }

  if (filters.platform) {
    query = query.eq('platform', filters.platform)
  }

  if (filters.isOpenSource) {
    query = query.eq('is_open_source', true)
  }

  if (filters.isSelfHosted) {
    query = query.eq('is_self_hosted', true)
  }

  if (filters.isOfflineCapable) {
    query = query.eq('is_offline_capable', true)
  }

  if (filters.gpuRequired) {
    query = query.eq('gpu_required', true)
  }

  if (filters.difficulty) {
    query = query.lte('difficulty', filters.difficulty)
  }

  // Apply sorting
  switch (filters.sort) {
    case 'rating':
      query = query.order('rating_avg', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'name':
      query = query.order('name', { ascending: true })
      break
    case 'featured':
    default:
      query = query.order('featured', { ascending: false }).order('rating_avg', { ascending: false })
  }

  const { data: tools } = await query
  return tools || []
}

function CategoryToolsGrid({ tools }: { tools: any[] }) {
  if (!tools || tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No tools found</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Try adjusting your filters or check back later.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} showRatingPrompt />
      ))}
    </div>
  )
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params

  if (MERGED_CATEGORY_SLUGS[slug]) {
    permanentRedirect(`/category/${MERGED_CATEGORY_SLUGS[slug]}`)
  }

  const queryParams = await searchParams

  const supabase = await createClient()

  // Fetch category
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    notFound()
  }

  // Fetch all categories for filters
  const { data: categories } = await supabase.from('categories').select('*').order('name')

  const urlSearchParams = new URLSearchParams()
  Object.entries(queryParams).forEach(([key, value]) => {
    if (typeof value === 'string') {
      urlSearchParams.set(key, value)
    }
  })

  const tools = await fetchCategoryTools(category.id, urlSearchParams)
  const toolsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} AI Tools`,
    description: category.description || `Browse the best ${category.name} AI tools for developers.`,
    url: absoluteUrl(`/category/${category.slug}`),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tools.slice(0, 20).map((tool: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: absoluteUrl(`/tool/${tool.slug}`),
      })),
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: absoluteUrl('/tools'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: absoluteUrl(`/category/${category.slug}`),
      },
    ],
  }

  return (
    <div className="min-h-screen py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
            <a href="/tools" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Tools
            </a>
            <span>/</span>
            <span className="text-zinc-700 dark:text-zinc-200">{category.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{category.name} AI Tools</h1>
          {category.description && <p className="text-zinc-600 dark:text-zinc-400">{category.description}</p>}
        </div>

        {/* Search */}
        <div className="mb-8 max-w-xl">
          <Suspense fallback={<div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />}>
            <SearchBar basePath={`/category/${slug}`} />
          </Suspense>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <Suspense fallback={<div className="bg-zinc-200 dark:bg-zinc-800 rounded-xl h-96" />}>
              <FiltersPanel categories={categories || []} basePath={`/category/${slug}`} />
            </Suspense>
          </aside>

          {/* Tools Grid */}
          <div className="flex-grow">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-zinc-200 dark:bg-zinc-800 rounded-xl h-64" />
                  ))}
                </div>
              }
            >
              <CategoryToolsGrid tools={tools} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
