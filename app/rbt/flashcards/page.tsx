import React from 'react';
import { constructMetadata } from '@/utils/seo';
import FlashcardsPage from '@/app/flashcards/page';

export const metadata = constructMetadata({
  title: 'Leitner RBT Flashcards & ABA Concept Terminology | RBT Practice AI',
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
  return <FlashcardsPage />;
}
