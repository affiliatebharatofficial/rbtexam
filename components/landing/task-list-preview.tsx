'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BACB_TASK_LIST_2ND_EDITION } from '@/lib/bacb-task-list';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { getDomainColor } from '@/utils/formatters';

export function TaskListPreview() {
  const [activeDomainId, setActiveDomainId] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F'>('A');

  const selectedDomain = BACB_TASK_LIST_2ND_EDITION.find(d => d.id === activeDomainId) || BACB_TASK_LIST_2ND_EDITION[0];
  const colorStyle = getDomainColor(selectedDomain.id);

  return (
    <section className="py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue">100% BACB Coverage</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            BACB 2nd Edition Task List Explorer
          </h2>
          <p className="text-base text-slate-600">
            Select a domain below to preview specific task list items, exam question weights, and essential concepts.
          </p>
        </div>

        {/* Domain Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {BACB_TASK_LIST_2ND_EDITION.map((domain) => {
            const isActive = domain.id === activeDomainId;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainId(domain.id as any)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-[#2563EB] flex items-center justify-center font-extrabold text-[10px]">
                  {domain.id}
                </span>
                <span>{domain.name}</span>
                <span className="text-[10px] opacity-70">({domain.weightPercentage}%)</span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Detail Card */}
        <Card glass className="p-8 max-w-4xl mx-auto border-white/80 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-lg text-sm font-extrabold ${colorStyle.badge}`}>
                  Domain {selectedDomain.id}
                </span>
                <h3 className="text-2xl font-bold text-[#0F172A]">{selectedDomain.name}</h3>
              </div>
              <p className="text-sm text-slate-600">{selectedDomain.description}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-extrabold text-[#2563EB]">{selectedDomain.weightPercentage}%</div>
              <div className="text-xs text-slate-400 font-medium">Exam Weight (~{selectedDomain.questionCountApprox} Qs)</div>
            </div>
          </div>

          {/* Sub-items list */}
          <div className="py-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Domain Task Items:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDomain.items.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-200 transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold">{item.id}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.examWeightPercentage}% Weight</span>
                  </div>
                  <h5 className="text-sm font-bold text-slate-800">{item.title}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.keyConcepts.map((kc, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {kc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link href="/task-list">
              <Button variant="primary" size="md" className="gap-2 shadow-md">
                <BookOpen className="w-4 h-4" />
                <span>Explore Full Interactive Study Guide</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}
