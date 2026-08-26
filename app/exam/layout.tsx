import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'RBT Practice Exam Portal & Diagnostic Tests | RBT Practice AI',
  description:
    'Access full-length RBT mock exams, domain diagnostic quizzes, and customizable practice sets aligned with the BACB 3rd Edition task outline.',
  path: '/exam',
  keywords: [
    'rbt practice exam',
    'rbt exam simulator',
    'rbt diagnostic exam',
    'rbt practice test 2026',
  ],
});

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
