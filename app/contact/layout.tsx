import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Contact Support & Help Desk | RBT Practice AI',
  description:
    'Contact the RBT Practice AI support desk for candidate assistance, billing questions, refund requests, pass guarantee claims, and BCBA clinical feedback.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
