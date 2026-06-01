'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// Scrolls the user to the top of the page (or to a named element) on mount
// when one of the known flash query params is present. Used by pages that
// render a flash banner near the top after a redirect: a user submitting
// the edit form lands on /profile?edit_status=saved, and otherwise has to
// scroll up to see the green confirmation banner. This component fixes
// that automatically.
//
// Renders nothing. Side-effect only.

const FLASH_KEYS = [
  // /profile
  'claim_status',
  'claim_error',
  'edit_status',
  // /tool/[slug]
  'rating_success',
  // homepage
  'rating_error',
  // /, /admin/* redirect targets
  'auth_required',
  'auth_error',
]

interface Props {
  /**
   * Optional element ID to scroll into view instead of scrolling to the
   * absolute top. Useful for tool pages where the rating flash banner
   * lives inside a Reviews section partway down the page.
   */
  targetId?: string
}

export function ScrollToTopOnFlash({ targetId }: Props = {}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return

    let hasFlash = false
    for (const key of FLASH_KEYS) {
      if (searchParams.has(key)) {
        hasFlash = true
        break
      }
    }
    if (!hasFlash) return

    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [searchParams, targetId])

  return null
}
