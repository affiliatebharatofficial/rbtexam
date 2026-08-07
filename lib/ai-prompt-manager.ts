import { PromptTemplate, PromptMode, ChatMessage, AIUsageLog } from '@/types/ai-tutor';
import { buildCandidateSystemContext, formatSystemDirective } from './ai-candidate-memory';

export const SYSTEM_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'pt-socratic-01',
    mode: 'socratic_mentor',
    title: 'BCBA Socratic Learning Mentor',
    systemPrompt: 'You are Socrates AI, an expert BCBA mentor. Guide the candidate step-by-step through ABA concepts using Socratic questioning, clinical scenarios, and exam strategies.',
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000,
    isActive: true,
    version: 1,
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'pt-scenario-01',
    mode: 'scenario_analyzer',
    title: 'Clinical ABC Scenario Analyzer',
    systemPrompt: 'Deconstruct the provided clinical scenario into Antecedent, Behavior, Consequence, Function, Replacement Behavior, and Ethical Considerations.',
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.5,
    maxTokens: 1200,
    isActive: true,
    version: 1,
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
];

/**
 * Simulates intelligent BCBA AI Tutor response processing
 * with structured clinical insights, scenario breakdowns, and exam tips.
 */
export async function processAITutorMessage(
  userQuery: string,
  history: ChatMessage[],
  mode: PromptMode = 'socratic_mentor',
  certification: 'RBT' | 'BCaBA' | 'BCBA' = 'RBT'
): Promise<ChatMessage> {
  const candidateContext = buildCandidateSystemContext('default_user', certification);
  const directive = formatSystemDirective(candidateContext, mode);

  const queryLower = userQuery.toLowerCase();

  // 1. SCENARIO ANALYSIS MODE DETECTOR
  if (queryLower.includes('scenario') || queryLower.includes('antecedent') || queryLower.includes('tantrum') || queryLower.includes('crying')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `Here is the full ABC Clinical Scenario Breakdown for your scenario.`,
      timestamp: new Date().toISOString(),
      scenarioAnalysis: {
        problemBehavior: 'Vocal screaming and flopping during classroom transition.',
        antecedent: 'Verbal demand delivered by RBT ("Time to put toys away and sit at desk").',
        behavior: 'Child screams, drops to floor, and pushes table away.',
        consequence: 'RBT delivers immediate escape or attention (depending on function).',
        replacementBehavior: 'Functional Communication Training (FCT): Learner hands "I need a 2-minute break" card.',
        interventionStrategy: 'Differential Reinforcement of Alternative Behavior (DRA) combined with proactive visual schedule timers.',
        reinforcementSchedule: 'Continuous reinforcement (FR1) for handing break card; Extinction (escape extinction) for floor screaming.',
        ethicalConsiderations: 'BACB Ethics Code 2.01: Ensure client safety and physical well-being during flopping episodes without physical restraint.',
        documentationTip: 'Log exact latency from demand to screaming onset and total duration of flooring episode in session notes.',
      },
    };
  }

  // 2. DIFFERENTIAL REINFORCEMENT QUERY
  if (queryLower.includes('dro') || queryLower.includes('dra') || queryLower.includes('reinforcement')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `Great question on Differential Reinforcement! This is a **high-priority weak topic** (${candidateContext.weakTopics[0]}) for your ${certification} exam. Let's master it together.`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: 'Differential Reinforcement (DRO vs. DRA vs. DRI)',
        simpleExplanation: 'Differential Reinforcement involves reinforcing ONLY the target desirable behavior (or omission of problem behavior) while placing problem behavior on Extinction.',
        clinicalExample: 'DRO: Giving a token every 5 mins IF child does NOT scream (Zero screaming).\nDRA: Giving a token when child hands "Help" card instead of screaming.',
        examTip: 'Exam Key Rule: DRO = ZERO instances (Omission). DRA = Alternative Functional Behavior. DRI = Incompatible Behavior (cannot physically co-occur).',
        mnemonicTip: 'DRO = ZERO. DRA = Alternative Card. DRI = Incompatible Hands in Pockets.',
        commonMistakes: 'Confusing DRO with DRA. Remember DRO requires zero instances of the target behavior during the interval.',
        relatedTopics: ['D-04 Differential Reinforcement', 'Extinction Bursts', 'Functional Communication Training'],
        suggestedFlashcards: ['fc-rbt-003', 'fc-rbt-001'],
      },
    };
  }

  // 3. DEFAULT SOCRATIC BCBA MENTOR RESPONSE
  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    content: `As your BCBA mentor preparing for the **${certification} Exam**, I'm here to break down this concept clearly. Let's analyze how the BACB 2nd Edition Task List evaluates this topic.`,
    timestamp: new Date().toISOString(),
    clinicalInsight: {
      concept: `${userQuery.slice(0, 30)}...`,
      simpleExplanation: `In applied behavior analysis, we evaluate environmental variables (antecedents and consequences) that maintain behavior functions (Escape, Attention, Access to Tangibles, Sensory Automatic).`,
      clinicalExample: 'When an RBT delivers a demand (SD), the learner receives reinforcement for completing the trial independently or with prompted assistance.',
      examTip: 'Always identify the function of behavior BEFORE selecting a behavior reduction intervention.',
      mnemonicTip: 'E-A-T-S = Escape, Attention, Tangible, Sensory.',
      commonMistakes: 'Selecting punishment procedures before trying differential reinforcement and antecedent modifications.',
      relatedTopics: ['Functions of Behavior', 'Discrete Trial Teaching', 'Objective Data Reporting'],
    },
  };
}
