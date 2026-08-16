'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateCourseJSONLD, getRelatedInternalLinks } from '@/lib/seo-engine';
import { BACB_TASK_LIST_3RD_EDITION } from '@/lib/bacb-task-list';
import { MasterQuestion } from '@/types/master-question';
import {
  Sparkles,
  BookOpen,
  Brain,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  FileText,
  HelpCircle,
  Zap,
  RefreshCw,
  Database,
} from 'lucide-react';

export default function RBTPillarPage() {
  const jsonLd = generateCourseJSONLD('RBT');
  const relatedLinks = getRelatedInternalLinks('Measurement');

  const [dbQuestions, setDbQuestions] = useState<MasterQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLiveQuestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/questions?certification=RBT&limit=10000&status=ALL');
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.data)) {
          setDbQuestions(json.data);
        }
      }
    } catch (e) {
      console.error('Failed to fetch live database questions for RBT Hub:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveQuestions();
  }, []);

  // Helper to count live DB questions for a specific BACB Domain
  const getLiveDomainCount = (domainId: string, domainName: string) => {
    if (dbQuestions.length === 0) return 0;
    return dbQuestions.filter((q) => {
      const cat = (q.category || '').toLowerCase();
      if (domainId === 'A' && (cat.includes('measurement') || cat.includes('data collection') || cat.includes('graphing'))) return true;
      if (domainId === 'B' && (cat.includes('assessment') || cat.includes('preference'))) return true;
      if (domainId === 'C' && (cat.includes('acquisition') || cat.includes('skill') || cat.includes('dtt') || cat.includes('prompt'))) return true;
      if (domainId === 'D' && (cat.includes('reduction') || cat.includes('behavior reduction') || cat.includes('bip') || cat.includes('extinction') || cat.includes('reinforcement'))) return true;
      if (domainId === 'E' && (cat.includes('documentation') || cat.includes('reporting') || cat.includes('session notes'))) return true;
      if (domainId === 'F' && (cat.includes('ethics') || cat.includes('professional') || cat.includes('code'))) return true;
      return cat.includes(domainName.toLowerCase());
    }).length;
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 min-h-screen">
      {/* Inject JSON-LD Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="blue" className="gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BACB® RBT 3rd Edition Task List Standard</span>
          </Badge>

          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center space-x-1.5 border border-emerald-200">
            <Database className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Live Database: {dbQuestions.length} RBT Questions</span>
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
          RBT Exam Preparation Hub & Practice Simulator
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Master all 6 BACB Task List domains with live database practice questions, 85-question mock exams, Leitner flashcards, and Socrates AI Tutor mentorship.
        </p>

        <div className="pt-2 flex justify-center space-x-3">
          <Link href="/exam">
            <Button variant="primary" size="lg" className="gap-2 shadow-xl shadow-blue-500/25 px-8">
              <span>Start 85-Q Mock Exam</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/tutor">
            <Button variant="outline" size="lg" className="gap-2">
              <Brain className="w-5 h-5 text-[#2563EB]" />
              <span>Ask Socrates AI</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* BACB Domains Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-[#0F172A]">
            BACB RBT 3rd Edition Task List Domains Breakdown
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLiveQuestions}
            disabled={isLoading}
            className="gap-1.5 text-xs font-bold"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Live DB</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BACB_TASK_LIST_3RD_EDITION.map((d) => {
            const liveCount = getLiveDomainCount(d.id, d.name);
            return (
              <Card key={d.id} glass className="p-6 space-y-3 hover:border-blue-300 transition-all shadow-md">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-[#2563EB] font-bold text-xs">
                    Domain {d.id}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {d.weightPercentage}% Exam Weight
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{d.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{d.description}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-[#2563EB] flex items-center space-x-1">
                      <Database className="w-3.5 h-3.5" />
                      <span>{liveCount > 0 ? `${liveCount} Live DB Questions` : 'Live DB Sync Active'}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{d.items.length} Task List Competencies</div>
                  </div>

                  <Link href={`/rbt/questions?domain=${d.id}`} className="font-bold text-[#2563EB] hover:underline flex items-center space-x-1">
                    <span>View Questions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Programmatic Internal Links Graph */}
      <Card glass className="p-8 shadow-xl border-white/90 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-[#2563EB]" />
          <span>Programmatic RBT Study Hub Links</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedLinks.map((link, idx) => (
            <Link key={idx} href={link.url} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-1 block group">
              <div className="text-[10px] font-extrabold text-[#2563EB] uppercase">{link.category}</div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] flex items-center justify-between">
                <span>{link.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </h4>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
