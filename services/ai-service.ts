import { ChatMessage } from '@/types/tutor';
import { SOCRATES_AI_SYSTEM_PROMPT } from '@/lib/ai-prompts';

export class AIService {
  /**
   * Generates response from Socrates AI Tutor (Client-side mock with real API hook ready)
   */
  static async sendTutorMessage(messages: ChatMessage[], userMessageText: string): Promise<ChatMessage> {
    const textLower = userMessageText.toLowerCase();

    let responseContent = `Great question regarding RBT practice! In Applied Behavior Analysis, it is essential to align all actions with the BACB RBT 3rd Edition Test Content Outline (TCO).`;
    let bacbRef = 'BACB Task List Overview';

    if (textLower.includes('dtt') || textLower.includes('discrete trial')) {
      responseContent = `Discrete Trial Teaching (DTT) [Item C-04] consists of 4 main components:
1. **Discriminative Stimulus (SD)**: Clear, concise cue given by the RBT.
2. **Prompt / Response**: Client's response with or without prompt assistance.
3. **Consequence**: Immediate reinforcement for correct responses or error correction for incorrect ones.
4. **Inter-Trial Interval (ITI)**: Brief 2-3 second pause before starting the next trial.

What specific DTT prompt fading hierarchy are you currently implementing with your supervisor?`;
      bacbRef = 'Item C-04: Discrete Trial Teaching';
    } else if (textLower.includes('dro') || textLower.includes('dra') || textLower.includes('differential')) {
      responseContent = `Differential Reinforcement [Item D-04] is a foundational behavior reduction technique:
• **DRO (Other Behavior)**: Reinforces when the target behavior DOES NOT occur for a specified time. (Zero instance rule).
• **DRA (Alternative Behavior)**: Reinforces a functional alternative behavior (e.g., asking for a break).
• **DRI (Incompatible Behavior)**: Reinforces a behavior physically incompatible with the problem behavior (e.g., keeping hands in pockets instead of hitting).

Remember on the RBT exam: DRO always requires ZERO occurrences of the target behavior during the interval!`;
      bacbRef = 'Item D-04: Differential Reinforcement';
    } else if (textLower.includes('gift') || textLower.includes('boundary') || textLower.includes('ethics')) {
      responseContent = `Under BACB Ethics Code Item F-02, RBTs MUST maintain strict professional boundaries:
1. **No Gifts**: Do not accept gifts, money, or services from clients/parents (or adhere to strict <$10 company limits if explicitly noted, though zero tolerance is safest).
2. **No Social Media**: Do not add clients on personal social media platforms.
3. **No Babysitting**: Do not provide non-ABA services to client families.

If offered a gift, politely thank them, state BACB ethical compliance rules, and inform your BCBA supervisor.`;
      bacbRef = 'Item F-02: Professional Boundaries & Dual Relationships';
    } else if (textLower.includes('continuous') || textLower.includes('latency') || textLower.includes('duration')) {
      responseContent = `Continuous Measurement [Item A-02] tracks every single instance:
• **Frequency**: Count total instances.
• **Duration**: Total time length from start to end of behavior.
• **Latency**: Time elapsed between the SD and the start of the behavior.
• **IRT**: Time between two consecutive behavior instances.

Tip for the exam: If asked about the delay before a child starts their task after an instruction, that is Latency!`;
      bacbRef = 'Item A-02: Continuous Measurement';
    }

    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bacbRef,
      suggestedFollowups: [
        'Give me a practice exam scenario for this item',
        'How does a BCBA assess this during supervision?',
        'What are common distractor mistakes on the exam?',
      ],
    };
  }
}
