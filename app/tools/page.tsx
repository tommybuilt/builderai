import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { FiltersPanel, SearchBar, ClientToolsGrid } from '@/components'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

interface ToolsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: ToolsPageProps): Promise<Metadata> {
  const resolvedSearchParams = (await searchParams) || {}
  const hasFilters = Object.values(resolvedSearchParams).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return typeof value === 'string' && value.length > 0
  })

  return {
    title: 'Browse AI Tools',
    description:
      'Explore our curated directory of AI tools for developers. Filter by category, price, platform, and more.',
    alternates: {
      canonical: absoluteUrl('/tools'),
    },
    robots: hasFilters
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    openGraph: getDefaultOpenGraph({
      title: 'Browse AI Tools | BuilderAI.tools',
      description:
        'Explore our curated directory of AI tools for developers. Filter by category, price, platform, and more.',
      url: absoluteUrl('/tools'),
    }),
    twitter: getDefaultTwitter({
      title: 'Browse AI Tools | BuilderAI.tools',
      description:
        'Explore our curated directory of AI tools for developers. Filter by category, price, platform, and more.',
    }),
  }
}

export default async function ToolsPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')
  const { data: toolsForJsonLd } = await supabase
    .from('tools')
    .select('name, slug')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(20)

  const toolsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Browse AI Tools',
    description:
      'Explore our curated directory of AI tools for developers. Filter by category, price, platform, and more.',
    url: absoluteUrl('/tools'),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (toolsForJsonLd || []).map((tool, index) => ({
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
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Browse AI Tools</h1>
          <p className="text-zinc-700 dark:text-zinc-400">
            Explore our curated collection of AI tools for developers and builders.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-xl">
          <Suspense fallback={<div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />}>
            <SearchBar showAutocomplete={false} />
          </Suspense>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <Suspense fallback={<div className="animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-xl h-96" />}>
              <FiltersPanel categories={categories || []} />
            </Suspense>
          </aside>

          {/* Tools Grid - Client-side filtering for instant response */}
          <div className="flex-grow" style={{ contain: 'layout style' }}>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-zinc-200 dark:bg-zinc-800 rounded-xl h-64 animate-pulse" />
                  ))}
                </div>
              }
            >
              <ClientToolsGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
