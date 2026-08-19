import {
  Flashcard,
  CertificationLevel,
  FlashcardCategory,
  FlashcardType,
} from '@/types/flashcard';
import { supabase, getSupabaseAdminClient, isSupabaseConfigured, getRuntimeEnv } from '@/lib/supabase';
import { addCustomFlashcard } from '@/lib/flashcard-bank';

export interface FlashcardGenerationInputParams {
  topic: string;
  certification: CertificationLevel;
  category?: FlashcardCategory;
  subtopic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  count: number; // Total requested cards
  provider?: string; // 'auto' | 'openai' | 'gemini' | 'deepseek' | 'anthropic' | 'openrouter'
  apiKey?: string; // Optional user key override
  language?: string;
  isPremium?: boolean;
  sourceContext?: string;
  adminUserId?: string;
}

export interface FlashcardBatchTelemetry {
  batchIndex: number;
  totalBatches: number;
  requestedCount: number;
  generatedCount: number;
  validatedCount: number;
  insertedCount: number;
  duplicateCount: number;
  providerUsed: string;
  modelUsed: string;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUSD: number;
  retryCount: number;
  status: 'success' | 'partial' | 'failed';
  error?: string;
}

export interface FlashcardGenerationResult {
  success: boolean;
  providerUsed: string;
  modelUsed: string;
  requestedCount: number;
  generatedCount: number;
  validatedCount: number;
  insertedCount: number;
  duplicateCount: number;
  insertedIds: string[];
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUSD: number;
  fallbackUsed: boolean;
  batchCount: number;
  failedBatchesCount: number;
  retriesCount: number;
  batches: FlashcardBatchTelemetry[];
  flashcards: Flashcard[];
  error?: string;
  errorDetails?: Record<string, any>;
}

// Map provider name to model
const PROVIDER_MODEL_MAP: Record<string, string> = {
  openai: 'gpt-4o-mini',
  gemini: 'gemini-1.5-flash',
  deepseek: 'deepseek-chat',
  anthropic: 'claude-3-5-haiku-20241022',
  openrouter: 'auto',
};

// Map estimated costs per 1K tokens
const TOKEN_COST_RATES: Record<string, { input: number; output: number }> = {
  openai: { input: 0.00015, output: 0.0006 },
  gemini: { input: 0.000075, output: 0.0003 },
  deepseek: { input: 0.00014, output: 0.00028 },
  anthropic: { input: 0.00025, output: 0.00125 },
  openrouter: { input: 0.00015, output: 0.0006 },
};

/**
 * 1. AI API Callers for supported providers
 */
async function callOpenAI(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: PROVIDER_MODEL_MAP.openai,
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API HTTP ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as any;
  const content = data?.choices?.[0]?.message?.content || '';
  const usage = data?.usage || {};

  return {
    text: content,
    model: PROVIDER_MODEL_MAP.openai,
    inputTokens: usage.prompt_tokens || 0,
    outputTokens: usage.completion_tokens || 0,
  };
}

async function callGemini(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDER_MODEL_MAP.gemini}:generateContent?key=${apiKey}`;
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

  const data = (await res.json()) as any;
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const usage = data?.usageMetadata || {};

  return {
    text: content,
    model: PROVIDER_MODEL_MAP.gemini,
    inputTokens: usage.promptTokenCount || 0,
    outputTokens: usage.candidatesTokenCount || 0,
  };
}

async function callDeepSeek(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: PROVIDER_MODEL_MAP.deepseek,
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek API HTTP ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as any;
  const content = data?.choices?.[0]?.message?.content || '';
  const usage = data?.usage || {};

  return {
    text: content,
    model: PROVIDER_MODEL_MAP.deepseek,
    inputTokens: usage.prompt_tokens || 0,
    outputTokens: usage.completion_tokens || 0,
  };
}

async function callOpenRouter(prompt: string, apiKey: string): Promise<{ text: string; model: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
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

  const data = (await res.json()) as any;
  const content = data?.choices?.[0]?.message?.content || '';
  const usage = data?.usage || {};

  return {
    text: content,
    model: data?.model || 'openrouter-auto',
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
      model: PROVIDER_MODEL_MAP.anthropic,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Anthropic API HTTP ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as any;
  const content = data?.content?.[0]?.text || '';
  const usage = data?.usage || {};

  return {
    text: content,
    model: PROVIDER_MODEL_MAP.anthropic,
    inputTokens: usage.input_tokens || 0,
    outputTokens: usage.output_tokens || 0,
  };
}

/**
 * 2. System Prompt Builder for High-Yield ABA Flashcards
 */
export function buildAIFlashcardPrompt(params: FlashcardGenerationInputParams, batchCount: number, isRetry = false): string {
  const language = params.language || 'English';
  const category = params.category || 'Measurement';
  const subtopic = params.subtopic ? ` (Subtopic: ${params.subtopic})` : '';
  const difficulty = params.difficulty || 'medium';

  const strictNote = isRetry
    ? '\nCRITICAL INSTRUCTION FOR RETRY: Your previous response was invalid. You MUST output strict valid JSON ONLY. Do NOT add any extra markdown text outside the JSON.'
    : '';

  return `You are an expert Board Certified Behavior Analyst (BCBA) exam developer.
