# Deployment Strategy — RBTTrainingAI SaaS

## Purpose
Detailed deployment instructions and workflows for Vercel, Supabase, Docker, and self-hosted environments.

## Supported Deployment Targets
- **Primary Cloud**: Vercel (Next.js Application) + Supabase (PostgreSQL Database).
- **Containerized / Self-Hosted**: Docker & Docker Compose (AWS ECS, Google Cloud Run, DigitalOcean App Platform, Hetzner VPS).

## Vercel Deployment Workflow
1. Connect GitHub repository to Vercel.
2. Select Next.js framework preset.
3. Configure environment variables matching `.env.example`.
4. Deploy:
   ```bash
   vercel --prod
   ```

## Database Deployment (Supabase)
1. Execute `database/migrations.sql` against the target Supabase database instance.
2. Ensure extensions are enabled:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "vector";
   ```
3. Run seeds and initial setup.

## Rollback Strategy
- **Vercel**: Instant 1-click rollback via Vercel Dashboard → Deployments → Promote to Production.
- **Docker**: Rollback image tag to previous SHA: `docker pull ghcr.io/org/rbt:sha-<previous>`.
- **Database**: Run reverse schema migrations from `database/migrations.sql`.

## Related Files
- [Dockerfile](file:///g:/RBT/Dockerfile)
- [docker-compose.yml](file:///g:/RBT/docker-compose.yml)
- [docs/buyer-deployment-guide.md](file:///g:/RBT/docs/buyer-deployment-guide.md)
