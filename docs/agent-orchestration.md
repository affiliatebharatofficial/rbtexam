# Agent Orchestration Engine — RBT Practice Questions SaaS

## Purpose
Specifies multi-agent collaborative execution pipelines, quality control scoring (0–100), and automated approval routing.

## Sequential Collaboration Pipeline Example
```
Question Writer (Drafts question & clinical scenario)
  ↓
Fact Checker (Verifies Cooper 3rd ed & BACB Task List compliance)
  ↓
Grammar Reviewer (Refines clinical syntax & formatting)
  ↓
SEO Specialist (Generates slug, meta tags, and schema JSON-LD)
  ↓
Content Reviewer (Evaluates combined package score)
  ↓
[Quality Control Gate]
  ├── Score ≥ 90 & requires_human_approval = true → Human Approval Queue
  └── Score ≥ 90 & requires_human_approval = false → Auto-Publish Queue
```

## Related Files
- [lib/ai-workforce-engine.ts](file:///g:/RBT/lib/ai-workforce-engine.ts) — `executeOrchestrationPipeline()`
- [app/api/admin/ai-workforce/orchestrate/route.ts](file:///g:/RBT/app/api/admin/ai-workforce/orchestrate/route.ts)
