import { describe, it, expect } from 'vitest';
import {
  parseAndValidateCSV,
  mapCSVHeaders,
  resolveCorrectChoice,
  normalizeCategory,
} from '../../lib/question-import-engine';
import { MasterQuestion } from '../../types/master-question';

describe('Question CSV Import Engine', () => {
  it('should dynamically map headers with non-standard column titles', () => {
    const headers = [
      'Question Prompt',
      'Choice A',
      'Choice B',
      'Choice C',
      'Choice D',
      'Correct Answer',
      'Rationale',
      'Domain',
    ];
    const map = mapCSVHeaders(headers);

    expect(map.question).toBe(0);
    expect(map.optionA).toBe(1);
    expect(map.optionB).toBe(2);
    expect(map.optionC).toBe(3);
    expect(map.optionD).toBe(4);
    expect(map.correctChoice).toBe(5);
    expect(map.answerExplanation).toBe(6);
    expect(map.category).toBe(7);
  });

  it('should smartly match full option text to letter A, B, C, or D', () => {
    const optA = 'Differential Reinforcement of Alternative Behavior';
    const optB = 'Neither, because control can never be demonstrated with fewer than ten replications';
    const optC = 'Baseline data are unnecessary from a scientific standpoint but are included for legal protection';
    const optD = 'Response Blocking';

    expect(resolveCorrectChoice('B', optA, optB, optC, optD)).toBe('B');
    expect(resolveCorrectChoice('2', optA, optB, optC, optD)).toBe('B');
    expect(
      resolveCorrectChoice(
        'Neither, because control can never be demonstrated with fewer than ten replications',
        optA,
        optB,
        optC,
        optD
      )
    ).toBe('B');
    expect(
      resolveCorrectChoice(
        'BASELINE DATA ARE UNNECESSARY FROM A SCIENTIFIC STANDPOINT BUT ARE INCLUDED FOR LEGAL PROTECTION',
        optA,
        optB,
        optC,
        optD
      )
    ).toBe('C');
  });

  it('should parse 20 unique BCBA questions without false duplicate warnings or letter errors', () => {
    const csvHeader = 'Question,Option A,Option B,Option C,Option D,Correct Answer,Explanation\n';
    const sampleRows = Array.from({ length: 20 }, (_, i) => {
      const qNum = i + 1;
      return `"BCBA Practice Question Stem #${qNum} regarding functional measurement and intervention","Option A text for Q${qNum}","Option B text for Q${qNum}","Option C text for Q${qNum}","Option D text for Q${qNum}","Option B text for Q${qNum}","Detailed clinical rationale for BCBA Q${qNum}"`;
    }).join('\n');

    const csvText = csvHeader + sampleRows;
    const result = parseAndValidateCSV(csvText, [], 'BCBA');

    expect(result.totalRows).toBe(20);
    expect(result.validRows.length).toBe(20);
    expect(result.invalidRows.length).toBe(0);
    expect(result.duplicateCount).toBe(0);

    // Verify certification assigned to BCBA
    expect(result.validRows[0].certification).toBe('BCBA');
    expect(result.validRows[0].correctAnswerId).toBe('B');
  });
});
