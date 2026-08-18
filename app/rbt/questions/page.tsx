'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MasterQuestion } from '@/types/master-question';
import { BACB_TASK_LIST_3RD_EDITION } from '@/lib/bacb-task-list';
import {
  Sparkles,
  BookOpen,
  Brain,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  Search,
  Eye,
  EyeOff,
  ChevronLeft,
  Database,
  HelpCircle,
  Zap,
} from 'lucide-react';

function QuestionsListContent() {
  const searchParams = useSearchParams();
  const initialDomain = searchParams.get('domain') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [questions, setQuestions] = useState<MasterQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/questions?certification=RBT&limit=10000&status=ALL');
        if (res.ok) {
          const json = (await res.json()) as any;
          if (json && Array.isArray(json.data)) {
            setQuestions(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch RBT questions:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const toggleRevealAnswer = (id: string) => {
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter logic
  const filteredQuestions = questions.filter((q) => {
    // 1. Domain Filter
    if (selectedDomain !== 'ALL') {
      const cat = (q.category || '').toLowerCase();
      let matchesDomain = false;
      if (selectedDomain === 'A' && (cat.includes('measurement') || cat.includes('data collection') || cat.includes('graphing'))) matchesDomain = true;
      else if (selectedDomain === 'B' && (cat.includes('assessment') || cat.includes('preference'))) matchesDomain = true;
      else if (selectedDomain === 'C' && (cat.includes('acquisition') || cat.includes('skill') || cat.includes('dtt') || cat.includes('prompt'))) matchesDomain = true;
      else if (selectedDomain === 'D' && (cat.includes('reduction') || cat.includes('behavior reduction') || cat.includes('bip') || cat.includes('extinction') || cat.includes('reinforcement'))) matchesDomain = true;
      else if (selectedDomain === 'E' && (cat.includes('documentation') || cat.includes('reporting') || cat.includes('session notes'))) matchesDomain = true;
      else if (selectedDomain === 'F' && (cat.includes('ethics') || cat.includes('professional') || cat.includes('code'))) matchesDomain = true;
      if (!matchesDomain) return false;
    }

    // 2. Keyword Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchPrompt = (q.question || '').toLowerCase().includes(query);
      const matchCat = (q.category || '').toLowerCase().includes(query);
      const matchScenario = (q.scenarioText || '').toLowerCase().includes(query);
      if (!matchPrompt && !matchCat && !matchScenario) return false;
    }

    return true;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link href="/rbt" className="text-xs font-bold text-[#2563EB] hover:underline flex items-center space-x-1">
              <ChevronLeft className="w-4 h-4" />
              <span>Back to RBT Hub</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black text-[#0F172A]">
            BACB RBT Live Question Directory
          </h1>
          <p className="text-xs text-slate-500">
            Practice questions sourced directly from your live database bank.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/exam">
            <Button variant="primary" size="md" className="gap-2 font-bold shadow-lg">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Take RBT Mock Exam</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <Card glass className="p-4 space-y-4 shadow-lg border-white/90">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Domain Filter Badges */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedDomain('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedDomain === 'ALL'
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Domains ({questions.length})
            </button>
            {BACB_TASK_LIST_3RD_EDITION.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDomain === d.id
                    ? 'bg-[#2563EB] text-white shadow-md font-black'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Domain {d.id} ({d.name.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question prompts..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
            />
          </div>
        </div>
      </Card>

      {/* Question List View */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-bold text-slate-500">Loading Live Database Questions...</p>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <Card glass className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-slate-900">No Questions Found</h3>
            <p className="text-xs text-slate-500">
              No questions matched your selected domain filter or search query.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setSelectedDomain('ALL'); setSearchQuery(''); }}>
            Reset Filters
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="text-xs font-bold text-slate-500 flex items-center justify-between">
            <span>Showing <strong>{filteredQuestions.length}</strong> Live Questions</span>
            <span className="flex items-center space-x-1 text-emerald-600 font-mono">
              <Database className="w-3.5 h-3.5" />
              <span>Supabase PostgreSQL Sync Active</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredQuestions.map((q, idx) => {
              const isRevealed = revealedIds.includes(q.id);
              const correctOption = q.options?.find((o) => o.isCorrect || o.id === q.correctAnswerId);

              return (
                <Card key={q.id || idx} glass className="p-6 space-y-4 shadow-lg border-white/90 hover:border-blue-200 transition-all">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded font-black text-[10px] bg-blue-100 text-[#2563EB]">
                        {q.certification || 'RBT'}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{q.category || 'General'}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        q.difficulty === 'easy'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.difficulty === 'medium'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {(q.difficulty || 'medium').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Question Scenario & Prompt */}
                  {q.scenarioText && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs italic text-slate-600 leading-relaxed">
                      "{q.scenarioText}"
                    </div>
                  )}

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    <span className="text-[#2563EB] font-black mr-2">Q{idx + 1}.</span>
                    {q.question}
                  </h3>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {(q.options || []).map((opt) => {
                      const isCorrectChoice = opt.isCorrect || opt.id === q.correctAnswerId;
                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                            isRevealed && isCorrectChoice
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-sm'
                              : 'bg-white border-slate-200 text-slate-800'
                          }`}
                        >
                          <span className={`inline-block w-5 h-5 rounded-lg text-center leading-5 font-bold mr-2 text-[11px] ${
                            isRevealed && isCorrectChoice ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Rationale & Reveal Toggle */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRevealAnswer(q.id)}
                      className="gap-1.5 text-xs font-bold text-[#2563EB] border-blue-200 bg-blue-50/50 hover:bg-blue-100"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'Hide Rationale' : 'Reveal Correct Answer & Rationale'}</span>
                    </Button>

                    <Link href={`/rbt/question/${q.id}`} className="text-xs font-bold text-slate-500 hover:text-[#2563EB] flex items-center space-x-1">
                      <span>Full Detail View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {isRevealed && (
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-2 animate-fadeIn shadow-inner">
                      <div className="font-extrabold text-emerald-400 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct Answer: Choice {q.correctAnswerId || correctOption?.id || 'A'}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {q.answerExplanation || q.clinicalExplanation || 'Operational ABA criteria require continuous data collection and adherence to BACB task list specifications.'}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RBTQuestionsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs font-bold text-slate-500">Loading Directory...</div>}>
      <QuestionsListContent />
    </Suspense>
  );
}
