import { CONSENT_STORAGE_KEY, GPC_DETECTED_KEY, LEGACY_CONSENT_KEY } from '@/lib/consent'

export function ConsentModeScript() {
  const script = `
    (function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = window.gtag || gtag;

      // Default: deny non-essential storage until consent.
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted'
      });

      // Honor Global Privacy Control. If GPC is present, treat it as a valid
      // opt-out for ad_* signals regardless of any prior or future user choice.
      var gpc = !!(navigator && navigator.globalPrivacyControl === true);
      if (gpc) {
        try { localStorage.setItem('${GPC_DETECTED_KEY}', 'true'); } catch (e) {}
      } else {
        try { localStorage.removeItem('${GPC_DETECTED_KEY}'); } catch (e) {}
      }

      try {
        var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
        var legacy = localStorage.getItem('${LEGACY_CONSENT_KEY}');
        var prefs = raw ? JSON.parse(raw) : null;

        if (!prefs && legacy === 'all') {
          prefs = { necessary: true, analytics: true, advertising: true };
        } else if (!prefs && legacy === 'necessary') {
          prefs = { necessary: true, analytics: false, advertising: false };
        }

        if (prefs && prefs.necessary) {
          var adGranted = prefs.advertising && !gpc;
          gtag('consent', 'update', {
            ad_storage: adGranted ? 'granted' : 'denied',
            ad_user_data: adGranted ? 'granted' : 'denied',
            ad_personalization: adGranted ? 'granted' : 'denied',
            analytics_storage: prefs.analytics ? 'granted' : 'denied',
            functionality_storage: 'granted',
            personalization_storage: prefs.analytics ? 'granted' : 'denied',
            security_storage: 'granted'
          });
        }
      } catch (e) {
        // Ignore storage errors.
      }
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
