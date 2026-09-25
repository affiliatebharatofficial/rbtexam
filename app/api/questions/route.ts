import { NextRequest, NextResponse } from 'next/server';
import { d1Query, d1QueryFirst, isD1Available } from '@/lib/d1';
import { mapDbRowToMasterQuestion, createServerQuestionAsync } from '@/lib/master-question-bank-server';
import { QuestionFilterParams, MasterQuestion } from '@/types/master-question';
import { isValidCertification } from '@/lib/certifications-config';
import { MASTER_QUESTION_BANK } from '@/lib/master-question-bank';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || undefined;
    const rawCert = searchParams.get('certification') || 'ALL';
    const certification = rawCert !== 'ALL' && isValidCertification(rawCert) ? rawCert : rawCert === 'ALL' ? 'ALL' : 'RBT';
    const category = searchParams.get('category') || 'ALL';
    const difficulty = searchParams.get('difficulty') || 'ALL';
    const status = searchParams.get('status') || 'ALL';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const rawLimit = parseInt(searchParams.get('limit') || '10', 10);
    const limit = Math.min(Math.max(rawLimit, 1), 200);
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const startIndex = (page - 1) * limit;

    let questions: MasterQuestion[] = [];
    let total = 0;

    // 1. Query Cloudflare D1 Native Database
    if (isD1Available()) {
      try {
        let sql = 'SELECT * FROM master_questions WHERE deleted_at IS NULL';
        let countSql = 'SELECT COUNT(*) as cnt FROM master_questions WHERE deleted_at IS NULL';
        const params: any[] = [];
        const countParams: any[] = [];

        if (certification !== 'ALL') {
          sql += ' AND certification = ?';
          countSql += ' AND certification = ?';
          params.push(certification);
          countParams.push(certification);
        }

        if (category !== 'ALL') {
          sql += ' AND category LIKE ?';
          countSql += ' AND category LIKE ?';
          const catPattern = `%${category.trim()}%`;
          params.push(catPattern);
          countParams.push(catPattern);
        }

        if (difficulty !== 'ALL') {
          sql += ' AND difficulty = ?';
          countSql += ' AND difficulty = ?';
          params.push(difficulty);
          countParams.push(difficulty);
        }

        if (status !== 'ALL') {
          sql += ' AND status = ?';
          countSql += ' AND status = ?';
          params.push(status);
          countParams.push(status);
        }

        if (search && search.trim() !== '') {
          const term = `%${search.trim().toLowerCase()}%`;
          sql += ' AND (question_text LIKE ? OR scenario_text LIKE ? OR question_code LIKE ? OR category LIKE ?)';
          countSql += ' AND (question_text LIKE ? OR scenario_text LIKE ? OR question_code LIKE ? OR category LIKE ?)';
          params.push(term, term, term, term);
          countParams.push(term, term, term, term);
        }

        const validSortCol = sortBy === 'question' ? 'question_text' : 'created_at';
        sql += ` ORDER BY ${validSortCol} ${sortOrder === 'asc' ? 'ASC' : 'DESC'} LIMIT ? OFFSET ?`;
        params.push(limit, startIndex);

        const [dbRows, countResult] = await Promise.all([
          d1Query(sql, params),
          d1QueryFirst<{ cnt: number }>(countSql, countParams),
        ]);

        if (Array.isArray(dbRows) && dbRows.length > 0) {
          questions = dbRows.map(mapDbRowToMasterQuestion);
          total = countResult?.cnt ?? questions.length;
        }
      } catch (d1Err) {
        console.error('Error querying Cloudflare D1:', d1Err);
      }
    }

    // 2. High-Availability Fallback: Canonical In-Memory Bank
    if (questions.length === 0) {
      let fallbackPool = [...MASTER_QUESTION_BANK];

      if (certification !== 'ALL') {
        fallbackPool = fallbackPool.filter((q) => q.certification === certification);
      }
      if (category !== 'ALL') {
        const cleanCat = category.trim().toLowerCase();
        fallbackPool = fallbackPool.filter((q) => (q.category || '').toLowerCase().includes(cleanCat));
      }
      if (difficulty !== 'ALL') {
        fallbackPool = fallbackPool.filter((q) => q.difficulty === difficulty);
      }
      if (status !== 'ALL') {
        fallbackPool = fallbackPool.filter((q) => (q.status || 'published') === status);
      }
      if (search && search.trim() !== '') {
        const term = search.trim().toLowerCase();
        fallbackPool = fallbackPool.filter((q) =>
          (q.question || '').toLowerCase().includes(term) ||
          (q.scenarioText || '').toLowerCase().includes(term) ||
          (q.id || '').toLowerCase().includes(term) ||
          (q.category || '').toLowerCase().includes(term)
        );
      }

      total = fallbackPool.length;
      questions = fallbackPool.slice(startIndex, startIndex + limit);
    }

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

    const cleanPrompt = body.question.trim();

    // Check for exact duplicate in D1
    if (isD1Available()) {
      const existing = await d1QueryFirst(
        'SELECT id FROM master_questions WHERE question_text = ? AND deleted_at IS NULL LIMIT 1',
        [cleanPrompt]
      );
      if (existing) {
        return NextResponse.json({ error: 'Duplicate question prompt detected. A question with this text already exists in the master item bank.' }, { status: 409 });
      }
    }

    const created = await createServerQuestionAsync(body);
    return NextResponse.json({ success: true, question: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create question', message: error.message }, { status: 500 });
  }
}
