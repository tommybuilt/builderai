import type { PriceType, PlatformType } from './database'

export interface ToolFilters {
  search?: string
  category?: string
  price?: PriceType
  platform?: PlatformType
  isOpenSource?: boolean
  isSelfHosted?: boolean
  isOfflineCapable?: boolean
  gpuRequired?: boolean
  difficulty?: number
  minVram?: number
  tags?: string[]
  sort?: 'featured' | 'rating' | 'newest' | 'name'
}

export function parseFiltersFromParams(searchParams: URLSearchParams): ToolFilters {
  const filters: ToolFilters = {}

  const search = searchParams.get('search')
  if (search) filters.search = search

  const category = searchParams.get('category')
  if (category) filters.category = category

  const price = searchParams.get('price')
  if (price && ['free', 'freemium', 'paid', 'unknown'].includes(price)) {
    filters.price = price as PriceType
  }

  const platform = searchParams.get('platform')
  if (platform && ['web', 'local', 'api', 'hybrid', 'unknown'].includes(platform)) {
    filters.platform = platform as PlatformType
  }

  if (searchParams.get('openSource') === 'true') filters.isOpenSource = true
  if (searchParams.get('selfHosted') === 'true') filters.isSelfHosted = true
  if (searchParams.get('offline') === 'true') filters.isOfflineCapable = true
  if (searchParams.get('gpu') === 'true') filters.gpuRequired = true

  const difficulty = searchParams.get('difficulty')
  if (difficulty) {
    const d = parseInt(difficulty)
    if (d >= 1 && d <= 5) filters.difficulty = d
  }

  const minVram = searchParams.get('minVram')
  if (minVram) {
    const v = parseInt(minVram)
    if (v > 0) filters.minVram = v
  }

  const tags = searchParams.get('tags')
  if (tags) filters.tags = tags.split(',').filter(Boolean)

  const sort = searchParams.get('sort')
  if (sort && ['featured', 'rating', 'newest', 'name'].includes(sort)) {
    filters.sort = sort as ToolFilters['sort']
  }

  return filters
}

export function filtersToSearchParams(filters: ToolFilters): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.search) params.set('search', filters.search)
  if (filters.category) params.set('category', filters.category)
  if (filters.price) params.set('price', filters.price)
  if (filters.platform) params.set('platform', filters.platform)
  if (filters.isOpenSource) params.set('openSource', 'true')
  if (filters.isSelfHosted) params.set('selfHosted', 'true')
  if (filters.isOfflineCapable) params.set('offline', 'true')
  if (filters.gpuRequired) params.set('gpu', 'true')
  if (filters.difficulty) params.set('difficulty', String(filters.difficulty))
  if (filters.minVram) params.set('minVram', String(filters.minVram))
  if (filters.tags && filters.tags.length > 0) params.set('tags', filters.tags.join(','))
  if (filters.sort) params.set('sort', filters.sort)

  return params
}
