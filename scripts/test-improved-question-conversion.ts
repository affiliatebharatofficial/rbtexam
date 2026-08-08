import { FULL_BACB_SEED_QUESTIONS } from '../lib/seed-questions-bank';
import { transformQuestionToFlashcard } from '../lib/flashcard-bank';

async function test10QuestionsConversion() {
  console.log('================================================================');
  console.log('TESTING 10 QUESTION BANK ITEMS CONVERSION TO CONCISE FLASHCARDS');
  console.log('================================================================\n');

  // Select 10 questions across multiple domains
  const sample10 = FULL_BACB_SEED_QUESTIONS.slice(0, 10);

  let successCount = 0;

  for (let i = 0; i < sample10.length; i++) {
    const q = sample10[i];
    const fc = transformQuestionToFlashcard(q);

    console.log(`----------------------------------------------------------------`);
    console.log(`ITEM #${i + 1} | ID: ${q.id} | Domain: ${q.category}`);
    console.log(`----------------------------------------------------------------`);
    console.log(`ORIGINAL QUESTION:`);
    console.log(`"${q.question}"`);
    if (q.scenarioText) {
      console.log(`[Original Scenario]: "${q.scenarioText}"`);
    }

    console.log(`\nGENERATED FRONT (Concise Recall Prompt):`);
    console.log(`"${fc.front}"`);

    console.log(`\nGENERATED BACK (Answer + Rationale):`);
    console.log(`"${fc.back}"`);

    console.log(`\nCLINICAL RATIONALE:`);
    console.log(`"${fc.clinicalExplanation}"`);

    console.log(`\nMETADATA & SOURCE MAPPING:`);
    console.log(`Category: ${fc.category} | Difficulty: ${fc.difficulty} | Certification: ${fc.certification}`);
    console.log(`Tags: ${JSON.stringify(fc.tags)}`);

    // Verification Rules Checks
    const frontIsConcise = fc.front && fc.front.length <= 250;
    const backHasNoQuestionRepetition = !fc.back?.includes(q.question.slice(0, 30));
    const backHasCorrectAnswer = fc.back?.includes(
      q.options.find((o) => o.id === q.correctAnswerId)?.text || ''
    );
    const backHasExplanation = fc.back?.includes(q.answerExplanation.slice(0, 20));
    const preservesSourceId = fc.tags?.some((t) => t.includes(`source_question_id:${q.id}`));

    if (
      frontIsConcise &&
      backHasNoQuestionRepetition &&
      backHasCorrectAnswer &&
      backHasExplanation &&
      preservesSourceId
    ) {
      console.log(`✅ VERIFICATION PASSED FOR ITEM #${i + 1}`);
      successCount++;
    } else {
      console.error(`❌ VERIFICATION FAILED FOR ITEM #${i + 1}`);
      console.error({
        frontIsConcise,
        backHasNoQuestionRepetition,
        backHasCorrectAnswer,
        backHasExplanation,
        preservesSourceId,
      });
    }
    console.log('\n');
  }

  console.log('================================================================');
  console.log(`VERIFICATION SUMMARY: ${successCount} / ${sample10.length} ITEMS PASSED`);
  console.log('================================================================');

  if (successCount !== sample10.length) {
    process.exit(1);
  }
}

test10QuestionsConversion().catch((err) => {
  console.error('Fatal error running 10 questions conversion test:', err);
  process.exit(1);
});
