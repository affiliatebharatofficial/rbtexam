import { MASTER_QUESTION_BANK } from '../lib/master-question-bank';
import { transformQuestionToFlashcard } from '../lib/flashcard-bank';

async function testFinalCleanup() {
  console.log('====================================================');
  console.log('TESTING FINAL FLASHCARD CONTENT CLEANUP (20 ITEMS)');
  console.log('====================================================');

  const questionsToTest = MASTER_QUESTION_BANK.slice(0, 20);
  let passCount = 0;

  for (let i = 0; i < questionsToTest.length; i++) {
    const mq = questionsToTest[i];
    const card = transformQuestionToFlashcard(mq);

    console.log(`\n--- Card #${i + 1} (${mq.category}) ---`);
    console.log(`Title:               ${card.title}`);
    console.log(`Front:               ${card.front}`);
    console.log(`Back:                ${card.back?.replace(/\n/g, ' | ')}`);
    console.log(`Clinical Rationale:  ${card.clinicalExplanation?.slice(0, 80)}...`);
    console.log(`Memory Tip:          ${card.memoryTip}`);

    // Verification Checks
    const correctOpt = Array.isArray(mq.options)
      ? mq.options.find((o: any) => o.id === mq.correctAnswerId)?.text || mq.correctAnswerId
      : 'Option A';

    // 1. Check for answer term duplication (stutter)
    const escapedOpt = correctOpt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const answerStutterRegex = new RegExp(`${escapedOpt}\\s+${escapedOpt}`, 'i');
    const hasAnswerStutter = answerStutterRegex.test(card.back || '');

    // 2. Check for duplicate Memory Tip labels
    const hasDuplicateMemoryTipLabel = /Memory Tip:\s*Memory Tip:/i.test(card.explanation || '') || /Memory Tip:\s*Memory Tip:/i.test(card.memoryTip || '');

    // 3. Check for Memory Tip embedded inside Clinical Rationale
    const hasMemoryTipInClinical = /(?:Memory Tip|Exam Tip|Tip|Mnemonic):/i.test(card.clinicalExplanation || '');

    // 4. Check for full question stem repeated on Back
    const hasQuestionOnBack = card.front && card.back?.includes(card.front);

    const isClean = !hasAnswerStutter && !hasDuplicateMemoryTipLabel && !hasMemoryTipInClinical && !hasQuestionOnBack;

    if (isClean) {
      console.log(`✅ Passed Quality Checks for Card #${i + 1}`);
      passCount++;
    } else {
      console.error(`❌ Quality Violation in Card #${i + 1}:`, {
        hasAnswerStutter,
        hasDuplicateMemoryTipLabel,
        hasMemoryTipInClinical,
        hasQuestionOnBack,
      });
    }
  }

  console.log('\n====================================================');
  console.log(`RESULTS: ${passCount} / ${questionsToTest.length} cards passed clean formatting rules.`);
  console.log('====================================================');

  if (passCount === questionsToTest.length) {
    console.log('✅ ALL 20 FLASHCARDS PASSED FINAL CLEANUP VERIFICATION!');
  } else {
    console.error('❌ SOME CARDS FAILED VERIFICATION');
    process.exit(1);
  }
}

testFinalCleanup().catch((err) => {
  console.error('Fatal error in final cleanup test:', err);
  process.exit(1);
});
