'use client'

export function FooterCookieSettingsLink() {
  const handleOpen = () => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new Event('cookie-settings:open'))
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
    >
      Cookie Settings
    </button>
  )
}
