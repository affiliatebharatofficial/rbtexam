# Programmatic SEO Architecture - RBTTrainingAI SaaS

## Purpose
This document specifies the Programmatic SEO (pSEO) engine architecture designed to generate and scale thousands of search-indexed landing pages across RBT, BCaBA, and BCBA certification domains.

## Architecture
- **Routing Paradigm**: Next.js App Router dynamic routes (`app/rbt/question/[slug]/page.tsx`, `app/rbt/glossary/page.tsx`).
- **Prerendering**: `generateStaticParams()` pre-compiles question and term pages into static HTML during build (`npm run build`).

## Database Tables Used
- `public.master_questions`
- `public.glossary_terms`
- `public.content_clusters`

## Workflow
1. New question or glossary item added to Master Question Bank.
2. Next.js Incremental Static Regeneration (ISR) / build process generates programmatic page `/rbt/question/[slug]`.
3. Page injects QAPage JSON-LD schema and internal links.
4. Dynamic sitemap (`app/sitemap.ts`) automatically includes new URL for Googlebot indexing.

## Related Files
- [app/rbt/question/[slug]/page.tsx](file:///g:/RBT/app/rbt/question/%5Bslug%5D/page.tsx)
- [lib/seo-engine.ts](file:///g:/RBT/lib/seo-engine.ts)
