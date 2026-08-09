'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ABA_GLOSSARY_TERMS } from '@/lib/seo-engine';
import { BookOpen, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function GlossaryPage() {
  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-screen">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="blue" className="gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>BACB RBT 3rd Edition Glossary</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          ABA Clinical Terminology & Glossary Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Comprehensive dictionary of Applied Behavior Analysis definitions, clinical examples, and mnemonic memory tricks.
        </p>
      </div>

      <div className="space-y-6">
        {ABA_GLOSSARY_TERMS.map((term) => (
          <Card key={term.slug} glass className="p-6 shadow-xl border-white/90 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#2563EB] font-extrabold text-[10px]">
                {term.category} • {term.bacbCitation}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">{term.term}</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {term.definition}
            </p>

            <div className="p-3 rounded-xl bg-blue-50/70 text-xs text-slate-800 space-y-1">
              <div className="font-bold text-[#2563EB]">Clinical Scenario Example:</div>
              <p className="italic">{term.clinicalExample}</p>
            </div>

            {term.mnemonicTip && (
              <div className="p-3 rounded-xl bg-amber-50/70 text-xs text-amber-900 space-y-1">
                <div className="font-extrabold flex items-center space-x-1 text-amber-700">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Mnemonic Trick:</span>
                </div>
                <p>{term.mnemonicTip}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
