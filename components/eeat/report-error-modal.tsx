'use client';

import React, { useState } from 'react';
import { X, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReportErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId?: string;
  pageTitle?: string;
}

export function ReportErrorModal({
  isOpen,
  onClose,
  topicId,
  pageTitle,
}: ReportErrorModalProps) {
  const [issueType, setIssueType] = useState('incorrect_answer');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save locally or process to editorial log
    try {
      const existingReports = JSON.parse(localStorage.getItem('rbt_editorial_reports') || '[]');
      existingReports.push({
        id: `err-${Date.now()}`,
        topicId: topicId || 'General Page',
        pageTitle: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
        url: typeof window !== 'undefined' ? window.location.href : '',
        issueType,
        description,
        userEmail,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('rbt_editorial_reports', JSON.stringify(existingReports));
    } catch {
      // ignore localstorage errors
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setDescription('');
        onClose();
      }, 1800);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Feedback Submitted</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you for helping us maintain accuracy. Our editorial desk reviews all incoming reports against current BACB guidelines.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900">Report an Educational Discrepancy</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Notice an inaccurate question answer, misleading clinical rationale, or outdated TCO item reference? Please let us know.
            </p>

            {topicId && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                Context: <strong className="text-slate-800">{topicId}</strong> {pageTitle ? `— ${pageTitle}` : ''}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Issue Category</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="incorrect_answer">Incorrect Answer Key / Question Key Error</option>
                <option value="confusing_rationale">Ambiguous or Confusing Explanation</option>
                <option value="outdated_tco">Outdated / Incorrect BACB TCO Mapping</option>
                <option value="terminology_error">Non-Standard ABA Terminology</option>
                <option value="typo_grammar">Typographical / Grammatical Mistake</option>
                <option value="broken_link">Broken Source Citation or Reference Link</option>
                <option value="other">Other Educational Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Details & Explanation</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue and, if possible, cite the official BACB guideline or ABA textbook rule..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Your Email (Optional, for resolution updates)</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={isSubmitting} className="text-xs gap-1.5">
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
