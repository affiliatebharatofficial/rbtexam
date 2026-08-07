# Monitoring & Observability — RBTTrainingAI SaaS

## Purpose
Monitors service health, API latency, background jobs, DB connection pools, and external service statuses (OpenAI, Stripe, Resend).

## Unified Health API
- **Endpoint**: `GET /api/health`
- **Response Format**:
  ```json
  {
    "overall": "healthy",
    "version": "2.7.0",
    "environment": "production",
    "uptime": 86400,
    "services": [
      { "name": "Supabase Database", "status": "healthy", "latencyMs": 18 },
      { "name": "OpenAI API", "status": "healthy", "latencyMs": 120 },
      { "name": "RAG Knowledge Engine", "status": "healthy" }
    ]
  }
  ```

## Infrastructure Admin Dashboard
- **Location**: `/admin/infrastructure`
- **Metrics**: Real-time service status, deployment logs, environment variable integrity checks, and system version tracking.

## External Uptime Monitoring
Configure UptimeRobot or Checkly to poll `https://rbttrainingai.com/api/health` every 60 seconds with an HTTP alert trigger if status is not `200 OK`.

## Related Files
- [lib/health-engine.ts](file:///g:/RBT/lib/health-engine.ts)
- [app/api/health/route.ts](file:///g:/RBT/app/api/health/route.ts)
- [app/admin/infrastructure/page.tsx](file:///g:/RBT/app/admin/infrastructure/page.tsx)
