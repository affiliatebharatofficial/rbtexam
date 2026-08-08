import { importBulkFlashcards, deleteDatabaseFlashcard, getFilteredFlashcardsAsync } from '../lib/flashcard-bank';

async function testPersistentDeletion() {
  console.log('====================================================');
  console.log('TESTING PERSISTENT FLASHCARD DELETION (NO REAPPEAR)');
  console.log('====================================================');

  console.log('1. Inserting 1 test card...');
  const res = await importBulkFlashcards([
    { title: 'Persistent Delete Test Card', front: 'Front', back: 'Back', category: 'Measurement' as any }
  ]);
  const cardId = res.insertedIds[0];
  console.log('Inserted Card ID:', cardId);

  console.log('\n2. Verifying card exists in initial query...');
  const initialData = await getFilteredFlashcardsAsync({ limit: 500 });
  const existsInitially = initialData.data.some((c) => c.id === cardId);
  console.log('Card exists in query initially:', existsInitially);

  console.log('\n3. Deleting card...');
  await deleteDatabaseFlashcard(cardId);
  console.log('Card deleted successfully.');

  console.log('\n4. Re-querying flashcards (simulating page refresh)...');
  const refreshedData = await getFilteredFlashcardsAsync({ limit: 500 });
  const existsAfterRefresh = refreshedData.data.some((c) => c.id === cardId);
  console.log('Card exists after refresh query:', existsAfterRefresh);

  if (existsInitially && !existsAfterRefresh) {
    console.log('====================================================');
    console.log('✅ PERSISTENT DELETION TEST PASSED! CARD STAYS DELETED!');
    console.log('====================================================');
  } else {
    console.error('❌ PERSISTENT DELETION TEST FAILED! Card reappeared.');
    process.exit(1);
  }
}

testPersistentDeletion().catch((err) => {
  console.error('Fatal error in persistent deletion test:', err);
  process.exit(1);
});
