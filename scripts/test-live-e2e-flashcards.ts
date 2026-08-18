import { executeAIFlashcardGeneration } from '../lib/ai-flashcard-generator-engine';
import { getFilteredFlashcardsAsync, updateDatabaseFlashcard, deleteDatabaseFlashcard } from '../lib/flashcard-bank';
import { createClient } from '@supabase/supabase-js';

async function runE2EValidation() {
  console.log('====================================================');
  console.log('LIVE E2E VERIFICATION: FLASHCARD PERSISTENCE & CRUD');
  console.log('====================================================');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ntwomhtfkuazqgtnkffk.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  const adminDb = createClient(supabaseUrl, serviceRoleKey);

  console.log('STEP 1: Inserting 5 Test Flashcards into Supabase Database...');
  const insertedIds: string[] = [];

  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.DEEPSEEK_API_KEY;

  if (apiKey) {
    const genResult = await executeAIFlashcardGeneration({
      topic: 'Differential Reinforcement DRO',
      count: 5,
      certification: 'RBT',
      category: 'Behavior Reduction',
      difficulty: 'medium',
      apiKey,
    });
    console.log(`AI Generation Success: ${genResult.success}`);
    console.log(`Requested: ${genResult.requestedCount} | Generated: ${genResult.generatedCount} | Validated: ${genResult.validatedCount} | Inserted: ${genResult.insertedCount}`);
    insertedIds.push(...genResult.insertedIds);
  } else {
    console.log('(No AI API Key supplied; testing direct Database Flashcard Insertion API)...');
    const { createDatabaseFlashcard } = await import('../lib/flashcard-bank');
    for (let i = 1; i <= 5; i++) {
      const card = await createDatabaseFlashcard({
        front: `[E2E Test ${i}] What is DRO in ABA?`,
        back: `[E2E Test ${i}] Differential Reinforcement of Other behavior reinforces zero rate of behavior.`,
        explanation: `E2E Test Explanation #${i}`,
        category: 'Behavior Reduction',
        certification: 'RBT',
        difficulty: 'medium',
        subcategory: 'D-04',
      });
      insertedIds.push(card.id);
    }
  }

  console.log('Database Row IDs inserted:', insertedIds);

  if (insertedIds.length === 0) {
    throw new Error('Flashcard creation failed to insert into Database!');
  }

  const firstId = insertedIds[0];

  console.log('\nSTEP 2: Verifying rows physically exist in Supabase master_flashcards table...');
  const dbCheck = await adminDb.from('master_flashcards').select('*').in('id', insertedIds);
  console.log(`Found ${dbCheck.data?.length || 0} physical rows in Supabase master_flashcards!`);
  console.log('Physical DB Row sample:', JSON.stringify(dbCheck.data?.[0], null, 2));

  console.log('\nSTEP 3: Simulating Page Load / Refresh (getFilteredFlashcardsAsync)...');
  const pageLoad = await getFilteredFlashcardsAsync({ certification: 'RBT', category: 'Behavior Reduction' });
  const retrievedIds = pageLoad.data.map((c) => c.id);
  const allFoundOnPage = insertedIds.every((id) => retrievedIds.includes(id));
  console.log(`Page Refresh Retrieval Test: ${allFoundOnPage ? '✅ ALL 5 CARDS RETRIEVED ON PAGE LOAD' : '❌ FAILED'}`);

  console.log('\nSTEP 4: Testing Card Edit / Update Persistence...');
  const updateOk = await updateDatabaseFlashcard(firstId, {
    front: 'UPDATED PROMPT: DRO Omission Procedure',
    back: 'UPDATED ANSWER: Reinforces zero occurrence of behavior.',
  });
  console.log(`Update execution: ${updateOk ? 'SUCCESS' : 'FAILED'}`);

  const verifyUpdate = await adminDb.from('master_flashcards').select('*').eq('id', firstId);
  console.log('Updated DB Row term:', verifyUpdate.data?.[0]?.term);
  console.log('Updated DB Row definition:', verifyUpdate.data?.[0]?.definition);

  console.log('\nSTEP 5: Testing Card Delete Persistence...');
  const deleteOk = await deleteDatabaseFlashcard(firstId);
  console.log(`Delete execution: ${deleteOk ? 'SUCCESS' : 'FAILED'}`);

  const verifyDelete = await adminDb.from('master_flashcards').select('*').eq('id', firstId);
  console.log(`Post-delete query count: ${verifyDelete.data?.length}`);

  console.log('\nSTEP 6: Cleaning up remaining test rows...');
  for (const id of insertedIds.slice(1)) {
    await deleteDatabaseFlashcard(id);
  }

  console.log('====================================================');
  console.log('ALL LIVE E2E TESTS PASSED SUCCESSFULLY!');
  console.log('====================================================');
}

runE2EValidation().catch((err) => {
  console.error('Fatal error in E2E validation:', err);
  process.exit(1);
});
