# Bing & Multi-Search-Engine IndexNow Protocol Integration

## Overview
The **Bing IndexNow Engine** provides automated, instant discovery and rapid indexation for all platform pages, dynamic BACB question simulators, ABA glossary terms, and educational articles across participating search engines (Microsoft Bing, Yandex, Naver, and Seznam.cz).

---

## 1. Architecture & Protocol Standards
- **API Key**: `e39f75ba5a894762b71efc5e3d748f21`
- **Verification Endpoint**: `https://www.rbtpracticeai.com/e39f75ba5a894762b71efc5e3d748f21.txt`
- **Static Host File**: `public/e39f75ba5a894762b71efc5e3d748f21.txt`
- **Primary Endpoint**: `https://api.indexnow.org/indexnow`
- **Fallback Endpoints**:
  - `https://www.bing.com/indexnow`
  - `https://yandex.com/indexnow`

---

## 2. Core Components

| Component | File Path | Description |
|---|---|---|
| **Type Definitions** | `types/indexnow.ts` | Strict TypeScript types for payload, config, logs, and responses |
| **Engine Service** | `lib/indexnow-engine.ts` | URL normalization, dynamic sitemap aggregation, batching (10,000 URL chunks), and API dispatcher |
| **REST API Route** | `app/api/indexnow/route.ts` | `GET` for diagnostics/stats, `POST` for on-demand URL pushes and 1-click site re-indexing |
| **Super Admin CMS Hub** | `app/admin/page.tsx` (`tab=indexnow`) | Real-time UI with 1-click push button, custom URL form, credential verification, and live audit logs |
| **Article CMS Hook** | `lib/article-cms-engine.ts` | Automated background push to IndexNow whenever an article is published |
| **CLI Tool** | `scripts/submit-indexnow.mjs` | Multi-endpoint CLI script (`npm run submit:indexnow`) |
| **Verification Key** | `public/e39f75ba5a894762b71efc5e3d748f21.txt` | Key file served at website root for crawler verification |
| **Unit Test Suite** | `tests/unit/indexnow-engine.test.ts` | 7/7 passing unit test suite with mock endpoints and sitemap validation |

---

## 3. API Usage

### `POST /api/indexnow`
Submit individual URLs or trigger whole-site submission.

**Example: Submit All Site URLs**
```json
{
  "submitAll": true
}
```

**Example: Submit Custom URLs**
```json
{
  "urls": [
    "https://www.rbtpracticeai.com/rbt/mock-exam",
    "https://www.rbtpracticeai.com/articles/complete-rbt-exam-study-guide-2026"
  ]
}
```

### `GET /api/indexnow`
Returns current configuration, total indexable URLs discovered, and recent submission logs.

---

## 4. CLI Execution
To submit all URLs to Bing IndexNow via command line:
```bash
npm run submit:indexnow
```
Or submit a specific URL:
```bash
node scripts/submit-indexnow.mjs --url=/rbt/practice-test
```

---

## 5. Search Engines Supported
- **Microsoft Bing**
- **Yandex**
- **Naver** (via IndexNow API)
- **Seznam.cz** (via IndexNow API)
