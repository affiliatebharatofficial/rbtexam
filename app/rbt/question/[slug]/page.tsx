import React from 'react';
import Link from 'next/link';
import { fetchQuestionByIdOrCodeAsync } from '@/lib/master-question-bank-server';
import { generateQuestionJSONLD, generateBreadcrumbJSONLD, getRelatedInternalLinks } from '@/lib/seo-engine';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CheckCircle2, ArrowRight, Brain, BookOpen, ShieldCheck, ArrowLeft } from 'lucide-react';
import { MasterQuestion } from '@/types/master-question';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProgrammaticQuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const foundQuestion = await fetchQuestionByIdOrCodeAsync(slug);

  const question: MasterQuestion = foundQuestion || {
    id: 'sample-01',
    certification: 'RBT',
    category: 'Measurement',
    difficulty: 'medium',
    questionType: 'scenario_based',
    question: 'An RBT measures the exact time elapsed between presentation of the instruction and initiation of the response. Which measurement procedure is the RBT using?',
    scenarioText: 'In a 1-on-1 session, the RBT says "Touch red". The learner waits 5 seconds before beginning to move their hand.',
    options: [
      { id: 'A', text: 'Latency', isCorrect: true, explanation: 'Latency measures elapsed time from stimulus onset to response initiation.' },
      { id: 'B', text: 'Duration', isCorrect: false, explanation: 'Duration measures total elapsed time from response start to finish.' },
      { id: 'C', text: 'Inter-Response Time (IRT)', isCorrect: false, explanation: 'IRT measures elapsed time between two consecutive responses.' },
      { id: 'D', text: 'Frequency', isCorrect: false, explanation: 'Frequency counts total number of occurrences.' },
    ],
    correctAnswerId: 'A',
    answerExplanation: 'Latency is the exact measure of time from SD presentation to response initiation.',
    clinicalExplanation: 'BACB Measurement Competencies (Domain A-02).',
    references: 'BACB RBT 3rd Edition Task List',
    keywords: ['Latency', 'Measurement'],
    taskListVersion: '3rd_edition',
    estimatedTimeSeconds: 60,
    tags: ['BACB', 'Measurement'],
    status: 'published',
    isPremium: false,
    isFeatured: false,
    version: 1,
    createdBy: 'System',
    updatedBy: 'System',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const domainId = question.category?.includes('Measurement') ? 'A' : 'B';

  const jsonLd = generateQuestionJSONLD({
    id: question.id,
    questionText: question.question,
    scenarioText: question.scenarioText,
    options: question.options.map((o) => ({ id: o.id, text: o.text, explanation: o.explanation })),
    correctOptionId: question.correctAnswerId || 'A',
    explanation: question.answerExplanation,
    domainId,
    taskItemId: 'A-02',
  });

  const breadcrumbsJsonLd = generateBreadcrumbJSONLD([
    { name: 'Home', url: '/' },
    { name: 'RBT Prep', url: '/rbt' },
    { name: 'Questions', url: '/rbt/questions' },
    { name: `Question ${question.id}`, url: `/rbt/question/${question.id}` },
  ]);

  const relatedLinks = getRelatedInternalLinks(domainId);

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-screen">
      {/* Inject QAPage & Breadcrumb JSON-LD Rich Snippets */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

      {/* Breadcrumb Bar */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-slate-600">Home</Link>
        <span>/</span>
        <Link href="/rbt" className="hover:text-slate-600">RBT</Link>
        <span>/</span>
        <Link href="/rbt/questions" className="hover:text-slate-600">Questions</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">{question.id}</span>
      </div>

      {/* Main Question Card */}
      <Card glass className="p-8 shadow-2xl border-white/90 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <Badge variant="blue">
            BACB • {question.category}
          </Badge>
          <span className="text-xs font-bold text-slate-400">RBT 3rd Edition Task List</span>
        </div>

        {question.scenarioText && (
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            "{question.scenarioText}"
          </p>
        )}

        <h1 className="text-xl sm:text-2xl font-black text-[#0F172A]">
          {question.question}
        </h1>

        {/* Options Breakdown */}
        <div className="space-y-3">
          {(question.options || []).map((opt) => {
            const isCorrect = opt.isCorrect || opt.id === question.correctAnswerId;
            return (
              <div
                key={opt.id}
                className={`p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all ${
                  isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs ${
                      isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isCorrect && (
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                      CORRECT CHOICE
                    </span>
                  )}
                </div>

                {opt.explanation && (
                  <p className="text-xs text-slate-500 font-normal mt-2 pl-10 leading-relaxed">
                    {opt.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Clinical Rationale Box */}
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 text-xs sm:text-sm space-y-3 shadow-inner">
          <div className="flex items-center space-x-2 font-bold text-amber-400">
            <Brain className="w-5 h-5" />
            <span>Socrates AI Clinical ABA Rationale:</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {question.answerExplanation || question.clinicalExplanation || 'Operational criteria require objective data collection and compliance with BACB task list specifications.'}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link href="/rbt/questions">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Questions</span>
            </Button>
          </Link>

          <Link href="/exam">
            <Button variant="primary" size="sm" className="gap-2 shadow-lg">
              <span>Practice on Exam Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Programmatic Internal Links */}
      <Card glass className="p-6 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Related RBT Study Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {relatedLinks.map((link, idx) => (
            <Link key={idx} href={link.url} className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 transition-all text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>{link.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
