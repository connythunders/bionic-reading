// Tillgänglighet med axe-core: inga allvarliga eller kritiska fel i någon vy, i alla fyra bakgrunder.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ROUTES, openRoute, withSettings } from './helpers.js';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const BACKGROUNDS = ['cream', 'grey', 'blue', 'dark'];

async function expectNoSevereViolations(page, label) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const severe = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(
    severe,
    `${label}: ${severe.map((v) => `${v.id} (${v.nodes.map((n) => n.target.join(' ')).join(' | ')})`).join('; ')}`,
  ).toEqual([]);
}

for (const bg of BACKGROUNDS) {
  for (const route of ROUTES) {
    test(`axe: ${route} i ${bg}`, async ({ page }) => {
      await withSettings(page, { background: bg });
      await openRoute(page, route);
      await expectNoSevereViolations(page, `${route} (${bg})`);
    });
  }
}

test('axe: övningsuppgift med ledtrådstrappa, miniräknare och uppläsningsknappar', async ({ page }) => {
  await openRoute(page, '/lektion/procent-vardag-1');
  // Gå fram till första övningen genom att visa svaret på allt före.
  for (let i = 0; i < 40 && !(await page.locator('.hints').count()); i++) {
    const field = page.locator('input.answer-input');
    if (await field.count()) {
      await field.fill('abc');
      await page.getByRole('button', { name: 'Kontrollera' }).click();
      await field.fill('-99999');
      await page.getByRole('button', { name: 'Kontrollera' }).click();
      await page.getByRole('button', { name: 'Visa svaret' }).click();
    }
    await page.getByRole('button', { name: 'Fortsätt' }).click();
  }
  await expect(page.locator('.hints')).toBeVisible();
  await page.getByRole('button', { name: 'Visa en bild' }).or(page.getByRole('button', { name: 'Läs upp uppgiften igen' })).click();
  await page.getByRole('button', { name: 'Miniräknare' }).click();
  await expectNoSevereViolations(page, 'övning med hjälp och miniräknare');
});

for (const lesson of ['tallinjen-1', 'decimaltal-1', 'brak-1', 'bdp-1']) {
  test(`axe: lektion ${lesson} (representationer)`, async ({ page }) => {
    await openRoute(page, `/lektion/${lesson}`);
    await expectNoSevereViolations(page, lesson);
  });
}

test('axe: lärarvyn efter att koden satts', async ({ page }) => {
  await openRoute(page, '/lararvy');
  await page.getByLabel('Lärarkod (minst 4 tecken)').fill('hemlig1');
  await page.getByLabel('Upprepa koden').fill('hemlig1');
  await page.getByRole('button', { name: 'Spara koden' }).click();
  await expect(page.getByRole('heading', { name: 'Läs in elevfiler' })).toBeVisible();
  await expectNoSevereViolations(page, 'lärarvyn');
});
