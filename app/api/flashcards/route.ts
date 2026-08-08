import { NextRequest, NextResponse } from 'next/server';
import {
  getFilteredFlashcardsAsync,
  createDatabaseFlashcard,
  updateDatabaseFlashcard,
  deleteDatabaseFlashcard,
} from '@/lib/flashcard-bank';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filterParams = {
      search: searchParams.get('search') || undefined,
      certification: (searchParams.get('certification') as any) || 'ALL',
      category: (searchParams.get('category') as any) || 'ALL',
      cardType: (searchParams.get('cardType') as any) || 'ALL',
      learningMode: (searchParams.get('learningMode') as any) || 'study',
      onlyDue: searchParams.get('onlyDue') === 'true',
      onlyFavorites: searchParams.get('onlyFavorites') === 'true',
      onlyWeak: searchParams.get('onlyWeak') === 'true',
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '100', 10),
    };

    const result = await getFilteredFlashcardsAsync(filterParams);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API /api/flashcards GET error]:', error);
    return NextResponse.json({ error: 'Failed to fetch flashcards', message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.front && !body.title) {
      return NextResponse.json({ error: 'Flashcard prompt/front/title is required' }, { status: 400 });
    }

    const createdCard = await createDatabaseFlashcard(body);
    return NextResponse.json({ success: true, card: createdCard }, { status: 201 });
  } catch (error: any) {
    console.error('[API /api/flashcards POST error]:', error);
    return NextResponse.json({ error: 'Failed to create flashcard', message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'Flashcard ID is required for update' }, { status: 400 });
    }

    await updateDatabaseFlashcard(id, updates);
    return NextResponse.json({ success: true, message: `Flashcard ${id} updated successfully` });
  } catch (error: any) {
    console.error('[API /api/flashcards PUT error]:', error);
    return NextResponse.json({ error: 'Failed to update flashcard', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Flashcard ID parameter is required' }, { status: 400 });
    }

    await deleteDatabaseFlashcard(id);
    return NextResponse.json({ success: true, message: `Flashcard ${id} deleted successfully` });
  } catch (error: any) {
    console.error('[API /api/flashcards DELETE error]:', error);
    return NextResponse.json({ error: 'Failed to delete flashcard', message: error.message }, { status: 500 });
  }
}
