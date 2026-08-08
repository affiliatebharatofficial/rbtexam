# Master Project Brain Architecture — RBT Practice Questions SaaS

## Purpose
The Master Project Brain is the permanent intelligence layer and single source of truth for RBT Practice Questions. It continuously maintains the project index, feature registry, API mapping, database schema, component graph, implementation status, and acquisition documentation.

## Architecture

```
                       ┌─────────────────────────┐
                       │  Master Project Brain   │
                       │(lib/project-brain-engine)│
                       └────────────┬────────────┘
                                    │ Self-Inspection
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌──────────────┐            ┌──────────────┐            ┌──────────────┐
│Feature Reg.  │            │ API Registry │            │ Database Reg.│
│  12 Modules  │            │ 20 Endpoints │            │  35 Tables   │
└──────────────┘            └──────────────┘            └──────────────┘
```

## Folder Location
- `g:\RBT\types\project-brain.ts`
- `g:\RBT\lib\project-brain-engine.ts`
- `g:\RBT\database\project-brain-schema.sql`
- `g:\RBT\app\admin\project-brain\page.tsx`
- `g:\RBT\app\api\admin\project-brain\route.ts`

## Related Files
- [docs/PROJECT_INDEX.md](file:///g:/RBT/docs/PROJECT_INDEX.md)
- [docs/FEATURE_MAP.md](file:///g:/RBT/docs/FEATURE_MAP.md)
- [docs/ENGINE_MAP.md](file:///g:/RBT/docs/ENGINE_MAP.md)
