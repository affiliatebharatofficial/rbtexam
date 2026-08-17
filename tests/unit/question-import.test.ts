import { describe, it, expect } from 'vitest';
import {
  parseAndValidateCSV,
  parseCSV,
  mapCSVHeaders,
  parseCorrectAnswerId,
  normalizeQuestionForComparison,
} from '../../lib/question-import-engine';

describe('BCBA CSV Question Import & RFC 4180 Validation Engine', () => {
  it('should parse multi-line quoted fields and commas inside cells per RFC 4180', () => {
    const rawCSV = `ID,Certification,Question Text,Option A,Option B,Option C,Option D,Correct Answer ID,Answer Explanation
"q-101","BCBA","A Behavior Analyst conducts baseline observations.\nLine 2 of prompt with ""quoted text"" and, commas","Option A text","Option B text","Option C text","Option D text","B","Explanation text with, commas and multi-line\ndetails"`;

    const parsed = parseCSV(rawCSV);
    expect(parsed.length).toBe(2);
    expect(parsed[1][0]).toBe('q-101');
    expect(parsed[1][2]).toContain('Line 2 of prompt with "quoted text" and, commas');
    expect(parsed[1][7]).toBe('B');
  });

  it('should prioritize Correct Answer ID header and not confuse it with Answer Explanation', () => {
    const headers = [
      'ID',
      'Task Code',
      'Subcategory',
      'Category',
      'Difficulty',
      'Question Type',
      'Question Text',
      'Option A',
      'Option B',
      'Option C',
      'Option D',
      'Correct Answer ID',
      'Answer Explanation',
      'Clinical Rationale',
      'References',
      'Exam Tips',
      'Common Mistakes',
      'Keywords',
      'Status',
    ];

    const map = mapCSVHeaders(headers);
    expect(map.question).toBe(6);
    expect(map.optionA).toBe(7);
    expect(map.optionB).toBe(8);
    expect(map.optionC).toBe(9);
    expect(map.optionD).toBe(10);
    expect(map.correctChoice).toBe(11); // Correct Answer ID
    expect(map.answerExplanation).toBe(12); // Answer Explanation
  });

  it('should strictly parse Correct Answer ID values A, B, C, D only', () => {
    expect(parseCorrectAnswerId('A')).toBe('A');
    expect(parseCorrectAnswerId(' b ')).toBe('B');
    expect(parseCorrectAnswerId('C')).toBe('C');
    expect(parseCorrectAnswerId('D')).toBe('D');
    expect(parseCorrectAnswerId('DESCRIPTION')).toBeNull();
    expect(parseCorrectAnswerId('INVALID_TEXT')).toBeNull();
  });

  it('should normalize question text by stripping quotes, whitespace, and capitalization', () => {
    const norm1 = normalizeQuestionForComparison('  “What is prediction in ABA?”  ');
    const norm2 = normalizeQuestionForComparison('what is prediction in aba');
    expect(norm1).toBe(norm2);
  });

  it('MUST PASS TEST CASE: 20-question BCBA A.1 Prediction CSV with 19 columns and 0 existing database questions', () => {
    // 19 Header columns matching typical BCBA exports
    const headerRow = [
      'ID',
      'Task Code',
      'Subcategory',
      'Category',
      'Difficulty',
      'Question Type',
      'Question Text',
      'Option A',
      'Option B',
      'Option C',
      'Option D',
      'Correct Answer ID',
      'Answer Explanation',
      'Clinical Rationale',
      'References',
      'Exam Tips',
      'Common Mistakes',
      'Keywords',
      'Status',
    ].join(',');

    // 20 distinct BCBA A.1 Prediction questions with shared ABA domain terms
    const predictionQuestions = [
      'When a BCBA uses baseline data to predict the future level of behavior if no intervention occurs, which level of scientific understanding is demonstrated?',
      'An investigator observes that problem behavior consistently increases during academic tasks across 5 baseline sessions. Predicting that behavior will remain high in future academic tasks represents what concept?',
      'Which statement best describes the role of prediction in single-case experimental design?',
      'A behavior analyst records 10 days of baseline data showing steady state responding before introducing a token economy. The expectation of continued steady responding without intervention is known as what?',
      'Prediction in applied behavior analysis requires which of the following baseline conditions?',
      'In a reversal design, how does prediction function to demonstrate experimental control?',
      'What is the primary difference between prediction and control in behavior analytic research?',
      'A supervisor asks a BCBA trainee how prediction relates to the philosophical assumption of determinism. What is the correct rationale?',
      'When repeated baseline measures reveal a predictable pattern of behavior, what step can the behavior analyst take next?',
      'Which baseline pattern provides the strongest basis for prediction in an ABA study?',
      'Why is prediction considered an essential component of baseline logic in single-case methodology?',
      'An RBT collects frequency data showing 15 instances of aggression per hour across 4 consecutive days. Assuming no change in environment, predicting 15 instances on day 5 illustrates what?',
      'How does prediction differ from correlation when evaluating environmental variables?',
      'A BCBA analyzes graph data and notes a descending trend during intervention. Making a prediction about future data points assumes what condition?',
      'In an alternating treatments design, prediction is evaluated by examining which feature of the graphed data?',
      'Which scenario demonstrates a failure of prediction during the baseline phase of a behavior plan?',
      'A behavior analyst states: ""Based on 2 weeks of stable data, I predict self-injury will remain at 20 rate per hour without intervention."" This statement reflects what scientific level?',
      'How does affirmative verification build upon the initial prediction made during baseline?',
      'When evaluating a multi-element design, prediction is demonstrated by which observation?',
      'Which of the following best defines prediction within the context of BACB Task List Item A-1?',
    ];

    const dataRows = predictionQuestions.map((qText, idx) => {
      const qNum = idx + 1;
      const correctChoice = ['A', 'B', 'C', 'D'][idx % 4];
      return [
        `"bcba-a1-${qNum}"`,
        `"A-1"`,
        `"Prediction"`,
        `"Measurement & Scientific Logic"`,
        `"hard"`,
        `"multiple_choice"`,
        `"${qText}"`,
        `"Option A rationale for prediction item ${qNum}"`,
        `"Option B rationale for prediction item ${qNum}"`,
        `"Option C rationale for prediction item ${qNum}"`,
        `"Option D rationale for prediction item ${qNum}"`,
        `"${correctChoice}"`,
        `"Detailed answer explanation for prediction item ${qNum} covering BACB A-1 principles."`,
        `"Clinical Rationale: Prediction is a core level of scientific understanding in ABA."`,
        `"BACB 6th Edition Test Content Outline Item A-1"`,
        `"Exam Tip: Look for stable baseline responding before making predictions."`,
        `"Common Mistake: Confusing prediction with experimental control."`,
        `"prediction, BCBA, baseline, A-1"`,
        `"published"`,
      ].join(',');
    });

    const csvText = [headerRow, ...dataRows].join('\n');

    // Parse & Validate with 0 existing database questions
    const result = parseAndValidateCSV(csvText, [], 'BCBA');

    expect(result.totalRows).toBe(20);
    expect(result.invalidRows.length).toBe(0);
    expect(result.duplicateCount).toBe(0);
    expect(result.validRows.length).toBe(20);

    // Verify debug results
    expect(result.debugResults).toBeDefined();
    expect(result.debugResults?.length).toBe(20);
    expect(result.debugResults?.every((d) => !d.isDuplicate)).toBe(true);
    expect(result.debugResults?.every((d) => d.errors.length === 0)).toBe(true);
  });

  it('should flag column count mismatch when row length differs from header length', () => {
    const csvWithMismatch = `ID,Certification,Question Text,Option A,Option B,Option C,Option D,Correct Answer ID
"q-1","BCBA","Sample question prompt text","Opt A","Opt B","Opt C","Opt D","A"
"q-2","BCBA","Missing column row","Opt A","Opt B","Opt C","A"`;

    const result = parseAndValidateCSV(csvWithMismatch, [], 'BCBA');
    expect(result.totalRows).toBe(2);
    expect(result.invalidRows.length).toBe(1);
    expect(result.invalidRows[0].row).toBe(3);
    expect(result.invalidRows[0].errors[0]).toContain('Column count mismatch');
  });

  it('should not mark distinct questions as duplicates even if they share metadata fields', () => {
    const csvWithSharedMetadata = `ID,Task Code,Subcategory,Category,Difficulty,Question Type,Question Text,Option A,Option B,Option C,Option D,Correct Answer ID,Answer Explanation,Clinical Rationale,References
"q-10","A-1","Prediction","Measurement","hard","multiple_choice","First unique prediction question prompt?","A","B","C","D","A","Expl","Clin","Ref"
"q-20","A-1","Prediction","Measurement","hard","multiple_choice","Second unique prediction question prompt?","A","B","C","D","A","Expl","Clin","Ref"`;

    const result = parseAndValidateCSV(csvWithSharedMetadata, [], 'BCBA');
    expect(result.totalRows).toBe(2);
    expect(result.invalidRows.length).toBe(0);
    expect(result.duplicateCount).toBe(0);
    expect(result.validRows.length).toBe(2);
  });

  it('should correctly parse smart curly quotes (“... , ...”) containing commas without splitting cells', () => {
    const smartQuoteCSV = `ID,Certification,Question Text,Option A,Option B,Option C,Option D,Correct Answer ID,Answer Explanation
“q-301”,“BCBA”,“The systematic application of principles derived from the science of behavior, to improve socially significant behavior”,“Option A”,“Option B”,“Option C”,“Option D”,“A”,“Answer explanation with, commas”`;

    const parsed = parseCSV(smartQuoteCSV);
    expect(parsed.length).toBe(2);
    expect(parsed[1].length).toBe(9);
    expect(parsed[1][2]).toBe('The systematic application of principles derived from the science of behavior, to improve socially significant behavior');
    expect(parsed[1][7]).toBe('A');

    const result = parseAndValidateCSV(smartQuoteCSV, [], 'BCBA');
    expect(result.totalRows).toBe(1);
    expect(result.invalidRows.length).toBe(0);
    expect(result.validRows.length).toBe(1);
  });

  it('should trim trailing empty Excel cells so rows match header column count', () => {
    const excelTrailingCSV = `ID,Certification,Question Text,Option A,Option B,Option C,Option D,Correct Answer ID
"q-401","BCBA","What is baseline logic?","A","B","C","D","B",,,`;

    const result = parseAndValidateCSV(excelTrailingCSV, [], 'BCBA');
    expect(result.totalRows).toBe(1);
    expect(result.invalidRows.length).toBe(0);
    expect(result.validRows.length).toBe(1);
  });
});


