import { Metadata } from 'next'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for BuilderAI - Learn how we collect, use, and protect your data.',
  alternates: {
    canonical: absoluteUrl('/privacy'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'Privacy Policy - BuilderAI',
    description: 'Privacy Policy for BuilderAI - Learn how we collect, use, and protect your data.',
    url: absoluteUrl('/privacy'),
  }),
  twitter: getDefaultTwitter({
    title: 'Privacy Policy - BuilderAI',
    description: 'Privacy Policy for BuilderAI - Learn how we collect, use, and protect your data.',
  }),
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Privacy Policy</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Last updated: May 8, 2026</p>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Welcome to BuilderAI.tools, a service operated by TPS Worldwide LLC, Phoenix, Arizona (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              By accessing or using BuilderAI.tools, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              This policy applies to all users worldwide, including those in the European Economic Area (EEA), United Kingdom (UK), Switzerland, California (USA), Brazil, Canada, Australia, and other jurisdictions with specific data protection requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">2.1 Information You Provide Directly</h3>

            <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">Authentication and account access</h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              BuilderAI does not require accounts for browsing or submitting tools. Verified access is offered to users who wish to claim listings they have submitted, edit listings they own, or rate tools. Verified access works through single-use sign-in links sent to your email address. We do not store passwords, and we do not use third-party OAuth providers. Sessions are maintained via cookies set by the Supabase auth library on your browser; you can sign out at any time from your profile.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-3">
              When you complete a verified sign-in, the following are stored against your authenticated session:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Email address:</strong> Used to send single-use sign-in links and the transactional emails described below</li>
              <li><strong>Display name:</strong> Defaults to the local part of your email; shown publicly on any reviews you post</li>
            </ul>

            <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">Email addresses we collect</h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              When you submit a tool, we store the email you provided so we can notify you of approval and send you a link to claim and manage the listing. When you rate a tool, we store the email you used to verify the rating. When you sign in to manage a listing, your email is associated with your authenticated session. We do not share these emails with third parties.
            </p>

            <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">Tool submissions</h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">When you submit a tool, we collect:</p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Tool name, website URL, GitHub URL</li>
              <li>Description and category selection</li>
              <li>Tags you provide</li>
              <li>The email address you provided so we can follow up about the submission</li>
            </ul>

            <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">Ratings and reviews</h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">When you rate a tool, we collect:</p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Your rating (1 to 5 stars)</li>
              <li>Optional comments</li>
              <li>The email used to verify the rating, if you submitted while signed out</li>
              <li>Your user ID and timestamp once the rating is verified and posted</li>
            </ul>

            <h4 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-4 mb-2">User Preferences and Activity</h4>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Favorites:</strong> Tools you save to your favorites list</li>
              <li><strong>Hidden tools:</strong> Tools you choose to hide from your browsing experience</li>
              <li><strong>Theme preference:</strong> Your light/dark mode selection</li>
              <li><strong>Account activity data:</strong> Records associated with your submissions, favorites, ratings, and preferences</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">2.2 Information Collected Automatically</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">When you access our website, we automatically collect:</p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>IP Address:</strong> Used for security, spam prevention, abuse detection, and basic analytics. IP addresses are not used to personally identify you.</li>
              <li><strong>Device Information:</strong> Browser type and version, operating system, device type, screen resolution</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referring URLs, timestamps</li>
              <li><strong>Cookies and Local Storage:</strong> See our <a href="/cookies" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</a> for details</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">2.3 Information from Third Parties</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We may receive information from third-party services we use:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Cloudflare:</strong> Hosting, CDN, and Turnstile bot-protection provider; provides aggregated analytics and performance data (if enabled)</li>
              <li><strong>Supabase:</strong> Database and authentication provider; processes authentication via single-use email links and stores data on our behalf</li>
              <li><strong>Resend:</strong> Transactional email delivery provider used to send sign-in links and notifications</li>
              <li>
                <strong>Google Analytics 4 (Google LLC):</strong> When you grant analytics consent, we use Google Analytics to understand how visitors use the site (pages viewed, session duration, traffic sources). Google Analytics sets cookies on your browser and transmits aggregated usage data to Google. See Google&apos;s Privacy Policy at{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  policies.google.com/privacy
                </a>
                {' '}for details.
              </li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">2.4 Advertising</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We do not currently display advertising. We are evaluating Google AdSense and may activate it in the future. When AdSense is activated, this policy will be updated to disclose: the categories of personal information shared with Google for personalized advertising, the cookies set by Google AdSense (including __gads, __gpi, IDE, NID), the choices you have to opt out of personalized ads (Google&apos;s Ad Settings, our cookie banner), and the legal basis for any sharing of personal information with Google for advertising purposes.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-3">
              If and when advertising is enabled, you will be able to control ad personalization through
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
              . Our cookie banner will let you reject advertising cookies regardless of those external settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">3. Legal Basis for Processing (GDPR)</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              For users in the EEA, UK, and Switzerland, we process your personal data based on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Contract Performance:</strong> Processing necessary to provide our services (account creation, tool submissions, ratings)</li>
              <li><strong>Consent:</strong> Where you have given explicit consent (e.g., optional marketing communications, magic-link sign-in)</li>
              <li><strong>Legitimate Interests:</strong> For fraud prevention, security, service improvement, and analytics, balanced against your rights</li>
              <li><strong>Legal Obligation:</strong> Where required by applicable law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">4. How We Use Your Information</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">We use the information we collect for:</p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Provide Services:</strong> Operate our AI tools directory, process submissions, display ratings, manage accounts</li>
              <li><strong>Personalization:</strong> Remember your preferences (theme, favorites, hidden tools), customize your experience</li>
              <li><strong>Authentication:</strong> Verify your identity via single-use email links and manage your authenticated session</li>
              <li><strong>Communication:</strong> Send single-use sign-in links, submission and approval notifications, security alerts, and service updates</li>
              <li><strong>Security:</strong> Prevent fraud, spam, abuse, and unauthorized access; protect users and the service</li>
              <li><strong>Analytics:</strong> Understand usage patterns, improve our service, fix bugs, optimize performance</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws, respond to legal requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">5. Email Communications</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              By using a part of the service that requires verified access (claiming a listing, editing a listing you own, rating a tool), you consent to receive the following transactional emails:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Sign-in links:</strong> Single-use links sent on demand when you request access; expire shortly after issue</li>
              <li><strong>Submission notifications:</strong> Confirmation that we received your tool submission, plus an approval email with a claim link if it is accepted</li>
              <li><strong>Rating confirmations:</strong> When you rate a tool while signed out, a one-time link to confirm and post your rating, followed by a receipt that the rating is live</li>
              <li><strong>Security notifications:</strong> Important alerts about your authenticated session</li>
              <li><strong>Service updates:</strong> Essential changes to our service or policies</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              <strong>We do not send marketing emails</strong> unless you explicitly opt in. You can unsubscribe from optional communications at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">6. Data Sharing and Disclosure</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Service Providers:</strong> Third-party services that help operate our platform:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Cloudflare (hosting, CDN, and Turnstile bot-protection challenges shown on submit, sign-in, and rating forms)</li>
                  <li>Supabase (database and authentication; Supabase delivers single-use sign-in links and stores authenticated sessions on our behalf)</li>
                  <li>Resend (transactional email delivery for sign-in links and notifications)</li>
                  <li>Google LLC (Mountain View, California): provides Google Analytics 4 for site usage analytics. Data is transmitted only when the visitor has granted analytics consent via our cookie banner. Google&apos;s privacy practices:{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      policies.google.com/privacy
                    </a>
                    .
                  </li>
                </ul>
                These providers are contractually bound to protect your data and use it only for specified purposes.
              </li>
              <li><strong>Public Information:</strong> Your display name, review activity, and submission attribution may be publicly visible</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, subpoena, or governmental authority</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, safety, or property, and that of our users</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, bankruptcy, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">7. International Data Transfers</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have different data protection laws.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              For transfers from the EEA, UK, or Switzerland, we rely on:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Data Processing Agreements with our service providers</li>
              <li>The EU-U.S. Data Privacy Framework where the receiving party is certified (Google LLC, our Google Analytics provider, is certified)</li>
              <li>Other legally recognized transfer mechanisms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">8. Data Retention</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Account Data:</strong> Retained until you request account deletion</li>
              <li><strong>Tool Submissions:</strong> Retained indefinitely as part of the directory (may remain after account deletion)</li>
              <li><strong>Ratings/Reviews:</strong> Retained indefinitely to maintain rating accuracy</li>
              <li><strong>Favorites/Hidden Tools:</strong> Deleted when you remove them or delete your account</li>
              <li><strong>Usage Logs:</strong> Retained for up to 90 days for security and analytics</li>
              <li><strong>Backup Data:</strong> May persist in backups for up to 30 days after deletion</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We may retain certain data longer if required by law or for legitimate business purposes (e.g., fraud prevention, dispute resolution).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">9. Data Security</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Encryption of data in transit using TLS/SSL (HTTPS)</li>
              <li>Encryption of data at rest in our databases</li>
              <li>Passwordless authentication via single-use email links; we do not store passwords</li>
              <li>Row-level security policies in our database</li>
              <li>Bot-protection challenges (Cloudflare Turnstile) on submit, sign-in, and rating forms to deter automated abuse</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls limiting who can access your data</li>
              <li>Secure infrastructure provided by Cloudflare and Supabase</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">10. Your Privacy Rights</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">10.1 Rights for All Users</h3>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and personal data</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">10.2 European Economic Area, UK, Switzerland (GDPR)</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you are located in the EEA, UK, or Switzerland, you have additional rights under GDPR:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong>Right to Erasure:</strong> Request deletion (&quot;right to be forgotten&quot;)</li>
              <li><strong>Right to Lodge Complaint:</strong> File a complaint with your local data protection authority</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">10.3 California Residents (CCPA/CPRA)</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              California residents have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Right to Know:</strong> Know what personal information is collected, used, and shared</li>
              <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell personal information)</li>
              <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
              <li><strong>Right to Correct:</strong> Correct inaccurate personal information</li>
              <li><strong>Right to Limit:</strong> Limit the use of sensitive personal information</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-3">
              <strong>Do Not Sell My Personal Information:</strong> We do not sell your personal information to third parties.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">10.4 Brazil (LGPD)</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Brazilian residents have rights under the Lei Geral de Proteção de Dados (LGPD), including access, correction, deletion, and portability rights similar to GDPR.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">10.5 How to Exercise Your Rights</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              To exercise any of these rights, please contact us at support@tpsworldwidellc.com. We will respond within the timeframes required by applicable law (generally within 30 days). We may need to verify your identity before processing your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">11. Children&apos;s Privacy</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Our website is not intended for children under the age of 13 (or 16 in the EEA, UK, and Switzerland). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately at support@tpsworldwidellc.com, and we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">12. Third-Party Links</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Our website contains links to third-party websites, including the AI tools listed in our directory. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">13. Browser Signals</h2>
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">Global Privacy Control (GPC)</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We honor the Global Privacy Control browser signal as a valid opt-out request from California residents under the CPRA. When our site detects a GPC signal in your browser, we treat it as a request to opt out of any sale or sharing of personal information. We do not currently sell personal information; if we begin sharing personal information for cross-context behavioral advertising in the future (such as via Google AdSense), GPC signals will automatically opt you out.
            </p>
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">Do Not Track (DNT)</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Because there is no industry consensus on how to interpret DNT, we do not respond to DNT signals at this time. You can still manage privacy preferences through our cookie settings and your browser controls.
            </p>
          </section>

          <section id="your-privacy-choices" className="scroll-mt-24">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">13a. Your Privacy Choices</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              California residents have the right under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), to opt out of the sale or sharing of personal information. BuilderAI.tools does not currently sell personal information. We may, in the future, share personal information for cross-context behavioral advertising (for example, through Google AdSense). When that happens, the choices below will be how you opt out:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Use the &quot;Cookie Settings&quot; button in our footer to manage your consent at any time. Rejecting advertising cookies blocks any sharing of your personal information for cross-context behavioral advertising.</li>
              <li>Send a Global Privacy Control (GPC) signal from your browser. We honor GPC automatically and treat it as a valid opt-out request.</li>
              <li>Email{' '}
                <a
                  href="mailto:support@tpsworldwidellc.com"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  support@tpsworldwidellc.com
                </a>
                {' '}with the subject line &quot;Privacy Choices&quot; to submit a written opt-out request.
              </li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We will not discriminate against you for exercising any of these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">13b. Data Protection Officer</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              TPS Worldwide LLC does not meet the GDPR Article 37 thresholds requiring the appointment of a Data Protection Officer (we are not a public authority, our core activities do not require systematic monitoring of data subjects on a large scale, and we do not process special categories of data on a large scale). For privacy-related inquiries, including questions about EEA personal data, contact us at support@tpsworldwidellc.com and we will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">14. Changes to This Privacy Policy</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the &quot;Last updated&quot; date at the top</li>
              <li>Sending an email notification for significant changes (to addresses associated with verified access on the service)</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Your continued use of the website after any changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">15. Contact Us</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you have any questions about this Privacy Policy, your personal information, or wish to exercise your rights, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <strong>TPS Worldwide LLC</strong> (operator of BuilderAI.tools)<br />
                4539 N 22nd St Ste N<br />
                Phoenix, AZ 85016<br />
                United States<br /><br />
                Phone: (602) 922-3808<br />
                Email: support@tpsworldwidellc.com<br /><br />
                For EU/UK data protection inquiries, you may also contact your local supervisory authority.
              </p>
            </div>
          </section>

          <section className="border-t border-zinc-200 dark:border-zinc-700 pt-8 mt-8">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              This Privacy Policy is part of and should be read in conjunction with our <a href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</a> and <a href="/cookies" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
