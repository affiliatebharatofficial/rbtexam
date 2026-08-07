import fs from 'fs';
import path from 'path';
import { MasterQuestion } from '@/types/master-question';
import { MASTER_QUESTION_BANK, createQuestion as createQuestionInBank } from './master-question-bank';

function getPersistentFilePath(): string {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, 'questions-store.json');
}

/**
 * Server-only: Load questions from server disk JSON store
 */
export function loadServerPersistentQuestions(): MasterQuestion[] {
  try {
    const filePath = getPersistentFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach((q: MasterQuestion) => {
          if (!MASTER_QUESTION_BANK.some((existing) => existing.id === q.id)) {
            MASTER_QUESTION_BANK.unshift(q);
          }
        });
      }
    }
  } catch (err) {
    console.error('Failed to load server persistent questions:', err);
  }
  return MASTER_QUESTION_BANK;
}

/**
 * Server-only: Save questions array to server disk JSON store
 */
export function saveServerPersistentQuestions(): void {
  try {
    const filePath = getPersistentFilePath();
    fs.writeFileSync(filePath, JSON.stringify(MASTER_QUESTION_BANK, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save server persistent questions:', err);
  }
}

/**
 * Server-only: Create question and persist to server disk JSON store
 */
export function createServerQuestion(data: Omit<MasterQuestion, 'id' | 'createdAt' | 'updatedAt' | 'version'>): MasterQuestion {
  loadServerPersistentQuestions();
  const created = createQuestionInBank(data);
  saveServerPersistentQuestions();
  return created;
}
