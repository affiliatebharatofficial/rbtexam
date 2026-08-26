import { SEOMetadata, InternalLink, GlossaryTerm, SEOHealthReport } from '@/types/seo';
import { SAMPLE_BACB_QUESTIONS } from './sample-questions';

const BASE_URL = 'https://www.rbtpracticeai.com';

/**
 * Builds standard Next.js Metadata Payload
 */
export function buildSEOMetadata(
  title: string,
  description: string,
  slugPath: string,
  keywords: string[] = ['RBT Practice AI', 'RBT Practice Exam', 'RBT Practice Test']
): SEOMetadata {
  const canonicalUrl = `${BASE_URL}${slugPath.startsWith('/') ? slugPath : `/${slugPath}`}`;

  // Optimize description length for Google SERP (max ~155-160 chars)
  const trimmedDesc = description.length > 158 ? `${description.slice(0, 155).trim()}...` : description;

  return {
    title: `${title} | RBT Practice AI`,
    description: trimmedDesc,
    slug: slugPath,
    canonicalUrl,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    keywords,
    ogImage: `${BASE_URL}/og-image.png`,
    pageType: 'pillar_page',
    certification: 'RBT',
    lastUpdated: new Date().toISOString(),
    readingTimeMinutes: 5,
    author: 'RBT Practice AI BCBA Editorial Team',
  };
}

/**
 * Generates JSON-LD Question & Answer Schema for Google Rich Snippets
 */
