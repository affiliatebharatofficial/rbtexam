// Enterprise Programmatic SEO Engine - Core Type Definitions

export type CertificationLevel = 'RBT' | 'BCaBA' | 'BCBA';

export type PageType =
  | 'pillar_page'
  | 'question_page'
  | 'flashcard_page'
  | 'glossary_page'
  | 'practice_test_page'
  | 'scenario_page'
  | 'blog_page';

export interface SEOMetadata {
  title: string;
  description: string;
  slug: string;
  canonicalUrl: string;
  robots: string; // e.g. 'index, follow'
  keywords: string[];
  ogImage?: string;
  pageType: PageType;
  certification: CertificationLevel;
  lastUpdated: string;
  readingTimeMinutes?: number;
  author: string;
}

export interface InternalLink {
  title: string;
  url: string;
  category: string;
  relevanceScore: number; // 0 to 100
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  category: string;
  bacbCitation: string;
  clinicalExample: string;
  mnemonicTip?: string;
  relatedTerms: string[];
}

export interface SEOHealthReport {
  healthScore: number; // 0 to 100 (e.g. 98%)
  indexedPagesCount: number;
  brokenLinksCount: number;
  orphanPagesCount: number;
  duplicateContentRiskCount: number;
  schemaValidationHealthPercentage: number;
  lastAuditDate: string;
}
