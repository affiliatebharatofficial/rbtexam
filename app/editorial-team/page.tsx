import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/utils/seo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  Code,
  BookOpen,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ContentMeta } from '@/components/eeat/content-meta';
import { ClinicalBoundaryBanner } from '@/components/eeat/clinical-boundary-banner';

export const metadata = constructMetadata({
  title: 'Editorial & Engineering Team | RBT Practice AI',
  description:
    'Meet the engineering and editorial team behind RBT Practice AI. Learn about our content development standards, technical stewardship, and clinical advisory goals.',
  path: '/editorial-team',
});

export default function EditorialTeamPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rbt/about" className="hover:text-blue-600 transition-colors">About</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Editorial & Team</span>
        </nav>

        {/* Page Header */}
        <div className="space-y-4">
          <Badge variant="blue" className="px-3 py-1 text-xs">
            <Users className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Creator & Editorial Transparency
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Our Team & Editorial Standards
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            We believe in complete transparency about who designs, develops, and maintains RBT Practice AI. Here is our organizational structure, technical leadership, and educational approach.
          </p>
        </div>

        {/* Content Meta */}
        <ContentMeta
          pageTitle="Our Team & Editorial Standards"
          topicId="Editorial Team"
          publishedDate="2025-01-15"
          lastReviewedDate="2026-09-23"
        />

        {/* Technical Leadership Card */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-[#2563EB]" />
            <span>Platform Leadership & Engineering Stewardship</span>
          </h2>

          <Card glass className="p-6 sm:p-8 space-y-4 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Firoz Khan</h3>
                <p className="text-xs font-bold text-blue-600">Lead Platform Architect & Technical Founder (Manorhub)</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold self-start sm:self-auto">
                Engineering & Operations
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Firoz Khan oversees the software architecture, test simulation algorithms, computer-based exam engine, and spaced-repetition infrastructure behind RBT Practice AI. With a background in scalable full-stack web applications and cognitive learning tools, Firoz is responsible for platform reliability, data security, accessibility compliance, and user experience.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <strong className="text-slate-700">Areas of Responsibility:</strong>
              <p>Exam simulation timing algorithms, Leitner flashcard logic, Cloudflare edge infrastructure, and system security.</p>
            </div>
          </Card>
        </div>

        {/* Editorial Group Card */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Content Development & Editorial Desk</span>
          </h2>

          <Card glass className="p-6 sm:p-8 space-y-4 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">RBT Practice AI Editorial Team</h3>
                <p className="text-xs font-bold text-emerald-600">Behavioral Education & Curriculum Writers</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold self-start sm:self-auto">
                Curriculum Design
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our editorial contributors research and draft applied scenarios according to the official BACB RBT 3rd Edition Test Content Outline. Questions, distractors, and answer rationales are developed using standard behavior-analytic textbooks, including <em>Applied Behavior Analysis</em> (Cooper, Heron, & Heward) and the <em>RBT Ethics Code 2.0</em>.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <strong className="text-slate-700">Core Duties:</strong>
              <p>Scenario drafting, distractor plausibility validation, keyword indexing, and continuous errata monitoring.</p>
            </div>
          </Card>
        </div>

        {/* Transparent Clinical Review Disclosure & Advisory Invitation */}
        <Card glass className="p-6 sm:p-8 border-amber-200 bg-amber-50/50 space-y-4">
          <div className="flex items-center gap-2.5 font-bold text-amber-900">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <h3 className="text-base font-bold">Clinical Advisory Transparency & Review Disclosure</h3>
          </div>

          <div className="text-xs sm:text-sm text-amber-950 space-y-3 leading-relaxed">
            <p>
              <strong>Honest Disclosure:</strong> RBT Practice AI does not currently have an in-house Board Certified Behavior Analyst (BCBA) employed full-time on staff. We refuse to fabricate fictional BCBA profiles or claim clinical credentials that do not exist.
            </p>
            <p>
              All practice questions and explanations are original study aids developed from published, authoritative literature and the public BACB Test Content Outline.
            </p>
            <p>
              <strong>Call for Clinical Advisors:</strong> Are you a credentialed BCBA, BCaBA, or clinical supervisor passionate about behavior technician education? We are actively seeking independent clinical advisors to review our question rationales and join our Content Advisory Panel.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a href="mailto:hello@rbtpracticeai.com?subject=Clinical%20Advisory%20Inquiry">
              <Button variant="primary" size="sm" className="text-xs gap-1.5 shadow-md">
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Editorial Desk (hello@rbtpracticeai.com)</span>
              </Button>
            </a>
          </div>
        </Card>

        {/* Clinical Boundary Banner */}
        <ClinicalBoundaryBanner />

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs font-semibold text-blue-600">
          <Link href="/rbt/about" className="hover:underline flex items-center gap-1">
            &larr; About RBTPracticeAI
          </Link>
          <Link href="/question-methodology" className="hover:underline flex items-center gap-1">
            Question Methodology &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
