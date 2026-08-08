# Agent Memory & Telemetry — RBT Practice Questions SaaS

## Purpose
Specifies persistent agent telemetry tracking: job history, token consumption, cumulative cost USD, latency averages, and success rates.

## Telemetry Fields Tracked
- `totalJobsProcessed`: Cumulative jobs assigned to agent.
- `successRatePercentage`: Ratio of passed quality control checks.
- `averageLatencyMs`: Moving average execution latency.
- `totalCostUSD`: Token expenditure based on model provider pricing.

## Related Files
- [database/ai-workforce-schema.sql](file:///g:/RBT/database/ai-workforce-schema.sql) — `agent_metrics`, `job_history`
- [lib/ai-workforce-engine.ts](file:///g:/RBT/lib/ai-workforce-engine.ts)
