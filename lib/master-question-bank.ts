import {
  MasterQuestion,
  QuestionFilterParams,
  QuestionPaginationResult,
  QuestionStatus,
  CertificationLevel,
  QuestionCategory,
  QuestionDifficulty,
  QuestionType,
} from '@/types/master-question';

// Initial default seed questions (Includes all user panel sample questions for full Super Admin management)
const SEED_QUESTIONS: MasterQuestion[] = [
  {
    id: 'q-a02-1',
    certification: 'RBT',
    question: 'Which continuous measurement procedure is the RBT implementing?',
    scenarioText: 'An RBT is tracking how long an 8-year-old child with autism engages in continuous crying after being asked to transition from recess to the classroom.',
    questionType: 'scenario_based',
    difficulty: 'easy',
    options: [
      { id: 'A', text: 'Frequency', isCorrect: false, explanation: 'Frequency counts total occurrences of behavior.' },
      { id: 'B', text: 'Duration', isCorrect: true, explanation: 'Duration measures total elapsed time from onset to offset.' },
      { id: 'C', text: 'Latency', isCorrect: false, explanation: 'Latency measures time from SD delivery to response initiation.' },
      { id: 'D', text: 'Inter-Response Time (IRT)', isCorrect: false, explanation: 'IRT measures time between consecutive responses.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'Duration is the total elapsed time during which a behavior occurs. In this scenario, measuring how long crying lasts from start to finish is duration recording.',
    clinicalExplanation: 'Duration measures total elapsed time from onset to offset of crying according to BACB Task List Item A-02.',
    references: 'BACB 2nd Edition Task List Item A-02',
    examTips: 'SD to Start = Latency. Start to Stop = Duration. Stop 1 to Start 2 = IRT.',
    commonMistakes: 'Confusing Latency with Duration. Duration tracks the whole episode length.',
    category: 'Measurement',
    subCategory: 'Continuous Measurement',
    keywords: ['Duration', 'Continuous Measurement', 'A-02', 'RBT Exam'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Measurement', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-a03-1',
    certification: 'RBT',
    question: 'What discontinuous measurement system is being utilized?',
    scenarioText: 'An RBT sets a timer for 15-minute intervals during a 2-hour classroom observation. The RBT marks a (+) on the data sheet if hand-flapping occurs AT ANY MOMENT during each 15-minute window.',
    questionType: 'scenario_based',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'Whole Interval Recording', isCorrect: false, explanation: 'Requires behavior to occur during the entire interval.' },
      { id: 'B', text: 'Partial Interval Recording', isCorrect: true, explanation: 'Scores (+) if behavior occurs at any point during interval.' },
      { id: 'C', text: 'Momentary Time Sampling', isCorrect: false, explanation: 'Scores (+) only at exact end of interval.' },
      { id: 'D', text: 'Permanent Product Recording', isCorrect: false, explanation: 'Measures physical outcomes left by behavior.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'Partial Interval Recording scores an occurrence if the behavior happens at any instant within the interval.',
    clinicalExplanation: 'BACB Item A-03: Partial interval recording tends to over-estimate behavior duration/frequency.',
    references: 'BACB 2nd Edition Task List Item A-03',
    examTips: 'Any instant in interval = Partial. Entire interval = Whole. End moment = Momentary.',
    commonMistakes: 'Confusing Partial Interval with Whole Interval recording.',
    category: 'Measurement',
    subCategory: 'Discontinuous Measurement',
    keywords: ['Partial Interval Recording', 'Discontinuous Measurement', 'A-03'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Measurement', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-b01-1',
    certification: 'RBT',
    question: 'Which preference assessment methodology is the RBT conducting?',
    scenarioText: 'During a preference assessment, an RBT presents 5 toys on a table. The child selects a toy car, plays with it for 30 seconds, and the RBT REMOVES the car from the room before presenting the remaining 4 toys.',
    questionType: 'scenario_based',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'Multiple Stimulus WITH Replacement (MSW)', isCorrect: false, explanation: 'In MSW, chosen item is placed back.' },
      { id: 'B', text: 'Multiple Stimulus WITHOUT Replacement (MSWO)', isCorrect: true, explanation: 'In MSWO, chosen items are removed from array.' },
      { id: 'C', text: 'Paired Choice (Forced Choice)', isCorrect: false, explanation: 'Presents only 2 items at a time.' },
      { id: 'D', text: 'Naturalistic Free Operant', isCorrect: false, explanation: 'Allows unrestricted access.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'Multiple Stimulus Without Replacement (MSWO) is efficient because selected items are withheld, allowing rapid hierarchy ranking.',
    clinicalExplanation: 'MSWO is an efficient assessment method for establishing preference hierarchies.',
    references: 'BACB 2nd Edition Task List Item B-01',
    examTips: 'Removed item = MSWO. Placed back = MSW. 2 items = Paired Choice.',
    commonMistakes: 'Confusing MSW with MSWO.',
    category: 'Assessment',
    subCategory: 'Preference Assessment',
    keywords: ['MSWO', 'Preference Assessment', 'B-01'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Assessment', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-c04-1',
    certification: 'RBT',
    question: 'This structured teaching trial represents which core ABA methodology?',
    scenarioText: 'An RBT places a flashcard of an apple on the table, says "Point to apple", waits 3 seconds, the child points to the apple, and the RBT gives high-five praise and a token.',
    questionType: 'scenario_based',
    difficulty: 'easy',
    options: [
      { id: 'A', text: 'Naturalistic Teaching Procedure (NET)', isCorrect: false, explanation: 'NET follows child lead in play.' },
      { id: 'B', text: 'Discrete Trial Teaching (DTT)', isCorrect: true, explanation: 'DTT consists of explicit SD, response, consequence, and ITI.' },
      { id: 'C', text: 'High-Probability Request Sequence', isCorrect: false, explanation: 'Presents 2-3 easy master requests first.' },
      { id: 'D', text: 'Chaining Procedure', isCorrect: false, explanation: 'Teaches complex multi-step routines.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'Discrete Trial Teaching (DTT) is characterized by explicit antecedent (SD), clear response opportunity, contingent consequence, and distinct pause.',
    clinicalExplanation: 'DTT consists of clear SD, Prompt/Response, Consequence, and Inter-Trial Interval.',
    references: 'BACB 2nd Edition Task List Item C-04',
    examTips: 'Structured table trial = DTT. Natural play context = NET.',
    commonMistakes: 'Confusing DTT with NET.',
    category: 'Skill Acquisition',
    subCategory: 'Discrete Trial Teaching',
    keywords: ['DTT', 'Skill Acquisition', 'C-04'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Skill Acquisition', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-c06-1',
    certification: 'RBT',
    question: 'Which chaining procedure is being implemented?',
    scenarioText: 'An RBT is teaching a learner to make a sandwich. The RBT prompts the child to complete steps 1 through 4, but allows the child to independently execute step 5 (cutting sandwich) and reinforces step 5.',
    questionType: 'scenario_based',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'Forward Chaining', isCorrect: false, explanation: 'Teaches step 1 first.' },
      { id: 'B', text: 'Backward Chaining', isCorrect: true, explanation: 'Prompts initial steps and reinforces final step first.' },
      { id: 'C', text: 'Total Task Chaining', isCorrect: false, explanation: 'Prompts any step learner struggles with.' },
      { id: 'D', text: 'Behavioral Shaping', isCorrect: false, explanation: 'Reinforces successive approximations.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'In Backward Chaining, trainer completes preceding steps, allowing learner to complete final step for natural reinforcement.',
    clinicalExplanation: 'Backward Chaining builds immediate task completion success.',
    references: 'BACB 2nd Edition Task List Item C-06',
    examTips: 'Final step taught first = Backward Chaining. Step 1 first = Forward Chaining.',
    commonMistakes: 'Confusing Backward Chaining with Forward Chaining.',
    category: 'Skill Acquisition',
    subCategory: 'Chaining',
    keywords: ['Backward Chaining', 'Task Analysis', 'C-06'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Skill Acquisition', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-d04-1',
    certification: 'RBT',
    question: 'Which differential reinforcement procedure is this?',
    scenarioText: 'A behavior plan instructs the RBT to deliver a reinforcer every 5 minutes ONLY IF the client has NOT engaged in vocal screaming during the entire 5-minute interval.',
    questionType: 'scenario_based',
    difficulty: 'hard',
    options: [
      { id: 'A', text: 'Differential Reinforcement of Alternative Behavior (DRA)', isCorrect: false, explanation: 'Reinforces specific alternative behavior.' },
      { id: 'B', text: 'Differential Reinforcement of Incompatible Behavior (DRI)', isCorrect: false, explanation: 'Reinforces physically incompatible behavior.' },
      { id: 'C', text: 'Differential Reinforcement of Other Behavior (DRO)', isCorrect: true, explanation: 'Delivers reinforcement for zero occurrence of target behavior.' },
      { id: 'D', text: 'Differential Reinforcement of Low Rates (DRL)', isCorrect: false, explanation: 'Reinforces behavior below specified rate.' },
    ],
    correctAnswerId: 'C',
    answerExplanation: 'DRO (Differential Reinforcement of Other Behavior) reinforces absence of target behavior during set time window.',
    clinicalExplanation: 'DRO requires zero occurrences of screaming during 5-minute interval.',
    references: 'BACB 2nd Edition Task List Item D-04',
    examTips: 'ZERO occurrences = DRO. Alternative behavior = DRA. Incompatible behavior = DRI.',
    commonMistakes: 'Confusing DRO with DRA.',
    category: 'Behavior Reduction',
    subCategory: 'Differential Reinforcement',
    keywords: ['DRO', 'Differential Reinforcement', 'D-04'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Behavior Reduction', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-d05-1',
    certification: 'RBT',
    question: 'How should the RBT interpret this sudden temporary increase?',
    scenarioText: 'When an RBT puts an extinction procedure in place for attention-maintained tantruming, the client’s screaming temporarily INCREASES dramatically in volume and duration on day 2.',
    questionType: 'scenario_based',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'The behavior plan has failed and must be abandoned immediately.', isCorrect: false, explanation: 'Extinction burst is predicted phenomenon.' },
      { id: 'B', text: 'It is a predictable Extinction Burst; the RBT must maintain procedure consistency.', isCorrect: true, explanation: 'Extinction burst is temporary spike in rate/intensity when reinforcement is withheld.' },
      { id: 'C', text: 'It is Spontaneous Recovery.', isCorrect: false, explanation: 'Spontaneous recovery occurs after behavior had previously reduced.' },
      { id: 'D', text: 'The child has developed sensory automatic reinforcement.', isCorrect: false, explanation: 'Function does not automatically shift.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'An Extinction Burst is immediate, expected increase in frequency/intensity when reinforcement is discontinued.',
    clinicalExplanation: 'Never stop extinction during an extinction burst.',
    references: 'BACB 2nd Edition Task List Item D-05',
    examTips: 'Temporary spike = Extinction Burst. Maintain consistency.',
    commonMistakes: 'Assuming plan failed during extinction burst.',
    category: 'Behavior Reduction',
    subCategory: 'Extinction',
    keywords: ['Extinction Burst', 'Extinction', 'D-05'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Behavior Reduction', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-e03-1',
    certification: 'RBT',
    question: 'Select the most objective session note entry:',
    scenarioText: 'An RBT completes a session and writes notes. Which entry adheres to BACB requirements for objective session reporting?',
    questionType: 'scenario_based',
    difficulty: 'easy',
    options: [
      { id: 'A', text: '"Client was in a terrible mood today because mom gave him a bad breakfast."', isCorrect: false, explanation: 'Contains subjective assumptions.' },
      { id: 'B', text: '"Client engaged in 4 instances of flooring lasting 6 minutes; completed 80% of DTT trials."', isCorrect: true, explanation: 'Uses objective measurable data.' },
      { id: 'C', text: '"Client acted aggressively out of anger and stubbornness throughout the afternoon."', isCorrect: false, explanation: 'Hypothesizes unobservable internal states.' },
      { id: 'D', text: '"Client did not want to work and felt lazy during table time."', isCorrect: false, explanation: 'Uses non-behavioral labels.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'BACB objective session notes must state observable topographies and exact data counts without subjective opinions.',
    clinicalExplanation: 'Objective measurement excludes emotional bias and unobservable mentalistic claims.',
    references: 'BACB 2nd Edition Task List Item E-03',
    examTips: 'Measurable count & time = Objective. Emotional state = Subjective.',
    commonMistakes: 'Including internal mood states in official session notes.',
    category: 'Documentation',
    subCategory: 'Session Reporting',
    keywords: ['Session Notes', 'Objective Reporting', 'E-03'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Documentation', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-f02-1',
    certification: 'RBT',
    question: 'According to the BACB Ethics Code for RBTs, how should the RBT respond?',
    scenarioText: 'At the end of a home session, a client’s mother offers the RBT an expensive $150 gift card to a local day spa as a holiday gift.',
    questionType: 'scenario_based',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'Accept the gift card graciously since it is a holiday gift.', isCorrect: false, explanation: 'Violates BACB gift guidelines.' },
      { id: 'B', text: 'Politely decline the gift card, explain BACB ethical guidelines, and notify the BCBA supervisor.', isCorrect: true, explanation: 'Declines high-value gift to prevent boundary blurring.' },
      { id: 'C', text: 'Accept the gift card but share it with the BCBA supervisor.', isCorrect: false, explanation: 'Sharing does not remove ethical conflict.' },
      { id: 'D', text: 'Trade the gift card for clinic therapy supplies.', isCorrect: false, explanation: 'Cannot accept high-value gift.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'BACB Ethics Code mandates that RBTs do not accept gifts exceeding $10 to preserve professional objectivity.',
    clinicalExplanation: 'Declining high-value gifts protects client-therapist boundaries.',
    references: 'BACB 2nd Edition Task List Item F-02',
    examTips: 'Refuse gifts > $10. Report to BCBA supervisor.',
    commonMistakes: 'Accepting gifts out of politeness.',
    category: 'Professional Conduct',
    subCategory: 'Ethics',
    keywords: ['Ethics', 'Gift Policy', 'Dual Relationships', 'F-02'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Professional Conduct', 'RBT Ethics'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'q-f04-1',
    certification: 'RBT',
    question: 'What is the minimum number of supervised hours required by the BACB for this month?',
    scenarioText: 'An RBT provided 100 total hours of direct ABA therapy to clients during the month of July.',
    questionType: 'scenario_based',
    difficulty: 'easy',
    options: [
      { id: 'A', text: '2 hours', isCorrect: false, explanation: 'Equals only 2%.' },
      { id: 'B', text: '5 hours', isCorrect: true, explanation: 'BACB requires at least 5% of total direct therapy hours per month (5% of 100 = 5 hours).' },
      { id: 'C', text: '10 hours', isCorrect: false, explanation: 'Exceeds 5% minimum.' },
      { id: 'D', text: '1 hour per week regardless of total hours', isCorrect: false, explanation: 'Calculated as 5% of monthly hours.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'RBTs must receive direct supervision for at least 5% of their total hours providing behavior-analytic services each month.',
    clinicalExplanation: '5% minimum supervision requirement ensures quality care and BCBA oversight.',
    references: 'BACB 2nd Edition Task List Item F-04',
    examTips: '5% of total monthly hours = Minimum Supervision requirement.',
    commonMistakes: 'Confusing 5% monthly rule with weekly rules.',
    category: 'Professional Conduct',
    subCategory: 'Supervision',
    keywords: ['Supervision', '5 Percent Rule', 'F-04'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Professional Conduct', 'BACB Rules'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'mq-rbt-001',
    certification: 'RBT',
    question: 'Which continuous measurement procedure is the RBT implementing when recording elapsed time from instruction to response start?',
    scenarioText: 'An RBT delivers the instruction "Sit down", starts a timer immediately, and stops the timer when the client physically begins lowering into the chair 4 seconds later.',
    questionType: 'scenario_based',
    difficulty: 'easy',
    options: [
      { id: 'A', text: 'Duration', isCorrect: false, explanation: 'Duration measures total time behavior lasts from onset to offset.' },
      { id: 'B', text: 'Latency', isCorrect: true, explanation: 'Latency measures elapsing time from SD delivery to response initiation.' },
      { id: 'C', text: 'Frequency', isCorrect: false, explanation: 'Frequency counts instances of behavior.' },
      { id: 'D', text: 'Inter-Response Time (IRT)', isCorrect: false, explanation: 'IRT measures time between two consecutive responses.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'Latency measures the elapsed time between the onset of a stimulus (SD) and the initiation of the response behavior.',
    clinicalExplanation: 'In clinical trial data collection, measuring latency helps evaluate processing speed and compliance prompt dependence.',
    references: 'BACB 2nd Edition Task List Item A-02 | Ethics Code 2.01',
    examTips: 'Remember: SD to Start = Latency. Start to Stop = Duration. Stop 1 to Start 2 = IRT.',
    commonMistakes: 'Candidates frequently confuse Latency with Duration.',
    category: 'Measurement',
    subCategory: 'Continuous Measurement',
    keywords: ['Latency', 'Continuous Measurement', 'SD', 'Response Initiation'],
    taskListVersion: '2nd_edition',
    estimatedTimeSeconds: 45,
    tags: ['Measurement', 'RBT Core'],
    status: 'published',
    isPremium: false,
    isFeatured: true,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'mq-bcba-001',
    certification: 'BCBA',
    question: 'Which functional behavior assessment (FBA) methodology confirms a true functional relation through systematic environmental manipulation?',
    scenarioText: 'A BCBA observes severe self-injurious behavior (SIB) in a residential client. The BCBA designs a multi-condition experiment (Play, Demand, Attention, Alone) to evaluate differential rates of SIB.',
    questionType: 'case_study',
    difficulty: 'hard',
    options: [
      { id: 'A', text: 'Indirect Assessment (QABF / FAST)', isCorrect: false, explanation: 'Indirect assessments rely on informant memory.' },
      { id: 'B', text: 'Descriptive ABC Functional Assessment', isCorrect: false, explanation: 'Descriptive assessment identifies correlations.' },
      { id: 'C', text: 'Analog Functional Analysis (Iwata Standard)', isCorrect: true, explanation: 'Functional Analysis involves systematic antecedent and consequence manipulation.' },
      { id: 'D', text: 'Ecological Preference Assessment', isCorrect: false, explanation: 'Preference assessments identify reinforcers.' },
    ],
    correctAnswerId: 'C',
    answerExplanation: 'Only a Functional Analysis (FA) systematically manipulates environmental antecedents and consequences to demonstrate functional relations.',
    clinicalExplanation: 'Iwata et al. established analog FA conditions to evaluate behavior function.',
    references: 'BACB 6th Edition Task List Domain C-01 | Cooper et al.',
    examTips: 'Experimental control requires a Functional Analysis (FA).',
    commonMistakes: 'Confusing Descriptive ABC Data with Functional Analysis.',
    category: 'Assessment',
    subCategory: 'Functional Behavior Assessment',
    keywords: ['Functional Analysis', 'Experimental Manipulation', 'BCBA', 'FBA'],
    taskListVersion: '6th_edition',
    estimatedTimeSeconds: 90,
    tags: ['BCBA Advanced', 'FBA'],
    status: 'published',
    isPremium: true,
    isFeatured: true,
    version: 2,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-02T12:00:00.000Z',
    updatedAt: '2026-08-04T15:30:00.000Z',
  },
  {
    id: 'mq-bcaba-001',
    certification: 'BCaBA',
    question: 'When implementing a token economy for a classroom cohort, what is the primary role of the exchange ratio?',
    scenarioText: 'A BCaBA supervises an RBT team implementing a token board. Learners earn stars for completing task demands and exchange 10 stars for 5 minutes of iPad access.',
    questionType: 'multiple_choice',
    difficulty: 'medium',
    options: [
      { id: 'A', text: 'To establish the monetary baseline of backup reinforcers', isCorrect: false, explanation: 'Tokens do not use monetary values.' },
      { id: 'B', text: 'To define how many secondary reinforcers (tokens) are needed to acquire a backup primary/secondary reinforcer', isCorrect: true, explanation: 'Exchange ratio specifies token cost.' },
      { id: 'C', text: 'To eliminate the need for generalized conditioned reinforcers', isCorrect: false, explanation: 'Tokens ARE generalized conditioned reinforcers.' },
      { id: 'D', text: 'To mandate immediate prompt fading', isCorrect: false, explanation: 'Exchange ratio governs reinforcement schedule.' },
    ],
    correctAnswerId: 'B',
    answerExplanation: 'The exchange ratio specifies the exact number of tokens required to purchase a chosen backup reinforcer.',
    clinicalExplanation: 'Token economies rely on generalized conditioned reinforcers.',
    references: 'BACB 5th Edition Task List Item G-03',
    examTips: 'Backup reinforcers provide tokens with reinforcing value.',
    commonMistakes: 'Over-pricing backup items leads to ratio strain.',
    category: 'Token Economy',
    subCategory: 'Conditioned Reinforcement',
    keywords: ['Token Economy', 'Exchange Ratio', 'BCaBA'],
    taskListVersion: '5th_edition',
    estimatedTimeSeconds: 60,
    tags: ['BCaBA', 'Token Economy'],
    status: 'published',
    isPremium: true,
    isFeatured: false,
    version: 1,
    createdBy: 'admin_sys',
    updatedBy: 'admin_sys',
    createdAt: '2026-08-03T09:00:00.000Z',
    updatedAt: '2026-08-03T09:00:00.000Z',
  },
];

// Persistent Master Question Store
export const MASTER_QUESTION_BANK: MasterQuestion[] = [...SEED_QUESTIONS];

const LOCAL_STORAGE_KEY = 'rbt_master_questions_v3';

/**
 * Load Persistent Questions from LocalStorage and merge any new SEED questions
 */
export function loadPersistentQuestions(): MasterQuestion[] {
  if (typeof window === 'undefined') {
    return MASTER_QUESTION_BANK;
  }

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed: MasterQuestion[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge missing SEED questions so new initial questions appear
        SEED_QUESTIONS.forEach((sq) => {
          if (!parsed.some((pq) => pq.id === sq.id)) {
            parsed.push(sq);
          }
        });

        MASTER_QUESTION_BANK.length = 0;
        MASTER_QUESTION_BANK.push(...parsed);
        return MASTER_QUESTION_BANK;
      }
    }
  } catch (e) {
    console.error('Failed to parse persistent questions from localStorage:', e);
  }

  // Initial seed fallback
  MASTER_QUESTION_BANK.length = 0;
  MASTER_QUESTION_BANK.push(...SEED_QUESTIONS);
  savePersistentQuestions();
  return MASTER_QUESTION_BANK;
}

/**
 * Save current MASTER_QUESTION_BANK state to LocalStorage
 */
export function savePersistentQuestions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MASTER_QUESTION_BANK));
  } catch (e) {
    console.error('Failed to save persistent questions to localStorage:', e);
  }
}

/**
 * Filter, Search, and Paginate Master Questions
 */
export function getFilteredQuestions(params: QuestionFilterParams): QuestionPaginationResult {
  loadPersistentQuestions();

  let filtered = [...MASTER_QUESTION_BANK];

  if (params.certification && params.certification !== 'ALL') {
    filtered = filtered.filter((q) => q.certification === params.certification);
  }

  if (params.category && params.category !== 'ALL') {
    filtered = filtered.filter((q) => q.category === params.category);
  }

  if (params.difficulty && params.difficulty !== 'ALL') {
    filtered = filtered.filter((q) => q.difficulty === params.difficulty);
  }

  if (params.status && params.status !== 'ALL') {
    filtered = filtered.filter((q) => q.status === params.status);
  }

  if (params.isPremium !== undefined) {
    filtered = filtered.filter((q) => q.isPremium === params.isPremium);
  }

  if (params.search && params.search.trim() !== '') {
    const term = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (q) =>
        q.question.toLowerCase().includes(term) ||
        (q.scenarioText && q.scenarioText.toLowerCase().includes(term)) ||
        q.id.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term) ||
        q.options.some((o) => o.text.toLowerCase().includes(term)) ||
        q.keywords.some((k) => k.toLowerCase().includes(term))
    );
  }

  const page = params.page && params.page > 0 ? params.page : 1;
  const size = params.pageSize || params.limit || 10;
  const total = filtered.length;
  const totalPages = Math.ceil(total / size) || 1;

  const startIndex = (page - 1) * size;
  const data = filtered.slice(startIndex, startIndex + size);

  return {
    data,
    total,
    page,
    limit: size,
    pageSize: size,
    totalPages,
  };
}

/**
 * Retrieve single question by ID
 */
export function getQuestionById(id: string): MasterQuestion | undefined {
  loadPersistentQuestions();
  return MASTER_QUESTION_BANK.find((q) => q.id === id);
}

/**
 * Create a new Master Question
 */
export function createQuestion(data: Partial<MasterQuestion>): MasterQuestion {
  loadPersistentQuestions();

  const qId = data.id || `mq-${(data.certification || 'RBT').toLowerCase()}-${Date.now()}`;
  const newQuestion: MasterQuestion = {
    id: qId,
    certification: data.certification || 'RBT',
    question: data.question || 'New Master Question Text',
    scenarioText: data.scenarioText,
    questionType: data.questionType || 'scenario_based',
    difficulty: data.difficulty || 'medium',
    options: data.options || [
      { id: 'A', text: 'Option A', isCorrect: true },
      { id: 'B', text: 'Option B', isCorrect: false },
      { id: 'C', text: 'Option C', isCorrect: false },
      { id: 'D', text: 'Option D', isCorrect: false },
    ],
    correctAnswerId: data.correctAnswerId || 'A',
    answerExplanation: data.answerExplanation || 'Comprehensive BACB explanation for target answer.',
    clinicalExplanation: data.clinicalExplanation || 'BCBA Clinical rationale.',
    references: data.references || 'BACB 2nd Edition Task List Item A-01',
    examTips: data.examTips,
    commonMistakes: data.commonMistakes,
    category: data.category || 'Measurement',
    subCategory: data.subCategory || 'Continuous Measurement',
    keywords: data.keywords || ['ABA', 'BACB'],
    taskListVersion: data.taskListVersion || '2nd_edition',
    estimatedTimeSeconds: data.estimatedTimeSeconds || 60,
    tags: data.tags || ['Master Bank'],
    status: data.status || 'published',
    isPremium: data.isPremium || false,
    isFeatured: data.isFeatured || false,
    version: 1,
    createdBy: data.createdBy || 'Super Admin CMS',
    updatedBy: data.updatedBy || 'Super Admin CMS',
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as MasterQuestion;

  const existingIndex = MASTER_QUESTION_BANK.findIndex((q) => q.id === qId);
  if (existingIndex >= 0) {
    MASTER_QUESTION_BANK[existingIndex] = newQuestion;
  } else {
    MASTER_QUESTION_BANK.unshift(newQuestion);
  }
  savePersistentQuestions();
  return newQuestion;
}

/**
 * Update existing Master Question
 */
export function updateQuestion(id: string, updates: Partial<MasterQuestion>): MasterQuestion | undefined {
  loadPersistentQuestions();
  const index = MASTER_QUESTION_BANK.findIndex((q) => q.id === id);
  if (index === -1) return undefined;

  const current = MASTER_QUESTION_BANK[index];
  const updated: MasterQuestion = {
    ...current,
    ...updates,
    version: current.version + 1,
    updatedAt: new Date().toISOString(),
  };

  MASTER_QUESTION_BANK[index] = updated;
  savePersistentQuestions();
  return updated;
}

/**
 * Delete Question by ID
 */
export function deleteQuestion(id: string): boolean {
  loadPersistentQuestions();
  const index = MASTER_QUESTION_BANK.findIndex((q) => q.id === id);
  if (index === -1) return false;
  MASTER_QUESTION_BANK.splice(index, 1);
  savePersistentQuestions();
  return true;
}

/**
 * Bulk status update (Publish, Archive, Draft)
 */
export function bulkUpdateStatus(ids: string[], status: QuestionStatus): number {
  loadPersistentQuestions();
  let count = 0;
  MASTER_QUESTION_BANK.forEach((q) => {
    if (ids.includes(q.id)) {
      q.status = status;
      q.updatedAt = new Date().toISOString();
      count++;
    }
  });
  savePersistentQuestions();
  return count;
}

/**
 * Bulk delete questions
 */
export function bulkDeleteQuestions(ids: string[]): number {
  loadPersistentQuestions();
  let count = 0;
  for (let i = MASTER_QUESTION_BANK.length - 1; i >= 0; i--) {
    if (ids.includes(MASTER_QUESTION_BANK[i].id)) {
      MASTER_QUESTION_BANK.splice(i, 1);
      count++;
    }
  }
  savePersistentQuestions();
  return count;
}

/**
 * Export questions array to CSV string
 */
export function exportQuestionsToCSV(questions: MasterQuestion[]): string {
  const headers = [
    'ID',
    'Certification',
    'Category',
    'Difficulty',
    'Question Type',
    'Question Text',
    'Scenario Text',
    'Option A',
    'Option B',
    'Option C',
    'Option D',
    'Correct Answer ID',
    'Answer Explanation',
    'Clinical Explanation',
    'References',
    'Status',
    'Is Premium',
  ];

  const rows = questions.map((q) => [
    `"${q.id}"`,
    `"${q.certification}"`,
    `"${q.category}"`,
    `"${q.difficulty}"`,
    `"${q.questionType}"`,
    `"${q.question.replace(/"/g, '""')}"`,
    `"${(q.scenarioText || '').replace(/"/g, '""')}"`,
    `"${(q.options[0]?.text || '').replace(/"/g, '""')}"`,
    `"${(q.options[1]?.text || '').replace(/"/g, '""')}"`,
    `"${(q.options[2]?.text || '').replace(/"/g, '""')}"`,
    `"${(q.options[3]?.text || '').replace(/"/g, '""')}"`,
    `"${q.correctAnswerId}"`,
    `"${q.answerExplanation.replace(/"/g, '""')}"`,
    `"${q.clinicalExplanation.replace(/"/g, '""')}"`,
    `"${q.references.replace(/"/g, '""')}"`,
    `"${q.status}"`,
    `"${q.isPremium ? 'YES' : 'NO'}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
