# Enterprise AI Workforce System — RBT Practice Questions SaaS

## Purpose
The Enterprise AI Workforce System transforms RBT Practice Questions into an autonomous AI-powered educational company where 29 specialized AI Employees collaborate across content generation, quality review, programmatic SEO, learning coaching, analytics, and operational workflows.

## Architecture

```
                       ┌─────────────────────────┐
                       │   Admin CMS Controller  │
                       └────────────┬────────────┘
                                    │ Trigger Pipeline
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Multi-Agent Orchestration Pipeline                     │
│  Question Writer → Fact Checker → Grammar Reviewer → SEO → Content Reviewer  │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │ Model Router (OpenAI/Gemini/Anthropic/DeepSeek)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Quality Control & Approval                         │
│   Score Evaluation (0-100) → Human Approval Queue → Auto-Publishing Queue   │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PostgreSQL Schema & Analytics                      │
│     ai_agents · task_queue · job_history · prompt_versions · agent_metrics  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Folder Location
- `g:\RBT\types\ai-workforce.ts`
- `g:\RBT\lib\ai-workforce-engine.ts`
- `g:\RBT\database\ai-workforce-schema.sql`
- `g:\RBT\app\admin\ai-workforce\page.tsx`
- `g:\RBT\app\api\admin\ai-workforce\agents\route.ts`
- `g:\RBT\app\api\admin\ai-workforce\orchestrate\route.ts`
- `g:\RBT\app\api\admin\ai-workforce\queue\route.ts`

## Database Tables Used
- `public.ai_agents`
- `public.prompt_versions`
- `public.task_queue`
- `public.job_history`
- `public.agent_metrics`

## API Endpoints
- `GET /api/admin/ai-workforce/agents` — Fetch 29 AI agents.
- `PUT /api/admin/ai-workforce/agents` — Dynamic model routing update.
- `POST /api/admin/ai-workforce/orchestrate` — Trigger multi-agent pipeline.
- `GET /api/admin/ai-workforce/queue` — Fetch queue jobs & metrics.

## Related Files
- [docs/multi-agent-system.md](file:///g:/RBT/docs/multi-agent-system.md)
- [docs/agent-orchestration.md](file:///g:/RBT/docs/agent-orchestration.md)
- [docs/model-routing.md](file:///g:/RBT/docs/model-routing.md)
