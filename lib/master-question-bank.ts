import {
  MasterQuestion,
  QuestionFilterParams,
  QuestionPaginationResult,
  QuestionStatus,
  CertificationLevel,
} from '@/types/master-question';

// In-Memory Master Question Store (Supabase client fallback ready)
export const MASTER_QUESTION_BANK: MasterQuestion[] = [
  {
    id: 'mq-rbt-001',
    certification: 'RBT',
    question: 'Which continuous measurement procedure is the RBT implementing when recording elapsed time from instruction to response start?',
    scenarioText: 'An RBT delivers the instruction "Sit down", starts a timer immediately, and stops the timer when the client physically begins lowering into the chair 4 seconds later.',
    questionType: 'scenario_based',
    difficulty: 'easy',
    options: [
      { id: 'A', text: 'Duration', isCorrect: false, explanation: 'Duration measures total time behavior lasts from onset to offset.' },
      { id: 'B', text: 'Latency', isCorrect: true, explanation: 'Latency measures elapsing time from SD delivery to response initiation.' },
      { id: 'C', text: 'Frequency', isCorrect: false, explanation: 'Frequency counts instances of behavior.' },
      { id: 'D', text: 'Inter-Response Time (IRT)', isCorrect: false, explanation: 'IRT measures time between two consecutive responses.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'Latency measures the elapsed time between the onset of a stimulus (SD) and the initiation of the response behavior.',
    clinicalExplanation: 'In clinical trial data collection, measuring latency helps evaluate processing speed and compliance prompt dependence. For RBT Task Item A-02, latency is classified as a continuous dimensional measure.',
    references: 'BACB 2nd Edition Task List Item A-02 | Ethics Code 2.01',
    examTips: 'Remember: SD to Start = Latency. Start to Stop = Duration. Stop 1 to Start 2 = IRT.',
    commonMistakes: 'Candidates frequently confuse Latency with Duration. Look for "instruction delivered" as the start trigger.',
    category: 'Measurement',
    subCategory: 'Continuous Measurement',
    keywords: ['Latency', 'Continuous Measurement', 'SD', 'Response Initiation'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Measurement', 'RBT Core', 'High Weight'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'mq-bcba-001',
    certification: 'BCBA',
    question: 'Which functional behavior assessment (FBA) methodology confirms a true functional relation through systematic environmental manipulation?',
    scenarioText: 'A BCBA observes severe self-injurious behavior (SIB) in a residential client. The BCBA designs a multi-condition experiment (Play, Demand, Attention, Alone) to evaluate differential rates of SIB.',
    questionType: 'case_study',
    difficulty: 'hard',
    options: [
      { id: 'A', text: 'Indirect Assessment (QABF / FAST)', isCorrect: false, explanation: 'Indirect assessments rely on informant memory rather than direct observation or manipulation.' },
      { id: 'B', text: 'Descriptive ABC Functional Assessment', isCorrect: false, explanation: 'Descriptive assessment identifies correlations but CANNOT demonstrate causation.' },
      { id: 'C', text: 'Analog Functional Analysis (Iwata Standard)', isCorrect: true, explanation: 'Functional Analysis involves systematic antecedent and consequence manipulation to prove causation.' },
      { id: 'D', text: 'Ecological Preference Assessment', isCorrect: false, explanation: 'Preference assessments identify potential reinforcers, not behavior function.' },
    ],
    correctAnswerId: 'C',
    answerExplanation: 'Only a Functional Analysis (FA) systematically manipulates environmental antecedents and consequences to demonstrate functional relations.',
    clinicalExplanation: 'Iwata et al. (1982/1994) established analog FA conditions (Demand, Attention, Alone, Play). High rates in Demand indicate escape function; high rates in Attention indicate social positive reinforcement.',
    references: 'BACB 6th Edition Task List Domain C-01 | Cooper, Heron, & Heward (3rd Ed, Ch. 24)',
    examTips: 'Experimental control and true causation require a Functional Analysis (FA). Correlation does not equal causation in Descriptive ABC data.',
    commonMistakes: 'Confusing Descriptive ABC Data (correlational) with Functional Analysis (experimental).',
    category: 'Assessment',
    subCategory: 'Functional Behavior Assessment',
    keywords: ['Functional Analysis', 'Experimental Manipulation', 'BCBA', 'FBA'],
    taskListVersion: '6th_edition',
    estimatedTimeSeconds: 90,
    tags: ['BCBA Advanced', 'FBA', 'Experimental Design'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    version: 2,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-02T12:00:00.000Z',
    updatedAt: '2026-08-04T15:30:00.000Z',
  },
  {
    id: 'mq-bcaba-001',
    certification: 'BCaBA',
    question: 'When implementing a token economy for a classroom cohort, what is the primary role of the exchange ratio?',
    scenarioText: 'A BCaBA supervises an RBT team implementing a token board. Learners earn stars for completing task demands and exchange 10 stars for 5 minutes of iPad access.',
    questionType: 'multiple_choice',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'To establish the monetary baseline of backup reinforcers', isCorrect: false, explanation: 'Tokens do not use monetary values.' },
      { id: 'B', text: 'To define how many secondary reinforcers (tokens) are needed to acquire a backup primary/secondary reinforcer', isCorrect: true, explanation: 'Exchange ratio specifies token cost for backup items.' },
      { id: 'C', text: 'To eliminate the need for generalized conditioned reinforcers', isCorrect: false, explanation: 'Tokens ARE generalized conditioned reinforcers.' },
      { id: 'D', text: 'To mandate immediate prompt fading', isCorrect: false, explanation: 'Exchange ratio governs reinforcement schedule, not prompt fading.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'The exchange ratio specifies the exact number of tokens required to purchase a chosen backup reinforcer.',
    clinicalExplanation: 'Token economies rely on generalized conditioned reinforcers. Fading the exchange ratio (requiring more tokens per backup item) builds resistance to extinction.',
    references: 'BACB 5th Edition Task List Item G-03 | Cooper et al., Ch. 26',
    examTips: 'Backup reinforcers provide tokens with their reinforcing value through pairing.',
    commonMistakes: 'Over-pricing backup items initially leads to ratio strain and token abandonment.',
    category: 'Token Economy',
    subCategory: 'Conditioned Reinforcement',
    keywords: ['Token Economy', 'Exchange Ratio', 'BCaBA', 'Backup Reinforcer'],
    taskListVersion: '5th_edition',
    estimatedTimeSeconds: 60,
    tags: ['BCaBA', 'Token Economy', 'Reinforcement'],
    status: 'published',
    isPremium: true,
    isFeatured: false,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-03T09:00:00.000Z',
    updatedAt: '2026-08-03T09:00:00.000Z',
  },
];

/**
 * Filter and paginate questions in the Master Question Bank
 */
export function getFilteredQuestions(params: QuestionFilterParams): QuestionPaginationResult {
  let list = [...MASTER_QUESTION_BANK];

  // Search text filter
  if (params.search && params.search.trim()) {
    const query = params.search.toLowerCase();
    list = list.filter(
      (q) =>
        q.question.toLowerCase().includes(query) ||
        (q.scenarioText && q.scenarioText.toLowerCase().includes(query)) ||
        q.category.toLowerCase().includes(query) ||
        q.keywords.some((k) => k.toLowerCase().includes(query))
    );
  }

  // Certification filter
  if (params.certification && params.certification !== 'ALL') {
    list = list.filter((q) => q.certification === params.certification);
  }

  // Category filter
  if (params.category && params.category !== 'ALL') {
    list = list.filter((q) => q.category === params.category);
  }

  // Difficulty filter
  if (params.difficulty && params.difficulty !== 'ALL') {
    list = list.filter((q) => q.difficulty === params.difficulty);
  }

  // Status filter
  if (params.status && params.status !== 'ALL') {
    list = list.filter((q) => q.status === params.status);
  }

  // Premium filter
  if (params.isPremium !== undefined) {
    list = list.filter((q) => q.isPremium === params.isPremium);
  }

  // Sorting
  const sortBy = params.sortBy || 'createdAt';
  const sortOrder = params.sortOrder || 'desc';

  list.sort((a: any, b: any) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const total = list.length;
  const totalPages = Math.ceil(total / limit) || 1;

  const startIndex = (page - 1) * limit;
  const paginatedData = list.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    total,
    page,
    totalPages,
    limit,
  };
}

/**
 * Get Question by ID
 */
export function getQuestionById(id: string): MasterQuestion | undefined {
  return MASTER_QUESTION_BANK.find((q) => q.id === id);
}

/**
 * Create new Master Question
 */
export function createQuestion(data: Omit<MasterQuestion, 'id' | 'createdAt' | 'updatedAt' | 'version'>): MasterQuestion {
  const newQuestion: MasterQuestion = {
    ...data,
    id: `mq-${data.certification.toLowerCase()}-${Math.random().toString(36).substring(2, 8)}`,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  MASTER_QUESTION_BANK.unshift(newQuestion);
  return newQuestion;
}

/**
 * Update existing Master Question
 */
export function updateQuestion(id: string, updates: Partial<MasterQuestion>): MasterQuestion | undefined {
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
  return updated;
}

/**
 * Delete Question by ID
 */
export function deleteQuestion(id: string): boolean {
  const index = MASTER_QUESTION_BANK.findIndex((q) => q.id === id);
  if (index === -1) return false;
  MASTER_QUESTION_BANK.splice(index, 1);
  return true;
}

/**
 * Bulk status update (Publish, Archive, Draft)
 */
export function bulkUpdateStatus(ids: string[], status: QuestionStatus): number {
  let count = 0;
  MASTER_QUESTION_BANK.forEach((q) => {
    if (ids.includes(q.id)) {
      q.status = status;
      q.updatedAt = new Date().toISOString();
      count++;
    }
  });
  return count;
}

/**
 * Bulk delete questions
 */
export function bulkDeleteQuestions(ids: string[]): number {
  let count = 0;
  for (let i = MASTER_QUESTION_BANK.length - 1; i >= 0; i--) {
    if (ids.includes(MASTER_QUESTION_BANK[i].id)) {
      MASTER_QUESTION_BANK.splice(i, 1);
      count++;
    }
  }
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
