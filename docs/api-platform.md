# Enterprise API Platform & Developer Ecosystem - RBT Practice Questions SaaS

## Purpose
The Enterprise API Platform & Developer Ecosystem provides secure REST APIs, outbound webhook delivery, API Key management, and client SDKs for mobile applications, web apps, desktop clients, Chrome extensions, clinic enterprise integrations, and white-label SaaS partners.

## Architecture
- **API Gateway Core**: `g:\RBT\lib\api-gateway.ts` (`generateAPIKey`, `validateAPIKeyRequest`, `dispatchWebhookEvent`, `getAPIMetricsSummary`).
- **Core Entities & Types**: `g:\RBT\types\api-platform.ts` (`APIKey`, `APIScope`, `WebhookEndpoint`, `WebhookLog`, `APIMetrics`, `SDKLanguage`).
- **PostgreSQL Database Schema**: `g:\RBT\database\api-platform-schema.sql` (`api_keys`, `api_scopes`, `webhook_endpoints`, `webhook_logs`, `api_usage_metrics`).
- **Developer Portal Interface**: `g:\RBT\app\developer\page.tsx` (Interactive API Explorer, API Key Manager, SDK Snippets, Webhook Inspector).

## Folder Structure
- `g:\RBT\types\api-platform.ts`
- `g:\RBT\lib\api-gateway.ts`
- `g:\RBT\database\api-platform-schema.sql`
- `g:\RBT\app\developer\page.tsx`
- `g:\RBT\app\api\v1\health\route.ts`
- `g:\RBT\app\api\v1\developer\keys\route.ts`
- `g:\RBT\docs\api-platform.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\api-platform-schema.sql`

```sql
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_prefix TEXT UNIQUE NOT NULL,
  secret_hash TEXT NOT NULL,
  scopes TEXT[] DEFAULT '{}',
  rate_limit_per_minute INTEGER DEFAULT 600,
  allowed_origins TEXT[] DEFAULT '{}',
  allowed_ips TEXT[] DEFAULT '{}',
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. API Gateway Health Check
- **Endpoint**: `GET /api/v1/health`
- **Response**: `{ status: "healthy", apiVersion: "v1.0.0", metrics: APIMetrics }`

### 2. Generate Developer API Key
- **Endpoint**: `POST /api/v1/developer/keys`
- **Body**: `{ name: string, scopes: string[] }`
- **Response**: `{ success: true, apiKey: APIKey, rawSecretKey: string }`

## Security Notes
- HMAC signatures (`whsec_...`) sign outbound webhooks to prevent tampering.
- API Keys validate permission scopes (`questions:read`, `analytics:read`, `billing:manage`).

## Related Files
- [lib/api-gateway.ts](file:///g:/RBT/lib/api-gateway.ts)
- [app/developer/page.tsx](file:///g:/RBT/app/developer/page.tsx)
- [docs/api-gateway.md](file:///g:/RBT/docs/api-gateway.md)