Your job is to generate exactly ${batchCount} high-yield flashcards in ${language} for candidates preparing for the BACB certification exam (${params.certification} level).

TARGET ABA TOPIC: "${params.topic}"${subtopic}
CERTIFICATION: ${params.certification}
CATEGORY: ${category}
DIFFICULTY LEVEL: ${difficulty}
${params.sourceContext ? `SOURCE CONTEXT: ${params.sourceContext}` : ''}

You MUST return a JSON object with a single root key "flashcards" containing an array of exactly ${batchCount} objects.

JSON STRUCTURE REQUIRED:
{
  "flashcards": [
    {
      "front": "Clear, concise question or prompt defining a core concept, scenario, or procedure related to ${params.topic}.",
      "back": "Accurate, authoritative answer explaining the exact concept according to the BACB Task List.",
      "explanation": "Detailed theoretical explanation of why this concept matters in Applied Behavior Analysis.",
      "clinicalExplanation": "Practical ABA clinical implementation guidance during sessions or trial data logging.",
      "category": "${category}",
      "topic": "${params.topic}",
      "subtopic": "${params.subtopic || params.topic}",
      "difficulty": "${difficulty}",
      "certification": "${params.certification}",
      "keywords": ["tag1", "tag2", "tag3"],
      "memory_tip": "A memorable trick, acronym, or mnemonic to help candidates recall this on exam day.",
      "source": "BACB Task List Standard"
    }
  ]
}

RULES:
1. Every flashcard must have non-empty "front", "back", and "explanation".
2. "difficulty" must be exactly "easy", "medium", or "hard".
3. "certification" must be exactly "${params.certification}".
4. Output NOTHING except valid JSON.${strictNote}`;
}

/**
 * 3. JSON Parser & Sanitizer
 */
export function parseAIFlashcardsJSON(rawText: string): any[] {
  if (!rawText || typeof rawText !== 'string') return [];

  // Strip markdown code fences (```json ... ``` or ``` ...)
  let cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

  // If there's extra text around JSON, attempt to slice between first '{' and last '}'
  const startIdx = cleaned.indexOf('{');
  const endIdx = cleaned.lastIndexOf('}');
  if (startIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && Array.isArray(parsed.flashcards)) {
      return parsed.flashcards;
    }
    if (parsed && Array.isArray(parsed.cards)) {
      return parsed.cards;
    }
    if (parsed && typeof parsed === 'object') {
      // Find any array property inside parsed
      for (const key of Object.keys(parsed)) {
        if (Array.isArray(parsed[key])) {
          return parsed[key];
        }
      }
    }
  } catch (err: any) {
    console.error('Failed to parse AI JSON response:', err.message);
  }

  return [];
}

/**
 * 4. Text Normalizer & Concept Duplicate Detection
 */
