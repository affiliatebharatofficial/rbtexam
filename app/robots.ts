import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/admin',
        '/profile/',
        '/profile',
        '/dashboard/',
        '/dashboard',
        '/auth/',
        '/study-planner/',
        '/study-planner',
      ],
    },
    sitemap: 'https://www.rbtpracticeai.com/sitemap.xml',
  };
}
