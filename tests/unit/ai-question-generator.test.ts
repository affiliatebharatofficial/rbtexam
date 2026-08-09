import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  validateQuestionItem,
  validateQuestionBatch,
  buildAIQuestionPrompt,
  executeAIQuestionGeneration,
  GenerationInputParams,
} from '@/lib/ai-question-generator-engine';
import { MASTER_QUESTION_BANK } from '@/lib/master-question-bank';

describe('Admin AI Question Generator Engine & 10-Point Validator', () => {
  const baseParams: GenerationInputParams = {
    topicPrompt: 'Differential Reinforcement of Alternative Behavior (DRA)',
    certification: 'RBT',
    category: 'Behavior Reduction',
    difficulty: 'medium',
    count: 3,
    bacbTaskCode: 'D-04',
    provider: 'auto',
  };

  const validRawItem = {
    question: 'When implementing a DRA procedure for a student who shouts out in class to gain attention, which response should the RBT reinforce?',
    scenarioText: 'An RBT is assigned to a classroom setting where a student frequently shouts out answers.',
    options: [
      { id: 'A', text: 'Quietly raising a hand and waiting to be called on', explanation: 'Correct. Raising hand is the functional alternative behavior.' },
      { id: 'B', text: 'Shouting out the correct answer more quietly', explanation: 'Incorrect. Shouting is still the target problem behavior.' },
      { id: 'C', text: 'Leaving the classroom without permission', explanation: 'Incorrect. Non-functional alternative.' },
      { id: 'D', text: 'Ignoring the teacher for 10 minutes', explanation: 'Incorrect. Non-functional alternative.' },
    ],
    correctAnswerId: 'A',
    answerExplanation: 'DRA involves reinforcing a specific functional alternative behavior while withholding reinforcement for the problem behavior.',
    clinicalExplanation: 'Under BACB Task Item D-04, raising a hand serves the same attention function as shouting out, replacing it appropriately.',
    references: 'BACB RBT 3rd Edition TCO Item D-04',
    category: 'Behavior Reduction',
    difficulty: 'medium',
  };

  it('1. validateQuestionItem passes for a completely valid AI generated question', () => {
    const res = validateQuestionItem(validRawItem, baseParams, 0);
    expect(res.isValid).toBe(true);
    expect(res.errors.length).toBe(0);
    expect(res.question?.question).toContain('DRA procedure');
    expect(res.question?.options?.length).toBe(4);
    expect(res.question?.correctAnswerId).toBe('A');
  });

  it('2. validateQuestionItem fails when question stem is missing or too short', () => {
    const invalidItem = { ...validRawItem, question: 'Short stem' };
    const res = validateQuestionItem(invalidItem, baseParams, 0);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('Question stem text is missing or shorter than 15 characters'))).toBe(true);
  });

  it('3. validateQuestionItem fails when option count is not exactly 4', () => {
    const invalidItem = {
      ...validRawItem,
      options: [
        { id: 'A', text: 'Option A' },
        { id: 'B', text: 'Option B' },
        { id: 'C', text: 'Option C' },
      ],
    };
    const res = validateQuestionItem(invalidItem, baseParams, 0);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('EXACTLY 4 distractor options'))).toBe(true);
  });

  it('4. validateQuestionItem fails when duplicate options exist in a question', () => {
    const invalidItem = {
      ...validRawItem,
      options: [
        { id: 'A', text: 'Identical option choice' },
        { id: 'B', text: 'Identical Option Choice' },
        { id: 'C', text: 'Option C unique text' },
        { id: 'D', text: 'Option D unique text' },
      ],
    };
    const res = validateQuestionItem(invalidItem, baseParams, 0);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('Duplicate option text detected'))).toBe(true);
  });

  it('5. validateQuestionItem fails when correctAnswerId is invalid', () => {
    const invalidItem = { ...validRawItem, correctAnswerId: 'Z' };
    const res = validateQuestionItem(invalidItem, baseParams, 0);
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes("Correct answer ID 'Z' is invalid"))).toBe(true);
  });

  it('6. validateQuestionBatch filters invalid items and detects duplicate question stems', () => {
    const batch = [
      validRawItem,
      { ...validRawItem, question: 'Short' }, // Invalid
      validRawItem, // Duplicate stem
    ];

    const res = validateQuestionBatch(batch, baseParams);
    expect(res.validQuestions.length).toBe(1);
    expect(res.invalidCount).toBe(2);
    expect(res.allErrors.some((e) => e.includes('Duplicate question stem detected'))).toBe(true);
  });

  it('7. buildAIQuestionPrompt constructs structured JSON instructions', () => {
    const prompt = buildAIQuestionPrompt(baseParams);
    expect(prompt).toContain('Senior BCBA Exam Item Writer');
    expect(prompt).toContain('Differential Reinforcement of Alternative Behavior (DRA)');
    expect(prompt).toContain('"questions":');
    expect(prompt).toContain('"correctAnswerId": "B"');
  });

  it('8. executeAIQuestionGeneration returns EXPLICIT ERROR when no valid API keys are configured (Zero Mock Guarantee)', async () => {
    // Save original env keys
    const origOpenAI = process.env.OPENAI_API_KEY;
    const origGemini = process.env.GEMINI_API_KEY;
    const origDeepSeek = process.env.DEEPSEEK_API_KEY;
    const origAnthropic = process.env.ANTHROPIC_API_KEY;
    const origOpenRouter = process.env.OPENROUTER_API_KEY;

    // Clear keys
    delete process.env.OPENAI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.DEEPSEEK_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.OPENROUTER_API_KEY;

    const res = await executeAIQuestionGeneration({
      ...baseParams,
      provider: 'openai',
      apiKey: '',
    });

    // Restore keys
    process.env.OPENAI_API_KEY = origOpenAI;
    process.env.GEMINI_API_KEY = origGemini;
    process.env.DEEPSEEK_API_KEY = origDeepSeek;
    process.env.ANTHROPIC_API_KEY = origAnthropic;
    process.env.OPENROUTER_API_KEY = origOpenRouter;

    expect(res.success).toBe(false);
    expect(res.questions.length).toBe(0);
    expect(res.error).toContain('AI Generation Failed: No valid API keys are configured');
  });

  it('9. executeAIQuestionGeneration handles API mock/successful generation flow cleanly', async () => {
    // Mock global fetch for OpenAI call
    const mockOpenAIResponse = {
      questions: [validRawItem],
    };

    const mockPayload = {
      choices: [
        {
          message: {
            content: JSON.stringify(mockOpenAIResponse),
          },
        },
      ],
      usage: { prompt_tokens: 150, completion_tokens: 250 },
    };

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockPayload,
      text: async () => JSON.stringify(mockPayload),
    } as Response);

    const res = await executeAIQuestionGeneration({
      ...baseParams,
      provider: 'openai',
      apiKey: 'sk-test-valid-key-12345',
    });

    global.fetch = originalFetch;

    expect(res.success).toBe(true);
    expect(res.providerUsed).toBe('OPENAI');
    expect(res.validatedCount).toBe(1);
    expect(res.insertedCount).toBe(1);
    expect(res.insertedIds.length).toBe(1);
    expect(res.questions[0].question).toContain('DRA procedure');
    expect(MASTER_QUESTION_BANK.some((q) => q.id === res.insertedIds[0])).toBe(true);
  });
});
