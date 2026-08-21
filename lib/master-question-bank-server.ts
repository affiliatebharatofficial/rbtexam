import { MasterQuestion, QuestionStatus } from '@/types/master-question';
import { getSupabaseAdminClient } from './supabase';

export function mapDbRowToMasterQuestion(row: any): MasterQuestion {
  return {
    id: row.question_code || row.id,
    certification: row.certification || 'RBT',
    question: row.question_text || row.question || '',
    scenarioText: row.scenario_text || undefined,
    questionType: row.question_type || 'scenario_based',
    difficulty: row.difficulty || 'medium',
    options: Array.isArray(row.options) ? row.options : typeof row.options === 'string' ? JSON.parse(row.options) : [],
    correctAnswerId: row.correct_answer_id || 'A',
    answerExplanation: row.answer_explanation || '',
    clinicalExplanation: row.clinical_explanation || '',
    references: row.references || '',
    examTips: row.exam_tips || undefined,
    commonMistakes: row.common_mistakes || undefined,
    category: row.category || 'Data Collection and Graphing',
    subCategory: row.sub_category || undefined,
    keywords: Array.isArray(row.keywords) ? row.keywords : [],
    taskListVersion: row.task_list_version || '3rd_edition',
    estimatedTimeSeconds: row.estimated_time_seconds || 60,
    tags: Array.isArray(row.tags) ? row.tags : [],
    status: row.status || 'published',
    isPremium: Boolean(row.is_premium),
    isFeatured: Boolean(row.is_featured),
    version: row.version || 1,
    createdBy: row.created_by || 'Super Admin CMS',
    updatedBy: row.updated_by || 'Super Admin CMS',
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

export function mapMasterQuestionToDbRow(data: Partial<MasterQuestion>): any {
  const randomSalt = Math.random().toString(36).substring(2, 8);
  const qId = data.id || `mq-${(data.certification || 'RBT').toLowerCase()}-${Date.now()}-${randomSalt}`;
  return {
    question_code: qId,
    certification: data.certification || 'RBT',
    question_text: data.question || '',
    scenario_text: data.scenarioText || null,
    question_type: data.questionType || 'scenario_based',
    difficulty: data.difficulty || 'medium',
    options: data.options || [],
    correct_answer_id: data.correctAnswerId || 'A',
    answer_explanation: data.answerExplanation || '',
    clinical_explanation: data.clinicalExplanation || null,
    references: data.references || null,
    exam_tips: data.examTips || null,
    common_mistakes: data.commonMistakes || null,
    category: data.category || 'Data Collection and Graphing',
    sub_category: data.subCategory || null,
    keywords: data.keywords || [],
    task_list_version: data.taskListVersion || '3rd_edition',
    estimated_time_seconds: data.estimatedTimeSeconds || 60,
    tags: data.tags || [],
    status: data.status || 'published',
    is_premium: data.isPremium || false,
    is_featured: data.isFeatured || false,
    version: data.version || 1,
    updated_at: new Date().toISOString(),
  };
}

const QUESTION_COLUMNS =
  'id, question_code, certification, question_text, scenario_text, question_type, difficulty, options, correct_answer_id, answer_explanation, clinical_explanation, references, exam_tips, common_mistakes, category, sub_category, keywords, task_list_version, estimated_time_seconds, tags, status, is_premium, is_featured, version, created_at, updated_at';

/**
 * Server-only: Single question direct indexed lookup
 */
export async function fetchQuestionByIdOrCodeAsync(idOrCode: string): Promise<MasterQuestion | null> {
  try {
    const adminDb = getSupabaseAdminClient();
    const { data, error } = await adminDb
      .from('master_questions')
      .select(QUESTION_COLUMNS)
      .or(`question_code.eq.${idOrCode},id.eq.${idOrCode}`)
      .is('deleted_at', null)
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return mapDbRowToMasterQuestion(data);
  } catch (err) {
    console.error('Failed to fetch question by ID/code from Supabase:', err);
    return null;
  }
}

/**
 * Server-only: Async load questions directly from Supabase PostgreSQL database
 */
export async function loadServerPersistentQuestionsAsync(limit: number = 200): Promise<MasterQuestion[]> {
  try {
    const adminDb = getSupabaseAdminClient();
    const { data: dbRows, error } = await adminDb
      .from('master_questions')
      .select(QUESTION_COLUMNS)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (!error && Array.isArray(dbRows)) {
      return dbRows.map(mapDbRowToMasterQuestion);
    }
  } catch (err) {
    console.error('Failed to load questions from Supabase DB:', err);
  }

  return [];
}

/**
 * In-memory fallback reader
 */
export function loadServerPersistentQuestionsSync(): MasterQuestion[] {
  return [];
}

/**
 * Backward compatible loader
 */
export function loadServerPersistentQuestions(): MasterQuestion[] {
  return [];
}

export function saveServerPersistentQuestionsSync(_questions: MasterQuestion[]): void {
  // No-op: Supabase is the sole source of truth in edge isolate
}

export function saveServerPersistentQuestions(): void {
  // No-op
}

/**
 * Server-only: Create question directly in Supabase database
 */
export async function createServerQuestionAsync(data: Partial<MasterQuestion>): Promise<MasterQuestion> {
  const dbRow = mapMasterQuestionToDbRow(data);
  const adminDb = getSupabaseAdminClient();
  
  const { data: inserted, error } = await adminDb
    .from('master_questions')
    .insert([dbRow])
    .select(QUESTION_COLUMNS)
    .single();

  if (error || !inserted) {
    console.error('Failed to insert question in Supabase DB:', error?.message);
    return mapDbRowToMasterQuestion(dbRow);
  }

  return mapDbRowToMasterQuestion(inserted);
}

export function createServerQuestion(data: Partial<MasterQuestion>): MasterQuestion {
  const fallbackQuestion = mapDbRowToMasterQuestion(data);
  createServerQuestionAsync(data).catch((e) => console.error(e));
  return fallbackQuestion;
}

/**
 * Server-only: Batch create questions in Supabase database without N+1 roundtrips
 */
export async function batchCreateServerQuestionsAsync(
  questions: Partial<MasterQuestion>[]
): Promise<{ insertedCount: number; data: MasterQuestion[]; error?: string }> {
  if (!questions || questions.length === 0) {
    return { insertedCount: 0, data: [] };
  }

  const adminDb = getSupabaseAdminClient();
  const dbRows = questions.map(mapMasterQuestionToDbRow);
  const BATCH_SIZE = 25;
  const insertedQuestions: MasterQuestion[] = [];
  let lastErrorMessage: string | undefined = undefined;

  for (let i = 0; i < dbRows.length; i += BATCH_SIZE) {
    const chunk = dbRows.slice(i, i + BATCH_SIZE);
    const { data: insertedData, error } = await adminDb
      .from('master_questions')
      .insert(chunk)
      .select('id, question_code, question_text, certification, status');

    if (error) {
      console.error('Batch question insert error:', error.message);
      lastErrorMessage = error.message;
    } else if (insertedData && Array.isArray(insertedData)) {
      insertedData.forEach((row) => insertedQuestions.push(mapDbRowToMasterQuestion(row)));
    }
  }

  return {
    insertedCount: insertedQuestions.length,
    data: insertedQuestions,
    ...(lastErrorMessage && insertedQuestions.length === 0 ? { error: lastErrorMessage } : {}),
  };
}

/**
 * Server-only: Fetch question stems from Supabase with safe limit to avoid Worker CPU exhaustion
 */
export async function getAllQuestionStemsAsync(maxLimit: number = 1000): Promise<string[]> {
  try {
    const adminDb = getSupabaseAdminClient();
    const { data, error } = await adminDb
      .from('master_questions')
      .select('question_text')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(maxLimit);

    if (error || !data) return [];
    return data.map((r: any) => r.question_text).filter(Boolean);
  } catch (err) {
    console.error('Failed to get question stems:', err);
    return [];
  }
}

/**
 * Server-only: Update question in Supabase database
 */
export async function updateServerQuestionAsync(id: string, updates: Partial<MasterQuestion>): Promise<MasterQuestion | undefined> {
  const adminDb = getSupabaseAdminClient();
  const dbUpdates: any = {};

  if (updates.question !== undefined) dbUpdates.question_text = updates.question;
  if (updates.scenarioText !== undefined) dbUpdates.scenario_text = updates.scenarioText;
  if (updates.certification !== undefined) dbUpdates.certification = updates.certification;
  if (updates.difficulty !== undefined) dbUpdates.difficulty = updates.difficulty;
  if (updates.category !== undefined) dbUpdates.category = updates.category;
  if (updates.options !== undefined) dbUpdates.options = updates.options;
  if (updates.correctAnswerId !== undefined) dbUpdates.correct_answer_id = updates.correctAnswerId;
  if (updates.answerExplanation !== undefined) dbUpdates.answer_explanation = updates.answerExplanation;
  if (updates.clinicalExplanation !== undefined) dbUpdates.clinical_explanation = updates.clinicalExplanation;
  if (updates.references !== undefined) dbUpdates.references = updates.references;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.isPremium !== undefined) dbUpdates.is_premium = updates.isPremium;
  if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
  dbUpdates.updated_at = new Date().toISOString();

  const { data: updated, error } = await adminDb
    .from('master_questions')
    .update(dbUpdates)
    .or(`question_code.eq.${id},id.eq.${id}`)
    .select(QUESTION_COLUMNS)
    .single();

  if (error || !updated) {
    console.error('Failed to update question in Supabase:', error?.message);
    return undefined;
  }

  return mapDbRowToMasterQuestion(updated);
}

export function updateServerQuestion(id: string, updates: Partial<MasterQuestion>): MasterQuestion | undefined {
  updateServerQuestionAsync(id, updates).catch((e) => console.error(e));
  return undefined;
}

/**
 * Server-only: Delete question from Supabase database
 */
export async function deleteServerQuestionAsync(id: string): Promise<boolean> {
  const adminDb = getSupabaseAdminClient();
  const { error } = await adminDb
    .from('master_questions')
    .update({ deleted_at: new Date().toISOString() })
    .or(`question_code.eq.${id},id.eq.${id}`);

  if (error) {
    console.error('Failed to delete question from Supabase:', error.message);
    return false;
  }

  return true;
}

export function deleteServerQuestion(id: string): boolean {
  deleteServerQuestionAsync(id).catch((e) => console.error(e));
  return true;
}

/**
 * Server-only: Bulk update status in Supabase database
 */
export async function bulkUpdateServerStatusAsync(ids: string[], status: QuestionStatus): Promise<number> {
  const adminDb = getSupabaseAdminClient();
  const { data, error } = await adminDb
    .from('master_questions')
    .update({ status, updated_at: new Date().toISOString() })
    .in('question_code', ids)
    .select('id');

  if (error) {
    console.error('Bulk update error in Supabase:', error.message);
    return 0;
  }

  return data?.length || ids.length;
}

export function bulkUpdateServerStatus(ids: string[], status: QuestionStatus): number {
  bulkUpdateServerStatusAsync(ids, status).catch((e) => console.error(e));
  return ids.length;
}

/**
 * Server-only: Bulk delete questions in Supabase database
 */
export async function bulkDeleteServerQuestionsAsync(ids: string[]): Promise<number> {
  const adminDb = getSupabaseAdminClient();
  const { data, error } = await adminDb
    .from('master_questions')
    .update({ deleted_at: new Date().toISOString() })
    .in('question_code', ids)
    .select('id');

  if (error) {
    console.error('Bulk delete error in Supabase:', error.message);
    return 0;
  }

  return data?.length || ids.length;
}

export function bulkDeleteServerQuestions(ids: string[]): number {
  bulkDeleteServerQuestionsAsync(ids).catch((e) => console.error(e));
  return ids.length;
}
