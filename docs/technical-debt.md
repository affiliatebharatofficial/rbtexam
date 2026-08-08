# Technical Debt Audit — RBT Practice Questions SaaS

## Overview
This document logs technical debt, refactoring candidates, and code hygiene improvements identified during the enterprise audit.

---

## Technical Debt Inventory

| Item ID | Component | Debt Type | Priority | Description | Remediation |
|---|---|---|---|---|---|
| **TD-01** | `middleware.ts` | Deprecation Warning | Low | Next.js 16 deprecates `middleware.ts` in favor of `proxy.ts`. | Run `npx @next/codemod@canary middleware-to-proxy .` before Next.js 17 upgrade. |
| **TD-02** | `vitest.config.ts` | Deprecation Warning | Low | `test.poolOptions` replaced by top-level Vitest 4 config keys. | Key updated; verify no residual warnings in CI logs. |
| **TD-03** | In-Memory Stores | Development State | Medium | In-memory fallbacks used in `lib/api-gateway.ts` and `lib/notification-engine.ts` when DB offline. | Ensure production environment variables enforce PostgreSQL persistence. |
| **TD-04** | Types Organization | Structure | Low | Types are split across `types/` files (`rag-engine.ts`, `master-question.ts`, `api-platform.ts`). | Centralize common interface re-exports in `types/index.ts`. |

---

## Code Quality Metrics
- **TypeScript Errors**: 0 (`npx tsc --noEmit` clean)
- **ESLint Warnings**: 0
- **Test Suite Pass Rate**: 100% (95/95 passing)
- **Dead Code / Unused Imports**: Cleaned across all `/lib` engines

---

## Related Files
- [docs/architecture-review.md](file:///g:/RBT/docs/architecture-review.md)
- [docs/project-audit.md](file:///g:/RBT/docs/project-audit.md)
