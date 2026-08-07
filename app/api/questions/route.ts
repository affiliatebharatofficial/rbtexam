import { NextRequest, NextResponse } from 'next/server';
import { getFilteredQuestions, createQuestion } from '@/lib/master-question-bank';
import { QuestionFilterParams } from '@/types/master-question';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filterParams: QuestionFilterParams = {
      search: searchParams.get('search') || undefined,
      certification: (searchParams.get('certification') as any) || 'ALL',
      category: (searchParams.get('category') as any) || 'ALL',
      difficulty: (searchParams.get('difficulty') as any) || 'ALL',
      status: (searchParams.get('status') as any) || 'ALL',
      page: parseInt(searchParams.get('page') || '1', 10),
      limit: parseInt(searchParams.get('limit') || '10', 10),
      sortBy: (searchParams.get('sortBy') as any) || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
    };

    const result = getFilteredQuestions(filterParams);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch questions', message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.question || !body.certification || !body.options) {
      return NextResponse.json({ error: 'Missing mandatory fields: question, certification, options' }, { status: 400 });
    }

    const created = createQuestion(body);
    return NextResponse.json({ success: true, question: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create question', message: error.message }, { status: 500 });
  }
}
