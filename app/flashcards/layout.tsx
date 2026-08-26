import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Interactive RBT Flashcards & Spaced Repetition (Leitner) | RBT Practice AI',
  description:
    'Master key ABA concepts and RBT definitions with Leitner spaced repetition flashcards. Study DTT, NET, interval recording, shaping, chaining, and extinction.',
  path: '/flashcards',
  keywords: [
    'rbt flashcards',
    'rbt exam flashcards',
    'aba terminology flashcards',
    'leitner flashcards rbt',
  ],
});

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
