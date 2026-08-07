# Maintenance Mode & System Safety

## 1. Safety Modes
- **Full Maintenance Mode**: Intercepts all traffic and renders [emergency-fallback.tsx](file:///g:/RBT/components/release/emergency-fallback.tsx).
- **Read-Only Mode**: Prevents mutation requests (POST, PUT, DELETE) via [read-only-guard.tsx](file:///g:/RBT/components/release/read-only-guard.tsx) during database migrations.
- **Emergency Banner**: Renders a floating notification banner via [maintenance-banner.tsx](file:///g:/RBT/components/release/maintenance-banner.tsx).

## 2. API Endpoint
- Query Status: `GET /api/v1/release-management/maintenance`
- Update Status: `POST /api/v1/release-management/maintenance`
