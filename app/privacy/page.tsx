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
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Privacy Policy | RBT Practice AI',
  description:
    'Learn how RBT Practice AI collects, protects, uses, and respects candidate data, practice exam performance, and personal information in compliance with GDPR, CCPA, and global privacy standards.',
  canonicalUrl: 'https://rbtpracticeai.com/privacy',
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
            At RBT Practice AI (operated by RBT Practice AI Inc.), we are dedicated to safeguarding candidate privacy, maintaining enterprise-grade security, and being completely transparent about how your data is collected and utilized.
          </p>
        </div>

        {/* Quick Contact & Summary Box */}
        <Card glass className="p-6 border-blue-100 bg-blue-50/40 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs text-slate-700">
              <h3 className="font-extrabold text-[#0F172A] text-sm">Privacy Summary & Core Commitment</h3>
              <p>
                We <strong>never sell your personal data</strong>. Your exam simulations, domain readiness scores, and flashcard responses are utilized solely to personalize your study plan and deliver Socrates AI tutoring explanations.
              </p>
              <p className="pt-1">
                For questions or data deletion requests, contact our Data Protection Officer directly at{' '}
                <a href={`mailto:${contactEmail}`} className="text-[#2563EB] font-bold hover:underline">
                  {contactEmail}
                </a>.
              </p>
            </div>
          </div>
        </Card>

        {/* Policy Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">1</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              We collect information to provide and improve our educational services, personalize practice questions, and process payments securely:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Account Information:</strong> Full name, email address, password hash, and optional profile avatar.
              </li>
              <li>
                <strong>Learning & Exam Telemetry:</strong> Mock exam scores, question completion times, domain accuracy percentages (Domains A–F), flashcard Leitner box mastery levels, and Socrates AI tutor conversation history.
              </li>
              <li>
                <strong>Billing Information:</strong> Payment status, subscription tier, and transaction receipts processed via PCI-DSS compliant providers (Stripe / Lemon Squeezy). We do not store raw credit card numbers on our servers.
              </li>
              <li>
                <strong>Device & Usage Data:</strong> IP address, browser type, operating system, and session timestamps for security, fraud prevention, and session management.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">2</span>
              <span>How We Use Your Information</span>
            </h2>
            <p>Your information is used strictly for the following purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Adaptive Learning Algorithms</h4>
                <p className="text-[11px] text-slate-600">Calculating your candidate exam readiness score and targeting weak BACB 3rd Edition domains.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="font-bold text-slate-900 text-xs mb-1">AI Tutor Contextual Assistance</h4>
                <p className="text-[11px] text-slate-600">Providing step-by-step rationales and explanations based on your specific question responses.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Pass Guarantee Verification</h4>
                <p className="text-[11px] text-slate-600">Validating the 3 qualifying 85%+ timed mock exams required for refund eligibility.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="font-bold text-slate-900 text-xs mb-1">Platform Security & Audit</h4>
                <p className="text-[11px] text-slate-600">Preventing unauthorized account sharing, brute force attacks, and system abuse.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">3</span>
              <span>Cookies & Tracking Technologies</span>
            </h2>
            <p>
              We use essential cookies and local storage to maintain candidate authentication, remember dark/light preferences, and cache exam session states. We do not use intrusive third-party cross-site advertising trackers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">4</span>
              <span>Third-Party Sub-Processors</span>
            </h2>
            <p>
              We work only with enterprise-grade cloud infrastructure and AI providers that adhere to rigorous SOC 2 and GDPR standards:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Cloudflare:</strong> Edge compute, DDoS protection, and SSL termination.</li>
              <li><strong>Supabase / PostgreSQL:</strong> Encrypted database storage with Row-Level Security (RLS).</li>
              <li><strong>OpenAI & Google Cloud:</strong> AI language models for Socrates AI explanations (data is not used to train public models).</li>
              <li><strong>Stripe / Lemon Squeezy:</strong> Secure checkout and billing subscription management.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">5</span>
              <span>Your Rights (GDPR & CCPA Compliance)</span>
            </h2>
            <p>
              Regardless of your location, we afford all candidates complete control over their personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Right of Access:</strong> Request a complete export of your exam records and personal data.</li>
              <li><strong>Right to Rectification:</strong> Update or correct inaccurate account details at any time in Profile Settings.</li>
              <li><strong>Right to Erasure ("Right to Be Forgotten"):</strong> Request full deletion of your account and test telemetry.</li>
              <li><strong>Right to Data Portability:</strong> Export your progress and study history.</li>
            </ul>
            <p className="pt-1">
              To exercise any of these rights, email <a href={`mailto:${contactEmail}`} className="text-[#2563EB] font-bold hover:underline">{contactEmail}</a> and your request will be honored within 30 days.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">6</span>
              <span>Data Retention & Security Safeguards</span>
            </h2>
            <p>
              We implement industry-standard AES-256 encryption at rest and TLS 1.3 encryption in transit. Account data is retained for the duration of your active subscription and deleted upon verified cancellation or erasure requests.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Contact Our Privacy Team</span>
            </h2>
            <p className="text-xs text-slate-600">
              If you have any questions or concerns regarding our privacy practices, please contact us:
            </p>
            <div className="text-xs font-mono font-bold text-slate-800 pt-1">
              Email: <a href={`mailto:${contactEmail}`} className="text-[#2563EB] hover:underline">{contactEmail}</a>
              <br />
              Entity: RBT Practice AI Inc. • Candidate Privacy & Compliance Office
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <Link href="/terms" className="text-xs font-bold text-[#2563EB] hover:underline">
            &larr; View Terms of Service
          </Link>
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
