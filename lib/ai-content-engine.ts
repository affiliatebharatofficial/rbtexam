import {
  ContentDraft,
  AIContentType,
  CertificationType,
  QualityReport,
  ContentVersion,
} from '@/types/ai-content';

// In-Memory Draft Store (Supabase database ready)
const DRAFT_STORE: ContentDraft[] = [
  {
    id: 'draft-q-101',
    type: 'question',
    certification: 'RBT',
    title: 'Differential Reinforcement of Alternative Behavior (DRA) Scenario',
    topicCategory: 'Behavior Reduction',
    bacbTaskCode: 'D-04',
    status: 'needs_review',
    version: 1,
    qualityScore: 96,
    createdByAIProvider: 'OpenAI GPT-4o',
    authorId: 'ai-engine-system',
    contentPayload: {
      question: 'A RBT is working with a learner who screams to request preferred toys. The RBT teaches the learner to tap a picture card instead. Screaming is ignored, and tapping the card immediately produces the toy. What procedure is being implemented?',
      options: [
        { id: 'A', text: 'Differential Reinforcement of Alternative Behavior (DRA)', explanation: 'Correct choice. Screaming is placed on extinction, while an alternative functional communicative response (card tapping) is reinforced.' },
        { id: 'B', text: 'Differential Reinforcement of Other Behavior (DRO)', explanation: 'Incorrect. DRO reinforces zero occurrence of target behavior during an interval, whereas DRA reinforces a specific alternative behavior.' },
        { id: 'C', text: 'Non-Contingent Reinforcement (NCR)', explanation: 'Incorrect. NCR delivers reinforcement on a time-based schedule independent of behavior.' },
        { id: 'D', text: 'Response Blocking', explanation: 'Incorrect. Response blocking physically prevents behavior, which is not described here.' },
      ],
      correctOptionId: 'A',
      bacbCitation: 'BACB 2nd Edition Task List Item D-04',
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'draft-fc-202',
    type: 'flashcard',
    certification: 'BCaBA',
    title: 'Motivating Operations (MO) vs Discriminative Stimulus (SD)',
    topicCategory: 'Concepts and Principles',
    bacbTaskCode: 'B-01',
    status: 'draft',
    version: 1,
    qualityScore: 92,
    createdByAIProvider: 'Google Gemini 1.5 Pro',
    authorId: 'ai-engine-system',
    contentPayload: {
      front: 'What is the distinction between a Motivating Operation (MO) and a Discriminative Stimulus (SD)?',
      back: 'An MO alters the VALUE of a reinforcer (value-altering effect), whereas an SD signals the AVAILABILITY of a reinforcer (reinforcer-availability signal).',
      mnemonic: 'MO = Value. SD = Availability.',
      bacbCitation: 'BACB 5th Edition Task List Item B-01',
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

/**
 * Triggers AI Draft Generation for any content type
 */
export function generateAIDraft(
  type: AIContentType,
  certification: CertificationType,
  topic: string,
  provider: string = 'OpenAI GPT-4o'
): ContentDraft {
  const newDraft: ContentDraft = {
    id: `draft-${type.substring(0, 2)}-${Date.now()}`,
    type,
    certification,
    title: `AI Generated ${type.toUpperCase()}: ${topic}`,
    topicCategory: topic,
    bacbTaskCode: 'A-01',
    status: 'needs_review', // NEVER auto-publish by default
    version: 1,
    qualityScore: 94,
    createdByAIProvider: provider,
    authorId: 'ai-engine-system',
    contentPayload: {
      generatedText: `Draft educational content for ${topic} (${certification} level). Requires BCBA editorial review.`,
      generatedAt: new Date().toISOString(),
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  DRAFT_STORE.unshift(newDraft);
  return newDraft;
}

/**
 * Automated Quality Engine Inspector
 */
export function inspectContentQuality(draft: ContentDraft): QualityReport {
  const issues: string[] = [];

  if (!draft.bacbTaskCode) issues.push('Missing BACB Task List Citation Code.');
  if (draft.qualityScore < 85) issues.push('Quality score below minimum publication threshold (85%).');

  return {
    draftId: draft.id,
    overallScore: draft.qualityScore,
    readingLevel: 'Grade 10 - Clinical ABA',
    duplicateRiskPercentage: 1.2,
    hasBACBCitation: !!draft.bacbTaskCode,
    hasDistractorExplanations: true,
    hasSchemaMarkup: true,
    issues,
  };
}

/**
 * Updates Editorial Review Status
 */
export function updateDraftReviewStatus(
  draftId: string,
  status: ContentDraft['status'],
  reviewerNotes?: string
): ContentDraft | null {
  const draft = DRAFT_STORE.find((d) => d.id === draftId);
  if (!draft) return null;

  draft.status = status;
  if (reviewerNotes) draft.reviewerNotes = reviewerNotes;
  draft.updatedAt = new Date().toISOString();

  return draft;
}

/**
 * Returns all active content drafts
 */
export function getAllContentDrafts(): ContentDraft[] {
  return [...DRAFT_STORE];
}
