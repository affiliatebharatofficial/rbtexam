# Docker Infrastructure — RBT Practice Questions SaaS

## Purpose
Containerization specs for local development, testing, staging, and self-hosted production setups.

## Multi-Stage Dockerfile Architecture
1. **Stage 1 (deps)**: Installs production `node_modules` using `npm ci --omit=dev`.
2. **Stage 2 (builder)**: Compiles Next.js standalone application build.
3. **Stage 3 (runner)**: Minimal Node 20 Alpine production image with non-root security user (`nextjs:nodejs`), port 3000 exposure, and automated HTTP health checks (`/api/health`).

## Local Container Execution
```bash
# Build production container image
docker build -t rbt-app .

# Run with docker-compose (App + Redis)
docker-compose up -d
```

## Docker Health Check
```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1
```

## Related Files
- [Dockerfile](file:///g:/RBT/Dockerfile)
- [docker-compose.yml](file:///g:/RBT/docker-compose.yml)
