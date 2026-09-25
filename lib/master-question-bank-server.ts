import { MasterQuestion, QuestionStatus } from '@/types/master-question';
import { d1Query, d1QueryFirst, d1Run, d1Batch, isD1Available } from './d1';
import { FULL_BACB_SEED_QUESTIONS } from './seed-questions-bank';

export function mapDbRowToMasterQuestion(row: any): MasterQuestion {
  let parsedOptions = [];
  try {
    parsedOptions = Array.isArray(row.options)
      ? row.options
      : typeof row.options === 'string'
      ? JSON.parse(row.options)
      : [];
  } catch {
    parsedOptions = [];
  }

  let parsedKeywords: string[] = [];
  try {
    parsedKeywords = Array.isArray(row.keywords)
      ? row.keywords
      : typeof row.keywords === 'string'
      ? JSON.parse(row.keywords)
      : [];
  } catch {
    parsedKeywords = [];
  }

  let parsedTags: string[] = [];
  try {
    parsedTags = Array.isArray(row.tags)
      ? row.tags
      : typeof row.tags === 'string'
      ? JSON.parse(row.tags)
      : [];
  } catch {
    parsedTags = [];
  }

  return {
    id: row.question_code || row.id,
    certification: row.certification || 'RBT',
    question: row.question_text || row.question || '',
    scenarioText: row.scenario_text || undefined,
    questionType: row.question_type || 'scenario_based',
    difficulty: row.difficulty || 'medium',
    options: parsedOptions,
    correctAnswerId: row.correct_answer_id || 'A',
    answerExplanation: row.answer_explanation || '',
    clinicalExplanation: row.clinical_explanation || '',
    references: row.references || '',
    examTips: row.exam_tips || undefined,
    commonMistakes: row.common_mistakes || undefined,
    category: row.category || 'Data Collection and Graphing',
    subCategory: row.sub_category || undefined,
    keywords: parsedKeywords,
    taskListVersion: row.task_list_version || '3rd_edition',
    estimatedTimeSeconds: row.estimated_time_seconds || 60,
    tags: parsedTags,
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
    id: qId,
    question_code: qId,
    certification: data.certification || 'RBT',
    question_text: data.question || '',
    scenario_text: data.scenarioText || null,
    question_type: data.questionType || 'scenario_based',
    difficulty: data.difficulty || 'medium',
    options: JSON.stringify(data.options || []),
    correct_answer_id: data.correctAnswerId || 'A',
    answer_explanation: data.answerExplanation || '',
    clinical_explanation: data.clinicalExplanation || null,
    references: data.references || null,
    exam_tips: data.examTips || null,
    common_mistakes: data.commonMistakes || null,
    category: data.category || 'Data Collection and Graphing',
    sub_category: data.subCategory || null,
    keywords: JSON.stringify(data.keywords || []),
    task_list_version: data.taskListVersion || '3rd_edition',
    estimated_time_seconds: data.estimatedTimeSeconds || 60,
    tags: JSON.stringify(data.tags || []),
    status: data.status || 'published',
    is_premium: data.isPremium ? 1 : 0,
    is_featured: data.isFeatured ? 1 : 0,
    version: data.version || 1,
    updated_at: new Date().toISOString(),
  };
}

/**
 * Server-only: Single question direct indexed lookup from Cloudflare D1 with in-memory fallback
 */
export async function fetchQuestionByIdOrCodeAsync(idOrCode: string): Promise<MasterQuestion | null> {
  // 1. Fast in-memory lookup from canonical questions (0ms CPU)
  const canonicalMatch = FULL_BACB_SEED_QUESTIONS.find(
    (q) => q.id === idOrCode || (q as any).question_code === idOrCode
  );
  if (canonicalMatch) {
    return canonicalMatch;
  }

  // 2. Query Cloudflare D1 for custom or updated admin questions
  try {
    if (isD1Available()) {
      const row = await d1QueryFirst(
        'SELECT * FROM master_questions WHERE (question_code = ? OR id = ?) AND deleted_at IS NULL LIMIT 1',
        [idOrCode, idOrCode]
      );
      if (row) {
        return mapDbRowToMasterQuestion(row);
      }
    }
  } catch (err) {
    console.error('Failed to fetch question by ID/code from D1:', err);
  }

  return null;
}

/**
 * Server-only: Async load questions directly from Cloudflare D1 SQLite database
 */
