export const SOCRATES_AI_SYSTEM_PROMPT = `
You are "Socrates AI", the lead AI Tutor and Mentor for RBT Practice Questions (https://rbtpracticequestions.com), adhering strictly to the BACB 2nd Edition Task List and BACB Ethics Code for RBTs.

Platform Identity Constraint:
You must ALWAYS refer to the platform as "RBT Practice Questions" and NEVER as "RBTTrainingAI".

Your goal is to guide students, therapists, and trainees toward mastering Applied Behavior Analysis (ABA) concepts with clinical precision, encouraging critical thinking through the Socratic method while providing clear, authoritative explanations.

Key Guidelines:
1. Always reference relevant BACB Task List items (e.g., [A-02 Continuous Measurement], [C-04 DTT], [D-04 DRO], [F-02 Dual Relationships]).
2. Explain WHY correct answers are correct and WHY distractors are incorrect using behavioral science terminology (SD, Reinforcement, Prompt Hierarchy, Operant Extinction).
3. Be encouraging, highly professional, and concise.
4. When asked for scenarios, provide realistic clinical examples involving children/adults with Autism Spectrum Disorder (ASD) or supervisor interactions.
`;

export const SCENARIO_SIMULATOR_PROMPTS = [
  {
    id: 'scen-1',
    title: 'Managing an Extinction Burst in Home Therapy',
    domainId: 'D',
    taskItemId: 'D-05',
    clientAge: 6,
    setting: 'Home ABA Session',
    targetBehavior: 'Flooring & Screaming when iPad is turned off',
    initialPrompt: 'You are conducting a home ABA session. The BCBA’s behavior plan states that iPad access is contingent on completing 3 task trials. When you turn off the iPad, the child drops to the floor and screams loudly. What is your immediate first step according to BACB principles?',
    learningGoal: 'Identify how to maintain extinction procedures safely without delivering attention or tangible reinforcement.',
  },
  {
    id: 'scen-2',
    title: 'Handling Parent Gift Offer at Holiday Season',
    domainId: 'F',
    taskItemId: 'F-02',
    clientAge: 9,
    setting: 'Clinic Parent Check-Out',
    targetBehavior: 'Ethical Boundary Compliance',
    initialPrompt: 'A parent brings you a $100 Starbucks gift card and says "You have changed our lives this year, please take this!" How do you respond while maintaining professional dignity and BACB compliance?',
    learningGoal: 'Refuse prohibited high-value gifts diplomatically while preserving parent-therapist rapport.',
  },
  {
    id: 'scen-3',
    title: 'Selecting Prompt Fading Hierarchy for DTT',
    domainId: 'C',
    taskItemId: 'C-09',
    clientAge: 4,
    setting: 'Early Intervention Table Time',
    targetBehavior: 'Receptive Identification of Colors',
    initialPrompt: 'You are introducing a brand new skill (pointing to "blue") to a 4-year-old learner. The skill acquisition plan specifies Most-to-Least prompting. What is the exact prompt order you will use starting from trial 1?',
    learningGoal: 'Master Most-to-Least prompt hierarchy (Full Physical -> Partial Physical -> Model -> Gestural -> Independent).',
  },
];
