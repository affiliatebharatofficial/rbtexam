import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT_TEMPLATES } from '@/lib/ai-prompt-manager';
import { requireAdminAuth } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  return NextResponse.json(SYSTEM_PROMPT_TEMPLATES);
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = (await request.json()) as any;
    const { id, systemPrompt, provider, model, temperature } = body;

    const index = SYSTEM_PROMPT_TEMPLATES.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Prompt template not found' }, { status: 404 });
    }

    SYSTEM_PROMPT_TEMPLATES[index] = {
      ...SYSTEM_PROMPT_TEMPLATES[index],
      systemPrompt: systemPrompt || SYSTEM_PROMPT_TEMPLATES[index].systemPrompt,
      provider: provider || SYSTEM_PROMPT_TEMPLATES[index].provider,
      model: model || SYSTEM_PROMPT_TEMPLATES[index].model,
      temperature: temperature !== undefined ? temperature : SYSTEM_PROMPT_TEMPLATES[index].temperature,
      version: SYSTEM_PROMPT_TEMPLATES[index].version + 1,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, template: SYSTEM_PROMPT_TEMPLATES[index] });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update prompt template' }, { status: 500 });
  }
}
