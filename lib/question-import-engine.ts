import {
  MasterQuestion,
  ImportValidationResult,
  CertificationLevel,
  QuestionType,
  QuestionDifficulty,
  QuestionCategory,
  RowValidationDebug,
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

/**
 * Normalizes question text strictly for duplicate detection.
 * 1. Trims whitespace
 * 2. Converts repeated whitespace / newlines (\s+) to single space
 * 3. Normalizes smart quotes (“ ” ‘ ’) to standard quotes
 * 4. Converts to lower case
 * 5. Removes leading and trailing accidental punctuation
 */
export function normalizeQuestionForComparison(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[“”«»]/g, '"')
    .replace(/[‘’`]/g, "'")
    .toLowerCase()
    .replace(/^[.\s?:,;'"!-]+|[.\s?:,;'"!-]+$/g, '')
    .trim();
}

function isQuoteChar(c: string): boolean {
  return c === '"' || c === '“' || c === '”' || c === '«' || c === '»' || c === '‟';
}

/**
 * RFC 4180 Compliant CSV Parser with Smart Quote Support
 * Correctly parses multi-line quoted fields, escaped quotes ("" / “”),
 * fields containing commas/apostrophes, smart curly quotes from Word/Excel/Mac Pages,
 * and strips UTF-8 BOM.
 */
export function parseCSV(csvText: string): string[][] {
  if (!csvText) return [];
  let text = csvText;
  // Strip UTF-8 BOM
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (isQuoteChar(char)) {
        if (i + 1 < text.length && isQuoteChar(text[i + 1])) {
          currentCell += '"';
          i++; // Skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        currentCell += char;
      }
    } else {
      if (isQuoteChar(char) && currentCell.trim().length === 0) {
        inQuotes = true;
        currentCell = ''; // Strip any leading space before quote
      } else if (char === ',') {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\r') {
        if (i + 1 < text.length && text[i + 1] === '\n') {
          i++; // Skip \n
        }
        currentRow.push(currentCell.trim());
        currentCell = '';
        rows.push(currentRow);
        currentRow = [];
      } else if (char === '\n') {
        currentRow.push(currentCell.trim());
        currentCell = '';
        rows.push(currentRow);
        currentRow = [];
      } else {
        currentCell += char;
      }
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows.filter((r) => r.some((cell) => cell.length > 0));
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
 * Dynamically maps CSV header labels to target schema attributes with prioritized matching.
 */
export function mapCSVHeaders(headers: string[]): ColumnMap {
  const clean = headers.map((h) => h.trim().toLowerCase());

  const findHeader = (
    exactMatches: string[],
    includesKw: string[],
    excludeKw: string[] = []
  ): number => {
    // 1. Try exact match
    let idx = clean.findIndex((h) => exactMatches.includes(h));
    if (idx !== -1) return idx;

    // 2. Try includes match with exclusions
    idx = clean.findIndex(
      (h) =>
        includesKw.some((kw) => h.includes(kw)) &&
        !excludeKw.some((ex) => h.includes(ex))
    );
    return idx;
  };

  // Correct Choice Header Matching: Must NEVER match explanation or rationale headers
  let correctChoiceIdx = findHeader(
    [
      'correct answer id',
      'correct_answer_id',
      'correct choice',
      'correct_choice',
      'correct answer',
      'correct_answer',
      'correct option',
      'correct_option',
      'correct',
      'key',
    ],
    ['correct'],
    ['explanation', 'rationale', 'reason', 'mistake', 'tip']
  );
  if (correctChoiceIdx === -1) {
    correctChoiceIdx = clean.findIndex(
      (h) =>
        h.includes('answer') &&
        !h.includes('explanation') &&
        !h.includes('rationale') &&
        !h.includes('text')
    );
  }

  // Question Text Header Matching: Must NEVER match question type, options, or explanations
  const questionIdx = findHeader(
    ['question text', 'question_text', 'question prompt', 'question_prompt', 'question', 'stem', 'prompt', 'item text'],
    ['question', 'stem', 'prompt', 'item text'],
    ['type', 'format', 'id', 'category', 'explanation', 'option', 'choice']
  );

  // Question Type Header Matching: Must NEVER match question text
  const questionTypeIdx = findHeader(
    ['question type', 'question_type', 'type', 'item type', 'format'],
    ['type', 'format'],
    ['text', 'prompt', 'stem', 'question text']
  );

  return {
    id: findHeader(['id', 'question_id', 'question id', 'num', '#'], ['id', 'num'], []),
    certification: findHeader(
      ['certification', 'cert', 'certification level', 'cert level', 'exam level'],
      ['certification', 'cert level'],
      ['difficulty', 'type', 'task']
    ),
    category: findHeader(['category', 'domain', 'bacb domain', 'topic', 'subject'], ['cat', 'domain', 'topic', 'subject'], []),
    difficulty: findHeader(['difficulty', 'diff'], ['diff'], []),
    questionType: questionTypeIdx,
    question: questionIdx !== -1 ? questionIdx : 5,
    scenario: findHeader(['scenario text', 'scenario_text', 'scenario', 'case study', 'scenario prompt'], ['scen', 'case study'], []),
    optionA: findHeader(['option a', 'option_a', 'choice a', 'choice_a'], ['option a', 'choice a', 'opt a'], []),
    optionB: findHeader(['option b', 'option_b', 'choice b', 'choice_b'], ['option b', 'choice b', 'opt b'], []),
    optionC: findHeader(['option c', 'option_c', 'choice c', 'choice_c'], ['option c', 'choice c', 'opt c'], []),
    optionD: findHeader(['option d', 'option_d', 'choice d', 'choice_d'], ['option d', 'choice d', 'opt d'], []),
    correctChoice: correctChoiceIdx !== -1 ? correctChoiceIdx : 11,
    answerExplanation: findHeader(
      ['answer explanation', 'answer_explanation', 'explanation', 'rationale', 'answer rationale'],
      ['explanation', 'rationale'],
      ['clinical']
    ),
    clinicalExplanation: findHeader(
      ['clinical explanation', 'clinical_explanation', 'clinical rationale', 'clinical background'],
      ['clinical'],
      []
    ),
    references: findHeader(
      ['bacb task reference', 'task reference', 'references', 'reference', 'task code'],
      ['task reference', 'references', 'reference'],
      []
    ),
  };
}

/**
 * Reads Correct Answer ID strictly from designated column or scans row fallback.
 * Valid values are strictly A, B, C, or D (case-insensitive).
 */
export function parseCorrectAnswerId(raw: string): string | null {
  if (!raw) return null;
  const clean = raw.trim().toUpperCase();
  if (['A', 'B', 'C', 'D'].includes(clean)) {
    return clean;
  }
  return null;
}

/**
 * Fallback scanner to recover Correct Answer ID if column alignment shifted slightly.
 */
function findCorrectAnswerIdFallback(rowValues: string[], preferIdx: number): string | null {
  // Check preferIdx first
  if (preferIdx >= 0 && preferIdx < rowValues.length) {
    const res = parseCorrectAnswerId(rowValues[preferIdx]);
    if (res) return res;
  }
  // Scan cells after options (typically index 10 onwards)
  for (let i = Math.max(0, preferIdx - 2); i < Math.min(rowValues.length, preferIdx + 5); i++) {
    const res = parseCorrectAnswerId(rowValues[i]);
    if (res) return res;
  }
  return null;
}

/**
 * Parses raw CSV string data into structured question candidates
 * with RFC 4180 parsing, dynamic header mapping, exact duplicate detection,
 * and comprehensive validation debugging.
 */
export function parseAndValidateCSV(
  csvText: string,
  existingBank: MasterQuestion[] = [],
  defaultCertification: CertificationLevel = 'BCBA'
): ImportValidationResult {
  const parsedRows = parseCSV(csvText);

  if (parsedRows.length < 2) {
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
      debugResults: [],
    };
  }

  const validRows: Partial<MasterQuestion>[] = [];
  const invalidRows: { row: number; rawData: any; errors: string[] }[] = [];
  const debugResults: RowValidationDebug[] = [];
  let duplicateCount = 0;

  // Build normalized lookup set from existing system question bank
  const existingDatabaseStems = new Set<string>();
  if (existingBank && existingBank.length > 0) {
    for (const q of existingBank) {
      if (q.question) {
        const norm = normalizeQuestionForComparison(q.question);
        if (norm) existingDatabaseStems.add(norm);
      }
    }
  }

  // Track normalized stems within current CSV file: normStem -> rowNumber
  const seenInCurrentCsv = new Map<string, number>();

  // Dynamic Header Column Mapping
  const rawHeaders = parsedRows[0];
  // Trim trailing empty cells from header row
  while (rawHeaders.length > 0 && rawHeaders[rawHeaders.length - 1].trim() === '') {
    rawHeaders.pop();
  }
  const colMap = mapCSVHeaders(rawHeaders);
  const headerCount = rawHeaders.length;

  for (let i = 1; i < parsedRows.length; i++) {
    const rowValues = [...parsedRows[i]];
    const rowNumber = i + 1; // 1-indexed row number (Row 1 is header)
    const errors: string[] = [];

    const originalCount = rowValues.length;

    // Trim trailing empty cells if row length exceeds header length
    while (rowValues.length > headerCount && rowValues[rowValues.length - 1].trim() === '') {
      rowValues.pop();
    }

    const effectiveCount = rowValues.length;

    // Pad rowValues with empty strings if row length is less than header length
    while (rowValues.length < headerCount) {
      rowValues.push('');
    }

    // Column Count Validation per Requirement 2
    if (effectiveCount !== headerCount && originalCount !== headerCount) {
      errors.push(`Column count mismatch: expected ${headerCount} columns, but row has ${originalCount} columns.`);
    }

    // Safely extract cell values using column map
    const getVal = (idx: number, fallback: string = ''): string => {
      if (idx < 0 || idx >= rowValues.length) return fallback;
      return rowValues[idx] !== undefined && rowValues[idx] !== null ? rowValues[idx].trim() : fallback;
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
    const rawCorrect = getVal(colMap.correctChoice, '');
    const parsedCorrectId = parseCorrectAnswerId(rawCorrect) || findCorrectAnswerIdFallback(rowValues, colMap.correctChoice);
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

    if (!parsedCorrectId) {
      errors.push(`Invalid Correct Answer ID "${rawCorrect}". Must be A, B, C, or D.`);
    }

    // Duplicate Detection Check strictly comparing normalized Question Text
    const normStem = normalizeQuestionForComparison(questionText);
    let isDuplicate = false;
    let duplicateMatchedRow: number | undefined = undefined;
    let duplicateReason: string | undefined = undefined;

    if (normStem.length > 0) {
      if (seenInCurrentCsv.has(normStem)) {
        isDuplicate = true;
        duplicateMatchedRow = seenInCurrentCsv.get(normStem);
        duplicateReason = `Duplicate question prompt detected within this CSV file (matches Row ${duplicateMatchedRow}).`;
        duplicateCount++;
        errors.push(duplicateReason);
      } else if (existingDatabaseStems.has(normStem)) {
        isDuplicate = true;
        duplicateReason = 'Duplicate question prompt already exists in database system bank.';
        duplicateCount++;
        errors.push(duplicateReason);
      } else {
        seenInCurrentCsv.set(normStem, rowNumber);
      }
    }

    // Record validation debug output per Requirement 13
    debugResults.push({
      row: rowNumber,
      questionTextSnippet: questionText.length > 60 ? `${questionText.substring(0, 60)}...` : questionText,
      correctAnswerId: parsedCorrectId || rawCorrect,
      isDuplicate,
      duplicateMatchedRow,
      duplicateReason,
      errors: [...errors],
    });

    if (errors.length > 0) {
      invalidRows.push({
        row: rowNumber,
        rawData: rowValues.join(','),
        errors,
      });
    } else {
      const finalCorrectId = parsedCorrectId || 'A';
      const parsedQuestion: Partial<MasterQuestion> = {
        certification: certificationRaw,
        category: categoryRaw,
        difficulty: (['easy', 'medium', 'hard'].includes(difficultyRaw) ? difficultyRaw : 'medium') as QuestionDifficulty,
        questionType: (['multiple_choice', 'true_false', 'scenario_based', 'case_study'].includes(typeRaw) ? typeRaw : 'scenario_based') as QuestionType,
        question: questionText,
        scenarioText,
        options: [
          { id: 'A', text: optA, isCorrect: finalCorrectId === 'A' },
          { id: 'B', text: optB, isCorrect: finalCorrectId === 'B' },
          { id: 'C', text: optC || 'N/A', isCorrect: finalCorrectId === 'C' },
          { id: 'D', text: optD || 'N/A', isCorrect: finalCorrectId === 'D' },
        ],
        correctAnswerId: finalCorrectId,
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
    totalRows: parsedRows.length - 1,
    duplicateCount,
    debugResults,
  };
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
    'Question Text',
    'Scenario',
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Correct Answer ID',
    'Answer Explanation',
    'Clinical Rationale',
    'BACB Task Reference',
  ];

  const sampleRows = [
    [
      'mq-sample-01',
      'BCBA',
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
      'BCBA',
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
