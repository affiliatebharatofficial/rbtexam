import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'RBT & ABA Exam Articles, Study Guides & Clinical Insights | RBT Practice AI',
  description:
    'Explore in-depth articles, BACB study blueprints, ABA clinical scenarios, exam passing strategies, and Registered Behavior Technician career advice.',
  path: '/articles',
  keywords: [
    'rbt articles',
    'aba exam guide',
    'bacb study articles',
    'rbt certification blog',
  ],
});

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
