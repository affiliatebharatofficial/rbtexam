import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { constructMetadata } from '@/utils/seo';
import {
  RotateCcw,
  ShieldCheck,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  ArrowRight,
  HelpCircle,
  FileText,
  DollarSign,
  Calendar,
  Zap,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Refund & Cancellation Policy | RBT Practice AI',
  description:
    'Review our transparent Refund & Cancellation Policy, subscription billing details, 7-day free trial terms, self-service cancellation, and Pass-or-Refund Guarantee.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  const lastUpdated = 'August 20, 2026';
  const contactEmail = 'hello@rbtpracticeai.com';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Top Header */}
        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2">
            <Badge variant="blue" className="gap-1 text-xs">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Billing & Policy Compliance</span>
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Effective Date: {lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Refund & Cancellation Policy
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            At RBT Practice AI, we believe in complete billing transparency, hassle-free self-service cancellations, and fair refund procedures for all candidates preparing for the BACB® RBT certification examination.
          </p>
        </div>

        {/* Highlights Summary Card */}
        <Card glass className="p-6 sm:p-8 border-blue-200 bg-blue-50/40 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-bold flex-shrink-0 shadow-lg shadow-blue-500/25">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-extrabold text-[#0F172A]">
                Key Policy Summary
              </h2>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Cancel Anytime:</strong> Easily cancel in 1 click from your Candidate Billing Portal with zero cancellation fees.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Full Period Access:</strong> Following cancellation, keep full access to practice tools until the end of your prepaid billing period.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>100% Pass-or-Refund Guarantee:</strong> Complete 3 qualifying mock exams (85%+), sit for the official BACB exam, and receive a 100% refund if you do not pass.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Zero-Risk 7-Day Free Trial:</strong> Cancel before the trial period concludes to avoid any charges.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Detailed Policy Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

          {/* Section 1: Subscription Plans & Billing Schedule */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">1</span>
              <span>Subscription Plans & When Billing Occurs</span>
            </h2>
            <p>
              RBT Practice AI offers subscription-based access to our exam simulator, question bank, flashcards, and Socrates AI tutor:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-xs mb-1">Monthly Subscription</h3>
                <p className="text-[11px] text-slate-600">
                  Billed automatically on a recurring monthly cycle (e.g., $29/month) starting from the date of purchase or the conclusion of any active free trial period until cancelled.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-xs mb-1">Annual Pass Subscription</h3>
                <p className="text-[11px] text-slate-600">
                  Billed as a single upfront recurring annual charge (e.g., $19/month billed annually at $228/year) with substantial savings over monthly rates, renewing on the annual anniversary date until cancelled.
                </p>
              </div>
            </div>
            <p className="pt-2 text-slate-600">
              All prices are listed in <strong>United States Dollars (USD)</strong>. Taxes may apply based on your jurisdiction.
            </p>
          </section>

          {/* Section 2: 7-Day Free Trial Terms */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">2</span>
              <span>7-Day Free Trial Policy</span>
            </h2>
            <p>
              Where offered, eligible new candidates receive seven (7) days of complimentary full access to platform features.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>You may cancel at any point during the 7-day free trial period through your <Link href="/profile/billing" className="text-[#2563EB] font-semibold hover:underline">Billing Portal</Link> or by contacting support, and your payment method will not be charged.</li>
              <li>If you choose not to cancel during the 7-day trial period, your subscription will automatically begin at the chosen plan rate at the conclusion of the 7-day period.</li>
            </ul>
          </section>

          {/* Section 3: Cancellation Procedure & Access */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">3</span>
              <span>How to Cancel Your Subscription</span>
            </h2>
            <p>
              We provide straightforward self-service cancellation without hidden hurdles:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>Log in to your candidate account at <Link href="/login" className="text-[#2563EB] font-semibold hover:underline">RBTPracticeQuestions.com</Link>.</li>
              <li>Navigate to your <Link href="/profile/billing" className="text-[#2563EB] font-semibold hover:underline">Profile & Billing Portal</Link>.</li>
              <li>Click <strong>"Cancel Subscription"</strong> and confirm your choice.</li>
            </ol>
            <p className="pt-1">
              Alternatively, you can email our support team at <a href={`mailto:${contactEmail}?subject=Subscription%20Cancellation%20Request`} className="text-[#2563EB] font-bold hover:underline">{contactEmail}</a> from your registered email address, and we will process the cancellation within 1 business day.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <strong>Post-Cancellation Access:</strong> When you cancel, your subscription will not renew, and no further charges will be made. You will retain unrestricted access to all paid features until the expiration date of your current prepaid billing cycle.
            </div>
          </section>

          {/* Section 4: Refund Eligibility */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">4</span>
              <span>Refund Eligibility Criteria</span>
            </h2>
            <p>
              Because digital study materials, diagnostic analytics, and AI tutoring are accessible immediately upon account creation, regular subscription fees are generally non-refundable once billed, except in the following explicitly defined circumstances:
            </p>
            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>A. 100% Pass-or-Refund Guarantee Claims</span>
                </h4>
                <p className="text-[11px] text-slate-600">
                  If you hold a qualifying plan, achieve 85%+ on three (3) full-length timed mock exams, take the official BACB examination within 30 days of the 3rd mock exam, and do not pass, you are entitled to a full 100% refund of subscription fees paid to RBT Practice AI. See our <Link href="/guarantee-terms" className="text-[#2563EB] font-bold hover:underline">Official Guarantee Terms</Link> for complete claim rules.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  <span>B. Duplicate, Incorrect, or Erroneous Charges</span>
                </h4>
                <p className="text-[11px] text-slate-600">
                  If you were charged more than once for the same billing period, billed an incorrect amount, or experienced technical billing errors, we will issue an immediate 100% refund for the erroneous transaction upon verification.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>C. Accidental Renewal Request (48-Hour Grace Window)</span>
                </h4>
                <p className="text-[11px] text-slate-600">
                  If your subscription renewed automatically and you did not intend to continue, you may request a refund within <strong>48 hours</strong> of the renewal charge provided you have not logged extensive exam or AI tutor activity during that new billing period.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Refund Request Process & Timeline */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">5</span>
              <span>Refund Request Process & Timeline</span>
            </h2>
            <p>To request a refund, please follow these steps:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>Send an email to <a href={`mailto:${contactEmail}?subject=Refund%20Request`} className="text-[#2563EB] font-bold hover:underline">{contactEmail}</a>.</li>
              <li>Include your <strong>account email address</strong>, <strong>Invoice / Order ID</strong>, and reason for the refund request.</li>
              <li>For Pass Guarantee claims, attach your official Pearson VUE / BACB exam score report confirming candidate details and exam date.</li>
            </ol>
            <p className="pt-1">
              <strong>Processing Timeline:</strong> Our billing desk reviews and responds to all refund requests within <strong>2 to 4 business hours</strong>. Approved refunds are credited directly to your original payment method (Credit Card / Stripe / Lemon Squeezy) within <strong>5 to 10 business days</strong>, depending on your card issuer or banking institution.
            </p>
          </section>

          {/* Section 6: Failed Payments, Dunning & Chargebacks */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">6</span>
              <span>Failed Payments, Retries & Chargeback Policy</span>
            </h2>
            <div className="space-y-2 text-slate-600">
              <p>
                <strong>Failed Payments:</strong> If a recurring payment fails (due to expired card or insufficient funds), our system will automatically attempt retries over a 7-day grace period while alerting you by email. If payment is not resolved within the grace period, premium features will be suspended until updated payment information is provided.
              </p>
              <p>
                <strong>Chargebacks & Dispute Inquiries:</strong> We strongly encourage candidates to reach out directly to our support desk before initiating a bank chargeback or dispute. Disputed transactions can take 60–90 days for banks to review, during which accounts are locked by payment processors. Our direct support desk can resolve legitimate billing issues, duplicates, or refund requests within hours.
              </p>
            </div>
          </section>

          {/* Section 7: Third-Party Payment Processing & Security */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">7</span>
              <span>Payment Security & PCI-DSS Compliance</span>
            </h2>
            <p>
              All payment transactions are handled by industry-leading, PCI-DSS Level 1 certified third-party payment processors (Stripe / Lemon Squeezy). <strong>RBT Practice AI does not collect, process, or store raw credit card numbers or CVV codes on our servers.</strong>
            </p>
          </section>

          {/* Section 8: Contact Desk */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Billing Support & Inquiries</span>
            </h2>
            <p className="text-xs text-slate-600">
              Have questions regarding a charge, subscription renewal, or refund status? Contact our dedicated billing support team:
            </p>
            <div className="text-xs font-mono font-bold text-slate-800 pt-1">
              Email: <a href={`mailto:${contactEmail}`} className="text-[#2563EB] hover:underline">{contactEmail}</a>
              <br />
              Entity: RBT Practice AI Inc. • Billing & Subscriptions Desk
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
            <Link href="/guarantee-terms" className="hover:underline">
              Guarantee Terms
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/disclaimer" className="hover:underline">
              Disclaimer &rarr;
            </Link>
          </div>
          <Link href="/contact">
            <Button variant="outline" size="sm" className="text-xs">
              Contact Billing Support
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
