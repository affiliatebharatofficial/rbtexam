import { NextRequest, NextResponse } from 'next/server';
import { exportQuestionsToCSV } from '@/lib/master-question-bank';
import {
  loadServerPersistentQuestionsAsync,
  bulkDeleteServerQuestionsAsync,
  bulkUpdateServerStatusAsync,
  createServerQuestionAsync,
} from '@/lib/master-question-bank-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids, status, questions } = body;

    if (action === 'export') {
      const allQuestions = await loadServerPersistentQuestionsAsync();
      const csv = exportQuestionsToCSV(allQuestions);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="master_questions_export.csv"',
        },
      });
    }

    if (action === 'import') {
      if (!Array.isArray(questions) || questions.length === 0) {
        return NextResponse.json({ error: 'Array of questions required for import' }, { status: 400 });
      }

      let count = 0;
      for (const q of questions) {
        await createServerQuestionAsync(q);
        count++;
      }
      return NextResponse.json({ success: true, importedCount: count });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Array of question IDs required for bulk operations' }, { status: 400 });
    }

    if (action === 'update_status') {
      const count = await bulkUpdateServerStatusAsync(ids, status);
      return NextResponse.json({ success: true, updatedCount: count, status });
    }

    if (action === 'delete') {
      const count = await bulkDeleteServerQuestionsAsync(ids);
      return NextResponse.json({ success: true, deletedCount: count });
    }

    return NextResponse.json({ error: 'Invalid bulk action specified' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Bulk action failed', message: error.message }, { status: 500 });
  }
}
