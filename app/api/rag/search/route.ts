import { NextRequest, NextResponse } from 'next/server';
import { ragSearch } from '@/lib/rag-engine';
import { RAGSearchQuery, CertificationTarget, DifficultyLevel } from '@/types/rag-engine';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const { query, userId, certification, category, difficulty, topK } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'query is required and must be a non-empty string.' }, { status: 400 });
    }

    const searchQuery: RAGSearchQuery = {
      query: query.trim().slice(0, 512), // guard against extremely long queries
      userId,
      certification: certification as CertificationTarget,
      category,
      difficulty: difficulty as DifficultyLevel,
      topK: topK ? Math.min(Number(topK), 10) : 5,
    };

    const result = ragSearch(searchQuery);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: 'RAG search failed', details: error.message }, { status: 500 });
  }
}
