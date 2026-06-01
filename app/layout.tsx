import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header, Footer, ThemeProvider, ThemeSync, CookieConsent, AuthProvider, ConsentModeScript, SeoJsonLd, AnalyticsScripts } from '@/components'
import './globals.css'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL, getDefaultOpenGraph, getDefaultTwitter } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://builderai.tools'),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | BuilderAI.tools',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'AI tools',
    'open source AI',
    'LLM',
    'machine learning',
    'developer tools',
    'AI directory',
    'self-hosted AI',
  ],
  authors: [{ name: 'BuilderAI.tools' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: getDefaultOpenGraph(),
  twitter: getDefaultTwitter(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const theme = stored || 'dark';
                const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.add(isDark ? 'dark' : 'light');
              })();
            `,
          }}
        />
        <ConsentModeScript />
        <SeoJsonLd />
      </head>
      <body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white antialiased transition-colors`}>
        <ThemeProvider>
          <AuthProvider>
            <ThemeSync />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <AnalyticsScripts />
            <CookieConsent />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
