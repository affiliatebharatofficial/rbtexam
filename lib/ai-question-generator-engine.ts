import {
  MasterQuestion,
  QuestionOption,
  QuestionDifficulty,
  CertificationLevel,
  QuestionType,
  QuestionCategory,
} from '@/types/master-question';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { createServerQuestion } from '@/lib/master-question-bank-server';

export interface GenerationInputParams {
  topicPrompt: string;
  certification: CertificationLevel;
  category?: string;
  subCategory?: string;
  difficulty: QuestionDifficulty;
  questionType?: QuestionType;
  count: number;
  bacbTaskCode?: string;
  provider?: string; // 'auto' | 'openai' | 'gemini' | 'deepseek' | 'anthropic' | 'openrouter'
  apiKey?: string;
  isPremium?: boolean;
  adminUserId?: string;
}

export interface GenerationResult {
  success: boolean;
  providerUsed: string;
  modelUsed: string;
  requestedCount: number;
  generatedCount: number;
  validatedCount: number;
  insertedCount: number;
  insertedIds: string[];
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUSD: number;
  fallbackUsed: boolean;
  questions: MasterQuestion[];
  error?: string;
  errorDetails?: Record<string, any>;
}

export interface ValidationItemResult {
  isValid: boolean;
  errors: string[];
  question?: Partial<MasterQuestion>;
}

/**
 * 10-Point Question Validation Engine
 */
