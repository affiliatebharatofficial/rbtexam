import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ABA_GLOSSARY_TERMS, generateBreadcrumbJSONLD, getRelatedInternalLinks } from '@/lib/seo-engine';
import { constructMetadata } from '@/utils/seo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle2,
  Brain,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  HelpCircle,
  Layers,
  FileQuestion,
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface GlossaryTermPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GlossaryTermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = ABA_GLOSSARY_TERMS.find((t) => t.slug === slug);

  if (!term) {
    return constructMetadata({
      title: 'ABA Glossary Term | RBT Practice AI',
      description: 'Explore BACB RBT 3rd Edition Applied Behavior Analysis glossary terms and clinical definitions.',
    });
  }

  const rawDesc = `${term.term} RBT Exam Definition: ${term.definition} (${term.bacbCitation}).`;
  const trimmedDesc = rawDesc.length > 158 ? `${rawDesc.slice(0, 155).trim()}...` : rawDesc;

  // Format title to stay strictly under 60 characters for Google SERP
  const suffix = ' - ABA Glossary | RBT Practice AI'; // 34 chars
  const availableLen = 58 - suffix.length; // 24 chars
  const cleanTerm = term.term.length > availableLen ? `${term.term.slice(0, availableLen - 3).trim()}...` : term.term;
  const pageTitle = `${cleanTerm}${suffix}`;

  return constructMetadata({
    title: pageTitle,
    description: trimmedDesc,
    path: `/rbt/glossary/${term.slug}`,
    keywords: [
      term.term,
      `${term.term} RBT definition`,
      `${term.term} ABA example`,
      term.category,
      term.bacbCitation,
      'RBT Practice AI',
      'BACB RBT 3rd Edition',
    ],
  });
}

export default async function GlossaryTermDetailPage({ params }: GlossaryTermPageProps) {
  const { slug } = await params;
  const term = ABA_GLOSSARY_TERMS.find((t) => t.slug === slug);

  if (!term) {
    notFound();
  }

  // Schema.org DefinedTerm & BreadcrumbList
  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'BACB RBT 3rd Edition Test Content Outline (TCO)',
      url: 'https://rbtpracticeai.com/rbt/glossary',
    },
    url: `https://rbtpracticeai.com/rbt/glossary/${term.slug}`,
  };

  const breadcrumbsJsonLd = generateBreadcrumbJSONLD([
    { name: 'Home', url: '/' },
    { name: 'RBT Prep Hub', url: '/rbt' },
    { name: 'ABA Glossary', url: '/rbt/glossary' },
    { name: term.term, url: `/rbt/glossary/${term.slug}` },
  ]);

  const otherRelatedTerms = ABA_GLOSSARY_TERMS.filter((t) => t.slug !== term.slug).slice(0, 4);

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* Breadcrumb Bar */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/rbt" className="hover:text-slate-600 transition-colors">RBT Hub</Link>
        <span>/</span>
        <Link href="/rbt/glossary" className="hover:text-slate-600 transition-colors">Glossary</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">{term.term}</span>
      </div>

      {/* Main Term Card */}
      <Card glass className="p-6 sm:p-10 shadow-2xl border-white/90 space-y-8">
        
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] font-bold text-xs border border-blue-100">
              {term.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{term.bacbCitation}</span>
            </span>
          </div>

          <span className="text-xs font-bold text-slate-400">BACB RBT 3rd Edition</span>
        </div>

        {/* Term Title & Definition */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            {term.term}
          </h1>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Official ABA Operational Definition
            </h2>
            <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-medium">
              {term.definition}
            </p>
          </div>
        </div>

        {/* Clinical Scenario Breakdown */}
        <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs sm:text-sm text-slate-800">
          <div className="font-extrabold text-[#2563EB] flex items-center gap-1.5 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Applied Clinical Scenario Example:</span>
          </div>
          <p className="italic leading-relaxed text-slate-700">
            "{term.clinicalExample}"
          </p>
        </div>

        {/* Mnemonic Memory Trick */}
        {term.mnemonicTip && (
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
            <div className="font-black text-amber-800 flex items-center gap-1.5 text-sm">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Candidate Exam Mnemonic / Memory Trick:</span>
            </div>
            <p className="font-semibold leading-relaxed text-amber-900">
              {term.mnemonicTip}
            </p>
          </div>
        )}

        {/* Related Terms Pills */}
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Related ABA Concepts & Key Distinctions</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {term.relatedTerms.map((relTerm, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200"
                >
                  {relTerm}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Tutor Ask Card */}
        <div className="p-6 rounded-2xl bg-[#0F172A] text-white space-y-3 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <Brain className="w-5 h-5" />
            <span>Have Questions on {term.term}?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ask Socrates AI Tutor to give you customized clinical roleplay scenarios, practice multiple-choice questions, or explain tricky distractor answers in real time.
          </p>
          <div className="pt-2">
            <Link href="/tutor">
              <Button variant="primary" size="sm" className="gap-2 text-xs font-bold shadow-lg shadow-blue-500/25">
                <span>Ask Socrates AI Tutor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/rbt/glossary">
            <Button variant="outline" size="sm" className="gap-2 text-xs font-bold">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Glossary Index</span>
            </Button>
          </Link>

          <Link href="/exam">
            <Button variant="primary" size="sm" className="gap-2 text-xs font-bold shadow-md">
              <span>Practice Questions in Exam Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

      </Card>

      {/* Explore More Terms Grid */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Explore More ABA Glossary Terms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {otherRelatedTerms.map((other) => (
            <Link
              key={other.slug}
              href={`/rbt/glossary/${other.slug}`}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#2563EB] hover:shadow-md transition-all group flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                  {other.category}
                </div>
                <div className="text-sm font-extrabold text-slate-900 group-hover:text-[#2563EB] transition-colors">
                  {other.term}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 line-clamp-2">
                {other.definition}
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
