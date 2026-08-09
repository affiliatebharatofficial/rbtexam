import { PromptTemplate, PromptMode, ChatMessage } from '@/types/ai-tutor';
import { buildCandidateSystemContext, formatSystemDirective } from './ai-candidate-memory';
import { BACB_TASK_LIST_3RD_EDITION } from './bacb-task-list';

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
 * Multi-Provider LLM Executor for AI Tutor Chat
 */
async function callLLMProviderForTutor(
  systemDirective: string,
  historyMessages: { role: string; content: string }[],
  userQuery: string
): Promise<string | null> {
  const keys: Record<string, string | undefined> = {
    openai: process.env.OPENAI_API_KEY,
    deepseek: process.env.DEEPSEEK_API_KEY,
    gemini: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    openrouter: process.env.OPENROUTER_API_KEY,
  };

  const providers = ['openai', 'deepseek', 'gemini', 'anthropic', 'openrouter'];

  for (const p of providers) {
    const key = keys[p];
    if (!key || key.includes('mock-')) continue;

    try {
      if (p === 'openai') {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: systemDirective }, ...historyMessages, { role: 'user', content: userQuery }],
            temperature: 0.7,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content || null;
        }
      } else if (p === 'deepseek') {
        const res = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'system', content: systemDirective }, ...historyMessages, { role: 'user', content: userQuery }],
            temperature: 0.7,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content || null;
        }
      } else if (p === 'gemini') {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemDirective}\n\nCandidate Question: ${userQuery}` }] }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
        }
      } else if (p === 'openrouter') {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: 'auto',
            messages: [{ role: 'system', content: systemDirective }, ...historyMessages, { role: 'user', content: userQuery }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content || null;
        }
      } else if (p === 'anthropic') {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 2000,
            messages: [{ role: 'user', content: `${systemDirective}\n\nCandidate Question: ${userQuery}` }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          return data.content?.[0]?.text || null;
        }
      }
    } catch (err) {
      console.error(`AI Tutor provider '${p}' failed:`, err);
    }
  }

  return null;
}

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

  // 1. Attempt LLM Provider Execution (Multi-Model AI Engine)
  const systemDirective = `${formatSystemDirective(candidateContext, mode)}
