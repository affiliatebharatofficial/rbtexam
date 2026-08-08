import { importBulkFlashcards, deleteDatabaseFlashcardBulk, fetchDatabaseFlashcards } from '../lib/flashcard-bank';

async function testBulkDelete() {
  console.log('====================================================');
  console.log('TESTING MULTI-SELECT BULK DELETE FOR FLASHCARDS');
  console.log('====================================================');

  console.log('1. Inserting 3 sample test flashcards...');
  const sampleCards = [
    { title: 'Bulk Test Card #1', front: 'Front #1', back: 'Back #1', category: 'Measurement' },
    { title: 'Bulk Test Card #2', front: 'Front #2', back: 'Back #2', category: 'Assessment' },
    { title: 'Bulk Test Card #3', front: 'Front #3', back: 'Back #3', category: 'Skill Acquisition' },
  ];

  const insertRes = await importBulkFlashcards(sampleCards);
  console.log(`Inserted ${insertRes.insertedCount} cards. IDs:`, insertRes.insertedIds);

  console.log('\n2. Verifying inserted cards exist in Supabase database...');
  const allCards = await fetchDatabaseFlashcards();
  const foundInserted = allCards.filter((c) => insertRes.insertedIds.includes(c.id));
  console.log(`Found ${foundInserted.length} / ${insertRes.insertedIds.length} inserted cards in DB.`);

  console.log('\n3. Executing bulk deletion for all 3 cards...');
  await deleteDatabaseFlashcardBulk(insertRes.insertedIds);
  console.log('Bulk delete operation executed successfully.');

  console.log('\n4. Verifying deleted cards are gone from database...');
  const afterDeleteCards = await fetchDatabaseFlashcards();
  const remainingInserted = afterDeleteCards.filter((c) => insertRes.insertedIds.includes(c.id));
  console.log(`Remaining inserted cards count in DB: ${remainingInserted.length} (Expected: 0).`);

  if (remainingInserted.length === 0) {
    console.log('====================================================');
    console.log('✅ LIVE BULK DELETE TEST PASSED SUCCESSFULLY!');
    console.log('====================================================');
  } else {
    console.error('❌ BULK DELETE TEST FAILED! Cards still present in DB.');
    process.exit(1);
  }
}

testBulkDelete().catch((err) => {
  console.error('Fatal error testing live bulk delete:', err);
  process.exit(1);
});
