# Incident Response Protocol

## 1. Severity Classification
- **P0 - Critical**: Full system outage, data loss risk, database connection failure. Response time < 15 mins.
- **P1 - High**: Major engine failure (AI Tutor down, Stripe billing failing). Response time < 1 hour.
- **P2 - Medium**: Non-blocking feature bug or UI layout degradation. Response time < 4 hours.
- **P3 - Low**: Minor cosmetic glitch. Scheduled in upcoming minor sprint.

## 2. Emergency Escalation Steps
1. Activate Emergency Banner / Maintenance Mode via Admin CMS.
2. Inspect crash reports log (`GET /api/v1/crash-reports`).
3. Run single-click Rollback if issue is caused by recent release.
4. Execute patch fix & re-run 20-point validation matrix.
