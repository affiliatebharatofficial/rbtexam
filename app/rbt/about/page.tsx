import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { constructMetadata } from '@/utils/seo';
import {
  Brain,
  ShieldCheck,
  Target,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Scale,
  FileCheck2,
  Layers,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { ContentMeta } from '@/components/eeat/content-meta';
import { ClinicalBoundaryBanner } from '@/components/eeat/clinical-boundary-banner';

export const metadata = constructMetadata({
  title: 'About Us | Transparency, Methodology & Platform Mission',
  description:
    'Learn about RBT Practice AI: our platform mission, technical leadership, question creation methodology, content review workflows, and educational boundaries.',
  path: '/rbt/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">About Us</span>
        </nav>

        {/* Hero Header */}
        <div className="space-y-4">
          <Badge variant="blue" className="gap-1.5 px-3 py-1 font-bold text-xs">
            <Brain className="w-3.5 h-3.5" />
            <span>Platform Transparency & Mission</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            About RBT Practice AI
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            An independent educational platform engineered to provide realistic, scenario-based practice questions, timed exam simulations, and conversational study assistance aligned with the BACB® RBT® 3rd Edition Test Content Outline.
          </p>
        </div>

        {/* E-E-A-T Content Meta */}
        <ContentMeta
          pageTitle="About RBT Practice AI"
          topicId="About"
          publishedDate="2025-01-15"
          lastReviewedDate="2026-09-23"
        />

        {/* Section 1: Who Operates It */}
        <Card glass className="p-6 sm:p-8 space-y-4 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2563EB]" />
            <span>Who Operates RBT Practice AI?</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              RBT Practice AI is maintained by <strong>Firoz Khan</strong> (Lead Platform Architect & Technical Founder) and the <strong>Manorhub</strong> software development team, in collaboration with the <strong>RBT Practice AI Editorial Team</strong> of educational writers and instructional technologists.
            </p>
            <p>
              Our team focuses on solving a common problem faced by behavior technician candidates: traditional static PDF question banks and flashcards often feature memorization-heavy vocabulary questions that fail to prepare students for the complex, scenario-based applied problems on the real certification examination.
            </p>
            <div className="pt-1 flex items-center gap-4 text-xs font-semibold text-blue-600">
              <Link href="/editorial-team" className="hover:underline flex items-center gap-1">
                Meet the Team & Advisory Desk &rarr;
              </Link>
            </div>
          </div>
        </Card>

        {/* Section 2: How Practice Questions Are Created */}
        <Card glass className="p-6 sm:p-8 space-y-4 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            <span>How Our Practice Questions Are Created</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              Every question on our platform is an <strong>original instructional scenario</strong> crafted through a structured 10-step lifecycle:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
              <li>Mapping to a discrete competency in the current BACB RBT 3rd Edition Test Content Outline (A.1 through F.10).</li>
              <li>Defining the applied clinical principle and target cognitive level (Bloom analysis/application).</li>
              <li>Drafting realistic, original clinical situations involving hypothetical clients, caregivers, RBTs, or supervisors.</li>
              <li>Formulating plausible distractors based on common practitioner misconceptions.</li>
              <li>Establishing a single objective answer key supported by textbook citations.</li>
              <li>Drafting detailed step-by-step clinical rationales for all options.</li>
            </ol>
            <p className="pt-1">
              We never use, solicit, or reconstruct real or recalled examination questions from BACB or Pearson VUE testing sessions.
            </p>
            <div className="pt-1 flex items-center gap-4 text-xs font-semibold text-blue-600">
              <Link href="/question-methodology" className="hover:underline flex items-center gap-1">
                Read Full 10-Step Question Methodology &rarr;
              </Link>
              <span>•</span>
              <Link href="/content-review" className="hover:underline flex items-center gap-1">
                Our 6 Quality Control Checks &rarr;
              </Link>
            </div>
          </div>
        </Card>

        {/* Section 3: How AI is Used */}
        <Card glass className="p-6 sm:p-8 space-y-4 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>How Artificial Intelligence Is Used on the Platform</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
            <p>
              RBT Practice AI incorporates modern language models in specific, transparent ways:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>
                <strong>Socrates AI Study Assistant:</strong> An interactive, conversational tool that explains applied behavioral concepts, breaks down answer choices, and facilitates roleplay exercises.
              </li>
              <li>
                <strong>Educational Synthesis:</strong> AI models assist our editorial staff in summarizing textbook explanations, identifying distractor traps, and generating spaced-repetition memory mnemonics.
              </li>
              <li>
                <strong>Limitations & Safety:</strong> Socrates AI is an automated software tool, not a human Board Certified Behavior Analyst (BCBA). While prompts are guided by the RBT Ethics Code 2.0 and ABA literature, AI outputs may occasionally contain approximations or inaccuracies. Critical exam facts must always be verified against official BACB publications.
              </li>
            </ul>
          </div>
        </Card>

        {/* Section 4: Educational vs. Clinical Boundary */}
        <Card glass className="p-6 sm:p-8 border-amber-200 bg-amber-50/40 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <h2 className="text-base font-bold">Educational Scope & Practice Boundaries</h2>
          </div>
          <div className="text-xs sm:text-sm text-amber-950 space-y-2 leading-relaxed">
            <p>
              RBT Practice AI provides <strong>exam preparation tools only</strong>. It does not provide:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Individual clinical supervision or supervisor sign-offs.</li>
              <li>Patient/client therapy, behavioral health diagnosis, or medical treatment plans.</li>
              <li>A replacement for the mandatory 40-hour RBT training course.</li>
              <li>Administration or sign-off of the RBT Initial Competency Assessment.</li>
            </ul>
            <p className="pt-1">
              Registered Behavior Technicians and candidates must always operate under the direct supervision of a qualified BACB supervisor (BCBA, BCaBA, or qualifying FL-CBA).
            </p>
          </div>
        </Card>

        {/* Clinical Boundary Banner */}
        <ClinicalBoundaryBanner />

        {/* Trademark & Non-Affiliation Legal Notice */}
        <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs text-slate-500 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <Scale className="w-4 h-4 text-slate-600" />
            <span>Trademark & Non-Affiliation Statement</span>
          </div>
          <p>
            Registered Behavior Technician® (RBT®) and BACB® are registered trademarks of the Behavior Analyst Certification Board® (BACB®). Pearson VUE® is a registered trademark of Pearson Education, Inc.
          </p>
          <p>
            RBT Practice AI is an independent educational technology platform developed independently. It is not affiliated with, sponsored by, administered by, or endorsed by the Behavior Analyst Certification Board® (BACB®) or Pearson VUE®.
          </p>
        </div>

        {/* Contact Links */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
          <div>
            Have questions or editorial feedback? Email{' '}
            <a href="mailto:hello@rbtpracticeai.com" className="text-[#2563EB] hover:underline">
              hello@rbtpracticeai.com
            </a>
          </div>
          <Link href="/contact" className="text-[#2563EB] hover:underline">
            Contact Support & Compliance Desk &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
