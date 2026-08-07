# Integration Testing Guide — RBTTrainingAI SaaS
Integration tests validate Next.js API route handlers end-to-end using real in-memory engine state.

## Covered API Routes
| Route | Test File | Tests |
|---|---|---|
| POST /api/rag/search | tests/integration/rag-api.test.ts | 6 |
| GET/POST /api/notifications | tests/integration/notifications-api.test.ts | 4 |
| GET /api/security/summary | tests/integration/security-api.test.ts | 3 |
| POST /api/privacy/request | tests/integration/security-api.test.ts | 2 |

## Related Files
- [tests/integration/](file:///g:/RBT/tests/integration/)
- [docs/testing-engine.md](file:///g:/RBT/docs/testing-engine.md)
