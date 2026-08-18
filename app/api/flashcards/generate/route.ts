import { NextRequest, NextResponse } from 'next/server';
import { executeAIFlashcardGeneration, FlashcardGenerationInputParams } from '@/lib/ai-flashcard-generator-engine';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as any;
    const {
      topic,
      certification = 'RBT',
      category = 'Measurement',
      subtopic,
      difficulty = 'medium',
      count = 5,
      provider = 'auto',
      apiKey,
      language = 'English',
      isPremium = false,
      sourceContext,
      adminUserId,
    } = body;

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return NextResponse.json({ error: 'Topic string is required to generate AI flashcards' }, { status: 400 });
    }

    const params: FlashcardGenerationInputParams = {
      topic: topic.trim(),
      certification,
      category,
      subtopic,
      difficulty,
      count: Number(count) || 5,
      provider,
      apiKey,
      language,
      isPremium,
      sourceContext,
      adminUserId,
    };

    console.log(`[API /api/flashcards/generate] Starting AI flashcard generation for "${params.topic}" (${params.certification}, ${params.count} cards, provider: ${params.provider})`);

    const result = await executeAIFlashcardGeneration(params);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to generate AI flashcards',
          providerUsed: result.providerUsed,
          modelUsed: result.modelUsed,
          batches: result.batches,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      cards: result.flashcards,
      generatedCount: result.generatedCount,
      validatedCount: result.validatedCount,
      insertedCount: result.insertedCount,
      duplicateCount: result.duplicateCount,
      insertedIds: result.insertedIds,
      providerUsed: result.providerUsed,
      modelUsed: result.modelUsed,
      latencyMs: result.latencyMs,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      totalTokens: result.totalTokens,
      estimatedCostUSD: result.estimatedCostUSD,
      fallbackUsed: result.fallbackUsed,
      batchCount: result.batchCount,
      batches: result.batches,
      topic: params.topic,
      certification: params.certification,
    });
  } catch (error: any) {
    console.error('[API /api/flashcards/generate] Unhandled exception:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate AI flashcards' }, { status: 500 });
  }
}
