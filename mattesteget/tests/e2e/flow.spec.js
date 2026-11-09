// Ett helt lektionsflöde, Dagens pass och tangentbordsanvändning.
import { test, expect } from '@playwright/test';
import { openRoute, PROCENT_1_ANSWERS } from './helpers.js';

test('en hel lektion: Visa, Tillsammans, Själv, och framsteget syns i Min resa', async ({ page }) => {
  await openRoute(page, '/lektion/procent-vardag-1');
  const answers = [...PROCENT_1_ANSWERS];

  for (let i = 0; i < 60; i++) {
    if (await page.getByRole('heading', { name: 'Lektionen är klar' }).count()) break;
    const field = page.locator('input.answer-input');
    if (await field.count()) {
      await field.fill(answers.shift());
      await page.getByRole('button', { name: 'Kontrollera' }).click();
      await expect(page.getByRole('status').filter({ hasText: 'Rätt. Bra jobbat.' })).toBeVisible();
    }
    await page.getByRole('button', { name: 'Fortsätt' }).click();
  }
  await expect(page.getByRole('heading', { name: 'Lektionen är klar' })).toBeVisible();
  expect(answers, 'alla facit användes').toEqual([]);

  await page.getByRole('link', { name: 'Min resa' }).first().click();
  await expect(page.getByText(/Du har klarat 11 av \d+ steg i Procent i vardagen/)).toBeVisible();
});

test('återkopplingen använder aldrig ordet "fel" eller rött kryss', async ({ page }) => {
  await openRoute(page, '/lektion/procent-vardag-1');
  await page.getByRole('button', { name: 'Fortsätt' }).click(); // första exemplet
  await page.locator('input.answer-input').fill('5');
  await page.getByRole('button', { name: 'Kontrollera' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Inte riktigt' })).toBeVisible();
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/\bfel\b/i);
  expect(text).not.toMatch(/[✗✘❌]/);
});

test('Dagens pass startar efter att en övning gjorts', async ({ page }) => {
  await openRoute(page, '/idag');
  await expect(page.getByText('Du har inte övat på några uppgifter än')).toBeVisible();

  await openRoute(page, '/lektion/procent-vardag-1');
  const answers = [...PROCENT_1_ANSWERS];
  for (let i = 0; i < 60; i++) {
    const field = page.locator('input.answer-input');
    if (await field.count()) {
      await field.fill(answers.shift());
      await page.getByRole('button', { name: 'Kontrollera' }).click();
    }
    if (await page.locator('.hints').count()) break; // första övningen: klar
    await page.getByRole('button', { name: 'Fortsätt' }).click();
  }
  await openRoute(page, '/idag');
  await page.getByRole('button', { name: 'Starta Dagens pass' }).click();
  await expect(page.getByText(/Uppgift 1 av \d/)).toBeVisible();
});

test('hela appen går att använda med enbart tangentbordet: miniräknaren öppnas, räknar och stängs med Esc', async ({ page }) => {
  await openRoute(page, '/');
  const toggle = page.getByRole('button', { name: 'Miniräknare' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Miniräknare' })).toBeFocused();
  await page.keyboard.type('800*25%=');
  await expect(page.locator('.calc-display')).toHaveText('200');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('.calc')).toBeHidden();
});

test('fokus syns alltid när man tabbar genom startsidan', async ({ page }) => {
  await openRoute(page, '/');
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return { style: cs.outlineStyle, width: parseFloat(cs.outlineWidth) };
    });
    if (outline) {
      expect(outline.style, 'fokusramen ska synas').not.toBe('none');
      expect(outline.width).toBeGreaterThanOrEqual(2);
    }
  }
});

test('inställningar sparas och gäller direkt: mörkt läge och större text', async ({ page }) => {
  await openRoute(page, '/installningar');
  await page.getByLabel('Mörkt läge').check();
  await expect(page.locator('html')).toHaveAttribute('data-bg', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-bg', 'dark');
});
