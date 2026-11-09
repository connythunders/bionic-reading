// Offline och dataskydd: inga anrop till andra domäner, och appen fungerar utan nätverk efter första besöket.
import { test, expect } from '@playwright/test';
import { APP, ROUTES, openRoute, trackRequests, expectOnlySameOrigin } from './helpers.js';

test('inga nätverksanrop till andra domäner i någon vy, och inga cookies', async ({ page, context, baseURL }) => {
  const urls = trackRequests(page);
  for (const route of ROUTES) await openRoute(page, route);
  expectOnlySameOrigin(urls, baseURL);
  expect(await context.cookies(), 'appen sätter inga cookies').toEqual([]);
});

test('appen fungerar helt offline efter första besöket', async ({ page, context, baseURL }) => {
  // ?sw=1 slår på service workern även på localhost
  await page.goto(`${APP}?sw=1`);
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
  await page.reload(); // nu styrs sidan av service workern
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

  // Alla filer ska redan finnas i cachen
  const cached = await page.evaluate(async () => {
    const names = await caches.keys();
    const cache = await caches.open(names[0]);
    return (await cache.keys()).length;
  });
  expect(cached).toBeGreaterThan(50);

  await context.setOffline(true);
  const urls = trackRequests(page);
  await page.reload();
  await expect(page.locator('main h1')).toBeVisible();

  // Innehåll, lektion, uppläsningsknappar och ordlista fungerar utan nätverk
  await page.goto(`${APP}?sw=1#/lektion/procent-vardag-1`);
  await expect(page.getByRole('heading', { name: 'Rabatt: procent av ett pris' })).toBeVisible();
  await expect(page.locator('.formula math').first()).toBeVisible();
  await page.goto(`${APP}?sw=1#/ordlista`);
  await expect(page.getByRole('heading', { name: 'Andel' })).toBeVisible();
  expectOnlySameOrigin(urls, baseURL);
});

test('appen kan installeras: manifest och ikoner finns och är giltiga', async ({ page, request }) => {
  await openRoute(page, '/');
  const href = await page.locator('link[rel="manifest"]').getAttribute('href');
  const manifest = await (await request.get(new URL(href, page.url()).href)).json();
  expect(manifest.display).toBe('standalone');
  expect(manifest.start_url).toBe('./');
  const sizes = manifest.icons.map((i) => i.sizes);
  expect(sizes).toContain('192x192');
  expect(sizes).toContain('512x512');
  for (const icon of manifest.icons) {
    const res = await request.get(new URL(icon.src, new URL(href, page.url())).href);
    expect(res.ok(), icon.src).toBe(true);
  }
});
