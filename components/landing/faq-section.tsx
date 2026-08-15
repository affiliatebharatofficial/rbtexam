'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How similar are RBT Practice AI questions to the actual BACB RBT Exam?',
      a: 'Our question engine is modeled directly after the BACB RBT 3rd Edition Task List. Every scenario reflects real-world clinical behavior analysis cases with 4 distractors designed to test discrimination skills, latency, IRT, DTT, and ethics.',
    },
    {
      q: 'How does the Socrates AI Tutor work?',
      a: 'Socrates AI is a specialized conversational model trained on the RBT Ethics Code 2.0 and ABA task list guidelines. You can ask for step-by-step explanations, request scenario roleplay, or ask it to critique your clinical reasoning.',
    },
    {
      q: 'What is the RBT Practice AI Pass-or-Refund Guarantee?',
      a: 'We are so confident in our platform that if you achieve an 85%+ Readiness Score on RBT Practice AI and do not pass your official BACB RBT exam on the first attempt, you may qualify for a 100% full refund under our Guarantee Terms.',
    },
    {
      q: 'Can ABA Clinics and BCBAs track student progress?',
      a: 'Yes! Our Clinic Enterprise plan allows clinical directors and supervisors to invite trainees, monitor pass probability heatmaps, assign targeted domain practice, and track supervision logs.',
    },
    {
      q: 'How does the Leitner Spaced Repetition Flashcard system work?',
      a: 'Cards move between 5 boxes based on how easily you recall them. Cards you struggle with appear daily, while cards you have mastered appear every 14-30 days, optimizing your memory retention.',
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
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600">
            Everything you need to know about the RBT certification exam and RBT Practice AI.
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
