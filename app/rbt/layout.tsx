import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'RBT Exam Preparation Hub & Practice Simulator | RBT Practice AI',
  description:
    'The premier RBT exam preparation platform. Full-length 85-question mock tests, domain practice questions, Socrates AI tutor, and Leitner flashcards.',
  path: '/rbt',
});

export default function RBTLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
