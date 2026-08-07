import { NextRequest, NextResponse } from 'next/server';
import { getFilteredFlashcards } from '@/lib/flashcard-bank';

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
      limit: parseInt(searchParams.get('limit') || '20', 10),
    };

    const result = getFilteredFlashcards(filterParams);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch flashcards', message: error.message }, { status: 500 });
  }
}
