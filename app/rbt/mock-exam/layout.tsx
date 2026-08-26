import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: '85-Question RBT Mock Exam Simulator (Timed & Scored) | RBT Practice AI',
  description:
    'Take a timed 85-question RBT mock exam simulating the real Pearson VUE testing experience. Immediate scoring, BACB rationales, and domain readiness analytics.',
  path: '/rbt/mock-exam',
  keywords: [
    'rbt mock exam free',
    'rbt practice exam 85 questions',
    'rbt mock test 2026',
    'rbt exam simulator',
  ],
});

export default function MockExamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
