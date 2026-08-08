import { NextRequest, NextResponse } from 'next/server';
import { convertQuestionsToDatabaseFlashcards } from '@/lib/flashcard-bank';

export async function POST(request: NextRequest) {
  try {
    let force = false;
    try {
      const body = await request.json();
      if (body && body.force) force = Boolean(body.force);
    } catch (e) {
      // Optional body
    }

    const result = await convertQuestionsToDatabaseFlashcards(force);

    return NextResponse.json({
      success: true,
      convertedCount: result.insertedIds.length,
      insertedIds: result.insertedIds,
      message: `Successfully converted ${result.insertedIds.length} system questions into Database Flashcards!`,
    });
  } catch (error: any) {
    console.error('[API /api/flashcards/convert-questions Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to convert system questions to flashcards' },
      { status: 500 }
    );
  }
}
