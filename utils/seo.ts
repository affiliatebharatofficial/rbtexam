import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'RBT Practice AI',
  title: 'RBT Practice AI — RBT Exam Practice Questions & Mock Tests',
  description: 'Prepare for the RBT certification exam with practice questions, realistic mock exams, AI tutoring, smart flashcards, and personalized study tools aligned with the current RBT exam content outline.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://rbtpracticeai.com',
  ogImage: 'https://rbtpracticeai.com/og-image.png',
  keywords: [
    'RBT Practice AI',
    'RBT Practice Exam',
    'RBT Practice Test',
    'RBT Mock Exam',
    'RBT Exam Questions',
    'Free RBT Practice Questions',
    'BACB RBT Practice Test',
    'RBT Flashcards',
    'RBT Study Guide',
    'RBT Mock Test',
  ],
  author: 'RBT Practice AI',
};

export function constructMetadata({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  canonicalUrl = SITE_CONFIG.url,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: SITE_CONFIG.keywords,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
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
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
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
      images: [image],
      creator: '@rbtpracticeai',
    },
  };
}
