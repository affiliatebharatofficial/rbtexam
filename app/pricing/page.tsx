import React from 'react';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata({
  title: '100% Free Access - RBT Practice AI',
  description: '100% Free Complete Access. No payment required. No credit card required. Full 85-question mock exams, Socrates AI Tutor, Leitner flashcards, and domain diagnostic heatmaps.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <div className="py-8">
      <h1 className="sr-only">100% Free Complete Access</h1>
      <PricingSection />
      <FAQSection />
    </div>
  );
}
