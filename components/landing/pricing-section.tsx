'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ShieldCheck, ArrowRight, Building2, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null);

  const handleCheckout = async (variantId: string, tier: string) => {
    setLoadingVariant(variantId);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId,
          tier,
          billingInterval: billingCycle,
          userEmail: 'candidate@rbttrainingai.com',
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
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
          <Badge variant="emerald">100% Money-Back Pass Guarantee</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Invest in Your RBT Certification Success
          </h2>
          <p className="text-base text-slate-600">
            Choose the plan tailored for your exam target date or clinic cohort needs.
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
                Monthly Plan
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
                <span>Annual Pass</span>
                <span className="bg-emerald-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                  Save 40%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Student Monthly */}
          <Card className="p-8 border-slate-200 flex flex-col justify-between hover:shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <User className="w-8 h-8 text-[#2563EB]" />
                <Badge variant="blue">RBT Candidates</Badge>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Student Pro</h3>
                <p className="text-xs text-slate-500 mt-1">Ideal for 30-60 day intensive study plans.</p>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-[#0F172A]">{billingCycle === 'annual' ? '$29' : '$39'}</span>
                <span className="text-xs text-slate-400 font-semibold">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium pt-4 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Unlimited 85-Q Timed BACB Mock Exams</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Socrates AI Tutor Chat & Rationales</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Leitner Spaced Repetition Flashcards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Domain Readiness Heatmap</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => handleCheckout('v_monthly_pro_290', 'pro')}
                disabled={loadingVariant === 'v_monthly_pro_290'}
              >
                {loadingVariant === 'v_monthly_pro_290' ? 'Processing Checkout...' : 'Start 7-Day Free Trial'}
              </Button>
            </div>
          </Card>

          {/* Plan 2: Lifetime Pass (Featured) */}
          <Card glass className="p-8 border-2 border-[#2563EB] flex flex-col justify-between shadow-2xl relative scale-105 z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2563EB] to-indigo-600 text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              Most Popular • Guaranteed Pass
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between pt-2">
                <Sparkles className="w-8 h-8 text-[#2563EB]" />
                <Badge variant="emerald">Pass Guarantee</Badge>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Lifetime Pass</h3>
                <p className="text-xs text-slate-500 mt-1">One-time payment until you pass your exam.</p>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-[#0F172A]">$99</span>
                <span className="text-xs text-slate-400 font-semibold">one-time</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium pt-4 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Everything in Pro + Lifetime Access</strong></span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Priority Socrates AI Clinical Roleplay</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Money-Back Pass Guarantee</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Downloadable BACB Task List Cheat Sheets</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Button
                variant="primary"
                size="lg"
                className="w-full gap-2 shadow-lg shadow-blue-500/30"
                onClick={() => handleCheckout('v_lifetime_vip_990', 'lifetime')}
                disabled={loadingVariant === 'v_lifetime_vip_990'}
              >
                <span>{loadingVariant === 'v_lifetime_vip_990' ? 'Redirecting...' : 'Get Lifetime Access'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Plan 3: Clinic & Agency Cohort */}
          <Card className="p-8 border-slate-200 flex flex-col justify-between hover:shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Building2 className="w-8 h-8 text-slate-800" />
                <Badge variant="slate">B2B SaaS</Badge>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0F172A]">Clinic Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">For ABA Agencies & RBT Training Centers.</p>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-extrabold text-[#0F172A]">$249</span>
                <span className="text-xs text-slate-400 font-semibold">/ month (Up to 15 Trainees)</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium pt-4 border-t border-slate-100">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Supervisor B2B Management Dashboard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Cohort Readiness & Pass Rate Analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Automated Mock Assignment & Audit Logs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Dedicated BCBA Support Manager</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => handleCheckout('v_clinic_enterprise_2490', 'team')}
                disabled={loadingVariant === 'v_clinic_enterprise_2490'}
              >
                {loadingVariant === 'v_clinic_enterprise_2490' ? 'Processing...' : 'Request Clinic Demo'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
