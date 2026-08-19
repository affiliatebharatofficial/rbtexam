'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is RBT practice and how does RBT Practice AI help me prepare?',
      a: 'RBT practice involves working through realistic, scenario-based practice questions and timed mock exams aligned with the BACB RBT Test Content Outline. RBT Practice AI combines an 85-question exam simulator, Leitner spaced repetition flashcards, Socrates AI tutor explanations, and domain mastery tracking across all 6 BACB 3rd Edition content areas.',
    },
    {
      q: 'What does the 7-day free trial include?',
      a: 'The 7-day free trial gives you complete Pro access to the platform, including realistic practice questions, full 85-question 90-minute timed mock exams, Socrates AI tutor explanations, spaced repetition flashcards, and personalized domain diagnostic heatmaps.',
    },
    {
      q: 'Is the platform aligned with the BACB RBT 3rd Edition Test Content Outline?',
      a: 'Yes. 100% of our practice questions, flashcards, and study modules are mapped directly to the current BACB RBT 3rd Edition Test Content Outline across Domains A through F: Data Collection and Graphing, Behavior Assessment, Behavior Acquisition, Behavior Reduction, Documentation and Reporting, and Professional Conduct.',
    },
    {
      q: 'Are RBT Practice AI questions official BACB exam questions?',
      a: 'No. The BACB does not publish or license official exam questions. All questions on RBT Practice AI are original practice questions crafted by BCBA clinical experts to mirror the difficulty, structure, clinical scenarios, and cognitive levels of the actual certification exam.',
    },
    {
      q: 'Can I take a full 85-question RBT practice exam online?',
      a: 'Yes! RBT Practice AI includes full 85-question, 90-minute timed mock exams with question weighting that mirrors the official exam distribution across all 6 BACB 3rd Edition domains.',
    },
    {
      q: 'How does the Socrates AI Tutor work?',
      a: 'Socrates AI is a specialized conversational assistant trained on ABA principles and the RBT Ethics Code 2.0. It provides instant step-by-step rationales for why correct options are right and why distractors are incorrect, helps you practice clinical roleplay, and clears up difficult concepts in real time.',
    },
    {
      q: 'How does the practice exam match Pearson VUE testing conditions?',
      a: 'The actual BACB RBT exam is administered via computer at Pearson VUE test centers. Our mock exam simulator replicates these conditions with an 85-question 90-minute timer, question flagging, navigation review grid, and instant post-exam domain score breakdowns.',
    },
    {
      q: 'How does the Leitner Spaced Repetition Flashcard system work?',
      a: 'Our flashcard engine sorts ABA terms into 5 Leitner boxes based on your recall accuracy. Challenging concepts appear frequently for active reinforcement, while mastered terms appear at expanding intervals to guarantee long-term memory retention.',
    },
    {
      q: 'What is the RBT Practice AI Pass-or-Refund Guarantee?',
      a: 'Candidates who achieve an 85%+ readiness score on three qualifying mock exams and meet all eligibility requirements are covered by our Pass-or-Refund Guarantee. If you take your official BACB exam and do not pass, you may qualify for a full refund subject to our Guarantee Terms.',
    },
    {
      q: 'Can ABA Clinics and BCBA supervisors monitor student progress?',
      a: 'Yes. Our Clinic Enterprise portal allows clinical directors and BCBA supervisors to manage trainee cohorts, assign mock exams, track domain readiness heatmaps, and verify exam preparedness across their organization.',
    },
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-[#2563EB]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions About the RBT Exam & RBT Practice
          </h2>
          <p className="text-base text-slate-600">
            Everything you need to know about preparing for the RBT certification exam and your 7-day free trial with RBT Practice AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={idx}
                className="p-6 cursor-pointer border-slate-200 transition-all hover:border-slate-300"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between text-left">
                  <h3 className="text-base font-bold text-[#0F172A] pr-4">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2563EB]' : ''}`} />
                </div>
                {isOpen && (
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                    {faq.a}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
