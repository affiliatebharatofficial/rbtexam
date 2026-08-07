import React from 'react';
import Link from 'next/link';
import { Brain, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2563EB] to-blue-500 flex items-center justify-center text-white shadow-lg">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                RBT<span className="text-[#2563EB]">Training</span>AI
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier AI-powered RBT exam preparation SaaS designed specifically for autism therapists, ABA students, and clinical training centers across the United States.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Aligned with BACB 2nd Edition Task List</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Exam Prep Tools</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/exam" className="hover:text-white transition-colors">Adaptive AI Exam Simulator</Link></li>
              <li><Link href="/tutor" className="hover:text-white transition-colors">Socrates AI RBT Tutor</Link></li>
              <li><Link href="/task-list" className="hover:text-white transition-colors">2nd Edition Task List Guide</Link></li>
              <li><Link href="/flashcards" className="hover:text-white transition-colors">Spaced Repetition Flashcards</Link></li>
              <li><Link href="/analytics" className="hover:text-white transition-colors">Readiness Score Analytics</Link></li>
            </ul>
          </div>

          {/* Target Audience Solutions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Solutions For</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/clinic" className="hover:text-white transition-colors">ABA Clinics & Agencies</Link></li>
              <li><Link href="/clinic" className="hover:text-white transition-colors">RBT Training Centers</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Autism Behavior Technicians</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">BCBA Supervisors</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Enterprise Cohort Licensing</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Target Market & Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="text-slate-400">United States (US National Exam)</li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">100% Pass Guarantee Policy</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 space-y-4 md:space-y-0">
          <p className="max-w-3xl leading-relaxed">
            <strong>BACB Disclaimer:</strong> RBT®, Registered Behavior Technician®, and BACB® are registered trademarks of the Behavior Analyst Certification Board® (BACB®). RBTTrainingAI is an independent prep provider and is not affiliated with or endorsed by the BACB®.
          </p>
          <div className="flex items-center space-x-1">
            <span>Built with precision for US RBT Candidates</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