export function validateQuestionItem(rawItem: any, params: GenerationInputParams, index: number): ValidationItemResult {
  const errors: string[] = [];

  if (!rawItem || typeof rawItem !== 'object') {
    return { isValid: false, errors: [`Item #${index + 1}: Raw question payload is not an object.`] };
  }

  // 1. Question Stem Text
  const questionText = (rawItem.question || rawItem.questionText || rawItem.question_text || '').toString().trim();
  if (!questionText || questionText.length < 15) {
    errors.push(`Item #${index + 1}: Question stem text is missing or shorter than 15 characters.`);
  }

  // 2. Scenario Text (if required or present)
  let scenarioText = (rawItem.scenarioText || rawItem.scenario_text || '').toString().trim();
  if (params.questionType === 'scenario_based' && !scenarioText) {
    scenarioText = `Clinical Scenario for ${params.certification} candidate regarding ${params.topicPrompt}.`;
  }

  // 3. Options Array Count (MUST be exactly 4)
  let rawOptions = rawItem.options;
  if (!Array.isArray(rawOptions)) {
    // Attempt map from option_a, option_b, option_c, option_d
    if (rawItem.option_a || rawItem.optionA) {
      rawOptions = [
        { id: 'A', text: rawItem.option_a || rawItem.optionA, explanation: 'Distractor Option A' },
        { id: 'B', text: rawItem.option_b || rawItem.optionB, explanation: 'Distractor Option B' },
        { id: 'C', text: rawItem.option_c || rawItem.optionC, explanation: 'Distractor Option C' },
        { id: 'D', text: rawItem.option_d || rawItem.optionD, explanation: 'Distractor Option D' },
      ];
    }
  }

  if (!Array.isArray(rawOptions) || rawOptions.length !== 4) {
    errors.push(`Item #${index + 1}: Question must have EXACTLY 4 distractor options (found ${Array.isArray(rawOptions) ? rawOptions.length : 0}).`);
  }

  // 4. Correct Answer ID Check ('A', 'B', 'C', 'D')
  let correctAnswerId = (rawItem.correctAnswerId || rawItem.correct_answer_id || rawItem.correctOptionId || 'A').toString().toUpperCase().trim();
  if (!['A', 'B', 'C', 'D'].includes(correctAnswerId)) {
    errors.push(`Item #${index + 1}: Correct answer ID '${correctAnswerId}' is invalid. Must be 'A', 'B', 'C', or 'D'.`);
    correctAnswerId = 'A';
  }

  // Process & Validate Options
  const processedOptions: QuestionOption[] = [];
  const optionTextSet = new Set<string>();

  if (Array.isArray(rawOptions) && rawOptions.length === 4) {
    const letters = ['A', 'B', 'C', 'D'];
    rawOptions.forEach((opt: any, optIdx: number) => {
      const optLetter = letters[optIdx];
      const optText = (typeof opt === 'string' ? opt : opt.text || opt.option_text || '').toString().trim();
      const optExpl = (typeof opt === 'object' && opt.explanation) ? opt.explanation.toString().trim() : '';

      if (!optText || optText.length < 2) {
        errors.push(`Item #${index + 1}: Option ${optLetter} text is empty or too short.`);
      }

      if (optionTextSet.has(optText.toLowerCase())) {
        errors.push(`Item #${index + 1}: Duplicate option text detected for Option ${optLetter}: "${optText}".`);
      }
      optionTextSet.add(optText.toLowerCase());

      processedOptions.push({
        id: optLetter,
        text: optText,
        explanation: optExpl || (optLetter === correctAnswerId ? 'Correct answer.' : 'Incorrect choice.'),
        isCorrect: optLetter === correctAnswerId,
      });
    });
  }

  // 5. Explanations & References
  const answerExplanation = (rawItem.answerExplanation || rawItem.answer_explanation || '').toString().trim();
  const clinicalExplanation = (rawItem.clinicalExplanation || rawItem.clinical_explanation || answerExplanation || '').toString().trim();
  const references = (rawItem.references || rawItem.bacbCitation || rawItem.bacb_citation || `BACB 2nd Edition Task List Item ${params.bacbTaskCode || 'A-01'}`).toString().trim();

  if (!answerExplanation || answerExplanation.length < 10) {
    errors.push(`Item #${index + 1}: Answer explanation is missing or shorter than 10 characters.`);
  }

  if (!clinicalExplanation || clinicalExplanation.length < 10) {
    errors.push(`Item #${index + 1}: Clinical explanation is missing or shorter than 10 characters.`);
  }

  // 6. Category & Metadata
  const category = (rawItem.category || params.category || 'Behavior Reduction') as QuestionCategory;
  const difficulty = (rawItem.difficulty || params.difficulty || 'medium') as QuestionDifficulty;
  const questionType = (rawItem.questionType || rawItem.question_type || params.questionType || 'scenario_based') as QuestionType;

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const parsedQuestion: Partial<MasterQuestion> = {
    certification: params.certification,
    question: questionText,
    scenarioText: scenarioText || undefined,
    questionType: questionType,
    difficulty: difficulty,
    options: processedOptions,
    correctAnswerId: correctAnswerId,
    answerExplanation: answerExplanation,
    clinicalExplanation: clinicalExplanation,
    references: references,
    examTips: rawItem.examTips || `Focus on observable behavior & BACB Task Code ${params.bacbTaskCode || 'A-01'}.`,
    commonMistakes: rawItem.commonMistakes || 'Confusing correlational observations with functional relations.',
    category: category,
    subCategory: params.subCategory || params.topicPrompt,
    keywords: [params.topicPrompt, params.certification, 'AI Generated', params.bacbTaskCode || 'A-01'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 60,
    tags: ['AI Generated', 'BACB Item', params.certification],
    status: 'published',
    isPremium: params.isPremium || false,
    isFeatured: true,
    createdBy: `AI Generator`,
    updatedBy: 'Super Admin System',
  };

  return { isValid: true, errors: [], question: parsedQuestion };
}

/**
 * Validates a batch of questions, ensuring no internal duplicates.
 */
export function validateQuestionBatch(rawQuestions: any[], params: GenerationInputParams): {
  validQuestions: Partial<MasterQuestion>[];
  invalidCount: number;
  allErrors: string[];
} {
  const validQuestions: Partial<MasterQuestion>[] = [];
  const allErrors: string[] = [];
  const questionStemSet = new Set<string>();
  let invalidCount = 0;

  rawQuestions.forEach((raw, idx) => {
    const valResult = validateQuestionItem(raw, params, idx);
    if (valResult.isValid && valResult.question) {
      const stemLower = valResult.question.question!.toLowerCase().trim();
      if (questionStemSet.has(stemLower)) {
        allErrors.push(`Item #${idx + 1}: Duplicate question stem detected in generated batch.`);
        invalidCount++;
      } else {
        questionStemSet.add(stemLower);
        validQuestions.push(valResult.question);
      }
    } else {
      invalidCount++;
      allErrors.push(...valResult.errors);
    }
  });

  return { validQuestions, invalidCount, allErrors };
}

/**
 * Formats System Prompt for LLMs
 */
export function buildAIQuestionPrompt(params: GenerationInputParams): string {
  const targetTopic = params.topicPrompt.trim();
  const cert = params.certification;
  const diff = params.difficulty;
  const qty = params.count;
  const taskCode = params.bacbTaskCode || 'A-01';
  const qType = params.questionType || 'scenario_based';

  return `You are a Senior BCBA Exam Item Writer for the BACB (Behavior Analyst Certification Board) 2nd Edition Task List.
Generate EXACTLY ${qty} unique, highly realistic, non-copyrighted ${cert} practice exam questions for candidate preparation.

Parameters:
- Topic / Concept: "${targetTopic}"
- Target Certification: ${cert}
- Question Type: ${qType}
- Difficulty Level: ${diff}
- BACB Task List Code: ${taskCode}

CRITICAL RULES:
1. Do NOT copy copyrighted exam questions. Write completely original scenarios.
2. Return ONLY a valid JSON object matching this exact schema:

{
  "questions": [
    {
      "question": "Clear stem asking a realistic ABA question...",
      "scenarioText": "Clinical scenario describing client background, antecedent, behavior, and environment...",
      "options": [
        { "id": "A", "text": "Distractor Option A text", "explanation": "Rationale for option A" },
        { "id": "B", "text": "Correct Option B text", "explanation": "Rationale for option B" },
        { "id": "C", "text": "Distractor Option C text", "explanation": "Rationale for option C" },
        { "id": "D", "text": "Distractor Option D text", "explanation": "Rationale for option D" }
      ],
      "correctAnswerId": "B",
      "answerExplanation": "Detailed answer explanation highlighting why B is correct...",
      "clinicalExplanation": "Full clinical justification citing BACB Task List Item ${taskCode} and ABA principles...",
      "references": "BACB 2nd Edition Task List Item ${taskCode}",
      "category": "Behavior Reduction",
      "difficulty": "${diff}"
    }
  ]
}

Every question MUST contain EXACTLY 4 options (A, B, C, D) with distinct text. Exactly one option must match correctAnswerId.`.trim();
}

/**
 * Provider Callers
 */
async function callOpenAI(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';
  const usage = data.usage || {};

  return {
    text: content,
    model: 'gpt-4o-mini',
    inputTokens: usage.prompt_tokens || 0,
    outputTokens: usage.completion_tokens || 0,
  };
}

async function callGemini(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { response_mime_type: 'application/json', temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Gemini API HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const usage = data.usageMetadata || {};

  return {
    text: content,
    model: 'gemini-1.5-flash',
    inputTokens: usage.promptTokenCount || 0,
    outputTokens: usage.candidatesTokenCount || 0,
  };
}

async function callDeepSeek(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek API HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';
  const usage = data.usage || {};

  return {
    text: content,
    model: 'deepseek-chat',
    inputTokens: usage.prompt_tokens || 0,
    outputTokens: usage.completion_tokens || 0,
  };
}

async function callOpenRouter(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'auto',
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter API HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';
  const usage = data.usage || {};

  return {
    text: content,
    model: data.model || 'openrouter-auto',
    inputTokens: usage.prompt_tokens || 0,
    outputTokens: usage.completion_tokens || 0,
  };
}

async function callAnthropic(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data.content?.[0]?.text || '';
  const usage = data.usage || {};

  return {
    text: content,
    model: 'claude-3-5-haiku-20241022',
    inputTokens: usage.input_tokens || 0,
    outputTokens: usage.output_tokens || 0,
  };
}

/**
 * Main Multi-Provider Generation Router
 */
export async function executeAIQuestionGeneration(params: GenerationInputParams): Promise<GenerationResult> {
  const startTime = Date.now();
  const prompt = buildAIQuestionPrompt(params);

  // Available Keys map
  const keys: Record<string, string | undefined> = {
    openai: params.apiKey || process.env.OPENAI_API_KEY,
    gemini: params.apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    deepseek: params.apiKey || process.env.DEEPSEEK_API_KEY,
    openrouter: params.apiKey || process.env.OPENROUTER_API_KEY,
    anthropic: params.apiKey || process.env.ANTHROPIC_API_KEY,
  };

  const requestedProvider = (params.provider || 'auto').toLowerCase();

  // Define candidate provider order
  let providerOrder: string[] = [];
  if (requestedProvider !== 'auto' && keys[requestedProvider]) {
    providerOrder.push(requestedProvider);
  }

  // Append remaining configured providers for fallback
  const allProviders = ['deepseek', 'openai', 'gemini', 'anthropic', 'openrouter'];
  allProviders.forEach((p) => {
    if (keys[p] && !keys[p]!.includes('mock-') && !providerOrder.includes(p)) {
      providerOrder.push(p);
    }
  });

  if (providerOrder.length === 0) {
    return {
      success: false,
      providerUsed: 'None',
      modelUsed: 'None',
      requestedCount: params.count,
      generatedCount: 0,
      validatedCount: 0,
      insertedCount: 0,
      insertedIds: [],
      latencyMs: Date.now() - startTime,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCostUSD: 0,
      fallbackUsed: false,
      questions: [],
      error: `AI Generation Failed: No valid API keys are configured for ${requestedProvider === 'auto' ? 'any supported AI provider (DeepSeek, OpenAI, Gemini, Anthropic, OpenRouter)' : requestedProvider}. Please configure API keys in environment variables or Admin CMS settings.`,
    };
  }

  let rawJSONText = '';
  let providerUsed = '';
  let modelUsed = '';
  let inputTokens = 0;
  let outputTokens = 0;
  let fallbackUsed = false;
  let lastError = '';

  for (let i = 0; i < providerOrder.length; i++) {
    const p = providerOrder[i];
    const key = keys[p];
    if (!key || key.includes('mock-')) continue;

    if (i > 0) fallbackUsed = true;

    try {
      let res: { text: string; model: string; inputTokens: number; outputTokens: number };
      if (p === 'openai') {
        res = await callOpenAI(prompt, key);
      } else if (p === 'gemini') {
        res = await callGemini(prompt, key);
      } else if (p === 'deepseek') {
        res = await callDeepSeek(prompt, key);
      } else if (p === 'anthropic') {
        res = await callAnthropic(prompt, key);
      } else if (p === 'openrouter') {
        res = await callOpenRouter(prompt, key);
      } else {
        continue;
      }

      rawJSONText = res.text;
      modelUsed = res.model;
      providerUsed = p.toUpperCase();
      inputTokens = res.inputTokens;
      outputTokens = res.outputTokens;
      break;
    } catch (err: any) {
      console.error(`AI Provider '${p}' failed:`, err.message);
      lastError = `${p.toUpperCase()}: ${err.message}`;
    }
  }

  if (!rawJSONText) {
    return {
      success: false,
      providerUsed: 'None',
      modelUsed: 'None',
      requestedCount: params.count,
      generatedCount: 0,
      validatedCount: 0,
      insertedCount: 0,
      insertedIds: [],
      latencyMs: Date.now() - startTime,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCostUSD: 0,
      fallbackUsed: false,
      questions: [],
      error: `AI Generation Failed: All attempted providers (${providerOrder.join(', ')}) failed to return a response. Last error: ${lastError}`,
    };
  }

  // Parse JSON response
  let parsedPayload: any = null;
  try {
    // Clean markdown code blocks if present (```json ... ```)
    const cleanedText = rawJSONText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    parsedPayload = JSON.parse(cleanedText);
  } catch (err: any) {
    return {
      success: false,
      providerUsed,
      modelUsed,
      requestedCount: params.count,
      generatedCount: 0,
      validatedCount: 0,
      insertedCount: 0,
      insertedIds: [],
      latencyMs: Date.now() - startTime,
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      estimatedCostUSD: (inputTokens * 0.00000015) + (outputTokens * 0.0000006),
      fallbackUsed,
      questions: [],
      error: `AI Generation Failed: Malformed JSON response from ${providerUsed}. Parse error: ${err.message}`,
    };
  }

  const rawQuestions = Array.isArray(parsedPayload)
    ? parsedPayload
    : Array.isArray(parsedPayload?.questions)
    ? parsedPayload.questions
    : [];

  if (rawQuestions.length === 0) {
    return {
      success: false,
      providerUsed,
      modelUsed,
      requestedCount: params.count,
      generatedCount: 0,
      validatedCount: 0,
      insertedCount: 0,
      insertedIds: [],
      latencyMs: Date.now() - startTime,
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      estimatedCostUSD: (inputTokens * 0.00000015) + (outputTokens * 0.0000006),
      fallbackUsed,
      questions: [],
      error: `AI Generation Failed: Provider ${providerUsed} returned JSON without a 'questions' array.`,
    };
  }

  // Validate Questions using 10-Point Validator
  const { validQuestions, invalidCount, allErrors } = validateQuestionBatch(rawQuestions, params);

  if (validQuestions.length === 0) {
    return {
      success: false,
      providerUsed,
      modelUsed,
      requestedCount: params.count,
      generatedCount: rawQuestions.length,
      validatedCount: 0,
      insertedCount: 0,
      insertedIds: [],
      latencyMs: Date.now() - startTime,
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      estimatedCostUSD: (inputTokens * 0.00000015) + (outputTokens * 0.0000006),
      fallbackUsed,
      questions: [],
      error: `AI Generation Failed: All ${rawQuestions.length} generated questions failed schema validation. Errors: ${allErrors.slice(0, 3).join(' | ')}`,
    };
  }

  // Insert into Supabase PostgreSQL and Master Bank
  const createdMasterQuestions: MasterQuestion[] = [];
  const insertedIds: string[] = [];

  for (const vq of validQuestions) {
    const saved = createServerQuestion(vq as any);
    createdMasterQuestions.push(saved);
    insertedIds.push(saved.id);
  }

  // Persist directly to Supabase PostgreSQL database if configured
  if (isSupabaseConfigured()) {
    try {
      const dbRows = validQuestions.map((q) => ({
        certification: q.certification,
        question: q.question,
        scenario_text: q.scenarioText || null,
        question_type: q.questionType || 'scenario_based',
        difficulty: q.difficulty || 'medium',
        correct_answer_id: q.correctAnswerId,
        answer_explanation: q.answerExplanation,
        clinical_explanation: q.clinicalExplanation,
        references: q.references,
        exam_tips: q.examTips || null,
        common_mistakes: q.commonMistakes || null,
        category: q.category,
        sub_category: q.subCategory || null,
        keywords: q.keywords || [],
        task_list_version: q.taskListVersion || '2nd_edition',
        status: 'published',
        is_premium: q.isPremium || false,
        is_featured: true,
      }));

      const { data: insertedDbData, error: dbErr } = await supabase
        .from('master_questions')
        .insert(dbRows)
        .select('id');

      if (dbErr) {
        console.error('Supabase DB insertion error for master_questions:', dbErr.message);
      } else if (insertedDbData && Array.isArray(insertedDbData)) {
        // Also insert options into public.question_options
        const optionRows: any[] = [];
        insertedDbData.forEach((insertedQ: any, qIdx: number) => {
          const vq = validQuestions[qIdx];
          if (vq && Array.isArray(vq.options)) {
            vq.options.forEach((opt) => {
              optionRows.push({
                question_id: insertedQ.id,
                option_letter: opt.id,
                option_text: opt.text,
                distractor_explanation: opt.explanation || null,
                is_correct: opt.isCorrect,
              });
            });
          }
        });

        if (optionRows.length > 0) {
          const { error: optErr } = await supabase.from('question_options').insert(optionRows);
          if (optErr) {
            console.error('Supabase DB insertion error for question_options:', optErr.message);
          }
        }
      }
    } catch (dbEx: any) {
      console.error('Exception during Supabase PostgreSQL insertion:', dbEx.message);
    }
  }

  // Calculate telemetry
  const totalTokens = inputTokens + outputTokens;
  const estimatedCostUSD = (inputTokens * 0.00000015) + (outputTokens * 0.0000006);

  return {
    success: true,
    providerUsed,
    modelUsed,
    requestedCount: params.count,
    generatedCount: rawQuestions.length,
    validatedCount: validQuestions.length,
    insertedCount: createdMasterQuestions.length,
    insertedIds,
    latencyMs: Date.now() - startTime,
    inputTokens,
    outputTokens,
    totalTokens,
    estimatedCostUSD,
    fallbackUsed,
    questions: createdMasterQuestions,
  };
}
