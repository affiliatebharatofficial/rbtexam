# Enterprise Security, Privacy & Compliance Engine - RBTTrainingAI SaaS

## Purpose
The Enterprise Security, Privacy & Compliance Engine establishes a Zero Trust Architecture and Defense-in-Depth security framework for RBTTrainingAI. Built to protect student learning records, clinic enterprise accounts, and AI services, it enforces prompt injection mitigation, session revocation, API key scope checks, immutable audit logging, and GDPR/CCPA privacy data governance.

## Architecture
- **Zero Trust Security Core**: `g:\RBT\lib\security-engine.ts` (`sanitizeAIPromptInput`, `logThreatEvent`, `revokeUserSession`, `submitDataSubjectRequest`, `getSecurityHealthSummary`).
- **Core Entities & Types**: `g:\RBT\types\security.ts` (`SecurityThreatEvent`, `ActiveSession`, `PrivacyConsentRecord`, `DataSubjectRequest`, `SecurityHealthSummary`).
- **PostgreSQL Database Schema**: `g:\RBT\database\security-schema.sql` (`security_threat_logs`, `active_sessions`, `privacy_consent_records`, `data_subject_requests`).
- **Security Center Interface**: `g:\RBT\app\admin\security\page.tsx` (Threat Stream, Active Sessions Table, Privacy Request Queue, Permission Matrix).

## Folder Structure
- `g:\RBT\types\security.ts`
- `g:\RBT\lib\security-engine.ts`
- `g:\RBT\database\security-schema.sql`
- `g:\RBT\app\admin\security\page.tsx`
- `g:\RBT\app\api\security\summary\route.ts`
- `g:\RBT\app\api\privacy\request\route.ts`
- `g:\RBT\docs\security-engine.md`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\security-schema.sql`

```sql
CREATE TABLE public.security_threat_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL CHECK (event_type IN ('prompt_injection', 'brute_force', 'rate_limit_exceeded', 'invalid_jwt', 'csrf_attempt')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  source_ip TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  request_path TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Get Security Health Summary
- **Endpoint**: `GET /api/security/summary`
- **Response**: `SecurityHealthSummary` JSON object (Health score: 99.8%, Threats blocked: 1,420).

### 2. Submit Data Subject Request (GDPR / CCPA)
- **Endpoint**: `POST /api/privacy/request`
- **Body**: `{ email: string, requestType: "export_data" | "delete_account" }`
- **Response**: `{ success: true, request: DataSubjectRequest }`

## Security Principles
- **Prompt Injection Firewall**: Filters user LLM input against adversarial system prompt overrides.
- **Data Governance**: Encrypts sensitive credentials and enforces Supabase Row Level Security (RLS) across all tables.

## Related Files
- [lib/security-engine.ts](file:///g:/RBT/lib/security-engine.ts)
- [app/admin/security/page.tsx](file:///g:/RBT/app/admin/security/page.tsx)
- [docs/privacy-engine.md](file:///g:/RBT/docs/privacy-engine.md)
