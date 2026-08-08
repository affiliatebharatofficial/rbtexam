/**
 * Live End-to-End Test for Admin AI Question Generator
 * Usage: npx tsx scripts/test-live-ai-generator.ts [optional_api_key] [optional_provider]
 */

import { executeAIQuestionGeneration } from '../lib/ai-question-generator-engine';

async function runLiveTest() {
  const customApiKey = process.argv[2] || process.env.TEST_AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.DEEPSEEK_API_KEY;
  const requestedProvider = process.argv[3] || 'auto';

  console.log('====================================================');
  console.log('LIVE END-TO-END TEST: Admin AI Question Generator');
  console.log('====================================================');
  console.log('Parameters:');
  console.log('  Questions Requested: 3');
  console.log('  Target Certification: RBT');
  console.log('  Topic: Measurement');
  console.log('  Difficulty: Medium');
  console.log('  Task Code: A-02');
  console.log(`  Provider: ${requestedProvider}`);
  console.log(`  Custom API Key Provided: ${customApiKey ? 'YES (' + customApiKey.substring(0, 7) + '...)' : 'NO'}`);
  console.log('----------------------------------------------------');

  const startTime = Date.now();
  const result = await executeAIQuestionGeneration({
    topicPrompt: 'Measurement',
    certification: 'RBT',
    category: 'Measurement',
    difficulty: 'medium',
    questionType: 'scenario_based',
    count: 3,
    bacbTaskCode: 'A-02',
    provider: requestedProvider,
    apiKey: customApiKey || undefined,
  });

  const totalTime = Date.now() - startTime;

  console.log(`Status: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.log(`Provider Used: ${result.providerUsed}`);
  console.log(`Model Used: ${result.modelUsed}`);
  console.log(`Questions Requested: ${result.requestedCount}`);
  console.log(`Questions Generated: ${result.generatedCount}`);
  console.log(`Questions Validated: ${result.validatedCount}`);
  console.log(`Questions Inserted into DB: ${result.insertedCount}`);
  console.log(`Database Inserted IDs:`, result.insertedIds);
  console.log(`API Response Time: ${result.latencyMs || totalTime} ms`);
  console.log(`Token Usage: Input ${result.inputTokens} | Output ${result.outputTokens} | Total ${result.totalTokens}`);
  console.log(`Estimated Cost: $${result.estimatedCostUSD ? result.estimatedCostUSD.toFixed(6) : '0.000000'}`);
  console.log(`Fallback Used: ${result.fallbackUsed ? 'YES' : 'NO'}`);

  if (!result.success) {
    console.log(`\nFailure Details: ${result.error}`);
  } else {
    console.log('\nSample Generated & Validated Question #1:');
    console.log(JSON.stringify(result.questions[0], null, 2));
  }
  console.log('====================================================');
}

runLiveTest().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
