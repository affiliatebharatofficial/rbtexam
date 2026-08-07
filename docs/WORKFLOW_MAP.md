# WORKFLOW MAP — RBTTrainingAI SaaS

## Platform Core Business Workflows

### 1. Candidate Adaptive Learning Workflow
```
Candidate takes Diagnostic Practice Test (/exam)
  ↓
Adaptive Learning Engine analyzes response accuracy & timing (lib/adaptive-learning-engine.ts)
  ↓
Diagnoses weak BACB Task List categories
  ↓
Socrates AI Tutor (/tutor) provides Socratic mentorship grounded via RAG Engine (lib/rag-engine.ts)
  ↓
Adaptive Study Planner updates daily flashcard & quiz recommendation schedule
```

### 2. Multi-Agent Content Publishing Workflow
```
Admin initiates Question Generation job (/admin/ai-workforce)
  ↓
Question Writer drafts scenario question & options
  ↓
Fact Checker verifies Cooper 3rd ed & BACB Task List compliance
  ↓
Clinical Copyeditor refines syntax
  ↓
SEO Specialist generates slug, meta description, and schema markup
  ↓
Content Reviewer assigns score (0-100) & queues for admin approval
```

### 3. Subscription & Entitlement Workflow
```
User selects plan on Pricing Page (/pricing)
  ↓
Stripe Checkout session initiated → User completes payment
  ↓
Stripe Webhook (/api/billing/webhook) provisions active tier
  ↓
Subscription Engine (lib/subscription-engine.ts) updates daily usage quotas
```

## Related Files
- [docs/FEATURE_MAP.md](file:///g:/RBT/docs/FEATURE_MAP.md)
- [docs/PROJECT_BRAIN.md](file:///g:/RBT/docs/PROJECT_BRAIN.md)
