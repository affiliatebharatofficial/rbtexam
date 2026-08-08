# Testing Engine — RBT Practice Questions SaaS

## Purpose
The Enterprise Testing & QA Engine ensures platform stability, prevents regressions, and enforces quality gates across all platform modules. Every new feature must include tests before being considered production-ready.

## Architecture

```
tests/
├── setup.ts                          ← Global Vitest setup (mocks, stubs)
├── unit/
│   ├── rag-engine.test.ts            ← RAG pipeline, knowledge graph
│   ├── security-engine.test.ts       ← Prompt injection, sessions, privacy
│   ├── notification-engine.test.ts   ← Event dispatch, templates, workflows
│   ├── api-gateway.test.ts           ← API key generation, scope checks
│   └── subscription-engine.test.ts  ← Plan tiers, feature entitlements
├── integration/
│   ├── rag-api.test.ts               ← POST /api/rag/search
│   ├── notifications-api.test.ts     ← GET/POST /api/notifications
│   └── security-api.test.ts         ← GET /api/security/summary + privacy
├── ai/
│   ├── prompt-regression.test.ts     ← Injection pattern blocklist
│   └── rag-quality.test.ts           ← Known-good retrieval quality gates
└── e2e/
    └── smoke.test.ts                 ← Playwright critical path smoke tests
```

## Testing Stack
| Tool | Purpose |
|---|---|
| Vitest | Unit + Integration runner |
| @testing-library/react | Component rendering tests |
| @testing-library/jest-dom | Custom DOM matchers |
| jsdom | Browser DOM simulation |
| MSW | API request mocking |
| Playwright | E2E + Visual Regression |

## Coverage Targets
- Unit: **95%+ lines** (lib/, types/)
- Integration: **90%+ API routes**
- E2E: **100% Critical Paths**
- AI Prompt Regression: **100%**

## Related Files
- [vitest.config.ts](file:///g:/RBT/vitest.config.ts)
- [playwright.config.ts](file:///g:/RBT/playwright.config.ts)
- [.github/workflows/ci.yml](file:///g:/RBT/.github/workflows/ci.yml)
- [database/qa-schema.sql](file:///g:/RBT/database/qa-schema.sql)
