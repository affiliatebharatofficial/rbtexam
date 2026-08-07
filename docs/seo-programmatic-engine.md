# Enterprise SEO & Programmatic Content Engine - RBTTrainingAI SaaS

## Purpose
The Enterprise SEO & Programmatic Content Engine is the automated organic growth and search engine indexing platform for RBTTrainingAI. Designed to generate, optimize, and scale thousands of search landing pages (*question detail pages, flashcard decks, clinical glossary terms, mock exam landings, and certification hubs*), it enforces clean URL taxonomy, JSON-LD rich snippet schema validation, zero orphan page internal linking, dynamic XML sitemaps, and automated SEO health auditing.

## Architecture
- **Certifications Covered**: RBT, BCaBA, BCBA, ABA Therapy, Behavior Analysis.
- **Core Engine & Generators**: `g:\RBT\lib\seo-engine.ts` (`buildSEOMetadata`, `generateQuestionJSONLD`, `generateCourseJSONLD`, `generateBreadcrumbJSONLD`, `getRelatedInternalLinks`).
- **Dynamic XML Sitemap**: `g:\RBT\app\sitemap.ts`
- **Robots.txt Directive**: `g:\RBT\app\robots.ts`
- **PostgreSQL Database Schema**: `g:\RBT\database\seo-schema.sql` (`seo_metadata`, `seo_redirects`, `internal_links`, `content_clusters`, `glossary_terms`).
- **Programmatic URL Architecture**:
  - `/rbt` (RBT Certification Pillar Hub)
  - `/rbt/practice-test` (Practice Test Landing)
  - `/rbt/mock-exam` (85-Q Mock Exam Landing)
  - `/rbt/question/[slug]` (Dynamic Programmatic Single Question Page)
  - `/rbt/glossary` (ABA Terminology Directory)

## Folder Structure
- `g:\RBT\types\seo.ts`
- `g:\RBT\lib\seo-engine.ts`
- `g:\RBT\database\seo-schema.sql`
- `g:\RBT\app\sitemap.ts`
- `g:\RBT\app\robots.ts`
- `g:\RBT\app\rbt\page.tsx`
- `g:\RBT\app\rbt\question\[slug]\page.tsx`
- `g:\RBT\app\rbt\glossary\page.tsx`
- `g:\RBT\app\api\seo\metadata\route.ts`
- `g:\RBT\app\api\seo\audit\route.ts`

## Database Schema
Host: PostgreSQL 15+ (Supabase Managed)
File: `g:\RBT\database\seo-schema.sql`

```sql
CREATE TABLE public.seo_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url_path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  robots TEXT DEFAULT 'index, follow',
  keywords TEXT[] DEFAULT '{}',
  og_image TEXT,
  schema_type TEXT DEFAULT 'WebPage',
  custom_json_ld JSONB,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## API Documentation

### 1. Resolve Dynamic Metadata & JSON-LD
- **Endpoint**: `GET /api/seo/metadata`
- **Query Parameter**: `path` (e.g. `/rbt/question/q-a02-1`)
- **Response**: `{ metadata: SEOMetadata, jsonLd: JSONLDSchema }`

### 2. SEO Health Audit Report
- **Endpoint**: `GET /api/seo/audit`
- **Response**: `SEOHealthReport` JSON object (Health score: 98%, Indexed pages: 450, Broken links: 0, Orphan pages: 0).

## Business Logic
- **Zero Orphan Pages**: Every programmatic page renders a contextual 5-link related internal linking graph (`getRelatedInternalLinks`).
- **Rich Snippets**: Every single question page renders `QAPage` and `BreadcrumbList` JSON-LD schema to secure Google Rich Result carousels.

## Security Notes
- Admin override routes guarded against unauthorized URL redirects via Supabase Row Level Security (RLS).

## Performance Considerations
- Static Site Generation (SSG) via `generateStaticParams` renders static HTML pages at build time (< 1ms load latency).

## Related Files
- [lib/seo-engine.ts](file:///g:/RBT/lib/seo-engine.ts)
- [app/sitemap.ts](file:///g:/RBT/app/sitemap.ts)
- [docs/programmatic-seo-architecture.md](file:///g:/RBT/docs/programmatic-seo-architecture.md)
