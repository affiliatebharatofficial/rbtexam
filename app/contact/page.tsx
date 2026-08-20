'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Send,
  Building2,
  FileQuestion,
  HelpCircle,
  ArrowRight,
  Headphones,
  FileCheck,
  BookOpen,
} from 'lucide-react';

const INQUIRY_TOPICS = [
  { id: 'general', label: 'General Inquiry', icon: MessageSquare },
  { id: 'exam_help', label: 'Exam & Study Help', icon: FileQuestion },
  { id: 'guarantee', label: 'Pass Guarantee / Refund Claim', icon: ShieldCheck },
  { id: 'clinic', label: 'Clinic & Team Accounts', icon: Building2 },
  { id: 'billing', label: 'Subscription & Billing', icon: FileCheck },
  { id: 'feedback', label: 'Question / Content Feedback', icon: BookOpen },
];

const FAQS = [
  {
    question: 'How quickly does the support team reply to emails?',
    answer:
      'We respond to all emails sent to hello@rbtpracticeai.com within 2 to 4 business hours Monday through Friday, and within 12 hours on weekends.',
  },
  {
    question: 'How do I submit a Pass-or-Refund Guarantee claim?',
    answer:
      'If you have completed 3 qualifying mock exams with an 85%+ score and took your official BACB exam within 30 days, simply select "Pass Guarantee / Refund Claim" above or email hello@rbtpracticeai.com with your official Pearson VUE score report and account email address.',
  },
  {
    question: 'Can I request bulk licensing for my ABA clinic or school?',
    answer:
      'Yes! We offer Clinic Enterprise dashboards with trainee progress tracking, group discounts, and custom seat allocations. Email hello@rbtpracticeai.com or select the Clinic & Team Accounts topic.',
  },
  {
    question: 'What if I find a discrepancy in a practice question rationale?',
    answer:
      'Our questions are reviewed by Board Certified Behavior Analysts (BCBAs). If you have question feedback, email hello@rbtpracticeai.com with the Question ID and our clinical team will review and update the item within 24 hours.',
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; ticketId?: string } | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const officialEmail = 'hello@rbtpracticeai.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const topicObj = INQUIRY_TOPICS.find((t) => t.id === selectedTopic);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          orderId: formData.orderId,
          topic: topicObj?.label || 'General Inquiry',
          message: formData.message,
        }),
      });

      const data = (await res.json()) as any;
      if (res.ok && data.success) {
        setSubmitResult({
          success: true,
          ticketId: data.ticketId,
          message: data.message || `Your inquiry has been received. We will respond directly to ${formData.email} from hello@rbtpracticeai.com.`,
        });
        setFormData({ name: '', email: '', orderId: '', message: '' });
      } else {
        setSubmitResult({
          success: false,
          message: data?.error || 'Failed to submit message. Please email hello@rbtpracticeai.com directly.',
        });
      }
    } catch (err) {
      setSubmitResult({
        success: false,
        message: 'Network error. Please write to us directly at hello@rbtpracticeai.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="blue" className="gap-1.5 px-3 py-1 font-bold text-xs">
            <Headphones className="w-3.5 h-3.5" />
            <span>Dedicated Candidate & Clinical Support</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
            How Can We Help You Pass?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Have questions about RBT practice exams, Socrates AI Tutor, pass guarantee refund claims, or clinic enterprise licenses? Our team is here to support your journey to BACB certification.
          </p>
        </div>

        {/* Top Cards: Contact Info & Response Promise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Email Direct Card */}
          <Card glass className="p-6 border-blue-100 bg-white/90 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100 shadow-inner">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A]">Direct Email Support</h3>
                <p className="text-xs text-slate-500 mt-0.5">Primary channel for all candidate & customer inquiries.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#2563EB] select-all truncate">
                  {officialEmail}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors ml-2 flex-shrink-0"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <a
              href={`mailto:${officialEmail}?subject=RBT%20Practice%20AI%20Inquiry`}
              className="inline-flex items-center justify-center text-xs font-bold text-[#2563EB] hover:text-blue-700 hover:underline gap-1 pt-2"
            >
              <span>Compose Email Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Card>

          {/* Response Time Guarantee */}
          <Card glass className="p-6 border-emerald-100 bg-emerald-50/40 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-inner">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A]">Response Time Commitment</h3>
                <p className="text-xs text-slate-600 mt-0.5">We know exam deadlines are urgent.</p>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>2–4 Hours:</strong> Typical weekday response</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>24/7 AI Tutor:</strong> Available instantly inside app</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>BCBA Oversight:</strong> Clinical review within 24h</span>
                </li>
              </ul>
            </div>
            <div className="pt-2 text-[11px] text-emerald-700 font-semibold">
              Live Mon – Sun • All Time Zones
            </div>
          </Card>

          {/* Guarantee & Refund Claims */}
          <Card glass className="p-6 border-slate-200 bg-white/90 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0F172A] flex items-center justify-center border border-slate-200 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A]">Pass Guarantee Claims</h3>
                <p className="text-xs text-slate-500 mt-0.5">Simple 100% money-back claim process.</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Completed 3 mock exams with 85%+ and took the BACB exam? Submit your score report directly to <span className="font-bold text-slate-900">{officialEmail}</span>.
              </p>
            </div>
            <Link
              href="/guarantee-terms"
              className="inline-flex items-center justify-center text-xs font-bold text-slate-700 hover:text-slate-900 hover:underline gap-1 pt-2"
            >
              <span>View Full Guarantee Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-3xl mx-auto">
          <Card glass className="p-8 sm:p-12 shadow-2xl border-white/90">
            <div className="space-y-2 pb-6 border-b border-slate-100">
              <h2 className="text-2xl font-black text-[#0F172A]">Send an Official Inquiry</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Fill out the details below and our team will get back to your email directly.
              </p>
            </div>

            {submitResult && (
              <div
                className={`mt-6 p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 animate-fadeIn ${
                  submitResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {submitResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{submitResult.success ? 'Inquiry Sent Successfully!' : 'Submission Notice'}</p>
                  <p className="mt-0.5">{submitResult.message}</p>
                  {submitResult.ticketId && (
                    <p className="mt-1 font-mono font-bold text-emerald-700">
                      Reference Ticket ID: {submitResult.ticketId}
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Inquiry Topic Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Topic
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {INQUIRY_TOPICS.map((topic) => {
                    const Icon = topic.icon;
                    const isSelected = selectedTopic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`p-3 rounded-xl border text-left flex items-start gap-2 transition-all text-xs font-bold ${
                          isSelected
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                        <span className="leading-snug">{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="candidate@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                  />
                </div>
              </div>

              {/* Order ID / Account Reference (Optional) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Order ID / Candidate ID <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Helpful for billing & guarantee queries</span>
                </div>
                <input
                  type="text"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  placeholder="e.g. LS-84920 or Pearson VUE ID"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  How can we help? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, question feedback, or request in detail..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition-all"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full gap-2 font-bold shadow-xl shadow-blue-500/25 py-4 text-sm"
              >
                {isSubmitting ? (
                  <span>Sending Your Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support Desk</span>
                  </>
                )}
              </Button>

              <p className="text-[11px] text-center text-slate-400">
                You can also email us directly at{' '}
                <a href={`mailto:${officialEmail}`} className="text-[#2563EB] font-bold hover:underline">
                  {officialEmail}
                </a>
              </p>
            </form>
          </Card>
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-500">Quick answers to common support questions.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{faq.question}</span>
                    <span className="text-xs font-bold text-[#2563EB]">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
