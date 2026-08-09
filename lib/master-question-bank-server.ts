import fs from 'fs';
import path from 'path';
import os from 'os';
import { MasterQuestion } from '@/types/master-question';
import {
  MASTER_QUESTION_BANK,
  createQuestion as createQuestionInBank,
  deleteQuestion as deleteQuestionInBank,
  bulkDeleteQuestions as bulkDeleteQuestionsInBank,
} from './master-question-bank';

function getPersistentFilePath(): string {
  // Use os.tmpdir() for serverless platforms (Vercel/AWS Lambda) to prevent read-only directory errors
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

/**
 * Server-only: Load questions from server JSON store
 */
export function loadServerPersistentQuestions(): MasterQuestion[] {
  try {
    const filePath = getPersistentFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        parsed.forEach((q: MasterQuestion) => {
          if (!MASTER_QUESTION_BANK.some((existing) => existing.id === q.id)) {
            MASTER_QUESTION_BANK.unshift(q);
          }
        });
      }
    }
  } catch (err) {
    // Graceful fallback for serverless environments
  }
  return MASTER_QUESTION_BANK;
}

/**
 * Server-only: Save questions array to server JSON store
 */
export function saveServerPersistentQuestions(): void {
  try {
    const filePath = getPersistentFilePath();
    fs.writeFileSync(filePath, JSON.stringify(MASTER_QUESTION_BANK, null, 2), 'utf-8');
  } catch (err) {
    // Graceful fallback for serverless environments
  }
}

/**
 * Server-only: Create question and persist to server JSON store
 */
export function createServerQuestion(data: Partial<MasterQuestion> & Omit<MasterQuestion, 'id' | 'createdAt' | 'updatedAt' | 'version'>): MasterQuestion {
  loadServerPersistentQuestions();
  const created = createQuestionInBank(data);
  saveServerPersistentQuestions();
  return created;
}

/**
 * Server-only: Delete question by ID and update server JSON store
 */
export function deleteServerQuestion(id: string): boolean {
  loadServerPersistentQuestions();
  const deleted = deleteQuestionInBank(id);
  if (deleted) {
    saveServerPersistentQuestions();
  }
  return deleted;
}

/**
 * Server-only: Bulk delete questions and update server JSON store
 */
export function bulkDeleteServerQuestions(ids: string[]): number {
  loadServerPersistentQuestions();
  const count = bulkDeleteQuestionsInBank(ids);
  if (count > 0) {
    saveServerPersistentQuestions();
  }
  return count;
}