You are Socrates AI, an elite Senior BCBA Clinical Mentor for ${certification} candidates preparing for the BACB RBT 3rd Edition Test Content Outline (TCO) exam.
Provide a clear, encouraging, structured response. Respond in valid JSON if possible with keys: "content" (markdown string response), "concept", "simpleExplanation", "clinicalExample", "examTip", "mnemonicTip", "commonMistakes".`;

  const historyMessages = history.slice(-4).map((m) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.content,
  }));

  const rawLLMResponse = await callLLMProviderForTutor(systemDirective, historyMessages, cleanQuery);

  if (rawLLMResponse) {
    try {
      const cleaned = rawLLMResponse.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      let parsedJSON: any = null;
      if (cleaned.startsWith('{')) {
        parsedJSON = JSON.parse(cleaned);
      }

      if (parsedJSON && (parsedJSON.content || parsedJSON.simpleExplanation)) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          content: parsedJSON.content || parsedJSON.explanation || `### 💡 Socrates AI Analysis: "${cleanQuery}"\n\n${parsedJSON.simpleExplanation}`,
          timestamp: new Date().toISOString(),
          clinicalInsight: {
            concept: parsedJSON.concept || cleanQuery.slice(0, 40),
            simpleExplanation: parsedJSON.simpleExplanation || `Clinical analysis of ${cleanQuery} for ${certification} candidates.`,
            clinicalExample: parsedJSON.clinicalExample || `Example: In ABA session, apply operational criteria when implementing ${cleanQuery}.`,
            examTip: parsedJSON.examTip || 'BACB Exam Tip: Prioritize objective data collection and client dignity.',
            mnemonicTip: parsedJSON.mnemonicTip || undefined,
            commonMistakes: parsedJSON.commonMistakes || undefined,
          },
        };
      }

      // Plain Markdown response from LLM
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: rawLLMResponse,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: cleanQuery.slice(0, 40),
          simpleExplanation: `Clinical ABA analysis of "${cleanQuery}" for ${certification} candidates.`,
          clinicalExample: `In a clinical setting, evaluate environmental variables, antecedents, and consequences.`,
          examTip: 'Focus on observable behavior definitions and BACB Task List competencies.',
          mnemonicTip: 'Remember: Baseline Data -> Task Analysis -> Prompt Hierarchy -> Generalization.',
        },
      };
    } catch (e) {
      // Return raw LLM response as markdown if JSON parsing fails
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: rawLLMResponse,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // 2. Dynamic Socratic ABA Knowledge & ABC Scenario Deconstruction Engine (Fallback)

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
      content: `### 📋 Clinical ABC Scenario Analysis for: "${cleanQuery}"\n\nAs your supervising BCBA, let's break down this clinical scenario into its core behavioral components according to the **BACB RBT 3rd Edition Test Content Outline (TCO)**.`,
      timestamp: new Date().toISOString(),
      scenarioAnalysis: {
        problemBehavior: `Learner engages in ${matchedSubject} upon presentation of a task demand or transition.`,
        antecedent: 'RBT presents a discriminative stimulus (SD) or transition prompt ("Time to put toys away and work").',
        behavior: `Learner displays ${matchedSubject} lasting 30-90 seconds.`,
        consequence: 'RBT delivers functional communication prompt or temporary demand removal.',
        replacementBehavior: 'Functional Communication Training (FCT): Learner is taught to hand a "Break Please" PECS card or say "I need a break".',
        interventionStrategy: 'Differential Reinforcement of Alternative Behavior (DRA) combined with proactive visual schedule timers and high-probability request sequences.',
        reinforcementSchedule: 'Continuous reinforcement (FR1) for functional communication; Extinction for problem behavior.',
        ethicalConsiderations: 'RBT Ethics Code 2.0: Ensure client dignity, physical safety, and least restrictive procedural safeguards.',
        documentationTip: 'Record onset, duration, latency, and inter-response time (IRT) in session data log immediately following trial.',
      },
    };
  }

  // Measurement Procedures
  if (queryLower.includes('latency') || queryLower.includes('duration') || queryLower.includes('frequency') || queryLower.includes('irt') || queryLower.includes('measurement') || queryLower.includes('rate')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### ⏱️ Socratic Mentorship: Continuous Measurement Procedures (A-01 - A-04)\n\nIn ABA continuous measurement, we track every occurrence of behavior:\n\n1. **Latency**: Time elapsed between SD delivery and response initiation (SD -> Start).\n2. **Duration**: Total time elapsed from response start to response finish (Start -> Stop).\n3. **Frequency / Rate**: Count of behavior occurrences per unit of time (e.g. 5 occurrences / hour).\n4. **Inter-Response Time (IRT)**: Time elapsed between two consecutive behavior instances (Stop 1 -> Start 2).`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: 'Continuous Measurement (Latency, Duration, Frequency, IRT)',
        simpleExplanation: 'Continuous measurement records every instance of behavior without sampling intervals.',
        clinicalExample: 'Latency: RBT says "Sit down", timer starts, client sits 4 seconds later -> Latency = 4s.\nDuration: Client cries for 12 minutes -> Duration = 12 min.',
        examTip: 'Exam Trigger Words: "Instruction to start" = Latency. "Start to finish" = Duration. "Between two behaviors" = IRT.',
        mnemonicTip: 'SD -> Start = Latency. Start -> Stop = Duration. Stop 1 -> Start 2 = IRT.',
        commonMistakes: 'Candidates often confuse Latency with Duration. Look for "instruction delivered" as the trigger for Latency.',
      },
    };
  }

  // Differential Reinforcement
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
      },
    };
  }

  // Verbal Operants
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
      },
    };
  }

  // Extinction
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
      },
    };
  }

  // DTT vs NET
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
      },
    };
  }

  // Match query against BACB Task List items
  let matchedTask = BACB_TASK_LIST_3RD_EDITION.flatMap((d) => d.items).find((item) =>
    item.keyConcepts.some((kc) => queryLower.includes(kc.toLowerCase())) ||
    item.title.toLowerCase().includes(queryLower) ||
    queryLower.includes(item.id.toLowerCase())
  );

  // General Fallback for any other query
  const titleTopic = matchedTask ? `${matchedTask.id}: ${matchedTask.title}` : cleanQuery;
  const descriptionText = matchedTask ? matchedTask.description : `Clinical behavior analytic analysis of ${cleanQuery}.`;

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    content: `### 💡 Socratic BCBA Mentorship: "${cleanQuery}"\n\nGreat question! Let's examine **${titleTopic}** under the **BACB RBT 3rd Edition Test Content Outline (TCO)**.\n\nIn Applied Behavior Analysis, we break down concepts into observable environmental variables, antecedents, behaviors, and consequences.\n\n**Core Clinical Principles:**\n- ${descriptionText}\n- Always prioritize least restrictive, evidence-based procedures.\n- Ensure objective data measurement and BCBA supervisor alignment.`,
    timestamp: new Date().toISOString(),
    clinicalInsight: {
      concept: titleTopic,
      simpleExplanation: descriptionText,
      clinicalExample: `Clinical Session Application: When working with a client on "${cleanQuery}", collect baseline data, follow your BCBA intervention plan, and reinforce target independent responses.`,
      examTip: `BACB Exam Strategy: On questions about ${cleanQuery}, eliminate answer choices that use subjective language or unapproved punishment techniques.`,
      mnemonicTip: 'Identify Function -> Define Operationally -> Collect Objective Data -> Apply Reinforcement.',
      commonMistakes: 'Selecting interventions based on hypothetical internal states rather than observable environmental variables.',
    },
  };
}
