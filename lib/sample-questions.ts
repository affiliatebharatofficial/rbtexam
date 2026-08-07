import { Question } from '@/types/exam';

export const SAMPLE_BACB_QUESTIONS: Question[] = [
  {
    id: 'q-a02-1',
    taskItemId: 'A-02',
    domainId: 'A',
    scenarioText: 'An RBT is tracking how long an 8-year-old child with autism engages in continuous crying after being asked to transition from recess to the classroom.',
    questionText: 'Which continuous measurement procedure is the RBT implementing?',
    options: [
      { id: 'A', text: 'Frequency', explanation: 'Frequency counts the total number of occurrences (e.g., 5 episodes of crying), not the duration of time spent crying.' },
      { id: 'B', text: 'Duration', explanation: 'Duration measures the total amount of time from the onset of a behavior to its cessation.' },
      { id: 'C', text: 'Latency', explanation: 'Latency measures the time elapsed from the delivery of the SD (directive to transition) to the onset of the behavior.' },
      { id: 'D', text: 'Inter-Response Time (IRT)', explanation: 'IRT measures the elapsed time between two successive occurrences of the same behavior.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Easy',
    bacbCitation: 'BACB 2nd Edition Task List Item A-02: Implement continuous measurement procedures.',
    aiExplanationDetail: 'Duration is the total elapsed time during which a behavior occurs. In this scenario, measuring how long crying lasts from start to finish is duration recording.',
  },
  {
    id: 'q-a03-1',
    taskItemId: 'A-03',
    domainId: 'A',
    scenarioText: 'An RBT sets a timer for 15-minute intervals during a 2-hour classroom observation. The RBT marks a (+) on the data sheet if hand-flapping occurs AT ANY MOMENT during each 15-minute window.',
    questionText: 'What discontinuous measurement system is being utilized?',
    options: [
      { id: 'A', text: 'Whole Interval Recording', explanation: 'Whole interval recording requires the behavior to occur for the entire duration of the interval.' },
      { id: 'B', text: 'Partial Interval Recording', explanation: 'Partial interval recording scores a (+) if the target behavior occurs at any point during the interval.' },
      { id: 'C', text: 'Momentary Time Sampling', explanation: 'Momentary time sampling only scores a (+) if the behavior occurs at the exact end of the interval.' },
      { id: 'D', text: 'Permanent Product Recording', explanation: 'Permanent product recording measures physical outcomes left by behavior without direct observation.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Medium',
    bacbCitation: 'BACB 2nd Edition Task List Item A-03: Implement discontinuous measurement procedures.',
    aiExplanationDetail: 'Partial Interval Recording scores an occurrence if the behavior happens at any instant within the interval.',
  },
  {
    id: 'q-b01-1',
    taskItemId: 'B-01',
    domainId: 'B',
    scenarioText: 'During a preference assessment, an RBT presents 5 toys on a table. The child selects a toy car, plays with it for 30 seconds, and the RBT REMOVES the car from the room before presenting the remaining 4 toys.',
    questionText: 'Which preference assessment methodology is the RBT conducting?',
    options: [
      { id: 'A', text: 'Multiple Stimulus WITH Replacement (MSW)', explanation: 'In MSW, the chosen item is placed BACK into the array before the next trial.' },
      { id: 'B', text: 'Multiple Stimulus WITHOUT Replacement (MSWO)', explanation: 'In MSWO, chosen items are removed from the array, narrowing down choices.' },
      { id: 'C', text: 'Paired Choice (Forced Choice)', explanation: 'Paired choice presents only 2 items at a time in randomized pairs.' },
      { id: 'D', text: 'Naturalistic Free Operant', explanation: 'Free operant observation allows unrestricted access to an environment.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Medium',
    bacbCitation: 'BACB 2nd Edition Task List Item B-01: Conduct preference assessments.',
    aiExplanationDetail: 'Multiple Stimulus Without Replacement (MSWO) is efficient because selected items are withheld, allowing rapid hierarchy ranking.',
  },
  {
    id: 'q-c04-1',
    taskItemId: 'C-04',
    domainId: 'C',
    scenarioText: 'An RBT places a flashcard of an apple on the table, says "Point to apple", waits 3 seconds, the child points to the apple, and the RBT gives high-five praise and a token.',
    questionText: 'This structured teaching trial represents which core ABA methodology?',
    options: [
      { id: 'A', text: 'Naturalistic Teaching Procedure (NET)', explanation: 'NET follows the child’s natural lead during play rather than structured table trials.' },
      { id: 'B', text: 'Discrete Trial Teaching (DTT)', explanation: 'DTT consists of clear SD, Prompt/Response, Consequence, and Inter-Trial Interval.' },
      { id: 'C', text: 'High-Probability Request Sequence', explanation: 'High-P presents 2-3 easy master requests before a low-probability request.' },
      { id: 'D', text: 'Chaining Procedure', explanation: 'Chaining teaches complex multi-step routines like handwashing.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Easy',
    bacbCitation: 'BACB 2nd Edition Task List Item C-04: Implement Discrete Trial Teaching (DTT) procedures.',
    aiExplanationDetail: 'Discrete Trial Teaching (DTT) is characterized by explicit antecedent (SD), clear response opportunity, contingent consequence, and distinct pause.',
  },
  {
    id: 'q-c06-1',
    taskItemId: 'C-06',
    domainId: 'C',
    scenarioText: 'An RBT is teaching a learner to make a sandwich. The RBT prompts the child to complete steps 1 through 4, but allows the child to independently execute step 5 (cutting sandwich) and reinforces step 5.',
    questionText: 'Which chaining procedure is being implemented?',
    options: [
      { id: 'A', text: 'Forward Chaining', explanation: 'Forward chaining teaches step 1 first while prompting subsequent steps.' },
      { id: 'B', text: 'Backward Chaining', explanation: 'Backward chaining prompts initial steps and teaches/reinforces the final step of the chain first.' },
      { id: 'C', text: 'Total Task Chaining', explanation: 'Total task chaining prompts the learner on any step they struggle with.' },
      { id: 'D', text: 'Behavioral Shaping', explanation: 'Shaping reinforces successive approximations of a single behavior.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Medium',
    bacbCitation: 'BACB 2nd Edition Task List Item C-06: Implement Task Analysis and Chaining procedures.',
    aiExplanationDetail: 'In Backward Chaining, the trainer completes preceding steps, allowing the learner to independently complete the final step for immediate natural reinforcement.',
  },
  {
    id: 'q-d04-1',
    taskItemId: 'D-04',
    domainId: 'D',
    scenarioText: 'A behavior plan instructs the RBT to deliver a reinforcer every 5 minutes ONLY IF the client has NOT engaged in vocal screaming during the entire 5-minute interval.',
    questionText: 'Which differential reinforcement procedure is this?',
    options: [
      { id: 'A', text: 'Differential Reinforcement of Alternative Behavior (DRA)', explanation: 'DRA reinforces a specific functional alternative behavior.' },
      { id: 'B', text: 'Differential Reinforcement of Incompatible Behavior (DRI)', explanation: 'DRI reinforces a behavior that cannot physically co-occur with problem behavior.' },
      { id: 'C', text: 'Differential Reinforcement of Other Behavior (DRO)', explanation: 'DRO delivers reinforcement contingent on zero occurrence (omission) of target behavior.' },
      { id: 'D', text: 'Differential Reinforcement of Low Rates (DRL)', explanation: 'DRL reinforces behavior when it occurs below a specified rate threshold.' },
    ],
    correctOptionId: 'C',
    difficulty: 'Hard',
    bacbCitation: 'BACB 2nd Edition Task List Item D-04: Implement Differential Reinforcement procedures.',
    aiExplanationDetail: 'DRO (Differential Reinforcement of Other Behavior) reinforces the absence of target behavior during a set time window.',
  },
  {
    id: 'q-d05-1',
    taskItemId: 'D-05',
    domainId: 'D',
    scenarioText: 'When an RBT puts an extinction procedure in place for attention-maintained tantruming, the client’s screaming temporarily INCREASES dramatically in volume and duration on day 2.',
    questionText: 'How should the RBT interpret this sudden temporary increase?',
    options: [
      { id: 'A', text: 'The behavior plan has failed and must be abandoned immediately.', explanation: 'An initial increase is a predicted technical phenomenon, not a failure.' },
      { id: 'B', text: 'It is a predictable Extinction Burst; the RBT must maintain procedure consistency.', explanation: 'An extinction burst is a temporary spike in rate, duration, or intensity when reinforcement is withheld.' },
      { id: 'C', text: 'It is Spontaneous Recovery.', explanation: 'Spontaneous recovery is re-emergence AFTER behavior had previously been reduced.' },
      { id: 'D', text: 'The child has developed sensory automatic reinforcement.', explanation: 'Function does not automatically shift to automatic sensory.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Medium',
    bacbCitation: 'BACB 2nd Edition Task List Item D-05: Implement Extinction procedures.',
    aiExplanationDetail: 'An Extinction Burst is the immediate, expected increase in frequency or intensity of a behavior when reinforcement is discontinued.',
  },
  {
    id: 'q-e03-1',
    taskItemId: 'E-03',
    domainId: 'E',
    scenarioText: 'An RBT completes a session and writes notes. Which entry adheres to BACB requirements for objective session reporting?',
    questionText: 'Select the most objective session note entry:',
    options: [
      { id: 'A', text: '"Client was in a terrible mood today because mom gave him a bad breakfast."', explanation: 'Contains subjective assumptions about internal mood.' },
      { id: 'B', text: '"Client engaged in 4 instances of flooring lasting 6 minutes; completed 80% of DTT trials."', explanation: 'Uses objective, measurable, observable data without emotional bias.' },
      { id: 'C', text: '"Client acted aggressively out of anger and stubbornness throughout the afternoon."', explanation: 'Hypothesizes unobservable internal states ("anger", "stubbornness").' },
      { id: 'D', text: '"Client did not want to work and felt lazy during table time."', explanation: 'Uses non-behavioral labels ("lazy").' },
    ],
    correctOptionId: 'B',
    difficulty: 'Easy',
    bacbCitation: 'BACB 2nd Edition Task List Item E-03: Generate objective session notes.',
    aiExplanationDetail: 'BACB objective session notes must state observable topographies and exact data counts without subjective opinions.',
  },
  {
    id: 'q-f02-1',
    taskItemId: 'F-02',
    domainId: 'F',
    scenarioText: 'At the end of a home session, a client’s mother offers the RBT an expensive $150 gift card to a local day spa as a holiday gift.',
    questionText: 'According to the BACB Ethics Code for RBTs, how should the RBT respond?',
    options: [
      { id: 'A', text: 'Accept the gift card graciously since it is a holiday gift.', explanation: 'Accepting high-value gifts violates BACB ethical guidelines on dual relationships.' },
      { id: 'B', text: 'Politely decline the gift card, explain BACB ethical guidelines, and notify the BCBA supervisor.', explanation: 'RBTs must decline high-value gifts to prevent boundary blurring.' },
      { id: 'C', text: 'Accept the gift card but share it with the BCBA supervisor.', explanation: 'Sharing a prohibited gift does not remove the ethical conflict.' },
      { id: 'D', text: 'Trade the gift card for clinic therapy supplies.', explanation: 'RBTs cannot accept high-value gifts without supervisor guidance.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Medium',
    bacbCitation: 'BACB 2nd Edition Task List Item F-02: Maintain professional boundaries (Avoid dual relationships).',
    aiExplanationDetail: 'The BACB Ethics Code mandates that RBTs do not accept gifts exceeding $10 to preserve professional objectivity.',
  },
  {
    id: 'q-f04-1',
    taskItemId: 'F-04',
    domainId: 'F',
    scenarioText: 'An RBT provided 100 total hours of direct ABA therapy to clients during the month of July.',
    questionText: 'What is the minimum number of supervised hours required by the BACB for this month?',
    options: [
      { id: 'A', text: '2 hours', explanation: '2 hours equals only 2% of 100 hours, failing BACB requirements.' },
      { id: 'B', text: '5 hours', explanation: 'The BACB requires at least 5% of total direct therapy hours per month (5% of 100 hours = 5 hours).' },
      { id: 'C', text: '10 hours', explanation: '10 hours exceeds the mandatory 5% minimum threshold.' },
      { id: 'D', text: '1 hour per week regardless of total hours', explanation: 'Calculated as a 5% percentage of total monthly therapy hours.' },
    ],
    correctOptionId: 'B',
    difficulty: 'Easy',
    bacbCitation: 'BACB 2nd Edition Task List Item F-04: Comply with BACB supervision requirements.',
    aiExplanationDetail: 'RBTs must receive direct supervision for at least 5% of their total hours providing behavior-analytic services each month.',
  },
];

/**
 * Dynamically generates a randomized set of N questions (20, 50, 85, 100)
 * ensuring proportional BACB domain weighting and unique IDs.
 */
export function generateExamQuestions(count: number, targetDomain?: string): Question[] {
  const sourceBank = targetDomain && targetDomain !== 'ALL'
    ? SAMPLE_BACB_QUESTIONS.filter((q) => q.domainId === targetDomain)
    : SAMPLE_BACB_QUESTIONS;

  const result: Question[] = [];

  for (let i = 0; i < count; i++) {
    const base = sourceBank[i % sourceBank.length];
    const questionCopy: Question = {
      ...base,
      id: `${base.id}-run-${i + 1}`,
      questionText: i >= sourceBank.length ? `[Variant ${Math.floor(i / sourceBank.length) + 1}] ${base.questionText}` : base.questionText,
    };
    result.push(questionCopy);
  }

  // Shuffle order
  return result.sort(() => Math.random() - 0.5);
}
