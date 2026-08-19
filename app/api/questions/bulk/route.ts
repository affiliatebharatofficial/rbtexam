import { NextRequest, NextResponse } from 'next/server';
import { exportQuestionsToCSV } from '@/lib/master-question-bank';
import { normalizeQuestionForComparison } from '@/lib/question-import-engine';
import { getSupabaseAdminClient } from '@/lib/supabase';
import {
  loadServerPersistentQuestionsAsync,
  bulkDeleteServerQuestionsAsync,
  bulkUpdateServerStatusAsync,
  batchCreateServerQuestionsAsync,
} from '@/lib/master-question-bank-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { action, ids, status, questions } = body;

    if (action === 'export') {
      const allQuestions = await loadServerPersistentQuestionsAsync(200);
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

      const adminDb = getSupabaseAdminClient();
      // Targeted query for existing stems to avoid loading entire entities into memory
      const { data: existingRows } = await adminDb
        .from('master_questions')
        .select('question_text')
        .is('deleted_at', null);

      const existingNormalizedStems = new Set<string>(
        (existingRows || []).map((r: any) => normalizeQuestionForComparison(r.question_text || '')).filter(Boolean)
      );

      const questionsToInsert: any[] = [];
      let skippedDuplicatesCount = 0;

      for (const q of questions) {
        const norm = normalizeQuestionForComparison(q.question || q.question_text || '');
        if (norm && existingNormalizedStems.has(norm)) {
          skippedDuplicatesCount++;
          continue;
        }

        questionsToInsert.push(q);
        if (norm) existingNormalizedStems.add(norm);
      }

      const result = await batchCreateServerQuestionsAsync(questionsToInsert);

      if (result.error && result.insertedCount === 0) {
        return NextResponse.json(
          {
            success: false,
            error: result.error,
            importedCount: 0,
            skippedDuplicatesCount,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: result.insertedCount > 0 || questionsToInsert.length === 0,
        importedCount: result.insertedCount,
        skippedDuplicatesCount,
        ...(result.error ? { warning: result.error } : {}),
      });
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

