import React from 'react';
import Link from 'next/link';
import { getMasterBankExamQuestions } from '@/lib/sample-questions';
import { generateQuestionJSONLD, generateBreadcrumbJSONLD, getRelatedInternalLinks } from '@/lib/seo-engine';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CheckCircle2, ArrowRight, Brain, BookOpen, ShieldCheck, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const questions = getMasterBankExamQuestions();
  return questions.map((q) => ({
    slug: q.id,
  }));
}

export default async function ProgrammaticQuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const questions = getMasterBankExamQuestions();
  const question = questions.find((q) => q.id === slug) || questions[0];

  const jsonLd = generateQuestionJSONLD(question);
  const breadcrumbsJsonLd = generateBreadcrumbJSONLD([
    { name: 'Home', url: '/' },
    { name: 'RBT Prep', url: '/rbt' },
    { name: 'Questions', url: '/rbt/questions' },
    { name: `Question ${question.id}`, url: `/rbt/question/${question.id}` },
  ]);

  const relatedLinks = getRelatedInternalLinks(question.domainId);

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
            BACB {question.taskItemId} • Domain {question.domainId}
          </Badge>
          <span className="text-xs font-bold text-slate-400">Task List 2nd Edition</span>
        </div>

        {question.scenarioText && (
          <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            "{question.scenarioText}"
          </p>
        )}

        <h1 className="text-xl sm:text-2xl font-black text-[#0F172A]">
          {question.questionText}
        </h1>

        {/* Options Breakdown */}
        <div className="space-y-3">
          {question.options.map((opt) => {
            const isCorrect = opt.id === question.correctOptionId;
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

                {/* Distractor Rationale */}
                {opt.explanation && (
                  <p className="text-xs text-slate-500 font-normal mt-2 pl-10 leading-relaxed">
                    {opt.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Socrates AI Clinical ABA Rationale */}
        <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-slate-800 space-y-2">
          <div className="font-extrabold text-[#2563EB] flex items-center space-x-1">
            <Brain className="w-4 h-4 text-[#2563EB]" />
            <span>Socrates AI Clinical ABA Rationale:</span>
          </div>
          <p className="leading-relaxed">{question.aiExplanationDetail}</p>
          <div className="text-[10px] text-slate-400 font-mono pt-1">{question.bacbCitation}</div>
        </div>

        {/* CTA Launchers */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/rbt/questions">
            <Button variant="outline" size="md" className="gap-1.5 text-xs">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Question Directory</span>
            </Button>
          </Link>

          <Link href="/exam">
            <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
              <Sparkles className="w-4 h-4" />
              <span>Take Full 85-Q Mock Exam</span>
            </Button>
          </Link>
        </div>
      </Card>

      {/* Related Programmatic Links */}
      <Card glass className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Related RBT Practice Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {relatedLinks.map((link, idx) => (
            <Link key={idx} href={link.url} className="p-3 rounded-xl bg-white border border-slate-200 font-semibold text-slate-800 hover:text-[#2563EB] flex items-center justify-between">
              <span>{link.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
