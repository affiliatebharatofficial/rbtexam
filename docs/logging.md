# Logging & Audit Architecture — RBTTrainingAI SaaS

## Purpose
Unified logging, structured audit logs, security threat monitoring, and retrieval telemetry.

## Log Categories
1. **Application & Route Logs**: Standard Vercel / Next.js structured JSON logs.
2. **Security Threat Logs**: Recorded in `public.security_threat_logs` (rate limits, prompt injection attempts, session revocations).
3. **Retrieval Telemetry Logs**: Recorded in `public.retrieval_logs` (RAG latency, search query terms, top confidence scores).
4. **Audit Logs**: Captured in `public.analytics_events` (user actions, subscription upgrades, administrative changes).

## Log Retention Rules
- Security Threat Logs: Retained 365 days for compliance.
- RAG Telemetry: Retained 90 days for quality tuning.
- User Audit Events: Retained 180 days.

## Related Files
- [lib/security-engine.ts](file:///g:/RBT/lib/security-engine.ts)
- [lib/rag-engine.ts](file:///g:/RBT/lib/rag-engine.ts)
- [database/qa-schema.sql](file:///g:/RBT/database/qa-schema.sql)
