import type { Tool, Category } from '@/lib/types/database'
import { absoluteUrl } from '@/lib/seo'

interface ToolJsonLdProps {
  tool: Tool & { categories: Category | null }
}

export function ToolJsonLd({ tool }: ToolJsonLdProps) {
  const canonicalUrl = absoluteUrl(`/tool/${tool.slug}`)
  const sameAs = [tool.website_url, tool.github_url, tool.docs_url].filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.short_description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: tool.platform === 'web' ? 'Web' : 'Cross-platform',
    mainEntityOfPage: canonicalUrl,
    offers: {
      '@type': 'Offer',
      price: tool.price === 'free' ? '0' : undefined,
      priceCurrency: 'USD',
    },
    aggregateRating:
      tool.rating_count > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: tool.rating_avg,
            ratingCount: tool.rating_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    url: canonicalUrl,
    ...(sameAs.length > 0 && { sameAs }),
    ...(tool.github_url && { codeRepository: tool.github_url }),
    ...(tool.license && { license: tool.license }),
  }

  const breadcrumbItems = [
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
  ]

  if (tool.categories) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: tool.categories.name,
      item: absoluteUrl(`/category/${tool.categories.slug}`),
    })
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 4,
      name: tool.name,
      item: absoluteUrl(`/tool/${tool.slug}`),
    })
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: tool.name,
      item: absoluteUrl(`/tool/${tool.slug}`),
    })
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )
}
