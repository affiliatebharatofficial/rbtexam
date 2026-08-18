import { PromptTemplate, PromptMode, ChatMessage } from '@/types/ai-tutor';
import { buildCandidateSystemContext, formatSystemDirective } from './ai-candidate-memory';

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
    openai: customApiKey || process.env.OPENAI_API_KEY,
    gemini: customApiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    deepseek: customApiKey || process.env.DEEPSEEK_API_KEY,
    anthropic: customApiKey || process.env.ANTHROPIC_API_KEY,
    openrouter: customApiKey || process.env.OPENROUTER_API_KEY,
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

  // 2. Dynamic Socratic ABA Knowledge & ABC Scenario Deconstruction Engine (Fallback when no LLM Key is configured)

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
        content: `### 📋 Clinical ABC Scenario Analysis for: "${cleanQuery}"\n\nAs your supervising BCBA, let's break down this clinical scenario into its core behavioral components according to the **${certOutlineTitle}**.`,
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
      providerUsed: 'Socratic Engine',
      modelUsed: 'v3-knowledge-base',
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
      providerUsed: 'Socratic Engine',
      modelUsed: 'v3-knowledge-base',
      isLive: false,
    };
  }

  return {
    message: {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      content: `### 🧩 Socratic Mentorship: "${cleanQuery}"\n\nTo master this concept for your **${certification} Exam**, let's analyze how the **${certOutlineTitle}** evaluates this item.\n\nKey Focus Area: Ensure you operationalize definitions, identify functional relationships, and maintain client dignity at all times.`,
      timestamp: new Date().toISOString(),
      clinicalInsight: {
        concept: cleanQuery.slice(0, 45),
        simpleExplanation: `Operational definition and implementation guidelines for ${cleanQuery} (${certification} level).`,
        clinicalExample: `Example: In a 1-on-1 ABA therapy session, record continuous measurement data while providing differential reinforcement.`,
        examTip: `BACB ${certification} Exam Rule: Always select options that prioritize least intrusive procedures and client safety.`,
        mnemonicTip: 'ABA Priority: Measurement -> Assessment -> Acquisition -> Behavior Reduction.',
      },
    },
    providerUsed: 'Socratic Engine',
    modelUsed: 'v3-knowledge-base',
    isLive: false,
  };
}
