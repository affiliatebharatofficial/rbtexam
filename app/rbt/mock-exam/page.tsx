import React from 'react';
import { constructMetadata } from '@/utils/seo';
import ExamPage from '@/app/exam/page';

export const metadata = constructMetadata({
  title: '85-Question RBT Mock Exam | RBT Practice AI',
  description:
    'Take a timed 85-question official-style RBT Mock Exam aligned with the BACB 3rd Edition Task List. Full instant scoring and detailed clinical rationales.',
  path: '/rbt/mock-exam',
  keywords: [
    'rbt mock exam',
    'rbt practice exam 85 questions',
    'rbt mock exam free',
    'rbt exam simulator',
    'bacb mock exam',
  ],
});

export default function RBTMockExamPage() {
  return (
    <>
      <h1 className="sr-only">85-Question Official RBT Mock Exam Simulator (2026)</h1>
      <ExamPage />
    </>
  );
}
