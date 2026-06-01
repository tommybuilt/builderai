'use client'

export function CookieSettingsButton() {
  const handleOpen = () => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new Event('cookie-settings:open'))
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="inline-flex items-center px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 
                 dark:hover:bg-zinc-600 text-zinc-800 dark:text-zinc-200 font-medium rounded-lg transition-colors"
    >
      Open Cookie Settings
    </button>
  )
}
