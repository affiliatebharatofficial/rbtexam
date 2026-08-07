# Internal Linking Engine - RBTTrainingAI SaaS

## Purpose
The Internal Linking Engine constructs a contextual link graph connecting pillar pages, question detail pages, Leitner flashcard decks, and glossary terms to maximize Google crawl efficiency and eliminate orphan pages.

## Architecture
- Implementation: `lib/seo-engine.ts` (`getRelatedInternalLinks`)
- Strategy: Every page renders 5 high-relevance internal links categorized by feature (*Practice Test, Flashcards, AI Tutor, Study Guide, Glossary*).

## Business Rules
- **No Orphan Pages**: Every dynamic question page links back to the main RBT Hub (`/rbt`), Question Directory (`/rbt/questions`), and 85-Q Mock Exam Simulator (`/rbt/mock-exam`).

## Related Files
- [lib/seo-engine.ts](file:///g:/RBT/lib/seo-engine.ts)
- [app/rbt/page.tsx](file:///g:/RBT/app/rbt/page.tsx)
