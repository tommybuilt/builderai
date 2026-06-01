import type { Metadata } from 'next'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'DMCA Policy',
  description: 'DMCA policy for BuilderAI.tools, including takedown notice requirements, counter-notices, and repeat infringer policy.',
  alternates: {
    canonical: absoluteUrl('/dmca'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'DMCA Policy | BuilderAI.tools',
    description: 'DMCA policy for BuilderAI.tools, including takedown notice requirements, counter-notices, and repeat infringer policy.',
    url: absoluteUrl('/dmca'),
  }),
  twitter: getDefaultTwitter({
    title: 'DMCA Policy | BuilderAI.tools',
    description: 'DMCA policy for BuilderAI.tools, including takedown notice requirements, counter-notices, and repeat infringer policy.',
  }),
}

export default function DmcaPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">DMCA Policy</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Last updated: May 8, 2026. Effective date: March 16, 2026.</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">1. Overview</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              TPS Worldwide LLC operates BuilderAI.tools from Phoenix, Arizona. We respect the intellectual property rights of others and respond promptly to valid notices submitted under the Digital Millennium Copyright Act.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">2. Designated Agent for DMCA Notices</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Takedown notices and counter-notifications must be sent to the email address or postal address below.
            </p>
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <p className="text-zinc-700 dark:text-zinc-300 font-mono text-sm leading-relaxed">
                TPS Worldwide LLC<br />
                Attn: DMCA Designated Agent<br />
                4539 N 22nd St Ste N<br />
                Phoenix, AZ 85016<br />
                United States<br /><br />
                Phone: (602) 922-3808<br />
                Email: support@tpsworldwidellc.com
              </p>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              TPS Worldwide LLC is registered as a Designated Agent with the U.S. Copyright Office DMCA Designated Agent Directory pursuant to 17 U.S.C. &sect; 512(c)(2). The directory is publicly searchable at{' '}
              <a
                href="https://dmca.copyright.gov/osp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                dmca.copyright.gov/osp
              </a>
              . Our designated agent registration is current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">3. What a Valid Takedown Notice Must Include</h2>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the material claimed to be infringing, including the exact URL or location on BuilderAI.tools</li>
              <li>Your full name, mailing address, telephone number, and email address</li>
              <li>A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law</li>
              <li>A statement that the information in the notice is accurate and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">4. Counter-Notification Requirements</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you believe material was removed or disabled by mistake or misidentification, you may submit a counter-notification to our DMCA Agent. A valid counter-notification must include:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Identification of the material that was removed or disabled, and the location where it appeared before removal</li>
              <li>Your full name, mailing address, telephone number, and email address</li>
              <li>A statement under penalty of perjury that you have a good faith belief the material was removed or disabled due to mistake or misidentification</li>
              <li>A statement that you consent to the jurisdiction of the federal court for Arizona, and that you will accept service of process from the person who submitted the original DMCA notice or their agent</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">5. Repeat Infringer Policy</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We may terminate or restrict access for users or submitters who repeatedly post or submit material that infringes the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">6. Response Timeline</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We review valid notices as quickly as reasonably possible and will remove or disable access to material when appropriate. We will also review valid counter-notifications promptly and restore material when required by law.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
