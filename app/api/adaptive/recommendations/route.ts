import { NextRequest, NextResponse } from 'next/server';
import { generateSmartRecommendations } from '@/lib/adaptive-learning-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const certification = (searchParams.get('certification') as any) || 'RBT';

    const recommendations = generateSmartRecommendations(certification);
    return NextResponse.json({ success: true, recommendations });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch smart recommendations' }, { status: 500 });
  }
}
