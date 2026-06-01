import Link from 'next/link'
import type { Category } from '@/lib/types/database'

interface CategoryCardProps {
  category: Category & { tools?: { count: number }[] }
}

const categoryIcons: Record<string, string> = {
  'llms': 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'ai-agents-orchestration': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  'image-generation': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  'audio-speech': 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
  'code-assistants': 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  'datasets-training': 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
}

const defaultIcon = 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'

export function CategoryCard({ category }: CategoryCardProps) {
  const iconPath = categoryIcons[category.slug] || defaultIcon
  const toolCount = category.tools?.[0]?.count || 0

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 
                 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/80 
                 transition-all duration-200 shadow-sm dark:shadow-none overflow-hidden"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500/20 to-accent-500/20 
                        rounded-xl flex items-center justify-center flex-shrink-0
                        group-hover:from-primary-500/30 group-hover:to-accent-500/30 transition-colors">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
          </svg>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors break-words hyphens-auto leading-tight">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 break-words">{category.description}</p>
          )}
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">{toolCount} tools</p>
        </div>
      </div>
    </Link>
  )
}
