import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Pass-or-Refund Guarantee Terms | RBT Practice AI',
  description:
    'Review the official 100% Pass-or-Refund Guarantee terms, 85%+ mock exam eligibility requirements, and Pearson VUE score report claim submission procedures.',
  path: '/guarantee-terms',
});

export default function GuaranteeTermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
