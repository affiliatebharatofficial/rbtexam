import { NextRequest, NextResponse } from 'next/server';
import { getCandidateAdaptiveProfile } from '@/lib/adaptive-learning-engine';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default_user';
    const certification = (searchParams.get('certification') as any) || 'RBT';

    const profile = getCandidateAdaptiveProfile(userId, certification);
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch adaptive learning profile' }, { status: 500 });
  }
}
