export interface Flashcard {
  id: string;
  domainId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  term: string;
  definition: string;
  exampleScenario: string;
  bacbCode: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

/**
 * High-Yield RBT 3rd Edition Practice Flashcards
 * Aligned with BACB RBT 3rd Edition Test Content Outline (Tasks A.1 - F.10)
 */
export const SAMPLE_FLASHCARDS: Flashcard[] = [
  // --- DOMAIN A: DATA COLLECTION & GRAPHING ---
  {
    id: 'fc-1',
    domainId: 'A',
    term: 'Continuous Measurement: Frequency (Count)',
    definition: 'Recording every single discrete occurrence of a target behavior during an observation period.',
    exampleScenario: 'Tallying every time a client raises their hand during a 30-minute circle time (e.g., 7 occurrences).',
    bacbCode: 'A.1',
    difficulty: 'Easy',
  },
  {
    id: 'fc-2',
    domainId: 'A',
    term: 'Continuous Measurement: Duration',
    definition: 'Measuring the total elapsed time from the onset (start) to offset (end) of a target behavior.',
    exampleScenario: 'Starting a timer when a tantrum begins and stopping it when crying ceases for 30 consecutive seconds.',
    bacbCode: 'A.1',
    difficulty: 'Easy',
  },
  {
    id: 'fc-3',
    domainId: 'A',
    term: 'Continuous Measurement: Latency',
    definition: 'Elapsed time between the presentation of an antecedent stimulus (SD) and the initiation of the response.',
    exampleScenario: 'RBT says "Sit down." Learner initiates movement to sit 4 seconds later (Latency = 4 seconds).',
    bacbCode: 'A.1',
    difficulty: 'Medium',
  },
  {
    id: 'fc-4',
    domainId: 'A',
    term: 'Continuous Measurement: Interresponse Time (IRT)',
    definition: 'The amount of time elapsed between the termination of one response and the initiation of the next consecutive response.',
    exampleScenario: 'Measuring 18 seconds between the end of one bite of food and the beginning of the next bite.',
    bacbCode: 'A.1',
    difficulty: 'Medium',
  },
  {
    id: 'fc-5',
    domainId: 'A',
    term: 'Discontinuous Measurement: Partial Interval Recording',
    definition: 'A time sampling procedure where an interval is scored positive (+) if the behavior occurs at ANY POINT during the interval. Overestimates behavior frequency.',
    exampleScenario: 'Recording (+) if vocal stereotypy occurs for even 1 second during a 10-second interval.',
    bacbCode: 'A.2',
    difficulty: 'Medium',
  },
  {
    id: 'fc-6',
    domainId: 'A',
    term: 'Discontinuous Measurement: Whole Interval Recording',
    definition: 'A time sampling procedure where an interval is scored positive (+) ONLY if the behavior persists continuously for the ENTIRE duration of the interval. Underestimates behavior.',
    exampleScenario: 'Recording (+) only if a student remains continuously on-task for all 60 seconds of a 1-minute interval.',
    bacbCode: 'A.2',
    difficulty: 'Medium',
  },
  {
    id: 'fc-7',
    domainId: 'A',
    term: 'Discontinuous Measurement: Momentary Time Sampling',
    definition: 'A time sampling procedure where the behavior is recorded ONLY if it is occurring at the precise instant the interval ends.',
    exampleScenario: 'Looking up when the 5-minute timer chimes; client is looking at book, so mark (+). Practical for busy classrooms.',
    bacbCode: 'A.2',
    difficulty: 'Medium',
  },
  {
    id: 'fc-8',
    domainId: 'A',
    term: 'Permanent Product Recording',
    definition: 'Measuring the tangible physical outcome or environmental effect produced by a behavior rather than directly observing the behavior.',
    exampleScenario: 'Counting the number of correctly solved math problems on a completed worksheet after session.',
    bacbCode: 'A.3',
    difficulty: 'Easy',
  },

  // --- DOMAIN B: BEHAVIOR ASSESSMENT ---
  {
    id: 'fc-9',
    domainId: 'B',
    term: 'Multiple Stimulus Without Replacement (MSWO)',
    definition: 'A preference assessment where an array of items is presented; once an item is selected, it is removed from subsequent arrays, quickly yielding a preference hierarchy.',
    exampleScenario: 'Presenting 5 toys; client picks train. Train is removed; remaining 4 toys are rearranged for trial 2.',
    bacbCode: 'B.1',
    difficulty: 'Hard',
  },
  {
    id: 'fc-10',
    domainId: 'B',
    term: 'Functional Behavior Assessment (ABC Data Collection)',
    definition: 'Recording descriptive data on the environmental events immediately preceding (Antecedent) and immediately following (Consequence) a behavior.',
    exampleScenario: 'Antecedent: Teacher says "Math time". Behavior: Screaming. Consequence: Sent to timeout. Hypothesized Function: Escape.',
    bacbCode: 'B.3',
    difficulty: 'Medium',
  },

  // --- DOMAIN C: BEHAVIOR ACQUISITION ---
  {
    id: 'fc-11',
    domainId: 'C',
    term: 'Discriminative Stimulus (SD)',
    definition: 'An antecedent stimulus in the presence of which a specific response has historically been reinforced, signaling that reinforcement is currently available.',
    exampleScenario: 'The RBT holding up a picture of a dog and asking "What is this?" is an SD for saying "Dog".',
    bacbCode: 'C.1',
    difficulty: 'Easy',
  },
  {
    id: 'fc-12',
    domainId: 'C',
    term: 'Discrete Trial Training (DTT)',
    definition: 'A structured, adult-directed teaching method broken into clear components: SD → Prompt (if needed) → Learner Response → Consequence → Inter-Trial Interval.',
    exampleScenario: 'RBT says "Touch nose", prompts finger to nose, delivers edible and praise, pauses 3 seconds before next trial.',
    bacbCode: 'C.3',
    difficulty: 'Medium',
  },
  {
    id: 'fc-13',
    domainId: 'C',
    term: 'Backward Chaining',
    definition: 'A task analysis teaching procedure where the therapist completes all early steps, and the learner is taught and reinforced on the LAST step first.',
    exampleScenario: 'Therapist turns on tap, wets hands, applies soap, rinses hands; learner dries hands independently and receives praise.',
    bacbCode: 'C.6',
    difficulty: 'Medium',
  },
  {
    id: 'fc-14',
    domainId: 'C',
    term: 'Stimulus Generalization',
    definition: 'When a trained response occurs in the presence of novel, untrained stimuli that share similar physical properties.',
    exampleScenario: 'Child taught to say "Cup" for a blue plastic cup correctly says "Cup" when seeing a white ceramic mug.',
    bacbCode: 'C.10',
    difficulty: 'Medium',
  },

  // --- DOMAIN D: BEHAVIOR REDUCTION ---
  {
    id: 'fc-15',
    domainId: 'D',
    term: 'Differential Reinforcement of Alternative Behavior (DRA)',
    definition: 'Reinforcing a desirable, functionally equivalent replacement behavior while placing the problem behavior on extinction.',
    exampleScenario: 'Reinforcing hand-raising with teacher attention while ignoring shouting out in class (both serve attention function).',
    bacbCode: 'D.4',
    difficulty: 'Medium',
  },
  {
    id: 'fc-16',
    domainId: 'D',
    term: 'Differential Reinforcement of Other Behavior (DRO)',
    definition: 'Delivering reinforcement contingent on the complete ABSENCE (zero occurrences) of the problem behavior throughout a specified time interval.',
    exampleScenario: 'Delivering a token every 5 minutes that elapses with zero instances of skin-picking.',
    bacbCode: 'D.4',
    difficulty: 'Hard',
  },
  {
    id: 'fc-17',
    domainId: 'D',
    term: 'Extinction Burst',
    definition: 'A temporary, predictable increase in the frequency, duration, intensity, or variability of the target behavior when reinforcement is first withheld.',
    exampleScenario: 'A child screaming louder and kicking the door when the RBT stops responding to attention-maintained tantrums.',
    bacbCode: 'D.5',
    difficulty: 'Medium',
  },

  // --- DOMAIN E: DOCUMENTATION & REPORTING ---
  {
    id: 'fc-18',
    domainId: 'E',
    term: 'Objective Session Notes',
    definition: 'Written documentation describing observable client topographies, percentage scores, and clinical facts without subjective opinions or unobservable mood labels.',
    exampleScenario: '"Client independently emitted 16/20 mands and engaged in 2 instances of flopping lasting 45 seconds" instead of "Client was stubborn."',
    bacbCode: 'E.1',
    difficulty: 'Easy',
  },

  // --- DOMAIN F: ETHICS ---
  {
    id: 'fc-19',
    domainId: 'F',
    term: 'Dual Relationships & Gift Acceptance',
    definition: 'Under the RBT Ethics Code 2.0, RBTs must avoid multiple relationships that could impair objectivity, and may not accept gifts of significant monetary value.',
    exampleScenario: 'Politely declining a $100 department store gift card from a parent and explaining BACB professional boundary requirements.',
    bacbCode: 'F.2',
    difficulty: 'Easy',
  },
  {
    id: 'fc-20',
    domainId: 'F',
    term: '5% Monthly Supervision Requirement',
    definition: 'BACB requirement that an RBT must receive ongoing supervision for at least 5% of their total monthly behavior-analytic service hours across at least 2 synchronous contacts.',
    exampleScenario: 'An RBT providing 80 hours of direct ABA therapy in October must log at least 4 hours of BCBA supervision across 2 or more meetings.',
    bacbCode: 'F.3',
    difficulty: 'Easy',
  },
];
