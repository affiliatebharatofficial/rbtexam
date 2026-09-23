import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/utils/seo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileCheck,
  Target,
  Layers,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { ContentMeta } from '@/components/eeat/content-meta';
import { ClinicalBoundaryBanner } from '@/components/eeat/clinical-boundary-banner';

export const metadata = constructMetadata({
  title: 'Question Development Methodology | RBT Practice AI',
  description:
    'Our transparent 10-step methodology for crafting original, realistic, scenario-based practice questions aligned with the BACB RBT 3rd Edition Test Content Outline.',
  path: '/question-methodology',
});

export default function QuestionMethodologyPage() {
  const steps = [
    {
      num: 1,
      title: 'Identify Applicable BACB RBT TCO Task',
      desc: 'Each question begins by selecting a discrete task item from the current BACB RBT 3rd Edition Test Content Outline across Domains A through F (e.g., Task C.4 Discrete-Trial Teaching or Task D.3 Differential Reinforcement).',
      rationale: 'Prevents off-topic items and guarantees 100% curriculum coverage.',
    },
    {
      num: 2,
      title: 'Define Core Learning Objective & Bloom Cognitive Level',
      desc: 'We define the exact clinical principle tested (e.g., distinguishing DRO from DRA, identifying an extinction burst, or recognizing mandatory abuse reporting obligations) at the application or scenario-analysis level.',
      rationale: 'Avoids simple rote vocabulary recall; tests practical applied decision-making.',
    },
    {
      num: 3,
      title: 'Create Original Clinical Scenario Stem',
      desc: 'We construct an original, realistic applied behavior analysis scenario featuring a hypothetical client, RBT, or supervisor in a home, clinic, school, or community setting. No live or copyrighted BACB test questions are ever used or reconstructed.',
      rationale: 'Ensures strict test security, ethical copyright compliance, and realistic clinical immersion.',
    },
    {
      num: 4,
      title: 'Formulate Plausible Distractor Options',
      desc: 'We draft three incorrect alternatives (distractors) that represent common cognitive traps, frequently confused ABA terms, or plausible real-world practitioner mistakes (e.g., confusing negative reinforcement with punishment).',
      rationale: 'Challenging distractors test true conceptual mastery rather than superficial test-taking tricks.',
    },
    {
      num: 5,
      title: 'Establish Single Objective Correct Answer',
      desc: 'One option is verified as unambiguously correct based on empirical behavior-analytic principles and the BACB RBT Ethics Code 2.0. Questions with subjective or debatable answers are rejected.',
      rationale: 'Guarantees reliable, criterion-based measurement without subjective bias.',
    },
    {
      num: 6,
      title: 'Write Step-by-Step Clinical Rationale',
      desc: 'Every item receives a comprehensive explanation breaking down why the correct option is right according to behavioral science and why each of the three distractors is clinically incorrect.',
      rationale: 'Turns practice into an active learning intervention, reinforcing understanding upon every response.',
    },
    {
      num: 7,
      title: 'Standardize Technical ABA Terminology',
      desc: 'Terminology is checked against authoritative behavior analysis literature (Cooper, Heron, & Heward, 2020) and the BACB Glossary to ensure standard clinical vocabulary (e.g., discriminative stimulus, motivating operation, continuous measurement).',
      rationale: 'Prevents colloquial drift and prepares candidates for official exam terminology.',
    },
    {
      num: 8,
      title: 'Review for Ambiguity & Unintended Bias',
      desc: 'Items are reviewed to ensure scenario stems contain all necessary context, avoid cultural bias, eliminate double negatives, and do not contain subtle grammatical clues that giveaway the key.',
      rationale: 'Ensures fair, psychometrically sound practice questions for all candidates.',
    },
    {
      num: 9,
      title: 'Verify Domain Mapping & Scoring Balance',
      desc: 'Questions are verified against our domain weight allocation (Domain A: 17%, Domain B: 11%, Domain C: 25%, Domain D: 19%, Domain E: 13%, Domain F: 15%) and tagged with primary/secondary keywords.',
      rationale: 'Maintains canonical test blueprint fidelity across diagnostic exams and mock sets.',
    },
    {
      num: 10,
      title: 'Staging, Publication & Continuous Errata Monitoring',
      desc: 'Validated questions enter the production seed bank. Candidate performance data, user feedback, and error reports are continuously monitored to identify and update any item causing confusion.',
      rationale: 'Continuous quality improvement based on real candidate interaction and empirical feedback.',
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
          <span className="text-slate-900 font-bold">Question Methodology</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4">
          <Badge variant="blue" className="px-3 py-1 text-xs">
            <FileCheck className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Original Question Design Framework
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Our Question Development Methodology
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            How RBT Practice AI designs, verifies, and maintains original, scenario-based practice questions mapped to the BACB RBT 3rd Edition Test Content Outline.
          </p>
        </div>

        {/* E-E-A-T Metadata Card */}
        <ContentMeta
          pageTitle="Question Development Methodology"
          topicId="Methodology"
          publishedDate="2025-01-15"
          lastReviewedDate="2026-09-23"
        />

        {/* Test Security Card */}
        <Card glass className="p-6 sm:p-8 border-blue-200 bg-blue-50/40 space-y-3">
          <div className="flex items-center gap-2.5 font-bold text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold">100% Original Content — Strict Test Security Notice</h2>
          </div>
          <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
            The Behavior Analyst Certification Board® (BACB®) does not publish, release, or license live certification examination questions. RBT Practice AI strictly adheres to BACB test security standards and copyright laws. All practice questions on this platform are <strong>hypothetical, original educational simulations</strong> authored to teach behavior-analytic concepts without using actual, recalled, or leaked exam content.
          </p>
        </Card>

        {/* 10-Step Workflow */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#2563EB]" />
              <span>The 10-Step Question Creation Lifecycle</span>
            </h2>
            <Link href="/content-review" className="text-xs font-semibold text-blue-600 hover:underline">
              View Review Policy &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-200 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      {s.num}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{s.title}</h3>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Step {s.num}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">{s.desc}</p>
                <div className="pl-10 text-[11px] text-slate-500 font-medium">
                  <span className="font-bold text-slate-700">Quality Objective:</span> {s.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Boundary Banner */}
        <ClinicalBoundaryBanner />

        {/* Call to Action */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold">Ready to Practice with Original Questions?</h3>
            <p className="text-xs text-slate-400">
              Explore all 85 scenario-based questions mapped to the 43 TCO competencies.
            </p>
          </div>
          <Link href="/rbt/mock-exam">
            <Button variant="primary" size="md" className="gap-2 shadow-lg">
              <span>Start 85-Question Mock</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
