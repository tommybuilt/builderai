'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { readStoredPreferences } from '@/lib/consent'

const GA_MEASUREMENT_ID = 'G-05V35E17WR'

export function AnalyticsScripts() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

  useEffect(() => {
    const syncPreferences = () => {
      const prefs = readStoredPreferences()
      setAnalyticsEnabled(Boolean(prefs?.analytics))
    }

    syncPreferences()
    window.addEventListener('cookie-preferences:changed', syncPreferences)

    return () => {
      window.removeEventListener('cookie-preferences:changed', syncPreferences)
    }
  }, [])

  if (!analyticsEnabled) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
