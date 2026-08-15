import { MetadataRoute } from 'next';
import { SAMPLE_BACB_QUESTIONS } from '@/lib/sample-questions';
import { ABA_GLOSSARY_TERMS } from '@/lib/seo-engine';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rbtpracticeai.com';

  // Core Static & Pillar Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/rbt`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/rbt/practice-test`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/rbt/mock-exam`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/rbt/questions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/rbt/flashcards`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/rbt/glossary`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/rbt/study-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Programmatic Question Pages (/rbt/question/[slug])
  const questionRoutes: MetadataRoute.Sitemap = SAMPLE_BACB_QUESTIONS.map((q) => ({
    url: `${baseUrl}/rbt/question/${q.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Programmatic Glossary Term Pages (/rbt/glossary/[slug])
  const glossaryRoutes: MetadataRoute.Sitemap = ABA_GLOSSARY_TERMS.map((g) => ({
    url: `${baseUrl}/rbt/glossary/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...questionRoutes, ...glossaryRoutes];
}
