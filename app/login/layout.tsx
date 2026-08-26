import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Candidate Login | RBT Practice AI',
  description:
    'Log in to your RBT Practice AI account. Access 85-question mock exams, spaced repetition flashcards, and Socrates AI tutor study sessions.',
  path: '/login',
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
