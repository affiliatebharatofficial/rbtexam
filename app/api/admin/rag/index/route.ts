import { NextRequest, NextResponse } from 'next/server';
import { getRAGEngineMetrics, getAllKnowledgeChunks, getEmbeddingQueue } from '@/lib/rag-engine';
import { requireAdminAuth } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const metrics = getRAGEngineMetrics();
    const chunks = getAllKnowledgeChunks().slice(0, 20); // paginate in production
    const queue = getEmbeddingQueue().slice(0, 10);
    return NextResponse.json({ success: true, metrics, chunks, queue });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch knowledge index' }, { status: 500 });
  }
}
