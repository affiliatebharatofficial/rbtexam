# System Prompt Governance & Versioning — RBTTrainingAI SaaS

## Purpose
Establishes prompt versioning, changelogs, rollback capabilities, and A/B testing infrastructure for agent system prompts.

## Schema Strategy (`public.prompt_versions`)
- Every agent system prompt update creates a new immutable `prompt_versions` record with version string (e.g. `v1.0` → `v1.1`), author, and change description.
- Reverting to a previous prompt version sets `is_current = true` on the targeted historical record.

## Related Files
- [database/ai-workforce-schema.sql](file:///g:/RBT/database/ai-workforce-schema.sql) — `public.prompt_versions`
- [lib/ai-workforce-engine.ts](file:///g:/RBT/lib/ai-workforce-engine.ts)
