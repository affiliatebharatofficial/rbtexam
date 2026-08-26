import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { constructMetadata } from '@/utils/seo';
import {
  Brain,
  ShieldCheck,
  Target,
  Users,
  Award,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'About Us | RBT Practice AI Platform & Mission',
  description:
    'Discover the mission behind RBT Practice AI: empowering Registered Behavior Technician candidates to master Applied Behavior Analysis (ABA) and pass the BACB certification exam with confidence.',
  path: '/rbt/about',
});

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="blue" className="gap-1.5 px-3 py-1 font-bold text-xs">
            <Brain className="w-3.5 h-3.5" />
            <span>Our Mission & Educational Vision</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            Empowering the Next Generation of Behavior Technicians
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            RBT Practice AI was founded by Board Certified Behavior Analysts (BCBAs) and clinical educators with a simple mission: to make high-quality, realistic RBT exam preparation accessible, adaptive, and stress-free for every candidate.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card glass className="p-6 space-y-3 border-blue-100 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">Clinical Precision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every question is rigorously aligned with the <strong>BACB RBT 3rd Edition Test Content Outline</strong> across Domains A through F, mirroring the exact phrasing and cognitive complexity of the real exam.
            </p>
          </Card>

          <Card glass className="p-6 space-y-3 border-emerald-100 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">Socrates AI Mentorship</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We go beyond rote memorization. Our conversational AI tutor explains <em>why</em> correct options succeed and why distractors fail, reinforcing deep clinical intuition and ethical decision-making.
            </p>
          </Card>

          <Card glass className="p-6 space-y-3 border-indigo-100 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">Pass-or-Refund Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We stand firmly behind our training methodology. Candidates who complete our diagnostic mock exams and do not pass receive a 100% full refund with zero hassle.
            </p>
          </Card>
        </div>

        {/* Story & Commitment */}
        <Card glass className="p-8 sm:p-12 shadow-xl border-white/90 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-black text-[#0F172A]">Built for Candidates, Trusted by Clinics</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Registered Behavior Technicians are the frontline heroes of autism care and behavioral therapy. They spend thousands of hours implementing behavior reduction and acquisition plans that change children’s lives.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yet too many candidates struggle with outdated PDF study guides and generic question banks. RBT Practice AI bridges that gap by combining timed exam simulation, Leitner spaced repetition flashcards, and diagnostic heatmaps that ensure complete exam readiness before test day.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Have questions or want to partner?</span>
              <a href="mailto:hello@rbtpracticeai.com" className="text-[#2563EB] font-bold hover:underline">
                hello@rbtpracticeai.com
              </a>
            </div>
            <Link href="/pricing">
              <Button variant="primary" size="md" className="gap-2 shadow-lg">
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
}
