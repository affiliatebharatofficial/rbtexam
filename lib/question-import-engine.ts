import {
  MasterQuestion,
  ImportValidationResult,
  CertificationLevel,
  QuestionType,
  QuestionDifficulty,
  QuestionCategory,
} from '@/types/master-question';
import { MASTER_QUESTION_BANK } from './master-question-bank';

export function normalizeCategory(rawCat: string): QuestionCategory {
  if (!rawCat) return 'Behavior Assessment';
  const clean = rawCat.trim().toLowerCase();

  if (clean.includes('domain b') || clean.includes('assessment')) {
    return 'Behavior Assessment';
  }
  if (clean.includes('domain a') || clean.includes('measurement') || clean.includes('graphing')) {
    return 'Measurement';
  }
  if (clean.includes('domain c') || clean.includes('acquisition') || clean.includes('skill')) {
    return 'Skill Acquisition';
  }
  if (clean.includes('domain d') || clean.includes('reduction')) {
    return 'Behavior Reduction';
  }
  if (clean.includes('domain e') || clean.includes('documentation') || clean.includes('reporting')) {
    return 'Documentation and Reporting';
  }
  if (clean.includes('domain f') || clean.includes('ethics') || clean.includes('conduct')) {
    return 'Ethics';
  }
  return rawCat as QuestionCategory;
}

export function normalizeQuestionForComparison(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export interface ColumnMap {
  id: number;
  certification: number;
  category: number;
  difficulty: number;
  questionType: number;
  question: number;
  scenario: number;
  optionA: number;
  optionB: number;
  optionC: number;
  optionD: number;
  correctChoice: number;
  answerExplanation: number;
  clinicalExplanation: number;
  references: number;
}

/**
 * Dynamically resolves column indexes from CSV header labels
 */
export function mapCSVHeaders(headers: string[]): ColumnMap {
  const clean = headers.map((h) => h.trim().toLowerCase());

  const find = (keywords: string[], fallbackIdx: number): number => {
    const idx = clean.findIndex((h) =>
      keywords.some((kw) => {
        if (kw.length === 1) {
          return new RegExp(`(?:^|\\W)${kw}(?:$|\\W)`, 'i').test(h);
        }
        return h === kw || h.includes(kw);
      })
    );
    return idx !== -1 ? idx : fallbackIdx;
  };

  return {
    id: find(['id', 'question_id', 'question id', 'num'], 0),
    certification: find(['certification', 'cert', 'exam level', 'level', 'exam'], 1),
    category: find(['category', 'domain', 'topic', 'subject', 'task list'], 2),
    difficulty: find(['difficulty', 'diff'], 3),
    questionType: find(['question_type', 'question type', 'type', 'format'], 4),
    question: find(['question_text', 'question text', 'question', 'stem', 'prompt', 'item', 'title'], 5),
    scenario: find(['scenario_text', 'scenario text', 'scenario', 'context', 'case'], 6),
    optionA: find(['option_a', 'option a', 'choice_a', 'choice a', 'opt_a', 'opt a', 'ans a', 'a'], 7),
    optionB: find(['option_b', 'option b', 'choice_b', 'choice b', 'opt_b', 'opt b', 'ans b', 'b'], 8),
    optionC: find(['option_c', 'option c', 'choice_c', 'choice c', 'opt_c', 'opt c', 'ans c', 'c'], 9),
    optionD: find(['option_d', 'option d', 'choice_d', 'choice d', 'opt_d', 'opt d', 'ans d', 'd'], 10),
    correctChoice: find(['correct_choice', 'correct choice', 'correct_answer', 'correct answer', 'answer', 'key', 'solution'], 11),
    answerExplanation: find(['answer_explanation', 'answer explanation', 'explanation', 'rationale', 'reason'], 12),
    clinicalExplanation: find(['clinical_explanation', 'clinical rationale', 'clinical explanation', 'clinical'], 13),
    references: find(['bacb_task_reference', 'task reference', 'reference', 'references'], 14),
  };
}

/**
 * Smartly resolves raw correct choice value (letter 'A'-'D', number '1'-'4', or option text match)
 */
export function resolveCorrectChoice(
  rawChoice: string,
  optA: string = '',
  optB: string = '',
  optC: string = '',
  optD: string = ''
): string {
  if (!rawChoice) return 'A';
  const clean = rawChoice.trim().toUpperCase();

  // Direct Letter Match
  if (['A', 'B', 'C', 'D'].includes(clean)) return clean;

  // Number Mapping
  if (clean === '1') return 'A';
  if (clean === '2') return 'B';
  if (clean === '3') return 'C';
  if (clean === '4') return 'D';

  // Prefix Match (e.g. "Option B", "Choice C", "A)", "B.")
  if (/^(OPTION|CHOICE|ANS|ANSWER)?\s*A[\s.:)]/i.test(clean) || clean.startsWith('A)') || clean.startsWith('A.')) return 'A';
  if (/^(OPTION|CHOICE|ANS|ANSWER)?\s*B[\s.:)]/i.test(clean) || clean.startsWith('B)') || clean.startsWith('B.')) return 'B';
  if (/^(OPTION|CHOICE|ANS|ANSWER)?\s*C[\s.:)]/i.test(clean) || clean.startsWith('C)') || clean.startsWith('C.')) return 'C';
  if (/^(OPTION|CHOICE|ANS|ANSWER)?\s*D[\s.:)]/i.test(clean) || clean.startsWith('D)') || clean.startsWith('D.')) return 'D';

  // Text Matching against Option Contents
  const normRaw = normalizeQuestionForComparison(clean);
  if (normRaw.length > 3) {
    const normA = normalizeQuestionForComparison(optA);
    const normB = normalizeQuestionForComparison(optB);
    const normC = normalizeQuestionForComparison(optC);
    const normD = normalizeQuestionForComparison(optD);

    if (normA && (normRaw === normA || normRaw.includes(normA) || normA.includes(normRaw))) return 'A';
    if (normB && (normRaw === normB || normRaw.includes(normB) || normB.includes(normRaw))) return 'B';
    if (normC && (normRaw === normC || normRaw.includes(normC) || normC.includes(normRaw))) return 'C';
    if (normD && (normRaw === normD || normRaw.includes(normD) || normD.includes(normRaw))) return 'D';
  }

  return 'A'; // Safe fallback default
}

