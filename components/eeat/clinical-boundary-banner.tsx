import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import Link from 'next/link';

interface ClinicalBoundaryBannerProps {
  className?: string;
  compact?: boolean;
}

export function ClinicalBoundaryBanner({ className = '', compact = false }: ClinicalBoundaryBannerProps) {
  if (compact) {
    return (
      <div className={`p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2.5 ${className}`}>
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span>
            <strong>Educational Scope Notice:</strong> RBT Practice AI provides exam preparation tools only. It does not provide patient therapy, clinical supervision, or medical advice. RBTs must practice under the direct supervision of a qualified BCBA/BCaBA.{' '}
          </span>
          <Link href="/disclaimer" className="text-blue-600 font-semibold hover:underline">
            View Disclaimer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2.5 ${className}`}>
      <div className="flex items-center gap-2 font-bold text-slate-800">
        <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
        <span>Educational Scope & Clinical Boundary Notice</span>
      </div>
      <p className="leading-relaxed">
        RBT Practice AI is designed exclusively as an auxiliary self-assessment and exam-preparation study aid. It does <strong>not</strong> provide medical advice, behavioral diagnosis, individualized patient behavior intervention plans, or mandatory clinical supervision.
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
        <span>• Does not replace 40-hour RBT training</span>
        <span>• Does not certify Initial Competency Assessment</span>
        <span>• RBTs must always operate under a qualified BCBA supervisor</span>
        <Link href="/disclaimer" className="text-[#2563EB] font-bold hover:underline ml-auto">
          Full Educational Disclaimer &rarr;
        </Link>
      </div>
    </div>
  );
}
