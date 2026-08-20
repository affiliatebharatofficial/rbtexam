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

// Master Flashcard Seed Bank with RBT, BCaBA, and BCBA items
export const MASTER_FLASHCARDS: Flashcard[] = [
  // --- RBT FOUNDATIONAL DECK ---
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
    reference: 'BACB RBT 3rd Edition TCO Item A-02',
    certification: 'RBT',
    category: 'Data Collection and Graphing',
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
    reference: 'BACB RBT 3rd Edition TCO Item A-03',
    certification: 'RBT',
    category: 'Data Collection and Graphing',
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
    reference: 'BACB RBT 3rd Edition TCO Item D-04',
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

  // --- BCBA ADVANCED MASTERY DECK ---
  {
    id: 'fc-bcba-001',
    title: 'Functional Analysis: Analog Conditions (Iwata)',
    front: 'What are the 4 standard analog conditions in an Iwata-style Functional Analysis (FA)?',
    back: '1. Attention (Social Positive)\n2. Demand / Escape (Social Negative)\n3. Alone / No Interaction (Automatic Reinforcement)\n4. Play / Control (Enriched Environment Baseline)',
    cardType: 'definition',
    explanation: 'Functional analysis experimentally manipulates environmental conditions to identify the maintaining functional variable of problem behavior.',
    clinicalExplanation: 'In the Attention condition, brief contingent verbal attention is provided. In Demand, 3-step prompting with 30s task removal contingent on target behavior. In Alone, client is in barren room without materials. In Play, continuous access to preferred items and attention is freely available with zero demands.',
    memoryTip: 'Mnemonic: "ADAP = Attention, Demand, Alone, Play."',
    realLifeExample: 'Observing aggression spikes exclusively in Demand sessions confirms an escape function.',
    commonMistakes: 'Confusing descriptive ABC data collection with experimental analog FA manipulation.',
    reference: 'BACB 5th/6th Edition Test Content Outline F-8',
    certification: 'BCBA',
    category: 'Behavior Assessment',
    subcategory: 'Functional Analysis',
    difficulty: 'hard',
    keywords: ['Functional Analysis', 'Iwata', 'Analog Conditions', 'Escape', 'Automatic'],
    tags: ['BCBA Core', 'Assessment', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T10:00:00.000Z',
    updatedAt: '2026-08-05T10:00:00.000Z',
  },
  {
    id: 'fc-bcba-002',
    title: 'Conditioned Motivating Operations: CMO-R vs CMO-T vs CMO-S',
    front: 'Distinguish between Reflexive (CMO-R), Transitive (CMO-T), and Surrogate (CMO-S) Motivating Operations.',
    back: '• CMO-R (Reflexive): A warning stimulus establishing its own removal/escape as reinforcing (e.g. task demands).\n• CMO-T (Transitive): Establishes another stimulus/tool as a conditioned reinforcer to access something else (e.g. locked box establishes key).\n• CMO-S (Surrogate): Paired with an unconditioned MO, taking on the same value-altering effects (e.g. clock showing 12:00 establishing lunch appetite).',
    cardType: 'definition',
    explanation: 'CMOs are environmental variables that alter the reinforcing effectiveness of other stimuli and alter the frequency of behavior.',
    clinicalExplanation: 'CMO-R warning signal creates aversion; CMO-T creates a problem-solving state requiring an intermediary stimulus; CMO-S is temporal/spatial pairing.',
    memoryTip: 'Mnemonic: "R = Run away/Removal; T = Tool/Thing needed; S = Stimulus Pairing/Substitute."',
    realLifeExample: 'Seeing your boss with a clipboard (CMO-R) evokes avoidance behaviors.',
    commonMistakes: 'Confusing SD with MO: SD signals availability of reinforcement, MO alters value and effectiveness.',
    reference: 'BACB 5th/6th Edition Task List B-12',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Motivating Operations',
    difficulty: 'hard',
    keywords: ['CMO-R', 'CMO-T', 'CMO-S', 'Motivating Operations', 'Establishing Operation'],
    tags: ['BCBA Core', 'Concepts and Principles'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T11:00:00.000Z',
    updatedAt: '2026-08-05T11:00:00.000Z',
  },
  {
    id: 'fc-bcba-003',
    title: 'Single-Case Experimental Designs: Internal Validity',
    front: 'When is an Alternating Treatments Design (Multielement) preferable over an A-B-A-B Reversal Design?',
    back: 'Alternating Treatments is preferable when:\n1. The target behavior is IRREVERSIBLE (e.g. learned academic skills/reading).\n2. Withdrawing treatment is UNETHICAL (e.g. severe self-injurious behavior SIB).\n3. Rapidly comparing 2 or more distinct interventions without a baseline return.',
    cardType: 'scenario',
    explanation: 'Alternating Treatments allows rapid comparison of conditions in rapid succession, controlling for sequence effects through counterbalancing.',
    clinicalExplanation: 'Reversal requires return to baseline to demonstrate experimental control. Alternating Treatments demonstrates control via vertical divergence between data paths.',
    memoryTip: 'Mnemonic: "Multi = Multi-treatments without Reversing."',
    realLifeExample: 'Comparing DRA vs DRO in morning vs afternoon sessions for aggression.',
    commonMistakes: 'Using reversal designs for aggression with high physical injury risk.',
    reference: 'BACB 5th/6th Edition Task List D-2',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Experimental Design',
    difficulty: 'hard',
    keywords: ['Alternating Treatments', 'Reversal Design', 'Internal Validity', 'Experimental Control'],
    tags: ['BCBA Core', 'Experimental Design'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T12:00:00.000Z',
    updatedAt: '2026-08-05T12:00:00.000Z',
  },
  {
    id: 'fc-bcba-004',
    title: 'Staff Training: Behavioral Skills Training (BST)',
    front: 'What are the 4 chronological steps of Behavioral Skills Training (BST) for staff supervision?',
    back: '1. Instructions (Clear verbal/written rationale and procedural steps)\n2. Modeling (Demonstration of the skill by supervisor/trainer)\n3. Rehearsal (Role-play or in-situ practice by trainee)\n4. Feedback (Immediate positive praise + corrective guidance)',
    cardType: 'basic',
    explanation: 'BST is the gold standard evidence-based training model for BCBA supervision of RBTs and clinical staff.',
    clinicalExplanation: 'Training is not complete until the supervisee achieves 100% fidelity criterion in the rehearsal step across multiple roleplay or direct client scenarios.',
    memoryTip: 'Mnemonic: "IMRF = Tell (Instructions), Show (Model), Try (Rehearse), Coach (Feedback)."',
    realLifeExample: 'Training an RBT on implementing a 3-step prompt hierarchy using BST before client contact.',
    commonMistakes: 'Relying solely on verbal instructions or manuals without live modeling and rehearsal.',
    reference: 'BACB 5th/6th Edition Task List I-4',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Personnel Supervision and Management',
    difficulty: 'medium',
    keywords: ['BST', 'Behavioral Skills Training', 'Supervision', 'Staff Training'],
    tags: ['BCBA Core', 'Supervision'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T13:00:00.000Z',
    updatedAt: '2026-08-05T13:00:00.000Z',
  },
  {
    id: 'fc-bcba-005',
    title: 'Matching Law & Concurrent Schedules',
    front: 'State Herrnstein’s Matching Law and its clinical application to behavior reduction.',
    back: 'Matching Law states that the relative rate of responding matches the relative rate of reinforcement delivered by concurrent schedules:\n(B1 / (B1 + B2)) = (R1 / (R1 + R2))\n\nClinical Application: To decrease problem behavior (B1), enrich reinforcement rate, immediacy, quality, and magnitude for appropriate replacement behavior (B2).',
    cardType: 'definition',
    explanation: 'Organisms distribute responses proportionally to the reinforcement obtained from each alternative.',
    clinicalExplanation: 'If biting gets reinforced 80% of the time and requesting gets reinforced 20%, the client will allocate 80% of responses to biting. Shifting the schedule density shifts responding.',
    memoryTip: 'Mnemonic: "Matching = Behavior matches Reinforcement proportion."',
    realLifeExample: 'Making FCT requests produce instant high-potency snacks while problem behavior is placed on extinction.',
    commonMistakes: 'Ignoring reinforcement parameters like latency, magnitude, and response effort.',
    reference: 'BACB 5th/6th Edition Task List B-5',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Concurrent Schedules',
    difficulty: 'hard',
    keywords: ['Matching Law', 'Herrnstein', 'Concurrent Schedules', 'Reinforcement Rate'],
    tags: ['BCBA Core', 'Quantitative ABA'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T14:00:00.000Z',
    updatedAt: '2026-08-05T14:00:00.000Z',
  },

  // --- BCaBA SUPERVISORY DECK ---
  {
    id: 'fc-bcaba-001',
    title: 'Preference Assessment Protocols: MSWO vs MSW',
    front: 'What is the primary operational difference between MSWO (Without Replacement) and MSW (With Replacement)?',
    back: '• MSWO (Without Replacement): Chosen item is REMOVED from the array for subsequent trials, creating an efficient ranked hierarchy of all items.\n• MSW (With Replacement): Chosen item is REPLACED in the array, only identifying the single highest-preferred item without ranking unselected items.',
    cardType: 'definition',
    explanation: 'MSWO is faster and provides a clear ranking hierarchy, while MSW is useful when client exhibits severe problem behavior upon item removal.',
    clinicalExplanation: 'In MSWO, 5-7 items are presented. Once an item is selected and consumed/interacted with for 30s, it is removed and remaining items are rearranged in random order.',
    memoryTip: 'Mnemonic: "MSWO = Out! (Items taken out to rank everything)."',
    realLifeExample: 'Running an MSWO with 5 reinforcers before starting a DTT learning block.',
    commonMistakes: 'Not rearranging item positions between trials, causing side-bias confounds.',
    reference: 'BACB BCaBA Task List Standard B-3',
    certification: 'BCaBA',
    category: 'Behavior Assessment',
    subcategory: 'Preference Assessments',
    difficulty: 'medium',
    keywords: ['MSWO', 'MSW', 'Preference Assessment', 'Hierarchy'],
    tags: ['BCaBA Core', 'Assessment'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-06T10:00:00.000Z',
    updatedAt: '2026-08-06T10:00:00.000Z',
  },
  {
    id: 'fc-bcaba-002',
    title: 'Task Analysis: Forward vs Backward vs Total Task Chaining',
    front: 'When is Backward Chaining clinically indicated over Forward Chaining?',
    back: 'Backward Chaining is indicated when the learner benefits from experiencing the naturally reinforcing terminal step of the chain immediately on early trials (e.g. shoe tying, baking, hand washing final dry).',
    cardType: 'scenario',
    explanation: 'In backward chaining, the therapist completes steps 1 through N-1, and the learner executes the final step N to contact the reinforcer.',
    clinicalExplanation: 'Forward chaining teaches step 1 first; Total Task trains every step of the task analysis during each trial with prompt fading as needed.',
    memoryTip: 'Mnemonic: "Backward = Finish line First!"',
    realLifeExample: 'Teaching putting on socks where client pulls sock over ankle (last step) and receives immediate praise.',
    commonMistakes: 'Withholding terminal reinforcement until all steps are independent in forward chaining.',
    reference: 'BACB BCaBA Task List Standard C-5',
    certification: 'BCaBA',
    category: 'Behavior Acquisition',
    subcategory: 'Chaining',
    difficulty: 'medium',
    keywords: ['Backward Chaining', 'Forward Chaining', 'Total Task', 'Task Analysis'],
    tags: ['BCaBA Core', 'Skill Acquisition'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-06T11:00:00.000Z',
    updatedAt: '2026-08-06T11:00:00.000Z',
  },
];

// In-memory & LocalStorage Custom Flashcard Store
let CUSTOM_FLASHCARDS: Flashcard[] = [];
export const DELETED_CARD_IDS = new Set<string>();

export function loadDeletedCardIds(): void {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('rbt_custom_flashcards');
      if (saved) {
        CUSTOM_FLASHCARDS = JSON.parse(saved);
      }
      const deletedSaved = localStorage.getItem('rbt_deleted_flashcard_ids');
      if (deletedSaved) {
        const parsedDeleted = JSON.parse(deletedSaved);
        if (Array.isArray(parsedDeleted)) {
          parsedDeleted.forEach((id: string) => DELETED_CARD_IDS.add(id));
        }
      }
    } catch (e) {
      console.error('Failed to load custom flashcards from browser storage', e);
    }
  }
}

// Initial load
loadDeletedCardIds();

export function markCardAsDeleted(id: string): void {
  DELETED_CARD_IDS.add(id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('rbt_deleted_flashcard_ids', JSON.stringify(Array.from(DELETED_CARD_IDS)));
    } catch (e) {
      console.error('Failed to persist deleted flashcard ID to browser storage', e);
    }
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
 * Fetch flashcards directly from Supabase master_flashcards table with pagination and explicit columns
 */
export async function fetchDatabaseFlashcards(limit: number = 100, offset: number = 0): Promise<Flashcard[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const adminDb = getSupabaseAdminClient();
    const { data, error } = await adminDb
      .from('master_flashcards')
      .select('id, term, definition, clinical_example, category, task_list_code, tags, difficulty, is_premium, status, created_at, updated_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error || !data) {
      console.error('[Flashcard Bank] DB fetch error:', error?.message);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.term || 'BACB Flashcard',
      front: row.term || 'Prompt',
      back: row.definition || 'Answer',
      cardType: 'basic',
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

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Delete a flashcard from Supabase database or in-memory store
 */
export async function deleteDatabaseFlashcard(id: string): Promise<boolean> {
  markCardAsDeleted(id);
  if (isSupabaseConfigured() && uuidRegex.test(id)) {
    try {
      const adminDb = getSupabaseAdminClient();
      await adminDb.from('master_flashcards').update({ deleted_at: new Date().toISOString(), status: 'deleted' }).eq('id', id);
      const { error } = await adminDb.from('master_flashcards').delete().eq('id', id);
      if (error) {
        console.error('[Flashcard Bank] Delete error:', error.message);
      }
    } catch (e: any) {
      console.error('[Flashcard Bank] Exception deleting database card:', e?.message);
    }
  }

  CUSTOM_FLASHCARDS = CUSTOM_FLASHCARDS.filter((c) => c.id !== id);
  const idx = MASTER_FLASHCARDS.findIndex((c) => c.id === id);
  if (idx !== -1) MASTER_FLASHCARDS.splice(idx, 1);
  return true;
}

/**
 * Bulk delete multiple flashcards from Supabase database or in-memory store
 */
export async function deleteDatabaseFlashcardBulk(ids: string[]): Promise<boolean> {
  if (!ids || ids.length === 0) return true;

  ids.forEach((id) => markCardAsDeleted(id));

  const uuidIds = ids.filter((id) => uuidRegex.test(id));

  if (isSupabaseConfigured() && uuidIds.length > 0) {
    try {
      const adminDb = getSupabaseAdminClient();
      await adminDb
        .from('master_flashcards')
        .update({ deleted_at: new Date().toISOString(), status: 'deleted' })
        .in('id', uuidIds);
      const { error } = await adminDb.from('master_flashcards').delete().in('id', uuidIds);
      if (error) {
        console.error('[Flashcard Bank] Bulk Delete error:', error.message);
      }
    } catch (e: any) {
      console.error('[Flashcard Bank] Exception bulk deleting database cards:', e?.message);
    }
  }

  // Purge all specified IDs from in-memory stores as well
  ids.forEach((id) => {
    CUSTOM_FLASHCARDS = CUSTOM_FLASHCARDS.filter((c) => c.id !== id);
    const idx = MASTER_FLASHCARDS.findIndex((c) => c.id === id);
    if (idx !== -1) MASTER_FLASHCARDS.splice(idx, 1);
  });

  return true;
}

/**
 * Parse CSV string content into Partial<Flashcard>[] array
 */
export function parseCSVFlashcards(csvText: string): Partial<Flashcard>[] {
  if (!csvText || typeof csvText !== 'string') return [];

  const lines: string[] = [];
  let currentLine = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && csvText[i + 1] === '\n') i++;
      if (currentLine.trim()) lines.push(currentLine);
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) lines.push(currentLine);

  if (lines.length === 0) return [];

  // Helper to split CSV row handling quoted fields
  const parseRow = (line: string): string[] => {
    const row: string[] = [];
    let field = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (c === ',' && !inQ) {
        row.push(field.trim());
        field = '';
      } else {
        field += c;
      }
    }
    row.push(field.trim());
    return row;
  };

  const headerRow = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9_]/g, ''));
  const termIdx = headerRow.findIndex((h) => ['term', 'front', 'question', 'prompt', 'title'].includes(h));
  const defIdx = headerRow.findIndex((h) => ['definition', 'back', 'answer', 'explanation'].includes(h));
  const expIdx = headerRow.findIndex((h) => ['clinical_example', 'clinicalexample', 'explanation', 'rationale', 'memory_tip'].includes(h));
  const catIdx = headerRow.findIndex((h) => ['category', 'domain'].includes(h));
  const certIdx = headerRow.findIndex((h) => ['certification', 'cert', 'level'].includes(h));
  const diffIdx = headerRow.findIndex((h) => ['difficulty', 'level'].includes(h));
  const taskIdx = headerRow.findIndex((h) => ['task_list_code', 'taskcode', 'reference', 'code', 'subcategory'].includes(h));

  const results: Partial<Flashcard>[] = [];

  const startLineIdx = termIdx !== -1 || defIdx !== -1 ? 1 : 0;

  for (let i = startLineIdx; i < lines.length; i++) {
    const cols = parseRow(lines[i]);
    if (cols.length < 2) continue;

    const front = (termIdx !== -1 && cols[termIdx] ? cols[termIdx] : cols[0] || '').trim();
    const back = (defIdx !== -1 && cols[defIdx] ? cols[defIdx] : cols[1] || '').trim();
    const explanation = expIdx !== -1 && cols[expIdx] ? cols[expIdx] : cols[2] || '';
    const category = catIdx !== -1 && cols[catIdx] ? cols[catIdx] : 'Measurement';
    const cert = certIdx !== -1 && cols[certIdx] ? cols[certIdx] : 'RBT';
    const diff = diffIdx !== -1 && cols[diffIdx] ? cols[diffIdx] : 'medium';
    const reference = taskIdx !== -1 && cols[taskIdx] ? cols[taskIdx] : 'CSV Import';

    if (!front || !back) continue;

    results.push({
      title: front.slice(0, 50),
      front,
      back,
      explanation,
      clinicalExplanation: explanation,
      category: category as any,
      certification: (cert.toUpperCase() as any) || 'RBT',
      difficulty: (diff.toLowerCase() as any) || 'medium',
      reference,
      tags: ['CSV Import'],
      cardType: 'basic',
    });
  }

  return results;
}

/**
 * Bulk insert flashcards into Supabase database
 */
export async function importBulkFlashcards(cards: Partial<Flashcard>[]): Promise<{ insertedCount: number; insertedIds: string[] }> {
  const adminDb = getSupabaseAdminClient();
  const dbRows = cards.map((c) => ({
    certification: String(c.certification || 'RBT').slice(0, 30),
    term: String(c.front || c.title || 'Untitled Flashcard').slice(0, 250),
    definition: c.back || c.explanation || 'No definition',
    clinical_example: c.clinicalExplanation || c.explanation || null,
    category: String(c.category || 'Measurement').slice(0, 120),
    task_list_code: String(c.reference || c.subcategory || 'CSV Import').slice(0, 30),
    tags: c.tags || ['CSV Import'],
    difficulty: String(c.difficulty || 'medium').slice(0, 30),
    is_premium: c.isPremium || false,
    status: 'published',
  }));

  if (dbRows.length === 0) {
    return { insertedCount: 0, insertedIds: [] };
  }

  const insertedIds: string[] = [];
  const chunkSize = 100;

  for (let i = 0; i < dbRows.length; i += chunkSize) {
    const chunk = dbRows.slice(i, i + chunkSize);
    const { data, error } = await adminDb.from('master_flashcards').insert(chunk).select();

    if (error || !data) {
      console.error('[Flashcard Bank] Bulk import chunk error:', error?.message);
      throw new Error(error?.message || 'Failed to bulk import flashcards chunk into database');
    }

    data.forEach((r: any) => {
      insertedIds.push(r.id);
      addCustomFlashcard({
        id: r.id,
        title: r.term,
        front: r.term,
        back: r.definition,
        explanation: r.clinical_example || r.definition,
        category: r.category,
        certification: r.certification,
        difficulty: r.difficulty,
        reference: r.task_list_code,
      });
    });
  }

  return { insertedCount: insertedIds.length, insertedIds };
}

/**
 * Backward-compatible Question-to-Flashcard transformation layer
 * Transforms a Question Bank item into a concise, recall-focused flashcard
 */
export function transformQuestionToFlashcard(mq: any): Partial<Flashcard> {
  const correctOpt = Array.isArray(mq.options)
    ? mq.options.find((o: any) => o.id === mq.correctAnswerId)?.text || mq.correctAnswerId
    : 'Option A';

  // 1. Build concise recall-focused Front Prompt
  let cleanFront = (mq.question || 'Question concept').trim();

  // Strip scenario headers or options filler if present
  cleanFront = cleanFront
    .replace(/^\[Scenario\]\s*/i, '')
    .replace(/Which of the following best describes/i, 'What is')
    .replace(/Which of the following options/i, 'Which')
    .replace(/Which of the following is/i, 'What is')
    .trim();

  // If question stem has multiple sentences (e.g. scenario description + question sentence), extract the question sentence
  if (cleanFront.length > 120 && cleanFront.includes('?')) {
    const parts = cleanFront.split(/(?<=\?)/);
    const lastQuestion = parts.find((p: string) => p.trim().endsWith('?'));
    if (lastQuestion && lastQuestion.trim().length >= 15) {
      cleanFront = lastQuestion.trim();
    }
  }

  // 2. Build Rationale & Answer Explanation without redundant answer title repetition
  let rawRationale = (mq.answerExplanation || mq.explanation || '').trim();

  // Strip duplicate leading answer term if present at start of explanation
  if (correctOpt && rawRationale) {
    const escapedOpt = correctOpt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const leadingOptRegex = new RegExp(`^(${escapedOpt}[:\\s—-]*)`, 'i');
    if (leadingOptRegex.test(rawRationale)) {
      rawRationale = rawRationale.replace(leadingOptRegex, '').trim();
      if (rawRationale.length > 0) {
        rawRationale = rawRationale.charAt(0).toUpperCase() + rawRationale.slice(1);
      }
    }
  }

  // Strip any trailing Memory Tip / Exam Tip block from rationale
  rawRationale = rawRationale.replace(/(?:Memory Tip|Exam Tip|Tip|Mnemonic):[\s\S]*$/i, '').trim();

  // Build Back Definition (Correct Answer + Short Rationale, NO Question Repetition)
  const cleanBack = rawRationale ? `${correctOpt}\n\n${rawRationale}` : correctOpt;

  // 3. Build Pure Clinical Rationale (ONLY clinical/practical explanation, NO memory tip, NO question prompt)
  let cleanClinical = (mq.clinicalExplanation || rawRationale || 'Clinical rationale not provided').trim();
  cleanClinical = cleanClinical
    .replace(/^BACB Item [^:]+:\s*/i, '')
    .replace(/(?:Memory Tip|Exam Tip|Tip|Mnemonic):[\s\S]*$/i, '')
    .replace(/^Full Question Prompt:[\s\S]*?\n\n/i, '')
    .trim();

  if (correctOpt && cleanClinical) {
    const escapedOpt = correctOpt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const leadingOptRegex = new RegExp(`^(${escapedOpt}[:\\s—-]*)`, 'i');
    if (leadingOptRegex.test(cleanClinical)) {
      cleanClinical = cleanClinical.replace(leadingOptRegex, '').trim();
      if (cleanClinical.length > 0) {
        cleanClinical = cleanClinical.charAt(0).toUpperCase() + cleanClinical.slice(1);
      }
    }
  }

  // 4. Pure Memory Tip (Strip duplicate labels)
  let rawMemoryTip = (mq.examTips || mq.memoryTip || '').trim();
  rawMemoryTip = rawMemoryTip.replace(/^(?:Memory Tip|Exam Tip|Tip|Mnemonic):\s*/i, '').trim();

  if (!rawMemoryTip) {
    const keywords = Array.isArray(mq.keywords) && mq.keywords.length > 0 ? mq.keywords.slice(0, 2).join(', ') : mq.category;
    rawMemoryTip = `${correctOpt} → ${keywords}`;
  }

  // 5. Build full explanation block for card detail view (Clean sections without double labels)
  const fullExplanation = [
    `Clinical Rationale:\n${cleanClinical}`,
    `Memory Tip:\n${rawMemoryTip}`,
  ].filter(Boolean).join('\n\n');

  // 6. Source Question ID mapping & Metadata
  const sourceQuestionId = String(mq.id);
  const taskListCode = `SQID:${sourceQuestionId}`;

  return {
    title: `${mq.category}: ${correctOpt}`.slice(0, 50),
    front: cleanFront.slice(0, 250),
    back: cleanBack,
    explanation: fullExplanation,
    clinicalExplanation: cleanClinical,
    memoryTip: rawMemoryTip,
    category: mq.category || 'Measurement',
    certification: (mq.certification?.toUpperCase() as any) || 'RBT',
    difficulty: (mq.difficulty?.toLowerCase() as any) || 'medium',
    reference: taskListCode.slice(0, 30),
    tags: ['Converted Question', `source_question_id:${sourceQuestionId}`, mq.certification || 'RBT'],
    cardType: 'basic',
  };
}

/**
 * Convert all existing Master Questions into Database Flashcards in Supabase
 * Includes duplicate protection checking source_question_id
 */
export async function convertQuestionsToDatabaseFlashcards(forceAll: boolean = false): Promise<{ convertedCount: number; insertedIds: string[] }> {
  const adminDb = getSupabaseAdminClient();
  let sourceQuestions: any[] = [];

  if (isSupabaseConfigured()) {
    try {
      const { data: dbQuestions } = await adminDb
        .from('master_questions')
        .select('id, question_text, scenario_text, options, correct_answer_id, answer_explanation, clinical_explanation, certification, category, difficulty, keywords, task_list_version, references, tags')
        .is('deleted_at', null)
        .limit(5000);

      if (dbQuestions && dbQuestions.length > 0) {
        const dbMapped = dbQuestions.map((q: any) => {
          let opts: any[] = [];
          if (Array.isArray(q.options)) {
            opts = q.options;
          } else if (typeof q.options === 'string') {
            try { opts = JSON.parse(q.options); } catch (e) {}
          }
          if (!Array.isArray(opts) || opts.length === 0) {
            opts = [
              { id: 'A', text: q.option_a || 'Option A' },
              { id: 'B', text: q.option_b || 'Option B' },
              { id: 'C', text: q.option_c || 'Option C' },
              { id: 'D', text: q.option_d || 'Option D' },
            ];
          }
          return {
            id: q.id,
            question: q.question_text || q.question_stem || q.question || 'Question Stem',
            scenarioText: q.scenario_text || null,
            options: opts,
            correctAnswerId: q.correct_answer_id || q.correct_answer || 'A',
            answerExplanation: q.answer_explanation || q.explanation || 'Correct answer rationale',
            clinicalExplanation: q.clinical_explanation || q.explanation || '',
            certification: q.certification || 'RBT',
            category: q.category || 'Measurement',
            difficulty: q.difficulty || 'medium',
            keywords: q.keywords || ['Question Bank'],
          };
        });
        sourceQuestions = dbMapped;
      }
    } catch (e) {
      console.error('[Flashcard Bank] Failed to fetch DB questions for conversion:', e);
    }
  } else {
    sourceQuestions = [...MASTER_QUESTION_BANK];
  }

  // 1. Deduplication & Cleanup check: remove any duplicate SQID cards from master_flashcards
  const existingSourceIds = new Set<string>();
  if (isSupabaseConfigured()) {
    try {
      const { data: existingCards } = await adminDb
        .from('master_flashcards')
        .select('id, task_list_code, tags')
        .is('deleted_at', null);

      if (existingCards && existingCards.length > 0) {
        const seenSqIds = new Map<string, string>();
        const duplicateCardIdsToDelete: string[] = [];

        existingCards.forEach((c: any) => {
          let sqId: string | null = null;
          if (c.task_list_code && c.task_list_code.includes('SQID:')) {
            const match = c.task_list_code.match(/SQID:([^\s)]+)/);
            if (match) sqId = match[1];
          }
          if (!sqId && Array.isArray(c.tags)) {
            c.tags.forEach((t: string) => {
              if (t.startsWith('source_question_id:')) {
                sqId = t.replace('source_question_id:', '');
              }
            });
          }

          if (sqId) {
            if (seenSqIds.has(sqId)) {
              duplicateCardIdsToDelete.push(c.id);
            } else {
              seenSqIds.set(sqId, c.id);
              existingSourceIds.add(sqId);
            }
          }
        });

        // Delete duplicate card rows from database if any exist
        if (duplicateCardIdsToDelete.length > 0) {
          await adminDb.from('master_flashcards').delete().in('id', duplicateCardIdsToDelete);
        }
      }
    } catch (e) {
      console.error('[Flashcard Bank] Error during deduplication check:', e);
    }
  }

  // 2. Filter out already converted source questions unless forceAll is true
  const targetQuestions = forceAll
    ? sourceQuestions
    : sourceQuestions.filter((sq) => !existingSourceIds.has(String(sq.id)));

  // If all questions are already converted, return 0 without re-inserting
  if (targetQuestions.length === 0) {
    return { convertedCount: 0, insertedIds: [] };
  }

  const convertedCards: Partial<Flashcard>[] = targetQuestions.map(transformQuestionToFlashcard);

  if (isSupabaseConfigured()) {
    const res = await importBulkFlashcards(convertedCards);
    return { convertedCount: res.insertedCount, insertedIds: res.insertedIds };
  } else {
    const ids: string[] = [];
    convertedCards.forEach((c) => {
      const created = addCustomFlashcard(c);
      ids.push(created.id);
    });
    return { convertedCount: ids.length, insertedIds: ids };
  }
}

/**
 * Filter list of flashcards with Spaced Repetition queue management
 */
function processFilteredFlashcardsList(
  allCards: Flashcard[],
  params: FlashcardFilterParams,
  userId: string = 'default_user'
): FlashcardPaginationResult {
  loadDeletedCardIds();
  let filtered = allCards.filter((c) => !DELETED_CARD_IDS.has(c.id));

  // Certification filter
  if (params.certification && params.certification !== 'ALL') {
    const certUpper = String(params.certification).toUpperCase();
    filtered = filtered.filter((c) => !c.certification || String(c.certification).toUpperCase() === certUpper || (c.certification as string) === 'ALL');
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
    modeFiltered = modeFiltered.filter(
      (c) => (c.userState && c.userState.nextReviewAt <= nowISO) || (c.userState && (c.userState.learningStage === 'learning' || c.userState.learningStage === 'forgotten'))
    );
  } else if (params.learningMode === 'favorite' || params.onlyFavorites) {
    modeFiltered = modeFiltered.filter((c) => c.userState && c.userState.isFavorite);
  } else if (params.learningMode === 'weak_topics' || params.onlyWeak) {
    modeFiltered = modeFiltered.filter(
      (c) => (c.userState && (c.userState.wrongCount > 0 || c.userState.masteryScore < 60)) || c.difficulty === 'hard'
    );
  } else if (params.learningMode === 'ai_recommended') {
    // AI Recommendation: Priority to high-yield BACB exam items, high difficulty, and lowest mastery
    modeFiltered = [...modeFiltered].sort((a, b) => {
      const scoreA = (100 - (a.userState?.masteryScore || 0)) + (a.isFeatured ? 25 : 0) + (a.difficulty === 'hard' ? 15 : 0);
      const scoreB = (100 - (b.userState?.masteryScore || 0)) + (b.isFeatured ? 25 : 0) + (b.difficulty === 'hard' ? 15 : 0);
      return scoreB - scoreA;
    });
  } else if (params.learningMode === 'shuffle') {
    // Fisher-Yates shuffle
    for (let i = modeFiltered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [modeFiltered[i], modeFiltered[j]] = [modeFiltered[j], modeFiltered[i]];
    }
  }

  // Metrics
  const dueCount = cardsWithState.filter(
    (c) => (c.userState && c.userState.nextReviewAt <= nowISO) || (c.userState && (c.userState.learningStage === 'learning' || c.userState.learningStage === 'forgotten'))
  ).length;
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
 * Async database + memory query function with server-side pagination
 */
export async function getFilteredFlashcardsAsync(
  params: FlashcardFilterParams,
  userId: string = 'default_user'
): Promise<FlashcardPaginationResult> {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(5000, Math.max(1, params.limit || 50));
  const offset = (page - 1) * limit;

  if (isSupabaseConfigured()) {
    try {
      const adminDb = getSupabaseAdminClient();
      let query = adminDb
        .from('master_flashcards')
        .select('id, term, definition, clinical_example, category, task_list_code, tags, difficulty, is_premium, status, created_at, updated_at', { count: 'exact' })
        .is('deleted_at', null);

      if (params.certification && params.certification !== 'ALL') {
        const cert = params.certification.toUpperCase();
        query = query.in('certification', [params.certification, cert, cert.toLowerCase(), 'ALL', 'all']);
      }
      if (params.category && params.category !== 'ALL') {
        query = query.eq('category', params.category);
      }
      if (params.search && params.search.trim()) {
        query = query.or(`term.ilike.%${params.search.trim()}%,definition.ilike.%${params.search.trim()}%`);
      }

      const { data: dbRows, count, error } = await query
        .order('created_at', { ascending: false })
        .range(0, 4999);

      const dbMappedCards: Flashcard[] = (!error && dbRows && dbRows.length > 0)
        ? dbRows.map((row: any) => ({
            id: row.id,
            title: row.term || 'BACB Flashcard',
            front: row.term || 'Prompt',
            back: row.definition || 'Answer',
            cardType: 'basic',
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
          }))
        : [];

      // Combine database cards with master seed cards (avoid duplicate IDs)
      const combinedCards = [...dbMappedCards];
      const seenIds = new Set(combinedCards.map((c) => c.id));
      [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS].forEach((mc) => {
        if (!seenIds.has(mc.id)) {
          combinedCards.push(mc);
          seenIds.add(mc.id);
        }
      });

      return processFilteredFlashcardsList(combinedCards, params, userId);
    } catch (err) {
      console.error('[Flashcard Bank] Exception querying flashcards from DB:', err);
    }
  }

  const memoryCards = [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS];
  return processFilteredFlashcardsList(memoryCards, params, userId);
}

/**
 * Synchronous query function (fallback / backwards compatibility)
 */
export function getFilteredFlashcards(params: FlashcardFilterParams, userId: string = 'default_user'): FlashcardPaginationResult {
  const allCards = [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS];
  return processFilteredFlashcardsList(allCards, params, userId);
}
