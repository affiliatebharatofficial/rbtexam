import { SEOMetadata, InternalLink, GlossaryTerm, SEOHealthReport } from '@/types/seo';
import { SAMPLE_BACB_QUESTIONS } from './sample-questions';

const BASE_URL = 'https://rbttrainingai.com';

/**
 * Builds standard Next.js Metadata Payload
 */
export function buildSEOMetadata(
  title: string,
  description: string,
  slugPath: string,
  keywords: string[] = ['RBT exam prep', 'BACB 2nd edition task list', 'RBT practice test']
): SEOMetadata {
  const canonicalUrl = `${BASE_URL}${slugPath.startsWith('/') ? slugPath : `/${slugPath}`}`;

  return {
    title: `${title} | RBTTrainingAI`,
    description,
    slug: slugPath,
    canonicalUrl,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    keywords,
    ogImage: `${BASE_URL}/og-image.png`,
    pageType: 'pillar_page',
    certification: 'RBT',
    lastUpdated: new Date().toISOString(),
    readingTimeMinutes: 5,
    author: 'RBTTrainingAI BCBA Editorial Team',
  };
}

/**
 * Generates JSON-LD Question & Answer Schema for Google Rich Snippets
 */
export function generateQuestionJSONLD(question: any) {
  const correctOpt = question.options?.find((o: any) => o.id === question.correctOptionId) || question.options?.[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question.questionText || question.question,
      text: question.scenarioText ? `${question.scenarioText} - ${question.questionText || question.question}` : (question.questionText || question.question),
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${correctOpt?.text || ''}. ${question.aiExplanationDetail || question.answerExplanation || ''}`,
        upvoteCount: 42,
        url: `${BASE_URL}/rbt/question/${question.id}`,
      },
    },
  };
}

/**
 * Generates JSON-LD Educational Course & Quiz Schema
 */
export function generateCourseJSONLD(certification: string = 'RBT') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Official ${certification} Exam Preparation & Practice Simulator`,
    description: `Complete ${certification} certification preparation platform with 85-question mock exams, Leitner flashcards, and Socrates AI Tutor mentorship.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'RBTTrainingAI',
      sameAs: BASE_URL,
    },
    educationalCredentialAwarded: `${certification} Exam Pass Readiness Certification`,
    hasPart: [
      {
        '@type': 'LearningResource',
        name: '85-Question Official BACB Mock Exam Simulator',
        learningResourceType: 'Assessment',
      },
      {
        '@type': 'LearningResource',
        name: 'Leitner 5-Box Spaced Repetition Flashcards',
        learningResourceType: 'Study Guide',
      },
    ],
  };
}

/**
 * Generates JSON-LD BreadcrumbList Schema
 */
export function generateBreadcrumbJSONLD(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

/**
 * Internal Linking Engine: Resolves relevant related links to eliminate orphan pages
 */
export function getRelatedInternalLinks(currentCategory: string = 'Measurement'): InternalLink[] {
  return [
    { title: 'Full 85-Question RBT Mock Exam Simulator', url: '/rbt/mock-exam', category: 'Practice Test', relevanceScore: 98 },
    { title: 'Leitner 5-Box Spaced Repetition Flashcards', url: '/rbt/flashcards', category: 'Flashcards', relevanceScore: 95 },
    { title: 'Socrates AI Tutor BCBA Mentorship', url: '/tutor', category: 'AI Tutor', relevanceScore: 92 },
    { title: 'BACB 2nd Edition Task List Study Guide', url: '/rbt/study-guide', category: 'Study Guide', relevanceScore: 90 },
    { title: 'ABA Clinical Glossary & Terminology Index', url: '/rbt/glossary', category: 'Glossary', relevanceScore: 88 },
  ];
}

/**
 * ABA Glossary Master Terms Store
 */
export const ABA_GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'duration-recording',
    term: 'Duration Recording',
    definition: 'A continuous measurement procedure that tracks the total elapsed time from the onset of a behavior to its cessation.',
    category: 'Measurement',
    bacbCitation: 'BACB 2nd Edition Task List Item A-02',
    clinicalExample: 'Recording that a client engaged in hand-washing for 25 continuous seconds.',
    mnemonicTip: 'Duration = Duration of time from Start to Finish.',
    relatedTerms: ['Latency', 'Frequency', 'Inter-Response Time (IRT)'],
  },
  {
    slug: 'partial-interval-recording',
    term: 'Partial Interval Recording',
    definition: 'A discontinuous measurement procedure where an observer marks (+) if the target behavior occurs at ANY MOMENT during the interval.',
    category: 'Measurement',
    bacbCitation: 'BACB 2nd Edition Task List Item A-03',
    clinicalExample: 'Marking a (+) if screaming occurs for 1 second during a 10-minute window.',
    mnemonicTip: 'PARTial = ANY PART of the interval counts.',
    relatedTerms: ['Whole Interval Recording', 'Momentary Time Sampling'],
  },
  {
    slug: 'differential-reinforcement-dro',
    term: 'Differential Reinforcement of Other Behavior (DRO)',
    definition: 'A behavior reduction procedure that delivers reinforcement contingent on the ZERO occurrence (omission) of the target behavior for a specified time interval.',
    category: 'Behavior Reduction',
    bacbCitation: 'BACB 2nd Edition Task List Item D-04',
    clinicalExample: 'Delivering a token every 5 minutes if the learner does NOT engage in flooring.',
    mnemonicTip: 'DRO = ZERO instances of target behavior.',
    relatedTerms: ['DRA (Alternative)', 'DRI (Incompatible)', 'DRL (Low Rates)'],
  },
];
