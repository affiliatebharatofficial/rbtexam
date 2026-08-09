import { NextRequest, NextResponse } from 'next/server';
import { exportQuestionsToCSV, MASTER_QUESTION_BANK } from '@/lib/master-question-bank';
import { bulkDeleteServerQuestions, bulkUpdateServerStatus } from '@/lib/master-question-bank-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids, status } = body;

    if (action === 'export') {
      const csv = exportQuestionsToCSV(MASTER_QUESTION_BANK);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="master_questions_export.csv"',
        },
      });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Array of question IDs required for bulk operations' }, { status: 400 });
    }

    if (action === 'update_status') {
      const count = bulkUpdateServerStatus(ids, status);
      return NextResponse.json({ success: true, updatedCount: count, status });
    }

    if (action === 'delete') {
      const count = bulkDeleteServerQuestions(ids);
      return NextResponse.json({ success: true, deletedCount: count });
    }

    return NextResponse.json({ error: 'Invalid bulk action specified' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Bulk action failed', message: error.message }, { status: 500 });
  }
}
