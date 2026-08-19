import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase';
import { mapDbRowToMasterQuestion, createServerQuestionAsync } from '@/lib/master-question-bank-server';
import { normalizeQuestionForComparison } from '@/lib/question-import-engine';
import { QuestionFilterParams, MasterQuestion } from '@/types/master-question';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || undefined;
    const certification = searchParams.get('certification') || 'ALL';
    const category = searchParams.get('category') || 'ALL';
    const difficulty = searchParams.get('difficulty') || 'ALL';
    const status = searchParams.get('status') || 'ALL';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const rawLimit = parseInt(searchParams.get('limit') || '10', 10);
    // Cap page limit to 200 items max to prevent Worker CPU & memory exhaustion
    const limit = Math.min(Math.max(rawLimit, 1), 200);
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const adminDb = getSupabaseAdminClient();
    let query = adminDb
      .from('master_questions')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    if (certification !== 'ALL') {
      query = query.eq('certification', certification);
    }

    if (category !== 'ALL') {
      const cleanCat = category.trim().toLowerCase();
      if (cleanCat.includes('assessment') || cleanCat.includes('domain b')) {
        query = query.or('category.ilike.%Assessment%,category.ilike.%Domain B%');
      } else if (cleanCat.includes('measurement') || cleanCat.includes('domain a')) {
        query = query.or('category.ilike.%Measurement%,category.ilike.%Domain A%');
      } else if (cleanCat.includes('acquisition') || cleanCat.includes('domain c')) {
        query = query.or('category.ilike.%Acquisition%,category.ilike.%Domain C%');
      } else if (cleanCat.includes('reduction') || cleanCat.includes('domain d')) {
        query = query.or('category.ilike.%Reduction%,category.ilike.%Domain D%');
      } else if (cleanCat.includes('documentation') || cleanCat.includes('domain e')) {
        query = query.or('category.ilike.%Documentation%,category.ilike.%Domain E%');
      } else if (cleanCat.includes('ethics') || cleanCat.includes('domain f')) {
        query = query.or('category.ilike.%Ethics%,category.ilike.%Domain F%');
      } else {
        query = query.eq('category', category);
      }
    }

    if (difficulty !== 'ALL') {
      query = query.eq('difficulty', difficulty);
    }

    if (status !== 'ALL') {
      query = query.eq('status', status);
    }

    if (search && search.trim() !== '') {
      const term = `%${search.trim().toLowerCase()}%`;
      query = query.or(`question_text.ilike.${term},scenario_text.ilike.${term},question_code.ilike.${term},category.ilike.${term}`);
    }

    const sortColumn = sortBy === 'createdAt' ? 'created_at' : sortBy === 'question' ? 'question_text' : sortBy;
    const startIndex = (page - 1) * limit;

    query = query.order(sortColumn, { ascending: sortOrder === 'asc' });
    query = query.range(startIndex, startIndex + limit - 1);

    const { data: dbRows, count, error } = await query;

    if (error) {
      console.error('Supabase GET /api/questions query error:', error.message);
      return NextResponse.json({ error: 'Failed to fetch questions from database', message: error.message }, { status: 500 });
    }

    const questions: MasterQuestion[] = (dbRows || []).map(mapDbRowToMasterQuestion);
    const total = count ?? questions.length;
    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      data: questions,
      total,
      page,
      limit,
      pageSize: limit,
      totalPages,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch questions', message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;

    if (!body.question || !body.certification || !body.options) {
      return NextResponse.json({ error: 'Missing mandatory fields: question, certification, options' }, { status: 400 });
    }

    const norm = normalizeQuestionForComparison(body.question);
    const adminDb = getSupabaseAdminClient();
    const { data: existingRows } = await adminDb
      .from('master_questions')
      .select('question_text')
      .is('deleted_at', null);

    const isDuplicate = (existingRows || []).some(
      (r: any) => normalizeQuestionForComparison(r.question_text || '') === norm
    );

    if (isDuplicate) {
      return NextResponse.json({ error: 'Duplicate question prompt detected. A question with this text already exists in the master item bank.' }, { status: 409 });
    }

    const created = await createServerQuestionAsync(body);
    return NextResponse.json({ success: true, question: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create question', message: error.message }, { status: 500 });
  }
}
