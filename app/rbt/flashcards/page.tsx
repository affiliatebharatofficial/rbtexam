import React from 'react';
import { constructMetadata } from '@/utils/seo';
import FlashcardsPage from '@/app/flashcards/page';

export const metadata = constructMetadata({
  title: 'RBT Flashcards & Terminology | RBT Practice AI',
  description:
    'Master 100+ BACB RBT 3rd Edition flashcards with 5-box Leitner spaced repetition. Test your recall on continuous measurement, DTT, shaping, chaining, and extinction.',
  path: '/rbt/flashcards',
  keywords: [
    'rbt flashcards',
    'rbt exam flashcards',
    'aba flashcards',
    'leitner flashcards rbt',
    'rbt study tools',
  ],
});

export default function RBTFlashcardsPillarPage() {
  return (
    <>
      <h1 className="sr-only">Leitner 5-Box RBT Flashcards & ABA Terminology</h1>
      <FlashcardsPage />
    </>
  );
}
