import React from 'react';

export function JsonLdSchema() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'RBT Practice AI — Practice Questions & AI Tutor',
    description: 'Complete AI-powered prep platform for the Registered Behavior Technician (RBT) certification exam based on the current BACB RBT 3rd Edition Test Content Outline (TCO).',
    provider: {
      '@type': 'Organization',
      name: 'RBT Practice AI',
      sameAs: 'https://rbtpracticeai.com',
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
        name: 'What is covered on the RBT Exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The RBT exam tests 85 multiple-choice questions across 6 BACB RBT 3rd Edition Task List domains: Data Collection and Graphing, Behavior Assessment, Behavior Acquisition, Behavior Reduction, Documentation and Reporting, and Ethics.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does RBT Practice AI calculate my pass readiness score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RBT Practice AI uses real-time adaptive diagnostic algorithms evaluating your score accuracy across all 6 BACB task list domains, time spent per question, and spaced-repetition memory retention.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can ABA Clinics track student progress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! RBT Practice AI includes a dedicated Clinic & Training Center portal for BCBA supervisors to manage cohorts, monitor pass probability, and assign mock exams.',
        },
      },
    ],
  };

  return (
    <>
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