/**
 * Parses raw CSV string data into structured question candidates
 * with dynamic column header mapping, full field validation, and duplicate detection.
 */
export function parseAndValidateCSV(
  csvText: string,
  existingBank: MasterQuestion[] = [],
  defaultCertification: CertificationLevel = 'BCBA'
): ImportValidationResult {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length < 2) {
    return {
      validRows: [],
      invalidRows: [
        {
          row: 1,
          rawData: csvText,
          errors: ['CSV file is empty or missing headers row.'],
        },
      ],
      totalRows: 0,
      duplicateCount: 0,
    };
  }

  const validRows: Partial<MasterQuestion>[] = [];
  const invalidRows: { row: number; rawData: any; errors: string[] }[] = [];
  let duplicateCount = 0;

  // Build normalized lookup set from existing system question bank
  const existingNormalizedStems = new Set<string>();
  const bankToUse = existingBank.length > 0 ? existingBank : MASTER_QUESTION_BANK;
  for (const q of bankToUse) {
    if (q.question) {
      existingNormalizedStems.add(normalizeQuestionForComparison(q.question));
    }
  }

  // Track normalized stems within current CSV file to catch intra-file duplicates
  const seenInCurrentCsv = new Set<string>();

  // Dynamic Header Column Mapping
  const rawHeaders = parseCSVLine(lines[0]);
  const colMap = mapCSVHeaders(rawHeaders);

  for (let i = 1; i < lines.length; i++) {
    const rowValues = parseCSVLine(lines[i]);
    const rowNumber = i + 1;
    const errors: string[] = [];

    // Safely extract cell values using dynamic column map
    const getVal = (idx: number, fallback: string = ''): string => {
      return (rowValues[idx] !== undefined && rowValues[idx] !== null) ? rowValues[idx].trim() : fallback;
    };

    const certCandidate = getVal(colMap.certification, defaultCertification).toUpperCase();
    const certificationRaw: CertificationLevel = ['RBT', 'BCaBA', 'BCBA'].includes(certCandidate)
      ? (certCandidate as CertificationLevel)
      : defaultCertification;

    const categoryRaw = normalizeCategory(getVal(colMap.category, 'Behavior Assessment'));
    const difficultyRaw = getVal(colMap.difficulty, 'medium').toLowerCase();
    const typeRaw = getVal(colMap.questionType, 'scenario_based').toLowerCase();

    const questionText = getVal(colMap.question, '');
    const scenarioText = getVal(colMap.scenario, '');
    const optA = getVal(colMap.optionA, '');
    const optB = getVal(colMap.optionB, '');
    const optC = getVal(colMap.optionC, '');
    const optD = getVal(colMap.optionD, '');
    const rawCorrect = getVal(colMap.correctChoice, 'A');
    const correctAns = resolveCorrectChoice(rawCorrect, optA, optB, optC, optD);
    const answerExpl = getVal(colMap.answerExplanation, 'Correct choice explanation.');
    const clinicalExpl = getVal(colMap.clinicalExplanation, 'Clinical BACB rationale.');
    const references = getVal(colMap.references, `BACB ${certificationRaw} 3rd Edition TCO`);

    // Field Validations
    if (!questionText.trim()) {
      errors.push('Question text is mandatory.');
    }

    if (!optA.trim() || !optB.trim()) {
      errors.push('At least Options A and B are mandatory.');
    }

    // Duplicate Detection Check against database bank & current CSV file rows
    const normStem = normalizeQuestionForComparison(questionText);
    if (normStem.length > 5) {
      const isDuplicateInBank = existingNormalizedStems.has(normStem);
      const isDuplicateInCsv = seenInCurrentCsv.has(normStem);

      if (isDuplicateInBank || isDuplicateInCsv) {
        duplicateCount++;
        errors.push(
          isDuplicateInCsv
            ? 'Duplicate question prompt detected within this CSV file.'
            : 'Duplicate question prompt already exists in system bank.'
        );
      } else {
        seenInCurrentCsv.add(normStem);
      }
    }

    if (errors.length > 0) {
      invalidRows.push({
        row: rowNumber,
        rawData: lines[i],
        errors,
      });
    } else {
      const parsedQuestion: Partial<MasterQuestion> = {
        certification: certificationRaw,
        category: categoryRaw,
        difficulty: (['easy', 'medium', 'hard'].includes(difficultyRaw) ? difficultyRaw : 'medium') as QuestionDifficulty,
        questionType: (['multiple_choice', 'true_false', 'scenario_based', 'case_study'].includes(typeRaw) ? typeRaw : 'scenario_based') as QuestionType,
        question: questionText,
        scenarioText,
        options: [
          { id: 'A', text: optA, isCorrect: correctAns === 'A' },
          { id: 'B', text: optB, isCorrect: correctAns === 'B' },
          { id: 'C', text: optC || 'N/A', isCorrect: correctAns === 'C' },
          { id: 'D', text: optD || 'N/A', isCorrect: correctAns === 'D' },
        ],
        correctAnswerId: correctAns,
        answerExplanation: answerExpl,
        clinicalExplanation: clinicalExpl,
        references,
        keywords: [categoryRaw, certificationRaw],
        taskListVersion: '3rd_edition',
        estimatedTimeSeconds: 60,
        tags: ['CSV Import', certificationRaw],
        status: 'published',
        isPremium: false,
        isFeatured: false,
      };

      validRows.push(parsedQuestion);
    }
  }

  return {
    validRows,
    invalidRows,
    totalRows: lines.length - 1,
    duplicateCount,
  };
}

