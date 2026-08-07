'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Star, Award, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-100">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Announcement Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>Aligned with 2026 BACB 2nd Edition Task List</span>
              <span className="bg-[#2563EB] text-white px-2 py-0.5 rounded-full text-[10px]">99.4% Pass Rate</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              Pass Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-blue-600 to-indigo-600">RBT Exam</span> On Your First Try. Guaranteed.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Powered by <strong className="text-slate-900 font-semibold">Socrates AI</strong>. Experience adaptive BACB scenario simulations, domain-by-domain weakness heatmaps, and spaced-repetition flashcards tailored for US RBT candidates.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-slate-700 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>85-Question 90-Min Timed BACB Mocks</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Socrates AI Ethics & Roleplay Tutor</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Domains A-F Task List Mastery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>B2B Clinic Supervisor Dashboard</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/exam" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2 text-base px-8 py-4 shadow-xl shadow-blue-500/25">
                  <span>Start Free Diagnostic Exam</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/tutor" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-6 py-4">
                  <Brain className="w-5 h-5 text-[#2563EB]" />
                  <span>Try Socrates AI Tutor</span>
                </Button>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-6 border-t border-slate-200/60 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-1.5">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">JD</div>
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">SK</div>
                  <div className="w-7 h-7 rounded-full bg-indigo-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">AM</div>
                </div>
                <span className="font-semibold text-slate-800">14,200+ RBTs Prepared</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-slate-800">4.9/5</span>
                <span className="text-slate-400">(2,100+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Apple-Level Product Card */}
          <div className="lg:col-span-5">
            <Card glass className="p-6 relative shadow-2xl shadow-blue-500/10 border-white/80">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Live AI Exam Engine</span>
                </div>
                <Badge variant="blue">Real-Time Scoring</Badge>
              </div>

              {/* Sample Question Preview */}
              <div className="py-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-[#2563EB]">BACB Task List C-04</span>
                  <span>Question 42 of 85</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  An RBT delivers a Discriminative Stimulus (SD), provides immediate physical guidance, and delivers high-value reinforcer upon completion. What procedure is being demonstrated?
                </p>

                {/* Simulated Options */}
                <div className="space-y-2 text-xs font-medium">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 flex items-center justify-between">
                    <span>A. Naturalistic Free Operant Observation</span>
                  </div>
                  <div className="p-3 rounded-xl border-2 border-[#22C55E] bg-emerald-50/60 text-emerald-900 font-semibold flex items-center justify-between">
                    <span>B. Discrete Trial Teaching (DTT) with Most-to-Least Prompting</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 flex items-center justify-between">
                    <span>C. Extinction Burst Response</span>
                  </div>
                </div>

                {/* AI Rationale Snippet */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/70 text-xs space-y-1 text-slate-700">
                  <div className="flex items-center space-x-1.5 font-bold text-[#2563EB]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Socrates AI Rationale:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Correct! DTT uses structured SD -&gt; Prompt -&gt; Response -&gt; Reinforcement cycles. Most-to-least prompting ensures initial success.
                  </p>
                </div>
              </div>

              {/* Simulated Readiness Gauge */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 p-3 rounded-xl">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Exam Pass Likelihood</div>
                  <div className="text-lg font-extrabold text-[#22C55E]">96.4% Ready</div>
                </div>
                <Award className="w-8 h-8 text-[#2563EB]" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
