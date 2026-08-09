import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { mapDbRowToMasterQuestion, updateServerQuestionAsync, deleteServerQuestionAsync } from '@/lib/master-question-bank-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const adminDb = getSupabaseAdminClient();

    const { data: dbRow, error } = await adminDb
      .from('master_questions')
      .select('*')
      .or(`question_code.eq.${id},id.eq.${id}`)
      .is('deleted_at', null)
      .maybeSingle();

    if (error || !dbRow) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const question = mapDbRowToMasterQuestion(dbRow);
    return NextResponse.json(question);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to retrieve question' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: any }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await request.json();

    const updated = await updateServerQuestionAsync(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Question not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, question: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update question', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: any }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const deleted = await deleteServerQuestionAsync(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Question not found or delete failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Question deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete question', message: error.message }, { status: 500 });
  }
}
