import {
  MasterQuestion,
  QuestionFilterParams,
  QuestionPaginationResult,
  QuestionStatus,
  CertificationLevel,
  QuestionCategory,
  QuestionDifficulty,
  QuestionType,
} from '@/types/master-question';

import { FULL_BACB_SEED_QUESTIONS } from './seed-questions-bank';

const SEED_QUESTIONS: MasterQuestion[] = FULL_BACB_SEED_QUESTIONS;

// Persistent Master Question Store
export const MASTER_QUESTION_BANK: MasterQuestion[] = [...SEED_QUESTIONS];

const LOCAL_STORAGE_KEY = 'rbt_master_questions_v4';

/**
 * Load Persistent Questions from LocalStorage and merge any new SEED questions
 */
export function loadPersistentQuestions(): MasterQuestion[] {
  if (typeof window === 'undefined') {
    return MASTER_QUESTION_BANK;
  }

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed: MasterQuestion[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge missing SEED questions so new initial questions appear
        SEED_QUESTIONS.forEach((sq) => {
          if (!parsed.some((pq) => pq.id === sq.id)) {
            parsed.push(sq);
          }
        });

        MASTER_QUESTION_BANK.length = 0;
        MASTER_QUESTION_BANK.push(...parsed);
        return MASTER_QUESTION_BANK;
      }
    }
  } catch (e) {
    console.error('Failed to parse persistent questions from localStorage:', e);
  }

  // Initial seed fallback
  MASTER_QUESTION_BANK.length = 0;
  MASTER_QUESTION_BANK.push(...SEED_QUESTIONS);
  savePersistentQuestions();
  return MASTER_QUESTION_BANK;
}

/**
 * Save current MASTER_QUESTION_BANK state to LocalStorage
 */
export function savePersistentQuestions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MASTER_QUESTION_BANK));
  } catch (e) {
    console.error('Failed to save persistent questions to localStorage:', e);
  }
}

/**
 * Filter, Search, and Paginate Master Questions
 */
export function getFilteredQuestions(params: QuestionFilterParams): QuestionPaginationResult {
  loadPersistentQuestions();

  let filtered = [...MASTER_QUESTION_BANK];

  if (params.certification && params.certification !== 'ALL') {
    filtered = filtered.filter((q) => q.certification === params.certification);
  }

  if (params.category && params.category !== 'ALL') {
    filtered = filtered.filter((q) => q.category === params.category);
  }

  if (params.difficulty && params.difficulty !== 'ALL') {
    filtered = filtered.filter((q) => q.difficulty === params.difficulty);
  }

  if (params.status && params.status !== 'ALL') {
    filtered = filtered.filter((q) => q.status === params.status);
  }

  if (params.isPremium !== undefined) {
    filtered = filtered.filter((q) => q.isPremium === params.isPremium);
  }

  if (params.search && params.search.trim() !== '') {
    const term = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (q) =>
        q.question.toLowerCase().includes(term) ||
        (q.scenarioText && q.scenarioText.toLowerCase().includes(term)) ||
        q.id.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term) ||
        q.options.some((o) => o.text.toLowerCase().includes(term)) ||
        q.keywords.some((k) => k.toLowerCase().includes(term))
    );
  }

  const page = params.page && params.page > 0 ? params.page : 1;
  const size = params.pageSize || params.limit || 10;
  const total = filtered.length;
  const totalPages = Math.ceil(total / size) || 1;

  const startIndex = (page - 1) * size;
  const data = filtered.slice(startIndex, startIndex + size);

  return {
    data,
    total,
    page,
    limit: size,
    pageSize: size,
    totalPages,
  };
}

/**
 * Retrieve single question by ID
 */
export function getQuestionById(id: string): MasterQuestion | undefined {
  loadPersistentQuestions();
  return MASTER_QUESTION_BANK.find((q) => q.id === id);
}

/**
 * Create a new Master Question
 */
