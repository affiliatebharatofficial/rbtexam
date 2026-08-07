# Dynamic Model Routing — RBTTrainingAI SaaS

## Purpose
Enables Super Admin CMS to dynamically route any of the 29 AI Employees to different LLM providers (OpenAI, Gemini, Anthropic, DeepSeek, OpenRouter) without changing source code.

## Supported Provider Models
- **OpenAI**: `gpt-4o`, `gpt-4o-mini`
- **Google**: `gemini-1.5-pro`
- **Anthropic**: `claude-3-5-sonnet`
- **DeepSeek**: `deepseek-v3`, `deepseek-r1`

## API Routing Update
- `PUT /api/admin/ai-workforce/agents`
  ```json
  {
    "role": "seo_specialist",
    "modelProvider": "deepseek",
    "modelName": "deepseek-v3"
  }
  ```

## Related Files
- [lib/ai-workforce-engine.ts](file:///g:/RBT/lib/ai-workforce-engine.ts) — `updateAgentModelRouting()`
- [app/api/admin/ai-workforce/agents/route.ts](file:///g:/RBT/app/api/admin/ai-workforce/agents/route.ts)
