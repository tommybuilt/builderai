import { MetadataRoute } from 'next'

const BASE_URL = 'https://builderai.tools'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/admin-signin',
          '/api/',
          '/auth/',
          '/profile',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
