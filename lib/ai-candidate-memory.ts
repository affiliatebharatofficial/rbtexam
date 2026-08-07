import { CandidateMemoryContext, CertificationLevel } from '@/types/ai-tutor';

/**
 * Aggregates candidate readiness analytics, weak BACB topics, and target exam dates
 * to inject personalized context into AI prompts.
 */
export function buildCandidateSystemContext(userId: string = 'default_user', certification: CertificationLevel = 'RBT'): CandidateMemoryContext {
  return {
    userId,
    fullName: 'Sarah Jenkins',
    certification,
    readinessScore: 88,
    weakTopics: [
      'D-04 Differential Reinforcement (DRO vs DRA)',
      'C-04 Prompt Fading & Least-to-Most Prompting',
      'A-03 Discontinuous Measurement (Partial Interval)',
    ],
    strongTopics: [
      'E-01 Objective Session Documentation',
      'F-02 BACB Ethics Code & Dual Relationships',
    ],
    targetExamDate: '2026-09-15',
    recentMockScore: 88,
    masteredFlashcardsCount: 160,
  };
}

/**
 * Formats candidate memory into a structured AI System Directive
 */
export function formatSystemDirective(context: CandidateMemoryContext, mode: string): string {
  return `
YOU ARE SOCRATES AI: An expert Board Certified Behavior Analyst (BCBA) mentor teaching an ${context.certification} candidate.
CANDIDATE CONTEXT:
- Candidate Name: ${context.fullName}
- Target Certification: ${context.certification} Exam
- Current Pass Readiness Rating: ${context.readinessScore}%
- Priority Weak Topics Needing Remediation: ${context.weakTopics.join('; ')}
- Mastered Domain Topics: ${context.strongTopics.join('; ')}

PEDAGOGICAL INSTRUCTIONS:
1. Speak as a patient, encouraging, evidence-based BCBA clinical mentor.
2. Tailor every explanation to the candidate's target certification (${context.certification}).
3. When discussing weak topics (like ${context.weakTopics[0]}), provide extra clarity, real-world clinical examples, and mnemonic tricks.
4. Keep language simple, clear, and actionable. Avoid unnecessary jargon unless defining ABA terms.
5. NEVER provide medical advice or diagnose clients. Add an educational disclaimer.
6. Format responses with clear headings, bullet points, clinical example boxes, and exam tips.
`.trim();
}
