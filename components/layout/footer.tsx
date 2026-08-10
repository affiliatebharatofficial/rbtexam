'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useLanguage } from '@/context/language-context';
import { Brain, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const { homeRoute, user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const isAdmin = Boolean(user && (user.role === 'admin' || user.role === 'super_admin'));

  return (
    <footer className="mt-auto bg-[#0F172A] text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href={homeRoute} className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-blue-500 flex items-center justify-center text-white shadow-lg">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                RBT <span className="text-[#2563EB]">Practice Questions</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer.brandDescription', 'The premier RBT exam preparation platform with thousands of practice questions, realistic mock exams, flashcards, and AI tutor support for BACB certification candidates.')}
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('hero.badge', 'Aligned with BACB RBT 3rd Edition Task List')}</span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{t('footer.examPrep', 'Exam Prep')}</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/exam" className="hover:text-white transition-colors">{t('nav.practiceQuestions', 'Practice Questions')}</Link></li>
              <li><Link href="/rbt/mock-exam" className="hover:text-white transition-colors">{t('nav.mockExams', 'Mock Exams')}</Link></li>
              <li><Link href="/flashcards" className="hover:text-white transition-colors">{t('nav.flashcards', 'Flashcards')}</Link></li>
              <li><Link href="/task-list" className="hover:text-white transition-colors">{t('nav.studyGuides', 'Study Guides')}</Link></li>
              <li><Link href="/tutor" className="hover:text-white transition-colors">{t('nav.aiTutor', 'AI Tutor')}</Link></li>
            </ul>
          </div>

          {/* Resources & Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{t('footer.company', 'Company & Blog')}</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/rbt" className="hover:text-white transition-colors">{t('footer.blog', 'Blog')}</Link></li>
              <li><Link href="/rbt/about" className="hover:text-white transition-colors">{t('footer.about', 'About')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('footer.contact', 'Contact')}</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">{t('nav.pricing', 'Pricing')}</Link></li>
              <li><Link href={homeRoute} className="hover:text-white transition-colors">{isAdmin ? t('nav.adminCms', 'Admin Panel') : t('nav.dashboard', 'Dashboard')}</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">{t('footer.legal', 'Legal & Policies')}</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy', 'Privacy Policy')}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms', 'Terms of Service')}</Link></li>
              <li><Link href="/guarantee-terms" className="hover:text-white transition-colors">{t('footer.guarantee', 'Guarantee Terms')}</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">{t('footer.disclaimer', 'Disclaimer')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 space-y-4 md:space-y-0">
          <p className="max-w-3xl leading-relaxed">
            <strong>BACB Disclaimer:</strong> RBT®, Registered Behavior Technician®, and BACB® are registered trademarks of the Behavior Analyst Certification Board® (BACB®). RBT Practice Questions is an independent prep provider and is not affiliated with or endorsed by the BACB®.
          </p>
          <div className="flex items-center space-x-1">
            <span>{t('footer.builtWithPrecision', 'Built with precision for RBT Candidates')}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
