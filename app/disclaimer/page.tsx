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
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'BACB Non-Affiliation & Educational Disclaimer | RBT Practice AI',
  description:
    'Official non-affiliation and educational disclaimer for RBT Practice AI. RBT® is a registered trademark of the BACB®. Read our compliance statement.',
  canonicalUrl: 'https://rbtpracticeai.com/disclaimer',
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
              <span>Trademark & Compliance Notice</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Official Disclaimers & Compliance Notice
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Please review the following disclaimers regarding the independent nature of RBT Practice AI, trademark ownership, and educational guidance.
          </p>
        </div>

        {/* Major Trademark Notice Card */}
        <Card glass className="p-6 sm:p-8 border-amber-300 bg-amber-50/50 shadow-md space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold flex-shrink-0 shadow-lg">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <h2 className="text-base sm:text-lg font-black text-amber-900">
                BACB® & Pearson VUE Trademark Notice
              </h2>
              <p>
                <strong>RBT®</strong>, <strong>Registered Behavior Technician®</strong>, and <strong>BACB®</strong> are registered trademarks of the <strong>Behavior Analyst Certification Board® (BACB®)</strong>.
              </p>
              <p>
                <strong>Pearson VUE®</strong> is a registered trademark of Pearson Education, Inc. or its affiliate(s).
              </p>
              <p className="font-semibold text-amber-900">
                RBT Practice AI is an independent exam preparation platform operated by RBT Practice AI Inc. We are NOT affiliated with, authorized by, endorsed by, sponsored by, or in any way officially connected with the Behavior Analyst Certification Board® (BACB®) or Pearson VUE.
              </p>
            </div>
          </div>
        </Card>

        {/* Detail Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">1</span>
              <span>Independent Practice & Mock Materials</span>
            </h3>
            <p>
              The BACB does not disclose, license, or publish actual examination questions. All practice questions, mock exam scenarios, answer rationales, and flashcards provided on RBT Practice AI are original educational content designed by Board Certified Behavior Analysts (BCBAs) and clinical psychometricians.
            </p>
            <p>
              Our questions are formulated to closely mirror the cognitive depth, clinical scenarios, terminology, and content distribution of the official <strong>BACB RBT 3rd Edition Test Content Outline (TCO)</strong> across Domains A through F.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">2</span>
              <span>Educational & Training Scope</span>
            </h3>
            <p>
              RBT Practice AI is designed exclusively as an auxiliary study aid to assist candidates in testing their knowledge, reinforcing Applied Behavior Analysis (ABA) concepts, and practicing under simulated test conditions.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                This platform does <strong>not substitute for the mandatory 40-hour RBT training course</strong> required by the BACB.
              </li>
              <li>
                This platform does <strong>not conduct the RBT Initial Competency Assessment</strong>, which must be administered by a qualified BACB supervisor.
              </li>
              <li>
                Completion of practice tests on our website does not constitute official certification. Official certification is awarded exclusively by the BACB upon fulfilling all BACB eligibility requirements and passing the official exam administered at Pearson VUE.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">3</span>
              <span>No Clinical Practice Advice</span>
            </h3>
            <p>
              The explanations and rationales provided on this platform (including those generated by the Socrates AI Tutor) are for exam-preparation purposes only and should not be used as clinical behavior intervention plans, medical diagnosis, or treatment recommendations for clients in applied settings. Registered Behavior Technicians must always practice under the direct supervision of a BCBA or BCaBA.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center text-xs font-black">4</span>
              <span>Pass-or-Refund Performance Remedy</span>
            </h3>
            <p>
              Any claims regarding exam pass guarantees are subject entirely to our published <Link href="/guarantee-terms" className="text-[#2563EB] font-bold hover:underline">Pass-or-Refund Guarantee Terms</Link>. The refund of subscription fees under that policy represents the sole and exclusive remedy for any candidate exam outcome.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2563EB]" />
              <span>Contact Compliance Desk</span>
            </h3>
            <p className="text-xs text-slate-600">
              For questions regarding our disclaimers, licensing, or clinical citations, please contact:
            </p>
            <div className="text-xs font-mono font-bold text-slate-800 pt-1">
              Email: <a href={`mailto:${contactEmail}`} className="text-[#2563EB] hover:underline">{contactEmail}</a>
              <br />
              RBT Practice AI Inc. • Compliance & Legal Office
            </div>
          </section>

        </div>

        {/* Footer Links */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <Link href="/terms" className="text-xs font-bold text-[#2563EB] hover:underline">
            &larr; View Terms of Service
          </Link>
          <Link href="/guarantee-terms" className="text-xs font-bold text-[#2563EB] hover:underline">
            View Guarantee Policy &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