export function createQuestion(data: Partial<MasterQuestion>): MasterQuestion {
  loadPersistentQuestions();

  const qId = data.id || `mq-${(data.certification || 'RBT').toLowerCase()}-${Date.now()}`;
  const newQuestion: MasterQuestion = {
    id: qId,
    certification: data.certification || 'RBT',
    question: data.question || 'New Master Question Text',
    scenarioText: data.scenarioText,
    questionType: data.questionType || 'scenario_based',
    difficulty: data.difficulty || 'medium',
    options: data.options || [
      { id: 'A', text: 'Option A', isCorrect: true },
      { id: 'B', text: 'Option B', isCorrect: false },
      { id: 'C', text: 'Option C', isCorrect: false },
      { id: 'D', text: 'Option D', isCorrect: false },
    ],
    correctAnswerId: data.correctAnswerId || 'A',
    answerExplanation: data.answerExplanation || 'Comprehensive BACB explanation for target answer.',
    clinicalExplanation: data.clinicalExplanation || 'BCBA Clinical rationale.',
    references: data.references || 'BACB RBT 3rd Edition TCO Item A-01',
    examTips: data.examTips,
    commonMistakes: data.commonMistakes,
    category: data.category || 'Data Collection and Graphing',
    subCategory: data.subCategory || 'Continuous Measurement',
    keywords: data.keywords || ['ABA', 'BACB', 'RBT 3rd Edition'],
    taskListVersion: data.taskListVersion || '3rd_edition',
    estimatedTimeSeconds: data.estimatedTimeSeconds || 60,
    tags: data.tags || ['Master Bank'],
    status: data.status || 'published',
    isPremium: data.isPremium || false,
    isFeatured: data.isFeatured || false,
    version: 1,
    createdBy: data.createdBy || 'Super Admin CMS',
    updatedBy: data.updatedBy || 'Super Admin CMS',
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as MasterQuestion;

  const existingIndex = MASTER_QUESTION_BANK.findIndex((q) => q.id === qId);
  if (existingIndex >= 0) {
    MASTER_QUESTION_BANK[existingIndex] = newQuestion;
  } else {
    MASTER_QUESTION_BANK.unshift(newQuestion);
  }
  savePersistentQuestions();
  return newQuestion;
}

/**
 * Update existing Master Question
 */
export function updateQuestion(id: string, updates: Partial<MasterQuestion>): MasterQuestion | undefined {
  loadPersistentQuestions();
  const index = MASTER_QUESTION_BANK.findIndex((q) => q.id === id);
  if (index === -1) return undefined;

  const current = MASTER_QUESTION_BANK[index];
  const updated: MasterQuestion = {
    ...current,
    ...updates,
    version: current.version + 1,
    updatedAt: new Date().toISOString(),
  };

  MASTER_QUESTION_BANK[index] = updated;
  savePersistentQuestions();
  return updated;
}

/**
 * Delete Question by ID
 */
export function deleteQuestion(id: string): boolean {
  loadPersistentQuestions();
  const index = MASTER_QUESTION_BANK.findIndex((q) => q.id === id);
  if (index === -1) return false;
  MASTER_QUESTION_BANK.splice(index, 1);
  savePersistentQuestions();
  return true;
}

/**
 * Bulk status update (Publish, Archive, Draft)
 */
export function bulkUpdateStatus(ids: string[], status: QuestionStatus): number {
  loadPersistentQuestions();
  let count = 0;
  MASTER_QUESTION_BANK.forEach((q) => {
    if (ids.includes(q.id)) {
      q.status = status;
      q.updatedAt = new Date().toISOString();
      count++;
    }
  });
  savePersistentQuestions();
  return count;
}

/**
 * Bulk delete questions
 */
export function bulkDeleteQuestions(ids: string[]): number {
  loadPersistentQuestions();
  let count = 0;
  for (let i = MASTER_QUESTION_BANK.length - 1; i >= 0; i--) {
    if (ids.includes(MASTER_QUESTION_BANK[i].id)) {
      MASTER_QUESTION_BANK.splice(i, 1);
      count++;
    }
  }
  savePersistentQuestions();
  return count;
}

/**
 * Export questions array to CSV string
 */
export function exportQuestionsToCSV(questions: MasterQuestion[]): string {
  const headers = [
    'ID',
    'Certification',
    'Category',
    'Difficulty',
    'Question Type',
    'Question Text',
    'Scenario Text',
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Correct Answer ID',
    'Answer Explanation',
    'Clinical Explanation',
    'References',
    'Status',
    'Is Premium',
  ];

  const rows = questions.map((q) => [
    `"${q.id}"`,
    `"${q.certification}"`,
    `"${q.category}"`,
    `"${q.difficulty}"`,
    `"${q.questionType}"`,
    `"${q.question.replace(/"/g, '""')}"`,
    `"${(q.scenarioText || '').replace(/"/g, '""')}"`,
    `"${(q.options[0]?.text || '').replace(/"/g, '""')}"`,
    `"${(q.options[1]?.text || '').replace(/"/g, '""')}"`,
    `"${(q.options[2]?.text || '').replace(/"/g, '""')}"`,
    `"${(q.options[3]?.text || '').replace(/"/g, '""')}"`,
    `"${q.correctAnswerId}"`,
    `"${q.answerExplanation.replace(/"/g, '""')}"`,
    `"${q.clinicalExplanation.replace(/"/g, '""')}"`,
    `"${q.references.replace(/"/g, '""')}"`,
    `"${q.status}"`,
    `"${q.isPremium ? 'YES' : 'NO'}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
