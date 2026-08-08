# XML & HTML Sitemap Engine - RBT Practice Questions SaaS

## Purpose
The Sitemap Engine dynamically generates compliant XML sitemaps indexing static pillar pages, programmatic question pages, and glossary terms.

## Architecture
- Implementation: `app/sitemap.ts` (Next.js Dynamic Sitemap Generator)
- Sitemap URL: `https://rbtpracticequestions.com/sitemap.xml`
- Priorities:
  - Homepage `/`: Priority 1.0
  - Certification Hubs `/rbt`: Priority 0.9
  - Questions & Flashcards `/rbt/questions`: Priority 0.8
  - Programmatic Question Pages `/rbt/question/[slug]`: Priority 0.7

## Related Files
- [app/sitemap.ts](file:///g:/RBT/app/sitemap.ts)
- [app/robots.ts](file:///g:/RBT/app/robots.ts)
