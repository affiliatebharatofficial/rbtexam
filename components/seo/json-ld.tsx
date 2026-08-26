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
    sameAs: [
      'https://twitter.com/rbtpracticeai',
    ],
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
    description: 'Start your 7-day free trial for RBT practice. Master the RBT exam with realistic practice questions, 85-question mock tests, and 3rd Edition study tools.',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'RBT Practice AI',
      url: 'https://www.rbtpracticeai.com',
    },
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'RBT Exam Practice & Certification Prep Platform',
    description: 'Complete preparation platform for the Registered Behavior Technician (RBT) certification exam based on the current BACB RBT 3rd Edition Test Content Outline (TCO).',
    provider: {
      '@type': 'Organization',
      name: 'RBT Practice AI',
      sameAs: 'https://www.rbtpracticeai.com',
    },
    educationalCredentialAwarded: 'Registered Behavior Technician (RBT) Exam Readiness',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT20H',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is RBT practice and how does RBT Practice AI help me prepare?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RBT practice involves working through realistic, scenario-based practice questions and timed mock exams aligned with the BACB RBT Test Content Outline. RBT Practice AI combines an 85-question exam simulator, Leitner spaced repetition flashcards, Socrates AI tutor explanations, and domain mastery tracking across all 6 BACB 3rd Edition content areas.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the 7-day free trial include?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 7-day free trial gives you complete Pro access to the platform, including realistic practice questions, full 85-question 90-minute timed mock exams, Socrates AI tutor explanations, spaced repetition flashcards, and personalized domain diagnostic heatmaps.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the platform aligned with the BACB RBT 3rd Edition Test Content Outline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. 100% of our practice questions, flashcards, and study modules are mapped directly to the current BACB RBT 3rd Edition Test Content Outline across Domains A through F: Data Collection and Graphing, Behavior Assessment, Behavior Acquisition, Behavior Reduction, Documentation and Reporting, and Professional Conduct.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are RBT Practice AI questions official BACB exam questions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The BACB does not publish or license official exam questions. All questions on RBT Practice AI are original practice questions crafted by BCBA clinical experts to mirror the difficulty, structure, clinical scenarios, and cognitive levels of the actual certification exam.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I take a full 85-question RBT practice exam online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! RBT Practice AI includes full 85-question, 90-minute timed mock exams with question weighting that mirrors the official exam distribution across all 6 BACB 3rd Edition domains.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Socrates AI Tutor work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Socrates AI is a specialized conversational assistant trained on ABA principles and the RBT Ethics Code 2.0. It provides instant step-by-step rationales for why correct options are right and why distractors are incorrect, helps you practice clinical roleplay, and clears up difficult concepts in real time.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the practice exam match Pearson VUE testing conditions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The actual BACB RBT exam is administered via computer at Pearson VUE test centers. Our mock exam simulator replicates these conditions with an 85-question 90-minute timer, question flagging, navigation review grid, and instant post-exam domain score breakdowns.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Leitner Spaced Repetition Flashcard system work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our flashcard engine sorts ABA terms into 5 Leitner boxes based on your recall accuracy. Challenging concepts appear frequently for active reinforcement, while mastered terms appear at expanding intervals to guarantee long-term memory retention.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the RBT Practice AI Pass-or-Refund Guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Candidates who achieve an 85%+ readiness score on three qualifying mock exams and meet all eligibility requirements are covered by our Pass-or-Refund Guarantee. If you take your official BACB exam and do not pass, you may qualify for a full refund subject to our Guarantee Terms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can ABA Clinics and BCBA supervisors monitor student progress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our Clinic Enterprise portal allows clinical directors and BCBA supervisors to manage trainee cohorts, assign mock exams, track domain readiness heatmaps, and verify exam preparedness across their organization.',
        },
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