export async function loadServerPersistentQuestionsAsync(limit: number = 200): Promise<MasterQuestion[]> {
  try {
    if (isD1Available()) {
      const dbRows = await d1Query(
        'SELECT * FROM master_questions WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      if (Array.isArray(dbRows) && dbRows.length > 0) {
        return dbRows.map(mapDbRowToMasterQuestion);
      }
    }
  } catch (err) {
    console.error('Failed to load questions from Cloudflare D1:', err);
  }

  // Fallback to canonical seed questions
  return FULL_BACB_SEED_QUESTIONS.slice(0, limit);
}

export function loadServerPersistentQuestionsSync(): MasterQuestion[] {
  return [];
}

export function loadServerPersistentQuestions(): MasterQuestion[] {
  return [];
}

export function saveServerPersistentQuestionsSync(_questions: MasterQuestion[]): void {
  // No-op: D1 is the source of truth in edge isolate
}

export function saveServerPersistentQuestions(): void {
  // No-op
}

/**
 * Server-only: Create question directly in Cloudflare D1 database
 */
export async function createServerQuestionAsync(data: Partial<MasterQuestion>): Promise<MasterQuestion> {
  const dbRow = mapMasterQuestionToDbRow(data);

  try {
    if (isD1Available()) {
      await d1Run(
        `INSERT INTO master_questions (
          id, question_code, certification, question_text, scenario_text,
          question_type, difficulty, options, correct_answer_id, answer_explanation,
          clinical_explanation, "references", exam_tips, common_mistakes, category,
          sub_category, keywords, task_list_version, estimated_time_seconds, tags,
          status, is_premium, is_featured, version
        ) VALUES (
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?
        )`,
        [
          dbRow.id, dbRow.question_code, dbRow.certification, dbRow.question_text, dbRow.scenario_text,
          dbRow.question_type, dbRow.difficulty, dbRow.options, dbRow.correct_answer_id, dbRow.answer_explanation,
          dbRow.clinical_explanation, dbRow.references, dbRow.exam_tips, dbRow.common_mistakes, dbRow.category,
          dbRow.sub_category, dbRow.keywords, dbRow.task_list_version, dbRow.estimated_time_seconds, dbRow.tags,
          dbRow.status, dbRow.is_premium, dbRow.is_featured, dbRow.version
        ]
      );
    }
  } catch (e: any) {
    console.error('Failed to insert question in Cloudflare D1:', e);
  }

  return mapDbRowToMasterQuestion(dbRow);
}

export function createServerQuestion(data: Partial<MasterQuestion>): MasterQuestion {
  const fallbackQuestion = mapDbRowToMasterQuestion(data);
  createServerQuestionAsync(data).catch((e) => console.error(e));
  return fallbackQuestion;
}

/**
 * Server-only: Batch create questions in Cloudflare D1
 */
export async function batchCreateServerQuestionsAsync(
  questions: Partial<MasterQuestion>[]
): Promise<{ insertedCount: number; data: MasterQuestion[]; error?: string }> {
  if (!questions || questions.length === 0) {
    return { insertedCount: 0, data: [] };
  }

  const dbRows = questions.map(mapMasterQuestionToDbRow);
  const statements = dbRows.map((r) => ({
    sql: `INSERT OR REPLACE INTO master_questions (
      id, question_code, certification, question_text, scenario_text,
      question_type, difficulty, options, correct_answer_id, answer_explanation,
      clinical_explanation, "references", exam_tips, common_mistakes, category,
      sub_category, keywords, task_list_version, estimated_time_seconds, tags,
      status, is_premium, is_featured, version
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )`,
    params: [
      r.id, r.question_code, r.certification, r.question_text, r.scenario_text,
      r.question_type, r.difficulty, r.options, r.correct_answer_id, r.answer_explanation,
      r.clinical_explanation, r.references, r.exam_tips, r.common_mistakes, r.category,
      r.sub_category, r.keywords, r.task_list_version, r.estimated_time_seconds, r.tags,
      r.status, r.is_premium, r.is_featured, r.version
    ],
  }));

  try {
    if (isD1Available()) {
      await d1Batch(statements);
    }
  } catch (err: any) {
    console.error('Batch question insert error in D1:', err);
    return { insertedCount: 0, data: [], error: err.message };
  }

  const inserted = dbRows.map(mapDbRowToMasterQuestion);
  return { insertedCount: inserted.length, data: inserted };
}

/**
 * Server-only: Fetch question stems from Cloudflare D1
 */
