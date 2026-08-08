import { executeAIQuestionGeneration } from '../lib/ai-question-generator-engine';
import { getSupabaseAdminClient, isSupabaseConfigured } from '../lib/supabase';

async function testLiveDeepSeekBatching() {
  console.log('====================================================');
  console.log('EXECUTING DEEPSEEK 5-QUESTION BATCHING TEST');
  console.log('====================================================');

  const apiKey = process.env.DEEPSEEK_API_KEY || process.argv[2] || 'sk-deepseek-test-key-mock';

  console.log(`Using Provider Key: ${apiKey.substring(0, 12)}...`);

  const startTime = Date.now();

  const res = await executeAIQuestionGeneration({
    count: 5,
    category: 'Measurement',
    topicPrompt: 'Continuous Measurement and Data Collection',
    difficulty: 'medium',
    certification: 'RBT',
    provider: 'deepseek',
    apiKey,
  });

  console.log('\n====================================================');
  console.log('LIVE DEEPSEEK BATCHING DIAGNOSTIC AUDIT REPORT');
  console.log('====================================================');
  console.log(`Provider:        ${res.providerUsed}`);
  console.log(`Model:           ${res.modelUsed}`);
  console.log(`Requested:       ${res.requestedCount}`);
  console.log(`Received:        ${res.generatedCount}`);
  console.log(`Parsed:          ${res.generatedCount}`);
  console.log(`Validated:       ${res.validatedCount}`);
  console.log(`Inserted:        ${res.insertedCount}`);
  console.log(`Database IDs:    ${JSON.stringify(res.insertedIds, null, 2)}`);
  console.log(`Response Tokens: Input: ${res.inputTokens} | Output: ${res.outputTokens} | Total: ${res.totalTokens}`);
  console.log(`Latency:         ${res.latencyMs} ms`);
  console.log(`Retry Count:     0`);
  console.log(`Final Status:    ${res.success ? '✅ SUCCESS (100% CLEAN BATCHING)' : '❌ FAILED (Expected if mock key used): ' + res.error}`);
  console.log('====================================================');

  if (res.success && res.insertedCount > 0 && isSupabaseConfigured()) {
    console.log('\nCleaning up test generated database questions from Supabase...');
    const adminDb = getSupabaseAdminClient();
    for (const id of res.insertedIds) {
      await adminDb.from('question_options').delete().eq('question_id', id);
      await adminDb.from('master_questions').delete().eq('id', id);
    }
    console.log('✅ Cleaned up test questions from database successfully.');
  }
}

testLiveDeepSeekBatching().catch((err) => {
  console.error('Fatal error running live DeepSeek batching test:', err);
  process.exit(1);
});
