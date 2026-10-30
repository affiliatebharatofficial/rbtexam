import React from 'react';

export function JsonLdSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RBT Practice AI',
    url: 'https://www.rbtpracticeai.com',
    logo: 'https://www.rbtpracticeai.com/icon-512.png',
    email: 'hello@rbtpracticeai.com',
    description: 'Comprehensive RBT exam preparation platform featuring realistic practice questions, 85-question mock exams, spaced repetition flashcards, and AI-powered tutoring aligned with the BACB RBT 3rd Edition Test Content Outline.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@rbtpracticeai.com',
      contactType: 'customer support',
      availableLanguage: ['English', 'Spanish'],
    },
    publishingPrinciples: 'https://www.rbtpracticeai.com/content-review',
    correctionsPolicy: 'https://www.rbtpracticeai.com/question-methodology',
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RBT Practice AI',
    url: 'https://www.rbtpracticeai.com',
    description: 'RBT Practice & Exam Prep 2026 — Realistic RBT practice questions, 85-question mock exams, and Socrates AI tutor.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.rbtpracticeai.com/rbt/questions?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'RBT Practice & Exam Prep 2026 | RBT Practice AI',
    url: 'https://www.rbtpracticeai.com',
    description: 'Start practicing RBT for free. Master the RBT exam with realistic practice questions, 85-question mock tests, and 3rd Edition study tools.',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'RBT Practice AI',
      url: 'https://www.rbtpracticeai.com',
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'RBT Practice AI Study & Exam Simulator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any (Web browser)',
    description: 'Online RBT certification exam study platform featuring 85-question 90-minute timed mock exams, spaced repetition flashcards, and AI-assisted tutoring aligned with the BACB RBT 3rd Edition Test Content Outline.',
    provider: {
      '@type': 'Organization',
      name: 'RBT Practice AI',
      sameAs: 'https://www.rbtpracticeai.com',
    },
    // No offers block: the platform is 100% free. The visible FAQ section in
    // components/landing/faq-section.tsx is the site's only FAQ section,
    // so no separate FAQPage JSON-LD block is emitted here.
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
