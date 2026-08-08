# Test Strategy — RBT Practice Questions SaaS
Defines the comprehensive test strategy for all platform layers including Unit, Integration, AI Regression, E2E, Performance, Accessibility, and Visual Regression.

## Layer Strategy
| Layer | Tool | When | Gate |
|---|---|---|---|
| Unit | Vitest | Every commit | 95% lines |
| Integration | Vitest | Every PR | 90% API coverage |
| AI Regression | Vitest | Every merge | 100% pass |
| E2E Smoke | Playwright | After build | Critical paths |
| Performance | Playwright metrics | Nightly | LCP < 2.5s |
| Accessibility | Playwright ax | Nightly | Zero critical |

## Related Files
- [docs/testing-engine.md](file:///g:/RBT/docs/testing-engine.md)
- [docs/qa-process.md](file:///g:/RBT/docs/qa-process.md)
