import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'RBTTrainingAI',
  title: 'RBTTrainingAI - #1 AI Exam Prep for RBT Certification (BACB 2nd Edition)',
  description: 'Master the Registered Behavior Technician (RBT) Exam with the world’s most advanced AI-powered practice simulator, Socrates AI tutor, spaced-repetition flashcards, and BACB task list study guides.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://rbttraining.ai',
  ogImage: 'https://rbttraining.ai/og-image.png',
  keywords: [
    'RBT exam prep',
    'Registered Behavior Technician exam',
    'BACB 2nd Edition task list',
    'RBT practice test',
    'RBT flashcards',
    'ABA student study guide',
    'AI RBT tutor',
    'RBT mock exam',
    'Applied Behavior Analysis exam',
    'RBT training center software',
  ],
  author: 'RBTTrainingAI Inc.',
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
          alt: 'RBTTrainingAI Exam Prep Platform',
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
      creator: '@rbttrainingai',
    },
  };
}
