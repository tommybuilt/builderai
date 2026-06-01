interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info' | 'purple'
  size?: 'sm' | 'md'
}

const variantStyles = {
  default: 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200',
  success: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/50',
  warning: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50',
  info: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-400 border border-sky-300 dark:border-sky-700/50',
  purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 border border-purple-300 dark:border-purple-700/50',
}

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  )
}
