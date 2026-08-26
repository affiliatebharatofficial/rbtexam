import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Free RBT Practice Questions & Detailed Rationales (2026) | RBT Practice AI',
  description:
    'Browse hundreds of free RBT practice questions categorized by BACB 3rd Edition domain. Filter by Measurement, Assessment, Skill Acquisition, Behavior Reduction, and Ethics.',
  path: '/rbt/questions',
  keywords: [
    'rbt practice questions',
    'rbt exam questions',
    'free rbt practice questions',
    'rbt questions and answers',
  ],
});

export default function QuestionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
