import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo'

export function SeoJsonLd() {
  const publisher = {
    '@type': 'Organization',
    name: 'TPS Worldwide LLC',
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TPS Worldwide LLC',
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/logo-512.png'),
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tools?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  )
}
