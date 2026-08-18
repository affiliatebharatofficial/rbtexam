import { NextRequest, NextResponse } from 'next/server';
import { executeAIQuestionGeneration } from '@/lib/ai-question-generator-engine';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const {
      topicPrompt,
      certification,
      category,
      subCategory,
      difficulty,
      questionType,
      count,
      bacbTaskCode,
      provider,
      apiKey,
      isPremium,
    } = body;

    const targetTopic = (topicPrompt || '').toString().trim();
    if (!targetTopic) {
      return NextResponse.json(
        { success: false, error: 'Topic Prompt / Concept Description is required.' },
        { status: 400 }
      );
    }

    const certLevel = certification || 'RBT';
    const diff = difficulty || 'medium';
    const qType = questionType || 'scenario_based';
    const quantity = Math.min(50, Math.max(1, parseInt(count) || 3));
    const taskCode = bacbTaskCode || 'A-01';

    const result = await executeAIQuestionGeneration({
      topicPrompt: targetTopic,
      certification: certLevel,
      category: category,
      subCategory: subCategory,
      difficulty: diff,
      questionType: qType,
      count: quantity,
      bacbTaskCode: taskCode,
      provider: provider || 'auto',
      apiKey: apiKey || undefined,
      isPremium: Boolean(isPremium),
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'AI Question Generation failed',
          providerUsed: result.providerUsed,
          modelUsed: result.modelUsed,
          latencyMs: result.latencyMs,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('AI Question Generation API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Server error during AI Question Generation',
      },
      { status: 500 }
    );
  }
}
