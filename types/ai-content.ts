// Enterprise AI Content Generation & Knowledge Engine - Core Type Definitions

export type CertificationType = 'RBT' | 'BCaBA' | 'BCBA';

export type AIContentType =
  | 'question'
  | 'flashcard'
  | 'scenario'
  | 'study_guide'
  | 'blog_article'
  | 'glossary_term';

export type ReviewStatus =
  | 'draft'
  | 'needs_review'
  | 'fact_check'
  | 'seo_review'
  | 'approved'
  | 'published'
  | 'rejected'
  | 'archived';

export interface ContentDraft {
  id: string;
  type: AIContentType;
  certification: CertificationType;
  title: string;
  topicCategory: string;
  bacbTaskCode?: string;
  contentPayload: Record<string, any>;
  status: ReviewStatus;
  version: number;
  qualityScore: number; // 0 to 100
  createdByAIProvider: string;
  authorId: string;
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentVersion {
  id: string;
  draftId: string;
  versionNumber: number;
  contentPayloadSnapshot: Record<string, any>;
  editedBy: string;
  changeSummary: string;
  createdAt: string;
}

export interface QualityReport {
  draftId: string;
  overallScore: number; // e.g. 96%
  readingLevel: string; // e.g. 'Grade 10 - Clinical'
  duplicateRiskPercentage: number;
  hasBACBCitation: boolean;
  hasDistractorExplanations: boolean;
  hasSchemaMarkup: boolean;
  issues: string[];
}

export interface KnowledgeItem {
  id: string;
  termOrConcept: string;
  category: string;
  bacbCitation: string;
  canonicalDefinition: string;
  clinicalExamples: string[];
  mnemonicTip?: string;
  relatedItemIds: string[];
  updatedAt: string;
}
