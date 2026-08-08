import { NextRequest, NextResponse } from 'next/server';
import { parseCSVFlashcards, importBulkFlashcards } from '@/lib/flashcard-bank';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let cardsToImport: any[] = [];

    if (contentType.includes('text/csv') || contentType.includes('text/plain')) {
      const csvText = await request.text();
      cardsToImport = parseCSVFlashcards(csvText);
    } else {
      const body = await request.json();
      if (body.csvText) {
        cardsToImport = parseCSVFlashcards(body.csvText);
      } else if (Array.isArray(body.cards)) {
        cardsToImport = body.cards;
      }
    }

    if (cardsToImport.length === 0) {
      return NextResponse.json(
        { error: 'No valid flashcard rows found in CSV/input payload.' },
        { status: 400 }
      );
    }

    const result = await importBulkFlashcards(cardsToImport);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
      message: `Successfully imported ${result.insertedCount} flashcards to Database!`,
    });
  } catch (error: any) {
    console.error('[API /api/flashcards/import Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to import CSV flashcards' },
      { status: 500 }
    );
  }
}
