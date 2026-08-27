import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Create Candidate Account | RBT Practice AI',
  description:
    'Start your free RBT practice journey. Create an account to access realistic BACB 3rd Edition mock exams, AI tutoring, and Leitner flashcards.',
  path: '/signup',
});

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
