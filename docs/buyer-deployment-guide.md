# Buyer Deployment & Handover Guide — RBTTrainingAI SaaS

## Purpose
Complete end-to-end guide for new owners, acquisition teams, and engineering leads taking over RBTTrainingAI. No prior knowledge of the codebase is required.

---

## 1. Quick Start (5 Minutes)

Run the automated one-command setup script:
```bash
# Clone the repository and run setup
git clone <repository-url>
cd RBT
bash scripts/setup.sh
```

---

## 2. Platform Requirements

| Component | Recommended Provider | Minimum Specs |
|---|---|---|
| Frontend / API | Vercel (Pro) | Edge Network |
| Database | Supabase (Pro) | Postgres 15 + pgvector |
| Cache / Limits | Redis (Upstash) | Redis 7 |
| AI Embeddings | OpenAI | GPT-4o + text-embedding-ada-002 |
| Payments | Stripe | Billing + Webhooks |
| Email | Resend | Dedicated Domain |

---

## 3. Deployment Steps

### Step 1: Provision Supabase Database
1. Create a new Supabase project.
2. Open SQL Editor and execute `database/migrations.sql`.
3. Verify that `vector` and `uuid-ossp` extensions are active.
4. Execute `database/rag-schema.sql` and `database/qa-schema.sql`.

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env.local` or set environment variables in your Vercel project dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `INTERNAL_API_SECRET`

Validate variables with:
```bash
npx tsx scripts/validate-env.ts
```

### Step 3: Deploy Frontend to Vercel
1. Import GitHub repository into Vercel.
2. Ensure build command is `npm run build`.
3. Trigger deployment.

---

## 4. Operational Handover & Admin Access

- **Admin CMS Dashboard**: Access `/admin` to view executive analytics.
- **RAG & Knowledge Graph Engine**: Access `/admin/knowledge` to inspect vector chunks and graph topology.
- **QA & Testing Center**: Access `/admin/qa` for test suite results.
- **Security & Compliance Center**: Access `/admin/security` for threat logs and privacy requests.
- **DevOps Infrastructure Dashboard**: Access `/admin/infrastructure` for service health.

---

## 5. Verification Checklist

Run full automated test verification:
```bash
# Type check
npx tsc --noEmit

# Unit & Integration Tests (95%+ passing)
npm run test

# Production Build
npm run build

# E2E Smoke Tests
npm run test:e2e:smoke
```

---

## 6. Architecture Index

All detailed architecture specifications are available in `/docs`:
- [devops.md](file:///g:/RBT/docs/devops.md)
- [deployment.md](file:///g:/RBT/docs/deployment.md)
- [docker.md](file:///g:/RBT/docs/docker.md)
- [github-actions.md](file:///g:/RBT/docs/github-actions.md)
- [infrastructure.md](file:///g:/RBT/docs/infrastructure.md)
- [environment.md](file:///g:/RBT/docs/environment.md)
- [backup-restore.md](file:///g:/RBT/docs/backup-restore.md)
- [monitoring.md](file:///g:/RBT/docs/monitoring.md)
- [logging.md](file:///g:/RBT/docs/logging.md)
- [disaster-recovery.md](file:///g:/RBT/docs/disaster-recovery.md)
