import fs from 'fs';
import path from 'path';
import os from 'os';
import { DELETED_CARD_IDS } from './flashcard-bank';

function getDeletedFlashcardsFilePath(): string {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NEXT_RUNTIME === 'edge');
  const dataDir = isServerless ? os.tmpdir() : path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    try { fs.mkdirSync(dataDir, { recursive: true }); } catch (err) {}
  }
  return path.join(dataDir, 'deleted-flashcards.json');
}

export function loadDeletedCardIdsServer(): void {
  try {
    const filePath = getDeletedFlashcardsFilePath();
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        parsed.forEach((id: string) => DELETED_CARD_IDS.add(id));
      }
    }
  } catch (e) {}
}

export function saveDeletedCardIdsServer(): void {
  try {
    const filePath = getDeletedFlashcardsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(Array.from(DELETED_CARD_IDS), null, 2), 'utf-8');
  } catch (e) {}
}
