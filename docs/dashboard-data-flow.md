# Executive BI & Dashboard Data Flow Architecture

## 1. Data Flow Pipeline
All dashboard scorecards, analytical charts, and telemetry metrics originate directly from PostgreSQL database queries via Supabase REST API or internal analytics event buffer:

```
[ PostgreSQL / Supabase DB ] ──> [ REST API / Server Action ] ──> [ Analytics Engine ] ──> [ Dashboard UI ]
                                                                       │
                                                            (If record count == 0)
                                                                       ▼
                                                             [ Apple Empty State ]
```

## 2. Zero-Data State Handling
- If `recordCount == 0`, static scorecards display `$0` / `0` / `No data yet`.
- Analytical charts are automatically hidden.
- An Apple-level `EmptyState` component is rendered with a clear call-to-action (CTA).

## 3. Related Files
- Analytics Engine: [analytics-engine.ts](file:///g:/RBT/lib/analytics-engine.ts)
- Super Admin Dashboard: [page.tsx](file:///g:/RBT/app/admin/page.tsx)
