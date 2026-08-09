import {
  MasterQuestion,
  ImportValidationResult,
  CertificationLevel,
  QuestionType,
  QuestionDifficulty,
  QuestionCategory,
} from '@/types/master-question';
import { MASTER_QUESTION_BANK } from './master-question-bank';

/**
 * Parses raw CSV string data into structured question candidates
 * with full field validation and duplicate detection.
 */
export function parseAndValidateCSV(csvText: string): ImportValidationResult {
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

  // Header verification
  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());

  for (let i = 1; i < lines.length; i++) {
    const rowValues = parseCSVLine(lines[i]);
    const rowNumber = i + 1;
    const errors: string[] = [];

    if (rowValues.length < 5) {
      invalidRows.push({
        row: rowNumber,
        rawData: lines[i],
        errors: ['Insufficient columns in row.'],
      });
      continue;
    }

    // Map row columns dynamically or by index
    const certificationRaw = (rowValues[1] || 'RBT').toUpperCase();
    const categoryRaw = rowValues[2] || 'Measurement';
    const difficultyRaw = (rowValues[3] || 'medium').toLowerCase();
    const typeRaw = (rowValues[4] || 'scenario_based').toLowerCase();
    const questionText = rowValues[5] || rowValues[0] || '';
    const scenarioText = rowValues[6] || '';
    const optA = rowValues[7] || '';
    const optB = rowValues[8] || '';
    const optC = rowValues[9] || '';
    const optD = rowValues[10] || '';
    const correctAns = (rowValues[11] || 'A').toUpperCase();
    const answerExpl = rowValues[12] || 'Correct choice explanation.';
    const clinicalExpl = rowValues[13] || 'Clinical BACB rationale.';
    const references = rowValues[14] || 'BACB RBT 3rd Edition TCO';

    // Field Validations
    if (!['RBT', 'BCaBA', 'BCBA'].includes(certificationRaw)) {
      errors.push(`Invalid certification level "${certificationRaw}". Must be RBT, BCaBA, or BCBA.`);
    }

    if (!questionText.trim()) {
      errors.push('Question text is mandatory.');
    }

    if (!['A', 'B', 'C', 'D'].includes(correctAns)) {
      errors.push(`Invalid correct choice letter "${correctAns}". Must be A, B, C, or D.`);
    }

    if (!optA.trim() || !optB.trim()) {
      errors.push('At least Options A and B are mandatory.');
    }

    // Duplicate Detection Check against current bank
    const isDuplicate = MASTER_QUESTION_BANK.some(
      (existing) => existing.question.trim().toLowerCase() === questionText.trim().toLowerCase()
    );

    if (isDuplicate) {
      duplicateCount++;
      errors.push('Duplicate question detected in system.');
    }

    if (errors.length > 0) {
      invalidRows.push({
        row: rowNumber,
        rawData: lines[i],
        errors,
      });
    } else {
      const parsedQuestion: Partial<MasterQuestion> = {
        certification: certificationRaw as CertificationLevel,
        category: categoryRaw as QuestionCategory,
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
        tags: ['CSV Import'],
        status: 'draft',
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
