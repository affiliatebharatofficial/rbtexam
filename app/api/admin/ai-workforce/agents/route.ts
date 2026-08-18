import { NextRequest, NextResponse } from 'next/server';
import { getAllAIAgents, updateAgentModelRouting } from '@/lib/ai-workforce-engine';
import { AgentRole, AIModelProvider, ModelName } from '@/types/ai-workforce';
import { requireAdminAuth } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const agents = getAllAIAgents();
    return NextResponse.json({ success: true, count: agents.length, agents });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch AI workforce agents' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { role, modelProvider, modelName } = body;

    if (!role || !modelProvider || !modelName) {
      return NextResponse.json({ error: 'role, modelProvider, and modelName are required.' }, { status: 400 });
    }

    const updated = updateAgentModelRouting(
      role as AgentRole,
      modelProvider as AIModelProvider,
      modelName as ModelName
    );

    if (!updated) {
      return NextResponse.json({ error: `Agent with role "${role}" not found.` }, { status: 404 });
    }

    return NextResponse.json({ success: true, agent: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update agent model routing' }, { status: 500 });
  }
}
