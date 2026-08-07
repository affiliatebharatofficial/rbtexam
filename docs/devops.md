# DevOps Overview — RBTTrainingAI SaaS

## Purpose
The DevOps & Infrastructure Engine provides high-availability, zero-downtime deployments, environment safety, containerization, automated testing, and comprehensive observability for RBTTrainingAI.

## Architecture

```
                       ┌─────────────────────────┐
                       │     GitHub Repository   │
                       └────────────┬────────────┘
                                    │ git push main
                                    ▼
                       ┌─────────────────────────┐
                       │   GitHub Actions CI/CD  │
                       │ (tsc, vitest, docker)   │
                       └─────┬──────────────┬────┘
                             │              │
        ┌────────────────────┴──┐        ┌──┴───────────────────┐
        │                       ▼        ▼                      │
        │                Vercel Edge   Docker Registry (GHCR)   │
        │                (Frontend)    (Container Runner)       │
        └───────────────────┬───────────────────┬───────────────┘
                            │                   │
                            ▼                   ▼
                     ┌─────────────────────────────┐
                     │    Supabase Managed Cloud   │
                     │  (PostgreSQL + pgvector DB) │
                     └─────────────────────────────┘
```

## Core Infrastructure Components
1. **Frontend Hosting**: Vercel Edge Network (Global CDN, Serverless Functions, Automatic SSL).
2. **Database Layer**: Supabase PostgreSQL 15 with `pgvector` extension for AI RAG embeddings.
3. **Container Runtime**: Docker & Docker Compose (Node.js 20 Alpine multi-stage builds).
4. **CI/CD Pipeline**: GitHub Actions (`.github/workflows/ci.yml`) automating code quality, testing, container builds, and deployment.
5. **Observability**: Health checking API (`/api/health`) and Admin Infrastructure Dashboard (`/admin/infrastructure`).

## Related Documentation
- [docs/deployment.md](file:///g:/RBT/docs/deployment.md)
- [docs/docker.md](file:///g:/RBT/docs/docker.md)
- [docs/github-actions.md](file:///g:/RBT/docs/github-actions.md)
- [docs/infrastructure.md](file:///g:/RBT/docs/infrastructure.md)
- [docs/buyer-deployment-guide.md](file:///g:/RBT/docs/buyer-deployment-guide.md)
