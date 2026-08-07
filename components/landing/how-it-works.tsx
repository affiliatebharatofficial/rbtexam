'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Target, Brain, Repeat, ShieldCheck, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Take the Free 15-Minute Diagnostic Exam',
      subtitle: 'Identify Your Baseline Skill Level across 6 BACB Domains',
      description: 'Answer 15 targeted questions representing all 6 BACB 2nd Edition Task List domains. Our scoring engine measures your response speed, confidence level, and conceptual accuracy.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      badgeText: 'Instant Baseline',
      highlightStats: '15 Min Assessment • Real-time Domain Breakdown',
      interactiveContent: {
        domainScores: [
          { domain: 'A. Measurement', score: 85, color: 'bg-emerald-500' },
          { domain: 'B. Assessment', score: 90, color: 'bg-[#2563EB]' },
          { domain: 'C. Skill Acquisition', score: 58, color: 'bg-amber-500' },
          { domain: 'D. Behavior Reduction', score: 62, color: 'bg-amber-500' },
          { domain: 'E. Documentation', score: 95, color: 'bg-emerald-500' },
          { domain: 'F. Professional Conduct', score: 72, color: 'bg-blue-400' },
        ],
      },
    },
    {
      stepNumber: '02',
      title: 'Get Your Personalized AI Study Roadmap',
      subtitle: 'Zero Wasted Time on Concepts You Already Mastered',
      description: 'Socrates AI generates a customized daily study schedule. It prioritizes low-confidence domains like C-04 (Discrete Trial Teaching) or D-02 (Differential Reinforcement) to maximize score gain.',
      icon: Brain,
      color: 'from-indigo-500 to-purple-600',
      badgeText: 'AI Personalized Plan',
      highlightStats: '+18% Average Score Improvement in Week 1',
      interactiveContent: {
        focusTasks: [
          { code: 'C-04', title: 'Discrete Trial Teaching (DTT)', priority: 'High Priority', time: '25 mins' },
          { code: 'D-02', title: 'Differential Reinforcement (DRA/DRO)', priority: 'High Priority', time: '20 mins' },
          { code: 'A-02', title: 'Continuous Measurement (Frequency & Duration)', priority: 'Review', time: '10 mins' },
        ],
      },
    },
    {
      stepNumber: '03',
      title: 'Drill with Socrates AI & Spaced Flashcards',
      subtitle: 'Active Recall & Conversational Scenario Roleplay',
      description: 'Engage with our Socratic AI tutor for instant rationale on ethical dilemmas and clinical scenarios. Review Leitner 5-box flashcards designed to lock ABA terminology into long-term memory.',
      icon: Repeat,
      color: 'from-purple-500 to-pink-500',
      badgeText: 'Adaptive Learning',
      highlightStats: '5-Box Spaced Repetition • 24/7 AI Tutor',
      interactiveContent: {
        flashcardPreviewTerm: 'Extinction Burst',
        flashcardDef: 'A temporary increase in the frequency, duration, or intensity of the unreinforced behavior immediately after extinction is initiated.',
        boxStatus: 'Box 4 of 5 (Mastery: 88%)',
      },
    },
    {
      stepNumber: '04',
      title: 'Pass Your RBT Exam with Guaranteed Confidence',
      subtitle: '99.4% First-Time Pass Rate • Pass Guarantee',
      description: 'Take simulated 85-question 90-minute exams with exact Pearson VUE interface conditions. When your score crosses 85% readiness, you are guaranteed to pass your official BACB exam.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      badgeText: '100% Pass Guarantee',
      highlightStats: '85 Q / 90 Min Full Simulation • Money-Back Guarantee',
      interactiveContent: {
        readinessScore: 97.2,
        status: 'BACB Certified Ready!',
        certificateId: 'RBT-AI-2026-PASS',
      },
    },
  ];

  const currentStep = steps[activeStep];

  return (
    <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Dynamic BG Mesh */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue" className="gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven 4-Step Blueprint</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            How RBTTrainingAI Guarantees Your Exam Success
          </h2>
          <p className="text-base text-slate-600">
            Our scientifically-proven learning engine turns complex ABA concepts into second nature in 4 simple steps.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border relative ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xl scale-[1.02]'
                    : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                    isActive ? 'bg-[#2563EB] text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    Step {step.stepNumber}
                  </span>
                  <step.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-sm font-bold leading-snug line-clamp-1">{step.title}</h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Visual Box */}
        <Card glass className="p-8 max-w-5xl mx-auto shadow-2xl border-white/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentStep.color} flex items-center justify-center text-white shadow-lg`}>
                  <currentStep.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-wider">Step {currentStep.stepNumber}</span>
                  <h3 className="text-2xl font-extrabold text-[#0F172A]">{currentStep.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {currentStep.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Key Advantage:</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {currentStep.highlightStats}
                </p>
              </div>

              <div className="pt-2 flex items-center space-x-4">
                <Link href="/exam">
                  <Button variant="primary" size="md" className="gap-2 shadow-md shadow-blue-500/20">
                    <span>Try Step {currentStep.stepNumber} Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="text-xs font-semibold text-slate-500 hover:text-[#2563EB] transition-colors"
                  >
                    Next Step &rarr;
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Step Preview Widget */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-2xl space-y-4 border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live System Demo</span>
                  </div>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md font-mono">
                    {currentStep.badgeText}
                  </span>
                </div>

                {activeStep === 0 && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-medium">Diagnostic Domain Scores Breakdown:</div>
                    {currentStep.interactiveContent.domainScores?.map((ds, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-200">
                          <span>{ds.domain}</span>
                          <span>{ds.score}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${ds.color} transition-all duration-500`} style={{ width: `${ds.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-medium">Recommended Focus Tasks for Today:</div>
                    {currentStep.interactiveContent.focusTasks?.map((task, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
                        <div>
                          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px] mr-2">{task.code}</span>
                          <span className="font-semibold text-slate-200">{task.title}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-amber-400 font-bold text-[10px] block">{task.priority}</span>
                          <span className="text-slate-400 text-[10px]">{task.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-medium">Spaced Flashcard & AI Tutor Active Memory:</div>
                    <div className="p-4 rounded-xl bg-gradient-to-tr from-slate-800 to-indigo-950/80 border border-indigo-500/30 space-y-2">
                      <div className="text-sm font-extrabold text-blue-300">{currentStep.interactiveContent.flashcardPreviewTerm}</div>
                      <p className="text-xs text-slate-300 leading-relaxed font-mono">
                        "{currentStep.interactiveContent.flashcardDef}"
                      </p>
                      <div className="pt-2 text-[10px] text-emerald-400 font-bold flex items-center justify-between border-t border-slate-700">
                        <span>{currentStep.interactiveContent.boxStatus}</span>
                        <span className="text-blue-400">Next Review: 3 Days</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-4 text-center py-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <div>
                      <div className="text-3xl font-extrabold text-white">{currentStep.interactiveContent.readinessScore}%</div>
                      <div className="text-xs text-emerald-400 font-bold tracking-wide uppercase mt-1">
                        {currentStep.interactiveContent.status}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Pass Guarantee Verification ID: {currentStep.interactiveContent.certificateId}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
