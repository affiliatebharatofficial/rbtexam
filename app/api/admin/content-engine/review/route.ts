import { NextRequest, NextResponse } from 'next/server';
import { updateDraftReviewStatus } from '@/lib/ai-content-engine';
import { requireAdminAuth } from '@/lib/server-auth';

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { draftId, status, reviewerNotes } = body;

    if (!draftId || !status) {
      return NextResponse.json({ error: 'draftId and status are required' }, { status: 400 });
    }

    const updated = updateDraftReviewStatus(draftId, status, reviewerNotes);
    if (!updated) {
      return NextResponse.json({ error: 'Content draft not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, draft: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update review status' }, { status: 500 });
  }
}
