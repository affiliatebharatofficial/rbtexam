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
    const references = rowValues[14] || 'BACB Task List 2nd Edition';

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
        taskListVersion: '2nd_edition',
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
