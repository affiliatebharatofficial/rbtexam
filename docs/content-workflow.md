# Editorial Content & Review Workflow - RBT Practice Questions SaaS

## Purpose
Specifies the multi-stage human-in-the-loop review pipeline ensuring zero hallucinations or incorrect answer keys reach candidates.

## Workflow Pipeline
1. `idea` -> `draft` (AI generated via OpenAI/Gemini)
2. `needs_review` (Submitted to BCBA Editorial Queue)
3. `fact_check` & `seo_review` (Automated Quality Inspector checks citations and distractor rationales)
4. `approved` -> `published` (Released to candidate platform)

## Related Files
- [lib/ai-content-engine.ts](file:///g:/RBT/lib/ai-content-engine.ts)
- [app/admin/content-engine/page.tsx](file:///g:/RBT/app/admin/content-engine/page.tsx)
