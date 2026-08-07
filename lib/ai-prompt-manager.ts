import { PromptTemplate, PromptMode, ChatMessage } from '@/types/ai-tutor';
import { buildCandidateSystemContext, formatSystemDirective } from './ai-candidate-memory';
import { BACB_TASK_LIST_2ND_EDITION } from './bacb-task-list';

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
 * Intelligent Dynamic BCBA AI Tutor Response Processing
 * Generates topic-specific Socratic mentorship, ABC scenario deconstructions, and exam tips.
 */
export async function processAITutorMessage(
  userQuery: string,
  history: ChatMessage[],
  mode: PromptMode = 'socratic_mentor',
  certification: 'RBT' | 'BCaBA' | 'BCBA' = 'RBT'
): Promise<ChatMessage> {
  const candidateContext = buildCandidateSystemContext('default_user', certification);
  const cleanQuery = userQuery.trim();
  const queryLower = cleanQuery.toLowerCase();

  // 1. Attempt LLM Provider Execution (OpenAI / OpenRouter / Gemini)
  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey && !openAiKey.includes('mock-')) {
    try {
      const systemDirective = `${formatSystemDirective(candidateContext, mode)}\nYou are Socrates AI, an elite BCBA Clinical Mentor for ${certification} candidates. Respond thoughtfully and provide structured JSON with keys: content, concept, simpleExplanation, clinicalExample, examTip, mnemonicTip, commonMistakes.`;
      
      const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemDirective },
            ...history.slice(-4).map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.content })),
            { role: 'user', content: cleanQuery },
          ],
          temperature: 0.7,
        }),
      });

      const data = await apiRes.json();
      const rawText = data.choices?.[0]?.message?.content;
      if (rawText) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          content: rawText,
          timestamp: new Date().toISOString(),
          clinicalInsight: {
            concept: cleanQuery.slice(0, 40),
            simpleExplanation: `Clinical analysis of "${cleanQuery}" for ${certification} candidates.`,
            clinicalExample: `Example: In ABA session, when evaluating "${cleanQuery}", monitor environmental variables and BCBA protocol guidelines.`,
            examTip: 'Always verify behavior function and task list standards before selecting intervention procedures.',
            mnemonicTip: 'Remember: Baseline Data -> Task Analysis -> Prompt Hierarchy -> Generalization.',
          },
        };
      }
    } catch (llmErr) {
      console.error('LLM API call error, falling back to Socratic Knowledge Engine:', llmErr);
    }
  }

  // 2. Dynamic Socratic ABA Knowledge & ABC Scenario Deconstruction Engine

  // Scenario / ABC Analysis Mode
  if (
    mode === 'scenario_analyzer' ||
    queryLower.includes('scenario') ||
    queryLower.includes('antecedent') ||
    queryLower.includes('consequence') ||
    queryLower.includes('tantrum') ||
    queryLower.includes('screaming') ||
    queryLower.includes('flopping') ||
    queryLower.includes('aggression') ||
    queryLower.includes('hitting')
  ) {
    const matchedSubject = queryLower.includes('screaming')
      ? 'vocal screaming'
      : queryLower.includes('hitting') || queryLower.includes('aggression')
      ? 'physical aggression'
      : queryLower.includes('flopping')
      ? 'flopping to floor'
      : 'target problem behavior';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### 📋 Clinical ABC Scenario Analysis for: "${cleanQuery}"\n\nAs your supervising BCBA, let's break down this clinical scenario into its core behavioral components according to the **BACB 2nd Edition Task List**.`,
      timestamp: new Date().toISOString(),
      scenarioAnalysis: {
        problemBehavior: `Learner engages in ${matchedSubject} upon presentation of a task demand or transition.`,
        antecedent: 'RBT presents a discriminative stimulus (SD) or transition prompt ("Time to put toys away and work").',
        behavior: `Learner displays ${matchedSubject} lasting 30-90 seconds.`,
        consequence: 'RBT delivers functional communication prompt or temporary demand removal.',
        replacementBehavior: 'Functional Communication Training (FCT): Learner is taught to hand a "Break Please" PECS card or say "I need a break".',
        interventionStrategy: 'Differential Reinforcement of Alternative Behavior (DRA) combined with proactive visual schedule timers and high-probability request sequences.',
        reinforcementSchedule: 'Continuous reinforcement (FR1) for functional communication; Extinction for problem behavior.',
        ethicalConsiderations: 'BACB Ethics Code Section 2.01: Ensure client dignity, physical safety, and least restrictive procedural safeguards.',
        documentationTip: 'Record onset, duration, latency, and inter-response time (IRT) in session data log immediately following trial.',
      },
    };
  }

  // Match query against BACB Task List items
  let matchedTask = BACB_TASK_LIST_2ND_EDITION.flatMap((d) => d.items).find((item) =>
    item.keyConcepts.some((kc) => queryLower.includes(kc.toLowerCase())) ||
    item.title.toLowerCase().includes(queryLower) ||
    queryLower.includes(item.id.toLowerCase())
  );

  // Concept-specific dynamic generators
  if (queryLower.includes('dro') || queryLower.includes('dra') || queryLower.includes('dri') || queryLower.includes('drh') || queryLower.includes('drl') || queryLower.includes('differential reinforcement')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### 🎯 Socratic Mentorship: Differential Reinforcement Procedures\n\nYou asked about **Differential Reinforcement**, a core BACB Task List topic (Item D-04)!\n\nIn ABA, **Differential Reinforcement** means reinforcing ONE desirable behavior while putting the problem behavior on **Extinction**.\n\nHere is how to differentiate the 3 main types on your ${certification} exam:\n\n1. **DRO (Other Behavior)**: Reinforces **ZERO** instances of problem behavior during an interval (Omission).\n2. **DRA (Alternative Behavior)**: Reinforces a specific **Alternative** functionally equivalent behavior.\n3. **DRI (Incompatible Behavior)**: Reinforces a behavior that **cannot physically occur** at the same time as problem behavior (e.g. hands in pockets vs pinching).`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: 'Differential Reinforcement (DRO vs DRA vs DRI)',
        simpleExplanation: 'Reinforce target desirable behavior while withholding reinforcement (extinction) for problem behavior.',
        clinicalExample: 'DRO: Give a token every 5 min if learner DOES NOT hit (Zero hitting).\nDRA: Give a token when learner hands a "Help" card instead of hitting.\nDRI: Reinforce learner for clapping hands (incompatible with hitting).',
        examTip: 'Exam Golden Rule: DRO = ZERO occurrences (Omission). DRA = Alternative functional behavior. DRI = Physically incompatible.',
        mnemonicTip: 'DRO = ZERO occurrences. DRA = Alternative card. DRI = Incompatible hands.',
        commonMistakes: 'Confusing DRO with DRA. Remember DRO requires ZERO occurrences during the entire time interval.',
        relatedTopics: ['D-04 Differential Reinforcement', 'Extinction Bursts', 'Functional Communication Training (FCT)'],
        suggestedFlashcards: ['fc-rbt-003', 'fc-rbt-001'],
      },
    };
  }

  if (queryLower.includes('mand') || queryLower.includes('tact') || queryLower.includes('echoic') || queryLower.includes('intraverbal') || queryLower.includes('verbal operant')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### 🗣️ Socratic Mentorship: Verbal Operants (B-04)\n\nB.F. Skinner classified verbal behavior by its **controlling variables** (Antecedents and Consequences):\n\n- **MAND** = Request controlled by a **Motivating Operation (MO)** (e.g., Thirsty -> says "Water" -> receives water).\n- **TACT** = Labeling controlled by a **Non-Verbal Stimulus** (e.g., Sees a dog -> says "Dog" -> social praise).\n- **ECHOIC** = Repeating controlled by a **Verbal SD with point-to-point correspondence** (e.g., Hears "Ball" -> says "Ball").\n- **INTRAVERBAL** = Conversational response controlled by a **Verbal SD without point-to-point correspondence** (e.g., "Ready, set..." -> says "Go!").`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: 'Skinnerian Verbal Operants (Mand, Tact, Echoic, Intraverbal)',
        simpleExplanation: 'Verbal behavior is categorized by what triggers it (Antecedent) and what maintains it (Consequence).',
        clinicalExample: 'Mand: Child wants juice (MO) and says "Juice". Tact: Child sees an airplane and points saying "Plane".',
        examTip: 'Exam Key: MAND is the ONLY verbal operant directly controlled by a Motivating Operation (MO) and produces a specific reinforcer.',
        mnemonicTip: 'MAND = Demand/Must have. TACT = Contact with senses. ECHOIC = Echo. INTRAVERBAL = Interview/Conversation.',
        commonMistakes: 'Thinking Mands are only vocal. Mands can be PECS, sign language, or AAC device selections!',
        relatedTopics: ['B-04 Verbal Operants', 'Functional Communication Training', 'PECS'],
      },
    };
  }

  if (queryLower.includes('extinction') || queryLower.includes('extinction burst')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### 🛑 Socratic Mentorship: Extinction & Extinction Bursts (D-05)\n\n**Extinction** occurs when reinforcement for a previously reinforced behavior is **completely discontinued**, resulting in the behavior decreasing over time.\n\n⚠️ **CRITICAL EXAM CONCEPT: Extinction Burst**\nWhen extinction is first implemented, the problem behavior will often **temporarily increase in frequency, intensity, or duration** before decreasing. Spontaneous recovery may also occur later.`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: 'Extinction & Extinction Bursts (D-05)',
        simpleExplanation: 'Discontinuing reinforcement for a behavior to decrease its future frequency.',
        clinicalExample: 'If a child screams to get candy at the checkout counter and the parent stops giving candy, the child may scream louder at first (Burst) before stopping.',
        examTip: 'Never stop extinction during an extinction burst, or you will inadvertently reinforce a higher intensity behavior!',
        mnemonicTip: 'Burst = Temporary Spike before Drop.',
        commonMistakes: 'Mistaking an extinction burst for a failed intervention. Bursts are normal indicators that extinction is working!',
        relatedTopics: ['D-05 Extinction', 'Extinction Bursts', 'Spontaneous Recovery'],
      },
    };
  }

  if (queryLower.includes('dtt') || queryLower.includes('discrete trial') || queryLower.includes('net') || queryLower.includes('naturalistic')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### 🧩 Socratic Mentorship: DTT vs NET Teaching Procedures (C-01 & C-02)\n\n- **Discrete Trial Teaching (DTT)**: Structured, adult-led, fast-paced trials with clear antecedents (SD), prompts, responses, and artificial reinforcers in a low-distraction setting.\n- **Naturalistic Teaching Procedures (NET)**: Child-led, embedded in play and natural routines, utilizing naturally occurring motivating operations (MOs) and natural reinforcers.`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: 'Discrete Trial Teaching (DTT) vs Naturalistic Teaching (NET)',
        simpleExplanation: 'DTT is structured desk training; NET is teaching embedded in play and natural activities.',
        clinicalExample: 'DTT: "Touch red" at table with flashcards. NET: "Pass me the red car" while playing with toy trains.',
        examTip: 'DTT has 5 distinct components: 1. SD, 2. Prompt, 3. Response, 4. Reinforcer/Correction, 5. Inter-Trial Interval.',
        mnemonicTip: 'DTT = Desk & Trials. NET = Natural & Play.',
        commonMistakes: 'Thinking NET lacks structure. NET is highly structured but follows learner interest.',
        relatedTopics: ['C-01 Discrete Trial Teaching', 'C-02 Naturalistic Teaching', 'Prompt Hierarchies'],
      },
    };
  }

  // Fallback for any general query
  const titleTopic = matchedTask ? `${matchedTask.id}: ${matchedTask.title}` : cleanQuery;
  const descriptionText = matchedTask ? matchedTask.description : `Clinical behavior analytic analysis of ${cleanQuery}.`;

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    content: `### 💡 Socratic BCBA Mentorship: "${cleanQuery}"\n\nGreat question! Let's examine **${titleTopic}** under the **BACB 2nd Edition Task List**.\n\nIn Applied Behavior Analysis, we break down concepts into observable environmental variables, antecedents, behaviors, and consequences.\n\n**Core Clinical Principles:**\n- ${descriptionText}\n- Always prioritize least restrictive, evidence-based procedures.\n- Ensure objective data measurement and BCBA supervisor alignment.`,
    timestamp: new Date().toISOString(),
    clinicalInsight: {
      concept: titleTopic,
      simpleExplanation: descriptionText,
      clinicalExample: `Clinical Session Application: When working with a client on "${cleanQuery}", collect baseline data, follow your BCBA intervention plan, and reinforce target independent responses.`,
      examTip: `BACB Exam Strategy: On questions about ${cleanQuery}, eliminate answer choices that use subjective language or unapproved punishment techniques.`,
      mnemonicTip: 'Identify Function -> Define Operationally -> Collect Objective Data -> Apply Reinforcement.',
      commonMistakes: 'Selecting interventions based on hypothetical internal states rather than observable environmental variables.',
      relatedTopics: matchedTask?.keyConcepts || ['Functions of Behavior', 'BACB Ethics Code', 'Objective Data Measurement'],
    },
  };
}
