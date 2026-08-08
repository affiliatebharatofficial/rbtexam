# DEPENDENCY MAP — RBT Practice Questions SaaS

## Production Dependencies (`package.json`)

| Package | Version | Purpose | Engine Usage |
|---|---|---|---|
| `next` | `16.3.0` | React framework with Turbopack | Routing, SSR/SSG, API Routes |
| `react` / `react-dom` | `19.2.8` | UI library | Frontend views |
| `lucide-react` | `^1.29.0` | Iconography | Admin CMS & Dashboards |
| `clsx` / `tailwind-merge` | `^2.1.1` / `^3.6.0` | Dynamic CSS class merging | UI Component system |
| `canvas-confetti` | `^1.9.4` | Gamification animations | Test completion view |

## Development Dependencies

| Package | Purpose |
|---|---|
| `vitest` / `@vitest/coverage-v8` | Unit & Integration test runner + coverage |
| `@testing-library/react` | React component rendering tests |
| `@playwright/test` | End-to-end browser smoke test runner |
| `jsdom` | Browser DOM simulation environment |
| `typescript` | Static type checker (`^5`) |
| `tailwindcss` | Utility-first CSS engine (`^4`) |
| `eslint` / `eslint-config-next` | Code formatting & linting |

## Related Files
- [package.json](file:///g:/RBT/package.json)
- [vitest.config.ts](file:///g:/RBT/vitest.config.ts)
- [playwright.config.ts](file:///g:/RBT/playwright.config.ts)
