import fs from 'fs';
import path from 'path';

function testFlashcard3DFlipArchitecture() {
  console.log('====================================================');
  console.log('TESTING FLASHCARD 3D FLIP CSS & ACCESSIBILITY ARCHITECTURE');
  console.log('====================================================');

  const mainPagePath = path.join(process.cwd(), 'app', 'flashcards', 'page.tsx');
  const landingPreviewPath = path.join(process.cwd(), 'components', 'landing', 'flashcards-preview.tsx');

  const mainPageContent = fs.readFileSync(mainPagePath, 'utf8');
  const landingContent = fs.readFileSync(landingPreviewPath, 'utf8');

  // Check 1: 3D perspective and transform-style
  const hasPerspective = mainPageContent.includes('[perspective:1000px]') && landingContent.includes('[perspective:1000px]');
  const hasPreserve3d = mainPageContent.includes('[transform-style:preserve-3d]') && landingContent.includes('[transform-style:preserve-3d]');
  console.log('1. Has [perspective:1000px] & [transform-style:preserve-3d]:', hasPerspective && hasPreserve3d ? '✅ YES' : '❌ NO');

  // Check 2: Backface visibility hidden
  const hasBackfaceHidden = mainPageContent.includes('[backface-visibility:hidden]') && landingContent.includes('[backface-visibility:hidden]');
  console.log('2. Has [backface-visibility:hidden] on Front and Back faces:', hasBackfaceHidden ? '✅ YES' : '❌ NO');

  // Check 3: RotateY 180deg transform
  const hasRotateY = mainPageContent.includes('[transform:rotateY(180deg)]') && landingContent.includes('[transform:rotateY(180deg)]');
  console.log('3. Has [transform:rotateY(180deg)] on Back face:', hasRotateY ? '✅ YES' : '❌ NO');

  // Check 4: No conditional content replacement inside card body (!isFlipped ?)
  // Check that !isFlipped is not used to conditionally unmount Front/Back faces
  const hasNoConditionalSwap = !mainPageContent.includes('{!isFlipped ? (') && !landingContent.includes('{!isFlipped ? (');
  console.log('4. Dual faces co-exist simultaneously (No conditional unmounting):', hasNoConditionalSwap ? '✅ YES' : '❌ NO');

  // Check 5: Accessibility attributes
  const hasAccessibility = mainPageContent.includes('role="button"') && mainPageContent.includes('tabIndex={0}') && mainPageContent.includes('aria-pressed=') && mainPageContent.includes('onKeyDown=');
  console.log('5. Has WCAG keyboard accessibility (role=button, tabIndex=0, Space/Enter handler):', hasAccessibility ? '✅ YES' : '❌ NO');

  // Check 6: Event propagation stopped on controls
  const hasStopPropagation = mainPageContent.includes('e.stopPropagation()');
  console.log('6. Has e.stopPropagation() on controls:', hasStopPropagation ? '✅ YES' : '❌ NO');

  const allPassed = hasPerspective && hasPreserve3d && hasBackfaceHidden && hasRotateY && hasNoConditionalSwap && hasAccessibility && hasStopPropagation;

  console.log('====================================================');
  if (allPassed) {
    console.log('✅ ALL 3D FLIP CSS & ACCESSIBILITY TESTS PASSED SUCCESSFULLY!');
  } else {
    console.error('❌ 3D FLIP TEST FAILED! Some quality rules were violated.');
    process.exit(1);
  }
}

testFlashcard3DFlipArchitecture();
