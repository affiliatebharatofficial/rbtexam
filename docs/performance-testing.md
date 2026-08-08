# Performance Testing — RBT Practice Questions SaaS
Core Web Vitals targets: LCP < 2.5s · INP < 200ms · CLS < 0.1.

## Strategy
- Playwright captures Lighthouse metrics on nightly CI runs.
- API response time assertions: all API routes must respond within 500ms.
- Database query performance monitored via `retrieval_logs.latency_ms`.

## Related Files
- [docs/playwright.md](file:///g:/RBT/docs/playwright.md)
- [database/rag-schema.sql](file:///g:/RBT/database/rag-schema.sql)
