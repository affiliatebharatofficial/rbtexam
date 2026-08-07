import { NextRequest, NextResponse } from 'next/server';
import { createQuestion } from '@/lib/master-question-bank';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topicPrompt, certification, difficulty, count, bacbTaskCode, provider, apiKey } = body;

    const targetTopic = topicPrompt?.trim() || 'Applied Behavior Analysis Core Concepts';
    const certLevel = certification || 'RBT';
    const diff = difficulty || 'medium';
    const quantity = Math.min(50, Math.max(1, parseInt(count) || 3));
    const taskCode = bacbTaskCode || 'A-01';

    // Provider & Key resolution
    const effectiveOpenAiKey = apiKey || process.env.OPENAI_API_KEY;
    const effectiveGeminiKey = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const effectiveDeepSeekKey = apiKey || process.env.DEEPSEEK_API_KEY;
    const effectiveOpenRouterKey = apiKey || process.env.OPENROUTER_API_KEY;
    const effectiveAnthropicKey = apiKey || process.env.ANTHROPIC_API_KEY;

    const selectedProvider = (provider || 'auto').toLowerCase();

    let generatedQuestions: any[] = [];
    let usedProvider = 'Fallback Dynamic Generator';

    const systemPrompt = `You are an expert Senior BCBA Exam Item Writer for BACB 2nd Edition Certification. Generate EXACTLY ${quantity} realistic, high-yield ${certLevel} multiple choice practice exam questions focusing on topic "${targetTopic}" (${diff} difficulty, Task Code ${taskCode}).
Return ONLY a valid JSON object matching this schema:
{
  "questions": [
    {
      "question": "Clear stem asking a question...",
      "scenarioText": "Clinical scenario describing client background, antecedent, and behavior...",
      "options": [
        { "id": "A", "text": "Option A choice", "explanation": "Detailed explanation why A is correct or distractor" },
        { "id": "B", "text": "Option B choice", "explanation": "Detailed explanation..." },
        { "id": "C", "text": "Option C choice", "explanation": "Detailed explanation..." },
        { "id": "D", "text": "Option D choice", "explanation": "Detailed explanation..." }
      ],
      "correctOptionId": "A",
      "clinicalExplanation": "Full clinical rationale citing BACB Task List principles...",
      "bacbCitation": "BACB 2nd Edition Task List Item ${taskCode}",
      "category": "Behavior Reduction"
    }
  ]
}`;

    // 1. OPENAI API
    if (
      (selectedProvider === 'openai' || selectedProvider === 'auto') &&
      effectiveOpenAiKey &&
      !effectiveOpenAiKey.includes('mock-') &&
      generatedQuestions.length === 0
    ) {
      try {
        const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${effectiveOpenAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: systemPrompt }],
            temperature: 0.7,
            response_format: { type: 'json_object' },
          }),
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
          if (parsed.questions && Array.isArray(parsed.questions)) {
            generatedQuestions = parsed.questions;
            usedProvider = 'OpenAI (gpt-4o-mini)';
          }
        }
      } catch (err) {
        console.error('OpenAI generation error:', err);
      }
    }

    // 2. GOOGLE GEMINI API
    if (
      (selectedProvider === 'gemini' || selectedProvider === 'auto') &&
      effectiveGeminiKey &&
      !effectiveGeminiKey.includes('mock-') &&
      generatedQuestions.length === 0
    ) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${effectiveGeminiKey}`;
        const apiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: { response_mime_type: 'application/json', temperature: 0.7 },
          }),
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            if (parsed.questions && Array.isArray(parsed.questions)) {
              generatedQuestions = parsed.questions;
              usedProvider = 'Google Gemini 1.5 Flash';
            }
          }
        }
      } catch (err) {
        console.error('Gemini generation error:', err);
      }
    }

    // 3. DEEPSEEK API
    if (
      (selectedProvider === 'deepseek' || selectedProvider === 'auto') &&
      effectiveDeepSeekKey &&
      !effectiveDeepSeekKey.includes('mock-') &&
      generatedQuestions.length === 0
    ) {
      try {
        const apiRes = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${effectiveDeepSeekKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [{ role: 'system', content: systemPrompt }],
            temperature: 0.7,
            response_format: { type: 'json_object' },
          }),
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
          if (parsed.questions && Array.isArray(parsed.questions)) {
            generatedQuestions = parsed.questions;
            usedProvider = 'DeepSeek V3';
          }
        }
      } catch (err) {
        console.error('DeepSeek generation error:', err);
      }
    }

    // 4. OPENROUTER API
    if (
      (selectedProvider === 'openrouter' || selectedProvider === 'auto') &&
      effectiveOpenRouterKey &&
      !effectiveOpenRouterKey.includes('mock-') &&
      generatedQuestions.length === 0
    ) {
      try {
        const apiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${effectiveOpenRouterKey}`,
          },
          body: JSON.stringify({
            model: 'auto',
            messages: [{ role: 'system', content: systemPrompt }],
            temperature: 0.7,
            response_format: { type: 'json_object' },
          }),
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
          if (parsed.questions && Array.isArray(parsed.questions)) {
            generatedQuestions = parsed.questions;
            usedProvider = 'OpenRouter AI Engine';
          }
        }
      } catch (err) {
        console.error('OpenRouter generation error:', err);
      }
    }

    // 5. ANTHROPIC CLAUDE API
    if (
      (selectedProvider === 'anthropic' || selectedProvider === 'auto') &&
      effectiveAnthropicKey &&
      !effectiveAnthropicKey.includes('mock-') &&
      generatedQuestions.length === 0
    ) {
      try {
        const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': effectiveAnthropicKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 4000,
            messages: [{ role: 'user', content: systemPrompt }],
          }),
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          const text = data.content?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            if (parsed.questions && Array.isArray(parsed.questions)) {
              generatedQuestions = parsed.questions;
              usedProvider = 'Anthropic Claude 3.5';
            }
          }
        }
      } catch (err) {
        console.error('Anthropic generation error:', err);
      }
    }

    // 6. Dynamic High-Yield Procedural Fallback (When offline or no API keys set)
    if (generatedQuestions.length === 0) {
      usedProvider = 'ABA Clinical Procedural Engine';
      for (let i = 0; i < quantity; i++) {
        const indexNum = i + 1;
        const topicSlug = targetTopic.toLowerCase();

        let scenario = `In a clinical setting focused on "${targetTopic}", an ${certLevel} candidate is tasked with analyzing behavior data during trial #${indexNum}.`;
        let questionText = `[AI Generated Exam Question #${indexNum}] Which procedure best demonstrates compliance with BACB guidelines when implementing "${targetTopic}"?`;
        let correctId = (['A', 'B', 'C', 'D'][i % 4]) as 'A' | 'B' | 'C' | 'D';

        let options = [
          { id: 'A', text: `Apply systematic differential reinforcement and objective continuous measurement for ${targetTopic}.`, explanation: 'Correct! Continuous data collection combined with differential reinforcement aligns with BACB standards.' },
          { id: 'B', text: `Use subjective baseline estimates without supervising BCBA approval.`, explanation: 'Incorrect. Subjective estimates violate objective measurement standards.' },
          { id: 'C', text: `Discontinue trial prompts immediately upon first error.`, explanation: 'Incorrect. Prompt hierarchies require systematic fading, not immediate discontinuation.' },
          { id: 'D', text: `Substitute unverified non-contingent rewards for preferred backup items.`, explanation: 'Incorrect. Reinforcers must be functionally matched.' },
        ];

        if (topicSlug.includes('measurement') || topicSlug.includes('latency') || topicSlug.includes('frequency')) {
          scenario = `An RBT records data for a learner during transition routines. The BCBA requests accurate tracking of ${targetTopic}.`;
          questionText = `[AI Generated Batch #${indexNum}] When measuring ${targetTopic}, which observation parameter ensures scientific accuracy under BACB Task Item ${taskCode}?`;
        } else if (topicSlug.includes('dro') || topicSlug.includes('reinforcement')) {
          scenario = `A candidate is monitoring a learner engaging in challenging behavior. The treatment plan specifies differential reinforcement.`;
          questionText = `[AI Generated Batch #${indexNum}] What key criterion distinguishes the differential reinforcement strategy for "${targetTopic}"?`;
        }

        generatedQuestions.push({
          question: questionText,
          scenarioText: scenario,
          options,
          correctOptionId: correctId,
          clinicalExplanation: `Clinical analysis for ${targetTopic} under BACB Task Item ${taskCode}. Ensures evidence-based behavior modification principles.`,
          bacbCitation: `BACB 2nd Edition Task List Item ${taskCode}`,
          category: topicSlug.includes('measurement') ? 'Measurement' : topicSlug.includes('ethic') ? 'Ethics' : 'Skill Acquisition',
        });
      }
    }

    // Persist all generated questions into the Master Question Bank immediately
    const savedQuestions = generatedQuestions.map((q: any, i: number) => {
      return createQuestion({
        question: q.question || `Generated question #${i + 1} for ${targetTopic}`,
        scenarioText: q.scenarioText || `Scenario analysis for ${targetTopic}`,
        questionType: 'scenario_based',
        difficulty: diff,
        options: q.options || [
          { id: 'A', text: 'Option A', isCorrect: true, explanation: 'Correct answer' },
          { id: 'B', text: 'Option B', isCorrect: false, explanation: 'Incorrect choice' },
          { id: 'C', text: 'Option C', isCorrect: false, explanation: 'Incorrect choice' },
          { id: 'D', text: 'Option D', isCorrect: false, explanation: 'Incorrect choice' },
        ],
        correctAnswerId: q.correctOptionId || 'A',
        answerExplanation: q.clinicalExplanation || `Standard BACB answer explanation for ${targetTopic}`,
        clinicalExplanation: q.clinicalExplanation || `Clinical guidance for BACB Task List Item ${taskCode}`,
        references: q.bacbCitation || `BACB 2nd Edition Task List Item ${taskCode}`,
        examTips: `Focus on observable environmental variables and BACB Task List Item ${taskCode}.`,
        commonMistakes: 'Confusing correlation with causation or selecting subjective choices.',
        category: q.category || 'Behavior Reduction',
        subCategory: targetTopic,
        keywords: [targetTopic, certLevel, 'AI Generated', taskCode],
        taskListVersion: '2nd_edition',
        estimatedTimeSeconds: 60,
        tags: ['AI Generated', 'BACB Exam Item', certLevel],
        status: 'published',
        isPremium: false,
        isFeatured: true,
        certification: certLevel,
        createdBy: `AI Generator (${usedProvider})`,
        updatedBy: 'Super Admin System',
      });
    });

    return NextResponse.json({
      success: true,
      providerUsed: usedProvider,
      totalGenerated: savedQuestions.length,
      questions: savedQuestions,
    });
  } catch (error: any) {
    console.error('AI Question Generation API error:', error);
    return NextResponse.json({ error: error.message || 'AI Question Generation failed' }, { status: 500 });
  }
}
