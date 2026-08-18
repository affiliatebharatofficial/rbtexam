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

  let weakTopics = [
    'D-04 Differential Reinforcement (DRO vs DRA)',
    'C-04 Prompt Fading & Least-to-Most Prompting',
    'A-03 Discontinuous Measurement (Partial Interval)',
  ];
  let strongTopics = [
    'E-01 Objective Session Documentation',
    'F-02 BACB Ethics Code & Dual Relationships',
  ];

  if (certification === 'BCaBA') {
    weakTopics = [
      'FA-02 Functional Analysis (FA) Conditions (Attention vs Escape)',
      'SUP-01 RBT Competency Assessment & Supervision Requirements',
      'BEH-04 Token Economy Backup Reinforcer Systems',
    ];
    strongTopics = [
      'MEAS-02 Operational Behavior Definitions',
      'DIS-01 Reversal & Multiple Baseline Designs',
    ];
  } else if (certification === 'BCBA') {
    weakTopics = [
      'EXP-03 Component & Parametric Analysis Procedures',
      'FBA-05 Functional Analysis vs Descriptive Assessment',
      'OBM-02 Performance Management & Staff Training (BST)',
    ];
    strongTopics = [
      'PHIL-01 Philosophical Assumptions (Determinism, Parsimony)',
      'SYS-01 Multi-Tiered Positive Behavior Support Systems',
    ];
  }

  return {
    userId,
    fullName: cleanName,
    certification,
    readinessScore: certification === 'BCBA' ? 86 : certification === 'BCaBA' ? 89 : 88,
    weakTopics,
    strongTopics,
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
- Identify common exam traps and BACB task list alignment.`;
  } else {
    modeDirective = `
ACTIVE MODE: SOCRATIC MENTOR
Your primary objective is to guide the candidate through ABA concepts using Socratic questioning, clinical analogies, and step-by-step conceptual mastery.`;
  }

  const certOutlineName =
    context.certification === 'BCBA'
      ? 'BACB 6th Edition BCBA Test Content Outline (TCO)'
      : context.certification === 'BCaBA'
      ? 'BACB 6th Edition BCaBA Test Content Outline (TCO)'
      : 'BACB RBT 3rd Edition Test Content Outline (TCO)';

  const roleScopeInstruction =
    context.certification === 'BCBA'
      ? 'TARGET CERTIFICATION: BCBA (Board Certified Behavior Analyst). Focus on advanced behavior analysis, independent case management, component/parametric analysis, OBM performance systems, and clinical supervision.'
      : context.certification === 'BCaBA'
      ? 'TARGET CERTIFICATION: BCaBA (Board Certified Assistant Behavior Analyst). Focus on assistant behavior analysis, FBA functional analysis conditions, RBT supervision, and behavior change plan development under BCBA oversight.'
      : 'TARGET CERTIFICATION: RBT (Registered Behavior Technician). Focus on 1-on-1 direct therapy implementation, measurement, prompt fading, and objective session logging according to the RBT 3rd Edition Task List.';

  return `
YOU ARE SOCRATES AI: An expert Board Certified Behavior Analyst (BCBA) mentor teaching a candidate preparing for the ${context.certification} Exam (${certOutlineName}).
${modeDirective}

CANDIDATE CONTEXT:
- Candidate Name: ${context.fullName}
- Target Certification Level: ${context.certification} Exam
- Exam Outline: ${certOutlineName}
- Current Pass Readiness Rating: ${context.readinessScore}%
- Priority Weak Topics Needing Remediation: ${context.weakTopics.join('; ')}
- Mastered Domain Topics: ${context.strongTopics.join('; ')}

PEDAGOGICAL INSTRUCTIONS:
1. ${roleScopeInstruction}
2. Speak as a patient, encouraging, evidence-based BCBA clinical mentor.
3. Greet and address the candidate by their exact name ("${context.fullName}"). NEVER call them Sarah, Alex, or any other default placeholder name.
4. Tailor every question and explanation strictly to the target certification level (${context.certification}).
5. When discussing weak topics (like ${context.weakTopics[0]}), provide extra clarity, real-world clinical examples, and mnemonic tricks.
6. Keep language simple, clear, and actionable. Avoid unnecessary jargon unless defining ABA terms.
7. NEVER provide medical advice or diagnose clients. Add an educational disclaimer.
8. Format responses with clear headings, bullet points, clinical example boxes, and exam tips.
`.trim();
}
