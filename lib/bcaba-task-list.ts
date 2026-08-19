import { ExamDomain } from '@/types/certification';

/**
 * BACB BCaBA Test Content Outline (TCO)
 * Sections: Foundations & Applications
 */
export const BCABA_TASK_LIST: ExamDomain[] = [
  {
    id: 'A',
    name: 'Philosophical Underpinnings & Concepts',
    shortName: 'Foundations & Concepts',
    description: 'Foundational behavior analytic science, selectionism, determinism, operant/respondent conditioning, and environmental explanations.',
    iconName: 'Compass',
    questionCountApprox: 28,
    weightPercentage: 18,
    items: [
      {
        id: 'A.1',
        domainId: 'A',
        title: 'Philosophical assumptions and behavior analysis foundations',
        description: 'Selectionism, determinism, empiricism, and pragmatism in assistant analyst practice.',
        keyConcepts: ['Determinism', 'Empiricism', 'Parsimony', 'Pragmatism'],
        examWeightPercentage: 4.5,
      },
    ],
  },
  {
    id: 'B',
    name: 'Measurement and Experimental Design',
    shortName: 'Measurement & Design',
    description: 'Continuous and discontinuous measurement systems, IOA calculation, and single-case design implementation.',
    iconName: 'BarChart3',
    questionCountApprox: 32,
    weightPercentage: 20,
    items: [
      {
        id: 'B.1',
        domainId: 'B',
        title: 'Measurement procedures and data interpretation',
        description: 'Implement measurement systems, IOA, and visual data analysis.',
        keyConcepts: ['IOA', 'Visual Analysis', 'Continuous Measurement'],
        examWeightPercentage: 5.0,
      },
    ],
  },
  {
    id: 'C',
    name: 'Behavior Assessment',
    shortName: 'Behavior Assessment',
    description: 'Descriptive assessments, functional analysis assist, preference and reinforcer assessments under BCBA direction.',
    iconName: 'ClipboardList',
    questionCountApprox: 30,
    weightPercentage: 19,
    items: [
      {
        id: 'C.1',
        domainId: 'C',
        title: 'Functional assessment and preference assessment procedures',
        description: 'Conduct descriptive assessments and support BCBAs in experimental functional analysis.',
        keyConcepts: ['Descriptive Assessment', 'Functional Analysis Support', 'Preference Assessment'],
        examWeightPercentage: 5.0,
      },
    ],
  },
  {
    id: 'D',
    name: 'Behavior-Change Procedures & Interventions',
    shortName: 'Interventions & Change',
    description: 'Design and implement reinforcement procedures, differential reinforcement, shaping, chaining, and prompt fading.',
    iconName: 'Sliders',
    questionCountApprox: 42,
    weightPercentage: 26,
    items: [
      {
        id: 'D.1',
        domainId: 'D',
        title: 'Behavior reduction and skill acquisition implementation',
        description: 'DRA, DRO, DRL, token systems, and contingency management.',
        keyConcepts: ['Differential Reinforcement', 'Skill Acquisition', 'Generalization'],
        examWeightPercentage: 6.5,
      },
    ],
  },
  {
    id: 'E',
    name: 'Ethics and Supervision of RBTs',
    shortName: 'Ethics & RBT Supervision',
    description: 'BACB Ethics Code compliance, scope of practice under BCBA oversight, and direct supervision of RBT personnel.',
    iconName: 'ShieldCheck',
    questionCountApprox: 28,
    weightPercentage: 17,
    items: [
      {
        id: 'E.1',
        domainId: 'E',
        title: 'Ethics code and RBT supervision compliance',
        description: 'Provide BST and performance monitoring to RBTs under supervising BCBA oversight.',
        keyConcepts: ['RBT Supervision', 'Ethics Code', 'BST Training'],
        examWeightPercentage: 4.5,
      },
    ],
  },
];
