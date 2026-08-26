import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Socrates AI Tutor & ABA Clinical Study Mentor | RBT Practice AI',
  description:
    'Chat with Socrates, your 24/7 AI-powered RBT exam tutor. Ask questions about challenging ABA concepts, task list items, scenario analysis, and test-taking strategies.',
  path: '/tutor',
  keywords: [
    'rbt ai tutor',
    'socrates ai rbt',
    'aba exam tutor',
    'rbt exam questions tutor',
  ],
});

export default function TutorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
