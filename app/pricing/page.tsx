import React from 'react';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Pricing & Pass Guarantee - RBT Practice AI',
  description: 'Choose your RBT practice plan. Student Pro, Lifetime Pass with 100% Money-Back Guarantee, or B2B Clinic Cohort licenses.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <div className="py-8">
      <h1 className="sr-only">RBT Practice Exam Plans, Free Access & Pass Guarantee Pricing</h1>
      <PricingSection />
      <FAQSection />
    </div>
  );
}
