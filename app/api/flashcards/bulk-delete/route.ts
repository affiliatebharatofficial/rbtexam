import { NextRequest, NextResponse } from 'next/server';
import { deleteDatabaseFlashcardBulk } from '@/lib/flashcard-bank';
import { saveDeletedCardIdsServer } from '@/lib/flashcard-bank-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ids: string[] = Array.isArray(body.ids) ? body.ids : [];

    if (ids.length === 0) {
      return NextResponse.json(
        { error: 'No flashcard ids provided for deletion' },
        { status: 400 }
      );
    }

    await deleteDatabaseFlashcardBulk(ids);
    saveDeletedCardIdsServer();

    return NextResponse.json({
      success: true,
      count: ids.length,
      message: `Successfully deleted ${ids.length} flashcard(s)!`,
    });
  } catch (error: any) {
    console.error('[API /api/flashcards/bulk-delete Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to bulk delete flashcards' },
      { status: 500 }
    );
  }
}