export function normalizeConceptText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/^what is /i, '')
    .replace(/^define /i, '')
    .replace(/^explain /i, '')
    .replace(/^how is /i, '')
    .replace(/^what does /i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export function isDuplicateFlashcard(candidate: { front: string; back: string }, existingCards: Array<{ front: string; back: string }>): boolean {
  const normFront = normalizeConceptText(candidate.front);
  const normBack = normalizeConceptText(candidate.back);

  if (!normFront) return false;

  for (const card of existingCards) {
    const existFront = normalizeConceptText(card.front);

    if (normFront === existFront) {
      return true;
    }
    if (normFront.length > 10 && existFront.includes(normFront)) {
      return true;
    }
    if (existFront.length > 10 && normFront.includes(existFront)) {
      return true;
    }
  }

  return false;
}

/**
 * 5. 10-Point Flashcard Schema Validation
 */
export function validateFlashcardItem(rawItem: any, params: FlashcardGenerationInputParams): { isValid: boolean; errors: string[]; card?: Partial<Flashcard> } {
  const errors: string[] = [];

  if (!rawItem || typeof rawItem !== 'object') {
    return { isValid: false, errors: ['Item is not an object'] };
  }

  const front = rawItem.front !== undefined ? String(rawItem.front).trim() : (rawItem.title || rawItem.question || '').toString().trim();
  const back = rawItem.back !== undefined ? String(rawItem.back).trim() : (rawItem.answer || rawItem.definition || '').toString().trim();
  const explanation = rawItem.explanation !== undefined ? String(rawItem.explanation).trim() : (rawItem.rationale || rawItem.back || '').toString().trim();
  const clinicalExplanation = (rawItem.clinicalExplanation || rawItem.clinical_explanation || explanation).toString().trim();
  const memoryTip = (rawItem.memory_tip || rawItem.memoryTip || '').toString().trim();
  const source = (rawItem.source || rawItem.reference || 'BACB Task List Standard').toString().trim();

  if (!front) errors.push('Front prompt is empty');
  if (!back) errors.push('Back answer is empty');
  if (!explanation) errors.push('Explanation is empty');

  const validDiffs = ['easy', 'medium', 'hard'];
  const rawDiff = (rawItem.difficulty || params.difficulty || 'medium').toString().toLowerCase();
  const difficulty = validDiffs.includes(rawDiff) ? (rawDiff as 'easy' | 'medium' | 'hard') : 'medium';

  const validCerts: CertificationLevel[] = ['RBT', 'BCaBA', 'BCBA'];
  const rawCert = (rawItem.certification || params.certification || 'RBT').toString().toUpperCase();
  const certification = validCerts.includes(rawCert as any) ? (rawCert as CertificationLevel) : 'RBT';

  const category = (rawItem.category || params.category || 'Measurement').toString() as FlashcardCategory;
  const subcategory = (rawItem.subtopic || rawItem.subcategory || params.subtopic || params.topic).toString();

  let keywords: string[] = Array.isArray(rawItem.keywords) ? rawItem.keywords.map((k: any) => String(k).trim()) : [];
  if (keywords.length === 0) {
    keywords = [params.topic, certification, category];
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const validatedCard: Partial<Flashcard> = {
    title: `${params.topic}: ${front.slice(0, 50)}`,
    front,
    back,
    cardType: 'ai_generated',
    explanation,
    clinicalExplanation,
    memoryTip: memoryTip || `Mnemonic: Focus on ${params.topic} principles.`,
    realLifeExample: rawItem.realLifeExample || `Clinical ABA application of ${params.topic}.`,
    commonMistakes: rawItem.commonMistakes || `Confusing ${params.topic} with adjacent task list items.`,
    reference: source,
    certification,
    category,
    subcategory,
    difficulty,
    keywords,
    tags: ['AI Generated', certification, category],
    status: 'published',
    isPremium: params.isPremium || false,
    isFeatured: true,
    createdBy: params.adminUserId || 'ai_flashcard_engine',
    updatedBy: params.adminUserId || 'ai_flashcard_engine',
  };

  return { isValid: true, errors: [], card: validatedCard };
}

/**
 * 6. Main Multi-Provider Flashcard Batch Generator
 */
export async function executeAIFlashcardGeneration(params: FlashcardGenerationInputParams): Promise<FlashcardGenerationResult> {
  const startTime = Date.now();
  const totalCount = Math.max(1, Math.min(params.count || 5, 50));
  const batchSize = 5;
  const totalBatches = Math.ceil(totalCount / batchSize);

  // Available Keys map
  const keys: Record<string, string | undefined> = {
    openai: params.apiKey || getRuntimeEnv('OPENAI_API_KEY'),
    gemini: params.apiKey || getRuntimeEnv('GEMINI_API_KEY') || getRuntimeEnv('GOOGLE_GENERATIVE_AI_API_KEY'),
    deepseek: params.apiKey || getRuntimeEnv('DEEPSEEK_API_KEY'),
    openrouter: params.apiKey || getRuntimeEnv('OPENROUTER_API_KEY'),
    anthropic: params.apiKey || getRuntimeEnv('ANTHROPIC_API_KEY'),
  };

  const requestedProvider = (params.provider || 'auto').toLowerCase();

  // Determine provider order
  let providerOrder: string[] = [];
  if (requestedProvider !== 'auto' && keys[requestedProvider] && !keys[requestedProvider]!.includes('mock-')) {
    providerOrder.push(requestedProvider);
  }

  const allProviders = ['openai', 'gemini', 'deepseek', 'anthropic', 'openrouter'];
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
      requestedCount: totalCount,
      generatedCount: 0,
      validatedCount: 0,
      insertedCount: 0,
      duplicateCount: 0,
      insertedIds: [],
      latencyMs: Date.now() - startTime,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCostUSD: 0,
      fallbackUsed: false,
      batchCount: totalBatches,
      failedBatchesCount: totalBatches,
      retriesCount: 0,
      batches: [],
      flashcards: [],
      error: `AI Generation Failed: No API keys configured for ${requestedProvider === 'auto' ? 'supported AI providers (OpenAI, Gemini, DeepSeek, Anthropic, OpenRouter)' : requestedProvider}. Please configure API keys in Admin settings or environment variables.`,
    };
  }

  const allGeneratedCards: Flashcard[] = [];
  const insertedIds: string[] = [];
  const batchTelemetryList: FlashcardBatchTelemetry[] = [];
  const existingCardsForDupCheck: Array<{ front: string; back: string }> = [];

  let overallGenerated = 0;
  let overallValidated = 0;
  let overallInserted = 0;
  let overallDuplicates = 0;
  let overallInputTokens = 0;
  let overallOutputTokens = 0;
  let overallRetries = 0;
  let failedBatches = 0;
  let primaryProvider = providerOrder[0];
  let primaryModel = PROVIDER_MODEL_MAP[primaryProvider] || 'default';
  let fallbackUsed = false;

  for (let b = 0; b < totalBatches; b++) {
    const currentBatchReqCount = Math.min(batchSize, totalCount - b * batchSize);
    let batchSuccess = false;
    let batchRetries = 0;
    let batchProviderUsed = '';
    let batchModelUsed = '';
    let batchRawText = '';
    let batchInputTokens = 0;
    let batchOutputTokens = 0;
    let batchLatencyMs = 0;
    let batchError = '';

    const batchStartTime = Date.now();

    // Iterate through provider order with retry support
    for (let pIdx = 0; pIdx < providerOrder.length; pIdx++) {
      const p = providerOrder[pIdx];
      const key = keys[p];
      if (!key || key.includes('mock-')) continue;

      if (pIdx > 0) fallbackUsed = true;

      // Primary attempt & 1 retry
      for (let attempt = 0; attempt < 2; attempt++) {
        if (attempt > 0) {
          batchRetries++;
          overallRetries++;
        }

        try {
          const prompt = buildAIFlashcardPrompt(params, currentBatchReqCount, attempt > 0);
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

          batchRawText = res.text;
          batchModelUsed = res.model;
          batchProviderUsed = p.toUpperCase();
          batchInputTokens = res.inputTokens;
          batchOutputTokens = res.outputTokens;

          const rawCards = parseAIFlashcardsJSON(batchRawText);

          if (rawCards.length > 0) {
            batchSuccess = true;
            break; // Exit attempt loop
          } else {
            batchError = `Batch ${b + 1}: Received empty or non-array flashcard JSON`;
          }
        } catch (err: any) {
          batchError = `Batch ${b + 1} (${p}): ${err.message}`;
          console.error(batchError);
        }
      }

      if (batchSuccess) break; // Exit provider loop
    }

    batchLatencyMs = Date.now() - batchStartTime;
    overallInputTokens += batchInputTokens;
    overallOutputTokens += batchOutputTokens;

    if (!batchSuccess) {
      failedBatches++;
      batchTelemetryList.push({
        batchIndex: b + 1,
        totalBatches,
        requestedCount: currentBatchReqCount,
        generatedCount: 0,
        validatedCount: 0,
        insertedCount: 0,
        duplicateCount: 0,
        providerUsed: batchProviderUsed || 'NONE',
        modelUsed: batchModelUsed || 'NONE',
        latencyMs: batchLatencyMs,
        inputTokens: batchInputTokens,
        outputTokens: batchOutputTokens,
        totalTokens: batchInputTokens + batchOutputTokens,
        estimatedCostUSD: 0,
        retryCount: batchRetries,
        status: 'failed',
        error: batchError || 'All provider attempts failed for batch',
      });
      continue;
    }

    // Parse and validate items in batch
    const rawItems = parseAIFlashcardsJSON(batchRawText);
    overallGenerated += rawItems.length;

    const validBatchCards: Partial<Flashcard>[] = [];
    let batchValidatedCount = 0;
    let batchDuplicateCount = 0;

    for (const rawItem of rawItems) {
      const { isValid, card } = validateFlashcardItem(rawItem, params);
      if (isValid && card) {
        batchValidatedCount++;
        overallValidated++;

        // Duplicate Check
        if (isDuplicateFlashcard({ front: card.front!, back: card.back! }, existingCardsForDupCheck)) {
          batchDuplicateCount++;
          overallDuplicates++;
        } else {
          validBatchCards.push(card);
          existingCardsForDupCheck.push({ front: card.front!, back: card.back! });
        }
      }
    }

    // Save batch to Database and Memory
    const savedBatchCards: Flashcard[] = [];
    let batchInsertedCount = 0;
    const adminDb = getSupabaseAdminClient();

    for (const vCard of validBatchCards) {
      let assignedId = `fc-gen-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      let dbInsertSuccess = false;

      // 1. Insert into Supabase database if configured
      if (isSupabaseConfigured()) {
        try {
          const clinicalExampleText = [
            vCard.explanation,
            vCard.clinicalExplanation ? `Clinical Rationale: ${vCard.clinicalExplanation}` : '',
            vCard.memoryTip ? `Mnemonic: ${vCard.memoryTip}` : '',
          ].filter(Boolean).join('\n\n');

          const dbRow = {
            certification: String(vCard.certification || 'RBT').slice(0, 30),
            term: String(vCard.front || vCard.title || 'Untitled Card').slice(0, 250),
            definition: vCard.back || vCard.explanation || 'No definition provided',
            clinical_example: [
              vCard.front && vCard.front.length > 250 ? `Full Question Prompt:\n${vCard.front}` : '',
              clinicalExampleText,
            ].filter(Boolean).join('\n\n'),
            category: String(vCard.category || 'Measurement').slice(0, 120),
            task_list_code: String(vCard.subcategory || vCard.reference || 'BACB Task List').slice(0, 30),
            tags: vCard.tags || ['AI Generated'],
            difficulty: String(vCard.difficulty || 'medium').slice(0, 30),
            is_premium: vCard.isPremium || false,
            status: 'published',
          };

          const { data: insertedRows, error: dbErr } = await adminDb
            .from('master_flashcards')
            .insert([dbRow])
            .select();

          if (dbErr) {
            console.error('[AI Engine DB Error] Failed to insert row into master_flashcards:', dbErr.message);
            batchError = `Database insertion error: ${dbErr.message}`;
          } else if (insertedRows && insertedRows.length > 0) {
            assignedId = insertedRows[0].id;
            dbInsertSuccess = true;
          } else {
            console.error('[AI Engine DB Warning] Insert returned no data rows.');
            batchError = 'Database insert completed but returned no row data';
          }
        } catch (dbEx: any) {
          console.error('[AI Engine DB Exception] Exception during insert:', dbEx.message);
          batchError = `Database insertion exception: ${dbEx.message}`;
        }
      } else {
        // In local mode without Supabase, count memory save as success
        dbInsertSuccess = true;
      }

      if (dbInsertSuccess) {
        const finalCard: Flashcard = {
          ...vCard,
          id: assignedId,
          front: vCard.front!,
          back: vCard.back!,
          explanation: vCard.explanation!,
          title: vCard.title || vCard.front!.slice(0, 50),
          cardType: 'ai_generated',
          clinicalExplanation: vCard.clinicalExplanation || vCard.explanation!,
          memoryTip: vCard.memoryTip || 'Memory tip',
          realLifeExample: vCard.realLifeExample || 'Clinical example',
          commonMistakes: vCard.commonMistakes || 'Common mistakes',
          reference: vCard.reference || 'BACB Task List',
          certification: vCard.certification || 'RBT',
          category: vCard.category || 'Measurement',
          subcategory: vCard.subcategory || vCard.reference,
          difficulty: vCard.difficulty || 'medium',
          keywords: vCard.keywords || ['RBT'],
          tags: vCard.tags || ['AI Generated'],
          status: 'published',
          isPremium: vCard.isPremium || false,
          isFeatured: true,
          createdBy: vCard.createdBy || 'ai_engine',
          updatedBy: 'ai_engine',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const memorySaved = addCustomFlashcard(finalCard);
        savedBatchCards.push(memorySaved);
        allGeneratedCards.push(memorySaved);
        insertedIds.push(assignedId);
        batchInsertedCount++;
        overallInserted++;
      }
    }

    const costRates = TOKEN_COST_RATES[batchProviderUsed.toLowerCase()] || TOKEN_COST_RATES.openai;
    const batchCostUSD = (batchInputTokens / 1000) * costRates.input + (batchOutputTokens / 1000) * costRates.output;

    batchTelemetryList.push({
      batchIndex: b + 1,
      totalBatches,
      requestedCount: currentBatchReqCount,
      generatedCount: rawItems.length,
      validatedCount: batchValidatedCount,
      insertedCount: batchInsertedCount,
      duplicateCount: batchDuplicateCount,
      providerUsed: batchProviderUsed,
      modelUsed: batchModelUsed,
      latencyMs: batchLatencyMs,
      inputTokens: batchInputTokens,
      outputTokens: batchOutputTokens,
      totalTokens: batchInputTokens + batchOutputTokens,
      estimatedCostUSD: batchCostUSD,
      retryCount: batchRetries,
      status: batchInsertedCount > 0 ? 'success' : 'partial',
    });

    if (b === 0) {
      primaryProvider = batchProviderUsed;
      primaryModel = batchModelUsed;
    }
  }

  const totalLatencyMs = Date.now() - startTime;
  const rates = TOKEN_COST_RATES[primaryProvider.toLowerCase()] || TOKEN_COST_RATES.openai;
  const totalCostUSD = (overallInputTokens / 1000) * rates.input + (overallOutputTokens / 1000) * rates.output;

  const isOverallSuccess = overallInserted > 0;

  return {
    success: isOverallSuccess,
    providerUsed: primaryProvider,
    modelUsed: primaryModel,
    requestedCount: totalCount,
    generatedCount: overallGenerated,
    validatedCount: overallValidated,
    insertedCount: overallInserted,
    duplicateCount: overallDuplicates,
    insertedIds,
    latencyMs: totalLatencyMs,
    inputTokens: overallInputTokens,
    outputTokens: overallOutputTokens,
    totalTokens: overallInputTokens + overallOutputTokens,
    estimatedCostUSD: totalCostUSD,
    fallbackUsed,
    batchCount: totalBatches,
    failedBatchesCount: failedBatches,
    retriesCount: overallRetries,
    batches: batchTelemetryList,
    flashcards: allGeneratedCards,
    error: isOverallSuccess ? undefined : `AI Flashcard Generation Failed across all ${totalBatches} batches.`,
  };
}
