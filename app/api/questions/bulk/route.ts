import { NextRequest, NextResponse } from 'next/server';
import { exportQuestionsToCSV } from '@/lib/master-question-bank';
import { normalizeQuestionForComparison } from '@/lib/question-import-engine';
import { getSupabaseAdminClient } from '@/lib/supabase';
import {
  loadServerPersistentQuestionsAsync,
  bulkDeleteServerQuestionsAsync,
  bulkUpdateServerStatusAsync,
  batchCreateServerQuestionsAsync,
  getAllQuestionStemsAsync,
} from '@/lib/master-question-bank-server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { action, ids, status, questions, limit = 200 } = body;

    if (action === 'export') {
      const allQuestions = await loadServerPersistentQuestionsAsync(limit);
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

      // 1. In-batch deduplication
      const seenInBatch = new Set<string>();
      const batchUniqueQuestions: any[] = [];
      let skippedDuplicatesCount = 0;

      for (const q of questions) {
        const norm = normalizeQuestionForComparison(q.question || q.question_text || '');
        if (norm) {
          if (seenInBatch.has(norm)) {
            skippedDuplicatesCount++;
            continue;
          }
          seenInBatch.add(norm);
        }
        batchUniqueQuestions.push(q);
      }

      // 2. Fetch existing stems safely with max limit to verify duplicates
      const existingStems = await getAllQuestionStemsAsync(500);
      const existingSet = new Set<string>(
        existingStems.map((s) => normalizeQuestionForComparison(s)).filter(Boolean)
      );

      const questionsToInsert = batchUniqueQuestions.filter((q) => {
        const norm = normalizeQuestionForComparison(q.question || q.question_text || '');
        if (norm && existingSet.has(norm)) {
          skippedDuplicatesCount++;
          return false;
        }
        return true;
      });

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

