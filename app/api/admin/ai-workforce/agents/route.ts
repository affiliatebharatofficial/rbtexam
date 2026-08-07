import { NextRequest, NextResponse } from 'next/server';
import { getAllAIAgents, updateAgentModelRouting } from '@/lib/ai-workforce-engine';
import { AgentRole, AIModelProvider, ModelName } from '@/types/ai-workforce';

export async function GET() {
  try {
    const agents = getAllAIAgents();
    return NextResponse.json({ success: true, count: agents.length, agents });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch AI workforce agents' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
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
