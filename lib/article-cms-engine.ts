import { Article, ArticleCategory, ArticleStatus, CreateArticleInput, UpdateArticleInput } from '@/types/article-cms';

const STORAGE_KEY = 'rbt_article_cms_data';

export const INITIAL_SEED_ARTICLES: Article[] = [
  {
    id: 'art-rbt-2026-guide',
    slug: 'complete-rbt-exam-study-guide-2026',
    title: 'Complete RBT Exam 2026 Study Guide: BACB 2nd Edition TCO Breakdown',
    summary: 'A comprehensive, domain-by-domain preparation guide for RBT candidates covering Measurement, Assessment, Skill Acquisition, Behavior Reduction, Documentation, and Ethics.',
    content: `# Complete RBT Exam 2026 Study Guide

Preparing for your **Registered Behavior Technician (RBT)** examination requires a clear understanding of the 6 core domains outlined in the BACB RBT 2nd Edition Test Content Outline (TCO).

## BACB RBT Exam Domain Weightage

| Domain Code | BACB Task List Domain Name | Exam Questions % | Priority Level |
| :--- | :--- | :--- | :--- |
| **Domain A** | Measurement & Data Collection | 12 Questions (14%) | High |
| **Domain B** | Assessment Procedures | 8 Questions (9%) | Medium |
| **Domain C** | Skill Acquisition Procedures | 24 Questions (28%) | Critical |
| **Domain D** | Behavior Reduction Procedures | 20 Questions (24%) | Critical |
| **Domain E** | Documentation & Reporting | 10 Questions (12%) | High |
| **Domain F** | Professional Conduct & Ethics Scope | 11 Questions (13%) | High |

---

## 1. Domain C: Skill Acquisition Breakdown

Skill Acquisition forms the largest portion of your official exam (**28%**). Focus heavily on Discrete Trial Teaching (DTT), Task Analysis, and Prompting Hierarchies.

### Least-to-Most Prompt Hierarchy Table

| Prompt Level | Type | Clinical Description | Example Scenario |
| :--- | :--- | :--- | :--- |
| **Level 1** | Independent | No prompt given | Child washes hands upon hearing "Wash your hands" |
| **Level 2** | Visual / Gestural | Pointing or card prompt | Pointing to the soap dispenser |
| **Level 3** | Verbal Prompt | Direct verbal instruction | Saying "Turn on the water" |
| **Level 4** | Modeling | Demonstrating target behavior | BCBA models scrubbing hands for 20s |
| **Level 5** | Partial Physical | Guiding at elbow or wrist | Guiding candidate wrist toward faucet |
| **Level 6** | Full Physical | Hand-over-hand physical guidance | Full hand-over-hand assistance to turn faucet |

---

## 2. Key Ethics Rule (Domain F)

- **Dual Relationships**: RBTs must never engage in personal, financial, or romantic relationships with clients or client families.
- **Gift Acceptance**: RBTs should refrain from accepting gifts with financial value to preserve objective professional boundaries.
`,
    category: 'RBT Exam Guide',
    tags: ['RBT Study Guide', 'BACB Exam', 'Skill Acquisition', 'Ethics'],
    coverImageUrl: '/banner-rbt-hero.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 7,
    status: 'published',
    viewsCount: 240,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'art-dro-vs-dra-guide',
    slug: 'dro-vs-dra-differential-reinforcement-explained',
    title: 'DRO vs DRA: Mastering Differential Reinforcement Procedures with Clinical Examples',
    summary: 'Learn the exact difference between Differential Reinforcement of Other Behavior (DRO) and Differential Reinforcement of Alternative Behavior (DRA) for the RBT exam.',
    content: `# DRO vs DRA: Differential Reinforcement Masterclass

Differential Reinforcement (Domain D) accounts for roughly **24% of your RBT exam grade**. A common trap on the exam is confusing **DRO** and **DRA**.

## Comparison Table: DRO vs. DRA vs. DRI

| Procedure | Full Name | Reinforcement Rule | Key Clinical Example |
| :--- | :--- | :--- | :--- |
| **DRO** | Differential Reinforcement of **Other** Behavior | Reinforce candidate whenever target behavior is **ZERO** during interval. | Student gets token every 5 mins without hand-biting. |
| **DRA** | Differential Reinforcement of **Alternative** Behavior | Reinforce a functional, appropriate **alternative** behavior. | Student raises hand instead of shouting to gain attention. |
| **DRI** | Differential Reinforcement of **Incompatible** Behavior | Reinforce behavior that is physically **impossible** to do simultaneously. | Clapping hands instead of skin-picking. |

---

## Exam Tip for DRO Questions
> [!TIP]
> If the scenario specifies that reinforcement is delivered for **zero occurrences of problem behavior** regardless of what else the client does, the answer is **DRO**.
`,
    category: 'ABA Techniques',
    tags: ['Differential Reinforcement', 'DRO', 'DRA', 'Domain D'],
    coverImageUrl: '/cert-badge-bacb.png',
    authorName: 'Jobpe gyan (Senior BCBA)',
    readTimeMinutes: 5,
    status: 'published',
    viewsCount: 185,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function calculateReadTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function getAllArticles(): Article[] {
  if (typeof window === 'undefined') return INITIAL_SEED_ARTICLES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ARTICLES));
      return INITIAL_SEED_ARTICLES;
    }
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_SEED_ARTICLES;
  }
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => a.status === 'published');
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug.toLowerCase().trim()) || null;
}

