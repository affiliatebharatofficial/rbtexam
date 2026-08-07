import React from 'react';

export function JsonLdSchema() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'RBT Exam Preparation Mastery & Socrates AI Tutor',
    description: 'Complete AI-powered prep platform for the Registered Behavior Technician (RBT) certification exam based on the BACB 2nd Edition Task List.',
    provider: {
      '@type': 'Organization',
      name: 'RBTTrainingAI',
      sameAs: 'https://rbttraining.ai',
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
          text: 'The RBT exam tests 85 multiple-choice questions across 6 BACB 2nd Edition Task List domains: Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation & Reporting, and Professional Conduct.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does RBTTrainingAI calculate my pass readiness score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RBTTrainingAI uses real-time adaptive diagnostic algorithms evaluating your score accuracy across all 6 BACB task list domains, time spent per question, and spaced-repetition memory retention.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can ABA Clinics track student progress?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! RBTTrainingAI includes a dedicated Clinic & Training Center portal for BCBA supervisors to manage cohorts, monitor pass probability, and assign mock exams.',
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
