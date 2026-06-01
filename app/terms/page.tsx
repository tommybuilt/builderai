import { Metadata } from 'next'
import { absoluteUrl, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for BuilderAI - Rules and guidelines for using our AI tools directory.',
  alternates: {
    canonical: absoluteUrl('/terms'),
  },
  openGraph: getDefaultOpenGraph({
    title: 'Terms of Service - BuilderAI',
    description: 'Terms of Service for BuilderAI - Rules and guidelines for using our AI tools directory.',
    url: absoluteUrl('/terms'),
  }),
  twitter: getDefaultTwitter({
    title: 'Terms of Service - BuilderAI',
    description: 'Terms of Service for BuilderAI - Rules and guidelines for using our AI tools directory.',
  }),
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Terms of Service</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Last updated: May 8, 2026</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              By accessing or using BuilderAI.tools, operated by TPS Worldwide LLC in Phoenix, Arizona (&quot;the Website,&quot; &quot;the Service,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these Terms, you do not have permission to access the Service.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 13 years of age (or 16 in the European Economic Area, United Kingdom, and Switzerland) and have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              BuilderAI.tools is an online directory and discovery platform for AI tools, software, and resources. Our Service allows users to:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Browse and search for AI tools across various categories</li>
              <li>View information, descriptions, and links to third-party AI tools</li>
              <li>Create an account to access personalized features</li>
              <li>Submit AI tools for consideration and inclusion in our directory</li>
              <li>Rate and review listed AI tools (requires account)</li>
              <li>Save tools to favorites and hide tools from view (requires account)</li>
              <li>Customize display preferences including light/dark theme</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">3. Account Registration and Authentication</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.1 Account Creation</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              To access certain features of the Service, you must create an account. You may register using:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Email and Password:</strong> You provide your email address, create a password, and choose a display name</li>
              <li><strong>Google Sign-In:</strong> You authenticate using your Google account via OAuth 2.0</li>
              <li><strong>GitHub Sign-In:</strong> You authenticate using your GitHub account via OAuth 2.0</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.2 OAuth Authentication Disclosure</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              When you sign in using Google or GitHub OAuth:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>We receive limited profile information (email address, display name, and profile picture URL) from your OAuth provider</li>
              <li>We do not receive or have access to your passwords on those services</li>
              <li>We do not access your private repositories, files, contacts, or other data beyond basic profile information</li>
              <li>You can revoke our access at any time through your Google or GitHub account settings</li>
              <li>Your use of OAuth is also subject to Google&apos;s and GitHub&apos;s respective terms of service and privacy policies</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.3 Account Responsibilities</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              By creating an account, you agree to:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security and confidentiality of your login credentials</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
              <li>Not create multiple accounts to manipulate ratings, circumvent restrictions, or abuse the Service</li>
              <li>Not share your account credentials with others</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">3.4 Account Data and Features</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Your account enables the following features and associated data collection:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Profile:</strong> Display name (public), email address (private), member since date</li>
              <li><strong>Favorites:</strong> Tools you save as favorites for quick access</li>
              <li><strong>Hidden Tools:</strong> Tools you choose to hide from your browsing experience</li>
              <li><strong>Submissions:</strong> Tools you submit are linked to your account</li>
              <li><strong>Ratings:</strong> Your tool ratings are associated with your account</li>
              <li><strong>Preferences:</strong> Theme preference (light/dark mode) synced to your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">4. Third-Party Tools and Content</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">4.1 No Endorsement</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The AI tools listed in our directory are developed, owned, and operated by third parties. BuilderAI.tools does not own, operate, control, or endorse any of the tools listed. Inclusion of a tool in our directory does not constitute an endorsement, recommendation, or guarantee of its quality, safety, legality, or fitness for any purpose.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">4.2 Third-Party Terms</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Each third-party tool has its own terms of service, privacy policy, and licensing agreements. By using any tool discovered through our Service, you agree to comply with that tool&apos;s terms and conditions. We encourage you to review the terms of any third-party tool before use.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">4.3 Accuracy of Information</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              While we strive to provide accurate and up-to-date information about listed tools, we cannot guarantee the accuracy, completeness, or currentness of any information. Tool features, pricing, availability, and other details may change without notice. Always verify information directly with the tool provider.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">4.4 External Links</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Our Service contains links to external websites and resources. We are not responsible for the content, privacy practices, or availability of these external sites. Accessing external links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">5. User-Generated Content</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">5.1 Submissions</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Users may submit AI tools for inclusion in our directory. By submitting content, you:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Grant us a non-exclusive, worldwide, royalty-free, perpetual license to use, display, and distribute the submitted information</li>
              <li>Represent that you have the right to submit such information</li>
              <li>Acknowledge that we have no obligation to publish any submission</li>
              <li>Understand that submissions may be edited, rejected, or removed at our discretion</li>
              <li>Agree that approved submissions will be attributed to your account (display name visible)</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">5.2 Reviews and Ratings</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Users may rate and review tools listed in our directory. By submitting reviews or ratings, you agree that:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Your reviews reflect your honest opinion and actual experience</li>
              <li>You will not submit false, misleading, or fraudulent reviews</li>
              <li>You will not manipulate ratings through multiple accounts or automated systems</li>
              <li>Ratings require an authenticated account to prevent abuse</li>
              <li>We reserve the right to remove reviews that violate these Terms</li>
            </ul>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">5.3 Content Standards</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              All user-generated content must not:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Contain false, defamatory, or misleading information</li>
              <li>Infringe on any third party&apos;s intellectual property rights</li>
              <li>Contain malicious code, spam, or advertising</li>
              <li>Promote illegal activities or violate any applicable laws</li>
              <li>Harass, abuse, threaten, or harm others</li>
              <li>Contain offensive, obscene, hateful, or inappropriate material</li>
              <li>Impersonate any person or entity</li>
              <li>Violate the privacy or publicity rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">6.1 Our Intellectual Property</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The Service, including its original content (excluding user-generated content and third-party tool information), features, and functionality, is owned by BuilderAI.tools and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">6.2 Third-Party Intellectual Property</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              All trademarks, logos, and brand names displayed on our Service belong to their respective owners. We do not claim ownership of any third-party intellectual property. Use of third-party marks is for identification purposes only and does not imply endorsement.
            </p>

            <h3 className="text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-3">6.3 DMCA and Takedown Requests</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you believe that content on our Service infringes your copyright or other intellectual property rights, please contact us with a detailed description of the alleged infringement. We will investigate and take appropriate action in accordance with applicable laws, including the Digital Millennium Copyright Act (DMCA).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">7. Acceptable Use</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Engage in any form of automated data collection (scraping, crawling) without permission</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service, servers, or networks</li>
              <li>Transmit viruses, malware, or other malicious code</li>
              <li>Circumvent any security measures or access restrictions</li>
              <li>Use the Service for any unauthorized commercial purpose</li>
              <li>Create multiple accounts to manipulate ratings or circumvent restrictions</li>
              <li>Harvest or collect user information without consent</li>
              <li>Engage in any activity that could damage our reputation or goodwill</li>
              <li>Use bots, scripts, or automated tools to interact with the Service without authorization</li>
              <li>Attempt to reverse engineer, decompile, or disassemble any part of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We specifically disclaim all implied warranties, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Merchantability and fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
              <li>Accuracy, reliability, or completeness of information</li>
              <li>Uninterrupted, error-free, or secure operation</li>
              <li>That defects will be corrected</li>
              <li>That the Service or servers are free of viruses or harmful components</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We do not warrant the quality, safety, legality, or suitability of any third-party tools listed in our directory. Use of third-party tools is entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BUILDERAI.TOOLS AND ITS OWNERS, OPERATORS, AFFILIATES, AND LICENSORS SHALL NOT BE LIABLE FOR ANY:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Personal injury or property damage related to use of the Service</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Actions or omissions of third-party tool providers</li>
              <li>Errors, mistakes, or inaccuracies in content</li>
              <li>Service interruptions or unavailability</li>
              <li>Viruses or malicious code transmitted through the Service</li>
              <li>Loss of data stored through the Service</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              In no event shall our total liability exceed the amount you paid to us, if any, in the twelve (12) months preceding the claim, or one hundred dollars ($100 USD), whichever is less.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability. In such cases, our liability shall be limited to the fullest extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">10. Indemnification</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              You agree to defend, indemnify, and hold harmless BuilderAI.tools and its owners, operators, affiliates, licensors, and service providers from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your user-generated content</li>
              <li>Your use of any third-party tools discovered through our Service</li>
              <li>Any misrepresentation made by you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">11. Termination</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Upon termination:
            </p>
            <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-2 mt-3">
              <li>Your right to use the Service will immediately cease</li>
              <li>We may delete your account and associated data (favorites, preferences, etc.)</li>
              <li>Tool submissions you made may remain in the directory</li>
              <li>We may retain certain data as required by law or for legitimate business purposes</li>
              <li>Provisions that by their nature should survive termination shall survive</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              You may delete your account at any time by contacting us at support@tpsworldwidellc.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">12. Governing Law and Dispute Resolution</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Arizona, United States, without regard to conflict of law principles.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Any disputes arising from these Terms or your use of the Service shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              You agree to waive any right to participate in class actions or class-wide arbitration to the extent permitted by law.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              For users in the European Union, European Economic Area, United Kingdom, or Switzerland: Nothing in these Terms affects your rights under mandatory consumer protection laws in your country of residence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">13. International Users</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              The Service is operated from the United States. If you access the Service from outside the United States, you do so at your own risk and are responsible for compliance with local laws.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              We make no representation that the Service is appropriate or available for use in any particular location. Those who choose to access the Service do so on their own initiative and are responsible for compliance with all applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">14. Changes to Terms</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the &quot;Last updated&quot; date at the top of this page and, where appropriate, notifying you via email or through the Service.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
              Your continued use of the Service after any changes constitutes acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">15. Severability</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">16. Waiver</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. Any waiver must be in writing and signed by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">17. Entire Agreement</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              These Terms, together with our <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a> and <a href="/cookies" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</a>, constitute the entire agreement between you and BuilderAI.tools regarding the Service and supersede all prior agreements, understandings, and communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">18. Contact Information</h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <strong>TPS Worldwide LLC</strong> (operator of BuilderAI.tools)<br />
                4539 N 22nd St Ste N<br />
                Phoenix, AZ 85016<br />
                United States<br /><br />
                Phone: (602) 922-3808<br />
                Email: support@tpsworldwidellc.com
              </p>
            </div>
          </section>

          <section className="border-t border-zinc-200 dark:border-zinc-700 pt-8 mt-8">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              By using BuilderAI.tools, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, our <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>, and our <a href="/cookies" className="text-primary-600 dark:text-primary-400 hover:underline">Cookie Policy</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
