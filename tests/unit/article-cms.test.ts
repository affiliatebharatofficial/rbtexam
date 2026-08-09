import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleBySlug,
  generateSlug,
} from '../../lib/article-cms-engine';

describe('Article & Blog CMS Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should generate clean URL slugs from article titles', () => {
    expect(generateSlug('Mastering Continuous vs Discontinuous Measurement! Target 2026'))
      .toBe('mastering-continuous-vs-discontinuous-measurement-target-2026');
  });

  it('should create, update, and fetch articles', () => {
    const created = createArticle({
      title: 'Unit Test BACB Ethics Guide',
      summary: 'Summary of ethical guidelines for RBT candidates',
      content: '# Ethics Guide\n\n| Guideline | Description |\n| --- | --- |\n| 1.01 | Truthfulness |',
      category: 'BACB Ethics',
      status: 'published',
    });

    expect(created.id).toBeDefined();
    expect(created.title).toBe('Unit Test BACB Ethics Guide');
    expect(created.slug).toContain('unit-test-bacb-ethics-guide');

    const fetched = getArticleBySlug(created.slug);
    expect(fetched).not.toBeNull();
    expect(fetched?.category).toBe('BACB Ethics');

    const updated = updateArticle({
      id: created.id,
      title: 'Updated BACB Ethics Guide',
      status: 'published',
    });

    expect(updated?.title).toBe('Updated BACB Ethics Guide');

    const deleted = deleteArticle(created.id);
    expect(deleted).toBe(true);
  });

  it('should verify Admin Article CMS page and API routes exist', () => {
    const adminCMSPath = path.join(process.cwd(), 'app', 'admin', 'articles', 'page.tsx');
    const apiRoutePath = path.join(process.cwd(), 'app', 'api', 'admin', 'articles', 'route.ts');
    const publicRoutePath = path.join(process.cwd(), 'app', 'articles', 'page.tsx');

    expect(fs.existsSync(adminCMSPath)).toBe(true);
    expect(fs.existsSync(apiRoutePath)).toBe(true);
    expect(fs.existsSync(publicRoutePath)).toBe(true);
  });
});