/**
 * Simple CSV Line Splitting Helper with quote handling
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/**
 * Generates a ready-to-use sample CSV template string
 * with pre-formatted column headers and BACB sample rows.
 */
export function generateSampleCSVTemplate(): string {
  const headers = [
    'ID',
    'Certification',
    'Category',
    'Difficulty',
    'Type',
    'Question',
    'Scenario',
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Correct Choice',
    'Answer Explanation',
    'Clinical Rationale',
    'BACB Task Reference',
  ];

  const sampleRows = [
    [
      'mq-sample-01',
      'RBT',
      'Measurement',
      'medium',
      'scenario_based',
      'An RBT measures the exact time elapsed between presentation of the instruction "Sit down" and when the client initiates sitting. What continuous measurement procedure is being recorded?',
      'During a therapy session, the RBT delivers a verbal SD and starts a stopwatch.',
      'Duration',
      'Latency',
      'Inter-Response Time (IRT)',
      'Frequency',
      'B',
      'Latency measures the elapsed time from SD presentation to response initiation.',
      'Latency measurement tracks response initiation speed relative to environmental prompts.',
      'BACB RBT 3rd Edition TCO Item A-01',
    ],
    [
      'mq-sample-02',
      'RBT',
      'Behavior Reduction',
      'hard',
      'scenario_based',
      'A BCBA instructs an RBT to deliver a token every 5 minutes if the learner engages in ZERO instances of vocal screaming. What procedure is this?',
      'The learner engages in high-rate vocal screaming during desk work.',
      'Differential Reinforcement of Alternative Behavior (DRA)',
      'Differential Reinforcement of Incompatible Behavior (DRI)',
      'Differential Reinforcement of Other Behavior (DRO)',
      'Non-Contingent Reinforcement (NCR)',
      'C',
      'DRO reinforces zero occurrences (omission) of target problem behavior during a time interval.',
      'DRO (Omission Training) delivers reinforcement contingent on zero occurrences of the target behavior.',
      'BACB RBT 3rd Edition TCO Item D-04',
    ],
    [
      'mq-sample-03',
      'BCBA',
      'Ethics',
      'medium',
      'case_study',
      'A client mother offers an RBT a $100 spa gift card at the end of a therapy month. What is the ethical course of action?',
      'The RBT is offered a high-value monetary gift card by a client parent.',
      'Accept the gift card graciously',
      'Politely decline, explain BACB ethical guidelines, and notify BCBA supervisor',
      'Accept the gift card but share it with the team',
      'Exchange the gift card for clinical toys',
      'B',
      'RBTs must decline high-value monetary gifts to prevent dual relationships.',
      'BACB Ethics Code mandates declining monetary gifts to preserve objective clinical boundaries.',
      'BACB Ethics Code Item F-02',
    ],
  ];

  const csvLines = [
    headers.join(','),
    ...sampleRows.map((row) => row.map((val) => `"${val.replace(/"/g, '""')}"`).join(',')),
  ];

  return csvLines.join('\n');
}
