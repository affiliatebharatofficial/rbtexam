# 20. Deployment - RBT Practice Questions SaaS

## Purpose
This document provides instructions for deploying, building, and operating the RBT Practice Questions platform on Vercel, AWS CloudFront, and Supabase Cloud.

## Architecture
- Hosting Platform: Vercel Global Edge Network
- Database Host: Supabase Cloud (AWS US-East Region)
- CI/CD Pipeline: GitHub Actions / Vercel Automated Git Deployments
- CDN: Vercel Edge Network / Cloudflare

## Folder Location
- Root: `g:\RBT\`
- Configuration: `next.config.ts`, `tsconfig.json`

## Database Tables Used
Production PostgreSQL Database hosted on Supabase Cloud.

## API Endpoints
All production routes served via `https://rbtpracticequestions.com`.

## Workflow
1. Developer pushes code to `main` branch on GitHub repository.
2. GitHub Actions runs unit tests, TypeScript type checks, and ESLint validation.
3. Vercel automatically builds production bundle (`next build`).
4. Global CDN propagates static assets across 300+ edge locations worldwide.

## Data Flow
`Git Push` -> `GitHub Actions CI` -> `Vercel Build Environment` -> `Production CDN Release`.

## Business Logic
- Build Command: `npm run build`
- Dev Server Command: `npm run dev`
- Lint Command: `npm run lint`

## Security Notes
- Environment secrets strictly injected via Vercel Secret Manager; never committed to git repository.

## Performance Considerations
- Automatic image optimization, JS minification, and CSS tree-shaking active during `next build`.

## Future Improvements
- Multi-region database replication for sub-20ms global query execution.

## Dependencies
- `next`: ^16.3.0
- `typescript`: ^5.0.0

## Related Files
- [package.json](file:///g:/RBT/package.json)
- [next.config.ts](file:///g:/RBT/next.config.ts)
