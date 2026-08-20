'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ABA_GLOSSARY_TERMS } from '@/lib/seo-engine';
import { BookOpen, Sparkles, Zap, ArrowRight, Search, Layers, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  'All Domains',
  'Data Collection and Graphing',
  'Behavior Assessment',
  'Behavior Acquisition',
  'Behavior Reduction',
  'Documentation and Reporting',
  'Professional Conduct',
];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Domains');

  const filteredTerms = ABA_GLOSSARY_TERMS.filter((term) => {
    const matchesCategory =
      selectedCategory === 'All Domains' || term.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.bacbCitation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="blue" className="gap-1.5 px-3 py-1 font-bold text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>BACB RBT 3rd Edition Clinical Glossary</span>
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
          ABA Clinical Terminology & Glossary Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Comprehensive dictionary of Applied Behavior Analysis definitions, operational criteria, clinical scenario examples, and mnemonic memory tricks mapped to the official BACB Test Content Outline.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terms, definitions (e.g. Duration, DRO, DTT, Latency)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms Count & Results */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1 border-b border-slate-200 pb-3">
        <span>Showing {filteredTerms.length} Clinical Terms</span>
        <span>Aligned with BACB RBT 3rd Edition</span>
      </div>

      {/* Term Cards Grid */}
      <div className="space-y-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <Card key={term.slug} glass className="p-6 sm:p-8 shadow-xl border-white/90 space-y-4 hover:border-blue-200 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-extrabold text-[11px] border border-blue-100">
                  {term.category} • {term.bacbCitation}
                </span>

                <Link
                  href={`/rbt/glossary/${term.slug}`}
                  className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <span>Detailed Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                <Link href={`/rbt/glossary/${term.slug}`} className="hover:text-[#2563EB] transition-colors">
                  {term.term}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {term.definition}
              </p>

              <div className="p-4 rounded-xl bg-blue-50/70 text-xs text-slate-800 space-y-1">
                <div className="font-bold text-[#2563EB]">Clinical Scenario Example:</div>
                <p className="italic text-slate-700">{term.clinicalExample}</p>
              </div>

              {term.mnemonicTip && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 text-xs text-amber-950 space-y-1 border border-amber-200/60">
                  <div className="font-extrabold flex items-center space-x-1.5 text-amber-800">
                    <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span>Mnemonic Memory Trick:</span>
                  </div>
                  <p className="font-medium text-amber-900">{term.mnemonicTip}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold">Related:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(term.relatedTerms || []).slice(0, 2).map((rel, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={`/rbt/glossary/${term.slug}`}>
                  <Button variant="outline" size="sm" className="text-xs font-bold gap-1">
                    <span>Full Breakdown</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No glossary terms match your search</h3>
            <p className="text-xs text-slate-500">Try searching for broader terms like "Measurement" or "Reinforcement".</p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedCategory('All Domains'); }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
