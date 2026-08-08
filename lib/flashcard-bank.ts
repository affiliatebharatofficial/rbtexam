import {
  Flashcard,
  FlashcardFilterParams,
  FlashcardPaginationResult,
  SpacedRepetitionState,
  LearningMode,
} from '@/types/flashcard';
import { createInitialCardState, calculateNextSpacedRepetition } from './spaced-repetition-engine';
import { MASTER_QUESTION_BANK } from './master-question-bank';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';

// Master Flashcard Seed Bank
export const MASTER_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-rbt-001',
    title: 'Continuous Measurement: Duration',
    front: 'What is Duration recording in ABA data collection?',
    back: 'Duration recording measures the TOTAL amount of time from the onset of a target behavior to its cessation.',
    cardType: 'basic',
    explanation: 'Duration is used when measuring how long a behavior lasts (e.g. length of a tantrum, time spent engaging in play).',
    clinicalExplanation: 'Duration recording requires a start and stop timestamp. In clinical trial data collection, it is reported as total minutes/seconds or as a percentage of total session time.',
    memoryTip: 'Mnemonic: "Duration = Duration of time from Start to Finish."',
    realLifeExample: 'Tracking that a child engaged in hand-washing for 25 seconds.',
    commonMistakes: 'Confusing duration with latency (latency measures time from SD to start).',
    reference: 'BACB 2nd Edition Task List Item A-02',
    certification: 'RBT',
    category: 'Measurement',
    subcategory: 'Continuous Measurement',
    difficulty: 'easy',
    keywords: ['Duration', 'Continuous Measurement', 'Data Collection'],
    tags: ['Measurement', 'RBT Core', 'High Weight'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'fc-rbt-002',
    title: 'Discontinuous Measurement: Partial Interval',
    front: 'How is Partial Interval Recording scored during an observation window?',
    back: 'Partial Interval Recording scores a positive (+) occurrence if the target behavior happens at ANY MOMENT during the interval.',
    cardType: 'definition',
    explanation: 'Partial Interval Recording does NOT require the behavior to persist throughout the entire window.',
    clinicalExplanation: 'Partial Interval Recording tends to OVERESTIMATE the true frequency of behavior. It is frequently used for behavior reduction targets (e.g. vocal outbursts).',
    memoryTip: 'Mnemonic: "PARTial = ANY PART of the interval counts."',
    realLifeExample: 'If a client screams for 1 second during a 10-minute interval, mark (+).',
    commonMistakes: 'Confusing Partial Interval with Whole Interval (Whole Interval requires behavior for the ENTIRE interval).',
    reference: 'BACB 2nd Edition Task List Item A-03',
    certification: 'RBT',
    category: 'Measurement',
    subcategory: 'Discontinuous Measurement',
    difficulty: 'medium',
    keywords: ['Partial Interval', 'Discontinuous Measurement', 'Overestimate'],
    tags: ['Measurement', 'Discontinuous'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T11:00:00.000Z',
    updatedAt: '2026-08-01T11:00:00.000Z',
  },
  {
    id: 'fc-rbt-003',
    title: 'Differential Reinforcement: DRO',
    front: 'What does DRO (Differential Reinforcement of Other Behavior) reinforce?',
    back: 'DRO delivers reinforcement contingent on the ZERO occurrence (omission) of the target behavior for a specified time window.',
    cardType: 'scenario',
    explanation: 'DRO reinforces the absence of the problem behavior. Reinforcement is delivered if the client did NOT engage in the behavior.',
    clinicalExplanation: 'DRO = Differential Reinforcement of Omission / Other behavior. A timer is set; if no target behavior occurs during the timer window, reinforcer is delivered.',
    memoryTip: 'Mnemonic: "DRO = ZERO instances of behavior."',
    realLifeExample: 'Giving a sticker every 5 minutes if the child does NOT hit.',
    commonMistakes: 'Reinforcing another problem behavior that occurs during the window. Ensure replacement behaviors are taught.',
    reference: 'BACB 2nd Edition Task List Item D-04',
    certification: 'RBT',
    category: 'Behavior Reduction',
    subcategory: 'Differential Reinforcement',
    difficulty: 'hard',
    keywords: ['DRO', 'Omission', 'Differential Reinforcement'],
    tags: ['Behavior Reduction', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-02T09:00:00.000Z',
    updatedAt: '2026-08-02T09:00:00.000Z',
  },
];

// In-memory & LocalStorage Custom Flashcard Store
let CUSTOM_FLASHCARDS: Flashcard[] = [];

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('rbt_custom_flashcards');
    if (saved) {
      CUSTOM_FLASHCARDS = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load custom flashcards from storage', e);
  }
}

