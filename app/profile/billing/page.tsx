'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/context/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Download,
  Zap,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Award,
} from 'lucide-react';

export default function CustomerBillingPage() {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const invoices = [
    { id: 'inv_8912', number: 'INV-2026-08912', date: '2026-08-01', amount: '$29.00', status: 'Paid', plan: 'Pro Pass Guarantee (Monthly)' },
    { id: 'inv_8102', number: 'INV-2026-08102', date: '2026-07-01', amount: '$29.00', status: 'Paid', plan: 'Pro Pass Guarantee (Monthly)' },
    { id: 'inv_7201', number: 'INV-2026-0601', date: '2026-06-01', amount: '$29.00', status: 'Paid', plan: 'Pro Pass Guarantee (Monthly)' },
  ];

  return (
    <ProtectedRoute>
      <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Stripe Enterprise Billing Manager</span>
            </Badge>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Subscription & Billing Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Manage your active subscription plan, payment methods, usage quotas, and download invoices.
            </p>
          </div>

          <Link href="/pricing">
            <Button variant="primary" size="md" className="gap-2 shadow-lg shadow-blue-500/25">
              <Sparkles className="w-4 h-4" />
              <span>View All Pricing Plans</span>
            </Button>
          </Link>
        </div>

        {/* Current Active Plan Overview Card */}
        <Card glass className="p-8 shadow-2xl border-white/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Active Plan</span>
              <h2 className="text-2xl font-black text-slate-900 mt-0.5">
                Pro Pass Guarantee Plan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Unlimited 85-Q Mock Exams, Flashcards, Socrates AI Tutor, and 100% Pass Money-Back Guarantee.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ACTIVE • Auto-Renews Sept 1, 2026</span>
              </span>
            </div>
          </div>

          {/* Usage Quotas Progress Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Practice Mock Exams</span>
                <span className="text-[#2563EB]">UNLIMITED</span>
              </div>
              <Progress value={100} colorClass="bg-[#2563EB]" size="sm" />
              <div className="text-[10px] text-slate-500">Unlimited Full 85-Q Pearson VUE simulations</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Leitner Flashcards</span>
                <span className="text-[#2563EB]">UNLIMITED</span>
              </div>
              <Progress value={100} colorClass="bg-indigo-500" size="sm" />
              <div className="text-[10px] text-slate-500">Unlimited 5-box spaced repetition reviews</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Socrates AI Tutor</span>
                <span className="text-[#2563EB]">UNLIMITED</span>
              </div>
              <Progress value={100} colorClass="bg-emerald-500" size="sm" />
              <div className="text-[10px] text-slate-500">Unlimited BCBA Socratic learning chats</div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#2563EB] flex items-center justify-center shadow-sm">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Visa ending in 4242</div>
                <div className="text-slate-500">Expires 08/2028 • Default Payment Method</div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="text-xs bg-white">
              Update Payment Method
            </Button>
          </div>
        </Card>

        {/* Invoice Receipts Table */}
        <Card glass className="p-8 shadow-2xl border-white/90 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#2563EB]" />
                <span>Invoice Receipts & Payment History</span>
              </h3>
              <p className="text-xs text-slate-500">Download official tax invoices and payment receipts</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Invoice Number</th>
                  <th className="py-3 px-3">Plan</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">PDF Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-800 font-mono">{inv.number}</td>
                    <td className="py-3.5 px-3 text-slate-700">{inv.plan}</td>
                    <td className="py-3.5 px-3 text-slate-500 font-mono text-[11px]">{inv.date}</td>
                    <td className="py-3.5 px-3 font-bold text-slate-900">{inv.amount}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </ProtectedRoute>
  );
}
