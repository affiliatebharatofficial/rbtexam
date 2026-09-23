import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/utils/seo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  FileCheck2,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  History,
  Scale,
} from 'lucide-react';
import { ContentMeta } from '@/components/eeat/content-meta';
import { ClinicalBoundaryBanner } from '@/components/eeat/clinical-boundary-banner';

export const metadata = constructMetadata({
  title: 'Content Review Process | RBT Practice AI',
  description:
    'Detailed documentation of our educational review process, quality-control verification checks, terminology audits, and errata correction workflows.',
  path: '/content-review',
});

export default function ContentReviewPage() {
  const reviewPillars = [
    {
      title: '1. BACB® Test Content Outline Alignment Check',
      desc: 'Every practice question, mock exam scenario, and flashcard is cross-referenced against the official BACB RBT 3rd Edition Test Content Outline. We ensure the task item identifier (A.1 through F.10) directly matches the skill or concept tested.',
      standard: '100% curriculum coverage across all 6 core domains with canonical percentage allocations.',
    },
    {
      title: '2. Factual Accuracy & Answer Key Verification',
      desc: 'Answer keys are verified through primary behavior-analytic principles and empirical definitions. We confirm that each question possesses exactly one indisputably correct answer and that all distractors are demonstrably incorrect based on standard ABA literature.',
      standard: 'Zero ambiguous keys. Every option includes a written justification explaining why it is correct or incorrect.',
    },
    {
      title: '3. Technical Behavior-Analytic Terminology Check',
      desc: 'We audit clinical phrasing against authoritative applied behavior analysis literature, primarily Applied Behavior Analysis (Cooper, Heron, & Heward, 2020), Mayer et al. (2019), and current BACB ethics publications. We ensure consistent terminology (e.g., discriminative stimulus vs. stimulus delta, continuous vs. discontinuous measurement).',
      standard: 'Strict alignment with standard behavioral science definitions and the RBT Ethics Code 2.0.',
    },
    {
      title: '4. Originality & Test Security Protocol',
      desc: 'All scenario stems and question combinations are original, hypothetical instructional exercises. We screen content to guarantee no real, recalled, or confidential exam items from Pearson VUE or BACB test forms are ever reproduced or requested.',
      standard: 'Strict compliance with BACB test security requirements and fair use educational guidelines.',
    },
    {
      title: '5. Clarity, Fair Language & Bias Review',
      desc: 'Content is reviewed for sentence readability, cultural neutrality, and clarity. We eliminate awkward phrasing, unnecessary clinical jargon that distracts from the core learning objective, and double negatives.',
      standard: 'Clear, accessible language designed for candidates across all 50 US states and international test-takers.',
    },
    {
      title: '6. User Errata Processing & Update Cycle',
      desc: 'When users submit error reports through our on-page reporting tools or via hello@rbtpracticeai.com, our editorial team investigates the item, verifies the applicable BACB source, updates the question database, and publishes a correction log.',
      standard: 'Continuous post-publication review with timestamped last-reviewed verification dates.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rbt/about" className="hover:text-blue-600 transition-colors">About</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Content Review Process</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4">
          <Badge variant="blue" className="px-3 py-1 text-xs">
            <FileCheck2 className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Quality Control & Editorial Transparency
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            How We Review RBT Practice Content
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Our quality-control standards, factual verification protocols, and errata correction workflows ensure that candidates study accurate, up-to-date behavior-analytic materials.
          </p>
        </div>

        {/* E-E-A-T Metadata Card */}
        <ContentMeta
          pageTitle="How We Review RBT Practice Content"
          topicId="Content Review Policy"
          publishedDate="2025-01-15"
          lastReviewedDate="2026-09-23"
        />

        {/* Editorial Independence Notice */}
        <Card glass className="p-6 sm:p-8 border-slate-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Scale className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold">Editorial Independence & Author Responsibility</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            RBT Practice AI is an independent educational platform. Materials are produced and reviewed by our editorial and learning engineering staff using standard behavioral literature and publicly accessible BACB standards. While our content is developed to reflect the rigorous standards of the RBT credential, we do not claim endorsement by or formal affiliation with the BACB® or Pearson VUE®.
          </p>
        </Card>

        {/* 6 Review Pillars */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>The 6 Quality Control Verification Checks</span>
            </h2>
            <Link href="/question-methodology" className="text-xs font-semibold text-blue-600 hover:underline">
              Question Methodology &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reviewPillars.map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-200 transition-all space-y-2.5"
              >
                <h3 className="font-extrabold text-slate-900 text-base">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <strong className="text-slate-800">Verification Standard:</strong> {p.standard}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Errata & Community Reporting Notice */}
        <Card glass className="p-6 sm:p-8 border-amber-200 bg-amber-50/40 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold">Continuous Errata Correction & Community Audit</h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
            Behavior analysis is an evolving discipline. When changes occur in BACB task guidelines or if an error is identified, we prioritize immediate review and correction. Users can submit reports directly from any question or guide page, or email our editorial desk at{' '}
            <a href="mailto:hello@rbtpracticeai.com" className="font-bold underline">
              hello@rbtpracticeai.com
            </a>
            .
          </p>
        </Card>

        {/* Clinical Boundary Banner */}
        <ClinicalBoundaryBanner />

        {/* Navigation Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs font-semibold text-blue-600">
          <Link href="/question-methodology" className="hover:underline flex items-center gap-1">
            &larr; Question Methodology
          </Link>
          <Link href="/updates" className="hover:underline flex items-center gap-1">
            Curriculum Update Policy &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
