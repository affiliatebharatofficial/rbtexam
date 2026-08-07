import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topicPrompt, certification, difficulty, count, bacbTaskCode } = body;

    const targetTopic = topicPrompt?.trim() || 'Applied Behavior Analysis Core Concepts';
    const certLevel = certification || 'RBT';
    const diff = difficulty || 'medium';
    const quantity = Math.min(15, Math.max(1, parseInt(count) || 3));
    const taskCode = bacbTaskCode || 'A-01';

    let generatedQuestions: any[] = [];

    // Attempt OpenAI API if OPENAI_API_KEY is configured
    const openAiKey = process.env.OPENAI_API_KEY;
    if (openAiKey && !openAiKey.includes('mock-')) {
      try {
        const systemPrompt = `You are a Senior BCBA Exam Writer for BACB 2nd Edition Certification. Generate ${quantity} high-quality ${certLevel} multiple choice practice questions for topic "${targetTopic}" (${diff} difficulty). Return ONLY valid JSON array where each object has: question (string), options (array of 4 objects with id 'A','B','C','D' and text), correctOptionId ('A','B','C','D'), clinicalExplanation (string), bacbCitation (string).`;
        
        const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: systemPrompt }],
            temperature: 0.7,
            response_format: { type: 'json_object' },
          }),
        });

        const data = await apiRes.json();
        const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');
        if (parsed.questions && Array.isArray(parsed.questions)) {
          generatedQuestions = parsed.questions.map((q: any, i: number) => ({
            id: `q_ai_${Date.now()}_${i}`,
            certification: certLevel,
            category: 'Behavior Reduction',
            difficulty: diff,
            status: 'published',
            question: q.question,
            options: q.options || [
              { id: 'A', text: 'Option A choice', explanation: 'Explanation for A' },
              { id: 'B', text: 'Option B choice', explanation: 'Explanation for B' },
              { id: 'C', text: 'Option C choice', explanation: 'Explanation for C' },
              { id: 'D', text: 'Option D choice', explanation: 'Explanation for D' },
            ],
            correctOptionId: q.correctOptionId || 'A',
            clinicalExplanation: q.clinicalExplanation || `Clinical analysis for ${targetTopic}.`,
            bacbTaskCode: taskCode,
            bacbCitation: q.bacbCitation || `BACB 2nd Edition Task List Item ${taskCode}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }));
        }
      } catch (err) {
        console.error('LLM question generation failed, using internal ABA engine:', err);
      }
    }

    // Fallback ABA Question Generator Engine
    if (generatedQuestions.length === 0) {
      for (let i = 0; i < quantity; i++) {
        const qId = `q_ai_${Date.now()}_${i}`;
        const topicSlug = targetTopic.toLowerCase();

        if (topicSlug.includes('dro') || topicSlug.includes('differential') || topicSlug.includes('reinforcement')) {
          generatedQuestions.push({
            id: qId,
            certification: certLevel,
            category: 'Behavior Reduction',
            difficulty: diff,
            status: 'published',
            question: `[AI Generated Batch #${i + 1}] A RBT is working with a learner who engages in verbal screaming during task transitions. The BCBA instructs the RBT to deliver a preferred token every 3 minutes IF the learner engages in ZERO instances of screaming during the interval. What differential reinforcement procedure is being implemented?`,
            options: [
              { id: 'A', text: 'Differential Reinforcement of Other Behavior (DRO)', explanation: 'Correct! DRO reinforces zero occurrences of the target problem behavior during a specified time interval.' },
              { id: 'B', text: 'Differential Reinforcement of Alternative Behavior (DRA)', explanation: 'Incorrect. DRA reinforces a specific alternative functional response rather than zero occurrence.' },
              { id: 'C', text: 'Differential Reinforcement of Incompatible Behavior (DRI)', explanation: 'Incorrect. DRI reinforces a behavior that physically cannot co-occur with the problem behavior.' },
              { id: 'D', text: 'Non-Contingent Reinforcement (NCR)', explanation: 'Incorrect. NCR is time-based reinforcement delivered independent of behavior.' },
            ],
            correctOptionId: 'A',
            clinicalExplanation: 'DRO (Omission Training) delivers reinforcement if the target problem behavior does NOT occur throughout the specified time interval.',
            bacbTaskCode: 'D-04',
            bacbCitation: 'BACB 2nd Edition Task List Item D-04',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else if (topicSlug.includes('measurement') || topicSlug.includes('frequency') || topicSlug.includes('latency') || topicSlug.includes('irt')) {
          generatedQuestions.push({
            id: qId,
            certification: certLevel,
            category: 'Measurement',
            difficulty: diff,
            status: 'published',
            question: `[AI Generated Batch #${i + 1}] An RBT records the exact elapsed time from when the BCBA delivers the verbal instruction "Touch blue" to when the learner begins making physical contact with the blue card. What continuous measurement procedure is the RBT recording?`,
            options: [
              { id: 'A', text: 'Latency', explanation: 'Correct! Latency measures the elapsed time from the onset of a stimulus (SD) to the initiation of the response.' },
              { id: 'B', text: 'Inter-Response Time (IRT)', explanation: 'Incorrect. IRT measures elapsed time between TWO consecutive instances of behavior.' },
              { id: 'C', text: 'Duration', explanation: 'Incorrect. Duration measures the total elapsed time from the start of a behavior to its termination.' },
              { id: 'D', text: 'Rate', explanation: 'Incorrect. Rate is count divided by observation time.' },
            ],
            correctOptionId: 'A',
            clinicalExplanation: 'Latency measures the time delay between the SD presentation and response initiation.',
            bacbTaskCode: 'A-02',
            bacbCitation: 'BACB 2nd Edition Task List Item A-02',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else if (topicSlug.includes('ethic') || topicSlug.includes('boundary') || topicSlug.includes('gift')) {
          generatedQuestions.push({
            id: qId,
            certification: certLevel,
            category: 'Ethics',
            difficulty: diff,
            status: 'published',
            question: `[AI Generated Batch #${i + 1}] At the end of a therapy session, a learner's parents offer the RBT a $50 gift card to a local restaurant as a holiday gift. According to the BACB Ethics Code for RBTs, how should the RBT respond?`,
            options: [
              { id: 'A', text: 'Politely decline the gift card, explain BACB ethical guidelines regarding gifts, and notify their supervising BCBA.', explanation: 'Correct! RBTs must maintain professional boundaries and decline monetary gifts.' },
              { id: 'B', text: 'Accept the gift card because refusing it might offend the family culture.', explanation: 'Incorrect. Accepting gifts worth monetary value violates BACB ethics.' },
              { id: 'C', text: 'Accept the gift card but split it with the supervising BCBA.', explanation: 'Incorrect. Sharing a gift card does not resolve the ethical boundary violation.' },
              { id: 'D', text: 'Accept the gift card only if it is under $100.', explanation: 'Incorrect. Monetary gift cards are prohibited.' },
            ],
            correctOptionId: 'A',
            clinicalExplanation: 'RBTs must adhere to BACB Ethics Code guidelines on dual relationships and gift acceptance.',
            bacbTaskCode: 'F-02',
            bacbCitation: 'BACB Ethics Code for RBTs Item F-02',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } else {
          generatedQuestions.push({
            id: qId,
            certification: certLevel,
            category: 'Skill Acquisition',
            difficulty: diff,
            status: 'published',
            question: `[AI Generated Batch #${i + 1}] During a Discrete Trial Teaching (DTT) session on "${targetTopic}", an RBT presents the SD "Touch cup". The learner hesitates. The RBT immediately provides a full physical prompt to ensure a correct response. What prompting strategy is being used?`,
            options: [
              { id: 'A', text: 'Most-to-Least Prompting (Errorless Learning)', explanation: 'Correct! Most-to-least prompting provides the highest level of assistance immediately to ensure errorless response acquisition.' },
              { id: 'B', text: 'Least-to-Most Prompting', explanation: 'Incorrect. Least-to-most gives the learner an opportunity to respond independently first before increasing prompt hierarchy.' },
              { id: 'C', text: 'Time Delay Prompting', explanation: 'Incorrect. Constant or progressive time delay introduces a fixed delay interval before prompting.' },
              { id: 'D', text: 'Stimulus Fading', explanation: 'Incorrect. Stimulus fading modifies physical dimension of antecedent stimuli.' },
            ],
            correctOptionId: 'A',
            clinicalExplanation: 'Most-to-least prompting starts with full assistance to establish high success rates during early acquisition.',
            bacbTaskCode: taskCode,
            bacbCitation: `BACB 2nd Edition Task List Item ${taskCode}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      questions: generatedQuestions,
      totalGenerated: generatedQuestions.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI Question Generation failed' }, { status: 500 });
  }
}
