// Gemensamma hjälpare för e2e-testerna.
import { expect } from '@playwright/test';

export const APP = '/mattesteget/index.html';

/** Alla vyer som ska kunna nås utan inloggning. */
export const ROUTES = ['/', '/moduler', '/lektion/procent-vardag-1', '/ordlista', '/min-resa', '/installningar', '/lararvy', '/hjalp', '/idag'];

/** Öppnar en vy och väntar tills den är ritad. */
export async function openRoute(page, route = '/') {
  await page.goto(`${APP}#${route}`);
  await expect(page.locator('main h1')).toBeVisible();
}

/** Sparar inställningar innan appen startar (som om eleven valt dem tidigare). */
export async function withSettings(page, settings) {
  await page.addInitScript((s) => localStorage.setItem('ms.settings', JSON.stringify(s)), settings);
}

/** Samlar alla nätverksanrop så att vi kan kontrollera att inget går till andra domäner. */
export function trackRequests(page) {
  const urls = [];
  page.on('request', (r) => urls.push(r.url()));
  return urls;
}

/** Alla anrop ska gå till samma adress som appen. */
export function expectOnlySameOrigin(urls, origin) {
  const foreign = urls.filter((u) => !u.startsWith(origin) && !u.startsWith('data:') && !u.startsWith('blob:'));
  expect(foreign, `anrop till andra adresser: ${foreign.join(', ')}`).toEqual([]);
}

/** Facit för första lektionen i Procent, i den ordning skärmarna kommer. */
export const PROCENT_1_ANSWERS = ['300', '1/5', '100', '300', '300', '10', '1000', '300', '300', '40', '180', '500', '25'];
