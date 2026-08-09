'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Award,
  ArrowLeft,
  ArrowRight,
  Scale,
  Building2,
  UserCheck,
  Clock,
  HelpCircle,
} from 'lucide-react';

export default function GuaranteeTermsPage() {
  const [qualifyingExamCount, setQualifyingExamCount] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rbt_exam_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const qualifying = parsed.filter(
            (s: any) => Number(s.score || 0) >= 85 && Number(s.totalQuestions || 0) >= 85
          ).length;
          setQualifyingExamCount(qualifying);
        }
      }
    } catch (e) {
      console.error('Failed to read exam sessions:', e);
    }
  }, []);

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <Badge variant="emerald" className="gap-1 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Policy Document</span>
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Pass-or-Refund Guarantee Terms
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
            Score 85%+ on three qualifying mock exams and meet all eligibility requirements. If you then take the applicable official BACB exam and do not pass, you may qualify for a full refund under our Guarantee Terms.
          </p>
        </div>

        <Link href="/pricing">
          <Button variant="primary" size="md" className="gap-2 font-bold shadow-lg px-6 flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Offer</span>
          </Button>
        </Link>
      </div>

      {/* Real Candidate Status Tracker Widget */}
      <Card glass className="p-6 border-emerald-200 bg-emerald-50/70 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md flex-shrink-0">
            {qualifyingExamCount}/3
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-emerald-950">Candidate Qualification Tracker</h3>
            <p className="text-xs text-emerald-800">
              {qualifyingExamCount >= 3
                ? 'All 3 qualifying 85%+ timed mock exams completed! Ensure official BACB exam is taken within 30 days.'
                : `You have completed ${qualifyingExamCount} of 3 required full-length mock exams with an 85%+ score on this device.`}
            </p>
          </div>
        </div>

        <Link href="/exam">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-emerald-300 text-emerald-900 bg-white hover:bg-emerald-100 flex-shrink-0">
            <span>Take Qualifying Mock Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </Card>

      {/* 14 Mandatory Policy Sections */}
      <Card glass className="p-6 sm:p-10 shadow-2xl border-white/90 space-y-8">

        <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-medium">

          {/* Section 1 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">1</span>
              <span>Eligibility</span>
            </h3>
            <p>
              The Pass-or-Refund Guarantee is available exclusively to active paid subscribers of qualifying RBT Exam prep plans (Pro Pass Guarantee / Lifetime Pass) who complete all required coursework prior to taking their official BACB examination.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">2</span>
              <span>Qualifying Purchase</span>
            </h3>
            <p>
              Candidates must have an active paid subscription or valid non-refunded purchase of a qualifying prep plan purchased directly through RBTTrainingAI prior to sitting for the official BACB exam.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">3</span>
              <span>Three-Mock-Exam Requirement</span>
            </h3>
            <p>
              Candidates must complete at least three (3) full-length (85-question) practice mock examinations on the RBTTrainingAI platform under official timed conditions prior to their official exam date.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">4</span>
              <span>85% Minimum Score Requirement</span>
            </h3>
            <p>
              Candidates must achieve a score of 85.0% or higher on each of the three (3) required full-length mock practice examinations.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">5</span>
              <span>Mock-Exam Completion Requirements</span>
            </h3>
            <p>
              All three qualifying mock exams must be completed in full under the candidate’s registered account email address within ninety (90) calendar days immediately preceding the official BACB examination date.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">6</span>
              <span>Official BACB Exam Requirement</span>
            </h3>
            <p>
              Candidate must sit for the official Registered Behavior Technician (RBT®) certification exam administered by Pearson VUE on behalf of the BACB® within thirty (30) calendar days of completing their third qualifying mock exam.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">7</span>
              <span>Failed-Exam Claim Process</span>
            </h3>
            <p>
              If a candidate meets all prerequisite mock exam criteria and subsequently does not pass their official BACB examination, they may submit a refund claim by contacting support@rbtpracticequestions.com.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">8</span>
              <span>Required Proof</span>
            </h3>
            <p>
              Claims must include: (a) Official Pearson VUE / BACB exam diagnostic score report displaying candidate name, exam date, and official test center ID matching the registered user email; and (b) Account order invoice number.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">9</span>
              <span>Claim Submission Deadline</span>
            </h3>
            <p>
              Guarantee claim requests and required proof documents must be submitted within thirty (30) calendar days of the official BACB exam administration date. Claims submitted after 30 calendar days are void.
            </p>
          </div>

          {/* Section 10 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">10</span>
              <span>Refund Amount</span>
            </h3>
            <p>
              Approved claims receive a 100% full refund of subscription fees actually paid by the candidate to RBTTrainingAI for the qualifying prep plan (excluding third-party exam fees paid to BACB/Pearson VUE).
            </p>
          </div>

          {/* Section 11 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">11</span>
              <span>Refund Processing Method</span>
            </h3>
            <p>
              Refunds are processed back to the original payment method (Credit Card / Stripe / Lemon Squeezy) within 5 to 10 business days following claim verification and approval.
            </p>
          </div>

          {/* Section 12 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-black">12</span>
              <span>Exclusions & Limitations</span>
            </h3>
            <p>
              Limit one (1) refund claim per candidate / account lifetime. Guarantee is void if account sharing, test manipulation, fraudulent score report alteration, or missed submission deadlines occur.
            </p>
          </div>

          {/* Section 13 */}
          <div className="space-y-2 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950">
            <h3 className="font-extrabold text-amber-900 text-base flex items-center space-x-2">
              <Scale className="w-5 h-5 text-amber-600" />
              <span>BACB Non-Affiliation Disclaimer</span>
            </h3>
            <p>
              RBTTrainingAI is an independent provider of RBT exam preparation materials. We are not affiliated with, sponsored by, endorsed by, or associated with the Behavior Analyst Certification Board® (BACB®) or Pearson VUE. "BACB®" and "RBT®" are registered trademarks of the Behavior Analyst Certification Board®.
            </p>
          </div>

          {/* Section 14 */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-100 border border-slate-300 text-slate-700">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2">
              <FileText className="w-5 h-5 text-slate-600" />
              <span>Consumer Rights & Legal Disclaimer</span>
            </h3>
            <p>
              This Guarantee Policy does not alter or limit statutory consumer rights available under applicable laws. This document constitutes the sole performance remedy agreement regarding test outcome refunds.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-medium">
            Last Updated: August 2026 • Document Ref: GUARANTEE-POLICY-V2
          </span>

          <Link href="/pricing">
            <Button variant="primary" size="lg" className="gap-2 font-bold px-8 shadow-xl">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Offer</span>
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}
