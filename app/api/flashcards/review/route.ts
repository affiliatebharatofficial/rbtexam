import { NextRequest, NextResponse } from 'next/server';
import { updateUserCardRating } from '@/lib/flashcard-bank';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { cardId, rating, userId } = body;

    if (!cardId || rating === undefined) {
      return NextResponse.json({ error: 'cardId and rating (1-4) are required' }, { status: 400 });
    }

    const updatedState = updateUserCardRating(cardId, rating, userId || 'default_user');
    return NextResponse.json({ success: true, updatedState });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to record flashcard review rating' }, { status: 500 });
  }
}
