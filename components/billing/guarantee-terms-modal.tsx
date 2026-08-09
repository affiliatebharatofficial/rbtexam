'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Award,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Scale,
} from 'lucide-react';

interface GuaranteeTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuaranteeTermsModal({ isOpen, onClose }: GuaranteeTermsModalProps) {
  const [qualifyingExamCount, setQualifyingExamCount] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rbt_exam_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Count mock exams with score >= 85% and totalQuestions >= 85
          const qualifying = parsed.filter(
            (s: any) => Number(s.score || 0) >= 85 && Number(s.totalQuestions || 0) >= 85
          ).length;
          setQualifyingExamCount(qualifying);
        }
      }
    } catch (e) {
      console.error('Failed to read exam sessions for guarantee status:', e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-4xl relative my-8">
        <Card glass className="p-6 sm:p-8 shadow-2xl border-white/90 space-y-6 max-h-[85vh] overflow-y-auto">

          {/* Modal Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                  Pass-or-Refund Guarantee Terms
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Official terms, eligibility criteria, and claim guidelines for RBTTrainingAI candidates.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real Candidate Eligibility Summary Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                {qualifyingExamCount}/3
              </div>
              <div className="space-y-0.5">
                <div className="text-emerald-950 font-extrabold">Your Qualifying Mock Exam Progress</div>
                <div className="text-emerald-800 text-[11px] font-normal">
                  {qualifyingExamCount >= 3
                    ? 'All 3 qualifying 85%+ mock exams completed! Ensure you take official BACB exam within 30 days.'
                    : `Completed ${qualifyingExamCount} of 3 required timed mock exams with 85%+ score.`}
                </div>
              </div>
            </div>

            <Button
              onClick={onClose}
              variant="primary"
              size="sm"
              className="gap-1 text-xs px-4 bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-md flex-shrink-0"
            >
              <span>Back to Offer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* 14 Mandatory Guarantee Sections */}
          <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-medium">

            {/* Section 1 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">1</span>
                <span>Eligibility</span>
              </h3>
              <p>
                The Pass-or-Refund Guarantee is available exclusively to active paid subscribers of qualifying RBT Exam prep plans (Pro Pass Guarantee / Lifetime Pass) who complete all required coursework prior to taking their official BACB examination.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">2</span>
                <span>Qualifying Purchase</span>
              </h3>
              <p>
                Candidates must have an active paid subscription or valid non-refunded purchase of a qualifying prep plan purchased directly through RBTTrainingAI prior to sitting for the official BACB exam.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">3</span>
                <span>Three-Mock-Exam Requirement</span>
              </h3>
              <p>
                Candidates must complete at least three (3) full-length (85-question) practice mock examinations on the RBTTrainingAI platform under official timed conditions prior to their official exam date.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">4</span>
                <span>85% Minimum Score Requirement</span>
              </h3>
              <p>
                Candidates must achieve a score of 85.0% or higher on each of the three (3) required full-length mock practice examinations.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">5</span>
                <span>Mock-Exam Completion Requirements</span>
              </h3>
              <p>
                All three qualifying mock exams must be completed in full under the candidate’s registered account email address within ninety (90) calendar days immediately preceding the official BACB examination date.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">6</span>
                <span>Official BACB Exam Requirement</span>
              </h3>
              <p>
                Candidate must sit for the official Registered Behavior Technician (RBT®) certification exam administered by Pearson VUE on behalf of the BACB® within thirty (30) calendar days of completing their third qualifying mock exam.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">7</span>
                <span>Failed-Exam Claim Process</span>
              </h3>
              <p>
                If a candidate meets all prerequisite mock exam criteria and subsequently does not pass their official BACB examination, they may submit a refund claim by contacting support@rbtpracticequestions.com.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">8</span>
                <span>Required Proof</span>
              </h3>
              <p>
                Claims must include: (a) Official Pearson VUE / BACB exam diagnostic score report displaying candidate name, exam date, and official test center ID matching the registered user email; and (b) Account order invoice number.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">9</span>
                <span>Claim Submission Deadline</span>
              </h3>
              <p>
                Guarantee claim requests and required proof documents must be submitted within thirty (30) calendar days of the official BACB exam administration date. Claims submitted after 30 calendar days are void.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">10</span>
                <span>Refund Amount</span>
              </h3>
              <p>
                Approved claims receive a 100% full refund of subscription fees actually paid by the candidate to RBTTrainingAI for the qualifying prep plan (excluding third-party exam fees paid to BACB/Pearson VUE).
              </p>
            </div>

            {/* Section 11 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">11</span>
                <span>Refund Processing Method</span>
              </h3>
              <p>
                Refunds are processed back to the original payment method (Credit Card / Stripe / Lemon Squeezy) within 5 to 10 business days following claim verification and approval.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">12</span>
                <span>Exclusions & Limitations</span>
              </h3>
              <p>
                Limit one (1) refund claim per candidate / account lifetime. Guarantee is void if account sharing, test manipulation, fraudulent score report alteration, or missed submission deadlines occur.
              </p>
            </div>

            {/* Section 13 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950">
              <h3 className="font-extrabold text-amber-900 text-sm flex items-center space-x-2">
                <Scale className="w-4 h-4 text-amber-600" />
                <span>BACB Non-Affiliation Disclaimer</span>
              </h3>
              <p>
                RBTTrainingAI is an independent provider of RBT exam preparation materials. We are not affiliated with, sponsored by, endorsed by, or associated with the Behavior Analyst Certification Board® (BACB®) or Pearson VUE. "BACB®" and "RBT®" are registered trademarks of the Behavior Analyst Certification Board®.
              </p>
            </div>

            {/* Section 14 */}
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-100 border border-slate-300 text-slate-700">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Consumer Rights & Legal Disclaimer</span>
              </h3>
              <p>
                This Guarantee Policy does not alter or limit statutory consumer rights available under applicable laws. This document constitutes the sole performance remedy agreement regarding test outcome refunds.
              </p>
            </div>

          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <Link href="/guarantee-terms">
              <span className="text-xs font-bold text-[#2563EB] hover:underline flex items-center space-x-1">
                <span>View Full Screen Terms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Button
              onClick={onClose}
              variant="primary"
              size="md"
              className="gap-2 font-bold px-6 shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Offer</span>
            </Button>
          </div>

        </Card>
      </div>
    </div>
  );
}
