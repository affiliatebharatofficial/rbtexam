'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { Check, Sparkles, ShieldCheck, ArrowRight, Building2, User } from 'lucide-react';
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
        }
      } catch (e) {
        console.error('Failed to load active plans for pricing page:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivePlans();
  }, []);

  const handleCheckout = async (planId: string, planName: string) => {
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
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <Badge variant="emerald">{t('pricing.badge', 'Pass-or-Refund Guarantee Protection')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            {t('pricing.heading', 'Invest in Your RBT Certification Success')}
          </h2>
          <p className="text-base text-slate-600">
            {t('pricing.subheading', 'Choose the plan tailored for your exam target date or clinic cohort needs.')}
          </p>

          {/* Billing Cycle Toggle */}
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
                      Most Popular • Pass-or-Refund
                    </div>
                  )}

                  <div className="space-y-6 pt-2">
                    <div className="flex items-center justify-between">
                      {isPopular ? (
                        <Sparkles className="w-8 h-8 text-[#2563EB]" />
                      ) : (
                        <User className="w-8 h-8 text-[#2563EB]" />
                      )}
                      <Badge variant={isPopular ? 'emerald' : 'blue'}>
                        {plan.badge || 'RBT Certification'}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#0F172A]">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-extrabold text-[#0F172A]">${displayPrice}</span>
                      <span className="text-xs text-slate-400 font-semibold">/ month</span>
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

                  <div className="pt-8">
                    <Button
                      variant={isPopular ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full gap-2 font-bold"
                      onClick={() => handleCheckout(plan.id, plan.name)}
                      disabled={loadingVariant === plan.id}
                    >
                      <span>{loadingVariant === plan.id ? 'Processing...' : (plan.buttonText || 'Get Started')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

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
