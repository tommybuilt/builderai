/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

export type CookiePreferences = {
  necessary: true
  analytics: boolean
  advertising: boolean
}

export const CONSENT_STORAGE_KEY = 'cookie_preferences'
export const CONSENT_DATE_KEY = 'cookie_consent_date'
export const LEGACY_CONSENT_KEY = 'cookie_consent'
export const GPC_DETECTED_KEY = 'gpc_detected'

export function normalizeLegacyConsent(value: string | null): CookiePreferences | null {
  if (!value) return null
  if (value === 'all') {
    return { necessary: true, analytics: true, advertising: true }
  }
  if (value === 'necessary') {
    return { necessary: true, analytics: false, advertising: false }
  }
  return null
}

// Detects the Global Privacy Control browser signal. CPRA regulations require
// honoring GPC for California residents as a valid opt-out of sale or sharing
// of personal information for cross-context behavioral advertising.
export function detectGPC(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as any).globalPrivacyControl === true
}

export function readStoredPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as CookiePreferences
      if (parsed && parsed.necessary) {
        return {
          necessary: true,
          analytics: Boolean(parsed.analytics),
          advertising: Boolean(parsed.advertising),
        }
      }
    } catch {
      // Ignore invalid data.
    }
  }

  const legacy = normalizeLegacyConsent(window.localStorage.getItem(LEGACY_CONSENT_KEY))
  if (legacy) return legacy
  return null
}

export function storePreferences(prefs: CookiePreferences) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs))
  window.localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString())
  window.localStorage.setItem(LEGACY_CONSENT_KEY, prefs.analytics || prefs.advertising ? 'all' : 'necessary')
  window.dispatchEvent(new Event('cookie-preferences:changed'))
}

export function applyConsentMode(prefs: CookiePreferences) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  const gtag =
    window.gtag ||
    function () {
      window.dataLayer?.push(arguments)
    }
  window.gtag = gtag

  // GPC always overrides ad/share consent. The user's explicit advertising
  // choice via the banner only takes effect if GPC is not present.
  const gpcOn = detectGPC()
  const adGranted = prefs.advertising && !gpcOn

  gtag('consent', 'update', {
    ad_storage: adGranted ? 'granted' : 'denied',
    ad_user_data: adGranted ? 'granted' : 'denied',
    ad_personalization: adGranted ? 'granted' : 'denied',
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    personalization_storage: prefs.analytics ? 'granted' : 'denied',
    security_storage: 'granted',
  })

  if (gpcOn) {
    window.localStorage.setItem(GPC_DETECTED_KEY, 'true')
  } else {
    window.localStorage.removeItem(GPC_DETECTED_KEY)
  }
}
