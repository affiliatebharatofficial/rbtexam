import { parseCSVFlashcards, importBulkFlashcards, convertQuestionsToDatabaseFlashcards, deleteDatabaseFlashcard } from '../lib/flashcard-bank';

async function testFeature() {
  console.log('====================================================');
  console.log('TESTING CSV IMPORT & QUESTION CONVERSION SYSTEM');
  console.log('====================================================');

  console.log('1. Testing parseCSVFlashcards parser...');
  const sampleCSV = `term,definition,explanation,category,certification,difficulty
"Extinction Burst CSV","Temporary increase in frequency of behavior","Expect initial surge before decline","Behavior Reduction","RBT","medium"
"Preference Assessment CSV","Evaluating client choices","Identifies potential reinforcers","Assessment","RBT","easy"`;

  const parsed = parseCSVFlashcards(sampleCSV);
  console.log(`Parsed ${parsed.length} rows from CSV string.`);
  console.log('Sample parsed card #1:', parsed[0]);

  console.log('\n2. Testing importBulkFlashcards into Supabase Database...');
  const impRes = await importBulkFlashcards(parsed);
  console.log(`Successfully inserted ${impRes.insertedCount} rows into Supabase master_flashcards!`);
  console.log('Inserted IDs:', impRes.insertedIds);

  console.log('\n3. Cleaning up test CSV rows...');
  for (const id of impRes.insertedIds) {
    await deleteDatabaseFlashcard(id);
  }

  console.log('\n4. Testing convertQuestionsToDatabaseFlashcards...');
  const convRes = await convertQuestionsToDatabaseFlashcards();
  console.log(`Successfully converted ${convRes.convertedCount} system questions into Database Flashcards!`);
  console.log('Converted Sample ID:', convRes.insertedIds[0]);

  console.log('\n5. Cleaning up converted question test rows...');
  for (const id of convRes.insertedIds) {
    await deleteDatabaseFlashcard(id);
  }

  console.log('====================================================');
  console.log('ALL CSV IMPORT & QUESTION CONVERSION TESTS PASSED!');
  console.log('====================================================');
}

testFeature().catch((err) => {
  console.error('Fatal error in CSV & Question conversion test:', err);
  process.exit(1);
});
