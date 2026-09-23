import { BACBDomain } from '@/types/bacb';

/**
 * Master Canonical BACB RBT 3rd Edition Test Content Outline (TCO)
 * Source: Behavior Analyst Certification Board. (2023). RBT Test Content Outline (3rd ed.).
 * https://www.bacb.com/wp-content/uploads/2023/12/RBT-3rd-Edition-Test-Content-Outline-240903-a.pdf
 * 
 * Total Examination: 85 Questions (75 Scored + 10 Unscored Pilot Questions)
 * Examination Duration: 90 Minutes
 * Total Tasks: 43 Tasks across 6 Domains
 */
export const BACB_TASK_LIST_3RD_EDITION: BACBDomain[] = [
  {
    id: 'A',
    name: 'Data Collection and Graphing',
    shortName: 'Data & Graphing',
    description: 'Implement continuous and discontinuous measurement procedures, permanent product recording, update line graphs, describe behavior in observable and measurable terms, calculate data, identify trends, and describe risks of unreliable data.',
    iconName: 'BarChart3',
    questionCountApprox: 13,
    weightPercentage: 17,
    items: [
      {
        id: 'A-01',
        domainId: 'A',
        title: 'A.1. Implement continuous measurement procedures',
        description: 'Implement continuous measurement procedures (e.g., frequency, duration, latency, interresponse time).',
        keyConcepts: ['Frequency / Count', 'Duration', 'Latency', 'Interresponse Time (IRT)'],
        examWeightPercentage: 2.5,
      },
      {
        id: 'A-02',
        domainId: 'A',
        title: 'A.2. Implement discontinuous measurement procedures',
        description: 'Implement discontinuous measurement procedures (e.g., partial & whole interval, momentary time sampling).',
        keyConcepts: ['Partial Interval (overestimates)', 'Whole Interval (underestimates)', 'Momentary Time Sampling'],
        examWeightPercentage: 2.5,
      },
      {
        id: 'A-03',
        domainId: 'A',
        title: 'A.3. Implement permanent product recording procedures',
        description: 'Implement permanent product recording procedures to measure tangible environmental outcomes produced by behavior.',
        keyConcepts: ['Permanent Product', 'Tangible Outcomes', 'Post-Behavior Measurement'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'A-04',
        domainId: 'A',
        title: 'A.4. Enter data and update graphs',
        description: 'Enter data and update graphs accurately (e.g., plotting sessions on X-axis, behavior on Y-axis, phase change lines).',
        keyConcepts: ['Line Graphs', 'X-axis (Abscissa / Time)', 'Y-axis (Ordinate / Behavior)', 'Phase Change Lines'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'A-05',
        domainId: 'A',
        title: 'A.5. Describe behavior and environment in observable and measurable terms',
        description: 'Describe behavior and environment in observable and measurable terms using clear operational definitions without subjective constructs.',
        keyConcepts: ['Operational Definition', 'Topography', 'Measurable & Observable', 'Objective Language'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'A-06',
        domainId: 'A',
        title: 'A.6. Calculate and summarize data in different ways',
        description: 'Calculate and summarize data in different ways (e.g., rate per minute/hour, mean duration, percentage of opportunities).',
        keyConcepts: ['Rate Calculation (Count/Time)', 'Mean Duration', 'Percentage of Intervals/Trials'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'A-07',
        domainId: 'A',
        title: 'A.7. Identify trends in graphed data',
        description: 'Identify trends, level, and variability in graphed behavior data across baseline and intervention phases.',
        keyConcepts: ['Trend (Ascending, Descending, Zero)', 'Level', 'Variability', 'Visual Analysis'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'A-08',
        domainId: 'A',
        title: 'A.8. Describe risks of unreliable data collection and poor procedural fidelity',
        description: 'Describe the risks associated with unreliable data collection and poor procedural fidelity on client outcomes and clinical decisions.',
        keyConcepts: ['Inter-Observer Agreement (IOA)', 'Treatment Fidelity', 'Procedural Integrity', 'Data Reliability Risks'],
        examWeightPercentage: 2.0,
      },
    ],
  },
  {
    id: 'B',
    name: 'Behavior Assessment',
    shortName: 'Behavior Assessment',
    description: 'Conduct preference assessments, participate in assessments of relevant skill strengths and deficits, and participate in components of functional assessment procedures.',
    iconName: 'ClipboardCheck',
    questionCountApprox: 8,
    weightPercentage: 11,
    items: [
      {
        id: 'B-01',
        domainId: 'B',
        title: 'B.1. Conduct preference assessments',
        description: 'Conduct preference assessments (e.g., multiple stimulus with/without replacement, paired stimulus, free operant).',
        keyConcepts: ['Free Operant', 'Paired Choice / Forced Choice', 'MSWO', 'MSW', 'Single Stimulus'],
        examWeightPercentage: 4.0,
      },
      {
        id: 'B-02',
        domainId: 'B',
        title: 'B.2. Participate in assessments of skill strengths and deficits',
        description: 'Participate in assessments of relevant skill strengths and deficits (e.g., curriculum-based, developmental, social skills).',
        keyConcepts: ['Curriculum-Based Assessments', 'Developmental Checklists', 'Baseline Probing', 'Skills Tracking'],
        examWeightPercentage: 3.5,
      },
      {
        id: 'B-03',
        domainId: 'B',
        title: 'B.3. Participate in functional assessment procedures',
        description: 'Participate in components of functional assessment procedures (e.g., descriptive assessment, ABC data collection, functional analysis assistance).',
        keyConcepts: ['ABC Data Collection', 'Descriptive Assessment', 'Functional Analysis Assistance', '4 Functions of Behavior'],
        examWeightPercentage: 3.5,
      },
    ],
  },
  {
    id: 'C',
    name: 'Behavior Acquisition',
    shortName: 'Behavior Acquisition',
    description: 'Implement positive and negative reinforcement, establish conditioned reinforcers, execute discrete-trial teaching, naturalistic teaching, task analyzed chaining, discrimination training, prompt hierarchies and fading, generalization, distinguish maintenance vs acquisition, shaping, and token economies.',
    iconName: 'GraduationCap',
    questionCountApprox: 19,
    weightPercentage: 25,
    items: [
      {
        id: 'C-01',
        domainId: 'C',
        title: 'C.1. Implement positive and negative reinforcement procedures',
        description: 'Implement positive and negative reinforcement procedures (e.g., immediately, contingently, according to schedules of reinforcement) along a continuum of dimensions (e.g., magnitude, intensity, variety).',
        keyConcepts: ['Positive Reinforcement', 'Negative Reinforcement', 'Schedules (FR, VR, FI, VI)', 'Immediacy & Contingency', 'Magnitude & Variety'],
        examWeightPercentage: 3.0,
      },
      {
        id: 'C-02',
        domainId: 'C',
        title: 'C.2. Implement procedures to establish and use conditioned reinforcers',
        description: 'Implement procedures to establish and use conditioned reinforcers through stimulus-stimulus pairing with unconditioned reinforcers.',
        keyConcepts: ['Conditioned Reinforcers', 'Unconditioned Reinforcers', 'Stimulus Pairing', 'Generalized Conditioned Reinforcers'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'C-03',
        domainId: 'C',
        title: 'C.3. Implement discrete-trial teaching procedures',
        description: 'Implement discrete-trial teaching (DTT) procedures (Antecedent/SD -> Prompt -> Learner Response -> Consequence/Feedback -> Inter-trial Interval).',
        keyConcepts: ['Discriminative Stimulus (SD)', 'Learner Response', 'Reinforcement / Correction', 'Inter-Trial Interval'],
        examWeightPercentage: 3.0,
      },
      {
        id: 'C-04',
        domainId: 'C',
        title: 'C.4. Implement naturalistic teaching procedures',
        description: 'Implement naturalistic teaching procedures (e.g., incidental teaching, natural environment training, mand training, behavior chain interruption).',
        keyConcepts: ['Incidental Teaching', 'Natural Environment Training (NET)', 'Mand Training', 'Capturing vs Contriving Motivation'],
        examWeightPercentage: 2.5,
      },
      {
        id: 'C-05',
        domainId: 'C',
        title: 'C.5. Implement task analyzed chaining procedures',
        description: 'Implement task analyzed chaining procedures (e.g., forward chaining, backward chaining, total task presentation).',
        keyConcepts: ['Task Analysis', 'Forward Chaining', 'Backward Chaining', 'Total Task Presentation'],
        examWeightPercentage: 2.5,
      },
      {
        id: 'C-06',
        domainId: 'C',
        title: 'C.6. Implement discrimination training',
        description: 'Implement discrimination training to teach differential responding in the presence of SD versus S-delta stimuli.',
        keyConcepts: ['SD (Reinforcement Available)', 'S-Delta (Extinction)', 'Differential Responding', 'Stimulus Discrimination'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'C-07',
        domainId: 'C',
        title: 'C.7. Implement prompting and prompt fading procedures',
        description: 'Implement procedures using stimulus and response prompts that include appropriate fading procedures (e.g., errorless, least-to-most, most-to-least, stimulus fading, time delay).',
        keyConcepts: ['Prompt Hierarchy', 'Most-to-Least', 'Least-to-Most', 'Stimulus Fading', 'Time Delay', 'Errorless Learning'],
        examWeightPercentage: 2.5,
      },
      {
        id: 'C-08',
        domainId: 'C',
        title: 'C.8. Implement generalization procedures',
        description: 'Implement generalization procedures (e.g., conduct intervention procedures across settings, people, and stimuli).',
        keyConcepts: ['Setting Generalization', 'People Generalization', 'Stimulus Generalization', 'Multiple Exemplars'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'C-09',
        domainId: 'C',
        title: 'C.9. Distinguish between maintenance and acquisition procedures',
        description: 'Distinguish between maintenance and acquisition procedures, ensuring mastered skills are intermittently reinforced over time.',
        keyConcepts: ['Skill Acquisition Phase', 'Skill Maintenance', 'Mastery Criteria', 'Intermittent Reinforcement'],
        examWeightPercentage: 1.5,
      },
      {
        id: 'C-10',
        domainId: 'C',
        title: 'C.10. Implement shaping procedures',
        description: 'Implement shaping procedures by differentially reinforcing successive approximations toward a terminal target behavior.',
        keyConcepts: ['Shaping', 'Successive Approximations', 'Differential Reinforcement', 'Terminal Behavior'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'C-11',
        domainId: 'C',
        title: 'C.11. Implement token economies',
        description: 'Implement token economies using conditioned backup reinforcers, clear exchange ratios, and structured reinforcement schedules.',
        keyConcepts: ['Token Economy', 'Conditioned Generalized Reinforcers', 'Backup Reinforcers', 'Exchange Schedule'],
        examWeightPercentage: 2.0,
      },
    ],
  },
  {
    id: 'D',
    name: 'Behavior Reduction',
    shortName: 'Behavior Reduction',
    description: 'Identify common functions of behavior, implement antecedent interventions, differential reinforcement procedures, extinction, positive/negative punishment, describe secondary effects of extinction and punishment, and implement crisis/emergency procedures.',
    iconName: 'ShieldAlert',
    questionCountApprox: 14,
    weightPercentage: 19,
    items: [
      {
        id: 'D-01',
        domainId: 'D',
        title: 'D.1. Identify common functions of behavior',
        description: 'Identify common functions of behavior: sensory/automatic, escape/avoidance, attention, and tangible access (SEAT).',
        keyConcepts: ['Sensory / Automatic', 'Escape / Avoidance', 'Attention', 'Tangible Access (SEAT)'],
        examWeightPercentage: 3.5,
      },
      {
        id: 'D-02',
        domainId: 'D',
        title: 'D.2. Implement antecedent interventions',
        description: 'Implement antecedent interventions (e.g., non-contingent reinforcement [NCR], high-probability request sequences, demand fading, environmental modifications).',
        keyConcepts: ['Non-Contingent Reinforcement (NCR)', 'High-P Request Sequence', 'Demand Fading', 'Motivating Operations (MO)'],
        examWeightPercentage: 3.0,
      },
      {
        id: 'D-03',
        domainId: 'D',
        title: 'D.3. Implement differential reinforcement procedures',
        description: 'Implement differential reinforcement procedures (e.g., DRO, DRA, DRI, DRL, functional communication training [FCT]).',
        keyConcepts: ['DRA (Alternative Behavior)', 'DRO (Other Behavior)', 'DRI (Incompatible Behavior)', 'DRL (Low Rates)', 'FCT'],
        examWeightPercentage: 3.5,
      },
      {
        id: 'D-04',
        domainId: 'D',
        title: 'D.4. Implement extinction procedures',
        description: 'Implement extinction procedures by withholding the maintaining reinforcer for a previously reinforced behavior.',
        keyConcepts: ['Extinction', 'Withholding Reinforcement', 'Function-Matched Extinction', 'Sensory / Escape / Attention Extinction'],
        examWeightPercentage: 2.5,
      },
      {
        id: 'D-05',
        domainId: 'D',
        title: 'D.5. Implement positive and negative punishment procedures',
        description: 'Implement positive and negative punishment procedures (e.g., time-out from positive reinforcement, response cost) only per BCBA behavior plan.',
        keyConcepts: ['Positive Punishment', 'Negative Punishment', 'Time-Out from Positive Reinforcement', 'Response Cost'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'D-06',
        domainId: 'D',
        title: 'D.6. Describe secondary effects of extinction and punishment',
        description: 'Describe secondary effects of extinction (e.g., extinction burst, response variation, resurgence, emotional responding) and punishment (e.g., emotional responses, escape and avoidance).',
        keyConcepts: ['Extinction Burst', 'Spontaneous Recovery', 'Response Variation', 'Emotional Responding', 'Punishment Side Effects'],
        examWeightPercentage: 2.5,
      },
      {
        id: 'D-07',
        domainId: 'D',
        title: 'D.7. Implement crisis/emergency procedures',
        description: 'Implement crisis and emergency procedures according to protocol, safety guidelines, and client dignity requirements.',
        keyConcepts: ['Crisis De-escalation', 'Emergency Protocols', 'Client Dignity & Safety', 'Incident Documentation'],
        examWeightPercentage: 2.0,
      },
    ],
  },
  {
    id: 'E',
    name: 'Documentation and Reporting',
    shortName: 'Documentation',
    description: 'Communicate concerns from intervention team, seek clinical direction from supervisor, report variables affecting client progress, and communicate objectively in accordance with legal and regulatory standards.',
    iconName: 'FileText',
    questionCountApprox: 10,
    weightPercentage: 13,
    items: [
      {
        id: 'E-01',
        domainId: 'E',
        title: 'E.1. Communicate concerns and suggestions from intervention team',
        description: 'Communicate concerns and suggestions from the intervention team (e.g., caregivers, teachers, service providers) with a supervisor in a timely manner.',
        keyConcepts: ['Caregiver Communication', 'Team Suggestions', 'Timely Escalation to Supervisor', 'Chain of Command'],
        examWeightPercentage: 3.0,
      },
      {
        id: 'E-02',
        domainId: 'E',
        title: 'E.2. Seek and prioritize clinical direction from supervisor',
        description: 'Seek and prioritize clinical direction from a supervisor in a timely manner (e.g., training needs, data irregularities, following chain of command).',
        keyConcepts: ['Seeking Clinical Direction', 'Data Irregularities', 'Training Needs', 'Clinical Prioritization'],
        examWeightPercentage: 3.0,
      },
      {
        id: 'E-03',
        domainId: 'E',
        title: 'E.3. Report/document variables that might affect client progress',
        description: 'Report/document variables that might affect client progress in a timely manner (e.g., illness, medication changes, schedule disruptions, sleep changes).',
        keyConcepts: ['Setting Events', 'Environmental Variables', 'Medication Changes', 'Illness Documentation'],
        examWeightPercentage: 3.5,
      },
      {
        id: 'E-04',
        domainId: 'E',
        title: 'E.4. Communicate objectively what occurred during session',
        description: 'Communicate objectively what occurred during the session in accordance with applicable legal, regulatory, and workplace requirements.',
        keyConcepts: ['Objective Session Notes', 'Observable Facts', 'Legal & Regulatory Compliance', 'HIPAA / Data Privacy'],
        examWeightPercentage: 3.5,
      },
    ],
  },
  {
    id: 'F',
    name: 'Ethics',
    shortName: 'Ethics',
    description: 'Adhere to the BACB ethics code for RBT certificants, maintain competence, service only under qualified supervision, identify effective supervision practices, protect confidential info, comply with public statements rules, avoid multiple relationships, adhere to gift guidelines, demonstrate professional skills, and engage in cultural humility.',
    iconName: 'UserCheck',
    questionCountApprox: 11,
    weightPercentage: 15,
    items: [
      {
        id: 'F-01',
        domainId: 'F',
        title: 'F.1. Identify and apply core principles of the BACB ethics code',
        description: 'Identify and apply core principles underlying the BACB’s ethics code for RBT certificants (e.g., benefit others; treat others with compassion, dignity, and respect; behave with integrity).',
        keyConcepts: ['Benefiting Others', 'Compassion, Dignity, & Respect', 'Integrity', 'RBT Ethics Code 2.0'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'F-02',
        domainId: 'F',
        title: 'F.2. Provide services only after demonstrating competence',
        description: 'Provide behavioral technician services only after demonstrating competence in the specific protocols and procedures.',
        keyConcepts: ['Competence Demonstration', 'Scope of Practice', 'Supervised Training', 'Client Safety'],
        examWeightPercentage: 1.5,
      },
      {
        id: 'F-03',
        domainId: 'F',
        title: 'F.3. Provide services only under ongoing qualified supervision',
        description: 'Provide services only under ongoing supervision from supervisors who meet BACB requirements (minimum 5% monthly hours).',
        keyConcepts: ['5% Monthly Supervision Requirement', 'Qualified Supervisor Criteria', 'Ongoing Oversight'],
        examWeightPercentage: 2.0,
      },
      {
        id: 'F-04',
        domainId: 'F',
        title: 'F.4. Identify effective supervision practices',
        description: 'Identify effective supervision practices (e.g., receive training that includes instructions, modeling, rehearsal, and feedback; observation of RBT service delivery).',
        keyConcepts: ['Behavioral Skills Training (BST)', 'Instruction & Modeling', 'Rehearsal & Performance Feedback', 'Direct Observation'],
        examWeightPercentage: 1.5,
      },
      {
        id: 'F-05',
        domainId: 'F',
        title: 'F.5. Comply with requirements for confidential information',
        description: 'Identify and comply with requirements for collecting, using, storing, protecting, and disclosing confidential information.',
        keyConcepts: ['Confidentiality', 'HIPAA Privacy Rules', 'Secure Data Storage', 'Mandated Disclosure Limits'],
        examWeightPercentage: 1.5,
      },
      {
        id: 'F-06',
        domainId: 'F',
        title: 'F.6. Comply with requirements for public statements',
        description: 'Identify and comply with requirements for making public statements about professional activities (e.g., social media activity, client privacy, misrepresentation of credentials).',
        keyConcepts: ['Social Media Guidelines', 'No Client Photos/Identifying Info', 'Accurate Credential Representation'],
        examWeightPercentage: 1.0,
      },
      {
        id: 'F-07',
        domainId: 'F',
        title: 'F.7. Identify types and risks of multiple relationships',
        description: 'Identify types of and risks associated with multiple relationships, and how to mitigate those risks when they are unavoidable.',
        keyConcepts: ['Multiple / Dual Relationships', 'Conflict of Interest', 'Boundary Violations', 'Risk Mitigation'],
        examWeightPercentage: 1.5,
      },
      {
        id: 'F-08',
        domainId: 'F',
        title: 'F.8. Adhere to gift giving and receiving guidelines',
        description: 'Adhere to the gift giving and receiving guidelines provided by the BACB’s ethics code for RBT certificants (no gifts exceeding established nominal limits, avoiding conflicts of interest).',
        keyConcepts: ['Zero / Nominal Gift Guidelines', 'Preventing Conflicts of Interest', 'Polite Refusal Scripts'],
        examWeightPercentage: 1.0,
      },
      {
        id: 'F-09',
        domainId: 'F',
        title: 'F.9. Apply interpersonal and professional skills',
        description: 'Identify and apply interpersonal and professional skills (e.g., accepting feedback non-defensively, active listening, collaborating) when representing oneself as an RBT.',
        keyConcepts: ['Accepting Feedback', 'Non-Defensive Response', 'Collaboration', 'Active Listening'],
        examWeightPercentage: 1.5,
      },
      {
        id: 'F-10',
        domainId: 'F',
        title: 'F.10. Engage in ongoing cultural humility and responsiveness',
        description: 'Engage in ongoing cultural humility and responsiveness (e.g., identify personal biases, respect client cultural backgrounds) in service delivery and professional relationships.',
        keyConcepts: ['Cultural Humility', 'Personal Bias Awareness', 'Responsive Service Delivery', 'Respect for Family Values'],
        examWeightPercentage: 1.5,
      },
    ],
  },
];

// Production active task list export (3rd Edition TCO)
export const BACB_TASK_LIST = BACB_TASK_LIST_3RD_EDITION;

// Legacy registry preserved for backward-compatibility lookup of historical student data
export const BACB_TASK_LIST_2ND_EDITION: BACBDomain[] = [
  ...BACB_TASK_LIST_3RD_EDITION,
];

/**
 * Returns the active production BACB Task List (3rd Edition by default)
 */
export function getBACBTaskList(version: '3rd_edition' | '2nd_edition' = '3rd_edition'): BACBDomain[] {
  if (version === '2nd_edition') {
    return BACB_TASK_LIST_2ND_EDITION;
  }
  return BACB_TASK_LIST_3RD_EDITION;
}

/**
 * Finds a specific task item code across active or legacy task list registries.
 * Supports flexible formats: 'A.1', 'A-01', 'A-1', 'a.1', etc.
 */
export function getBACBTaskItem(taskCode: string, version: '3rd_edition' | '2nd_edition' = '3rd_edition') {
  if (!taskCode) return undefined;
  const taskList = getBACBTaskList(version);
  const normalized = taskCode.trim().toLowerCase().replace(/[\.\s_-]/g, '');

  return taskList.flatMap((d) => d.items).find((item) => {
    const itemNorm = item.id.toLowerCase().replace(/[\.\s_-]/g, '');
    const titleNorm = item.title.toLowerCase().replace(/[\.\s_-]/g, '');
    return itemNorm === normalized || titleNorm.startsWith(normalized);
  });
}
