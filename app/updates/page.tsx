import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/utils/seo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  History,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { ContentMeta } from '@/components/eeat/content-meta';
import { ClinicalBoundaryBanner } from '@/components/eeat/clinical-boundary-banner';

export const metadata = constructMetadata({
  title: 'Curriculum Updates & Audit Log | RBT Practice AI',
  description:
    'Official curriculum change log and update policy for RBT Practice AI. Tracking alignment with the BACB RBT 3rd Edition Test Content Outline.',
  path: '/updates',
});

export default function UpdatesPage() {
  const updateLogs = [
    {
      date: 'September 2024 / Updated 2026',
      title: 'Full BACB RBT 3rd Edition Test Content Outline (TCO) Overhaul',
      category: 'Curriculum & Question Bank',
      summary:
        'Complete platform migration to the BACB RBT 3rd Edition Test Content Outline (updated September 2024). Replaced legacy 33-task structure with all 43 canonical tasks across 6 domains (Domains A through F).',
      details: [
        'Updated Domain F from "Professional Conduct" to official BACB title "Ethics" (11 scored questions, 15% exam weight).',
        'Standardized 85-question mock exam format: exactly 75 scored questions + 10 unscored pilot questions, 90 minutes (~63 seconds/question).',
        'Aligned domain percentage allocations: Domain A (17%), Domain B (11%), Domain C (25%), Domain D (19%), Domain E (13%), Domain F (15%).',
        'Overhauled seed question bank to 85 authentic clinical scenarios with balanced correct options (A: 22, B: 21, C: 21, D: 21).',
      ],
    },
    {
      date: 'January 2024',
      title: 'RBT Ethics Code 2.0 Integration',
      category: 'Ethics & Compliance',
      summary:
        'Audited and updated all ethical decision-making scenarios and flashcards to comply with the BACB RBT Ethics Code 2.0.',
      details: [
        'Enforced Section 1 (General Responsibilities): client dignity, mandatory reporting, and culturally responsive services.',
        'Enforced Section 2 (Responsibilities in Practice): avoiding multiple relationships, zero gift policies, and adherence to supervision requirements (minimum 5% monthly, two synchronous meetings).',
        'Enforced Section 3 (Responsibilities to the BACB): test security compliance and mandatory self-reporting of legal/ethical matters.',
      ],
    },
    {
      date: 'Ongoing Policy',
      title: 'Continuous Monitoring & Errata Policy',
      category: 'Platform Policy',
      summary:
        'Policy governing ongoing reviews and prompt corrections of study materials.',
      details: [
        'BACB Announcements: Editorial team reviews official BACB newsletters, handbook revisions, and regulatory notices quarterly.',
        'User Errata Processing: Reports submitted through the "Report Content Issue" feature are investigated within 3 business days.',
        'Deprecation Policy: Questions referencing superseded terminology or retired task codes are systematically updated or archived.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rbt/about" className="hover:text-blue-600 transition-colors">About</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Curriculum Updates</span>
        </nav>

        {/* Header */}
        <div className="space-y-4">
          <Badge variant="blue" className="px-3 py-1 text-xs">
            <History className="w-3.5 h-3.5 mr-1 text-blue-600" />
            Curriculum Maintenance & Revision Log
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Curriculum Updates & Revision History
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            We actively maintain alignment with current Behavior Analyst Certification Board® (BACB®) guidelines. This log documents regulatory migrations, curriculum audits, and platform updates.
          </p>
        </div>

        {/* Content Meta */}
        <ContentMeta
          pageTitle="Curriculum Updates & Revision History"
          topicId="Updates"
          publishedDate="2025-01-15"
          lastReviewedDate="2026-09-23"
        />

        {/* Update Logs Timeline */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2563EB]" />
            <span>Revision Chronology</span>
          </h2>

          <div className="space-y-6">
            {updateLogs.map((log, idx) => (
              <Card key={idx} glass className="p-6 sm:p-8 space-y-4 border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                      {log.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">{log.title}</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{log.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{log.summary}</p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-800 block">Specific Modifications:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600 pl-1">
                    {log.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Clinical Boundary Banner */}
        <ClinicalBoundaryBanner />

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs font-semibold text-blue-600">
          <Link href="/content-review" className="hover:underline flex items-center gap-1">
            &larr; Review Process
          </Link>
          <Link href="/question-methodology" className="hover:underline flex items-center gap-1">
            Question Methodology &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
