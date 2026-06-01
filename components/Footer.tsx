import Link from 'next/link'
import { FooterCookieSettingsLink } from './FooterCookieSettingsLink'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-300 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-zinc-900 dark:text-white">
                Builder<span className="text-primary-500">AI</span>
              </span>
            </Link>
            <p className="text-zinc-700 dark:text-zinc-400 text-sm max-w-md">
              AI tools for people who actually build. Discover the best open-source and
              developer-focused AI tools for your next project.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Directory</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tools" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link href="/tools?sort=rating" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/tools?openSource=true" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Open Source
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@tpsworldwidellc.com"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                   className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://reddit.com/r/LocalLLaMA" target="_blank" rel="noopener noreferrer" 
                   className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  r/LocalLLaMA
                </a>
              </li>
              <li>
                <a href="https://news.ycombinator.com" target="_blank" rel="noopener noreferrer" 
                   className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Hacker News
                </a>
              </li>
              <li>
                <a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noopener noreferrer" 
                   className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  arXiv AI Papers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom utility row: combined copyright/attribution line above,
            single-row link list below. Both centered. */}
        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 max-w-3xl mx-auto">
            &copy; {new Date().getFullYear()} BuilderAI. A TPS Worldwide LLC property.
            All rights reserved. All tools remain property of their respective owners.
          </p>
          <nav
            aria-label="Legal and utility links"
            className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-500"
          >
            <Link
              href="/privacy#your-privacy-choices"
              className="inline-flex items-center gap-1.5 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 14"
                width={22}
                height={11}
                aria-hidden="true"
                className="flex-shrink-0"
              >
                <rect width="30" height="14" rx="7" fill="#1175e0" />
                <circle cx="22" cy="7" r="5" fill="#ffffff" />
                <path d="M3 4 L8 9 M3 9 L8 4" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
              Your Privacy Choices
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/privacy" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Privacy
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/terms" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Terms
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/cookies" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Cookies
            </Link>
            <span aria-hidden="true">&middot;</span>
            <FooterCookieSettingsLink />
            <span aria-hidden="true">&middot;</span>
            <Link href="/disclosures" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Disclosures
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/dmca" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              DMCA
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/about" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              About
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/contact" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
