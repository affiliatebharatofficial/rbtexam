# AI Prompt CMS & Model Routing - RBT Practice Questions SaaS

## Purpose
Specifies multi-provider LLM priority routing (OpenAI GPT-4o, Google Gemini 1.5 Pro, OpenRouter) and version-controlled system prompt templates.

## Architecture
- Implementation: `lib/platform-config.ts` (`DEFAULT_AI_PROVIDERS`)
- Features: Monthly token limits, fallback routing, cost tracking ($186.40 OpenAI spend).

## Related Files
- [lib/platform-config.ts](file:///g:/RBT/lib/platform-config.ts)
- [app/admin/page.tsx](file:///g:/RBT/app/admin/page.tsx)
