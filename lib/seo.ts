export const SITE_NAME = 'BuilderAI.tools'
export const SITE_URL = 'https://builderai.tools'
export const DEFAULT_TITLE = 'BuilderAI - AI Tools for People Who Actually Build'
export const DEFAULT_DESCRIPTION =
  'Discover the best open-source and developer-focused AI tools. LLMs, agents, image generation, RAG, and more for indie makers and power users.'

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

export const OG_IMAGE = {
  url: 'https://builderai.tools/og-image.png',
  width: 1200,
  height: 630,
  alt: 'BuilderAI, Curated AI Tools for Developers',
}

export function getDefaultOpenGraph(overrides?: { title?: string; description?: string; url?: string }) {
  return {
    type: 'website',
    locale: 'en_US',
    url: overrides?.url || SITE_URL,
    siteName: SITE_NAME,
    title: overrides?.title || DEFAULT_TITLE,
    description: overrides?.description || DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  }
}

export function getDefaultTwitter(overrides?: { title?: string; description?: string }) {
  return {
    card: 'summary_large_image' as const,
    title: overrides?.title || DEFAULT_TITLE,
    description: overrides?.description || DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  }
}