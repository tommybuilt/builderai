const SITE_ORIGIN = 'https://builderai.tools'
const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`

const SITEMAP_TTL_MS = 1000 * 60 * 60 * 6
const PAGE_TTL_MS = 1000 * 60 * 60 * 6

type SitemapEntry = {
  url: string
  lastmod?: string
}

type PageCacheEntry = {
  fetchedAt: number
  title: string
  text: string
}

const sitemapCache: { fetchedAt: number; entries: SitemapEntry[] } = {
  fetchedAt: 0,
  entries: [],
}

const pageCache = new Map<string, PageCacheEntry>()

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function isRateLimited(ip: string, limit = 30, windowMs = 10 * 60 * 1000) {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }
  entry.count += 1
  rateLimitStore.set(ip, entry)
  return entry.count > limit
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 2)
}

function scoreText(text: string, terms: string[]) {
  if (!text || terms.length === 0) return 0
  const normalized = normalizeText(text)
  let score = 0
  for (const term of terms) {
    if (!term) continue
    const matches = normalized.split(` ${term} `).length - 1
    if (matches > 0) score += matches
  }
  return score
}

function extractTitle(html: string) {
  const match = html.match(/<title>(.*?)<\/title>/i)
  if (!match) return 'BuilderAI.tools'
  return match[1].replace(/\s+/g, ' ').trim()
}

function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchXml(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'BuilderAI.tools Chatbot' },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`)
  }
  return res.text()
}

function parseSitemapUrls(xml: string) {
  const urls: SitemapEntry[] = []
  const locMatches = xml.match(/<loc>(.*?)<\/loc>/gi) || []
  for (const locTag of locMatches) {
    const locMatch = locTag.match(/<loc>(.*?)<\/loc>/i)
    if (!locMatch) continue
    const url = locMatch[1].trim()
    if (!url.startsWith(SITE_ORIGIN)) continue
    urls.push({ url })
  }
  return urls
}

export async function getSitemapEntries() {
  const now = Date.now()
  if (sitemapCache.entries.length > 0 && now - sitemapCache.fetchedAt < SITEMAP_TTL_MS) {
    return sitemapCache.entries
  }

  const xml = await fetchXml(SITEMAP_URL)
  if (xml.includes('<sitemapindex')) {
    const nested = parseSitemapUrls(xml).slice(0, 10)
    const nestedEntries: SitemapEntry[] = []
    for (const entry of nested) {
      if (!entry.url.startsWith(SITE_ORIGIN)) continue
      const nestedXml = await fetchXml(entry.url)
      nestedEntries.push(...parseSitemapUrls(nestedXml))
    }
    sitemapCache.entries = nestedEntries
  } else {
    sitemapCache.entries = parseSitemapUrls(xml)
  }

  sitemapCache.fetchedAt = now
  return sitemapCache.entries
}

export async function getPageContent(url: string) {
  const now = Date.now()
  const cached = pageCache.get(url)
  if (cached && now - cached.fetchedAt < PAGE_TTL_MS) {
    return cached
  }

  const res = await fetch(url, {
    headers: { 'User-Agent': 'BuilderAI.tools Chatbot' },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`)
  }
  const html = await res.text()
  const title = extractTitle(html)
  const text = htmlToText(html)
  const entry: PageCacheEntry = { fetchedAt: now, title, text }
  pageCache.set(url, entry)
  return entry
}

export function selectCandidateUrls(query: string, entries: SitemapEntry[]) {
  const terms = tokenize(query)
  const scored = entries
    .map((entry) => {
      const path = entry.url.replace(SITE_ORIGIN, '')
      const score = scoreText(path, terms)
      return { entry, score }
    })
    .sort((a, b) => b.score - a.score)

  const topMatches = scored.filter((item) => item.score > 0).slice(0, 8)
  if (topMatches.length > 0) {
    return topMatches.map((item) => item.entry.url)
  }

  const fallbackPaths = [
    '/',
    '/tools',
    '/submit',
    '/privacy',
    '/terms',
    '/cookies',
    '/disclosures',
    '/about',
    '/contact',
  ]
  const fallbackUrls = fallbackPaths.map((path) => `${SITE_ORIGIN}${path}`)
  return fallbackUrls.filter((url) => entries.find((entry) => entry.url === url))
}

export function rankContextByQuery(
  query: string,
  pages: Array<{ url: string; title: string; text: string }>
) {
  const terms = tokenize(query)
  const scored = pages
    .map((page) => {
      const score = scoreText(page.text, terms) + scoreText(page.title, terms) * 2
      return { page, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored
    .filter((item) => item.score > 0)
    .slice(0, 5)
    .map((item) => ({
      url: item.page.url,
      title: item.page.title,
      excerpt: item.page.text.slice(0, 1200),
      score: item.score,
    }))
}

export function sanitizeLinks(response: string, allowedUrls: string[]) {
  const urlRegex = /https?:\/\/[^\s)]+/g
  const urls = response.match(urlRegex) || []
  let sanitized = response
  let removed = false
  for (const url of urls) {
    const normalized = url.replace(/[.,)]+$/, '')
    if (!normalized.startsWith(SITE_ORIGIN)) {
      sanitized = sanitized.replace(url, '')
      removed = true
    } else if (!allowedUrls.includes(normalized)) {
      // Allow other builderai.tools pages only if listed in sitemap
      continue
    }
  }
  if (removed) {
    sanitized = `${sanitized.trim()}\n\nI can only link to BuilderAI.tools pages.`
  }
  return sanitized.trim()
}
