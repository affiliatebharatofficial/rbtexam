export interface Flashcard {
  id: string;
  domainId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  term: string;
  definition: string;
  exampleScenario: string;
  bacbCode: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    domainId: 'A',
    term: 'Continuous Measurement',
    definition: 'Recording EVERY single instance of a target behavior during an observation period (Frequency, Duration, Latency, IRT).',
    exampleScenario: 'Tallying every time a client raises their hand during a 30-minute circle time.',
    bacbCode: 'A-02',
    difficulty: 'Easy',
  },
  {
    id: 'fc-2',
    domainId: 'A',
    term: 'Partial Interval Recording',
    definition: 'A discontinuous measurement system where a (+) is recorded if the behavior occurs at ANY POINT during the interval.',
    exampleScenario: 'Checking (+) if hand-flapping occurs even for 1 second during a 10-second interval. Overestimates behavior.',
    bacbCode: 'A-03',
    difficulty: 'Medium',
  },
  {
    id: 'fc-3',
    domainId: 'A',
    term: 'Whole Interval Recording',
    definition: 'A discontinuous measurement system where a (+) is recorded ONLY if the behavior persists throughout the ENTIRE interval.',
    exampleScenario: 'Marking (+) only if a student stays seated for all 60 seconds of a 1-minute interval. Underestimates behavior.',
    bacbCode: 'A-03',
    difficulty: 'Medium',
  },
  {
    id: 'fc-4',
    domainId: 'B',
    term: 'MSWO Preference Assessment',
    definition: 'Multiple Stimulus Without Replacement. Selected items are removed from subsequent arrays, yielding a ranked preference hierarchy quickly.',
    exampleScenario: 'Presenting 5 toys; client picks toy train. Train is removed; remaining 4 toys are rearranged for trial 2.',
    bacbCode: 'B-01',
    difficulty: 'Hard',
  },
  {
    id: 'fc-5',
    domainId: 'C',
    term: 'Discriminative Stimulus (SD)',
    definition: 'An antecedent stimulus present in the environment that signals reinforcement is available for a specific behavior.',
    exampleScenario: 'The RBT saying "Touch red" is the SD; touching red yields reinforcement.',
    bacbCode: 'C-04',
    difficulty: 'Easy',
  },
  {
    id: 'fc-6',
    domainId: 'C',
    term: 'Backward Chaining',
    definition: 'A task analysis teaching procedure where the therapist completes all early steps, and the learner is taught and reinforced on the LAST step first.',
    exampleScenario: 'Therapist turns on tap, wets hands, applies soap, rinses hands; child dries hands independently and receives praise.',
    bacbCode: 'C-06',
    difficulty: 'Medium',
  },
  {
    id: 'fc-7',
    domainId: 'D',
    term: 'Differential Reinforcement of Other Behavior (DRO)',
    definition: 'Delivering reinforcement contingent on ZERO instances of the target behavior during a specified duration.',
    exampleScenario: 'Giving a sticker every 10 minutes that elapses with zero biting occurrences.',
    bacbCode: 'D-04',
    difficulty: 'Hard',
  },
  {
    id: 'fc-8',
    domainId: 'D',
    term: 'Extinction Burst',
    definition: 'A temporary, predictable increase in the frequency, intensity, or topography of a behavior when reinforcement is first withheld.',
    exampleScenario: 'A child screaming louder and kicking the door when the RBT stops responding to attention-seeking tantrums.',
    bacbCode: 'D-05',
    difficulty: 'Medium',
  },
  {
    id: 'fc-9',
    domainId: 'E',
    term: 'Objective Session Notes',
    definition: 'Written documentation describing observable client topographies, percentage scores, and clinical facts without subjective mood assumptions.',
    exampleScenario: '"Client completed 15/20 DTT trials independently" instead of "Client was happy and wanted to work."',
    bacbCode: 'E-03',
    difficulty: 'Easy',
  },
  {
    id: 'fc-10',
    domainId: 'F',
    term: '5% Monthly Supervision Rule',
    definition: 'BACB requirement that RBTs must receive direct supervision for at least 5% of their total monthly therapy hours across at least 2 contacts.',
    exampleScenario: 'An RBT working 80 hours in August must log at least 4 hours of BCBA supervision.',
    bacbCode: 'F-04',
    difficulty: 'Easy',
  },
];
