# 18. Enterprise API Platform & Documentation - RBT Practice Questions SaaS

## Purpose
The Enterprise API Platform provides centralized REST APIs, outbound webhooks, API key security, and client SDK code generators for web, mobile, clinic enterprise partners, and white-label SaaS clients.

## Architecture
- Types: `types/api-platform.ts`
- Gateway Engine: `lib/api-gateway.ts`
- Schema Definition: `database/api-platform-schema.sql`
- Developer Portal: `app/developer/page.tsx`
- Dedicated Specification Suite:
  - `docs/api-platform.md`
  - `docs/api-gateway.md`
  - `docs/rest-api.md`
  - `docs/webhooks.md`
  - `docs/api-authentication.md`
  - `docs/api-versioning.md`
  - `docs/developer-portal.md`
  - `docs/sdk-roadmap.md`

## Folder Location
- `g:\RBT\types\api-platform.ts`
- `g:\RBT\lib\api-gateway.ts`
- `g:\RBT\database\api-platform-schema.sql`
- `g:\RBT\app\developer\page.tsx`

## Database Tables Used
- `public.api_keys`
- `public.api_scopes`
- `public.webhook_endpoints`
- `public.webhook_logs`
- `public.api_usage_metrics`

## API Endpoints
- `GET /api/v1/health`: API Gateway health status.
- `GET/POST /api/v1/developer/keys`: Developer API Key management.

## Workflow
1. Developer generates API Key on `/developer`.
2. Passes `Authorization: Bearer rbt_live_...` header.
3. API Gateway validates rate limits and scope permissions.

## Security Notes
- HMAC SHA-256 signatures sign outbound webhooks.

## Performance Considerations
- Average gateway latency < 24ms.

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/api-platform.ts](file:///g:/RBT/types/api-platform.ts)
- [lib/api-gateway.ts](file:///g:/RBT/lib/api-gateway.ts)
- [docs/api-platform.md](file:///g:/RBT/docs/api-platform.md)
