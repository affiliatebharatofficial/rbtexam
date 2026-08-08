import fs from 'fs';
import path from 'path';

function testFlashcardUIPolish() {
  console.log('====================================================');
  console.log('TESTING FLASHCARD UI POLISH & SCROLLBAR ELIMINATION');
  console.log('====================================================');

  const mainPagePath = path.join(process.cwd(), 'app', 'flashcards', 'page.tsx');
  const landingPreviewPath = path.join(process.cwd(), 'components', 'landing', 'flashcards-preview.tsx');

  const mainPageContent = fs.readFileSync(mainPagePath, 'utf8');
  const landingContent = fs.readFileSync(landingPreviewPath, 'utf8');

  // Check 1: No overflow-y-auto on card faces
  const hasNoOverflowYAutoMain = !mainPageContent.includes('overflow-y-auto shadow-xl') && !mainPageContent.includes('overflow-y-auto shadow-2xl');
  const hasNoOverflowYAutoLanding = !landingContent.includes('overflow-y-auto shadow-xl') && !landingContent.includes('overflow-y-auto shadow-2xl');
  console.log('1. No overflow-y-auto on card faces in app/flashcards/page.tsx:', hasNoOverflowYAutoMain ? '✅ YES' : '❌ NO');
  console.log('2. No overflow-y-auto on card faces in flashcards-preview.tsx:', hasNoOverflowYAutoLanding ? '✅ YES' : '❌ NO');

  // Check 2: Overflow hidden & scrollbar-none applied
  const hasOverflowHiddenMain = mainPageContent.includes('overflow-hidden scrollbar-none');
  const hasOverflowHiddenLanding = landingContent.includes('overflow-hidden scrollbar-none');
  console.log('3. Has overflow-hidden & scrollbar-none in app/flashcards/page.tsx:', hasOverflowHiddenMain ? '✅ YES' : '❌ NO');
  console.log('4. Has overflow-hidden & scrollbar-none in flashcards-preview.tsx:', hasOverflowHiddenLanding ? '✅ YES' : '❌ NO');

  // Check 3: Line clamp applied to long rationale text
  const hasLineClamp = mainPageContent.includes('line-clamp-3') || mainPageContent.includes('line-clamp-2');
  console.log('5. Has line-clamp-2 / line-clamp-3 to keep content concise:', hasLineClamp ? '✅ YES' : '❌ NO');

  const allPassed = hasNoOverflowYAutoMain && hasNoOverflowYAutoLanding && hasOverflowHiddenMain && hasOverflowHiddenLanding && hasLineClamp;

  console.log('====================================================');
  if (allPassed) {
    console.log('✅ ALL FLASHCARD UI POLISH & SCROLLBAR TESTS PASSED!');
  } else {
    console.error('❌ UI POLISH TEST FAILED!');
    process.exit(1);
  }
}

testFlashcardUIPolish();
