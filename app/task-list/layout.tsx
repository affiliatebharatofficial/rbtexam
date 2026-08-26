import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'BACB RBT 3rd Edition Task List Study Hub & Domain Breakdown | RBT Practice AI',
  description:
    'Complete breakdown of the BACB RBT 3rd Edition Task List (TCO). Master all 6 domains: Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation, and Ethics.',
  path: '/task-list',
  keywords: [
    'rbt task list',
    'bacb rbt 3rd edition task list',
    'rbt task list study guide',
    'rbt domains',
    'rbt exam outline',
  ],
});

export default function TaskListLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
