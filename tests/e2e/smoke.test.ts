import { test, expect } from '@playwright/test';

/**
 * E2E Smoke Tests — Critical User Journeys
 *
 * These smoke tests verify the most critical user paths are functional.
 * They run on every PR and deployment.
 */

test.describe('Homepage — Smoke Tests', () => {
  test('landing page loads and shows hero headline', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/RBT/i);
    // Hero section should be visible
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    // Check for at least one navigation link
    const navLinks = page.locator('nav a, header a');
    await expect(navLinks.first()).toBeVisible();
  });

  test('login page is reachable', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/login/);
    // Login form should be present
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('signup page is reachable', async ({ page }) => {
    await page.goto('/signup');
    await expect(page).toHaveURL(/signup/);
  });

  test('pricing page loads', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page).toHaveURL(/pricing/);
  });
});

test.describe('SEO — Metadata Checks', () => {
  test('homepage has meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('sitemap.xml is accessible', async ({ page }) => {
    const res = await page.goto('/sitemap.xml');
    expect(res?.status()).toBe(200);
    const content = await page.content();
    expect(content.toLowerCase()).toMatch(/xml|urlset|sitemap/);
  });

  test('robots.txt is accessible', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    expect(res?.status()).toBe(200);
    const content = await page.content();
    expect(content.toLowerCase()).toContain('user-agent');
  });
});

test.describe('Accessibility — Critical Pages', () => {
  test('homepage has a main landmark', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('login page form labels are present', async ({ page }) => {
    await page.goto('/login');
    const labels = page.locator('label');
    const count = await labels.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Responsive Layout — Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14 dimensions

  test('landing page renders on mobile without horizontal scroll', async ({ page }) => {
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width ?? 390;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // 5px tolerance
  });
});