export function generateQuestionJSONLD(question: any) {
  const correctOpt = question.options?.find((o: any) => o.id === question.correctOptionId) || question.options?.[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question.questionText || question.question,
      text: question.scenarioText ? `${question.scenarioText} - ${question.questionText || question.question}` : (question.questionText || question.question),
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${correctOpt?.text || ''}. ${question.aiExplanationDetail || question.answerExplanation || ''}`,
        upvoteCount: 42,
        url: `${BASE_URL}/rbt/question/${question.id}`,
      },
    },
  };
}

/**
 * Generates JSON-LD Educational Course & Quiz Schema
 */
export function generateCourseJSONLD(certification: string = 'RBT') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Official ${certification} Exam Preparation & Practice Simulator`,
    description: `Complete ${certification} certification preparation platform with 85-question mock exams, Leitner flashcards, and Socrates AI Tutor mentorship.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'RBT Practice AI',
      sameAs: BASE_URL,
    },
    educationalCredentialAwarded: `${certification} Exam Pass Readiness Certification`,
    hasPart: [
      {
        '@type': 'LearningResource',
        name: '85-Question Official BACB Mock Exam Simulator',
        learningResourceType: 'Assessment',
      },
      {
        '@type': 'LearningResource',
        name: 'Leitner 5-Box Spaced Repetition Flashcards',
        learningResourceType: 'Study Guide',
      },
    ],
  };
}

/**
 * Generates JSON-LD BreadcrumbList Schema
 */
export function generateBreadcrumbJSONLD(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

/**
 * Internal Linking Engine: Resolves relevant related links to eliminate orphan pages
 */
export function getRelatedInternalLinks(currentCategory: string = 'Measurement'): InternalLink[] {
  return [
    { title: 'Full 85-Question RBT Mock Exam Simulator', url: '/rbt/mock-exam', category: 'Practice Test', relevanceScore: 98 },
    { title: 'Leitner 5-Box Spaced Repetition Flashcards', url: '/rbt/flashcards', category: 'Flashcards', relevanceScore: 95 },
    { title: 'Socrates AI Tutor BCBA Mentorship', url: '/tutor', category: 'AI Tutor', relevanceScore: 92 },
    { title: 'BACB RBT 3rd Edition Task List Study Guide', url: '/rbt/study-guide', category: 'Study Guide', relevanceScore: 90 },
    { title: 'ABA Clinical Glossary & Terminology Index', url: '/rbt/glossary', category: 'Glossary', relevanceScore: 88 },
  ];
}

/**
 * ABA Glossary Master Terms Store
 */
export const ABA_GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'duration-recording',
    term: 'Duration Recording',
    definition: 'A continuous measurement procedure that tracks the total elapsed time from the onset of a behavior to its cessation.',
    category: 'Data Collection and Graphing',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item A-02',
    clinicalExample: 'Recording that a client engaged in hand-washing for 25 continuous seconds.',
    mnemonicTip: 'Duration = Duration of time from Start to Finish.',
    relatedTerms: ['Latency', 'Frequency', 'Inter-Response Time (IRT)'],
  },
  {
    slug: 'partial-interval-recording',
    term: 'Partial Interval Recording',
    definition: 'A discontinuous measurement procedure where an observer marks (+) if the target behavior occurs at ANY MOMENT during the interval.',
    category: 'Data Collection and Graphing',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item A-03',
    clinicalExample: 'Marking a (+) if screaming occurs for 1 second during a 10-minute window.',
    mnemonicTip: 'PARTial = ANY PART of the interval counts.',
    relatedTerms: ['Whole Interval Recording', 'Momentary Time Sampling'],
  },
  {
    slug: 'whole-interval-recording',
    term: 'Whole Interval Recording',
    definition: 'A discontinuous measurement procedure where an observer marks (+) only if the target behavior persists for the ENTIRE duration of the interval.',
    category: 'Data Collection and Graphing',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item A-03',
    clinicalExample: 'Marking a (+) only if the learner maintains quiet on-task seat posture for the complete 30-second interval.',
    mnemonicTip: 'Whole = Behavior must last the WHOLE interval.',
    relatedTerms: ['Partial Interval Recording', 'Momentary Time Sampling'],
  },
  {
    slug: 'momentary-time-sampling',
    term: 'Momentary Time Sampling (MTS)',
    definition: 'A discontinuous measurement procedure where an observer records whether the behavior is occurring at the EXACT MOMENT the interval ends.',
    category: 'Data Collection and Graphing',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item A-03',
    clinicalExample: 'Looking at the student when the timer beeps at minute 5:00 to see if they are holding their pencil.',
    mnemonicTip: 'Momentary = At the MOMENT the timer beeps.',
    relatedTerms: ['Partial Interval Recording', 'Whole Interval Recording'],
  },
  {
    slug: 'latency',
    term: 'Latency',
    definition: 'A continuous measurement procedure that tracks the elapsed time between the presentation of a stimulus (SD) and the initiation of the response.',
    category: 'Data Collection and Graphing',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item A-02',
    clinicalExample: 'Measuring that it took 4 seconds for a student to stand up after the RBT gave the vocal prompt "Stand up".',
    mnemonicTip: 'Latency = Time from Prompt to Start.',
    relatedTerms: ['Duration Recording', 'Inter-Response Time (IRT)'],
  },
  {
    slug: 'inter-response-time-irt',
    term: 'Inter-Response Time (IRT)',
    definition: 'A continuous measurement procedure that measures the elapsed time between the offset of one instance of a behavior and the onset of the next consecutive instance.',
    category: 'Data Collection and Graphing',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item A-02',
    clinicalExample: 'Measuring 12 seconds between a client taking one bite of food and taking the next bite.',
    mnemonicTip: 'IRT = In-between Response Time.',
    relatedTerms: ['Rate', 'Latency', 'Duration Recording'],
  },
  {
    slug: 'rate-frequency',
    term: 'Rate & Frequency',
    definition: 'Frequency is the direct count of behavior occurrences. Rate is frequency divided by time (e.g., responses per minute or hour).',
    category: 'Data Collection and Graphing',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item A-01',
    clinicalExample: 'Counting 15 instances of hand-raising across a 30-minute circle time (Rate = 0.5 raises/minute).',
    mnemonicTip: 'Rate = Count over Time.',
    relatedTerms: ['Duration Recording', 'Inter-Response Time (IRT)'],
  },
  {
    slug: 'preference-assessment',
    term: 'Preference Assessment',
    definition: 'Structured procedures used to identify potential reinforcers by evaluating which items or activities a learner chooses or approaches most frequently.',
    category: 'Behavior Assessment',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item B-02',
    clinicalExample: 'Presenting 5 toys simultaneously in a Multiple Stimulus Without Replacement (MSWO) array to rank client preferences.',
    mnemonicTip: 'Preference = What the client Likes.',
    relatedTerms: ['Reinforcer Assessment', 'Functional Behavior Assessment (FBA)'],
  },
  {
    slug: 'functional-behavior-assessment-fba',
    term: 'Functional Behavior Assessment (FBA)',
    definition: 'An assessment method designed to determine the environmental variables and specific function(s) maintaining a challenging behavior (SEAT: Sensory, Escape, Attention, Tangible).',
    category: 'Behavior Assessment',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item B-03',
    clinicalExample: 'Collecting ABC data during transitions to identify that aggression consistently results in escape from demands.',
    mnemonicTip: 'FBA = Find the Function.',
    relatedTerms: ['ABC Data Collection', 'Preference Assessment'],
  },
  {
    slug: 'abc-data-collection',
    term: 'ABC Data Collection',
    definition: 'A continuous descriptive assessment recording the Antecedent (what happened immediately before), the Behavior (operational definition), and the Consequence (what happened immediately after).',
    category: 'Behavior Assessment',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item B-01',
    clinicalExample: 'Antecedent: Teacher says "Math time" -> Behavior: Crying -> Consequence: Work is delayed for 5 minutes.',
    mnemonicTip: 'ABC = Antecedent, Behavior, Consequence.',
    relatedTerms: ['Functional Behavior Assessment (FBA)', 'Three-Term Contingency'],
  },
  {
    slug: 'discrete-trial-training-dtt',
    term: 'Discrete Trial Training (DTT)',
    definition: 'A structured teaching method that breaks down skills into discrete, repeated instructional units consisting of an Antecedent/SD, Prompt/Response, and Consequence/Reinforcement.',
    category: 'Behavior Acquisition',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item C-02',
    clinicalExample: 'RBT says "Touch blue" (SD), learner touches blue card (Response), RBT delivers praise + token (Consequence).',
    mnemonicTip: 'DTT = Distinct, structured desk trials.',
    relatedTerms: ['Naturalistic Teaching (NET)', 'Prompt Fading'],
  },
  {
    slug: 'naturalistic-teaching-net',
    term: 'Naturalistic Teaching / Incidental Teaching (NET)',
    definition: 'Teaching skills within the learner’s natural environment during everyday routines, capitalizing on the learner’s current motivation (MO).',
    category: 'Behavior Acquisition',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item C-03',
    clinicalExample: 'Teaching manding for "bubbles" while playing outside when the child reaches toward the bubble wand.',
    mnemonicTip: 'NET = Natural Environment Training.',
    relatedTerms: ['Discrete Trial Training (DTT)', 'Motivating Operations (MO)'],
  },
  {
    slug: 'task-analysis-chaining',
    term: 'Task Analysis & Chaining (Forward, Backward, Total Task)',
    definition: 'Breaking a complex multi-step skill into smaller, teachable sequential components and reinforcing the links in order.',
    category: 'Behavior Acquisition',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item C-04',
    clinicalExample: 'Backward chaining for shoe-tying where the RBT performs steps 1–4 and reinforces the learner for pulling the final knot tight (step 5).',
    mnemonicTip: 'Chaining = Connecting links in a chain.',
    relatedTerms: ['Shaping', 'Prompt Hierarchy'],
  },
  {
    slug: 'shaping',
    term: 'Shaping',
    definition: 'Systematically and differentially reinforcing successive approximations toward a predetermined terminal target behavior.',
    category: 'Behavior Acquisition',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item C-06',
    clinicalExample: 'Reinforcing "buh", then "bah", then "ball" as the child gets closer to vocalizing the full word.',
    mnemonicTip: 'Shaping = Sculpting closer and closer to the goal.',
    relatedTerms: ['Differential Reinforcement', 'Chaining'],
  },
  {
    slug: 'stimulus-control-transfer',
    term: 'Stimulus Control Transfer',
    definition: 'A procedure where prompt fading is utilized so that response control transfers from an artificial prompt (e.g., physical guidance) to the natural discriminative stimulus (SD).',
    category: 'Behavior Acquisition',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item C-08',
    clinicalExample: 'Fading a hand-over-hand prompt to a gestural point until the learner claps solely upon hearing "Clap hands".',
    mnemonicTip: 'Transfer = Passing the baton to the natural SD.',
    relatedTerms: ['Prompt Hierarchy', 'Prompt Fading'],
  },
  {
    slug: 'prompt-hierarchy-fading',
    term: 'Prompt Hierarchy & Prompt Fading',
    definition: 'Supplemental antecedent stimuli provided to assist the learner in emitting the correct response, faded systematically from Most-to-Least (MTL) or Least-to-Most (LTM).',
    category: 'Behavior Acquisition',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item C-09',
    clinicalExample: 'Fading from Full Physical -> Partial Physical -> Model -> Gestural -> Verbal -> Independent.',
    mnemonicTip: 'Prompt = Temporary training wheels.',
    relatedTerms: ['Stimulus Control Transfer', 'Errorless Learning'],
  },
  {
    slug: 'token-economy',
    term: 'Token Economy',
    definition: 'A reinforcement system where learners earn generalized conditioned reinforcers (tokens) for displaying target behaviors, which are later exchanged for backup reinforcers.',
    category: 'Behavior Acquisition',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item C-11',
    clinicalExample: 'Earning 5 star tokens for completing math tasks, then exchanging them for 10 minutes of iPad time.',
    mnemonicTip: 'Token = Currency for backup prizes.',
    relatedTerms: ['Conditioned Reinforcement', 'Schedules of Reinforcement'],
  },
  {
    slug: 'differential-reinforcement-dro',
    term: 'Differential Reinforcement of Other Behavior (DRO)',
    definition: 'A behavior reduction procedure that delivers reinforcement contingent on the ZERO occurrence (omission) of the target behavior for a specified time interval.',
    category: 'Behavior Reduction',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item D-04',
    clinicalExample: 'Delivering a token every 5 minutes if the learner does NOT engage in flooring.',
    mnemonicTip: 'DRO = ZERO instances of target behavior.',
    relatedTerms: ['DRA (Alternative)', 'DRI (Incompatible)', 'DRL (Low Rates)'],
  },
  {
    slug: 'differential-reinforcement-dra',
    term: 'Differential Reinforcement of Alternative Behavior (DRA)',
    definition: 'A behavior reduction procedure that reinforces an appropriate alternative replacement behavior that serves the same functional outcome while placing problem behavior on extinction.',
    category: 'Behavior Reduction',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item D-04',
    clinicalExample: 'Reinforcing hand-raising with attention while withholding attention when the student shouts out answers.',
    mnemonicTip: 'DRA = Alternate functional behavior.',
    relatedTerms: ['DRO (Other)', 'DRI (Incompatible)', 'Extinction'],
  },
  {
    slug: 'differential-reinforcement-dri',
    term: 'Differential Reinforcement of Incompatible Behavior (DRI)',
    definition: 'A behavior reduction procedure that reinforces a topographically incompatible behavior that cannot physically occur at the same time as the target problem behavior.',
    category: 'Behavior Reduction',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item D-04',
    clinicalExample: 'Reinforcing keeping hands in pockets (incompatible with hair-pulling) during hallway transitions.',
    mnemonicTip: 'DRI = Physically Impossible to do both.',
    relatedTerms: ['DRA (Alternative)', 'DRO (Other)', 'Extinction'],
  },
  {
    slug: 'extinction-and-extinction-burst',
    term: 'Extinction & Extinction Burst',
    definition: 'Extinction is the discontinuing of reinforcement for a previously reinforced behavior. An Extinction Burst is a temporary, predictable increase in the frequency, intensity, or variability of the behavior immediately following extinction implementation.',
    category: 'Behavior Reduction',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item D-05',
    clinicalExample: 'Ignoring screaming that was maintained by attention; screaming initially becomes louder and more frequent before declining.',
    mnemonicTip: 'Burst = Worse before it gets better.',
    relatedTerms: ['Differential Reinforcement', 'Spontaneous Recovery'],
  },
  {
    slug: 'motivating-operations-mo',
    term: 'Motivating Operations (MO / EO / AO)',
    definition: 'Environmental events that alter the value of a reinforcer (value-altering) and alter the current frequency of all behavior that has previously obtained that reinforcer (behavior-altering).',
    category: 'Behavior Reduction',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item D-02',
    clinicalExample: 'Deprivation of water (Establishing Operation - EO) increases the momentary value of water and evokes asking for water.',
    mnemonicTip: 'EO = Eager / Want it more; AO = Already full / Want it less.',
    relatedTerms: ['Discriminative Stimulus (SD)', 'Three-Term Contingency'],
  },
  {
    slug: 'objective-session-notes',
    term: 'Objective Session Notes',
    definition: 'Documentation written in measurable, observable, behavioral terms without subjective emotional interpretations or internal state assumptions.',
    category: 'Documentation and Reporting',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item E-02',
    clinicalExample: 'Writing "Client engaged in 4 instances of crying lasting total of 6 mins" instead of "Client was sad and in a bad mood today".',
    mnemonicTip: 'Objective = Only what you can See and Measure.',
    relatedTerms: ['Mandatory Reporting', 'BACB Supervision'],
  },
  {
    slug: 'mandatory-abuse-reporting',
    term: 'Mandatory Abuse Reporting',
    definition: 'The legal obligation of RBTs as mandated reporters to report any suspected abuse, neglect, or exploitation of vulnerable individuals immediately according to state law and agency protocol.',
    category: 'Documentation and Reporting',
    bacbCitation: 'BACB RBT 3rd Edition TCO Item E-01',
    clinicalExample: 'Immediately contacting your BCBA supervisor and child protective services upon observing unexplained severe bruising on a client.',
    mnemonicTip: 'Mandatory = Immediate legal requirement.',
    relatedTerms: ['RBT Ethics Code 2.0', 'Supervision Requirements'],
  },
  {
    slug: 'rbt-ethics-code-supervision',
    term: 'BACB Supervision & Ethics Code 2.0 Requirements',
    definition: 'RBTs must receive ongoing supervision for a minimum of 5% of the total hours spent providing behavior-analytic services each calendar month, with at least 2 face-to-face synchronous meetings (1 must be individual/direct observation).',
    category: 'Professional Conduct',
    bacbCitation: 'BACB RBT Ethics Code 2.0 Item 1.01-3.07',
    clinicalExample: 'Logging 100 client service hours in July requires at least 5 hours of documented supervision from a qualified BACB supervisor.',
    mnemonicTip: '5% Minimum & 2 Face-to-Face meetings per month.',
    relatedTerms: ['Objective Session Notes', 'Dual Relationships'],
  },
];
