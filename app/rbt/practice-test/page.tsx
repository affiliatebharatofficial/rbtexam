import React from 'react';
import { constructMetadata } from '@/utils/seo';
import RBTMockExamPage from '@/app/rbt/mock-exam/page';

export const metadata = constructMetadata({
  title: 'Free RBT Practice Test & Exam Simulation (2026) | RBT Practice AI',
  description:
    'Take a realistic RBT practice test with immediate answer scoring, detailed BACB explanations, and domain performance breakdown. 100% free and aligned with 3rd Edition outline.',
  path: '/rbt/practice-test',
  keywords: [
    'rbt practice test',
    'free rbt practice test',
    'rbt exam questions',
    'rbt practice test 2026',
    'rbt mock test',
  ],
});

export default function RBTPracticeTestPillarPage() {
  return <RBTMockExamPage />;
}
