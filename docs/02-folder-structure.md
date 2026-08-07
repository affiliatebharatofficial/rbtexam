# 02. Folder Structure - RBTTrainingAI SaaS

## Purpose
This document provides a comprehensive mapping of the RBTTrainingAI codebase folder structure, detailing module organization, component grouping, service boundaries, and utility distribution for senior software engineers and system architects.

## Architecture
The application adheres to Next.js App Router architectural guidelines:
- `/app`: Next.js page routes, layouts, API endpoints, metadata, and CSS.
- `/components`: Modular UI components categorized into `landing`, `layout`, `seo`, and `ui`.
- `/lib`: Core business domain entities, sample data banks, task lists, and algorithm implementations.
- `/services`: Third-party API wrappers (Supabase, Stripe, AI provider clients).
- `/utils`: Helper formatting routines, SEO generator, calculation utilities.
- `/docs`: Technical system documentation.

## Folder Location
`g:\RBT\`

```
g:\RBT\
├── app/
│   ├── analytics/        # Candidate readiness score heatmaps & analytics
│   ├── clinic/           # B2B Clinic supervisor dashboard & cohort tracking
│   ├── dashboard/        # Candidate main learning portal
│   ├── exam/             # 85-question 90-minute exam simulator
│   ├── flashcards/       # Leitner 5-box spaced repetition deck
│   ├── pricing/          # Subscription plans & pass guarantee purchase
│   ├── task-list/        # BACB 2nd Edition interactive study guide
│   ├── tutor/            # Socrates AI Socratic tutor interface
│   ├── globals.css       # Tailwind CSS v4 & custom glassmorphism styles
│   ├── layout.tsx        # Global root layout (Navbar, Footer, SEO)
│   ├── page.tsx          # Landing page assembling all 14 marketing sections
│   ├── robots.ts         # SEO bot crawler instructions
│   └── sitemap.ts        # XML sitemap generator
├── components/
│   ├── landing/          # Landing page sections (Hero, Features, Previews, etc.)
│   ├── layout/           # Shared Navigation Bar & Footer
│   ├── seo/              # Schema.org JSON-LD structured data scripts
│   └── ui/               # Reusable atomic UI components (Button, Card, Badge, etc.)
├── database/             # PostgreSQL migrations & Supabase schemas
├── docs/                 # System technical documentation (01-23 .md files)
├── hooks/                # Custom React state hooks (useExamTimer, useFlashcards)
├── lib/                  # BACB task lists, question banks, spaced repetition algorithms
├── services/             # Supabase client & external API integrations
├── types/                # TypeScript interface definitions (Exam, Question, User)
└── utils/                # Formatting, domain color generators, SEO metadata helpers
```

## Database Tables Used
Not directly tied to a database table; describes filesystem organization.

## API Endpoints
App router routes mapped:
- `/exam` -> Mock exam interface
- `/tutor` -> Socrates AI chat interface
- `/flashcards` -> Flashcards deck
- `/analytics` -> Performance visualizer
- `/clinic` -> Supervisor portal

## Workflow
Developers browse modules based on functional responsibility:
1. Landing Page edits: `components/landing/` & `app/page.tsx`
2. Exam logic edits: `app/exam/` & `lib/sample-questions.ts`
3. Flashcard logic edits: `app/flashcards/` & `lib/spaced-repetition.ts`
4. Task List definitions: `lib/bacb-task-list.ts`

## Data Flow
Static imports link `lib` data models into `components` for rendering inside `app` routes.

## Business Logic
Enforces separation of concerns: UI components receive props and emit events; `lib` modules compute domain algorithms (e.g. Leitner box incrementing, domain weighting).

## Security Notes
Directory permissions follow standard server-side node process safety. Sensitive environment keys stored in `.env.local`.

## Performance Considerations
Organized to allow automatic Next.js code-splitting per route. Shared landing components bundled in single chunk for optimal LCP (Largest Contentful Paint).

## Future Improvements
Implement automated feature component generator CLI scripts to maintain uniform module creation.

## Dependencies
- `next`: ^16.3.0
- `typescript`: ^5.0.0

## Related Files
- [app/layout.tsx](file:///g:/RBT/app/layout.tsx)
- [app/page.tsx](file:///g:/RBT/app/page.tsx)
- [package.json](file:///g:/RBT/package.json)
