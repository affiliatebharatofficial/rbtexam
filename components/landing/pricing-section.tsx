'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Check, Sparkles, ShieldCheck, ArrowRight, Building2, User, Unlock, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SubscriptionPlan } from '@/types/subscription-plan';
import { GuaranteeTermsModal } from '@/components/billing/guarantee-terms-modal';

export function PricingSection() {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [freeAccessMode, setFreeAccessMode] = useState(true);
  const [monetizationEnabled, setMonetizationEnabled] = useState(false);
  const [showPricingSection, setShowPricingSection] = useState(true);
  const [freeBannerText, setFreeBannerText] = useState(
    '🎉 100% Free Complete Access — All 85-question Mock Exams, Practice Questions, Answers, and Flashcards are currently unlocked for everyone!'
  );

  useEffect(() => {
    const fetchActivePlans = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/plans');
        if (res.ok) {
          const data = (await res.json()) as any;
          if (data && Array.isArray(data.plans)) {
            setPlans(data.plans);
          }
          if (data.freeAccessMode !== undefined) {
            setFreeAccessMode(Boolean(data.freeAccessMode));
          }
          if (data.monetizationEnabled !== undefined) {
            setMonetizationEnabled(Boolean(data.monetizationEnabled));
          }
          if (data.showPricingSection !== undefined) {
            setShowPricingSection(Boolean(data.showPricingSection));
          }
          if (data.freeAccessBannerText) {
            setFreeBannerText(data.freeAccessBannerText);
          }
        }
      } catch (e) {
        console.error('Failed to load active plans for pricing page:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivePlans();
  }, []);

  if (!isLoading && !showPricingSection) {
    return null;
  }

  const handleCheckout = async (planId: string, planName: string) => {
    if (freeAccessMode || !monetizationEnabled) {
      window.location.href = '/exam';
      return;
    }

    setLoadingVariant(planId);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId: planId,
          tier: planName,
          billingInterval: billingCycle,
          userEmail: 'candidate@rbtpracticeai.com',
        }),
      });

      const data = (await res.json()) as any;
      if (data && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        window.location.href = '/profile/billing';
      }
    } catch (err) {
      window.location.href = '/profile/billing';
    } finally {
      setLoadingVariant(null);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Free Access Announcement Banner */}
        {freeAccessMode && (
          <div className="mb-10 p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/20 border border-emerald-400/30 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-white/20 text-white shrink-0 backdrop-blur-sm">
                <Unlock className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white text-emerald-900">
                    {t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'Acceso Libre' : 'Open Access'}
                  </span>
                  <span className="text-xs font-bold text-emerald-100">{t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'No se requiere tarjeta de crédito' : 'No Credit Card Required'}</span>
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  {t('cta.badge', freeBannerText)}
                </h3>
                <p className="text-xs text-emerald-100">
                  {t('cta.subheading', 'Full 85-question mock exams, detailed clinical rationales, Leitner flashcards, and Socrates AI tutor are completely unlocked.')}
                </p>
              </div>
            </div>

            <Link
              href="/exam"
              className="shrink-0 px-6 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>{t('cta.startBtn', 'Start Free Practice Now')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="emerald">
            {freeAccessMode
              ? (t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? '🎉 Acceso Completo 100% Gratis para Todos los Candidatos' : '🎉 100% Free Complete Access Unlocked for All Candidates')
              : '7-Day Free Trial • Pass-or-Refund Guarantee Protection'}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {freeAccessMode
              ? (t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'Practica Gratis Hoy — Domina tu Examen BACB RBT' : 'Practice Free Today — Master Your BACB RBT Exam')
              : t('pricing.heading', 'What You Get With Your 7-Day Free Trial & Transparent Plans')}
          </h2>
          <p className="text-base text-slate-600">
            {freeAccessMode
              ? (t('common.spanish') === 'Español' && t('nav.home') === 'Inicio' ? 'Todas las herramientas, exámenes de 85 preguntas, mapas de calor por dominio y justificaciones de IA son gratuitos.' : 'All tools, 85-question timed mock exams, domain-by-domain diagnostic heatmaps, and AI tutor rationales are currently free for all candidates.')
              : t('pricing.subheading', 'Every candidate begins with a 7-day free trial. Practice with full 85-question mock exams, Socrates AI tutoring, and pass guarantee protection before choosing your plan.')}
          </p>

          {/* Billing Cycle Toggle (only relevant when monetization is on or for preview) */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-slate-100 p-1 rounded-2xl inline-flex items-center space-x-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t('pricing.monthly', 'Monthly Plan')}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-[#2563EB] text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>{t('pricing.annual', 'Annual Pass')}</span>
                <span className="bg-emerald-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                  {t('pricing.save', 'Save 40%')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-xs font-bold text-slate-500 space-y-2">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p>Loading Active Subscription Tiers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const displayPrice = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
              const isPopular = Boolean(plan.isPopular);

              return (
                <Card
                  key={plan.id}
                  glass={isPopular}
                  className={`p-8 flex flex-col justify-between transition-all ${
                    isPopular
                      ? 'border-2 border-[#2563EB] shadow-2xl relative scale-105 z-10'
                      : 'border-slate-200 hover:shadow-lg'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2563EB] to-indigo-600 text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {freeAccessMode ? 'All Features Included Free' : 'Most Popular • Pass-or-Refund'}
                    </div>
                  )}

                  <div className="space-y-6 pt-2">
                    <div className="flex items-center justify-between">
                      {isPopular ? (
                        <Sparkles className="w-8 h-8 text-[#2563EB]" />
                      ) : (
                        <User className="w-8 h-8 text-[#2563EB]" />
                      )}
                      <Badge variant={freeAccessMode ? 'emerald' : (isPopular ? 'emerald' : 'blue')}>
                        {freeAccessMode ? 'Currently Free ($0)' : (plan.badge || 'RBT Certification')}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#0F172A]">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="space-y-1">
                      {freeAccessMode ? (
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-4xl font-black text-emerald-600">$0</span>
                          <span className="text-xs text-emerald-700 font-bold uppercase">FREE</span>
                          <span className="text-xs text-slate-400 font-semibold">/ all questions unlocked</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-4xl font-extrabold text-[#0F172A]">${displayPrice}</span>
                          <span className="text-xs text-slate-500 font-bold uppercase">USD</span>
                          <span className="text-xs text-slate-400 font-semibold">/ month</span>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-500">
                        {freeAccessMode
                          ? '100% Free Access Mode is active — No subscription or payment required'
                          : billingCycle === 'annual'
                          ? `Billed annually at $${displayPrice * 12} USD/yr • Renews annually`
                          : 'Billed monthly • Renews monthly • Cancel anytime'}
                      </p>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-700 font-medium pt-4 border-t border-slate-100">
                      {(plan.features || []).map((feat, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8 space-y-3">
                    <Button
                      variant={isPopular || freeAccessMode ? 'primary' : 'outline'}
                      size="lg"
                      className={`w-full gap-2 font-bold ${
                        freeAccessMode ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20' : ''
                      }`}
                      onClick={() => handleCheckout(plan.id, plan.name)}
                      disabled={loadingVariant === plan.id}
                    >
                      <span>
                        {loadingVariant === plan.id
                          ? 'Processing...'
                          : freeAccessMode
                          ? 'Start Free Practice Now'
                          : plan.buttonText || 'Start 7-Day Free Trial'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <p className="text-[10px] text-center text-slate-400 leading-tight">
                      {freeAccessMode ? (
                        <span>
                          Enjoy free unrestricted study tools. By using RBT Practice AI, you agree to our{' '}
                          <Link href="/terms" className="underline hover:text-slate-700">Terms</Link> &{' '}
                          <Link href="/privacy" className="underline hover:text-slate-700">Privacy</Link>.
                        </span>
                      ) : (
                        <span>
                          Automatic renewal. Cancel anytime via Billing Portal. By continuing, you agree to our{' '}
                          <Link href="/terms" className="underline hover:text-slate-700">Terms</Link>,{' '}
                          <Link href="/privacy" className="underline hover:text-slate-700">Privacy</Link>{' '}
                          & <Link href="/refund-policy" className="underline hover:text-slate-700">Refund Policy</Link>.
                        </span>
                      )}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pre-Checkout Legal & Billing Transparency Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 space-y-1 max-w-4xl mx-auto">
          <p className="font-semibold text-slate-800">
            🔒 Transparent & Secure Checkout via PCI-DSS Compliant Processors (Stripe / Lemon Squeezy)
          </p>
          <p className="text-[11px] text-slate-500">
            All prices in USD. Credit card information is never stored on our servers. For billing queries or guarantee claims, contact{' '}
            <a href="mailto:hello@rbtpracticeai.com" className="text-[#2563EB] font-bold hover:underline">
              hello@rbtpracticeai.com
            </a>. Review our <Link href="/refund-policy" className="text-[#2563EB] font-bold hover:underline">Refund Policy</Link> and <Link href="/disclaimer" className="text-[#2563EB] font-bold hover:underline">Educational Disclaimer</Link>.
          </p>
        </div>

        {/* Money Back Guarantee Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold">RBT Practice AI Pass-or-Refund Guarantee</h4>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Score 85%+ on three qualifying mock exams and meet all eligibility requirements. If you then take the applicable official BACB exam and do not pass, you may qualify for a full refund under our Guarantee Terms.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsTermsModalOpen(true)}
            variant="primary"
            size="md"
            className="gap-2 font-extrabold shadow-lg px-6 flex-shrink-0 bg-emerald-500 hover:bg-emerald-600 border-none text-slate-950"
          >
            <span>View Guarantee Terms</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Modal Component */}
        <GuaranteeTermsModal
          isOpen={isTermsModalOpen}
          onClose={() => setIsTermsModalOpen(false)}
        />
      </div>
    </section>
  );
}
