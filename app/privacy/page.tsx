import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { constructMetadata } from '@/utils/seo';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Database,
  Globe,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Trash2,
  Server,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Privacy Policy | RBT Practice AI',
  description:
    'Learn how RBT Practice AI collects, protects, uses, and respects candidate data, practice exam performance, payment details, and personal information in compliance with GDPR and CCPA.',
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  const lastUpdated = 'August 20, 2026';
  const contactEmail = 'hello@rbtpracticeai.com';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Header */}
        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2">
            <Badge variant="blue" className="gap-1 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal & Data Security</span>
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Effective Date: {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            At RBT Practice AI (operated by RBT Practice AI Inc.), we are dedicated to safeguarding candidate privacy, maintaining enterprise-grade security, and being completely transparent about how your personal data and study telemetry are collected and utilized.
          </p>
        </div>

        {/* Quick Contact & Summary Box */}
        <Card glass className="p-6 border-blue-100 bg-blue-50/40 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-blue-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs text-slate-700">
              <h3 className="font-extrabold text-[#0F172A] text-sm">Privacy Summary & Core Commitment</h3>
              <p>
                We <strong>never sell your personal data</strong>. Your practice exam scores, domain readiness diagnostics, and study interactions are utilized solely to personalize your study experience and deliver Socrates AI tutoring explanations.
              </p>
              <p className="pt-1">
                For questions, data export, or account deletion requests, contact our Data Protection Office directly at{' '}
                <a href={`mailto:${contactEmail}`} className="text-[#2563EB] font-bold hover:underline">
                  {contactEmail}
                </a>.
              </p>
            </div>
          </div>
        </Card>

        {/* Policy Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

          {/* Section 1: Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">1</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              We collect information necessary to provide and improve our educational services, personalize practice questions, maintain account security, and process payments:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Account & Authentication Information:</strong> Full name, email address, hashed password, role (Student Candidate, Behavior Tech, Clinic Admin), target exam date, and optional profile avatar.
              </li>
              <li>
                <strong>Learning Progress & Exam Telemetry:</strong> Mock exam scores, timed session performance, domain accuracy percentages (Domains A–F), Leitner box flashcard mastery levels, question bookmarks, and response logs.
              </li>
              <li>
                <strong>Payment & Subscription Information:</strong> Subscription tier, billing cycle (monthly/annual), transaction timestamps, and invoice IDs. <em>Important: All payment card transactions are processed securely via third-party PCI-DSS Level 1 compliant processors (Stripe / Lemon Squeezy). We do not collect, process, or store raw credit card numbers or security CVVs on our servers.</em>
              </li>
              <li>
                <strong>AI Interaction Data:</strong> Prompts, study queries, and conversation histories submitted to the Socrates AI Tutor to generate real-time clinical explanations.
              </li>
              <li>
                <strong>Device & Technical Data:</strong> IP address, browser type, operating system version, device identifiers, and session timestamps for security verification, fraud detection, and session continuity.
              </li>
            </ul>
          </section>

          {/* Section 2: How We Use Information */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">2</span>
              <span>How We Use Your Information</span>
            </h2>
            <p>Your information is used strictly for legitimate educational, operational, and support purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Adaptive Learning Algorithms</h4>
                <p className="text-[11px] text-slate-600">Calculating your candidate exam readiness score and targeting weak BACB 3rd Edition domains.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs mb-1">AI Tutor Contextual Assistance</h4>
                <p className="text-[11px] text-slate-600">Providing step-by-step rationales and explanations based on your specific question responses.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Pass Guarantee Verification</h4>
                <p className="text-[11px] text-slate-600">Validating the 3 qualifying 85%+ timed mock exams required for refund claim eligibility.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Platform Security & Audit</h4>
                <p className="text-[11px] text-slate-600">Preventing unauthorized account sharing, brute force attacks, and system abuse.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Cookies & Local Storage */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">3</span>
              <span>Cookies & Local Storage</span>
            </h2>
            <p>
              We use essential session cookies and browser local storage to maintain candidate authentication, remember dark/light mode preferences, store in-progress exam states, and maintain flashcard session progress. We do not deploy intrusive third-party cross-site advertising trackers or sell browsing data to data brokers.
            </p>
          </section>

          {/* Section 4: Third-Party Sub-Processors */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">4</span>
              <span>Third-Party Sub-Processors & Data Infrastructure</span>
            </h2>
            <p>
              We partner exclusively with enterprise-grade cloud infrastructure and AI providers adhering to SOC 2, ISO 27001, and GDPR standards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Cloudflare:</strong> Edge compute, content delivery network (CDN), SSL/TLS encryption, and DDoS mitigation.</li>
              <li><strong>Supabase / PostgreSQL:</strong> Encrypted cloud database storage with Row-Level Security (RLS) policies.</li>
              <li><strong>OpenAI, Anthropic & Google Cloud:</strong> AI models powering Socrates AI Tutor rationales (prompts are not used to train public models).</li>
              <li><strong>Stripe & Lemon Squeezy:</strong> PCI-DSS Level 1 certified checkout and recurring subscription management.</li>
            </ul>
          </section>

          {/* Section 5: Data Retention & Security Safeguards */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">5</span>
              <span>Data Retention & Security Safeguards</span>
            </h2>
            <p>
              We employ industry-standard <strong>AES-256 encryption at rest</strong> and <strong>TLS 1.3 encryption in transit</strong>. Candidate account data is retained for the active duration of your subscription and study period. If an account is inactive or cancelled, data is retained for administrative compliance and may be permanently deleted upon verified request.
            </p>
          </section>

          {/* Section 6: Candidate Rights (GDPR & CCPA) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">6</span>
              <span>Your Privacy Rights (GDPR & CCPA Compliance)</span>
            </h2>
            <p>
              Regardless of your geographic location, we provide all candidates with comprehensive rights regarding their personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Right of Access & Portability:</strong> Request an export of your personal information, exam records, and domain diagnostic reports.</li>
              <li><strong>Right to Rectification:</strong> Correct or update inaccurate account information via your profile settings at any time.</li>
              <li><strong>Right to Erasure ("Right to Be Forgotten"):</strong> Request the complete deletion of your candidate account and associated study telemetry.</li>
              <li><strong>Right to Restrict or Object to Processing:</strong> Limit how your information is utilized.</li>
            </ul>
            <p className="pt-1">
              To exercise any of these rights, email <a href={`mailto:${contactEmail}?subject=Privacy%20Rights%20Request`} className="text-[#2563EB] font-bold hover:underline">{contactEmail}</a> and your request will be honored within thirty (30) calendar days.
            </p>
          </section>

          {/* Section 7: Contact Data Protection Team */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Contact Data Protection Office</span>
            </h2>
            <p className="text-xs text-slate-600">
              If you have any questions, concerns, or requests regarding our privacy practices, please contact us:
            </p>
            <div className="text-xs font-mono font-bold text-slate-800 pt-1">
              Email: <a href={`mailto:${contactEmail}`} className="text-[#2563EB] hover:underline">{contactEmail}</a>
              <br />
              Entity: RBT Practice AI Inc. • Data Protection & Candidate Privacy Desk
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-bold text-[#2563EB]">
            <Link href="/terms" className="hover:underline">
              &larr; Terms of Service
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
