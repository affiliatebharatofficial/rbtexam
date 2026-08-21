'use client';

import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const testimonials = isEs
    ? [
        {
          name: 'Jessica Davis, RBT',
          role: 'Técnica de Conducta @ Hope Autism Center (Dallas, TX)',
          avatar: 'JD',
          bgColor: 'bg-blue-600',
          rating: 5,
          scoreBefore: '64%',
          scoreAfter: '94%',
          quote: 'Reprobé en mi primer intento usando un banco de pruebas en PDF. El tutor Sócrates de RBT Practice AI identificó exactamente mi debilidad en el Dominio C (DTT vs NET) en 15 minutos. ¡Aprobé mi examen BACB con honores!',
          verified: true,
        },
        {
          name: 'Marcus Vance, BCBA',
          role: 'Director Clínico @ Apex Behavioral Solutions (Atlanta, GA)',
          avatar: 'MV',
          bgColor: 'bg-emerald-600',
          rating: 5,
          scoreBefore: 'Promedio 72%',
          scoreAfter: 'Promedio 98%',
          quote: 'Capacitamos a 24 nuevos técnicos de conducta con el portal B2B para clínicas de RBT Practice AI. Todos y cada uno de los candidatos aprobaron en su primer intento en 3 semanas.',
          verified: true,
        },
        {
          name: 'Samantha K., RBT',
          role: 'Técnica Líder @ Spectrum Care (San Diego, CA)',
          avatar: 'SK',
          bgColor: 'bg-purple-600',
          rating: 5,
          scoreBefore: '71%',
          scoreAfter: '96%',
          quote: 'Las tarjetas de repetición espaciada Leitner y las simulaciones de ética son increíbles. Me sentí 100% preparada para el formato Pearson VUE.',
          verified: true,
        },
      ]
    : [
        {
          name: 'Jessica Davis, RBT',
          role: 'Behavior Technician @ Hope Autism Center (Dallas, TX)',
          avatar: 'JD',
          bgColor: 'bg-blue-600',
          rating: 5,
          scoreBefore: '64%',
          scoreAfter: '94%',
          quote: 'I failed my first attempt using a basic PDF test bank. RBT Practice AI’s Socrates tutor pinpointed my exact weak spot in Domain C (DTT vs NET) within 15 minutes. Passed my BACB retake with flying colors!',
          verified: true,
        },
        {
          name: 'Marcus Vance, BCBA',
          role: 'Clinical Director @ Apex Behavioral Solutions (Atlanta, GA)',
          avatar: 'MV',
          bgColor: 'bg-emerald-600',
          rating: 5,
          scoreBefore: 'Clinic Avg 72%',
          scoreAfter: 'Clinic Avg 98%',
          quote: 'We onboarded 24 new behavior technicians using the RBT Practice AI B2B Clinic Portal. Every single candidate passed on their first try within 3 weeks. It saves our BCBA supervisors dozens of hours.',
          verified: true,
        },
        {
          name: 'Samantha K., RBT',
          role: 'Lead Technician @ Spectrum Care (San Diego, CA)',
          avatar: 'SK',
          bgColor: 'bg-purple-600',
          rating: 5,
          scoreBefore: '71%',
          scoreAfter: '96%',
          quote: 'The Leitner flashcards and ethics roleplay scenarios are unbelievable. I felt 100% prepared for Pearson VUE testing conditions. Worth 10x the price!',
          verified: true,
        },
      ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50/70 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="blue" className="gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{isEs ? 'Opiniones Verificadas de Estudiantes' : 'Verified Student Reviews'}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {isEs ? 'Más de 14,200 Candidatos a RBT y Clínicas de ABA Confían en Nosotros' : 'Trusted by 14,200+ RBT Candidates & Top ABA Clinics'}
          </h2>
          <p className="text-base text-slate-600">
            {isEs
              ? 'Descubre cómo terapeutas y supervisores clínicos aprobaron su examen BACB RBT al primer intento con RBT Practice AI.'
              : 'See how therapists and clinical supervisors passed their BACB RBT exam on the first attempt with RBT Practice AI.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} glass className="p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 border-white/80">
              <div className="space-y-6">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{isEs ? 'Aprobado Verificado' : 'Verified Pass'}</span>
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>

                {/* Score improvement tag */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{isEs ? 'Mejora Diagnóstica:' : 'Diagnostic Boost:'}</span>
                  <div className="font-extrabold space-x-1">
                    <span className="text-slate-400 line-through">{t.scoreBefore}</span>
                    <span className="text-[#2563EB]">&rarr; {t.scoreAfter}</span>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-slate-100 flex items-center space-x-3 mt-6">
                <div className={`w-10 h-10 rounded-full ${t.bgColor} text-white font-bold text-xs flex items-center justify-center shadow-md`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
