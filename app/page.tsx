'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { HowItWorks } from '@/components/landing/how-it-works';
import { WhyChooseUs } from '@/components/landing/why-choose-us';
import { AiTutorPreview } from '@/components/landing/ai-tutor-preview';
import { PracticeTestPreview } from '@/components/landing/practice-test-preview';
import { FlashcardsPreview } from '@/components/landing/flashcards-preview';
import { TaskListPreview } from '@/components/landing/task-list-preview';
import { Testimonials } from '@/components/landing/testimonials';
import { Statistics } from '@/components/landing/statistics';
import { PricingSection } from '@/components/landing/pricing-section';
import { SeoContentSection } from '@/components/landing/seo-content-section';
import { FAQSection } from '@/components/landing/faq-section';
import { CtaSection } from '@/components/landing/cta-section';

export default function HomePage() {
  const { isAuthenticated, isLoading, homeRoute } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && homeRoute && homeRoute !== '/') {
      router.replace(homeRoute);
    }
  }, [isAuthenticated, isLoading, homeRoute, router]);

  return (
    <div className="space-y-0 selection:bg-blue-500/20 selection:text-[#2563EB]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Key Features Matrix */}
      <Features />

      {/* 3. How It Works (4-Step Blueprint) */}
      <HowItWorks />

      {/* 4. Why Students Choose Us (Comparison Table) */}
      <WhyChooseUs />

      {/* 5. Live AI Tutor Preview Sandbox */}
      <AiTutorPreview />

      {/* 6. Live Practice Test Simulator Preview */}
      <PracticeTestPreview />

      {/* 7. Spaced Repetition Flashcards Preview */}
      <FlashcardsPreview />

      {/* 8. BACB RBT 3rd Edition TCO Explorer */}
      <TaskListPreview />

      {/* 9. Verified Student & Clinic Testimonials */}
      <Testimonials />

      {/* 10. Platform Key Metrics & Statistics */}
      <Statistics />

      {/* 11. Transparent Pricing Tiers */}
      <PricingSection />

      {/* 12. Comprehensive 800-1200 Word SEO Educational Guide */}
      <SeoContentSection />

      {/* 13. Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* 14. Bottom High-Conversion CTA Banner */}
      <CtaSection />
    </div>
  );
}
