'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BACB_TASK_LIST_3RD_EDITION } from '@/lib/bacb-task-list';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDomainColor } from '@/utils/formatters';
import { BookOpen, Search, Sparkles, ChevronRight, CheckCircle2, FileText } from 'lucide-react';

export default function TaskListPage() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDomains = BACB_TASK_LIST_3RD_EDITION.filter((domain) => {
    if (selectedDomainId !== 'ALL' && domain.id !== selectedDomainId) return false;
    return true;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-blue-950 text-white p-8 rounded-3xl shadow-xl space-y-3">
        <Badge variant="blue" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
          Official Syllabus Reference
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight">BACB RBT 3rd Edition Task List Study Hub</h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Master all 6 domains and individual task items required for the Registered Behavior Technician certification exam.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedDomainId('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDomainId === 'ALL'
                ? 'bg-[#0F172A] text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Domains
          </button>
          {BACB_TASK_LIST_3RD_EDITION.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDomainId(d.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDomainId === d.id
                  ? 'bg-[#2563EB] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Domain {d.id}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items (e.g. DTT, DRO)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Domain Cards & Items List */}
      <div className="space-y-8">
        {filteredDomains.map((domain) => {
          const style = getDomainColor(domain.id);
          const itemsToDisplay = domain.items.filter((item) => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return (
              item.id.toLowerCase().includes(q) ||
              item.title.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q) ||
              item.keyConcepts.some((kc) => kc.toLowerCase().includes(q))
            );
          });

          if (itemsToDisplay.length === 0) return null;

          return (
            <Card key={domain.id} className="p-8 space-y-6">
              {/* Domain Title Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div className="flex items-center space-x-3">
                  <span className={`w-10 h-10 rounded-xl ${style.bg} ${style.text} flex items-center justify-center font-extrabold text-base shadow-sm`}>
                    {domain.id}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-[#0F172A]">{domain.name}</h2>
                    <p className="text-xs text-slate-500">{domain.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="blue">{domain.weightPercentage}% Exam Weight</Badge>
                  <span className="text-xs text-slate-400 font-medium">~{domain.questionCountApprox} Questions</span>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itemsToDisplay.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                        {item.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{item.examWeightPercentage}% Weight</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Concepts:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.keyConcepts.map((kc, i) => (
                          <span key={i} className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            {kc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Link href={`/tutor?topic=${item.id}`}>
                        <Button variant="ghost" size="sm" className="text-xs text-[#2563EB] gap-1">
                          <span>Practice Item with AI</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
