'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SubscriptionPlan, SubscriptionPlanInput } from '@/types/subscription-plan';
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  CreditCard,
  Sparkles,
  ShieldCheck,
  Star,
  Layers,
  ArrowRight,
  RefreshCw,
  Copy,
  ToggleLeft,
  ToggleRight,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  AlertCircle,
  Save,
} from 'lucide-react';
import { getPlatformConfig, updatePlatformConfig } from '@/lib/platform-config';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Platform Monetization & Free Access Controller State
  const [platformConfig, setPlatformConfig] = useState(getPlatformConfig());
  const [freeAccessMode, setFreeAccessMode] = useState<boolean>(platformConfig.freeAccessMode !== false);
  const [monetizationEnabled, setMonetizationEnabled] = useState<boolean>(Boolean(platformConfig.monetizationEnabled));
  const [showPricingSection, setShowPricingSection] = useState<boolean>(platformConfig.showPricingSection !== false);
  const [bannerText, setBannerText] = useState<string>(
    platformConfig.freeAccessBannerText ||
      '🎉 100% Free Complete Access — All 85-question Mock Exams, Practice Questions, Answers, Rationales & Flashcards are currently unlocked for everyone!'
  );
  const [isConfigSaving, setIsConfigSaving] = useState(false);
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceMonthly, setPriceMonthly] = useState<number>(39);
  const [priceAnnual, setPriceAnnual] = useState<number>(29);
  const [badge, setBadge] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [buttonText, setButtonText] = useState('Get Started');
  const [isPopular, setIsPopular] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [featuresText, setFeaturesText] = useState('');

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const currentConf = getPlatformConfig();
      setPlatformConfig(currentConf);
      setFreeAccessMode(currentConf.freeAccessMode !== false);
      setMonetizationEnabled(Boolean(currentConf.monetizationEnabled));
      setShowPricingSection(currentConf.showPricingSection !== false);
      if (currentConf.freeAccessBannerText) {
        setBannerText(currentConf.freeAccessBannerText);
      }

      const res = await fetch('/api/admin/plans');
      if (res.ok) {
        const data = (await res.json()) as any;
        if (data && Array.isArray(data.plans)) {
          setPlans(data.plans);
        }
      }
    } catch (err) {
      console.error('Failed to fetch subscription plans:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMonetizationSettings = async () => {
    setIsConfigSaving(true);
    try {
      updatePlatformConfig('freeAccessMode', freeAccessMode, 'Super Admin');
      updatePlatformConfig('monetizationEnabled', monetizationEnabled, 'Super Admin');
      updatePlatformConfig('showPricingSection', showPricingSection, 'Super Admin');
      updatePlatformConfig('freeAccessBannerText', bannerText, 'Super Admin');
      
      setConfigSaveSuccess(true);
      setTimeout(() => setConfigSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to update monetization settings:', err);
    } finally {
      setIsConfigSaving(false);
    }
  };

  const handleTogglePricingVisibility = (visible: boolean) => {
    setShowPricingSection(visible);
    updatePlatformConfig('showPricingSection', visible, 'Super Admin');
    setConfigSaveSuccess(true);
    setTimeout(() => setConfigSaveSuccess(false), 3000);
  };

  const handleQuickToggleFreeMode = (newValue: boolean) => {
    setFreeAccessMode(newValue);
    updatePlatformConfig('freeAccessMode', newValue, 'Super Admin');
    // If free mode is enabled, recommend turning monetization off
    if (newValue) {
      setMonetizationEnabled(false);
      updatePlatformConfig('monetizationEnabled', false, 'Super Admin');
    } else {
      setMonetizationEnabled(true);
      updatePlatformConfig('monetizationEnabled', true, 'Super Admin');
    }
    setConfigSaveSuccess(true);
    setTimeout(() => setConfigSaveSuccess(false), 3000);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const openCreateModal = () => {
    setEditingPlan(null);
    setName('');
    setDescription('');
    setPriceMonthly(39);
    setPriceAnnual(29);
    setBadge('');
    setTargetAudience('');
    setButtonText('Get Started');
    setIsPopular(false);
    setIsActive(true);
    setFeaturesText('Full 85-Question Pearson VUE Timed Mock Exams\nLeitner Smart Flashcard Spaced Repetition\nSocrates AI Tutor Chat & Rationales\n100% Pass Money-Back Guarantee');
    setIsModalOpen(true);
  };

  const openEditModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setName(plan.name);
    setDescription(plan.description);
    setPriceMonthly(plan.priceMonthly);
    setPriceAnnual(plan.priceAnnual);
    setBadge(plan.badge || '');
    setTargetAudience(plan.targetAudience || '');
    setButtonText(plan.buttonText || 'Get Started');
    setIsPopular(Boolean(plan.isPopular));
    setIsActive(plan.isActive !== false);
    setFeaturesText((plan.features || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    const features = featuresText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const payload: SubscriptionPlanInput = {
      name,
      description,
      priceMonthly: Number(priceMonthly),
      priceAnnual: Number(priceAnnual),
      badge,
      targetAudience,
      buttonText,
      features,
      isPopular,
      isActive,
    };

    try {
      if (editingPlan) {
        // Update existing plan
        const res = await fetch(`/api/admin/plans/${editingPlan.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          await fetchPlans();
          setIsModalOpen(false);
        }
      } else {
        // Create new plan
        const res = await fetch('/api/admin/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          await fetchPlans();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Failed to save subscription plan:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePlan = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/admin/plans/${deleteTargetId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchPlans();
        setDeleteTargetId(null);
      }
    } catch (err) {
      console.error('Failed to delete plan:', err);
    }
  };

  const handleToggleActive = async (plan: SubscriptionPlan) => {
    try {
      const res = await fetch(`/api/admin/plans/${plan.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !plan.isActive }),
      });
      if (res.ok) {
        await fetchPlans();
      }
    } catch (err) {
      console.error('Failed to toggle plan status:', err);
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 min-h-[calc(100vh-4rem)]">

        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <Badge variant="blue" className="gap-1 mb-1">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Super Admin Pricing & Subscription CMS</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Subscription Plan & Pricing Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Add, edit, remove, and manage subscription pricing tiers, feature lists, and guarantee badges in real time.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={openCreateModal}
              variant="primary"
              size="md"
              className="gap-2 font-bold shadow-lg shadow-blue-500/25 px-5 py-2.5 text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Subscription Plan</span>
            </Button>

            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-bold border-slate-300 text-slate-700">
                <span>&larr; Back to Admin CMS</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DYNAMIC MONETIZATION & FREE ACCESS CONTROLLER (SUPER ADMIN SWITCH)        */}
        {/* ========================================================================= */}
        <Card
          glass
          className={`p-6 rounded-2xl border transition-all shadow-xl relative overflow-hidden ${
            freeAccessMode
              ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-slate-900/40 to-emerald-900/10'
              : 'border-blue-500/40 bg-gradient-to-br from-slate-900/40 via-blue-950/20 to-slate-900/40'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                {freeAccessMode ? (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>SABKE LIYE FREE (100% UNRESTRICTED ACCESS ACTIVE)</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white flex items-center gap-1.5 shadow-md shadow-blue-600/20">
                    <Lock className="w-3.5 h-3.5" />
                    <span>PAID SUBSCRIPTION PAYWALL ACTIVE</span>
                  </span>
                )}

                {monetizationEnabled ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Payment Gateway: Chalu (ON)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    Payment Gateway: Band (OFF)
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {freeAccessMode
                  ? '⚡ Free Candidate Access Mode Is Currently Active'
                  : '🔒 Standard Paid Subscription Paywall Is Active'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {freeAccessMode
                  ? 'All candidates can freely take 85-question mock exams, view full answer rationales, review flashcards, and use Socrates AI tutor without paying. Pricing page shows 100% Free Access CTA.'
                  : 'Candidates must subscribe to paid plans (or use the 7-day trial) to access mock exams, unlimited flashcards, and premium AI features.'}
              </p>
            </div>

            {/* Quick Toggle Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleQuickToggleFreeMode(!freeAccessMode)}
                className={`px-5 py-3 rounded-xl font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 ${
                  freeAccessMode
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 active:scale-95'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {freeAccessMode ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Free Mode: ON (Sabke Liye Free)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Turn ON Free Mode for Everyone</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const newMonVal = !monetizationEnabled;
                  setMonetizationEnabled(newMonVal);
                  updatePlatformConfig('monetizationEnabled', newMonVal, 'Super Admin');
                  setConfigSaveSuccess(true);
                  setTimeout(() => setConfigSaveSuccess(false), 3000);
                }}
                className={`px-4 py-3 rounded-xl font-bold text-xs transition-all border flex items-center justify-center gap-2 ${
                  monetizationEnabled
                    ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 hover:bg-blue-600/30'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Payment: {monetizationEnabled ? 'Chalu (Active)' : 'Band (Disabled)'}</span>
              </button>
            </div>
          </div>

          {/* Landing Page Pricing Section Visibility Controls (Hide / Show Price Tags) */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 shadow-inner">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  Landing Page Price Tag / Pricing Section:
                </span>
                {showPricingSection ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-emerald-400" />
                    <span>VISIBLE (Show Ho Raha Hai)</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-400/40 flex items-center gap-1 animate-pulse">
                    <EyeOff className="w-3 h-3 text-rose-400" />
                    <span>HIDDEN (Price Tag Gayab / Chhupa Hua Hai)</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                {showPricingSection
                  ? 'Pricing section is currently VISIBLE on the landing page. Candidates see the pricing plans cards.'
                  : 'Pricing section is currently HIDDEN from the landing page. Candidates see only the 100% Free Practice announcements.'}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => handleTogglePricingVisibility(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md ${
                  !showPricingSection
                    ? 'bg-rose-600 text-white shadow-rose-600/30 border border-rose-400 ring-2 ring-rose-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide Pricing Section (Price Tag Gayab Karein)</span>
              </button>

              <button
                type="button"
                onClick={() => handleTogglePricingVisibility(true)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-md ${
                  showPricingSection
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 border border-emerald-400 ring-2 ring-emerald-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Show Pricing Section (Price Tag Dikhayein)</span>
              </button>
            </div>
          </div>

          {/* Banner Text Customizer */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-end sm:items-center">
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Custom Free Access Announcement Banner (Visible on Pricing & Dashboard)
              </label>
              <input
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Announcement banner text..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={handleSaveMonetizationSettings}
              disabled={isConfigSaving}
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs font-bold shrink-0 h-10"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isConfigSaving ? 'Saving...' : 'Save Settings'}</span>
            </Button>
          </div>

          {configSaveSuccess && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Settings updated successfully! Changes take effect immediately across all candidate portals.</span>
            </div>
          )}
        </Card>

        {/* Scorecard Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card glass className="p-5 space-y-1 border-white/90 shadow-xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Configured Plans</div>
            <div className="text-3xl font-black text-slate-900">{plans.length}</div>
          </Card>
          <Card glass className="p-5 space-y-1 border-emerald-100 bg-emerald-50/50 shadow-xl">
            <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Active Published Tiers</div>
            <div className="text-3xl font-black text-emerald-600">
              {plans.filter((p) => p.isActive).length}
            </div>
          </Card>
          <Card glass className="p-5 space-y-1 border-amber-100 bg-amber-50/50 shadow-xl">
            <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Featured Most Popular Tier</div>
            <div className="text-base font-black text-amber-900 truncate">
              {plans.find((p) => p.isPopular)?.name || 'None Selected'}
            </div>
          </Card>
        </div>

        {/* Subscription Plans Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <span>Configured Subscription Plans ({plans.length})</span>
            </h3>
            <Button variant="outline" size="sm" onClick={fetchPlans} disabled={isLoading} className="gap-1.5 text-xs font-bold">
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-xs font-bold text-slate-500 space-y-2">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p>Loading Subscription Plans...</p>
            </div>
          ) : plans.length === 0 ? (
            <Card glass className="p-12 text-center space-y-4">
              <CreditCard className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">No Subscription Plans Configured</h4>
              <p className="text-xs text-slate-500">Create your first subscription plan tier for candidate checkout.</p>
              <Button onClick={openCreateModal} variant="primary" size="sm">
                + Add Plan Now
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  glass
                  className={`p-6 flex flex-col justify-between space-y-6 shadow-xl relative transition-all ${
                    plan.isPopular ? 'border-2 border-indigo-500 ring-2 ring-indigo-500/20' : 'border-white/90'
                  } ${!plan.isActive ? 'opacity-60 bg-slate-50' : ''}`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-amber-300 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>MOST POPULAR TIER</span>
                    </div>
                  )}

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={plan.isActive ? 'emerald' : 'rose'}>
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      {plan.badge && (
                        <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xl font-black text-[#0F172A]">{plan.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-bold">
                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase">Monthly</span>
                        <span className="text-lg font-black text-slate-900">${plan.priceMonthly}/mo</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block uppercase">Annual Pass</span>
                        <span className="text-lg font-black text-[#2563EB]">${plan.priceAnnual}/mo</span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan Features</div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleToggleActive(plan)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                        plan.isActive
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-300'
                      }`}
                    >
                      {plan.isActive ? 'Deactivate' : 'Activate'}
                    </button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(plan)}
                        className="gap-1 text-xs font-bold text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDeleteTargetId(plan.id)}
                        className="gap-1 text-xs font-bold text-rose-600 border-rose-200 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* PLAN ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-xl relative my-8">
            <Card glass className="p-6 sm:p-8 shadow-2xl border-white/90 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    {editingPlan ? 'Edit Subscription Plan' : 'Add New Subscription Plan'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePlan} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Plan Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Student Pro"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Badge Label (Optional)</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="e.g. 100% Pass Guarantee"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Monthly Price ($/mo) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={priceMonthly}
                      onChange={(e) => setPriceMonthly(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-extrabold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">Annual Pass Price ($/mo) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={priceAnnual}
                      onChange={(e) => setPriceAnnual(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-extrabold text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short summary of target audience and value proposition..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Plan Features (One per line)</label>
                  <textarea
                    rows={5}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="Full 85-Question Pearson VUE Timed Mock Exams&#10;Socrates AI Tutor Chat & Rationales&#10;100% Pass Money-Back Guarantee"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span>Mark as Most Popular Tier</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span>Active for User Checkout</span>
                  </label>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={isSubmitting} className="gap-2 font-bold px-6 shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{editingPlan ? 'Save Plan Changes' : 'Create Subscription Plan'}</span>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <Card glass className="p-6 max-w-sm w-full space-y-4 text-center">
            <Trash2 className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Remove Subscription Plan?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove this subscription plan? This will delete the plan tier from database and checkout screens.
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteTargetId(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleDeletePlan} className="bg-rose-600 hover:bg-rose-700">
                Yes, Remove Plan
              </Button>
            </div>
          </Card>
        </div>
      )}
    </ProtectedRoute>
  );
}
