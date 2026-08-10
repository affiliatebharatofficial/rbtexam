import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Brain, Sparkles, Layers, ShieldCheck, BarChart3, Users, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sparkles,
      title: t('features.feat1.title', 'Adaptive AI Exam Simulator'),
      description: t('features.feat1.desc', '85-question 90-minute timed diagnostic exams built strictly according to BACB RBT 3rd Edition scoring weights. Dynamically adjusts question difficulty based on your performance history.'),
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Brain,
      title: t('features.feat2.title', 'Socrates AI Ethics & Roleplay Tutor'),
      description: t('features.feat2.desc', 'Interact with our conversational AI tutor trained on the RBT Ethics Code 2.0. Simulate challenging client scenarios, extinction bursts, and parent boundary situations in real-time.'),
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Layers,
      title: t('features.feat3.title', 'Spaced-Repetition Flashcards'),
      description: t('features.feat3.desc', 'Leverage the Leitner 5-box algorithm to lock core ABA terminology (DTT, DRO/DRA, Continuous Measurement, Latency, IRT) into your long-term memory with minimal study time.'),
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: ShieldCheck,
      title: t('features.feat4.title', 'BACB RBT 3rd Ed Task List Mastery'),
      description: t('features.feat4.desc', 'Complete breakdown of all 6 Task List Domains (A through F). Track individual task item mastery from A-01 (Session Prep) to F-04 (5% Monthly Supervision).'),
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: BarChart3,
      title: t('features.feat5.title', 'Domain Weakness Heatmaps'),
      description: t('features.feat5.desc', 'Visual analytics pinpoint exact weak spots before exam day so you spend 100% of your remaining study time on high-impact improvement areas.'),
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Users,
      title: t('features.feat6.title', 'Clinic & Training Center B2B Portal'),
      description: t('features.feat6.desc', 'Supervisors and BCBAs can oversee trainee cohorts, track student exam readiness scores, assign practice tests, and verify 100% team pass readiness.'),
      color: 'from-blue-600 to-cyan-600',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-widest">{t('features.tagline', 'Built for Maximum Exam Success')}</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('features.mainHeading', 'Everything You Need to Pass the RBT Exam with Confidence')}
          </p>
          <p className="text-base text-slate-600">
            {t('features.subHeading', 'Engineered with modern cognitive science, spaced repetition, and real-time AI guidance.')}
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
