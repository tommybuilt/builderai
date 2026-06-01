import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getDifficultyLabel(difficulty: number): string {
  switch (difficulty) {
    case 1:
      return 'Beginner'
    case 2:
      return 'Easy'
    case 3:
      return 'Intermediate'
    case 4:
      return 'Advanced'
    case 5:
      return 'Expert'
    default:
      return 'Unknown'
  }
}

export function getDifficultyColor(difficulty: number): string {
  switch (difficulty) {
    case 1:
      return 'text-green-400'
    case 2:
      return 'text-lime-400'
    case 3:
      return 'text-yellow-400'
    case 4:
      return 'text-orange-400'
    case 5:
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

export function getPriceLabel(price: string): string {
  switch (price) {
    case 'free':
      return 'Free'
    case 'freemium':
      return 'Freemium'
    case 'paid':
      return 'Paid'
    default:
      return 'Unknown'
  }
}

export function getPlatformLabel(platform: string): string {
  switch (platform) {
    case 'web':
      return 'Web'
    case 'local':
      return 'Local/Desktop'
    case 'api':
      return 'API'
    case 'hybrid':
      return 'Hybrid'
    default:
      return 'Unknown'
  }
}

// Auto-suggest difficulty based on tool attributes
export interface ToolAttributes {
  platform?: string
  gpu_required?: boolean
  min_vram_gb?: number | null
  is_self_hosted?: boolean
  is_offline_capable?: boolean
  is_open_source?: boolean
}

export interface DifficultySuggestion {
  suggested: number
  reasons: string[]
}

export function suggestDifficulty(tool: ToolAttributes): DifficultySuggestion {
  let score = 1 // Start at Beginner
  const reasons: string[] = []

  // Platform impact
  if (tool.platform === 'web') {
    // Web stays easy
    reasons.push('Web-based: easy access (+0)')
  } else if (tool.platform === 'local') {
    score += 1
    reasons.push('Local install required (+1)')
  } else if (tool.platform === 'api') {
    score += 0.5
    reasons.push('API integration needed (+0.5)')
  } else if (tool.platform === 'hybrid') {
    score += 0.5
    reasons.push('Hybrid setup (+0.5)')
  }

  // GPU requirement - significant complexity
  if (tool.gpu_required) {
    score += 1
    reasons.push('GPU required (+1)')
    
    // VRAM requirements add more complexity
    if (tool.min_vram_gb) {
      if (tool.min_vram_gb >= 24) {
        score += 1.5
        reasons.push(`High VRAM ${tool.min_vram_gb}GB+ (+1.5)`)
      } else if (tool.min_vram_gb >= 16) {
        score += 1
        reasons.push(`Medium VRAM ${tool.min_vram_gb}GB (+1)`)
      } else if (tool.min_vram_gb >= 8) {
        score += 0.5
        reasons.push(`Some VRAM ${tool.min_vram_gb}GB (+0.5)`)
      }
    }
  }

  // Self-hosted adds complexity
  if (tool.is_self_hosted) {
    score += 0.5
    reasons.push('Self-hosted option (+0.5)')
  }

  // Offline capable often means more complex setup
  if (tool.is_offline_capable && tool.platform !== 'web') {
    score += 0.5
    reasons.push('Offline setup (+0.5)')
  }

  // Clamp to 1-5 range
  const suggested = Math.min(5, Math.max(1, Math.round(score)))

  return { suggested, reasons }
}
