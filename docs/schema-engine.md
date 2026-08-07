# JSON-LD Schema Engine - RBTTrainingAI SaaS

## Purpose
The JSON-LD Schema Engine generates structured data markup to secure Google Rich Snippets (QAPage carousels, Course cards, BreadcrumbList, EducationalOrganization).

## Schemas Supported
1. `QAPage`: Question & Answer schema for single question pages (`/rbt/question/[slug]`).
2. `Course`: Educational course schema for certification hubs (`/rbt`).
3. `BreadcrumbList`: Structural breadcrumb list for URL taxonomy.
4. `EducationalOrganization`: Publisher organization metadata.

## Related Files
- [lib/seo-engine.ts](file:///g:/RBT/lib/seo-engine.ts)
- [app/rbt/question/[slug]/page.tsx](file:///g:/RBT/app/rbt/question/%5Bslug%5D/page.tsx)
