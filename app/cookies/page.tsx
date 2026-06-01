import { Metadata } from 'next'
import Link from 'next/link'
import { CookieSettingsButton } from '@/components'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for BuilderAI - Learn about how we use cookies and similar technologies.',
  alternates: {
    canonical: absoluteUrl('/cookies'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'Cookie Policy - BuilderAI',
    description: 'Cookie Policy for BuilderAI - Learn about how we use cookies and similar technologies.',
    url: absoluteUrl('/cookies'),
  }),
  twitter: getDefaultTwitter({
    title: 'Cookie Policy - BuilderAI',
    description: 'Cookie Policy for BuilderAI - Learn about how we use cookies and similar technologies.',
  }),
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Cookie Policy</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Last updated: May 8, 2026</p>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              This Cookie Policy explains how BuilderAI.tools, operated by TPS Worldwide LLC in Phoenix, Arizona (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), uses cookies and similar tracking technologies when you visit our website. This policy should be read alongside our <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link>.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              By using our Website, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should set your browser settings accordingly or not use our Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">2. What Are Cookies?</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, provide information to website owners, and enhance user experience.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Persistent Cookies:</strong> Remain on your device until they expire or you delete them. They are activated each time you visit the website that created them.</li>
              <li><strong>Session Cookies:</strong> Temporary and deleted when you close your browser. They allow websites to link your actions during a browser session.</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Cookies can be &quot;first-party&quot; (set by us) or &quot;third-party&quot; (set by our service providers).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.1 Strictly Necessary Cookies</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              These cookies are essential for the Website to function properly. They enable core functionality such as security, authentication, and accessibility. You cannot opt out of these cookies as the Website would not function properly without them.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-zinc-300 dark:border-zinc-700 rounded-lg">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Cookie Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Purpose</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">cookie_consent</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Stores your cookie consent preferences</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">1 year</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">First-party</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">sb-*-auth-token</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Supabase authentication session token</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Session/7 days</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">First-party</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">sb-*-auth-token-code-verifier</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">OAuth PKCE code verifier for secure authentication</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Session</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">First-party</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.2 Functional/Preference Cookies</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              These cookies enable enhanced functionality and personalization. They remember your preferences so we can provide a better user experience.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-zinc-300 dark:border-zinc-700 rounded-lg">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Cookie/Storage Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Purpose</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">theme</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Stores your light/dark mode preference</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Persistent</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Local Storage</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.3 Analytics/Performance Cookies</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              These cookies collect information about how visitors use our Website, such as which pages are visited most often. We use Google Analytics 4 (property ID G-05V35E17WR) to gather aggregated, IP-anonymized usage data. We only set these cookies after you grant analytics consent via the cookie banner.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-zinc-300 dark:border-zinc-700 rounded-lg">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Cookie Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Set by</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Purpose</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">_ga</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Google Analytics</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Distinguishes unique users</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">_ga_05V35E17WR</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Google Analytics</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">GA4 property cookie tied to property G-05V35E17WR; persists session state</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">_gid</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Google Analytics</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Distinguishes users within a 24 hour window</td>
                    <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              These cookies are set as first-party cookies on builderai.tools, but the data is reported to Google LLC. Google&apos;s privacy practices: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">policies.google.com/privacy</a>.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.4 Advertising/Targeting Cookies</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We do not currently display advertising. We are evaluating Google AdSense and may activate it in the future. When AdSense is activated, third-party advertising cookies will be set, including but not limited to <span className="font-mono">__gads</span>, <span className="font-mono">__gpi</span>, <span className="font-mono">IDE</span>, and <span className="font-mono">NID</span>. These cookies are not currently set. They will be set only after AdSense is activated and only if you grant advertising consent via the cookie banner.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-3">
              When advertising is enabled, you can learn more about Google&apos;s advertising cookies and control personalization via
              {' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Google Ads Settings
              </a>
              {' '}
              or opt out of interest-based advertising through
              {' '}
              <a
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                aboutads.info
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">4. OAuth and Authentication Cookies</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              When you sign in using Google or GitHub OAuth, additional cookies may be set:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Google OAuth:</strong> Google may set cookies during the authentication process. These are governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Google&apos;s Privacy Policy</a>.</li>
              <li><strong>GitHub OAuth:</strong> GitHub may set cookies during authentication. These are governed by <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">GitHub&apos;s Privacy Statement</a>.</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              These third-party OAuth cookies are only set when you actively choose to sign in with these providers. We do not control these cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">5. Third-Party Cookies</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Our Website uses the following third-party services that may set cookies:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Cloudflare:</strong> Hosting and CDN provider. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Cloudflare Privacy Policy</a></li>
              <li><strong>Supabase:</strong> Database and authentication provider. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Supabase Privacy Policy</a></li>
              <li><strong>Google LLC (Google Analytics 4):</strong> Reports aggregated site usage. The <span className="font-mono">_ga</span>, <span className="font-mono">_ga_05V35E17WR</span>, and <span className="font-mono">_gid</span> cookies are set as first-party cookies on builderai.tools, but the data is reported to Google. Only set after analytics consent. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Google Privacy Policy</a></li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We do not control third-party cookies. Please refer to the respective privacy policies for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">6. Similar Technologies</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              In addition to cookies, we use other similar technologies:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Local Storage:</strong> Used to store your theme preference (light/dark mode) and authentication state. This data remains on your device.</li>
              <li><strong>Session Storage:</strong> Temporary storage that is cleared when you close your browser tab. Used for transient session data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">7. Managing Your Cookie Preferences</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">7.1 Cookie Consent Banner</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              When you first visit our Website, you will see a cookie consent banner that allows you to:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Accept All:</strong> Enables all categories of cookies</li>
              <li><strong>Reject Non-Essential:</strong> Enables only strictly necessary cookies</li>
              <li><strong>Manage:</strong> Choose analytics and advertising preferences</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              You can also change your cookie preferences here:
            </p>
            <div className="mt-3">
              <CookieSettingsButton />
            </div>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">7.2 Browser Settings</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Most web browsers allow you to control cookies through their settings:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>View what cookies are stored on your device</li>
              <li>Delete individual cookies or all cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies from being set</li>
              <li>Receive notifications when cookies are being set</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Browser cookie management instructions:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Microsoft Edge</a></li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">7.3 Consequences of Disabling Cookies</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you disable cookies:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>You will not be able to sign in to your account</li>
              <li>Your theme preference may not be saved between visits</li>
              <li>Some features of the Website may not function properly</li>
              <li>You may need to manually adjust settings each time you visit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">8. Do Not Track Signals</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Some browsers have a &quot;Do Not Track&quot; (DNT) feature. Our Website does not currently respond to DNT signals, as there is no industry standard for DNT. However, you can manage cookies using the methods described above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">9. International Users</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you are visiting from the European Economic Area (EEA), United Kingdom, Switzerland, or other regions with cookie consent laws:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>We obtain consent before setting non-essential cookies</li>
              <li>You can withdraw consent at any time by clearing your cookies</li>
              <li>You have the right to be informed about cookie usage</li>
              <li>You have the right to access data collected through cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Our Website is not intended for children under the age of 13 (or 16 in the EEA/UK). We do not knowingly collect personal information from children through cookies or any other means.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">11. Changes to This Cookie Policy</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We may update this Cookie Policy from time to time. We will notify you of changes by posting the new Cookie Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">12. Contact Us</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <p className="text-zinc-700 dark:text-zinc-300">
                <strong>TPS Worldwide LLC</strong><br />
                BuilderAI.tools<br />
                Phoenix, Arizona, United States<br />
                Email: support@tpsworldwidellc.com<br />
                Support: support@tpsworldwidellc.com
              </p>
            </div>
          </section>

          <section className="border-t border-zinc-200 dark:border-zinc-700 pt-8 mt-8">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              This Cookie Policy is part of and should be read in conjunction with our <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
