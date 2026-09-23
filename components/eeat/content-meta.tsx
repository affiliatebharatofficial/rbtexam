'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, UserCheck, BookOpen, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ReportErrorModal } from './report-error-modal';

interface ContentMetaProps {
  author?: string;
  reviewer?: string;
  publishedDate?: string;
  lastReviewedDate?: string;
  sourceFramework?: string;
  sourceUrl?: string;
  topicId?: string;
  pageTitle?: string;
  className?: string;
}

export function ContentMeta({
  author = 'RBT Practice AI Editorial Team',
  reviewer,
  publishedDate = '2025-01-15',
  lastReviewedDate = '2026-09-23',
  sourceFramework = 'BACB® RBT® Test Content Outline (3rd Edition)',
  sourceUrl = 'https://www.bacb.com/wp-content/uploads/2023/12/RBT-3rd-Edition-Test-Content-Outline-240903-a.pdf',
  topicId,
  pageTitle,
  className = '',
}: ContentMetaProps) {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <>
      <div className={`p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-xs text-slate-600 space-y-3 ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-medium">
            <div className="flex items-center gap-1.5 text-slate-800">
              <UserCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>
                Written by: <strong className="font-semibold text-slate-900">{author}</strong>
              </span>
            </div>

            {reviewer ? (
              <div className="flex items-center gap-1.5 text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Reviewed by: <strong className="font-semibold text-slate-900">{reviewer}</strong>
                </span>
              </div>
            ) : null}

            {lastReviewedDate && (
              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last reviewed: <time dateTime={lastReviewedDate}>{lastReviewedDate}</time></span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-amber-600 transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Report Content Issue</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>
              Source Reference:{' '}
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] font-medium hover:underline inline-flex items-center gap-0.5"
              >
                {sourceFramework}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400">
            <Link href="/question-methodology" className="hover:text-slate-700 transition-colors">
              Question Methodology
            </Link>
            <span>•</span>
            <Link href="/content-review" className="hover:text-slate-700 transition-colors">
              Review Process
            </Link>
          </div>
        </div>
      </div>

      <ReportErrorModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        topicId={topicId}
        pageTitle={pageTitle}
      />
    </>
  );
}
