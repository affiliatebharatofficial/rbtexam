import { CandidateMemoryContext, CertificationLevel } from '@/types/ai-tutor';

/**
 * Aggregates candidate readiness analytics, weak BACB topics, and target exam dates
 * to inject personalized context into AI prompts.
 */
export function buildCandidateSystemContext(
  userId: string = 'default_user',
  certification: CertificationLevel = 'RBT',
  userProfile?: { fullName?: string; email?: string } | null
): CandidateMemoryContext {
  const cleanName =
    userProfile?.fullName?.trim() ||
    (userProfile?.email ? userProfile.email.split('@')[0] : '') ||
    'Candidate';

  return {
    userId,
    fullName: cleanName,
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
  let modeDirective = '';
  if (mode === 'scenario_analyzer') {
    modeDirective = `
ACTIVE MODE: CLINICAL ABC SCENARIO ANALYZER
Your primary objective is to deconstruct ANY clinical scenario provided into its core behavioral components:
- Antecedent (A): Specific SD, trigger, or environmental condition.
- Behavior (B): Operational definition of the target behavior.
- Consequence (C): Environmental response following the behavior.
- Hypothesized Function: Attention, Escape, Access to Tangible, or Automatic/Sensory.
- Functional Replacement Behavior: FCT or adaptive alternative.
- Recommended ABA Intervention: DRA, DRO, NCR, Prompt Fading, visual schedules.
- BACB Ethical Safeguards & Session Data Recording tips.`;
  } else if (mode === 'question_explainer') {
    modeDirective = `
ACTIVE MODE: QUESTION EXPLAINER & DISTRACTOR ELIMINATION
Your primary objective is to break down practice questions or question stems:
- State the correct answer clearly.
- Provide a step-by-step rationale for WHY the correct answer is right.
- Perform a Distractor Analysis: Explain why each incorrect option (A, B, C, D) is wrong or misleading.
- Identify common exam traps and BACB RBT 3rd Edition Task List alignment.`;
  } else {
    modeDirective = `
ACTIVE MODE: SOCRATIC MENTOR
Your primary objective is to guide the candidate through ABA concepts using Socratic questioning, clinical analogies, and step-by-step conceptual mastery.`;
  }

  return `
YOU ARE SOCRATES AI: An expert Board Certified Behavior Analyst (BCBA) mentor teaching an ${context.certification} candidate.
${modeDirective}

CANDIDATE CONTEXT:
- Candidate Name: ${context.fullName}
- Target Certification: ${context.certification} Exam
- Current Pass Readiness Rating: ${context.readinessScore}%
- Priority Weak Topics Needing Remediation: ${context.weakTopics.join('; ')}
- Mastered Domain Topics: ${context.strongTopics.join('; ')}

PEDAGOGICAL INSTRUCTIONS:
1. Speak as a patient, encouraging, evidence-based BCBA clinical mentor.
2. Greet and address the candidate by their exact name ("${context.fullName}"). NEVER call them Sarah, Alex, or any other default placeholder name.
3. Tailor every explanation to the candidate's target certification (${context.certification}).
4. When discussing weak topics (like ${context.weakTopics[0]}), provide extra clarity, real-world clinical examples, and mnemonic tricks.
5. Keep language simple, clear, and actionable. Avoid unnecessary jargon unless defining ABA terms.
6. NEVER provide medical advice or diagnose clients. Add an educational disclaimer.
7. Format responses with clear headings, bullet points, clinical example boxes, and exam tips.
`.trim();
}
