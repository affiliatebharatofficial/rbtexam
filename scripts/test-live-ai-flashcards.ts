/**
 * Live End-to-End Test for Admin AI Flashcard Generator
 * Usage: npx tsx scripts/test-live-ai-flashcards.ts [optional_api_key] [optional_provider]
 */

import { executeAIFlashcardGeneration } from '../lib/ai-flashcard-generator-engine';

async function runLiveFlashcardTest() {
  const customApiKey = process.argv[2] || process.env.TEST_AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OPENROUTER_API_KEY;
  const requestedProvider = process.argv[3] || 'auto';

  console.log('====================================================');
  console.log('LIVE END-TO-END TEST: Admin AI Flashcard Generator');
  console.log('====================================================');
  console.log('Parameters:');
  console.log('  Flashcards Requested: 5');
  console.log('  Target Certification: RBT');
  console.log('  Topic: Positive Reinforcement');
  console.log('  Category: Skill Acquisition');
  console.log('  Difficulty: Medium');
  console.log(`  Provider: ${requestedProvider}`);
  console.log(`  API Key Provided: ${customApiKey ? 'YES (' + customApiKey.substring(0, 7) + '...)' : 'NO'}`);
  console.log('----------------------------------------------------');

  const startTime = Date.now();
  const result = await executeAIFlashcardGeneration({
    topic: 'Positive Reinforcement',
    certification: 'RBT',
    category: 'Skill Acquisition',
    difficulty: 'medium',
    count: 5,
    provider: requestedProvider,
    apiKey: customApiKey || undefined,
  });

  const totalTime = Date.now() - startTime;

  console.log(`Status: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.log(`Provider Used: ${result.providerUsed}`);
  console.log(`Model Used: ${result.modelUsed}`);
  console.log(`Flashcards Requested: ${result.requestedCount}`);
  console.log(`Flashcards Generated: ${result.generatedCount}`);
  console.log(`Flashcards Validated: ${result.validatedCount}`);
  console.log(`Flashcards Inserted into DB: ${result.insertedCount}`);
  console.log(`Duplicates Detected & Removed: ${result.duplicateCount}`);
  console.log(`Batches Processed: ${result.batchCount}`);
  console.log(`Failed Batches: ${result.failedBatchesCount}`);
  console.log(`Retries Executed: ${result.retriesCount}`);
  console.log(`Database Inserted IDs:`, result.insertedIds);
  console.log(`Response Latency: ${result.latencyMs || totalTime} ms`);
  console.log(`Token Usage: Input ${result.inputTokens} | Output ${result.outputTokens} | Total ${result.totalTokens}`);
  console.log(`Estimated Cost: $${result.estimatedCostUSD ? result.estimatedCostUSD.toFixed(6) : '0.000000'}`);
  console.log(`Fallback Used: ${result.fallbackUsed ? 'YES' : 'NO'}`);

  if (!result.success) {
    console.log(`\nFailure Reason: ${result.error}`);
  } else {
    console.log('\nSample Generated & Validated Flashcard #1:');
    console.log(JSON.stringify(result.flashcards[0], null, 2));
  }
  console.log('====================================================');
}

runLiveFlashcardTest().catch((err) => {
  console.error('Fatal error in live flashcard generator test:', err);
  process.exit(1);
});
