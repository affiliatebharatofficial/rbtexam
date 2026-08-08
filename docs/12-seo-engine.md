# 12. Enterprise SEO Engine - RBT Practice Questions SaaS

## Purpose
The Enterprise SEO Engine automates organic search authority, programmatic page generation, JSON-LD rich snippets, XML sitemaps, internal link graphs, and metadata management across **RBT**, **BCaBA**, and **BCBA** certification paths.

## Architecture
- Types: `types/seo.ts`
- Engine: `lib/seo-engine.ts`
- Schema Definition: `database/seo-schema.sql`
- Sitemap Generator: `app/sitemap.ts`
- Dynamic Programmatic Route: `app/rbt/question/[slug]/page.tsx`
- Dedicated Specification Suite:
  - `docs/seo-programmatic-engine.md`
  - `docs/programmatic-seo-architecture.md`
  - `docs/internal-linking-engine.md`
  - `docs/schema-engine.md`
  - `docs/sitemap-engine.md`
  - `docs/metadata-engine.md`
  - `docs/url-architecture.md`

## Folder Location
- `g:\RBT\types\seo.ts`
- `g:\RBT\lib\seo-engine.ts`
- `g:\RBT\database\seo-schema.sql`
- `g:\RBT\app\sitemap.ts`
- `g:\RBT\app\robots.ts`
- `g:\RBT\app\rbt\page.tsx`
- `g:\RBT\app\rbt\question\[slug]\page.tsx`
- `g:\RBT\app\rbt\glossary\page.tsx`

## Database Tables Used
- `public.seo_metadata`
- `public.seo_redirects`
- `public.internal_links`
- `public.content_clusters`
- `public.glossary_terms`

## API Endpoints
- `GET /api/seo/metadata`: Resolve dynamic metadata & JSON-LD payload.
- `GET /api/seo/audit`: Returns SEO health score report (98% Health).

## Workflow
1. Googlebot visits `https://rbtpracticequestions.com/sitemap.xml`.
2. Crawls programmatic routes `/rbt/question/[slug]` and `/rbt/glossary`.
3. Parses QAPage JSON-LD schema for rich result carousels.
4. Follows internal link graph to prevent orphan pages.

## Business Logic
- Zero orphan pages policy via contextual 5-link related graph.
- Automated QAPage rich snippet generation for every question in Master Bank.

## Security Notes
- Admin metadata overrides secured via Supabase Row Level Security (RLS).

## Performance Considerations
- Pre-rendered static pages compile at build time (< 1ms load latency).

## Future Improvements
- Multi-language hreflang tag support (Spanish, Portuguese RBT exams).

## Dependencies
- `@supabase/supabase-js`: ^2.39.0
- `lucide-react`: ^1.29.0

## Related Files
- [types/seo.ts](file:///g:/RBT/types/seo.ts)
- [lib/seo-engine.ts](file:///g:/RBT/lib/seo-engine.ts)
- [docs/seo-programmatic-engine.md](file:///g:/RBT/docs/seo-programmatic-engine.md)
