import { describe, it, expect } from 'vitest';
import {
  parseAIFlashcardsJSON,
  validateFlashcardItem,
  isDuplicateFlashcard,
  normalizeConceptText,
  buildAIFlashcardPrompt,
  executeAIFlashcardGeneration,
  FlashcardGenerationInputParams,
} from '@/lib/ai-flashcard-generator-engine';

describe('AI Flashcard Generator Engine', () => {
  const sampleParams: FlashcardGenerationInputParams = {
    topic: 'Positive Reinforcement',
    certification: 'RBT',
    category: 'Skill Acquisition',
    difficulty: 'medium',
    count: 5,
  };

  it('1. parseAIFlashcardsJSON handles raw JSON string', () => {
    const rawJSON = JSON.stringify({
      flashcards: [
        {
          front: 'What is positive reinforcement?',
          back: 'Adding a stimulus to increase behavior.',
          explanation: 'Increases future likelihood of behavior.',
        },
      ],
    });
    const parsed = parseAIFlashcardsJSON(rawJSON);
    expect(parsed.length).toBe(1);
    expect(parsed[0].front).toBe('What is positive reinforcement?');
  });

  it('2. parseAIFlashcardsJSON handles markdown wrapped JSON with fences', () => {
    const rawMarkdown = `\`\`\`json
{
  "flashcards": [
    {
      "front": "Define extinction burst.",
      "back": "Temporary spike in behavior after extinction starts.",
      "explanation": "Behavior increases temporarily."
    }
  ]
}
\`\`\``;
    const parsed = parseAIFlashcardsJSON(rawMarkdown);
    expect(parsed.length).toBe(1);
    expect(parsed[0].front).toBe('Define extinction burst.');
  });

  it('3. validateFlashcardItem accepts valid card structure', () => {
    const rawCard = {
      front: 'What is positive reinforcement?',
      back: 'Procedure where stimulus is added following behavior and increases future rate.',
      explanation: 'Core ABA reinforcement concept.',
      clinicalExplanation: 'Deliver immediate verbal praise or high-potency reinforcer.',
      category: 'Skill Acquisition',
      difficulty: 'medium',
      certification: 'RBT',
      keywords: ['reinforcement', 'positive'],
      source: 'BACB Task List',
    };

    const { isValid, card, errors } = validateFlashcardItem(rawCard, sampleParams);
    expect(isValid).toBe(true);
    expect(errors.length).toBe(0);
    expect(card?.front).toBe('What is positive reinforcement?');
    expect(card?.difficulty).toBe('medium');
    expect(card?.certification).toBe('RBT');
  });

  it('4. validateFlashcardItem rejects card missing required fields', () => {
    const invalidCard = {
      front: '',
      back: 'Some answer',
      explanation: '',
    };
    const { isValid, errors } = validateFlashcardItem(invalidCard, sampleParams);
    expect(isValid).toBe(false);
    expect(errors).toContain('Front prompt is empty');
    expect(errors).toContain('Explanation is empty');
  });

  it('5. normalizeConceptText cleans common questions and filler words', () => {
    expect(normalizeConceptText('What is positive reinforcement?')).toBe('positivereinforcement');
    expect(normalizeConceptText('Define extinction burst!')).toBe('extinctionburst');
  });

  it('6. isDuplicateFlashcard detects duplicate concept prompts', () => {
    const existing = [
      { front: 'What is positive reinforcement?', back: 'Adding a stimulus to increase behavior.' },
    ];
    const newDuplicate = {
      front: 'Define positive reinforcement.',
      back: 'Procedure adding stimulus to increase rate.',
    };
    const newUnique = {
      front: 'What is negative reinforcement?',
      back: 'Removing an aversive stimulus to increase behavior.',
    };

    expect(isDuplicateFlashcard(newDuplicate, existing)).toBe(true);
    expect(isDuplicateFlashcard(newUnique, existing)).toBe(false);
  });

  it('7. buildAIFlashcardPrompt generates structured JSON instructions', () => {
    const prompt = buildAIFlashcardPrompt(sampleParams, 5, false);
    expect(prompt).toContain('TARGET ABA TOPIC: "Positive Reinforcement"');
    expect(prompt).toContain('CERTIFICATION: RBT');
    expect(prompt).toContain('"flashcards": [');
  });

  it('8. executeAIFlashcardGeneration returns telemetry when no API keys are present', async () => {
    const result = await executeAIFlashcardGeneration({
      ...sampleParams,
      provider: 'openai',
      apiKey: 'mock-invalid-key',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('AI Generation Failed');
  });
});
