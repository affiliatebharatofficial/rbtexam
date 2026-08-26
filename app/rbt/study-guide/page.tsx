import React from 'react';
import Link from 'next/link';
import { constructMetadata } from '@/utils/seo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
  FileText,
  Brain,
  Award,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Official RBT Exam Study Guide & 3rd Edition Task Breakdown | RBT Practice AI',
  description:
    'Comprehensive BACB RBT 3rd Edition Exam Study Guide. Master all 6 task list domains: Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation, and Ethics.',
  path: '/rbt/study-guide',
  keywords: [
    'rbt exam study guide',
    'rbt study guide 2026',
    'bacb rbt 3rd edition study guide',
    'rbt task list breakdown',
    'rbt exam prep',
    'rbt practice test guide',
  ],
});

export default function RBTStudyGuidePage() {
  const domains = [
    {
      code: 'A',
      title: 'Measurement & Data Collection',
      weight: '12 Questions (14%)',
      desc: 'Master continuous measurement (frequency, rate, duration, latency, IRT), discontinuous measurement (partial/whole interval, momentary time sampling), permanent product recording, and graphing.',
      keyConcepts: ['Frequency & Rate', 'Duration & Latency', 'Inter-Response Time (IRT)', 'Interval Recording', 'Cumulative Records'],
      link: '/rbt/questions?domain=A',
    },
    {
      code: 'B',
      title: 'Assessment',
      weight: '8 Questions (9%)',
      desc: 'Conduct preference assessments (free operant, MSW, MSWO, paired stimulus), assist with functional behavior assessments (FBA, ABC data collection), and descriptive assessments.',
      keyConcepts: ['ABC Data Collection', 'Preference Assessments', 'FBA Assistance', 'Direct Observation'],
      link: '/rbt/questions?domain=B',
    },
    {
      code: 'C',
      title: 'Skill Acquisition',
      weight: '24 Questions (28%)',
      desc: 'Implement discrete trial training (DTT), naturalistic teaching (NET), forward/backward task chaining, shaping, stimulus control transfer, prompt fading hierarchies, and token economies.',
      keyConcepts: ['Discrete Trial Training (DTT)', 'Naturalistic Teaching (NET)', 'Task Chaining', 'Prompt Fading', 'Token Economy'],
      link: '/rbt/questions?domain=C',
    },
    {
      code: 'D',
      title: 'Behavior Reduction',
      weight: '12 Questions (14%)',
      desc: 'Implement behavior intervention plans (BIP), antecedent strategies, motivating operations (EO/AO), differential reinforcement (DRA, DRI, DRO), extinction bursts, and crisis/emergency protocols.',
      keyConcepts: ['Motivating Operations (MO)', 'DRA / DRI / DRO', 'Extinction & Extinction Burst', 'Antecedent Manipulations'],
      link: '/rbt/questions?domain=D',
    },
    {
      code: 'E',
      title: 'Documentation & Reporting',
      weight: '10 Questions (12%)',
      desc: 'Write objective, measurable session notes, report variable factors affecting clients, comply with legal and regulatory mandates, and follow mandatory abuse reporting protocols.',
      keyConcepts: ['Objective Session Notes', 'Mandatory Abuse Reporting', 'Data Archiving (7 Years)', 'Incident Reporting'],
      link: '/rbt/questions?domain=E',
    },
    {
      code: 'F',
      title: 'Professional Conduct & Scope of Practice',
      weight: '9 Questions (11%)',
      desc: 'Adhere to the BACB RBT Ethics Code 2.0, maintain professional boundaries (avoid dual relationships & gifts), meet 5% monthly supervision requirements, and practice within RBT scope.',
      keyConcepts: ['5% Monthly Supervision', '2 Synchronous Meetings', 'Zero Gift Policy', 'Role Boundaries'],
      link: '/rbt/questions?domain=F',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/rbt" className="hover:text-blue-600 transition-colors">RBT Hub</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Study Guide</span>
        </nav>

        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="blue" className="px-3.5 py-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-600" />
            BACB RBT 3rd Edition Test Outline Aligned
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            Official RBT Exam Study Guide & Blueprint
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to master the Registered Behavior Technician® examination.
            Structured across all 6 core domains with clinical examples, task outlines, and practice simulators.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/rbt/mock-exam">
              <Button variant="primary" size="lg" className="shadow-lg shadow-blue-500/25 gap-2">
                <Zap className="w-4 h-4 fill-white" />
                <span>Take Full 85-Question Mock Exam</span>
              </Button>
            </Link>
            <Link href="/rbt/flashcards">
              <Button variant="outline" size="lg" className="gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Study Leitner Flashcards</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 6 Domains Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span>The 6 BACB RBT Task List Domains</span>
            </h2>
            <Link href="/task-list" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>View Full Task List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domains.map((d) => (
              <Card key={d.code} glass className="p-6 space-y-4 hover:border-blue-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                      {d.code}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{d.title}</h3>
                      <p className="text-xs font-bold text-blue-600">{d.weight}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{d.desc}</p>

                <div className="pt-2">
                  <p className="text-xs font-bold text-slate-700 mb-2">High-Yield Concepts:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.keyConcepts.map((c) => (
                      <span key={c} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={d.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Practice Domain {d.code} Questions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/tutor?topic=${d.code}-01`}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Ask AI Tutor
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Exam Blueprint Breakdown Card */}
        <Card glass className="p-8 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            <span>BACB RBT Examination Format & Scoring Blueprint</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-2xl font-black text-blue-600">85</span>
              <p className="text-xs font-bold text-slate-800">Total Multiple-Choice Questions</p>
              <p className="text-[11px] text-slate-500">75 Scored + 10 Pilot Questions</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-2xl font-black text-blue-600">90 Mins</span>
              <p className="text-xs font-bold text-slate-800">Total Time Allowed</p>
              <p className="text-[11px] text-slate-500">~63 Seconds Per Question</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-2xl font-black text-blue-600">80%+</span>
              <p className="text-xs font-bold text-slate-800">Target Passing Score</p>
              <p className="text-[11px] text-slate-500">Criterion-Referenced Standard</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
              <span className="text-2xl font-black text-blue-600">Pearson VUE</span>
              <p className="text-xs font-bold text-slate-800">Testing Environment</p>
              <p className="text-[11px] text-slate-500">In-Person or OnVUE Remote</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
