// Playwright körs bara i GitHub Actions (och på dator med Node). Appen har inga beroenden i körtid.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    locale: 'sv-SE',
    trace: 'retain-on-failure',
  },
  // Appen publiceras som den är under /mattesteget/, så vi serverar mappen ovanför.
  webServer: {
    command: 'python3 -m http.server 4173',
    cwd: '..',
    url: 'http://localhost:4173/mattesteget/index.html',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'dator', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobil', use: { ...devices['Pixel 7'] } },
  ],
});
