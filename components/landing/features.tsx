import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Brain, Sparkles, Layers, ShieldCheck, BarChart3, Users, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sparkles,
      title: '85-Question Practice Exam Simulator',
      description: 'Realistic 85-question 90-minute timed diagnostic exams built strictly according to BACB RBT 3rd Edition scoring weights. Simulates computer-based testing conditions with question flagging and navigation.',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Brain,
      title: 'Socrates AI Ethics & Scenario Tutor',
      description: 'Interact with our conversational AI tutor trained on the RBT Ethics Code 2.0. Receive immediate, detailed explanations on why right answers are correct and why distractors are wrong.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Layers,
      title: 'Spaced-Repetition Leitner Flashcards',
      description: 'Leverage the Leitner 5-box algorithm to lock core ABA terminology (DTT, DRO/DRA, Continuous Measurement, Latency, IRT) into your long-term memory with minimal daily study time.',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: ShieldCheck,
      title: 'BACB RBT 3rd Edition Task List Mastery',
      description: 'Complete coverage of all 6 Task List Domains (A through F). Drill targeted questions by domain, from Data Collection and Graphing (A) to Ethics and Professional Conduct (F).',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: BarChart3,
      title: 'Domain Diagnostic Weakness Heatmaps',
      description: 'Visual analytics pinpoint exact weak spots across sub-tasks so you spend your 7-day free trial on high-impact areas that directly elevate your pass readiness score.',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Users,
      title: 'Clinic & Training Center B2B Portal',
      description: 'Supervisors and BCBAs can oversee trainee cohorts, track student exam readiness scores, assign practice tests, and verify 100% team pass readiness.',
      color: 'from-blue-600 to-cyan-600',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest block">Engineered for BACB Certification</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Practice for the RBT Exam Online with Intelligent Study Tools
          </h2>
          <p className="text-base text-slate-600">
            Start your 7-day free trial and experience active recall, adaptive exam simulations, and conversational AI tutoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <Card key={idx} className="p-8 border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${f.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
