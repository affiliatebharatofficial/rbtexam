import React from 'react';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: 'Pricing & Lifetime Pass Guarantee - RBTTrainingAI',
  description: 'Choose your RBT exam prep plan. Student Pro, Lifetime Pass with 100% Money-Back Guarantee, or B2B Clinic Cohort licenses.',
});

export default function PricingPage() {
  return (
    <div className="py-8">
      <PricingSection />
      <FAQSection />
    </div>
  );
}