export async function getAllQuestionStemsAsync(maxLimit: number = 1000): Promise<string[]> {
  try {
    if (isD1Available()) {
      const rows = await d1Query<{ question_text: string }>(
        'SELECT question_text FROM master_questions WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT ?',
        [maxLimit]
      );
      if (Array.isArray(rows)) {
        return rows.map((r) => r.question_text).filter(Boolean);
      }
    }
  } catch (err) {
    console.error('Failed to get question stems from D1:', err);
  }

  return FULL_BACB_SEED_QUESTIONS.slice(0, maxLimit).map((q) => q.question);
}

/**
 * Server-only: Update question in Cloudflare D1 database
 */
export async function updateServerQuestionAsync(
  id: string,
  updates: Partial<MasterQuestion>
): Promise<MasterQuestion | undefined> {
  try {
    if (isD1Available()) {
      const current = await fetchQuestionByIdOrCodeAsync(id);
      if (!current) return undefined;

      const merged = { ...current, ...updates, updatedAt: new Date().toISOString() };
      const row = mapMasterQuestionToDbRow(merged);

      await d1Run(
        `UPDATE master_questions SET
          question_text = ?, scenario_text = ?, certification = ?, difficulty = ?,
          category = ?, options = ?, correct_answer_id = ?, answer_explanation = ?,
          clinical_explanation = ?, "references" = ?, status = ?, is_premium = ?,
          is_featured = ?, updated_at = datetime('now')
        WHERE id = ? OR question_code = ?`,
        [
          row.question_text, row.scenario_text, row.certification, row.difficulty,
          row.category, row.options, row.correct_answer_id, row.answer_explanation,
          row.clinical_explanation, row.references, row.status, row.is_premium,
          row.is_featured, id, id
        ]
      );

      return merged;
    }
  } catch (err) {
    console.error('Failed to update question in D1:', err);
  }

  return undefined;
}

export function updateServerQuestion(id: string, updates: Partial<MasterQuestion>): MasterQuestion | undefined {
  updateServerQuestionAsync(id, updates).catch((e) => console.error(e));
  return undefined;
}

/**
 * Server-only: Delete question from Cloudflare D1 (soft delete)
 */
export async function deleteServerQuestionAsync(id: string): Promise<boolean> {
  try {
    if (isD1Available()) {
      const res = await d1Run(
        "UPDATE master_questions SET deleted_at = datetime('now') WHERE id = ? OR question_code = ?",
        [id, id]
      );
      return res.success;
    }
  } catch (err) {
    console.error('Failed to delete question from D1:', err);
  }
  return false;
}

export function deleteServerQuestion(id: string): boolean {
  deleteServerQuestionAsync(id).catch((e) => console.error(e));
  return true;
}

/**
 * Server-only: Bulk update status in Cloudflare D1
 */
export async function bulkUpdateServerStatusAsync(ids: string[], status: QuestionStatus): Promise<number> {
  if (!ids || ids.length === 0) return 0;

  try {
    if (isD1Available()) {
      const placeholders = ids.map(() => '?').join(',');
      const res = await d1Run(
        `UPDATE master_questions SET status = ?, updated_at = datetime('now') WHERE id IN (${placeholders}) OR question_code IN (${placeholders})`,
        [status, ...ids, ...ids]
      );
      return res.changes;
    }
  } catch (err) {
    console.error('Bulk update error in D1:', err);
  }
  return ids.length;
}

export function bulkUpdateServerStatus(ids: string[], status: QuestionStatus): number {
  bulkUpdateServerStatusAsync(ids, status).catch((e) => console.error(e));
  return ids.length;
}

/**
 * Server-only: Bulk delete questions in Cloudflare D1
 */
export async function bulkDeleteServerQuestionsAsync(ids: string[]): Promise<number> {
  if (!ids || ids.length === 0) return 0;

  try {
    if (isD1Available()) {
      const placeholders = ids.map(() => '?').join(',');
      const res = await d1Run(
        `UPDATE master_questions SET deleted_at = datetime('now') WHERE id IN (${placeholders}) OR question_code IN (${placeholders})`,
        [...ids, ...ids]
      );
      return res.changes;
    }
  } catch (err) {
    console.error('Bulk delete error in D1:', err);
  }
  return ids.length;
}

export function bulkDeleteServerQuestions(ids: string[]): number {
  bulkDeleteServerQuestionsAsync(ids).catch((e) => console.error(e));
  return ids.length;
}
