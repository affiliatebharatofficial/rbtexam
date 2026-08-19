import { PromptTemplate, PromptMode, ChatMessage } from '@/types/ai-tutor';
import { buildCandidateSystemContext, formatSystemDirective } from './ai-candidate-memory';
import { getRuntimeEnv } from '@/lib/supabase';

export const SYSTEM_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'pt-socratic-01',
    mode: 'socratic_mentor',
    title: 'BCBA Socratic Learning Mentor',
    systemPrompt: 'You are Socrates AI — RBT Practice AI\'s AI Tutor, an expert BCBA mentor. Guide the candidate step-by-step through ABA concepts using Socratic questioning, clinical scenarios, and exam strategies.',
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

export interface LLMResult {
  text: string;
  provider: string;
  model: string;
}

/**
 * Multi-Provider LLM Executor for AI Tutor Chat
 */
async function callLLMProviderForTutor(
  systemDirective: string,
  historyMessages: { role: string; content: string }[],
  userQuery: string,
  customApiKey?: string,
  preferredProvider: string = 'auto'
): Promise<LLMResult | null> {
  const keys: Record<string, string | undefined> = {
    openai: customApiKey || getRuntimeEnv('OPENAI_API_KEY'),
    gemini: customApiKey || getRuntimeEnv('GEMINI_API_KEY') || getRuntimeEnv('GOOGLE_GENERATIVE_AI_API_KEY'),
    deepseek: customApiKey || getRuntimeEnv('DEEPSEEK_API_KEY'),
    anthropic: customApiKey || getRuntimeEnv('ANTHROPIC_API_KEY'),
    openrouter: customApiKey || getRuntimeEnv('OPENROUTER_API_KEY'),
  };

  let providers = ['openai', 'gemini', 'deepseek', 'anthropic', 'openrouter'];
  if (preferredProvider !== 'auto' && keys[preferredProvider]) {
    providers = [preferredProvider, ...providers.filter((p) => p !== preferredProvider)];
  }

  for (const p of providers) {
    const key = keys[p];
    if (!key || key.trim() === '' || key.includes('mock-')) continue;

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
          const data = (await res.json()) as any;
          const text = data?.choices?.[0]?.message?.content;
          if (text) return { text, provider: 'OpenAI', model: 'gpt-4o-mini' };
        }
      } else if (p === 'gemini') {
        const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
        for (const m of models) {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemDirective }] },
              contents: [{ parts: [{ text: userQuery }] }],
            }),
          });
          if (res.ok) {
            const data = (await res.json()) as any;
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return { text, provider: 'Google Gemini', model: m };
          }
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
          const data = (await res.json()) as any;
          const text = data?.choices?.[0]?.message?.content;
          if (text) return { text, provider: 'DeepSeek', model: 'deepseek-chat' };
        }
      } else if (p === 'openrouter') {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: 'google/gemini-2.0-flash-001',
            messages: [{ role: 'system', content: systemDirective }, ...historyMessages, { role: 'user', content: userQuery }],
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as any;
          const text = data?.choices?.[0]?.message?.content;
          if (text) return { text, provider: 'OpenRouter', model: data?.model || 'auto' };
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
          const data = (await res.json()) as any;
          const text = data?.content?.[0]?.text;
          if (text) return { text, provider: 'Anthropic Claude', model: 'claude-3-5-haiku' };
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
  certification: 'RBT' | 'BCaBA' | 'BCBA' = 'RBT',
  customApiKey?: string,
  preferredProvider: string = 'auto',
  userProfile?: { fullName?: string; email?: string } | null,
  language: string = 'en'
): Promise<{ message: ChatMessage; providerUsed: string; modelUsed: string; isLive: boolean }> {
  const candidateContext = buildCandidateSystemContext('default_user', certification, userProfile);
  const cleanQuery = userQuery.trim();
  const queryLower = cleanQuery.toLowerCase();

  const isSpanish = language === 'es' || language.toLowerCase().includes('spanish');
  const langDirective = isSpanish
    ? 'IMPORTANT: You MUST speak and respond in fluent Spanish (Español). Use official BACB Spanish technical ABA terminology.'
    : `Respond in ${language}.`;

  const certOutlineTitle =
    certification === 'BCBA'
      ? 'BACB 6th Edition BCBA Test Content Outline (TCO)'
      : certification === 'BCaBA'
      ? 'BACB 6th Edition BCaBA Test Content Outline (TCO)'
      : 'BACB RBT 3rd Edition Test Content Outline (TCO)';

  // 1. Attempt LLM Provider Execution (Multi-Model AI Engine)
  const systemDirective = `${formatSystemDirective(candidateContext, mode)}
You are Socrates AI — RBT Practice AI's AI Tutor, an elite Senior BCBA Clinical Mentor for ${certification} candidates preparing for the ${certOutlineTitle} exam.
${langDirective}
Provide a clear, encouraging, structured response. Respond in valid JSON if possible with keys: "content" (markdown string response), "concept", "simpleExplanation", "clinicalExample", "examTip", "mnemonicTip", "commonMistakes".`;

  const historyMessages = history.slice(-4).map((m) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.content,
  }));

  const llmResult = await callLLMProviderForTutor(systemDirective, historyMessages, cleanQuery, customApiKey, preferredProvider);

  if (llmResult && llmResult.text) {
    const rawLLMResponse = llmResult.text;
    try {
      const cleaned = rawLLMResponse.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      let parsedJSON: any = null;
      if (cleaned.startsWith('{')) {
        parsedJSON = JSON.parse(cleaned);
      }

      if (parsedJSON && (parsedJSON.content || parsedJSON.simpleExplanation)) {
        return {
          message: {
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
          },
          providerUsed: llmResult.provider,
          modelUsed: llmResult.model,
          isLive: true,
        };
      }

      return {
        message: {
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
        },
        providerUsed: llmResult.provider,
        modelUsed: llmResult.model,
        isLive: true,
      };
    } catch (e) {
      return {
        message: {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          content: rawLLMResponse,
          timestamp: new Date().toISOString(),
        },
        providerUsed: llmResult.provider,
        modelUsed: llmResult.model,
        isLive: true,
      };
    }
  }

  // 2. Comprehensive Dynamic Socratic ABA Clinical Knowledge Base Engine
  // Covers BACB RBT 3rd Edition, BCaBA, and BCBA Test Content Outlines

  const matchTopic = (keywords: string[]) => keywords.some((kw) => queryLower.includes(kw));

  // A. Positive Reinforcement
  if (matchTopic(['positive reinforcement', 'add reinforcer', 'sr+', 'deliver stimulus'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### 🌟 Clinical Breakdown: **Positive Reinforcement (SR+)**\n\n**Definition**: The presentation of a stimulus immediately following a behavior that **increases or maintains the future frequency** of that behavior under similar environmental conditions.\n\n---\n\n### 🔬 Key BACB Principles:\n1. **Immediacy**: Deliver the reinforcer within 0–3 seconds of the target response to ensure contiguity.\n2. **Contingency**: The reinforcer is only delivered *if and only if* the target behavior occurs.\n3. **Individualization**: A stimulus is ONLY a reinforcer if objective data demonstrates that future behavior increases. (Preferences ≠ Reinforcers until functionally verified).\n\n---\n\n### 📝 Clinical ABC Example:\n- **Antecedent (SD)**: RBT presents math worksheet and says, *"Complete item 1."*\n- **Behavior (R)**: Learner completes item 1 independently.\n- **Consequence (SR+)**: RBT immediately delivers a token and enthusiastic praise (*"Awesome focus!"*).\n- **Future Effect**: Learner's independent worksheet completion increases over subsequent sessions.\n\n---\n\n### ⚠️ BACB Exam Trap & Strategy:\n*Exam Trap*: A question describes a teacher giving a student a gold star for sitting quietly, but the student's out-of-seat behavior remains unchanged next week.\n*Correct Answer*: This is **NOT** positive reinforcement because future behavior did not increase!`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'Positive Reinforcement (SR+)',
          simpleExplanation: 'Stimulus added immediately after behavior -> Future behavior increases.',
          clinicalExample: 'Child hands PECS card ("Juice") -> RBT gives 2oz juice -> Future PECS manding increases.',
          examTip: 'Exam Golden Rule: The term "Reinforcement" ALWAYS means future behavior increases or is maintained. "Positive" ALWAYS means a stimulus is added/presented.',
          mnemonicTip: 'Positive = PLUS (+ added) | Reinforcement = RISES (↑ future frequency)',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // B. Negative Reinforcement
  if (matchTopic(['negative reinforcement', 'escape', 'avoidance', 'sr-', 'remove aversive'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### 🛡️ Clinical Breakdown: **Negative Reinforcement (SR-)**\n\n**Definition**: The removal, termination, reduction, or postponement of an aversive stimulus immediately following a behavior that **increases or maintains the future frequency** of that behavior.\n\n---\n\n### 🔬 Escape vs Avoidance:\n- **Escape Behavior**: The aversive stimulus is already present, and the response terminates it (e.g., turning off a loud alarm clock).\n- **Avoidance Behavior**: The response prevents the aversive stimulus from occurring before it starts (e.g., leaving home 15 minutes early to avoid traffic).\n\n---\n\n### 📝 Clinical ABC Example:\n- **Antecedent**: Loud, noisy cafeteria environment (aversive noise present).\n- **Behavior**: Learner puts on noise-canceling headphones.\n- **Consequence (SR-)**: Aversive noise is removed/attenuated.\n- **Future Effect**: Learner puts on headphones more consistently in noisy rooms.\n\n---\n\n### ⚠️ BACB Exam Trap & Strategy:\n*Exam Trap*: Confusing Negative Reinforcement with Punishment! Negative reinforcement is NOT punishment. Reinforcement ALWAYS increases behavior. Negative simply means something was subtracted or removed.`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'Negative Reinforcement (SR-)',
          simpleExplanation: 'Aversive stimulus removed/avoided immediately after behavior -> Future behavior increases.',
          clinicalExample: 'Student signs "Break please" -> Teacher pauses math worksheet for 2 minutes -> Functional communication increases.',
          examTip: 'Remember: Negative Reinforcement = Relief (Aversive removed -> Behavior increases). Negative Punishment = Penalty (Preferred item removed -> Behavior decreases).',
          mnemonicTip: 'Negative = MINUS (- removed) | Reinforcement = RISES (↑ future frequency)',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // C. Differential Reinforcement (DRO, DRA, DRI, DRL)
  if (matchTopic(['dro', 'dra', 'dri', 'drl', 'differential reinforcement', 'other behavior', 'alternative behavior', 'incompatible'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### 🎯 Clinical Masterclass: **Differential Reinforcement Procedures**\n\nDifferential reinforcement combines **reinforcement** for desired behaviors with **extinction** for undesired problem behaviors.\n\n---\n\n### 📊 The 4 Core Differential Reinforcement Procedures:\n\n1. **DRA (Differential Reinforcement of Alternative Behavior)**:\n   - Reinforce a functionally equivalent alternative behavior (e.g., hand raising instead of calling out).\n   - The alternative behavior can occur at the same time as problem behavior theoretically, but serves the same function.\n\n2. **DRI (Differential Reinforcement of Incompatible Behavior)**:\n   - Reinforce a behavior that is physically IMPOSSIBLE to emit concurrently with the problem behavior (e.g., hands in pockets vs pinching).\n\n3. **DRO (Differential Reinforcement of Other Behavior / Zero Rates)**:\n   - Deliver reinforcement contingent on the ABSENCE / ZERO occurrences of problem behavior during a predetermined interval (e.g., 5 minutes without skin-picking).\n\n4. **DRL (Differential Reinforcement of Low Rates of Responding)**:\n   - Reinforce behavior when it occurs below a specified frequency criterion. Used to reduce (not eliminate) behaviors that are appropriate in moderation (e.g., asking for teacher assistance 3 times per hour instead of 20 times).\n\n---\n\n### ⚠️ BACB Exam Tip:\n*DRO = ZERO instances during time interval. DRI = Physically incompatible. DRA = Functional alternative.*`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'Differential Reinforcement (DRA / DRI / DRO / DRL)',
          simpleExplanation: 'Reinforcing target responses while withholding reinforcement (extinction) for target problem behavior.',
          clinicalExample: 'DRA: RBT reinforces vocal manding ("I want ball") on FR1 while placing physical aggression on extinction.',
          examTip: 'If the question specifies that the learner must NOT emit the behavior AT ALL during a 10-minute timer to get reinforcer, it is DRO (Differential Reinforcement of Other Behavior).',
          mnemonicTip: 'DRO = ZERO occurrences | DRI = IMPOSSIBLE together | DRA = ALTERNATIVE mand | DRL = LOWER rate',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // D. Continuous & Discontinuous Measurement
  if (matchTopic(['measurement', 'frequency', 'rate', 'duration', 'latency', 'irt', 'inter-response', 'partial interval', 'whole interval', 'momentary time sampling', 'permanent product'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### ⏱️ Clinical Masterclass: **BACB Measurement Procedures (Domain A)**\n\nMeasurement is the foundation of ABA. RBTs must know continuous vs discontinuous recording protocols.\n\n---\n\n### 1️⃣ Continuous Measurement (Every single instance is recorded):\n- **Frequency / Count**: Total number of occurrences (e.g., child raised hand 7 times).\n- **Rate**: Count per unit of time (e.g., 7 hand raises per hour). *Rate is preferred when session lengths vary.*\n- **Duration**: Total amount of time from onset to offset of behavior (e.g., tantrum lasted 4 minutes 20 seconds).\n- **Latency**: Time elapsed between the presentation of an SD and the initiation of the response (e.g., 5 seconds between *"Sit down"* and client sitting).\n- **Inter-Response Time (IRT)**: Elapsed time between the offset of one response and the onset of the next consecutive response (e.g., 12 seconds between bites of food).\n\n---\n\n### 2️⃣ Discontinuous Measurement (Sampled intervals):\n- **Whole Interval**: Behavior must occur throughout the **ENTIRE** interval. *(Underestimates behavior — best for increasing behaviors like on-task engagement)*.\n- **Partial Interval**: Behavior recorded if it occurs at **ANY POINT** during the interval. *(Overestimates behavior — best for reducing behaviors like vocal stereotypic yelling)*.\n- **Momentary Time Sampling**: Behavior recorded only if it is occurring at the **EXACT INSTANT** the interval ends. *(Practical when RBT is managing multiple clients)*.\n- **Permanent Product**: Measuring tangible physical outcome after behavior occurs (e.g., graded test, assembled widget). Does not require direct observation.",\n\n---\n\n### ⚠️ BACB Exam Trap:\n*Latency vs IRT*: Latency = SD to Response 1. IRT = Response 1 to Response 2!`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'BACB Measurement Protocols (Domain A)',
          simpleExplanation: 'Continuous records all instances (Rate, Duration, Latency, IRT); Discontinuous samples intervals (Whole, Partial, Momentary).',
          clinicalExample: 'Timer beeps every 10s: If learner screams at second 3, mark (+) for Partial Interval. For Whole Interval, learner must scream all 10s.',
          examTip: 'Partial Interval OVERESTIMATES overall duration/frequency. Whole Interval UNDERESTIMATES overall frequency.',
          mnemonicTip: 'Partial = ANY Part | Whole = ALL Whole time | Momentary = MOMENT timer beeps',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // E. Prompting & Prompt Fading
  if (matchTopic(['prompt', 'prompting', 'hierarchy', 'most to least', 'least to most', 'fading', 'gestural', 'verbal', 'physical', 'modeling'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### 🎯 Clinical Breakdown: **Prompt Hierarchy & Prompt Fading (Domain C)**\n\n**Prompt**: An antecedent stimulus added to increase the probability that a learner will emit the correct target behavior in the presence of the discriminative stimulus (SD).\n\n---\n\n### 🪜 The Prompt Hierarchy (Most-to-Least Intrusive):\n1. **Full Physical (Hand-over-hand)**: Guiding learner's hands through the complete motor sequence.\n2. **Partial Physical**: Guiding by elbow, wrist, or gentle tap.\n3. **Model**: Demonstrating the exact target response for the learner to imitate.\n4. **Gestural**: Pointing, nodding, or motioning toward the correct target stimulus.\n5. **Verbal (Full/Partial)**: Providing spoken cue or phonemic prompt (e.g., *"Say ball"* or *"B..."*).\n6. **Visual / Positional**: Placing target stimulus closer or showing picture cue.\n7. **Independent (SD Only)**: Natural stimulus control without supplemental prompts.\n\n---\n\n### 🔄 Transfer of Stimulus Control:\n- **Most-to-Least (Errorless Teaching)**: Start with highest prompt level to prevent errors during acquisition, then systematically fade.\n- **Least-to-Most**: Give opportunity to respond independently first (3–5s latency), only increasing prompt intrusive level if an error or hesitation occurs.\n- **Time Delay**: Gradually increasing the delay between SD and prompt (e.g., 0s delay -> 2s delay -> 4s delay).`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'Prompt Hierarchy & Stimulus Control (Item C-08)',
          simpleExplanation: 'Antecedent assistance systematically provided and faded to establish independent response to SD.',
          clinicalExample: 'Teaching tooth brushing: Full physical hand guidance -> Faded to elbow tap -> Faded to pointing at brush -> Independent.',
          examTip: 'The ultimate goal of prompt fading is to transfer stimulus control from the artificial prompt to the natural SD.',
          mnemonicTip: 'Hierarchy: Physical > Model > Gesture > Verbal > Visual > Independent',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // F. 4 Functions of Behavior
  if (matchTopic(['function', 'functions of behavior', 'sensory', 'escape', 'attention', 'tangible', 'seat'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### 🧠 Clinical Breakdown: **The 4 Functions of Behavior (SEAT)**\n\nAll human behavior serves a communicative or environmental function. Behavior Analysts classify behavior into 4 primary functions:\n\n---\n\n### 1. **Sensory / Automatic Reinforcement (S)**:\n- The behavior itself produces internal sensory stimulation or relief without socially mediated consequences from other people (e.g., hand flapping, rocking, nail biting).\n\n### 2. **Escape / Avoidance (E)**:\n- The behavior allows the learner to get away from an aversive demand, task, person, or sensory environment (e.g., screaming when math folder is opened).\n\n### 3. **Attention (A)**:\n- The behavior results in verbal, physical, or visual feedback from peers, parents, or staff (e.g., knocking over chair to make teacher react).\n\n### 4. **Tangible / Access (T)**:\n- The behavior allows the learner to gain access to a preferred item, toy, edible, or activity (e.g., crying in supermarket candy aisle until given lollipop).\n\n---\n\n### ⚠️ BACB Exam Trap:\n*Topography vs Function*: Two different behaviors (screaming vs flopping) can have the SAME function (Escape). Two identical behaviors (crying) can have DIFFERENT functions depending on the context!`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: '4 Functions of Behavior (SEAT)',
          simpleExplanation: 'Every behavior serves Sensory, Escape, Attention, or Tangible functions.',
          clinicalExample: 'A client screams during table work (Escape) vs screaming on playground when therapist talks to another child (Attention).',
          examTip: 'Interventions must ALWAYS match the verified function of the behavior (Functional Replacement).',
          mnemonicTip: 'S.E.A.T. = Sensory, Escape, Attention, Tangible',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // G. Extinction & Extinction Burst
  if (matchTopic(['extinction', 'extinction burst', 'spontaneous recovery', 'withhold reinforcement'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### 🛑 Clinical Breakdown: **Extinction & Extinction Burst (Domain D)**\n\n**Extinction**: A procedure in which reinforcement of a previously reinforced behavior is **discontinued/withheld**, resulting in a decrease in the future frequency of that behavior.\n\n---\n\n### ⚡ Crucial Extinction Phenomena:\n1. **Extinction Burst**: A predictable, temporary increase in the frequency, intensity, duration, and emotional variability of the problem behavior immediately after extinction is implemented.\n   *Clinical Rule*: RBTs must NEVER reinforce behavior during an extinction burst, or they will inadvertently shape high-intensity behavior!\n2. **Spontaneous Recovery**: The reappearance of the extinguished behavior after a period of time without reinforcement.\n3. **Function-Matched Extinction**:\n   - Attention Function -> Planned Ignoring / Withhold verbal and eye contact.\n   - Escape Function -> Escape Extinction / Non-removal of demand.\n   - Tangible Function -> Withhold access to requested item.\n   - Sensory Function -> Sensory Extinction / Attenuate automatic feedback.`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'Extinction & Extinction Burst (Item D-04)',
          simpleExplanation: 'Withholding the maintaining reinforcer -> Behavior initially spikes (burst), then declines.',
          clinicalExample: 'Vending machine takes dollar and gives no soda: You push button harder 5 times (burst) before walking away.',
          examTip: 'Extinction does NOT equal planned ignoring unless the maintaining function is attention! For escape-maintained behavior, you must use escape extinction (maintain demand).',
          mnemonicTip: 'Extinction = Reinforcer Cutoff | Burst = It gets worse before it gets better',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // H. Ethics & Supervision
  if (matchTopic(['ethics', 'supervision', 'dual relationship', 'gift', 'dignity', 'mandatory reporting', '5%'])) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### ⚖️ Clinical Breakdown: **BACB Ethics & Supervision Requirements (Domain F)**\n\nEthics is heavily tested on all BACB exams. As an RBT, maintaining professional boundaries and client dignity is legally and clinically mandated.\n\n---\n\n### 📋 Core BACB Ethical Standards:\n1. **Supervision Quota**: RBTs must receive ongoing supervision for at least **5% of the total hours** spent providing behavior-analytic services per calendar month.\n2. **Supervision Meetings**: At least **2 face-to-face contacts** per month, at least **1 of which must be direct observation** with a client.\n3. **Gift Policy**: RBTs must **NOT accept gifts** of monetary value from clients or families to prevent conflict of interest and dual relationships.\n4. **Dual Relationships**: RBTs must avoid multiple relationships (e.g., babysitting for a client family, dating a supervisor, social media friending).\n5. **Client Dignity**: Maintain age-appropriate language, provide privacy during personal care, and involve clients in choices whenever possible.\n6. **Mandatory Reporting**: RBTs are legally mandated reporters. Suspected abuse or neglect must be reported immediately according to state law and company policy.`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: 'BACB Ethics & Supervision Code (Domain F)',
          simpleExplanation: '5% monthly supervision hours, 2 meetings (1 direct observation), zero gifts, protect client dignity.',
          clinicalExample: 'Parent offers $25 coffee gift card at Christmas: RBT politely declines citing BACB Ethics Code compliance.',
          examTip: 'When in doubt on ethics questions: Protect client dignity, communicate immediately with your supervising BCBA, and adhere strictly to objective documentation.',
          mnemonicTip: 'Supervision Rule: 5% Hours • 2 Contacts • 1 Direct Observation',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

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
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### 📋 Clinical ABC Scenario Analysis for: "${cleanQuery}"\n\nAs your supervising BCBA, let's break down this clinical scenario into its core behavioral components according to the **${certOutlineTitle}**.\n\n---\n\n### 🧩 Behavioral Deconstruction:\n- **Target Behavior**: ${matchedSubject} emitted during instructional transition.\n- **Antecedent Variable**: Presentation of demand or removal of preferred activity.\n- **Maintaining Consequence**: Social attention or task avoidance.\n- **Replacement Mand (FCT)**: Teach learner to hand PECS card or request break.\n- **Differential Reinforcement (DRA)**: Reinforce functional mand on continuous FR1 schedule; maintain extinction for target behavior.`,
        timestamp: new Date().toISOString(),
        scenarioAnalysis: {
          problemBehavior: `Learner engages in ${matchedSubject} upon presentation of a task demand or transition.`,
          antecedent: 'Practitioner presents a discriminative stimulus (SD) or transition prompt ("Time to put toys away and work").',
          behavior: `Learner displays ${matchedSubject} lasting 30-90 seconds.`,
          consequence: 'Practitioner delivers functional communication prompt or temporary demand removal.',
          replacementBehavior: 'Functional Communication Training (FCT): Learner is taught to hand a "Break Please" PECS card or say "I need a break".',
          interventionStrategy: 'Differential Reinforcement of Alternative Behavior (DRA) combined with proactive visual schedule timers and high-probability request sequences.',
          reinforcementSchedule: 'Continuous reinforcement (FR1) for functional communication; Extinction for problem behavior.',
          ethicalConsiderations: 'Ethics Code for Behavior Analysts: Ensure client dignity, physical safety, and least restrictive procedural safeguards.',
          documentationTip: 'Record onset, duration, latency, and inter-response time (IRT) in session data log immediately following trial.',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // Question Explainer & Distractor Elimination Mode
  if (mode === 'question_explainer' || queryLower.includes('question') || queryLower.includes('option') || queryLower.includes('distractor')) {
    return {
      message: {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        content: `### ⚡ Question & Distractor Elimination Breakdown: "${cleanQuery}"\n\nLet's deconstruct this practice question item according to the **${certOutlineTitle}** rules:\n\n1. **Core Concept Analyzed**: Identify the primary behavioral principle in the question stem.\n2. **Correct Option Rationale**: The correct response aligns directly with least intrusive, objective measurement and functional reinforcement principles for ${certification} candidates.\n3. **Distractor Traps Avoided**: Incorrect choices often present subjective interpretations, improper prompt fading sequences, or unauthorized protocol modifications.\n\n*Pro Tip: Always look for answer choices that preserve client dignity and adhere strictly to BCBA-approved plans.*`,
        timestamp: new Date().toISOString(),
        clinicalInsight: {
          concept: `Distractor Analysis: ${cleanQuery.slice(0, 40)}`,
          simpleExplanation: `Deconstruction of question stem and option traps for ${certification} candidates.`,
          clinicalExample: 'Identify the functional relationship between stimulus control and reinforcement density.',
          examTip: `BACB ${certification} Exam Trap: Watch out for options that sound clinically plausible but violate procedural fidelity or supervision rules.`,
          mnemonicTip: 'Distractor Filter: Eliminate subjective descriptors, unauthorized plan changes, and punitive defaults.',
        },
      },
      providerUsed: 'Socrates BCBA Knowledge Engine',
      modelUsed: 'v3-clinical-core',
      isLive: false,
    };
  }

  // General Socratic Clinical Response
  return {
    message: {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### 🧩 Socratic Clinical Mentorship: "${cleanQuery}"\n\nTo master this concept for your **${certification} Exam**, let's analyze how the **${certOutlineTitle}** tests this competency.\n\n---\n\n### 🔍 Core Principles to Apply:\n1. **Operational Definition**: Define behaviors using observable, measurable, non-judgmental language (topography, intensity, frequency).\n2. **Functional Alignment**: Interventions must match the verified function (Sensory, Escape, Attention, Tangible).\n3. **Least Intrusive First**: Always implement positive reinforcement and proactive antecedent strategies before restrictive procedures.\n4. **Data-Driven Decisions**: Base all programming adjustments on objective graphed data.\n\n---\n\n### ❓ Socratic Reflection Question for You:\n*In your current clinical session, what antecedent variable would you manipulate to proactively decrease the likelihood of problem behavior before presenting your target SD?*`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: cleanQuery.slice(0, 45),
        simpleExplanation: `Operational definition and clinical implementation guidelines for ${cleanQuery} (${certification} level).`,
        clinicalExample: `Example: In a 1-on-1 ABA therapy session, record continuous measurement data while providing differential reinforcement.`,
        examTip: `BACB ${certification} Exam Rule: Always select options that prioritize least intrusive procedures and client safety.`,
        mnemonicTip: 'ABA Priority: Measurement -> Assessment -> Acquisition -> Behavior Reduction -> Ethics.',
      },
    },
    providerUsed: 'Socrates BCBA Knowledge Engine',
    modelUsed: 'v3-clinical-core',
    isLive: false,
  };
}
