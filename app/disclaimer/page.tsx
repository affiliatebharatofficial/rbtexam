import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { constructMetadata } from '@/utils/seo';
import {
  Scale,
  ShieldAlert,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'BACB Non-Affiliation & Educational Disclaimer | RBT Practice AI',
  description:
    'Official non-affiliation and educational disclaimer for RBT Practice AI. Independent study platform not affiliated with the Behavior Analyst Certification Board® (BACB®).',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  const contactEmail = 'hello@rbtpracticeai.com';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header */}
        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-2">
            <Badge variant="emerald" className="gap-1 text-xs">
              <Scale className="w-3.5 h-3.5" />
              <span>Trademark & Regulatory Notice</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Educational Disclaimer & Non-Affiliation Notice
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Please read this disclaimer carefully. It sets forth the independent nature of RBT Practice AI, trademark ownership, educational scope, content originality, AI disclosure, and exam pass limitations.
          </p>
        </div>

        {/* Major Trademark Notice Card */}
        <Card glass className="p-6 sm:p-8 border-amber-300 bg-amber-50/60 shadow-md space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0 shadow-lg">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <h2 className="text-base sm:text-lg font-black text-amber-900">
                BACB® & Pearson VUE Trademark Notice & Non-Affiliation
              </h2>
              <p>
                <strong>RBT®</strong>, <strong>Registered Behavior Technician®</strong>, and <strong>BACB®</strong> are registered trademarks of the <strong>Behavior Analyst Certification Board® (BACB®)</strong>.
              </p>
              <p>
                <strong>Pearson VUE®</strong> is a registered trademark of Pearson Education, Inc. or its affiliate(s).
              </p>
              <p className="font-semibold text-amber-900">
                RBT Practice AI is an <strong>independent educational preparation platform</strong> operated by RBT Practice AI Inc. It is <strong>NOT affiliated with, sponsored by, administered by, authorized by, or endorsed by the Behavior Analyst Certification Board® (BACB®) or Pearson VUE</strong>.
              </p>
            </div>
          </div>
        </Card>

        {/* Detail Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

          {/* Section 1: Original Practice Materials & No Leaked Questions */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">1</span>
              <span>Original Educational Content — No Unauthorized Exam Content</span>
            </h2>
            <p>
              The Behavior Analyst Certification Board (BACB) does not publish, license, or disclose actual examination questions. All practice questions, mock exam scenarios, answer rationales, and flashcards provided on RBT Practice AI are <strong>original educational materials</strong> created independently by Board Certified Behavior Analysts (BCBAs) and behavioral educational specialists.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Strict Test Security & Ethical Compliance</span>
              </div>
              <p className="text-xs text-slate-600">
                RBT Practice AI <strong>does not provide access to confidential, recalled, leaked, reconstructed ("brain dump"), or unauthorized examination content</strong>. Our materials are designed in ethical compliance with the BACB Ethics Code to help candidates master Applied Behavior Analysis concepts and the BACB RBT 3rd Edition Test Content Outline (TCO).
              </p>
            </div>
          </section>

          {/* Section 2: No Passing Guarantees */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">2</span>
              <span>Exam Performance & Passing Limitations</span>
            </h2>
            <p>
              While our diagnostic tools and practice simulations are designed to measure readiness across Domains A through F, <strong>exam performance cannot be guaranteed</strong>. Passing the actual RBT certification examination depends entirely upon the individual learner's comprehensive preparation, clinical comprehension, adherence to official requirements, and test-taking performance.
            </p>
            <p>
              Any marketing references to a "Pass Guarantee" refer exclusively to our conditional subscription refund policy detailed in our <Link href="/guarantee-terms" className="text-[#2563EB] font-bold hover:underline">Guarantee Terms</Link>. The refund of platform subscription fees under that policy constitutes the sole and exclusive remedy for any candidate exam outcome.
            </p>
          </section>

          {/* Section 3: Educational Scope & BACB Official Requirements */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">3</span>
              <span>Educational & Training Scope vs. Official BACB Requirements</span>
            </h2>
            <p>
              RBT Practice AI is designed exclusively as an auxiliary study aid and self-assessment platform. Users must rely on official BACB resources (<a href="https://www.bacb.com" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-0.5">bacb.com <ExternalLink className="w-3 h-3" /></a>) for current certification policies, qualification standards, and handbook guidelines.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                This platform does <strong>not substitute for the mandatory 40-hour RBT training course</strong> required by the BACB.
              </li>
              <li>
                This platform does <strong>not conduct or certify the RBT Initial Competency Assessment</strong>, which must be administered directly by a qualified BACB supervisor.
              </li>
              <li>
                Completion of practice tests, diagnostic simulations, or flashcards on our website does not confer official certification. Official Registered Behavior Technician credentials are awarded solely by the BACB upon passing the official examination administered via Pearson VUE.
              </li>
            </ul>
          </section>

          {/* Section 4: AI Tutor & AI-Generated Content Disclosure */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">4</span>
              <span>AI-Generated Educational Assistance Disclosure</span>
            </h2>
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2 text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Sparkles className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                <span>Socrates AI Tutor & Automated Assistance</span>
              </div>
              <p className="text-xs text-slate-600">
                The platform utilizes artificial intelligence (AI) models to deliver interactive study assistance, conversational Socratic explanations, and practice scenario breakdowns.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                <li>AI-generated educational content is intended solely for supplementary study assistance and may occasionally contain approximations or errors.</li>
                <li>AI-generated rationales do not constitute official BACB commentary, clinical behavior intervention plans, or legal advice.</li>
                <li>Candidates should cross-reference complex regulatory or clinical ethics questions with the official BACB RBT Ethics Code 2.0 and current BACB Task List documentation.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: No Clinical Practice Advice */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">5</span>
              <span>No Medical or Clinical Treatment Advice</span>
            </h2>
            <p>
              All clinical scenarios, question rationales, and behavior reduction examples provided across this website are hypothetical educational illustrations. They do not constitute clinical treatment recommendations, psychological services, or behavior intervention plans for applied client therapy. Registered Behavior Technicians and candidates must always work under the direct clinical supervision of a Board Certified Behavior Analyst (BCBA or BCaBA).
            </p>
          </section>

          {/* Section 6: Contact Compliance Desk */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Questions Regarding Disclaimers & Compliance</span>
            </h2>
            <p className="text-xs text-slate-600">
              For questions regarding our regulatory statements, trademark citations, or educational scope, please contact:
            </p>
            <div className="text-xs font-mono font-bold text-slate-800 pt-1">
              Email: <a href={`mailto:${contactEmail}`} className="text-[#2563EB] hover:underline">{contactEmail}</a>
              <br />
              RBT Practice AI Inc. • Compliance & Regulatory Desk
            </div>
          </section>

        </div>

        {/* Footer Links */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-bold text-[#2563EB]">
            <Link href="/terms" className="hover:underline">
              &larr; Terms of Service
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/refund-policy" className="hover:underline">
              Refund Policy &rarr;
            </Link>
          </div>
          <Link href="/guarantee-terms">
            <Button variant="outline" size="sm" className="text-xs">
              View Guarantee Terms
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
