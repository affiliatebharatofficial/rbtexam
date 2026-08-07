import { NextRequest, NextResponse } from 'next/server';
import { executeOrchestrationPipeline } from '@/lib/ai-workforce-engine';
import { AgentRole, WorkQueueType } from '@/types/ai-workforce';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pipelineRoles, payload, queueType } = body;

    if (!Array.isArray(pipelineRoles) || pipelineRoles.length === 0) {
      return NextResponse.json(
        { error: 'pipelineRoles must be a non-empty array of AgentRole strings.' },
        { status: 400 }
      );
    }

    const job = executeOrchestrationPipeline(
      pipelineRoles as AgentRole[],
      payload || {},
      (queueType as WorkQueueType) || 'content_queue'
    );

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ error: 'Multi-agent orchestration failed', details: error.message }, { status: 500 });
  }
}
