import {
  Flashcard,
  FlashcardFilterParams,
  FlashcardPaginationResult,
  SpacedRepetitionState,
  LearningMode,
} from '@/types/flashcard';
import { createInitialCardState, calculateNextSpacedRepetition } from './spaced-repetition-engine';
import { MASTER_QUESTION_BANK } from './master-question-bank';
import { getSupabaseAdminClient, isSupabaseConfigured } from '@/lib/supabase';

// Master Flashcard Seed Bank with RBT, BCaBA, and BCBA items
export const MASTER_FLASHCARDS: Flashcard[] = [
  // --- RBT FOUNDATIONAL DECK ---
  {
    id: 'fc-rbt-001',
    title: 'Continuous Measurement: Duration',
    front: 'What is Duration recording in ABA data collection?',
    back: 'Duration recording measures the TOTAL amount of time from the onset of a target behavior to its cessation.',
    cardType: 'basic',
    explanation: 'Duration is used when measuring how long a behavior lasts (e.g. length of a tantrum, time spent engaging in play).',
    clinicalExplanation: 'Duration recording requires a start and stop timestamp. In clinical trial data collection, it is reported as total minutes/seconds or as a percentage of total session time.',
    memoryTip: 'Mnemonic: "Duration = Duration of time from Start to Finish."',
    realLifeExample: 'Tracking that a child engaged in hand-washing for 25 seconds.',
    commonMistakes: 'Confusing duration with latency (latency measures time from SD to start).',
    reference: 'BACB RBT 3rd Edition TCO Item A-02',
    certification: 'RBT',
    category: 'Data Collection and Graphing',
    subcategory: 'Continuous Measurement',
    difficulty: 'easy',
    keywords: ['Duration', 'Continuous Measurement', 'Data Collection'],
    tags: ['Measurement', 'RBT Core', 'High Weight'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'fc-rbt-002',
    title: 'Discontinuous Measurement: Partial Interval',
    front: 'How is Partial Interval Recording scored during an observation window?',
    back: 'Partial Interval Recording scores a positive (+) occurrence if the target behavior happens at ANY MOMENT during the interval.',
    cardType: 'definition',
    explanation: 'Partial Interval Recording does NOT require the behavior to persist throughout the entire window.',
    clinicalExplanation: 'Partial Interval Recording tends to OVERESTIMATE the true frequency of behavior. It is frequently used for behavior reduction targets (e.g. vocal outbursts).',
    memoryTip: 'Mnemonic: "PARTial = ANY PART of the interval counts."',
    realLifeExample: 'If a client screams for 1 second during a 10-minute interval, mark (+).',
    commonMistakes: 'Confusing Partial Interval with Whole Interval (Whole Interval requires behavior for the ENTIRE interval).',
    reference: 'BACB RBT 3rd Edition TCO Item A-03',
    certification: 'RBT',
    category: 'Data Collection and Graphing',
    subcategory: 'Discontinuous Measurement',
    difficulty: 'medium',
    keywords: ['Partial Interval', 'Discontinuous Measurement', 'Overestimate'],
    tags: ['Measurement', 'Discontinuous'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T11:00:00.000Z',
    updatedAt: '2026-08-01T11:00:00.000Z',
  },
  {
    id: 'fc-rbt-003',
    title: 'Differential Reinforcement: DRO',
    front: 'What does DRO (Differential Reinforcement of Other Behavior) reinforce?',
    back: 'DRO delivers reinforcement contingent on the ZERO occurrence (omission) of the target behavior for a specified time window.',
    cardType: 'scenario',
    explanation: 'DRO reinforces the absence of the problem behavior. Reinforcement is delivered if the client did NOT engage in the behavior.',
    clinicalExplanation: 'DRO = Differential Reinforcement of Omission / Other behavior. A timer is set; if no target behavior occurs during the timer window, reinforcer is delivered.',
    memoryTip: 'Mnemonic: "DRO = ZERO instances of behavior."',
    realLifeExample: 'Giving a sticker every 5 minutes if the child does NOT hit.',
    commonMistakes: 'Reinforcing another problem behavior that occurs during the window. Ensure replacement behaviors are taught.',
    reference: 'BACB RBT 3rd Edition TCO Item D-04',
    certification: 'RBT',
    category: 'Behavior Reduction',
    subcategory: 'Differential Reinforcement',
    difficulty: 'hard',
    keywords: ['DRO', 'Omission', 'Differential Reinforcement'],
    tags: ['Behavior Reduction', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-02T09:00:00.000Z',
    updatedAt: '2026-08-02T09:00:00.000Z',
  },

  // --- BCBA ADVANCED MASTERY DECK ---
  {
    id: 'fc-bcba-001',
    title: 'Functional Analysis: Analog Conditions (Iwata)',
    front: 'What are the 4 standard analog conditions in an Iwata-style Functional Analysis (FA)?',
    back: '1. Attention (Social Positive)\n2. Demand / Escape (Social Negative)\n3. Alone / No Interaction (Automatic Reinforcement)\n4. Play / Control (Enriched Environment Baseline)',
    cardType: 'definition',
    explanation: 'Functional analysis experimentally manipulates environmental conditions to identify the maintaining functional variable of problem behavior.',
    clinicalExplanation: 'In the Attention condition, brief contingent verbal attention is provided. In Demand, 3-step prompting with 30s task removal contingent on target behavior. In Alone, client is in barren room without materials. In Play, continuous access to preferred items and attention is freely available with zero demands.',
    memoryTip: 'Mnemonic: "ADAP = Attention, Demand, Alone, Play."',
    realLifeExample: 'Observing aggression spikes exclusively in Demand sessions confirms an escape function.',
    commonMistakes: 'Confusing descriptive ABC data collection with experimental analog FA manipulation.',
    reference: 'BACB 5th/6th Edition Test Content Outline F-8',
    certification: 'BCBA',
    category: 'Behavior Assessment',
    subcategory: 'Functional Analysis',
    difficulty: 'hard',
    keywords: ['Functional Analysis', 'Iwata', 'Analog Conditions', 'Escape', 'Automatic'],
    tags: ['BCBA Core', 'Assessment', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T10:00:00.000Z',
    updatedAt: '2026-08-05T10:00:00.000Z',
  },
  {
    id: 'fc-bcba-002',
    title: 'Conditioned Motivating Operations: CMO-R vs CMO-T vs CMO-S',
    front: 'Distinguish between Reflexive (CMO-R), Transitive (CMO-T), and Surrogate (CMO-S) Motivating Operations.',
    back: '• CMO-R (Reflexive): A warning stimulus establishing its own removal/escape as reinforcing (e.g. task demands).\n• CMO-T (Transitive): Establishes another stimulus/tool as a conditioned reinforcer to access something else (e.g. locked box establishes key).\n• CMO-S (Surrogate): Paired with an unconditioned MO, taking on the same value-altering effects (e.g. clock showing 12:00 establishing lunch appetite).',
    cardType: 'definition',
    explanation: 'CMOs are environmental variables that alter the reinforcing effectiveness of other stimuli and alter the frequency of behavior.',
    clinicalExplanation: 'CMO-R warning signal creates aversion; CMO-T creates a problem-solving state requiring an intermediary stimulus; CMO-S is temporal/spatial pairing.',
    memoryTip: 'Mnemonic: "R = Run away/Removal; T = Tool/Thing needed; S = Stimulus Pairing/Substitute."',
    realLifeExample: 'Seeing your boss with a clipboard (CMO-R) evokes avoidance behaviors.',
    commonMistakes: 'Confusing SD with MO: SD signals availability of reinforcement, MO alters value and effectiveness.',
    reference: 'BACB 5th/6th Edition Task List B-12',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Motivating Operations',
    difficulty: 'hard',
    keywords: ['CMO-R', 'CMO-T', 'CMO-S', 'Motivating Operations', 'Establishing Operation'],
    tags: ['BCBA Core', 'Concepts and Principles'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T11:00:00.000Z',
    updatedAt: '2026-08-05T11:00:00.000Z',
  },
  {
    id: 'fc-bcba-003',
    title: 'Single-Case Experimental Designs: Internal Validity',
    front: 'When is an Alternating Treatments Design (Multielement) preferable over an A-B-A-B Reversal Design?',
    back: 'Alternating Treatments is preferable when:\n1. The target behavior is IRREVERSIBLE (e.g. learned academic skills/reading).\n2. Withdrawing treatment is UNETHICAL (e.g. severe self-injurious behavior SIB).\n3. Rapidly comparing 2 or more distinct interventions without a baseline return.',
    cardType: 'scenario',
    explanation: 'Alternating Treatments allows rapid comparison of conditions in rapid succession, controlling for sequence effects through counterbalancing.',
    clinicalExplanation: 'Reversal requires return to baseline to demonstrate experimental control. Alternating Treatments demonstrates control via vertical divergence between data paths.',
    memoryTip: 'Mnemonic: "Multi = Multi-treatments without Reversing."',
    realLifeExample: 'Comparing DRA vs DRO in morning vs afternoon sessions for aggression.',
    commonMistakes: 'Using reversal designs for aggression with high physical injury risk.',
    reference: 'BACB 5th/6th Edition Task List D-2',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Experimental Design',
    difficulty: 'hard',
    keywords: ['Alternating Treatments', 'Reversal Design', 'Internal Validity', 'Experimental Control'],
    tags: ['BCBA Core', 'Experimental Design'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T12:00:00.000Z',
    updatedAt: '2026-08-05T12:00:00.000Z',
  },
  {
    id: 'fc-bcba-004',
    title: 'Staff Training: Behavioral Skills Training (BST)',
    front: 'What are the 4 chronological steps of Behavioral Skills Training (BST) for staff supervision?',
    back: '1. Instructions (Clear verbal/written rationale and procedural steps)\n2. Modeling (Demonstration of the skill by supervisor/trainer)\n3. Rehearsal (Role-play or in-situ practice by trainee)\n4. Feedback (Immediate positive praise + corrective guidance)',
    cardType: 'basic',
    explanation: 'BST is the gold standard evidence-based training model for BCBA supervision of RBTs and clinical staff.',
    clinicalExplanation: 'Training is not complete until the supervisee achieves 100% fidelity criterion in the rehearsal step across multiple roleplay or direct client scenarios.',
    memoryTip: 'Mnemonic: "IMRF = Tell (Instructions), Show (Model), Try (Rehearse), Coach (Feedback)."',
    realLifeExample: 'Training an RBT on implementing a 3-step prompt hierarchy using BST before client contact.',
    commonMistakes: 'Relying solely on verbal instructions or manuals without live modeling and rehearsal.',
    reference: 'BACB 5th/6th Edition Task List I-4',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Personnel Supervision and Management',
    difficulty: 'medium',
    keywords: ['BST', 'Behavioral Skills Training', 'Supervision', 'Staff Training'],
    tags: ['BCBA Core', 'Supervision'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T13:00:00.000Z',
    updatedAt: '2026-08-05T13:00:00.000Z',
  },
  {
    id: 'fc-bcba-005',
    title: 'Matching Law & Concurrent Schedules',
    front: 'State Herrnstein’s Matching Law and its clinical application to behavior reduction.',
    back: 'Matching Law states that the relative rate of responding matches the relative rate of reinforcement delivered by concurrent schedules:\n(B1 / (B1 + B2)) = (R1 / (R1 + R2))\n\nClinical Application: To decrease problem behavior (B1), enrich reinforcement rate, immediacy, quality, and magnitude for appropriate replacement behavior (B2).',
    cardType: 'definition',
    explanation: 'Organisms distribute responses proportionally to the reinforcement obtained from each alternative.',
    clinicalExplanation: 'If biting gets reinforced 80% of the time and requesting gets reinforced 20%, the client will allocate 80% of responses to biting. Shifting the schedule density shifts responding.',
    memoryTip: 'Mnemonic: "Matching = Behavior matches Reinforcement proportion."',
    realLifeExample: 'Making FCT requests produce instant high-potency snacks while problem behavior is placed on extinction.',
    commonMistakes: 'Ignoring reinforcement parameters like latency, magnitude, and response effort.',
    reference: 'BACB 5th/6th Edition Task List B-5',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Concurrent Schedules',
    difficulty: 'hard',
    keywords: ['Matching Law', 'Herrnstein', 'Concurrent Schedules', 'Reinforcement Rate'],
    tags: ['BCBA Core', 'Quantitative ABA'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-05T14:00:00.000Z',
    updatedAt: '2026-08-05T14:00:00.000Z',
  },

  // --- BCBA ADVANCED MASTERY DECK (EXTENSIVE EXAM PREP) ---
  {
    id: 'fc-bcba-006',
    title: 'Stimulus Equivalence: Reflexivity, Symmetry, Transitivity',
    front: 'Define the 3 untaught relations required to demonstrate Stimulus Equivalence (Sidman).',
    back: '1. Reflexivity (Generalized Identity Matching): A = A (Matches picture of dog to identical picture of dog without training).\n2. Symmetry (Reversibility of Sample and Comparison): If A = B is taught, B = A emerges untaught (Taught spoken word "Dog" [A] → picture [B]; client spontaneously hears "Dog" [B] and selects word [A]).\n3. Transitivity (Derived Emergence): If A = B and B = C are taught, A = C and C = A emerge without direct training (Spoken "Dog" [A] → Picture [B]; Picture [B] → Written "DOG" [C]; client spontaneously matches Spoken [A] → Written [C]).',
    cardType: 'definition',
    explanation: 'Stimulus equivalence produces emergent symbolic learning and derived relational responding without direct conditioning for every individual pair.',
    clinicalExplanation: 'Demonstrating equivalence requires testing transitivity (the critical emergent relation) without reinforcement during probe trials.',
    memoryTip: 'Mnemonic: "RST = Reflexive (Self A=A), Symmetric (Reverse A=B→B=A), Transitive (Bridge A=B + B=C → A=C)."',
    realLifeExample: 'Teaching reading comprehension where matching spoken word to picture and picture to printed text allows reading printed text aloud spontaneously.',
    commonMistakes: 'Reinforcing probe test trials during equivalence testing, which invalidates the emergence of untaught responding.',
    reference: 'BACB 5th/6th Edition Task List B-15',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Stimulus Equivalence',
    difficulty: 'hard',
    keywords: ['Stimulus Equivalence', 'Reflexivity', 'Symmetry', 'Transitivity', 'Sidman'],
    tags: ['BCBA Core', 'Skill Acquisition', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T10:00:00.000Z',
    updatedAt: '2026-08-07T10:00:00.000Z',
  },
  {
    id: 'fc-bcba-007',
    title: 'Radical vs Methodological Behaviorism',
    front: 'How does Skinnerian Radical Behaviorism treat "Private Events" (thoughts/feelings) compared to Methodological Behaviorism?',
    back: '• Methodological Behaviorism (Watson): Rejects private events from psychological science because they cannot be publicly observed or measured by outside observers.\n• Radical Behaviorism (Skinner): Acknowledges private events (thinking, feeling, pain) as true BEHAVIOR subject to the exact same natural laws and principles (operant and respondent conditioning) as public behavior, differing only in its accessibility (under the skin).',
    cardType: 'definition',
    explanation: 'Radical behaviorism does not consider private events to be mentalistic causes of behavior, but rather behaviors in need of explanation.',
    clinicalExplanation: 'Skinner rejected mentalistic fictions (e.g. "he acted out because he has low self-esteem") while fully analyzing covert verbal self-talk and physiological states as behavior.',
    memoryTip: 'Mnemonic: "Radical = Includes Root (private + public under natural law); Methodological = Only Method-observable (public only)."',
    realLifeExample: 'Analyzing a client saying "I feel anxious" as a verbal tact of internal physiological private stimuli rather than an uncaused mental state.',
    commonMistakes: 'Believing that behavior analysts ignore emotions or deny the existence of internal thoughts.',
    reference: 'BACB 5th/6th Edition Task List A-4',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Philosophical Underpinnings',
    difficulty: 'hard',
    keywords: ['Radical Behaviorism', 'Methodological Behaviorism', 'Skinner', 'Private Events'],
    tags: ['BCBA Core', 'Foundations'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T11:00:00.000Z',
    updatedAt: '2026-08-07T11:00:00.000Z',
  },
  {
    id: 'fc-bcba-008',
    title: 'The 7 Dimensions of ABA (Baer, Wolf, & Risley, 1968)',
    front: 'List and define the 7 defining dimensions of Applied Behavior Analysis (BATCAGE).',
    back: '1. Behavioral: Precise measurement of observable, measurable target behavior in need of improvement.\n2. Applied: Focuses on socially significant behaviors that immediately enhance the client’s life.\n3. Technological: Procedures are written with sufficient detail and clarity for any reader to replicate with high fidelity.\n4. Conceptually Systematic: Interventions are derived directly from established basic principles of ABA (reinforcement, punishment, extinction).\n5. Analytic: Demonstrates experimental control over the occurrence/nonoccurrence of behavior (functional relation).\n6. Generality: Behavior change persists over time, across novel environments, and spreads to other related behaviors.\n7. Effective: Interventions improve behavior to a practical, clinically meaningful degree.',
    cardType: 'definition',
    explanation: 'These 7 foundational dimensions define whether an intervention or research study qualifies as genuine Applied Behavior Analysis.',
    clinicalExplanation: 'A behavior plan that works well but is based on non-ABA pseudo-science fails the Conceptually Systematic dimension.',
    memoryTip: 'Mnemonic: "BATCAGE = Behavioral, Applied, Technological, Conceptually Systematic, Analytic, Generality, Effective."',
    realLifeExample: 'Writing a task analysis so clearly that a new RBT implements it with 100% fidelity on day one (Technological).',
    commonMistakes: 'Confusing "Effective" (clinical/practical significance) with "Analytic" (experimental demonstration of functional relation).',
    reference: 'BACB 5th/6th Edition Task List A-5',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Philosophical Underpinnings',
    difficulty: 'medium',
    keywords: ['7 Dimensions', 'BATCAGE', 'Baer Wolf Risley', 'Technological', 'Analytic'],
    tags: ['BCBA Core', 'Foundations', 'High Weight'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T12:00:00.000Z',
    updatedAt: '2026-08-07T12:00:00.000Z',
  },
  {
    id: 'fc-bcba-009',
    title: 'Interobserver Agreement (IOA): Calculation Formulas',
    front: 'State the formulas for Total Count IOA, Mean Count-Per-Interval IOA, and Exact Count-Per-Interval IOA.',
    back: '• Total Count IOA = (Smaller Count / Larger Count) × 100%\n• Mean Count-Per-Interval IOA = [Sum of (Interval IOAs: Smallest / Largest)] / Total Number of Intervals × 100%\n• Exact Count-Per-Interval IOA = (Number of Intervals with Exact 100% Agreement / Total Number of Intervals) × 100%',
    cardType: 'definition',
    explanation: 'IOA measures the degree to which two independent observers report the exact same data values for the same target events.',
    clinicalExplanation: 'Exact Count-Per-Interval IOA is the most stringent continuous IOA metric. Total Count IOA is the simplest but can mask severe interval disagreements.',
    memoryTip: 'Mnemonic: "Total = Simple Fraction; Mean = Average of intervals; Exact = Only Perfect Matches count."',
    realLifeExample: 'Observer 1 counts 10, Observer 2 counts 12 → Total Count IOA = (10/12) * 100 = 83.3%.',
    commonMistakes: 'Assuming 80%+ Total Count IOA guarantees high accuracy throughout individual session intervals.',
    reference: 'BACB 5th/6th Edition Task List C-8',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Interobserver Agreement',
    difficulty: 'hard',
    keywords: ['IOA', 'Total Count IOA', 'Mean Count IOA', 'Exact Count IOA', 'Measurement Fidelity'],
    tags: ['BCBA Core', 'Measurement', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T13:00:00.000Z',
    updatedAt: '2026-08-07T13:00:00.000Z',
  },
  {
    id: 'fc-bcba-010',
    title: 'Discontinuous IOA: Scored vs Unscored Interval IOA',
    front: 'When is Scored-Interval IOA used vs Unscored-Interval IOA for discontinuous interval recording?',
    back: '• Scored-Interval IOA: Recommended for LOW-RATE behaviors (occurring in <30% of intervals). Only intervals where at least one observer scored a (+) are included in the calculation.\n• Unscored-Interval IOA: Recommended for HIGH-RATE behaviors (occurring in >70% of intervals). Only intervals where at least one observer scored a (-) non-occurrence are included in the calculation.',
    cardType: 'definition',
    explanation: 'Scored and Unscored IOA control for inflated agreement caused by chance agreements on non-occurrences (in low-rate behavior) or occurrences (in high-rate behavior).',
    clinicalExplanation: 'Formula: (Agreements on Scored / [Agreements on Scored + Disagreements]) × 100%.',
    memoryTip: 'Mnemonic: "Scored for Low Rate (Catch rare hits); Unscored for High Rate (Catch rare misses)."',
    realLifeExample: 'For a severe aggression episode that only happens twice in a 60-interval session, calculate Scored-Interval IOA to avoid falsely high 96% interval agreement.',
    commonMistakes: 'Using interval-by-interval IOA for low-rate behavior, which artificially inflates agreement.',
    reference: 'BACB 5th/6th Edition Task List C-8',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Interobserver Agreement',
    difficulty: 'hard',
    keywords: ['Scored Interval IOA', 'Unscored Interval IOA', 'Low-Rate Behavior', 'High-Rate Behavior'],
    tags: ['BCBA Core', 'Measurement'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T14:00:00.000Z',
    updatedAt: '2026-08-07T14:00:00.000Z',
  },
  {
    id: 'fc-bcba-011',
    title: 'Multiple Baseline Design: Logic & Verification',
    front: 'How is Experimental Control demonstrated in a Multiple Baseline Design without treatment withdrawal?',
    back: 'Experimental control is demonstrated when a target behavior changes ONLY when the intervention is systematically introduced, while the remaining baselines in untreated tiers (across subjects, behaviors, or settings) maintain a stable, unchanged baseline level.',
    cardType: 'definition',
    explanation: 'Multiple baseline design staggers the introduction of the independent variable across 3 or more tiers.',
    clinicalExplanation: 'If treatment is applied to Tier 1 and Tier 2 immediately changes before treatment is introduced, generalization or history confounds experimental control.',
    memoryTip: 'Mnemonic: "Multiple Baseline = Staggered Start, Steady Baselines."',
    realLifeExample: 'Implementing a token economy for on-task behavior first in Math class, then Reading class 2 weeks later, then Science class 4 weeks later.',
    commonMistakes: 'Introducing the intervention simultaneously across all tiers, eliminating the baseline comparison.',
    reference: 'BACB 5th/6th Edition Task List D-3',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Experimental Design',
    difficulty: 'medium',
    keywords: ['Multiple Baseline', 'Experimental Control', 'Staggered Baseline', 'Tiers'],
    tags: ['BCBA Core', 'Experimental Design', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T15:00:00.000Z',
    updatedAt: '2026-08-07T15:00:00.000Z',
  },
  {
    id: 'fc-bcba-012',
    title: 'Changing Criterion Design: Requirements & Verification',
    front: 'What features must be incorporated in a Changing Criterion Design to demonstrate robust experimental control?',
    back: '1. Gradual, stepwise criterion shifts matching learner capability.\n2. Variable phase lengths (some shorter, some longer) to rule out maturation/history.\n3. Different step magnitudes (unequal shifts in criterion).\n4. At least one BIDIRECTIONAL REVERSAL (briefly returning to a previous criterion step to confirm behavior follows the criterion exactly).',
    cardType: 'scenario',
    explanation: 'Changing criterion designs are best for stepwise, continuous behavior acquisition or reduction (e.g. daily steps walked, smoking reduction).',
    clinicalExplanation: 'If behavior closely matches each stepwise goal across 3+ criteria and drops when a lower criterion is introduced, functional control is confirmed.',
    memoryTip: 'Mnemonic: "Step-by-Step with a Reverse Step to Prove Control."',
    realLifeExample: 'Decreasing daily cups of coffee: Step 1 (5 cups), Step 2 (3 cups), Step 3 (4 cups reversal), Step 4 (2 cups), Step 5 (1 cup).',
    commonMistakes: 'Using changing criterion designs for discrete novelty skills (e.g. learning to ride a bike) or making criterion jumps too large.',
    reference: 'BACB 5th/6th Edition Task List D-4',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Experimental Design',
    difficulty: 'hard',
    keywords: ['Changing Criterion', 'Bidirectional Change', 'Experimental Verification', 'Stepwise Target'],
    tags: ['BCBA Core', 'Experimental Design'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T16:00:00.000Z',
    updatedAt: '2026-08-07T16:00:00.000Z',
  },
  {
    id: 'fc-bcba-013',
    title: 'Component Analysis vs Parametric Analysis',
    front: 'Distinguish between a Component Analysis and a Parametric Analysis.',
    back: '• Component Analysis: Systematically withdrawing/adding individual parts of a treatment package to determine which specific active components are necessary and effective (e.g. testing Token Economy WITH vs WITHOUT response cost).\n• Parametric Analysis: Systematically manipulating different DOSAGES or PARAMETERS of a single independent variable to find the most effective value (e.g. testing 5mg vs 10mg vs 20mg medication, or 30s vs 2min vs 5min breaks).',
    cardType: 'definition',
    explanation: 'Component analysis asks "WHICH piece works?", while Parametric analysis asks "HOW MUCH of this piece works best?".',
    clinicalExplanation: 'A drop-out component analysis starts with the full package and removes one piece at a time. An add-in analysis adds components sequentially.',
    memoryTip: 'Mnemonic: "Component = Parts/Pieces of a package; Parametric = Parameters/Dose/Magnitude."',
    realLifeExample: 'Testing whether praise, stickers, or both are responsible for behavior reduction in a clinic package.',
    commonMistakes: 'Confusing parametric analysis with comparative analysis (comparative analyzes 2 totally different interventions).',
    reference: 'BACB 5th/6th Edition Task List D-5',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Experimental Design',
    difficulty: 'medium',
    keywords: ['Component Analysis', 'Parametric Analysis', 'Treatment Package', 'Dose Response'],
    tags: ['BCBA Core', 'Experimental Design'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T17:00:00.000Z',
    updatedAt: '2026-08-07T17:00:00.000Z',
  },
  {
    id: 'fc-bcba-014',
    title: 'Stimulus Generalization vs Response Generalization',
    front: 'Differentiate between Stimulus Generalization and Response Generalization with clinical examples.',
    back: '• Stimulus Generalization: The SAME response occurs in the presence of DIFFERENT antecedent stimuli/settings/people (e.g. saying "Hello" when seeing mom, teacher, or peer).\n• Response Generalization: DIFFERENT functionally equivalent responses are emitted in the presence of the SAME antecedent stimulus (e.g. seeing a friend and saying "Hi", "What\'s up", or waving).',
    cardType: 'definition',
    explanation: 'Stimulus generalization involves multiple SDs evoking 1 response; response generalization involves 1 SD evoking multiple response topographies.',
    clinicalExplanation: 'Response generalization is essential for functional communication so learners do not sound robotic with single rigid phrases.',
    memoryTip: 'Mnemonic: "Stimulus Gen = Many Stimuli → 1 Response; Response Gen = 1 Stimulus → Many Responses."',
    realLifeExample: 'Client learns to open a door with a round knob and now independently opens doors with lever handles (Stimulus Gen). Client learns to greet by waving and now also gives high-fives (Response Gen).',
    commonMistakes: 'Confusing stimulus generalization with stimulus discrimination (discrimination is responding ONLY to specific SD).',
    reference: 'BACB 5th/6th Edition Task List B-11',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Generalization and Maintenance',
    difficulty: 'medium',
    keywords: ['Stimulus Generalization', 'Response Generalization', 'Generalization', 'Topography'],
    tags: ['BCBA Core', 'Concepts and Principles', 'High Weight'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T18:00:00.000Z',
    updatedAt: '2026-08-07T18:00:00.000Z',
  },
  {
    id: 'fc-bcba-015',
    title: 'Verbal Operants: Controlling Antecedents and Consequences',
    front: 'Identify the controlling antecedent and consequence for the 4 primary Verbal Operants (Mand, Tact, Echoic, Intraverbal).',
    back: '1. Mand: Antecedent = Motivating Operation (MO / Deprivation / Aversion); Consequence = Specific Reinforcer requested.\n2. Tact: Antecedent = Non-verbal sensory stimulus (object, sound, odor); Consequence = Generalized Conditioned Reinforcement (GCSR / Praise).\n3. Echoic: Antecedent = Verbal auditory stimulus with point-to-point correspondence and formal similarity; Consequence = GCSR / Praise.\n4. Intraverbal: Antecedent = Verbal stimulus WITHOUT point-to-point correspondence; Consequence = GCSR / Praise.',
    cardType: 'definition',
    explanation: 'Skinner’s functional taxonomy classifies language according to its environmental controlling variables rather than traditional grammatical syntax.',
    clinicalExplanation: 'A mand is the only verbal operant directly controlled by an MO and maintained by specific reinforcement benefiting the speaker.',
    memoryTip: 'Mnemonic: "Mand = MO; Tact = Touch/Taste/Sight (Nonverbal); Echoic = Echo (Copy); Intraverbal = Conversation (No copy)."',
    realLifeExample: 'Saying "Water" because you are thirsty (Mand). Saying "Water" when looking at a lake (Tact). Repeating "Water" when hearing therapist say "Water" (Echoic). Saying "Fish swim in it" when asked "What is water?" (Intraverbal).',
    commonMistakes: 'Classifying a child requesting candy upon seeing candy as a pure Mand; it is a part-Tact / part-Mand (impure mand).',
    reference: 'BACB 5th/6th Edition Task List B-14',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Verbal Behavior',
    difficulty: 'hard',
    keywords: ['Verbal Operants', 'Mand', 'Tact', 'Echoic', 'Intraverbal', 'Point-to-Point Correspondence'],
    tags: ['BCBA Core', 'Verbal Behavior', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T19:00:00.000Z',
    updatedAt: '2026-08-07T19:00:00.000Z',
  },
  {
    id: 'fc-bcba-016',
    title: 'Higher-Order Verbal Operants: Autoclitics',
    front: 'What is an Autoclitic in Skinner’s Verbal Behavior, and what is its clinical function?',
    back: 'An Autoclitic is verbal behavior about the speaker’s own verbal behavior. It modifies, clarifies, quantifies, or qualifies the primary verbal operant, providing additional information to the listener (e.g. "I think", "I see", "definitely", "not").',
    cardType: 'definition',
    explanation: 'Autoclitics depend on primary verbal operants (tacts/mands) and alter the listener’s reaction to the primary statement.',
    clinicalExplanation: 'Examples:\n• Descriptive: "I see it is raining" ("I see" describes speaker\'s observation).\n• Quantifying: "All the cookies are gone" ("All" quantifies).\n• Qualifying: "I do NOT want broccoli" ("NOT" negates the mand).',
    memoryTip: 'Mnemonic: "Auto-clitic = Auto (Self) + Lean upon; verbal behavior that leans on other verbal behavior."',
    realLifeExample: 'Saying "I am pretty sure the store is open" vs "The store is open."',
    commonMistakes: 'Viewing autoclitics as simple grammar rather than functional behavioral discriminative modifiers.',
    reference: 'BACB 5th/6th Edition Task List B-14',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Verbal Behavior',
    difficulty: 'hard',
    keywords: ['Autoclitic', 'Verbal Behavior', 'Skinner', 'Listener Reaction'],
    tags: ['BCBA Core', 'Verbal Behavior'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T20:00:00.000Z',
    updatedAt: '2026-08-07T20:00:00.000Z',
  },
  {
    id: 'fc-bcba-017',
    title: 'Noncontingent Reinforcement (NCR): Mechanism of Action',
    front: 'How does Noncontingent Reinforcement (NCR) reduce problem behavior without punishment or direct extinction?',
    back: 'NCR delivers the maintaining reinforcer on a fixed-time (FT) or variable-time (VT) schedule INDEPENDENT of client behavior. It functions primarily as an ANTECEDENT INTERVENTION by creating continuous SATIATION (Abolishing Operation - AO), thereby eliminating the motivating operation (EO) to engage in problem behavior.',
    cardType: 'definition',
    explanation: 'NCR reduces the establishing value of the reinforcer and disrupts the response-reinforcer contingency.',
    clinicalExplanation: 'NCR schedules should begin at a dense baseline interval (e.g. FT 30 seconds) and gradually thin over time.',
    memoryTip: 'Mnemonic: "NCR = No Conditions Reinforcement; Satiates to Stop the Drive (AO)."',
    realLifeExample: 'Giving attention every 2 minutes noncontingently to eliminate attention-maintained vocal protests.',
    commonMistakes: 'Accidentally delivering the scheduled NCR reinforcer immediately following problem behavior, which inadvertently reinforces it (adventitious reinforcement).',
    reference: 'BACB 5th/6th Edition Task List G-1',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Antecedent Interventions',
    difficulty: 'medium',
    keywords: ['NCR', 'Noncontingent Reinforcement', 'Abolishing Operation', 'Fixed Time Schedule'],
    tags: ['BCBA Core', 'Behavior Reduction', 'High Weight'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T21:00:00.000Z',
    updatedAt: '2026-08-07T21:00:00.000Z',
  },
  {
    id: 'fc-bcba-018',
    title: 'Behavioral Momentum: High-Probability Request Sequence',
    front: 'Explain the High-Probability (High-p) Request Sequence procedure and its underlying mechanism.',
    back: 'The High-p sequence presents 2 to 5 short, easy-to-comply requests with a high history of compliance (High-p) immediately before presenting a target non-compliant request (Low-p).\n\nMechanism: Builds a rapid momentum of reinforcement and responding that carries over to reduce response latency and overcome resistance on the low-p demand.',
    cardType: 'scenario',
    explanation: 'High-p is an antecedent intervention designed to increase compliance non-aversively.',
    clinicalExplanation: 'Each high-p task must be followed by immediate enthusiastic praise/reinforcement, with brief (<5s) inter-prompt intervals before the low-p request.',
    memoryTip: 'Mnemonic: "High-p = High probability warmup before the heavy lift."',
    realLifeExample: '"High five!" (complies) → "Touch your nose!" (complies) → "Spin around!" (complies) → "Please open your math workbook." (complies).',
    commonMistakes: 'Using high-p requests that are too slow or giving the low-p command when the child is already in the middle of a tantrum.',
    reference: 'BACB 5th/6th Edition Task List G-2',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Antecedent Interventions',
    difficulty: 'easy',
    keywords: ['High-p', 'Behavioral Momentum', 'Compliance', 'Antecedent Strategy'],
    tags: ['BCBA Core', 'Skill Acquisition'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T22:00:00.000Z',
    updatedAt: '2026-08-07T22:00:00.000Z',
  },
  {
    id: 'fc-bcba-019',
    title: 'Basic Schedules of Reinforcement: Patterns of Responding',
    front: 'Describe the characteristic response patterns generated by FR, VR, FI, and VI reinforcement schedules.',
    back: '• Fixed Ratio (FR): High rate of responding with a predictable Post-Reinforcement Pause (PRP) after each reinforcement delivery (scallop-like steps).\n• Variable Ratio (VR): Highest, most consistent, steady rate of responding with ZERO post-reinforcement pause (slot machines).\n• Fixed Interval (FI): Scalloped response curve (slow responding immediately post-reinforcement, accelerating rapidly as interval end nears).\n• Variable Interval (VI): Moderate, highly stable, constant rate of responding without pauses (pop quizzes / checking email).',
    cardType: 'definition',
    explanation: 'Intermittent schedules produce distinctly different response distributions and resistances to extinction.',
    clinicalExplanation: 'VR schedules produce the highest resistance to extinction; FR schedules are susceptible to ratio strain if thinned too quickly.',
    memoryTip: 'Mnemonic: "VR = Very Rapid & Very Resistant; FI = Fishtail Scallop."',
    realLifeExample: 'Slot machine payout (VR) keeps players pulling levers constantly; weekly paycheck (FI) causes flurry of activity before Friday.',
    commonMistakes: 'Confusing Interval schedules (time-based contingent on 1st response after time) with Time schedules (FT/VT delivered regardless of response).',
    reference: 'BACB 5th/6th Edition Task List B-5',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Schedules of Reinforcement',
    difficulty: 'hard',
    keywords: ['Schedules of Reinforcement', 'Fixed Ratio', 'Variable Ratio', 'Fixed Interval', 'Variable Interval', 'PRP'],
    tags: ['BCBA Core', 'Concepts and Principles', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-07T23:00:00.000Z',
    updatedAt: '2026-08-07T23:00:00.000Z',
  },
  {
    id: 'fc-bcba-020',
    title: 'Ratio Strain vs Post-Reinforcement Pause (PRP)',
    front: 'What causes Ratio Strain and how does it differ from a normal Post-Reinforcement Pause (PRP)?',
    back: '• Post-Reinforcement Pause (PRP): A normal, temporary pause in responding that occurs naturally immediately AFTER reinforcement on fixed (FR/FI) schedules.\n• Ratio Strain: A severe breakdown in responding (prolonged pausing, avoidance, emotional outbursts, regression) caused by THINNING THE SCHEDULE OF REINFORCEMENT TOO ABRUPTLY or setting response requirements too high.',
    cardType: 'scenario',
    explanation: 'Ratio strain indicates that the reinforcement density is insufficient to support the response effort.',
    clinicalExplanation: 'To resolve ratio strain, immediately backtrack and re-establish a denser schedule of reinforcement (e.g. drop from FR20 back to FR5), then thin in smaller increments.',
    memoryTip: 'Mnemonic: "PRP = Planned Rest Period (Normal); Ratio Strain = Strained & Broken (Schedule thinned too fast)."',
    realLifeExample: 'Jumping a student from earning a token every 2 math problems (FR2) to every 20 problems (FR20), resulting in task refusal and crying.',
    commonMistakes: 'Treating ratio strain with punishment rather than restoring reinforcement density.',
    reference: 'BACB 5th/6th Edition Task List B-5',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Reinforcement Schedules',
    difficulty: 'medium',
    keywords: ['Ratio Strain', 'PRP', 'Schedule Thinning', 'Fixed Ratio'],
    tags: ['BCBA Core', 'Concepts and Principles'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T00:00:00.000Z',
    updatedAt: '2026-08-08T00:00:00.000Z',
  },
  {
    id: 'fc-bcba-021',
    title: 'Hanley’s Practical Functional Assessment (PFA / IISCA)',
    front: 'How does Hanley’s Interview-Informed Synthesized Contingency Analysis (IISCA) differ from traditional Iwata analog FA?',
    back: '• Traditional Iwata FA: Tests isolated, single-variable contingencies (Attention vs Demand vs Alone) across multiple alternating conditions.\n• Hanley IISCA: Synthesizes multiple co-occurring contingencies (e.g. Escape to Attention + Tangibles) identified from open-ended parent/caregiver interviews into a single unified test condition compared directly against an omnibus control condition (free access to all synthesized reinforcers with zero demands).',
    cardType: 'definition',
    explanation: 'IISCA is designed to be safer, faster (typically 5-10 minutes), and more clinically individualized for severe problem behavior.',
    clinicalExplanation: 'PFA/IISCA prioritizes immediate reinforcement of the earliest precursor behavior or mild topographies to avoid escalating dangerous physical crises.',
    memoryTip: 'Mnemonic: "IISCA = Synthesized real-world cocktail vs Isolated single variables."',
    realLifeExample: 'Synthesizing escape from demands into immediate tablet access and parent attention for a child who only tantrums when tablet is removed for homework.',
    commonMistakes: 'Assuming synthesized analyses prove which single isolated variable maintained behavior; it tests the synthesized ecological package.',
    reference: 'BACB 5th/6th Edition Task List F-8',
    certification: 'BCBA',
    category: 'Behavior Assessment',
    subcategory: 'Functional Analysis',
    difficulty: 'hard',
    keywords: ['IISCA', 'PFA', 'Hanley', 'Synthesized Contingency', 'Functional Analysis'],
    tags: ['BCBA Core', 'Assessment', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T01:00:00.000Z',
    updatedAt: '2026-08-08T01:00:00.000Z',
  },
  {
    id: 'fc-bcba-022',
    title: 'Precision Teaching & The Standard Celeration Chart (SCC)',
    front: 'What are the 4 core tenets of Precision Teaching (Lindsley) and what does Celeration measure?',
    back: 'Tenets of Precision Teaching:\n1. The learner knows best (If progress fails, change instruction, don’t blame student).\n2. Focus on directly observable behavior (count per minute / frequency).\n3. Use the Standard Celeration Chart (SCC) with semi-logarithmic scaling.\n4. Pinpoint and aim for Fluency (REAPS: Retention, Endurance, Application, Performance Standards).\n\nCeleration: Measures the rate of change in behavior frequency over time (count per minute per week).',
    cardType: 'definition',
    explanation: 'Precision teaching charts both correct (acceleration) and incorrect (deceleration) frequencies simultaneously on a 6-cycle semi-log chart.',
    clinicalExplanation: 'Semi-logarithmic scaling ensures that doubling performance (e.g. 2 to 4 or 50 to 100) displays as the exact same visual slope angle on the chart.',
    memoryTip: 'Mnemonic: "Precision = Standard Chart + Rate per Minute + Celeration slope."',
    realLifeExample: 'Tracking 1-minute math fact timings to achieve 80 correct digits per minute with <2 errors.',
    commonMistakes: 'Plotting percentage of opportunities on an equal-interval graph instead of response rate on an SCC.',
    reference: 'BACB 5th/6th Edition Task List G-14',
    certification: 'BCBA',
    category: 'Data Collection and Graphing',
    subcategory: 'Precision Teaching',
    difficulty: 'hard',
    keywords: ['Precision Teaching', 'SCC', 'Standard Celeration Chart', 'Lindsley', 'Fluency', 'Celeration'],
    tags: ['BCBA Core', 'Measurement'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T02:00:00.000Z',
    updatedAt: '2026-08-08T02:00:00.000Z',
  },
  {
    id: 'fc-bcba-023',
    title: 'Behavioral Contrast: Anticipatory & Simultaneous',
    front: 'What is Behavioral Contrast, and what clinical precaution must BCBAs take when treating behavior in only one setting?',
    back: 'Behavioral Contrast occurs when a change in the schedule of reinforcement in ONE context causes the rate of behavior in that context to change, which produces an OPPOSITE CHANGE in the rate of behavior in an UNCHANGED second context.\n\nClinical Precaution: If problem behavior is placed on extinction at school (rate drops), problem behavior may SHARPLY INCREASE at home if home contingencies remain unchanged. Parents must be pre-warned and trained.',
    cardType: 'scenario',
    explanation: 'Contrast reflects reallocation of responses when relative reinforcement values shift between environments.',
    clinicalExplanation: 'Positive contrast = decrease in reinforcement in context A produces increase in behavior in context B. Negative contrast = increase in reinforcement in context A produces decrease in behavior in context B.',
    memoryTip: 'Mnemonic: "Contrast = Opposite reaction in the untreated room."',
    realLifeExample: 'Aggression is eliminated at the clinic using FCT+DRA; aggression suddenly doubles at home with parents.',
    commonMistakes: 'Assuming a behavior intervention will automatically generalize across all settings without setting-specific programming.',
    reference: 'BACB 5th/6th Edition Task List B-7',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Concepts and Principles',
    difficulty: 'hard',
    keywords: ['Behavioral Contrast', 'Generalization', 'Extinction Side Effects', 'Schedule of Reinforcement'],
    tags: ['BCBA Core', 'Concepts and Principles', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T03:00:00.000Z',
    updatedAt: '2026-08-08T03:00:00.000Z',
  },
  {
    id: 'fc-bcba-024',
    title: 'Resurgence vs Spontaneous Recovery vs Extinction Burst',
    front: 'Distinguish between an Extinction Burst, Spontaneous Recovery, and Resurgence.',
    back: '• Extinction Burst: Immediate, temporary spike in frequency, intensity, or variability of the TARGET behavior immediately after extinction begins.\n• Spontaneous Recovery: Reappearance of the extinguished behavior after a period of time has elapsed, even though extinction remains in effect.\n• Resurgence: Reappearance of a PREVIOUSLY EXTINGUISHED behavior when a RECENTLY LEARNED replacement behavior (e.g. DRA/FCT) encounters worsening reinforcement or extinction.',
    cardType: 'definition',
    explanation: 'Understanding these extinction phenomena prevents clinicians from incorrectly abandoning effective treatment plans.',
    clinicalExplanation: 'If an RBT fails to deliver prompt reinforcement for a mand, the child may resurgently engage in hitting that was extinguished months ago.',
    memoryTip: 'Mnemonic: "Burst = Immediate explosion; Spontaneous = Time gap return; Resurgence = Replacement failed, old habit surges back."',
    realLifeExample: 'Child taught to use communication card stops receiving attention from busy therapist and immediately resumes head-banging (Resurgence).',
    commonMistakes: 'Confusing resurgence (triggered by degradation of alternative reinforcement) with spontaneous recovery (passage of time).',
    reference: 'BACB 5th/6th Edition Task List B-9',
    certification: 'BCBA',
    category: 'Behavior Reduction',
    subcategory: 'Extinction Phenomena',
    difficulty: 'hard',
    keywords: ['Resurgence', 'Spontaneous Recovery', 'Extinction Burst', 'DRA Failure'],
    tags: ['BCBA Core', 'Behavior Reduction'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T04:00:00.000Z',
    updatedAt: '2026-08-08T04:00:00.000Z',
  },
  {
    id: 'fc-bcba-025',
    title: 'Ethics Code 1.11 & 1.13: Multiple and Exploitative Relationships',
    front: 'What does the BACB Ethics Code stipulate regarding multiple relationships and romantic/sexual relationships with clients/supervisees?',
    back: '• Multiple Relationships (1.11): Behavior analysts actively avoid multiple (dual) personal/professional relationships. If an unavoidable multiple relationship arises, they document, seek consultation, and mitigate conflicts of interest.\n• Exploitative Relationships (1.13): Behavior analysts do NOT exploit clients, stakeholders, supervisees, or trainees. They NEVER engage in romantic or sexual relationships with current clients/supervisees, and MUST WAIT AT LEAST 2 YEARS after the professional relationship has officially ended before any romantic contact.',
    cardType: 'definition',
    explanation: 'Multiple relationships impair clinical objectivity and create power imbalances.',
    clinicalExplanation: 'Accepting babysitting jobs, business partnerships, or romantic dates with clients or their immediate family members constitutes serious ethical violations.',
    memoryTip: 'Mnemonic: "2-Year Rule for romantic relationships post-discharge; Zero tolerance during active service."',
    realLifeExample: 'Refusing an offer to stay at a client family’s vacation home or invest in a parent’s business venture.',
    commonMistakes: 'Thinking casual dual relationships (e.g. coaching a client’s sibling in soccer) are acceptable without documentation and mitigation plans.',
    reference: 'BACB Ethics Code for Behavior Analysts 1.11, 1.13, 1.14',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Professional Ethics',
    difficulty: 'hard',
    keywords: ['Multiple Relationships', 'Dual Relationships', 'Ethics Code', 'Exploitation', '2 Year Rule'],
    tags: ['BCBA Core', 'Ethics', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T05:00:00.000Z',
    updatedAt: '2026-08-08T05:00:00.000Z',
  },
  {
    id: 'fc-bcba-026',
    title: 'Ethics Code 1.12: Gift Policy',
    front: 'What is the BACB Ethics Code threshold for accepting gifts from clients or stakeholders?',
    back: 'Behavior analysts may accept gifts ONLY IF:\n1. The gift is unsolicited.\n2. Has an estimated financial value of $10 USD or less (or equivalent).\n3. Occurs only occasionally (e.g. holiday or end-of-year token).\n4. Refusing would cause cultural offense or insult to the client/family.\n\nCash, gift cards, or expensive items must ALWAYS be politely declined with an explanation of BACB ethical constraints.',
    cardType: 'definition',
    explanation: 'The gift policy prevents favoritism, dual relationships, and clinical compromise.',
    clinicalExplanation: 'Clinics should establish a written upfront gift policy provided to all families during intake onboarding.',
    memoryTip: 'Mnemonic: "$10 Rule: Infrequent, token-value, non-cash only."',
    realLifeExample: 'Accepting a $5 handmade holiday drawing/mug vs declining a $50 Amazon gift card or expensive perfume.',
    commonMistakes: 'Accepting cash or $25 gift cards under the belief that "refusing is culturally rude".',
    reference: 'BACB Ethics Code for Behavior Analysts 1.12',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Professional Ethics',
    difficulty: 'medium',
    keywords: ['Gifts', 'Gift Policy', '$10 Limit', 'Ethics Code 1.12'],
    tags: ['BCBA Core', 'Ethics', 'High Weight'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T06:00:00.000Z',
    updatedAt: '2026-08-08T06:00:00.000Z',
  },
  {
    id: 'fc-bcba-027',
    title: 'Treatment Integrity (Procedural Fidelity) Monitoring',
    front: 'How is Treatment Integrity quantitatively calculated and monitored by BCBA supervisors?',
    back: 'Treatment Integrity measures the extent to which staff/parents implement the intervention plan EXACTLY as written.\n\nCalculation Formula:\nTreatment Integrity (%) = (Number of Correctly Implemented Steps / Total Number of Plan Steps Evaluated) × 100%\n\nMonitored using objective, task-analyzed fidelity checklists during direct supervision observations.',
    cardType: 'definition',
    explanation: 'Low treatment integrity is the primary reason behavior plans fail in applied clinical practice.',
    clinicalExplanation: 'If client behavior is not improving, BCBAs must evaluate treatment integrity before assuming the intervention itself is ineffective.',
    memoryTip: 'Mnemonic: "Integrity = Implemented Right (Correct Steps / Total Steps)."',
    realLifeExample: 'Scoring an RBT on a 10-step DTT fidelity checklist (scoring 9/10 = 90% procedural integrity).',
    commonMistakes: 'Changing a behavior intervention without first verifying staff procedural fidelity.',
    reference: 'BACB 5th/6th Edition Task List I-6',
    certification: 'BCBA',
    category: 'Ethics',
    subcategory: 'Personnel Supervision',
    difficulty: 'medium',
    keywords: ['Treatment Integrity', 'Procedural Fidelity', 'Supervision Checklist', 'Staff Performance'],
    tags: ['BCBA Core', 'Supervision'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T07:00:00.000Z',
    updatedAt: '2026-08-08T07:00:00.000Z',
  },
  {
    id: 'fc-bcba-028',
    title: 'Stimulus Class vs Response Class',
    front: 'Distinguish between a Feature Stimulus Class, an Arbitrary Stimulus Class, and a Response Class.',
    back: '• Feature Stimulus Class: Stimuli sharing common physical topographies (e.g. size, color, shape) and evoking the same response (e.g. blue cars, blue balls, blue shirts all evoke "Blue").\n• Arbitrary Stimulus Class: Stimuli that look completely different physically but share a common function or symbolic meaning (e.g. 1/2, 50%, 0.5, and half a pizza all evoke "Half").\n• Response Class: A collection of topographically DIFFERENT behaviors that produce the EXACT SAME functional effect on the environment (e.g. crying, shouting, hitting all produce Escape from homework).',
    cardType: 'definition',
    explanation: 'Stimulus classes group antecedents; response classes group behaviors based on shared consequence function.',
    clinicalExplanation: 'All behaviors within a single response class must be targeted together under a function-based behavior plan.',
    memoryTip: 'Mnemonic: "Feature = Looks alike; Arbitrary = Looks different, means same; Response Class = Different actions, same consequence."',
    realLifeExample: 'Pressing a button, turning a knob, or flipping a switch all turn on a light (Response Class).',
    commonMistakes: 'Confusing response topography (physical form) with response class (function).',
    reference: 'BACB 5th/6th Edition Task List B-2',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Concepts and Principles',
    difficulty: 'hard',
    keywords: ['Stimulus Class', 'Feature Stimulus Class', 'Arbitrary Stimulus Class', 'Response Class'],
    tags: ['BCBA Core', 'Concepts and Principles'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T08:00:00.000Z',
    updatedAt: '2026-08-08T08:00:00.000Z',
  },
  {
    id: 'fc-bcba-029',
    title: 'Contingency-Shaped vs Rule-Governed Behavior',
    front: 'Differentiate between Contingency-Shaped Behavior and Rule-Governed Behavior.',
    back: '• Contingency-Shaped Behavior: Learned through DIRECT CONTACT with immediate environmental antecedents and consequences (e.g. touching a hot stove and immediately getting burned).\n• Rule-Governed Behavior: Controlled by a verbal statement of an antecedent-behavior-consequence contingency WITHOUT requiring direct experiential contact with the consequence (e.g. reading a sign saying "Do not touch, high voltage" and withholding touch).',
    cardType: 'definition',
    explanation: 'Rule-governed behavior allows rapid learning of complex behaviors and prevents exposure to dangerous natural consequences.',
    clinicalExplanation: 'Rule-governed behavior can be resistant to changing natural contingencies if the learner rigidly follows the verbal rule.',
    memoryTip: 'Mnemonic: "Contingency = Contacted directly; Rule = Read or Told verbal rule."',
    realLifeExample: 'Wearing a seatbelt because you read highway safety laws vs wearing a seatbelt after experiencing a car crash.',
    commonMistakes: 'Assuming non-vocal animals or very young pre-verbal children can easily acquire complex rule-governed behavior.',
    reference: 'BACB 5th/6th Edition Task List B-13',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Concepts and Principles',
    difficulty: 'medium',
    keywords: ['Rule-Governed', 'Contingency-Shaped', 'Verbal Rule', 'Direct Contact'],
    tags: ['BCBA Core', 'Concepts and Principles'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T09:00:00.000Z',
    updatedAt: '2026-08-08T09:00:00.000Z',
  },
  {
    id: 'fc-bcba-030',
    title: 'Relational Frame Theory (RFT) & Derived Relational Responding',
    front: 'What is Arbitrarily Applicable Relational Responding (AARR) in Relational Frame Theory (RFT)?',
    back: 'AARR is the core human operant behavior of relating stimuli under arbitrary contextual control, rather than solely based on physical formal properties. It involves:\n1. Mutual Entailment (If A is bigger than B, B is derived smaller than A).\n2. Combinatorial Entailment (If A > B and B > C, A > C is derived).\n3. Transformation of Stimulus Functions (If A is paired with shock and A > B, B elicits fear without direct conditioning).',
    cardType: 'definition',
    explanation: 'RFT expands Skinnerian verbal behavior to explain complex cognition, metaphor, logic, and relational verbal networks.',
    clinicalExplanation: 'Used in modern acceptance and commitment training (ACT) and language acquisition protocols (e.g. PEAK Relational Training System).',
    memoryTip: 'Mnemonic: "MCT = Mutual Entailment, Combinatorial Entailment, Transformation of Functions."',
    realLifeExample: 'A child told that a dime (small coin) is worth more than a nickel (larger coin) derives value through relational framing rather than physical size.',
    commonMistakes: 'Assuming relational responding only occurs for physical perceptual dimensions like size and color.',
    reference: 'BACB 5th/6th Edition Task List B-15',
    certification: 'BCBA',
    category: 'Behavior Acquisition',
    subcategory: 'Relational Frame Theory',
    difficulty: 'hard',
    keywords: ['RFT', 'Relational Frame Theory', 'AARR', 'Mutual Entailment', 'Transformation of Functions'],
    tags: ['BCBA Core', 'Advanced ABA', 'High Weight'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-08T10:00:00.000Z',
    updatedAt: '2026-08-08T10:00:00.000Z',
  },

  // --- BCaBA SUPERVISORY DECK ---
  {
    id: 'fc-bcaba-001',
    title: 'Preference Assessment Protocols: MSWO vs MSW',
    front: 'What is the primary operational difference between MSWO (Without Replacement) and MSW (With Replacement)?',
    back: '• MSWO (Without Replacement): Chosen item is REMOVED from the array for subsequent trials, creating an efficient ranked hierarchy of all items.\n• MSW (With Replacement): Chosen item is REPLACED in the array, only identifying the single highest-preferred item without ranking unselected items.',
    cardType: 'definition',
    explanation: 'MSWO is faster and provides a clear ranking hierarchy, while MSW is useful when client exhibits severe problem behavior upon item removal.',
    clinicalExplanation: 'In MSWO, 5-7 items are presented. Once an item is selected and consumed/interacted with for 30s, it is removed and remaining items are rearranged in random order.',
    memoryTip: 'Mnemonic: "MSWO = Out! (Items taken out to rank everything)."',
    realLifeExample: 'Running an MSWO with 5 reinforcers before starting a DTT learning block.',
    commonMistakes: 'Not rearranging item positions between trials, causing side-bias confounds.',
    reference: 'BACB BCaBA Task List Standard B-3',
    certification: 'BCaBA',
    category: 'Behavior Assessment',
    subcategory: 'Preference Assessments',
    difficulty: 'medium',
    keywords: ['MSWO', 'MSW', 'Preference Assessment', 'Hierarchy'],
    tags: ['BCaBA Core', 'Assessment'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-06T10:00:00.000Z',
    updatedAt: '2026-08-06T10:00:00.000Z',
  },
  {
    id: 'fc-bcaba-002',
    title: 'Task Analysis: Forward vs Backward vs Total Task Chaining',
    front: 'When is Backward Chaining clinically indicated over Forward Chaining?',
    back: 'Backward Chaining is indicated when the learner benefits from experiencing the naturally reinforcing terminal step of the chain immediately on early trials (e.g. shoe tying, baking, hand washing final dry).',
    cardType: 'scenario',
    explanation: 'In backward chaining, the therapist completes steps 1 through N-1, and the learner executes the final step N to contact the reinforcer.',
    clinicalExplanation: 'Forward chaining teaches step 1 first; Total Task trains every step of the task analysis during each trial with prompt fading as needed.',
    memoryTip: 'Mnemonic: "Backward = Finish line First!"',
    realLifeExample: 'Teaching putting on socks where client pulls sock over ankle (last step) and receives immediate praise.',
    commonMistakes: 'Withholding terminal reinforcement until all steps are independent in forward chaining.',
    reference: 'BACB BCaBA Task List Standard C-5',
    certification: 'BCaBA',
    category: 'Behavior Acquisition',
    subcategory: 'Chaining',
    difficulty: 'medium',
    keywords: ['Backward Chaining', 'Forward Chaining', 'Total Task', 'Task Analysis'],
    tags: ['BCaBA Core', 'Skill Acquisition'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-06T11:00:00.000Z',
    updatedAt: '2026-08-06T11:00:00.000Z',
  },
];

// In-memory & LocalStorage Custom Flashcard Store
let CUSTOM_FLASHCARDS: Flashcard[] = [];
export const DELETED_CARD_IDS = new Set<string>();

export function loadDeletedCardIds(): void {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('rbt_custom_flashcards');
      if (saved) {
        CUSTOM_FLASHCARDS = JSON.parse(saved);
      }
      const deletedSaved = localStorage.getItem('rbt_deleted_flashcard_ids');
      if (deletedSaved) {
        const parsedDeleted = JSON.parse(deletedSaved);
        if (Array.isArray(parsedDeleted)) {
          parsedDeleted.forEach((id: string) => DELETED_CARD_IDS.add(id));
        }
      }
    } catch (e) {
      console.error('Failed to load custom flashcards from browser storage', e);
    }
  }
}

// Initial load
loadDeletedCardIds();

export function markCardAsDeleted(id: string): void {
  DELETED_CARD_IDS.add(id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('rbt_deleted_flashcard_ids', JSON.stringify(Array.from(DELETED_CARD_IDS)));
    } catch (e) {
      console.error('Failed to persist deleted flashcard ID to browser storage', e);
    }
  }
}

/**
 * Add a custom or AI-generated flashcard to the user deck with persistence
 */
export function addCustomFlashcard(card: Partial<Flashcard>): Flashcard {
  const newCard: Flashcard = {
    id: card.id || `fc-custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: card.title || 'Custom BACB Flashcard',
    front: card.front || 'Front Prompt',
    back: card.back || 'Back Answer',
    cardType: card.cardType || 'ai_generated',
    explanation: card.explanation || 'Detailed clinical rationale for this BACB task list item.',
    clinicalExplanation: card.clinicalExplanation || 'Applied Behavior Analysis clinical implementation note.',
    memoryTip: card.memoryTip || 'Remember key antecedent-behavior-consequence relationships.',
    realLifeExample: card.realLifeExample || 'Example ABA clinical scenario.',
    commonMistakes: card.commonMistakes || 'Confusing related behavioral terms.',
    reference: card.reference || 'BACB Task List Standard',
    certification: card.certification || 'RBT',
    category: (card.category as any) || 'Measurement',
    difficulty: card.difficulty || 'medium',
    keywords: card.keywords || ['ABA', 'RBT'],
    tags: card.tags || ['Custom', 'AI Generated'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    createdBy: card.createdBy || 'user_ai',
    updatedBy: 'user_ai',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  CUSTOM_FLASHCARDS.unshift(newCard);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('rbt_custom_flashcards', JSON.stringify(CUSTOM_FLASHCARDS));
    } catch (e) {
      console.error('Failed to save custom flashcards', e);
    }
  }

  return newCard;
}

// In-memory User Spaced Repetition Progress Store
const USER_PROGRESS_STORE: Record<string, SpacedRepetitionState> = {};

/**
 * Get user spaced repetition state for a card
 */
export function getUserCardState(cardId: string, userId: string = 'default_user'): SpacedRepetitionState {
  const key = `${userId}_${cardId}`;
  if (!USER_PROGRESS_STORE[key]) {
    USER_PROGRESS_STORE[key] = createInitialCardState(cardId, userId);
  }
  return USER_PROGRESS_STORE[key];
}

/**
 * Update card spaced repetition state after user feedback rating
 */
export function updateUserCardRating(cardId: string, rating: any, userId: string = 'default_user'): SpacedRepetitionState {
  const current = getUserCardState(cardId, userId);
  const updated = calculateNextSpacedRepetition(current, Number(rating) as any);
  const key = `${userId}_${cardId}`;
  USER_PROGRESS_STORE[key] = updated;
  return updated;
}

/**
 * Dynamically generate flashcards from Master Question Bank items
 */
export function generateFlashcardsFromQuestions(): Flashcard[] {
  const generated: Flashcard[] = MASTER_QUESTION_BANK.map((mq) => ({
    id: `fc-gen-${mq.id}`,
    title: `${mq.category}: ${mq.certification} Item`,
    front: mq.scenarioText ? `[Scenario] ${mq.scenarioText}\n\nQuestion: ${mq.question}` : mq.question,
    back: `Correct Answer: ${mq.options.find((o) => o.id === mq.correctAnswerId)?.text || mq.correctAnswerId}\n\nRationale: ${mq.answerExplanation}`,
    cardType: 'ai_generated',
    explanation: mq.answerExplanation,
    clinicalExplanation: mq.clinicalExplanation,
    memoryTip: mq.examTips || 'Focus on antecedent-behavior-consequence relationships.',
    realLifeExample: mq.scenarioText,
    commonMistakes: mq.commonMistakes,
    reference: mq.references,
    certification: mq.certification,
    category: mq.category as any,
    difficulty: mq.difficulty,
    keywords: mq.keywords,
    tags: mq.tags,
    status: 'published',
    isPremium: mq.isPremium,
    isFeatured: mq.isFeatured,
    createdBy: 'ai_engine',
    updatedBy: 'ai_engine',
    createdAt: mq.createdAt,
    updatedAt: mq.updatedAt,
  }));

  return generated;
}

/**
 * Query and filter flashcards with Spaced Repetition queue management
 */
/**
 * Fetch flashcards directly from Supabase master_flashcards table with pagination and explicit columns
 */
export async function fetchDatabaseFlashcards(limit: number = 100, offset: number = 0): Promise<Flashcard[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const adminDb = getSupabaseAdminClient();
    const { data, error } = await adminDb
      .from('master_flashcards')
      .select('id, term, definition, clinical_example, category, task_list_code, tags, difficulty, is_premium, status, created_at, updated_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error || !data) {
      console.error('[Flashcard Bank] DB fetch error:', error?.message);
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      title: row.term || 'BACB Flashcard',
      front: row.term || 'Prompt',
      back: row.definition || 'Answer',
      cardType: 'basic',
      explanation: row.clinical_example || row.definition || '',
      clinicalExplanation: row.clinical_example || row.definition || '',
      memoryTip: 'Mnemonic memory tip',
      realLifeExample: 'Clinical scenario',
      commonMistakes: 'Common mistakes',
      reference: row.task_list_code || 'BACB Task List Standard',
      certification: (row.certification as any) || 'RBT',
      category: (row.category as any) || 'Measurement',
      subcategory: row.task_list_code || 'Task List Item',
      difficulty: (row.difficulty as any) || 'medium',
      keywords: row.tags || ['BACB', 'Flashcard'],
      tags: row.tags || ['Published'],
      status: (row.status as any) || 'published',
      isPremium: row.is_premium || false,
      isFeatured: true,
      createdBy: 'supabase_db',
      updatedBy: 'supabase_db',
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString(),
    }));
  } catch (err: any) {
    console.error('[Flashcard Bank] Exception fetching database flashcards:', err.message);
    return [];
  }
}

/**
 * Insert a single flashcard into Supabase database
 */
export async function createDatabaseFlashcard(card: Partial<Flashcard>): Promise<Flashcard> {
  const adminDb = getSupabaseAdminClient();
  const dbRow = {
    certification: card.certification || 'RBT',
    term: card.front || card.title || 'Untitled Flashcard',
    definition: card.back || card.explanation || 'No definition',
    clinical_example: card.explanation || card.clinicalExplanation || null,
    category: card.category || 'Measurement',
    task_list_code: card.subcategory || card.reference || 'BACB Task List',
    tags: card.tags || ['Custom'],
    difficulty: card.difficulty || 'medium',
    is_premium: card.isPremium || false,
    status: 'published',
  };

  const { data, error } = await adminDb.from('master_flashcards').insert([dbRow]).select();
  if (error || !data || data.length === 0) {
    console.error('[Flashcard Bank] Create error:', error?.message);
    throw new Error(error?.message || 'Failed to insert flashcard row into database');
  }

  const row = data[0];
  const newCard: Flashcard = {
    id: row.id,
    title: row.term,
    front: row.term,
    back: row.definition,
    cardType: 'basic',
    explanation: row.clinical_example || row.definition,
    clinicalExplanation: row.clinical_example || row.definition,
    memoryTip: 'Mnemonic memory tip',
    realLifeExample: 'Clinical scenario',
    commonMistakes: 'Common mistakes',
    reference: row.task_list_code || 'BACB Task List Standard',
    certification: row.certification || 'RBT',
    category: row.category || 'Measurement',
    subcategory: row.task_list_code,
    difficulty: row.difficulty || 'medium',
    keywords: row.tags || ['BACB'],
    tags: row.tags || ['Custom'],
    status: row.status || 'published',
    isPremium: row.is_premium || false,
    isFeatured: true,
    createdBy: 'user',
    updatedBy: 'user',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };

  addCustomFlashcard(newCard);
  return newCard;
}

/**
 * Update an existing flashcard in Supabase database
 */
export async function updateDatabaseFlashcard(id: string, updates: Partial<Flashcard>): Promise<boolean> {
  const adminDb = getSupabaseAdminClient();
  const payload: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (updates.front || updates.title) payload.term = updates.front || updates.title;
  if (updates.back) payload.definition = updates.back;
  if (updates.explanation || updates.clinicalExplanation) payload.clinical_example = updates.explanation || updates.clinicalExplanation;
  if (updates.category) payload.category = updates.category;
  if (updates.certification) payload.certification = updates.certification;
  if (updates.difficulty) payload.difficulty = updates.difficulty;
  if (updates.reference || updates.subcategory) payload.task_list_code = updates.reference || updates.subcategory;

  const { error } = await adminDb.from('master_flashcards').update(payload).eq('id', id);
  if (error) {
    console.error('[Flashcard Bank] Update error:', error.message);
    throw new Error(`Failed to update flashcard ${id}: ${error.message}`);
  }
  return true;
}

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Delete a flashcard from Supabase database or in-memory store
 */
export async function deleteDatabaseFlashcard(id: string): Promise<boolean> {
  markCardAsDeleted(id);
  if (isSupabaseConfigured() && uuidRegex.test(id)) {
    try {
      const adminDb = getSupabaseAdminClient();
      await adminDb.from('master_flashcards').update({ deleted_at: new Date().toISOString(), status: 'deleted' }).eq('id', id);
      const { error } = await adminDb.from('master_flashcards').delete().eq('id', id);
      if (error) {
        console.error('[Flashcard Bank] Delete error:', error.message);
      }
    } catch (e: any) {
      console.error('[Flashcard Bank] Exception deleting database card:', e?.message);
    }
  }

  CUSTOM_FLASHCARDS = CUSTOM_FLASHCARDS.filter((c) => c.id !== id);
  const idx = MASTER_FLASHCARDS.findIndex((c) => c.id === id);
  if (idx !== -1) MASTER_FLASHCARDS.splice(idx, 1);
  return true;
}

/**
 * Bulk delete multiple flashcards from Supabase database or in-memory store
 */
export async function deleteDatabaseFlashcardBulk(ids: string[]): Promise<boolean> {
  if (!ids || ids.length === 0) return true;

  ids.forEach((id) => markCardAsDeleted(id));

  const uuidIds = ids.filter((id) => uuidRegex.test(id));

  if (isSupabaseConfigured() && uuidIds.length > 0) {
    try {
      const adminDb = getSupabaseAdminClient();
      await adminDb
        .from('master_flashcards')
        .update({ deleted_at: new Date().toISOString(), status: 'deleted' })
        .in('id', uuidIds);
      const { error } = await adminDb.from('master_flashcards').delete().in('id', uuidIds);
      if (error) {
        console.error('[Flashcard Bank] Bulk Delete error:', error.message);
      }
    } catch (e: any) {
      console.error('[Flashcard Bank] Exception bulk deleting database cards:', e?.message);
    }
  }

  // Purge all specified IDs from in-memory stores as well
  ids.forEach((id) => {
    CUSTOM_FLASHCARDS = CUSTOM_FLASHCARDS.filter((c) => c.id !== id);
    const idx = MASTER_FLASHCARDS.findIndex((c) => c.id === id);
    if (idx !== -1) MASTER_FLASHCARDS.splice(idx, 1);
  });

  return true;
}

/**
 * Parse CSV string content into Partial<Flashcard>[] array
 */
export function parseCSVFlashcards(csvText: string): Partial<Flashcard>[] {
  if (!csvText || typeof csvText !== 'string') return [];

  const lines: string[] = [];
  let currentLine = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && csvText[i + 1] === '\n') i++;
      if (currentLine.trim()) lines.push(currentLine);
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) lines.push(currentLine);

  if (lines.length === 0) return [];

  // Helper to split CSV row handling quoted fields
  const parseRow = (line: string): string[] => {
    const row: string[] = [];
    let field = '';
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQ = !inQ;
        }
      } else if (c === ',' && !inQ) {
        row.push(field.trim());
        field = '';
      } else {
        field += c;
      }
    }
    row.push(field.trim());
    return row;
  };

  const headerRow = parseRow(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9_]/g, ''));
  const termIdx = headerRow.findIndex((h) => ['term', 'front', 'question', 'prompt', 'title'].includes(h));
  const defIdx = headerRow.findIndex((h) => ['definition', 'back', 'answer', 'explanation'].includes(h));
  const expIdx = headerRow.findIndex((h) => ['clinical_example', 'clinicalexample', 'explanation', 'rationale', 'memory_tip'].includes(h));
  const catIdx = headerRow.findIndex((h) => ['category', 'domain'].includes(h));
  const certIdx = headerRow.findIndex((h) => ['certification', 'cert', 'level'].includes(h));
  const diffIdx = headerRow.findIndex((h) => ['difficulty', 'level'].includes(h));
  const taskIdx = headerRow.findIndex((h) => ['task_list_code', 'taskcode', 'reference', 'code', 'subcategory'].includes(h));

  const results: Partial<Flashcard>[] = [];

  const startLineIdx = termIdx !== -1 || defIdx !== -1 ? 1 : 0;

  for (let i = startLineIdx; i < lines.length; i++) {
    const cols = parseRow(lines[i]);
    if (cols.length < 2) continue;

    const front = (termIdx !== -1 && cols[termIdx] ? cols[termIdx] : cols[0] || '').trim();
    const back = (defIdx !== -1 && cols[defIdx] ? cols[defIdx] : cols[1] || '').trim();
    const explanation = expIdx !== -1 && cols[expIdx] ? cols[expIdx] : cols[2] || '';
    const category = catIdx !== -1 && cols[catIdx] ? cols[catIdx] : 'Measurement';
    const cert = certIdx !== -1 && cols[certIdx] ? cols[certIdx] : 'RBT';
    const diff = diffIdx !== -1 && cols[diffIdx] ? cols[diffIdx] : 'medium';
    const reference = taskIdx !== -1 && cols[taskIdx] ? cols[taskIdx] : 'CSV Import';

    if (!front || !back) continue;

    results.push({
      title: front.slice(0, 50),
      front,
      back,
      explanation,
      clinicalExplanation: explanation,
      category: category as any,
      certification: (cert.toUpperCase() as any) || 'RBT',
      difficulty: (diff.toLowerCase() as any) || 'medium',
      reference,
      tags: ['CSV Import'],
      cardType: 'basic',
    });
  }

  return results;
}

/**
 * Bulk insert flashcards into Supabase database
 */
export async function importBulkFlashcards(cards: Partial<Flashcard>[]): Promise<{ insertedCount: number; insertedIds: string[] }> {
  const adminDb = getSupabaseAdminClient();
  const dbRows = cards.map((c) => ({
    certification: String(c.certification || 'RBT').slice(0, 30),
    term: String(c.front || c.title || 'Untitled Flashcard').slice(0, 250),
    definition: c.back || c.explanation || 'No definition',
    clinical_example: c.clinicalExplanation || c.explanation || null,
    category: String(c.category || 'Measurement').slice(0, 120),
    task_list_code: String(c.reference || c.subcategory || 'CSV Import').slice(0, 30),
    tags: c.tags || ['CSV Import'],
    difficulty: String(c.difficulty || 'medium').slice(0, 30),
    is_premium: c.isPremium || false,
    status: 'published',
  }));

  if (dbRows.length === 0) {
    return { insertedCount: 0, insertedIds: [] };
  }

  const insertedIds: string[] = [];
  const chunkSize = 100;

  for (let i = 0; i < dbRows.length; i += chunkSize) {
    const chunk = dbRows.slice(i, i + chunkSize);
    const { data, error } = await adminDb.from('master_flashcards').insert(chunk).select();

    if (error || !data) {
      console.error('[Flashcard Bank] Bulk import chunk error:', error?.message);
      throw new Error(error?.message || 'Failed to bulk import flashcards chunk into database');
    }

    data.forEach((r: any) => {
      insertedIds.push(r.id);
      addCustomFlashcard({
        id: r.id,
        title: r.term,
        front: r.term,
        back: r.definition,
        explanation: r.clinical_example || r.definition,
        category: r.category,
        certification: r.certification,
        difficulty: r.difficulty,
        reference: r.task_list_code,
      });
    });
  }

  return { insertedCount: insertedIds.length, insertedIds };
}

/**
 * Backward-compatible Question-to-Flashcard transformation layer
 * Transforms a Question Bank item into a concise, recall-focused flashcard
 */
export function transformQuestionToFlashcard(mq: any): Partial<Flashcard> {
  const correctOpt = Array.isArray(mq.options)
    ? mq.options.find((o: any) => o.id === mq.correctAnswerId)?.text || mq.correctAnswerId
    : 'Option A';

  // 1. Build concise recall-focused Front Prompt
  let cleanFront = (mq.question || 'Question concept').trim();

  // Strip scenario headers or options filler if present
  cleanFront = cleanFront
    .replace(/^\[Scenario\]\s*/i, '')
    .replace(/Which of the following best describes/i, 'What is')
    .replace(/Which of the following options/i, 'Which')
    .replace(/Which of the following is/i, 'What is')
    .trim();

  // If question stem has multiple sentences (e.g. scenario description + question sentence), extract the question sentence
  if (cleanFront.length > 120 && cleanFront.includes('?')) {
    const parts = cleanFront.split(/(?<=\?)/);
    const lastQuestion = parts.find((p: string) => p.trim().endsWith('?'));
    if (lastQuestion && lastQuestion.trim().length >= 15) {
      cleanFront = lastQuestion.trim();
    }
  }

  // 2. Build Rationale & Answer Explanation without redundant answer title repetition
  let rawRationale = (mq.answerExplanation || mq.explanation || '').trim();

  // Strip duplicate leading answer term if present at start of explanation
  if (correctOpt && rawRationale) {
    const escapedOpt = correctOpt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const leadingOptRegex = new RegExp(`^(${escapedOpt}[:\\s—-]*)`, 'i');
    if (leadingOptRegex.test(rawRationale)) {
      rawRationale = rawRationale.replace(leadingOptRegex, '').trim();
      if (rawRationale.length > 0) {
        rawRationale = rawRationale.charAt(0).toUpperCase() + rawRationale.slice(1);
      }
    }
  }

  // Strip any trailing Memory Tip / Exam Tip block from rationale
  rawRationale = rawRationale.replace(/(?:Memory Tip|Exam Tip|Tip|Mnemonic):[\s\S]*$/i, '').trim();

  // Build Back Definition (Correct Answer + Short Rationale, NO Question Repetition)
  const cleanBack = rawRationale ? `${correctOpt}\n\n${rawRationale}` : correctOpt;

  // 3. Build Pure Clinical Rationale (ONLY clinical/practical explanation, NO memory tip, NO question prompt)
  let cleanClinical = (mq.clinicalExplanation || rawRationale || 'Clinical rationale not provided').trim();
  cleanClinical = cleanClinical
    .replace(/^BACB Item [^:]+:\s*/i, '')
    .replace(/(?:Memory Tip|Exam Tip|Tip|Mnemonic):[\s\S]*$/i, '')
    .replace(/^Full Question Prompt:[\s\S]*?\n\n/i, '')
    .trim();

  if (correctOpt && cleanClinical) {
    const escapedOpt = correctOpt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const leadingOptRegex = new RegExp(`^(${escapedOpt}[:\\s—-]*)`, 'i');
    if (leadingOptRegex.test(cleanClinical)) {
      cleanClinical = cleanClinical.replace(leadingOptRegex, '').trim();
      if (cleanClinical.length > 0) {
        cleanClinical = cleanClinical.charAt(0).toUpperCase() + cleanClinical.slice(1);
      }
    }
  }

  // 4. Pure Memory Tip (Strip duplicate labels)
  let rawMemoryTip = (mq.examTips || mq.memoryTip || '').trim();
  rawMemoryTip = rawMemoryTip.replace(/^(?:Memory Tip|Exam Tip|Tip|Mnemonic):\s*/i, '').trim();

  if (!rawMemoryTip) {
    const keywords = Array.isArray(mq.keywords) && mq.keywords.length > 0 ? mq.keywords.slice(0, 2).join(', ') : mq.category;
    rawMemoryTip = `${correctOpt} → ${keywords}`;
  }

  // 5. Build full explanation block for card detail view (Clean sections without double labels)
  const fullExplanation = [
    `Clinical Rationale:\n${cleanClinical}`,
    `Memory Tip:\n${rawMemoryTip}`,
  ].filter(Boolean).join('\n\n');

  // 6. Source Question ID mapping & Metadata
  const sourceQuestionId = String(mq.id);
  const taskListCode = `SQID:${sourceQuestionId}`;

  return {
    title: `${mq.category}: ${correctOpt}`.slice(0, 50),
    front: cleanFront.slice(0, 250),
    back: cleanBack,
    explanation: fullExplanation,
    clinicalExplanation: cleanClinical,
    memoryTip: rawMemoryTip,
    category: mq.category || 'Measurement',
    certification: (mq.certification?.toUpperCase() as any) || 'RBT',
    difficulty: (mq.difficulty?.toLowerCase() as any) || 'medium',
    reference: taskListCode.slice(0, 30),
    tags: ['Converted Question', `source_question_id:${sourceQuestionId}`, mq.certification || 'RBT'],
    cardType: 'basic',
  };
}

/**
 * Convert all existing Master Questions into Database Flashcards in Supabase
 * Includes duplicate protection checking source_question_id
 */
export async function convertQuestionsToDatabaseFlashcards(forceAll: boolean = false): Promise<{ convertedCount: number; insertedIds: string[] }> {
  const adminDb = getSupabaseAdminClient();
  let sourceQuestions: any[] = [];

  if (isSupabaseConfigured()) {
    try {
      const { data: dbQuestions } = await adminDb
        .from('master_questions')
        .select('id, question_text, scenario_text, options, correct_answer_id, answer_explanation, clinical_explanation, certification, category, difficulty, keywords, task_list_version, references, tags')
        .is('deleted_at', null)
        .limit(5000);

      if (dbQuestions && dbQuestions.length > 0) {
        const dbMapped = dbQuestions.map((q: any) => {
          let opts: any[] = [];
          if (Array.isArray(q.options)) {
            opts = q.options;
          } else if (typeof q.options === 'string') {
            try { opts = JSON.parse(q.options); } catch (e) {}
          }
          if (!Array.isArray(opts) || opts.length === 0) {
            opts = [
              { id: 'A', text: q.option_a || 'Option A' },
              { id: 'B', text: q.option_b || 'Option B' },
              { id: 'C', text: q.option_c || 'Option C' },
              { id: 'D', text: q.option_d || 'Option D' },
            ];
          }
          return {
            id: q.id,
            question: q.question_text || q.question_stem || q.question || 'Question Stem',
            scenarioText: q.scenario_text || null,
            options: opts,
            correctAnswerId: q.correct_answer_id || q.correct_answer || 'A',
            answerExplanation: q.answer_explanation || q.explanation || 'Correct answer rationale',
            clinicalExplanation: q.clinical_explanation || q.explanation || '',
            certification: q.certification || 'RBT',
            category: q.category || 'Measurement',
            difficulty: q.difficulty || 'medium',
            keywords: q.keywords || ['Question Bank'],
          };
        });
        sourceQuestions = dbMapped;
      }
    } catch (e) {
      console.error('[Flashcard Bank] Failed to fetch DB questions for conversion:', e);
    }
  } else {
    sourceQuestions = [...MASTER_QUESTION_BANK];
  }

  // 1. Deduplication & Cleanup check: remove any duplicate SQID cards from master_flashcards
  const existingSourceIds = new Set<string>();
  if (isSupabaseConfigured()) {
    try {
      const { data: existingCards } = await adminDb
        .from('master_flashcards')
        .select('id, task_list_code, tags')
        .is('deleted_at', null);

      if (existingCards && existingCards.length > 0) {
        const seenSqIds = new Map<string, string>();
        const duplicateCardIdsToDelete: string[] = [];

        existingCards.forEach((c: any) => {
          let sqId: string | null = null;
          if (c.task_list_code && c.task_list_code.includes('SQID:')) {
            const match = c.task_list_code.match(/SQID:([^\s)]+)/);
            if (match) sqId = match[1];
          }
          if (!sqId && Array.isArray(c.tags)) {
            c.tags.forEach((t: string) => {
              if (t.startsWith('source_question_id:')) {
                sqId = t.replace('source_question_id:', '');
              }
            });
          }

          if (sqId) {
            if (seenSqIds.has(sqId)) {
              duplicateCardIdsToDelete.push(c.id);
            } else {
              seenSqIds.set(sqId, c.id);
              existingSourceIds.add(sqId);
            }
          }
        });

        // Delete duplicate card rows from database if any exist
        if (duplicateCardIdsToDelete.length > 0) {
          await adminDb.from('master_flashcards').delete().in('id', duplicateCardIdsToDelete);
        }
      }
    } catch (e) {
      console.error('[Flashcard Bank] Error during deduplication check:', e);
    }
  }

  // 2. Filter out already converted source questions unless forceAll is true
  const targetQuestions = forceAll
    ? sourceQuestions
    : sourceQuestions.filter((sq) => !existingSourceIds.has(String(sq.id)));

  // If all questions are already converted, return 0 without re-inserting
  if (targetQuestions.length === 0) {
    return { convertedCount: 0, insertedIds: [] };
  }

  const convertedCards: Partial<Flashcard>[] = targetQuestions.map(transformQuestionToFlashcard);

  if (isSupabaseConfigured()) {
    const res = await importBulkFlashcards(convertedCards);
    return { convertedCount: res.insertedCount, insertedIds: res.insertedIds };
  } else {
    const ids: string[] = [];
    convertedCards.forEach((c) => {
      const created = addCustomFlashcard(c);
      ids.push(created.id);
    });
    return { convertedCount: ids.length, insertedIds: ids };
  }
}

/**
 * Filter list of flashcards with Spaced Repetition queue management
 */
function processFilteredFlashcardsList(
  allCards: Flashcard[],
  params: FlashcardFilterParams,
  userId: string = 'default_user'
): FlashcardPaginationResult {
  loadDeletedCardIds();
  let filtered = allCards.filter((c) => !DELETED_CARD_IDS.has(c.id));

  // Certification filter
  if (params.certification && params.certification !== 'ALL') {
    const certUpper = String(params.certification).toUpperCase();
    filtered = filtered.filter(
      (c) =>
        !c.certification ||
        String(c.certification).toUpperCase() === certUpper ||
        (c.certification as string) === 'ALL' ||
        (certUpper === 'BCBA' && (c.certification === 'BCaBA' || c.certification === 'RBT')) ||
        (certUpper === 'BCABA' && c.certification === 'RBT')
    );
    // Sort exact certification matches to the top
    filtered.sort((a, b) => {
      const matchA = String(a.certification).toUpperCase() === certUpper ? 1 : 0;
      const matchB = String(b.certification).toUpperCase() === certUpper ? 1 : 0;
      return matchB - matchA;
    });
  }

  // Category filter
  if (params.category && params.category !== 'ALL') {
    filtered = filtered.filter((c) => c.category === params.category);
  }

  // Card type filter
  if (params.cardType && params.cardType !== 'ALL') {
    filtered = filtered.filter((c) => c.cardType === params.cardType);
  }

  // Search filter
  if (params.search && params.search.trim()) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.front.toLowerCase().includes(q) ||
        c.back.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }

  // Attach user progress state to cards
  const cardsWithState = filtered.map((c) => {
    const state = getUserCardState(c.id, userId);
    return { ...c, userState: state };
  });

  // Apply Learning Mode logic
  let modeFiltered = [...cardsWithState];
  const nowISO = new Date().toISOString();

  if (params.learningMode === 'review' || params.onlyDue) {
    modeFiltered = modeFiltered.filter(
      (c) => (c.userState && c.userState.nextReviewAt <= nowISO) || (c.userState && (c.userState.learningStage === 'learning' || c.userState.learningStage === 'forgotten'))
    );
  } else if (params.learningMode === 'favorite' || params.onlyFavorites) {
    modeFiltered = modeFiltered.filter((c) => c.userState && c.userState.isFavorite);
  } else if (params.learningMode === 'weak_topics' || params.onlyWeak) {
    modeFiltered = modeFiltered.filter(
      (c) => (c.userState && (c.userState.wrongCount > 0 || c.userState.masteryScore < 60)) || c.difficulty === 'hard'
    );
  } else if (params.learningMode === 'ai_recommended') {
    // AI Recommendation: Priority to high-yield BACB exam items, high difficulty, and lowest mastery
    modeFiltered = [...modeFiltered].sort((a, b) => {
      const scoreA = (100 - (a.userState?.masteryScore || 0)) + (a.isFeatured ? 25 : 0) + (a.difficulty === 'hard' ? 15 : 0);
      const scoreB = (100 - (b.userState?.masteryScore || 0)) + (b.isFeatured ? 25 : 0) + (b.difficulty === 'hard' ? 15 : 0);
      return scoreB - scoreA;
    });
  } else if (params.learningMode === 'shuffle') {
    // Fisher-Yates shuffle
    for (let i = modeFiltered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [modeFiltered[i], modeFiltered[j]] = [modeFiltered[j], modeFiltered[i]];
    }
  }

  // Metrics
  const dueCount = cardsWithState.filter(
    (c) => (c.userState && c.userState.nextReviewAt <= nowISO) || (c.userState && (c.userState.learningStage === 'learning' || c.userState.learningStage === 'forgotten'))
  ).length;
  const masteredCount = cardsWithState.filter((c) => c.userState && c.userState.learningStage === 'mastered').length;
  const learningCount = cardsWithState.filter((c) => c.userState && c.userState.learningStage === 'learning').length;

  const page = params.page || 1;
  const limit = params.limit || 100;
  const total = modeFiltered.length;
  const totalPages = Math.ceil(total / limit) || 1;

  const startIndex = (page - 1) * limit;
  const paginatedData = modeFiltered.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    total,
    dueCount,
    masteredCount,
    learningCount,
    page,
    totalPages,
  };
}

/**
 * Async database + memory query function with server-side pagination
 */
export async function getFilteredFlashcardsAsync(
  params: FlashcardFilterParams,
  userId: string = 'default_user'
): Promise<FlashcardPaginationResult> {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(5000, Math.max(1, params.limit || 50));
  const offset = (page - 1) * limit;

  if (isSupabaseConfigured()) {
    try {
      const adminDb = getSupabaseAdminClient();
      let query = adminDb
        .from('master_flashcards')
        .select('id, term, definition, clinical_example, category, task_list_code, tags, difficulty, is_premium, status, created_at, updated_at', { count: 'exact' })
        .is('deleted_at', null);

      if (params.certification && params.certification !== 'ALL') {
        const cert = params.certification.toUpperCase();
        query = query.in('certification', [params.certification, cert, cert.toLowerCase(), 'ALL', 'all']);
      }
      if (params.category && params.category !== 'ALL') {
        query = query.eq('category', params.category);
      }
      if (params.search && params.search.trim()) {
        query = query.or(`term.ilike.%${params.search.trim()}%,definition.ilike.%${params.search.trim()}%`);
      }

      const { data: dbRows, count, error } = await query
        .order('created_at', { ascending: false })
        .range(0, 4999);

      const dbMappedCards: Flashcard[] = (!error && dbRows && dbRows.length > 0)
        ? dbRows.map((row: any) => ({
            id: row.id,
            title: row.term || 'BACB Flashcard',
            front: row.term || 'Prompt',
            back: row.definition || 'Answer',
            cardType: 'basic',
            explanation: row.clinical_example || row.definition || '',
            clinicalExplanation: row.clinical_example || row.definition || '',
            memoryTip: 'Mnemonic memory tip',
            realLifeExample: 'Clinical scenario',
            commonMistakes: 'Common mistakes',
            reference: row.task_list_code || 'BACB Task List Standard',
            certification: (row.certification as any) || 'RBT',
            category: (row.category as any) || 'Measurement',
            subcategory: row.task_list_code || 'Task List Item',
            difficulty: (row.difficulty as any) || 'medium',
            keywords: row.tags || ['BACB', 'Flashcard'],
            tags: row.tags || ['Published'],
            status: (row.status as any) || 'published',
            isPremium: row.is_premium || false,
            isFeatured: true,
            createdBy: 'supabase_db',
            updatedBy: 'supabase_db',
            createdAt: row.created_at || new Date().toISOString(),
            updatedAt: row.updated_at || new Date().toISOString(),
          }))
        : [];

      // Combine database cards with master seed cards (avoid duplicate IDs)
      const combinedCards = [...dbMappedCards];
      const seenIds = new Set(combinedCards.map((c) => c.id));
      [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS].forEach((mc) => {
        if (!seenIds.has(mc.id)) {
          combinedCards.push(mc);
          seenIds.add(mc.id);
        }
      });

      return processFilteredFlashcardsList(combinedCards, params, userId);
    } catch (err) {
      console.error('[Flashcard Bank] Exception querying flashcards from DB:', err);
    }
  }

  const memoryCards = [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS];
  return processFilteredFlashcardsList(memoryCards, params, userId);
}

/**
 * Synchronous query function (fallback / backwards compatibility)
 */
export function getFilteredFlashcards(params: FlashcardFilterParams, userId: string = 'default_user'): FlashcardPaginationResult {
  const allCards = [...CUSTOM_FLASHCARDS, ...MASTER_FLASHCARDS];
  return processFilteredFlashcardsList(allCards, params, userId);
}
