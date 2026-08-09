import fs from 'fs';
import path from 'path';
import os from 'os';
import { MasterQuestion, QuestionStatus } from '@/types/master-question';
import { getSupabaseAdminClient } from './supabase';

function getPersistentFilePath(): string {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NEXT_RUNTIME === 'edge');
  const dataDir = isServerless ? os.tmpdir() : path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch (err) {
      // Ignore directory creation error in read-only environments
    }
  }
  return path.join(dataDir, 'questions-store.json');
}

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
  const qId = data.id || `mq-${(data.certification || 'RBT').toLowerCase()}-${Date.now()}`;
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

/**
 * Server-only: Async load questions directly from Supabase PostgreSQL database
 */
export async function loadServerPersistentQuestionsAsync(): Promise<MasterQuestion[]> {
  try {
    const adminDb = getSupabaseAdminClient();
    const { data: dbRows, error } = await adminDb
      .from('master_questions')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(dbRows)) {
      const dbQuestions = dbRows.map(mapDbRowToMasterQuestion);
      // Sync local JSON store as cache backup
      saveServerPersistentQuestionsSync(dbQuestions);
      return dbQuestions;
    }
  } catch (err) {
    console.error('Failed to load questions from Supabase DB:', err);
  }

  // Local JSON store backup fallback
  return loadServerPersistentQuestionsSync();
}

/**
 * Synchronous local JSON cache reader (strictly DB data cached, NO static seed fallback)
 */
export function loadServerPersistentQuestionsSync(): MasterQuestion[] {
  try {
    const filePath = getPersistentFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {}
  return [];
}

/**
 * Backward compatible synchronous loader
 */
export function loadServerPersistentQuestions(): MasterQuestion[] {
  return loadServerPersistentQuestionsSync();
}

/**
 * Save questions array to server JSON cache
 */
export function saveServerPersistentQuestionsSync(questions: MasterQuestion[]): void {
  try {
    const filePath = getPersistentFilePath();
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf-8');
  } catch (err) {}
}

export function saveServerPersistentQuestions(): void {
  // no-op for sync save
}

/**
 * Server-only: Create question in Supabase database
 */
export async function createServerQuestionAsync(data: Partial<MasterQuestion>): Promise<MasterQuestion> {
  const dbRow = mapMasterQuestionToDbRow(data);
  const adminDb = getSupabaseAdminClient();
  
  const { data: inserted, error } = await adminDb
    .from('master_questions')
    .insert([dbRow])
    .select('*')
    .single();

  if (error || !inserted) {
    console.error('Failed to insert question in Supabase DB:', error?.message);
    const fallbackQuestion = mapDbRowToMasterQuestion(dbRow);
    const existing = loadServerPersistentQuestionsSync();
    existing.unshift(fallbackQuestion);
    saveServerPersistentQuestionsSync(existing);
    return fallbackQuestion;
  }

  const createdQuestion = mapDbRowToMasterQuestion(inserted);
  const currentStore = await loadServerPersistentQuestionsAsync();
  return createdQuestion;
}

export function createServerQuestion(data: Partial<MasterQuestion>): MasterQuestion {
  const fallbackQuestion = mapDbRowToMasterQuestion(data);
  // Trigger async DB write in background
  createServerQuestionAsync(data).catch((e) => console.error(e));
  return fallbackQuestion;
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
    .select('*')
    .single();

  if (error || !updated) {
    console.error('Failed to update question in Supabase:', error?.message);
    return undefined;
  }

  const result = mapDbRowToMasterQuestion(updated);
  await loadServerPersistentQuestionsAsync();
  return result;
}

export function updateServerQuestion(id: string, updates: Partial<MasterQuestion>): MasterQuestion | undefined {
  updateServerQuestionAsync(id, updates).catch((e) => console.error(e));
  const current = loadServerPersistentQuestionsSync();
  const found = current.find((q) => q.id === id);
  if (found) {
    Object.assign(found, updates);
    saveServerPersistentQuestionsSync(current);
    return found;
  }
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

  await loadServerPersistentQuestionsAsync();
  return true;
}

export function deleteServerQuestion(id: string): boolean {
  deleteServerQuestionAsync(id).catch((e) => console.error(e));
  const current = loadServerPersistentQuestionsSync();
  const filtered = current.filter((q) => q.id !== id);
  saveServerPersistentQuestionsSync(filtered);
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

  await loadServerPersistentQuestionsAsync();
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

  await loadServerPersistentQuestionsAsync();
  return data?.length || ids.length;
}

export function bulkDeleteServerQuestions(ids: string[]): number {
  bulkDeleteServerQuestionsAsync(ids).catch((e) => console.error(e));
  return ids.length;
}
