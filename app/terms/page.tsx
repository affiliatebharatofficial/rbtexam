import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { constructMetadata } from '@/utils/seo';
import {
  FileText,
  Scale,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  UserCheck,
  ArrowRight,
  Mail,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Terms of Service | RBT Practice AI',
  description:
    'Read the official Terms of Service for RBT Practice AI governing candidate accounts, subscription billing, pass-or-refund guarantee conditions, and intellectual property.',
  canonicalUrl: 'https://rbtpracticeai.com/terms',
});

export default function TermsOfServicePage() {
  const lastUpdated = 'August 20, 2026';
  const contactEmail = 'hello@rbtpracticeai.com';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2">
            <Badge variant="blue" className="gap-1 text-xs">
              <Scale className="w-3.5 h-3.5" />
              <span>User Agreement</span>
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Last Revised: {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Please read these Terms of Service carefully before accessing or using the RBT Practice AI platform, practice questions, mock exams, flashcards, or AI tutor services.
          </p>
        </div>

        {/* Highlights Card */}
        <Card glass className="p-6 border-amber-200 bg-amber-50/40 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs text-slate-700">
              <h3 className="font-extrabold text-[#0F172A] text-sm">Key Highlights & BACB Independence</h3>
              <p>
                RBT Practice AI is an <strong>independent exam-preparation tool</strong> and is not affiliated with, sponsored by, or endorsed by the Behavior Analyst Certification Board® (BACB®) or Pearson VUE.
              </p>
              <p className="pt-1">
                Account access is granted for individual candidate study. Account sharing, content scraping, or commercial resale is strictly prohibited.
              </p>
            </div>
          </div>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">1</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By creating an account, initiating a free trial, purchasing a subscription, or accessing any materials on RBT Practice AI ("the Platform"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must discontinue using the platform immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">2</span>
              <span>Account Registration & Security</span>
            </h2>
            <p>
              Candidates must provide accurate, current, and complete information during registration. You are responsible for safeguarding your credentials and for all activities that occur under your account. You agree to notify us immediately at <a href={`mailto:${contactEmail}`} className="text-[#2563EB] font-bold hover:underline">{contactEmail}</a> of any unauthorized access.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">3</span>
              <span>Subscriptions, 7-Day Free Trial & Billing</span>
            </h2>
            <p>
              Our subscription plans, free trial access, and pricing details are specified on our Pricing page:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>7-Day Free Trial:</strong> Eligible new candidates may access platform features for seven (7) days at no cost.
              </li>
              <li>
                <strong>Recurring Billing:</strong> Unless cancelled prior to the end of the current billing cycle, subscriptions renew automatically at the stated rate.
              </li>
              <li>
                <strong>Cancellation:</strong> You may cancel your subscription at any time directly through your Profile & Billing portal. Access remains active until the end of the paid period.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">4</span>
              <span>Pass-or-Refund Guarantee Terms</span>
            </h2>
            <p>
              The RBT Practice AI Pass-or-Refund Guarantee is subject to specific criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Candidate must complete at least three (3) full 85-question mock exams with an 85.0%+ score on each.</li>
              <li>Candidate must sit for the official BACB exam within 30 days of completing the 3rd qualifying mock exam.</li>
              <li>Refund claims must be submitted with official Pearson VUE score reports within 30 calendar days to <a href={`mailto:${contactEmail}`} className="text-[#2563EB] font-bold hover:underline">{contactEmail}</a>.</li>
            </ul>
            <p className="pt-1">
              Read the full, binding requirements in our <Link href="/guarantee-terms" className="text-[#2563EB] font-bold hover:underline">Official Guarantee Policy</Link>.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">5</span>
              <span>Intellectual Property & Usage Restrictions</span>
            </h2>
            <p>
              All practice questions, clinical rationales, flashcard decks, software code, UI designs, and AI training prompts are the proprietary intellectual property of RBT Practice AI Inc.
            </p>
            <p>You agree NOT to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Copy, redistribute, scrape, or republish our questions or answers.</li>
              <li>Share login credentials with other individuals or organizations.</li>
              <li>Reverse engineer the Socrates AI prompt engine or exam simulator algorithms.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">6</span>
              <span>Disclaimer of Warranties & Limitation of Liability</span>
            </h2>
            <p>
              The platform and all materials are provided on an "as is" and "as available" basis without warranties of any kind, express or implied. While our materials are crafted by BCBA clinical experts to align with the BACB RBT 3rd Edition Test Content Outline, RBT Practice AI does not guarantee that any candidate will pass the official exam. In no event shall RBT Practice AI Inc. be liable for indirect, punitive, or consequential damages.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Questions Regarding These Terms?</span>
            </h2>
            <p className="text-xs text-slate-600">
              For legal inquiries, terms clarification, or license agreements, please reach out to:
            </p>
            <div className="text-xs font-mono font-bold text-slate-800 pt-1">
              Email: <a href={`mailto:${contactEmail}`} className="text-[#2563EB] hover:underline">{contactEmail}</a>
              <br />
              Legal Department • RBT Practice AI Inc.
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <Link href="/privacy" className="text-xs font-bold text-[#2563EB] hover:underline">
            &larr; View Privacy Policy
          </Link>
          <Link href="/disclaimer" className="text-xs font-bold text-[#2563EB] hover:underline">
            View Disclaimer &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