export function saveArticles(articles: Article[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage:', e);
    }
  }
}

export function createArticle(input: CreateArticleInput): Article {
  const articles = getAllArticles();
  const baseSlug = generateSlug(input.title);
  let slug = baseSlug;
  let counter = 1;

  while (articles.some((a) => a.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const now = new Date().toISOString();
  const newArticle: Article = {
    id: `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    slug,
    title: input.title.trim(),
    summary: input.summary.trim(),
    content: input.content,
    category: input.category || 'RBT Exam Guide',
    tags: input.tags || ['RBT'],
    coverImageUrl: input.coverImageUrl || '/banner-rbt-hero.png',
    authorName: input.authorName || 'Jobpe gyan',
    readTimeMinutes: calculateReadTime(input.content),
    status: input.status || 'draft',
    viewsCount: 0,
    publishedAt: input.status === 'published' ? now : undefined,
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newArticle, ...articles];
  saveArticles(updatedList);
  return newArticle;
}

export function updateArticle(input: UpdateArticleInput): Article | null {
  const articles = getAllArticles();
  const idx = articles.findIndex((a) => a.id === input.id);
  if (idx === -1) return null;

  const existing = articles[idx];
  const now = new Date().toISOString();

  let slug = existing.slug;
  if (input.title && input.title !== existing.title) {
    slug = generateSlug(input.title);
  }

  const updatedArticle: Article = {
    ...existing,
    ...(input.title && { title: input.title.trim() }),
    ...(input.summary && { summary: input.summary.trim() }),
    ...(input.content && { content: input.content, readTimeMinutes: calculateReadTime(input.content) }),
    ...(input.category && { category: input.category }),
    ...(input.tags && { tags: input.tags }),
    ...(input.coverImageUrl !== undefined && { coverImageUrl: input.coverImageUrl }),
    ...(input.authorName && { authorName: input.authorName }),
    ...(input.status && {
      status: input.status,
      publishedAt: input.status === 'published' && !existing.publishedAt ? now : existing.publishedAt,
    }),
    slug,
    updatedAt: now,
  };

  articles[idx] = updatedArticle;
  saveArticles(articles);
  return updatedArticle;
}

export function deleteArticle(id: string): boolean {
  const articles = getAllArticles();
  const filtered = articles.filter((a) => a.id !== id);
  if (filtered.length === articles.length) return false;
  saveArticles(filtered);
  return true;
}

export function incrementArticleViews(id: string): void {
  const articles = getAllArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx !== -1) {
    articles[idx].viewsCount = (articles[idx].viewsCount || 0) + 1;
    saveArticles(articles);
  }
}
