'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  CheckCircle2,
  Brain,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Award,
} from 'lucide-react';

export function SeoContentSection() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="blue" className="gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isEs ? 'Guía Completa de Preparación para el Examen' : 'Complete Exam Prep Guide'}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {isEs
              ? 'Guía Completa para la Práctica y Preparación del Examen RBT (BACB 3ª Edición)'
              : 'Comprehensive Guide to RBT Practice & RBT Exam Prep (BACB 3rd Edition)'}
          </h2>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            {isEs
              ? 'Todo lo que necesitas saber para prepararte para el examen de certificación Registered Behavior Technician®, recuerdo activo, simulacros y acceso 100% gratuito.'
              : 'Everything you need to know about preparing for the Registered Behavior Technician® certification exam, active recall, mock test strategies, and our 7-day free trial.'}
          </p>
        </div>

        {/* Main Educational Articles Body */}
        <article className="space-y-12 text-slate-700 leading-relaxed">
          {/* Section 1: What is RBT Practice */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">1</span>
              {isEs ? '¿Qué es la Práctica de RBT y por qué es Esencial una Preparación Estructurada?' : 'What Is RBT Practice and Why Is Structured Exam Prep Essential?'}
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Structured <strong>RBT practice</strong> is the systematic process of applying Applied Behavior Analysis (ABA) principles to realistic clinical scenarios before taking the official certification test. Becoming a Registered Behavior Technician® requires demonstrating competency across measurement, assessment, skill acquisition, behavior reduction, documentation, and professional ethics.
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              Unlike traditional academic subjects that rely on rote memorization, the <strong>rbt exam</strong> evaluates your clinical decision-making. Candidates must distinguish between subtle nuances—such as when to use momentary time sampling versus partial interval recording, or how to identify an extinction burst during a treatment session. Dedicated <strong>rbt exam prep</strong> transforms abstract behavioral definitions into practical, exam-ready knowledge.
            </p>
          </Card>

          {/* Section 2: Why Practice Questions & Active Recall Work */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">2</span>
              Why Practice Questions and Active Recall Accelerate Your Learning
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Cognitive science demonstrates that passive reading of study manuals produces low retention rates compared to active retrieval practice. Working through high-quality <Link href="/rbt/questions" className="text-[#2563EB] font-semibold underline hover:text-blue-700">rbt practice questions</Link> forces your brain to retrieve learned concepts, recognize discriminative stimuli within scenario stems, and evaluate distractors under pressure.
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              When you encounter challenging <strong>rbt exam questions</strong>, the learning happens not just when you analyze why incorrect alternatives are flawed. Using our <Link href="/flashcards" className="text-[#2563EB] font-semibold underline hover:text-blue-700">spaced repetition flashcards</Link> alongside question banks reinforces crucial terminology—like Differential Reinforcement of Alternative Behavior (DRA), Inter-Response Time (IRT), and Discrete Trial Teaching (DTT)—until recall becomes automatic.
            </p>
          </Card>

          {/* Section 3: 85-Question Mock Exams */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">3</span>
              How Realistic 85-Question Mock Exams Prepare You for Test Day
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              The official certification test consists of 85 multiple-choice questions administered within a strict 90-minute time limit. Taking an authentic <Link href="/rbt/mock-exam" className="text-[#2563EB] font-semibold underline hover:text-blue-700">rbt practice exam 85 questions</Link> simulation is crucial for building pacing and cognitive stamina.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <Clock className="w-5 h-5 text-[#2563EB] mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Pacing Mastery</h4>
                <p className="text-xs text-slate-600 mt-1">Practice budgeting approximately 60 seconds per question with 15 minutes reserved for review.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <Layers className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Weighted Scoring</h4>
                <p className="text-xs text-slate-600 mt-1">Questions mirror BACB percentage weights across all 6 official task domains.</p>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <Award className="w-5 h-5 text-indigo-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Reduced Anxiety</h4>
                <p className="text-xs text-slate-600 mt-1">Familiarity with question flagging and navigation eliminates test-day hesitation.</p>
              </div>
            </div>
          </Card>

          {/* Section 4: BACB 3rd Edition TCO */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">4</span>
              Mastering the BACB RBT 3rd Edition Test Content Outline (Domains A–F)
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Exam candidates must prepare exclusively with the current <strong>BACB RBT Test Content Outline (3rd Edition)</strong>. Outdated materials referencing retired standards fail to reflect current supervision requirements and modern ethical expectations. Our <Link href="/task-list" className="text-[#2563EB] font-semibold underline hover:text-blue-700">RBT study guide</Link> breaks down all 6 required content areas:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Domain A: Data Collection & Graphing (14%)</strong> — Continuous/discontinuous measurement and line graphs.</span>
              </li>
              <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Domain B: Behavior Assessment (12%)</strong> — Preference assessments and ABC functional data collection.</span>
              </li>
              <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Domain C: Behavior Acquisition (28%)</strong> — DTT, NET, task analysis, prompt hierarchies, and token economies.</span>
              </li>
              <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Domain D: Behavior Reduction (18%)</strong> — Antecedent strategies, differential reinforcement (DRA/DRO), and extinction.</span>
              </li>
              <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Domain E: Documentation & Reporting (12%)</strong> — Objective session notes, legal requirements, and crisis reporting.</span>
              </li>
              <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Domain F: Professional Conduct & Ethics (16%)</strong> — RBT Ethics Code 2.0, dual relationships, and supervision compliance.</span>
              </li>
            </ul>
          </Card>

          {/* Section 5: Socrates AI Explanations */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">5</span>
              How Socratic AI Explanations Eliminate Conceptual Confusion
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              One of the greatest obstacles during <strong>rbt exam prep 2026</strong> is not understanding why a plausible-looking distractor is incorrect. Static answer keys offer single-sentence answers that leave candidates confused.
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              With our <Link href="/tutor" className="text-[#2563EB] font-semibold underline hover:text-blue-700">Socrates AI Tutor</Link>, you receive conversational clinical rationales that deconstruct each option. If you are struggling to distinguish between negative reinforcement and punishment, Socrates walks you through real-world behavioral contingency examples until the core mechanism is clear.
            </p>
          </Card>

          {/* Section 6: How to Study Step-by-Step */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">6</span>
              Step-by-Step Study Strategy: How to Use an RBT Exam Practice Test
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              To maximize your retention and achieve an 85%+ readiness score, follow this structured study strategy during your <strong>rbt practice exam 2026 free</strong> diagnostic and study workflow:
            </p>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium list-decimal pl-5">
              <li><strong>Take a Baseline Diagnostic:</strong> Begin your <Link href="/exam" className="text-[#2563EB] font-semibold underline hover:text-blue-700">rbt practice test</Link> to uncover your baseline score across Domains A through F.</li>
              <li><strong>Isolate Weak Domains:</strong> Review your visual diagnostic heatmap to focus study hours on low-scoring sub-tasks (such as C-04 Discrete Trial Teaching or D-02 Differential Reinforcement).</li>
              <li><strong>Drill Terminology with Spaced Flashcards:</strong> Review our <Link href="/rbt/glossary" className="text-[#2563EB] font-semibold underline hover:text-blue-700">RBT glossary definitions</Link> and Leitner flashcards for 15 minutes daily.</li>
              <li><strong>Engage with Socrates AI:</strong> Ask questions on ethical dilemmas and request clinical scenario roleplays to solidify your reasoning.</li>
              <li><strong>Complete Timed 85-Question Mock Exams:</strong> Take full-length 90-minute simulations to confirm your pass readiness before test day.</li>
            </ol>
          </Card>

          {/* Section 7: Testing Environment & Ethical Search Intent */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">7</span>
              Understanding the Real Exam vs Practice: Pearson VUE & Study Tools
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Candidates often search for information regarding where to take the official exam, Pearson VUE testing center procedures, or informal study flashcards on sites like Quizlet. It is essential to understand the distinction between study resources and the official certification examination:
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              The official BACB RBT exam is administered exclusively through Pearson VUE test centers or via Pearson OnVUE online proctoring. RBT Practice AI provides original, high-fidelity practice simulations designed to prepare you for the Pearson VUE computer-based interface. Unlike unverified user-generated quiz cards or static PDF downloads that may contain outdated 2nd Edition content, our platform provides validated 3rd Edition questions with real-time AI guidance and diagnostic analytics.
            </p>
          </Card>

          {/* Section 8: Who the Platform is Designed For */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-100 text-[#2563EB] flex items-center justify-center text-sm font-black">8</span>
              Who RBT Practice AI Is Designed For: Candidates, Therapists, & ABA Clinics
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              Our <strong>rbt exam review</strong> ecosystem serves individuals and organizations at every stage of the behavioral health career path:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm text-[#2563EB]">First-Time Candidates</h4>
                <p className="text-xs text-slate-600 mt-1">Individuals completing their 40-hour training who want guaranteed first-attempt exam readiness.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm text-emerald-600">Retake Candidates</h4>
                <p className="text-xs text-slate-600 mt-1">Technicians seeking targeted diagnostic analysis to identify and remediate previous weak areas.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm text-indigo-600">ABA Clinics & BCBAs</h4>
                <p className="text-xs text-slate-600 mt-1">Supervisors managing staff onboarding who require cohort pass probability metrics and supervision tracking.</p>
              </div>
            </div>
          </Card>

          {/* Section 9: What You Receive During the 7-Day Free Trial */}
          <Card glass className="p-8 sm:p-10 space-y-5 border-white/80 shadow-md bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-blue-200">
            <h3 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center text-sm font-black">9</span>
              What You Receive During Your 7-Day Free Trial
            </h3>
            <p className="text-sm sm:text-base text-slate-700">
              When you create an account, you receive immediate, unrestricted Pro access for 7 full days to experience everything our platform offers:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full 85-question 90-minute timed mock exams</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited Socrates AI Tutor explanations & scenario coaching</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5-Box Leitner spaced repetition flashcard system</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Domain diagnostic heatmaps across BACB Domains A–F</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interactive BACB RBT 3rd Edition Task List guide</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pass-or-Refund Guarantee eligibility protection</span>
              </li>
            </ul>
          </Card>

          {/* Section 10: How to Get Started */}
          <div className="text-center p-8 sm:p-12 rounded-3xl bg-[#0F172A] text-white space-y-6 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              How to Get Started with RBT Practice Today
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Start your 7-day free trial in under 60 seconds. Take your initial diagnostic exam, discover your domain readiness scores, and start practicing with realistic RBT exam questions right now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2 px-8 py-4 font-bold shadow-lg shadow-blue-500/30 text-base">
                  <span>Start Your 7-Day Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 px-6 py-4 text-white border-slate-700 hover:bg-slate-800 text-base">
                  <span>View All Plans & Pricing</span>
                </Button>
              </Link>
            </div>
            <p className="text-xs text-slate-400">
              No long-term contracts. Cancel anytime. Backed by our <Link href="/guarantee-terms" className="text-blue-400 underline">Pass-or-Refund Guarantee</Link>.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
