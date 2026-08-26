import { Metadata } from 'next';

export const PRIMARY_DOMAIN = 'https://www.rbtpracticeai.com';

export const SITE_CONFIG = {
  name: 'RBT Practice AI',
  title: 'RBT Practice & Exam Prep 2026 | RBT Practice AI',
  description: 'Start your 7-day free trial for RBT practice. Master the RBT exam with realistic practice questions, 85-question mock tests, and 3rd Edition study tools.',
  url: PRIMARY_DOMAIN,
  ogImage: `${PRIMARY_DOMAIN}/icon-512.png`,
  keywords: [
    'rbt practice',
    'rbt exam',
    'rbt exam online',
    'rbt exam questions',
    'rbt practice exam 2026',
    'rbt mock exam free',
    'rbt exam practice test',
    'rbt exam study guide',
    'rbt exam prep',
    'rbt exam study guide 2026',
    'rbt exam practice',
    'rbt exam review',
    'rbt exam practice questions',
    'rbt practice test',
    'rbt practice questions',
    'rbt practice exam',
    'rbt practice exam 2026 free',
    'rbt practice exam free',
    'rbt practice exam mock free',
    'rbt practice exam 85 questions',
    'RBT Practice AI',
    'BACB RBT 3rd Edition',
  ],
  author: 'RBT Practice AI',
};

export function constructMetadata({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonicalUrl,
  path = '',
  noIndex = false,
  keywords = SITE_CONFIG.keywords,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  path?: string;
  noIndex?: boolean;
  keywords?: string[];
} = {}): Metadata {
  const pagePath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  let fullCanonical = canonicalUrl || `${PRIMARY_DOMAIN}${pagePath || '/'}`;
  
  // Normalize and enforce authoritative https://www.rbtpracticeai.com canonical
  if (fullCanonical.startsWith('http://')) {
    fullCanonical = fullCanonical.replace('http://', 'https://');
  }
  // Replace Cloudflare worker URLs, vercel preview URLs, or non-www domain
  fullCanonical = fullCanonical.replace(/https:\/\/[^/]*workers\.dev/, PRIMARY_DOMAIN);
  fullCanonical = fullCanonical.replace(/https:\/\/[^/]*vercel\.app/, PRIMARY_DOMAIN);
  if (fullCanonical.startsWith('https://rbtpracticeai.com')) {
    fullCanonical = fullCanonical.replace('https://rbtpracticeai.com', PRIMARY_DOMAIN);
  }

  // Remove trailing slash on subpages for strict canonical consistency
  if (fullCanonical.length > PRIMARY_DOMAIN.length && fullCanonical.endsWith('/')) {
    fullCanonical = fullCanonical.slice(0, -1);
  }

  const imageUrl = image.startsWith('http')
    ? image
    : `${PRIMARY_DOMAIN}${image.startsWith('/') ? image : `/${image}`}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    metadataBase: new URL(PRIMARY_DOMAIN),
    alternates: {
      canonical: fullCanonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'RBT Practice AI Platform',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@rbtpracticeai',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: SITE_CONFIG.name,
    },
    verification: {
      google: 'uGt2RdUpAmlBKrTFijBDppyoohE_PxVJIzD5LJHRTv8',
      other: {
        'msvalidate.01': ['2A730A2FAF8DA672C0BDBCC548BEB4FA'],
      },
    },
  };
}
