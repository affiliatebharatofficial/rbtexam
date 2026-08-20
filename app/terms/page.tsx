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
  Lock,
  Sparkles,
  Ban,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Terms of Service | RBT Practice AI',
  description:
    'Read the official Terms of Service for RBT Practice AI governing candidate accounts, subscription billing, cancellations, AI usage, and intellectual property.',
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
              <span>User Agreement & Terms</span>
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Last Revised: {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Please read these Terms of Service carefully before creating an account, initiating a trial, or accessing materials on RBT Practice AI.
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
                RBT Practice AI is an <strong>independent exam-preparation platform</strong> and is not affiliated with, sponsored by, authorized by, or endorsed by the Behavior Analyst Certification Board® (BACB®) or Pearson VUE.
              </p>
              <p className="pt-1">
                Account access is granted for individual candidate study. Account sharing, content scraping, or commercial distribution is strictly prohibited.
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
              By accessing, registering an account on, initiating a free trial for, or purchasing a subscription to RBT Practice AI ("the Platform", "we", "us", or "our"), you ("the User" or "Candidate") agree to be bound by these Terms of Service, our <Link href="/privacy" className="text-[#2563EB] font-bold hover:underline">Privacy Policy</Link>, our <Link href="/refund-policy" className="text-[#2563EB] font-bold hover:underline">Refund & Cancellation Policy</Link>, and our <Link href="/disclaimer" className="text-[#2563EB] font-bold hover:underline">Educational Disclaimer</Link>. If you do not agree to all terms, you must discontinue using the platform immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">2</span>
              <span>Account Registration & Security Responsibilities</span>
            </h2>
            <p>
              To access practice tests, flashcards, diagnostic reports, and Socrates AI, you must register an account. You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Provide accurate, current, and complete registration information.</li>
              <li>Maintain the confidentiality and security of your account credentials.</li>
              <li>Accept sole responsibility for all activities occurring under your account.</li>
              <li>Notify us immediately at <a href={`mailto:${contactEmail}`} className="text-[#2563EB] font-bold hover:underline">{contactEmail}</a> of any unauthorized use or security breach.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">3</span>
              <span>Subscription Billing, 7-Day Free Trial & Cancellation</span>
            </h2>
            <p>
              Access to premium features is billed on a recurring subscription basis (monthly or annual plans) as detailed on our <Link href="/pricing" className="text-[#2563EB] font-bold hover:underline">Pricing Page</Link>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>7-Day Free Trial:</strong> Where available, eligible candidates may test platform features for seven days. Unless cancelled prior to trial conclusion, the chosen recurring subscription will commence automatically.</li>
              <li><strong>Recurring Billing & Currency:</strong> Subscriptions automatically renew at the beginning of each billing cycle in United States Dollars (USD) unless cancelled by the user.</li>
              <li><strong>Self-Service Cancellation:</strong> You may cancel your subscription at any time in your <Link href="/profile/billing" className="text-[#2563EB] font-bold hover:underline">Profile & Billing Portal</Link>. Following cancellation, access continues until the end of the paid billing period with no further renewal charges.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">4</span>
              <span>Refund Policy & Pass Guarantee Terms</span>
            </h2>
            <p>
              All refund requests, duplicate charge corrections, and money-back performance claims are governed strictly by our <Link href="/refund-policy" className="text-[#2563EB] font-bold hover:underline">Refund & Cancellation Policy</Link> and <Link href="/guarantee-terms" className="text-[#2563EB] font-bold hover:underline">Pass-or-Refund Guarantee Policy</Link>.
            </p>
            <p>
              To qualify for a Pass-or-Refund Guarantee claim, candidate must achieve 85%+ on three (3) full-length timed mock exams, take the official BACB examination within 30 days of the 3rd mock exam, and submit their official Pearson VUE score report within 30 days of the exam date.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">5</span>
              <span>Intellectual Property & Anti-Scraping Restrictions</span>
            </h2>
            <p>
              All practice questions, clinical rationales, flashcard decks, software code, user interface designs, AI prompts, and diagnostic algorithms are the exclusive intellectual property of RBT Practice AI Inc.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Ban className="w-4 h-4 text-rose-600" />
                <span>Prohibited Activities</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Copying, republishing, reselling, or distributing our questions or educational materials.</li>
                <li>Sharing account credentials across multiple individuals or organizations.</li>
                <li>Using automated scripts, bots, or scrapers to extract platform data or content.</li>
                <li>Attempting to reverse engineer software algorithms, scoring engines, or AI tutor prompts.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">6</span>
              <span>AI-Generated Educational Content & Limitations</span>
            </h2>
            <p>
              The platform incorporates artificial intelligence tools (such as the Socrates AI Tutor) to provide supplementary study assistance. AI-generated explanations are provided for educational review only and may contain occasional inaccuracies. AI outputs do not represent official BACB statements, clinical treatment guidelines, or behavior intervention plans.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">7</span>
              <span>Third-Party Services</span>
            </h2>
            <p>
              Our platform interacts with third-party service providers to deliver secure infrastructure, payments, authentication, and AI inference (including Stripe, Lemon Squeezy, Cloudflare, Supabase, OpenAI, Anthropic, and Google Cloud). We are not responsible for third-party service interruptions or terms imposed by external providers.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">8</span>
              <span>Account Suspension & Termination</span>
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts without prior notice if we determine in our reasonable discretion that a user has violated these Terms of Service, engaged in fraudulent activity, shared credentials, or attempted to compromise system security.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">9</span>
              <span>Disclaimer of Warranties & Limitation of Liability</span>
            </h2>
            <p>
              THE PLATFORM AND ALL PRACTICE MATERIALS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, RBT PRACTICE AI INC. DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              IN NO EVENT SHALL RBT PRACTICE AI INC., ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM OR EXAMINATION OUTCOMES. OUR MAXIMUM AGGREGATE LIABILITY SHALL NOT EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO RBT PRACTICE AI IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">10</span>
              <span>Governing Law & Dispute Resolution</span>
            </h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the <strong>State of Delaware, United States</strong>, without regard to its conflict of law principles. Any dispute arising under or relating to these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in the designated jurisdiction.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">11</span>
              <span>Changes to Service & Terms</span>
            </h2>
            <p>
              We reserve the right to update, modify, or discontinue features or update these Terms of Service at any time. Significant changes will be announced on the platform or communicated via your registered email. Continued use of the platform following updates constitutes acceptance of the revised terms.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Contact Legal & Support Desk</span>
            </h2>
            <p className="text-xs text-slate-600">
              For legal inquiries, terms clarifications, or enterprise agreement queries, please contact:
            </p>
            <div className="text-xs font-mono font-bold text-slate-800 pt-1">
              Email: <a href={`mailto:${contactEmail}`} className="text-[#2563EB] hover:underline">{contactEmail}</a>
              <br />
              Entity: RBT Practice AI Inc. • Legal & Compliance Office
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-bold text-[#2563EB]">
            <Link href="/privacy" className="hover:underline">
              &larr; Privacy Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/refund-policy" className="hover:underline">
              Refund Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/disclaimer" className="hover:underline">
              Disclaimer &rarr;
            </Link>
          </div>
          <Link href="/contact">
            <Button variant="outline" size="sm" className="text-xs">
              Contact Support
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