/**
 * Add a custom or AI-generated flashcard to the user deck with persistence
 */
export function addCustomFlashcard(card: Partial<Flashcard>): Flashcard {
  const newCard: Flashcard = {
    id: card.id || `fc-custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: card.title || 'Custom BACB Flashcard',
    front: card.front || 'Front Prompt',
    back: card.back || 'Back Answer',
    cardType: card.cardType || 'ai_generated',
    explanation: card.explanation || 'Detailed clinical rationale for this BACB task list item.',
    clinicalExplanation: card.clinicalExplanation || 'Applied Behavior Analysis clinical implementation note.',
    memoryTip: card.memoryTip || 'Remember key antecedent-behavior-consequence relationships.',
    realLifeExample: card.realLifeExample || 'Example ABA clinical scenario.',
    commonMistakes: card.commonMistakes || 'Confusing related behavioral terms.',
    reference: card.reference || 'BACB Task List Standard',
    certification: card.certification || 'RBT',
    category: (card.category as any) || 'Measurement',
    difficulty: card.difficulty || 'medium',
    keywords: card.keywords || ['ABA', 'RBT'],
    tags: card.tags || ['Custom', 'AI Generated'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: card.createdBy || 'user_ai',
    updatedBy: 'user_ai',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  CUSTOM_FLASHCARDS.unshift(newCard);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('rbt_custom_flashcards', JSON.stringify(CUSTOM_FLASHCARDS));
    } catch (e) {
      console.error('Failed to save custom flashcards', e);
    }
  }

  return newCard;
}

// In-memory User Spaced Repetition Progress Store
const USER_PROGRESS_STORE: Record<string, SpacedRepetitionState> = {};

/**
 * Get user spaced repetition state for a card
 */
export function getUserCardState(cardId: string, userId: string = 'default_user'): SpacedRepetitionState {
  const key = `${userId}_${cardId}`;
  if (!USER_PROGRESS_STORE[key]) {
    USER_PROGRESS_STORE[key] = createInitialCardState(cardId, userId);
  }
  return USER_PROGRESS_STORE[key];
}

/**
 * Update card spaced repetition state after user feedback rating
 */
export function updateUserCardRating(cardId: string, rating: any, userId: string = 'default_user'): SpacedRepetitionState {
  const current = getUserCardState(cardId, userId);
  const updated = calculateNextSpacedRepetition(current, Number(rating) as any);
  const key = `${userId}_${cardId}`;
  USER_PROGRESS_STORE[key] = updated;
  return updated;
}

/**
 * Dynamically generate flashcards from Master Question Bank items
 */
export function generateFlashcardsFromQuestions(): Flashcard[] {
  const generated: Flashcard[] = MASTER_QUESTION_BANK.map((mq) => ({
    id: `fc-gen-${mq.id}`,
    title: `${mq.category}: ${mq.certification} Item`,
    front: mq.scenarioText ? `[Scenario] ${mq.scenarioText}\n\nQuestion: ${mq.question}` : mq.question,
    back: `Correct Answer: ${mq.options.find((o) => o.id === mq.correctAnswerId)?.text || mq.correctAnswerId}\n\nRationale: ${mq.answerExplanation}`,
    cardType: 'ai_generated',
    explanation: mq.answerExplanation,
    clinicalExplanation: mq.clinicalExplanation,
    memoryTip: mq.examTips || 'Focus on antecedent-behavior-consequence relationships.',
    realLifeExample: mq.scenarioText,
    commonMistakes: mq.commonMistakes,
    reference: mq.references,
    certification: mq.certification,
    category: mq.category as any,
    difficulty: mq.difficulty,
    keywords: mq.keywords,
    tags: mq.tags,
    status: 'published',
    isPremium: mq.isPremium,
    isFeatured: mq.isFeatured,
    createdBy: 'ai_engine',
    updatedBy: 'ai_engine',
    createdAt: mq.createdAt,
    updatedAt: mq.updatedAt,
  }));

  return generated;
}

/**
 * Query and filter flashcards with Spaced Repetition queue management
 */
/**
 * Fetch flashcards directly from Supabase master_flashcards table
 */
export async function fetchDatabaseFlashcards(): Promise<Flashcard[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const adminDb = getSupabaseAdminClient();
    const { data, error } = await adminDb
      .from('master_flashcards')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('[Flashcard Bank] DB fetch error:', error?.message);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.term || 'BACB Flashcard',
      front: row.term || 'Prompt',
      back: row.definition || 'Answer',
      cardType: 'ai_generated',
      explanation: row.clinical_example || row.definition || '',
      clinicalExplanation: row.clinical_example || row.definition || '',
      memoryTip: 'Mnemonic memory tip',
      realLifeExample: 'Clinical scenario',
      commonMistakes: 'Common mistakes',
      reference: row.task_list_code || 'BACB Task List Standard',
      certification: (row.certification as any) || 'RBT',
      category: (row.category as any) || 'Measurement',
      subcategory: row.task_list_code || 'Task List Item',
      difficulty: (row.difficulty as any) || 'medium',
      keywords: row.tags || ['BACB', 'Flashcard'],
      tags: row.tags || ['Published'],
      status: (row.status as any) || 'published',
      isPremium: row.is_premium || false,
      isFeatured: true,
      createdBy: 'supabase_db',
      updatedBy: 'supabase_db',
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString(),
    }));
  } catch (err: any) {
    console.error('[Flashcard Bank] Exception fetching database flashcards:', err.message);
    return [];
  }
}

/**
 * Insert a single flashcard into Supabase database
 */
export async function createDatabaseFlashcard(card: Partial<Flashcard>): Promise<Flashcard> {
  const adminDb = getSupabaseAdminClient();
  const dbRow = {
    certification: card.certification || 'RBT',
    term: card.front || card.title || 'Untitled Flashcard',
    definition: card.back || card.explanation || 'No definition',
    clinical_example: card.explanation || card.clinicalExplanation || null,
    category: card.category || 'Measurement',
    task_list_code: card.subcategory || card.reference || 'BACB Task List',
    tags: card.tags || ['Custom'],
    difficulty: card.difficulty || 'medium',
    is_premium: card.isPremium || false,
    status: 'published',
  };

  const { data, error } = await adminDb.from('master_flashcards').insert([dbRow]).select();
  if (error || !data || data.length === 0) {
    console.error('[Flashcard Bank] Create error:', error?.message);
    throw new Error(error?.message || 'Failed to insert flashcard row into database');
  }

  const row = data[0];
  const newCard: Flashcard = {
    id: row.id,
    title: row.term,
    front: row.term,
    back: row.definition,
    cardType: 'basic',
    explanation: row.clinical_example || row.definition,
    clinicalExplanation: row.clinical_example || row.definition,
    memoryTip: 'Mnemonic memory tip',
    realLifeExample: 'Clinical scenario',
    commonMistakes: 'Common mistakes',
    reference: row.task_list_code || 'BACB Task List Standard',
    certification: row.certification || 'RBT',
    category: row.category || 'Measurement',
    subcategory: row.task_list_code,
    difficulty: row.difficulty || 'medium',
    keywords: row.tags || ['BACB'],
    tags: row.tags || ['Custom'],
    status: row.status || 'published',
    isPremium: row.is_premium || false,
    isFeatured: true,
    createdBy: 'user',
    updatedBy: 'user',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  addCustomFlashcard(newCard);
  return newCard;
}

/**
 * Update an existing flashcard in Supabase database
 */
export async function updateDatabaseFlashcard(id: string, updates: Partial<Flashcard>): Promise<boolean> {
  const adminDb = getSupabaseAdminClient();
  const payload: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (updates.front || updates.title) payload.term = updates.front || updates.title;
  if (updates.back) payload.definition = updates.back;
  if (updates.explanation || updates.clinicalExplanation) payload.clinical_example = updates.explanation || updates.clinicalExplanation;
  if (updates.category) payload.category = updates.category;
  if (updates.certification) payload.certification = updates.certification;
  if (updates.difficulty) payload.difficulty = updates.difficulty;
  if (updates.reference || updates.subcategory) payload.task_list_code = updates.reference || updates.subcategory;

  const { error } = await adminDb.from('master_flashcards').update(payload).eq('id', id);
  if (error) {
    console.error('[Flashcard Bank] Update error:', error.message);
    throw new Error(`Failed to update flashcard ${id}: ${error.message}`);
  }
  return true;
}

/**
 * Delete a flashcard from Supabase database
 */
export async function deleteDatabaseFlashcard(id: string): Promise<boolean> {
  const adminDb = getSupabaseAdminClient();
  const { error } = await adminDb.from('master_flashcards').delete().eq('id', id);
  if (error) {
    console.error('[Flashcard Bank] Delete error:', error.message);
    throw new Error(`Failed to delete flashcard ${id}: ${error.message}`);
  }
  return true;
}

/**
 * Filter list of flashcards with Spaced Repetition queue management
 */
function processFilteredFlashcardsList(
  allCards: Flashcard[],
  params: FlashcardFilterParams,
  userId: string = 'default_user'
): FlashcardPaginationResult {
  let filtered = [...allCards];

  // Certification filter
  if (params.certification && params.certification !== 'ALL') {
    filtered = filtered.filter((c) => c.certification === params.certification);
  }

  // Category filter
  if (params.category && params.category !== 'ALL') {
    filtered = filtered.filter((c) => c.category === params.category);
  }

  // Card type filter
  if (params.cardType && params.cardType !== 'ALL') {
    filtered = filtered.filter((c) => c.cardType === params.cardType);
  }

  // Search filter
  if (params.search && params.search.trim()) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.front.toLowerCase().includes(q) ||
        c.back.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }

  // Attach user progress state to cards
  const cardsWithState = filtered.map((c) => {
    const state = getUserCardState(c.id, userId);
    return { ...c, userState: state };
  });

  // Apply Learning Mode logic
  let modeFiltered = [...cardsWithState];
  const nowISO = new Date().toISOString();

  if (params.learningMode === 'review' || params.onlyDue) {
    modeFiltered = modeFiltered.filter((c) => c.userState && c.userState.nextReviewAt <= nowISO);
  } else if (params.learningMode === 'favorite' || params.onlyFavorites) {
    modeFiltered = modeFiltered.filter((c) => c.userState && c.userState.isFavorite);
  } else if (params.learningMode === 'weak_topics' || params.onlyWeak) {
    modeFiltered = modeFiltered.filter((c) => c.userState && c.userState.masteryScore < 75);
  } else if (params.learningMode === 'shuffle') {
    modeFiltered.sort(() => Math.random() - 0.5);
  }

  // Metrics
  const dueCount = cardsWithState.filter((c) => c.userState && c.userState.nextReviewAt <= nowISO).length;
  const masteredCount = cardsWithState.filter((c) => c.userState && c.userState.learningStage === 'mastered').length;
  const learningCount = cardsWithState.filter((c) => c.userState && c.userState.learningStage === 'learning').length;

  const page = params.page || 1;
  const limit = params.limit || 100;
  const total = modeFiltered.length;
  const totalPages = Math.ceil(total / limit) || 1;

  const startIndex = (page - 1) * limit;
  const paginatedData = modeFiltered.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    total,
    dueCount,
    masteredCount,
    learningCount,
    page,
    totalPages,
  };
}

/**
 * Async database + memory query function
 */
export async function getFilteredFlashcardsAsync(
  params: FlashcardFilterParams,
  userId: string = 'default_user'
): Promise<FlashcardPaginationResult> {
  const dbCards = await fetchDatabaseFlashcards();
  const dbCardIds = new Set(dbCards.map((c) => c.id));
  const memoryCards = [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS, ...generateFlashcardsFromQuestions()].filter(
    (c) => !dbCardIds.has(c.id)
  );

  const allCards = [...dbCards, ...memoryCards];
  return processFilteredFlashcardsList(allCards, params, userId);
}

/**
 * Synchronous query function (fallback / backwards compatibility)
 */
export function getFilteredFlashcards(params: FlashcardFilterParams, userId: string = 'default_user'): FlashcardPaginationResult {
  const allCards = [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS, ...generateFlashcardsFromQuestions()];
  return processFilteredFlashcardsList(allCards, params, userId);
}
