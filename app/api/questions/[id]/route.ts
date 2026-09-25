import { NextRequest, NextResponse } from 'next/server';
import { fetchQuestionByIdOrCodeAsync, updateServerQuestionAsync, deleteServerQuestionAsync } from '@/lib/master-question-bank-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const question = await fetchQuestionByIdOrCodeAsync(id);

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    return NextResponse.json(question);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to retrieve question' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as any;

    const updated = await updateServerQuestionAsync(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Question not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, question: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update question', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = await deleteServerQuestionAsync(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Question not found or delete failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Question deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete question', message: error.message }, { status: 500 });
  }
}
