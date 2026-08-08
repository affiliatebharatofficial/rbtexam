# RBT Practice Questions Global Project Rules & Architecture Standards

> These global rules override all previous implementation patterns and MUST be enforced for every future feature, engine, page, API, database table, workflow, AI module, service, component, admin module, and integration.

---

## 1. Core Development Principles
Every feature must be:
- **Production Ready**
- **Enterprise Grade**
- **Fully Dynamic**
- **Admin Manageable**
- **Scalable & Reusable**
- **Modular & Maintainable**
- **Extensible & Well Documented**
- **Secure by Default**
- **SEO Friendly & Performance Optimized**
- **Buyer Ready & Future Proof**

> *Rule: Never build MVP-quality code. Always build production-quality architecture.*

---

## 2. No Hardcoded Values
Never hardcode:
- Text, Pricing, Limits, Plans, Categories, Settings
- AI Models, API URLs, Feature Flags, SEO Metadata
- Emails, Notifications, Questions, Flashcards

*Everything must originate from Database, Configuration, Admin CMS, or Environment Variables.*

---

## 3. Admin First
- If a value can change in the future, it MUST be editable from the **Super Admin CMS**.
- No developer intervention required for normal business operations.

---

## 4. Database Rules
- **Database Engine**: PostgreSQL via Supabase.
- **Primary Keys**: UUID primary keys.
- **Integrity**: Proper Foreign Keys, Indexes, Constraints, Soft Deletes (`deleted_at`), Audit Fields (`created_at`, `updated_at`, `created_by`, `updated_by`).
- **Security**: Supabase RLS policies on all tables.
- **Architecture**: Normalized design with migration support.

---

## 5. API Rules
- REST Standards & API Versioning.
- Standardized Pagination, Filtering, Sorting, and Searching.
- Rigorous Validation (Zod schemas), Structured Error Handling, Rate Limiting, OpenAPI specification readiness.

---

## 6. UI / UX Rules
- **Design System**: Apple-level design, smooth animations, dynamic dark mode support, modern typography.
- **Responsiveness**: Fully fluid across mobile, tablet, desktop.
- **States**: Skeleton loaders, loading states, empty states, error states.
- **Accessibility**: Full WCAG compliance, semantic HTML, properARIA attributes.

---

## 7. Performance Rules
- Lazy loading, code splitting, caching strategies.
- Optimized dynamic images, background job processing, streaming responses where appropriate.
- Minimal bundle size and optimized client side code execution.

---

## 8. Security Rules
- Role-Based Access Control (RBAC) & Permission checks on all routes/endpoints.
- Comprehensive audit logging.
- Encrypted secrets management.
- Input validation & output sanitization.
- Secure HTTP headers & rate limiting.

---

## 9. AI Engine Rules
- **Multi-Model Support**: OpenAI, Gemini, DeepSeek, Anthropic, OpenRouter, and future models.
- **Routing & Reliability**: Model routing, automated fallback, prompt versioning, prompt analytics.
- **Telemetry**: Full token usage tracking and cost tracking.

---

## 10. SEO Rules
Every page must support:
- Dynamic Metadata & JSON-LD Schema
- Canonical URLs, Open Graph, Twitter Cards
- Dynamic Breadcrumbs, Internal Linking strategy
- Auto-generated Sitemap & Robots.txt compliance
- Target SEO score validation

---

## 11. Testing Rules
Every feature must include:
- Unit Tests
- Integration Tests
- E2E Tests (Playwright)
- Accessibility Tests
- Regression Tests

---

## 12. Documentation Rules
Every feature MUST automatically create and maintain synchronized documentation:
- Create/Update `/docs/<feature-name>.md`
- Keep updated:
  - `PROJECT_INDEX.md`
  - `FEATURE_MAP.md`
  - `SYSTEM_MAP.md`
  - `ENGINE_MAP.md`
  - `API_MAP.md`
  - `DATABASE_MAP.md`
  - `DEPENDENCY_MAP.md`
  - `CHANGELOG.md`
  - `IMPLEMENTATION_STATUS.md`

---

## 13. Code Quality & Maintenance
- Strict TypeScript (`noImplicitAny`, strict null checks).
- ESLint and Prettier compliance.
- Zero duplicated logic or dead code.
- High reusability across utilities, hooks, services, and components.

---

## 14. Buyer Ready Standard
- Assume potential acquisition of the SaaS at all times.
- Clean folder structure, fully documented dependencies, setup procedures, and cost analysis.

---

## 15. Implementation Review Checklist
Before marking any task/feature complete, verify:
1. Architecture Review
2. Security Review
3. Performance Review
4. Documentation Review
5. Testing Review
6. SEO Review
7. Accessibility Review
8. Admin Review
9. Buyer Review
