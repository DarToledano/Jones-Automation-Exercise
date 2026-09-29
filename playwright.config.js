// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Test runner settings for this project.
 * baseURL avoids repeating the full site URL in every navigation step.
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'https://test.netlify.app/',
    // Local runs: visible browser + pause between actions so steps are easy to follow.
    headless: !!process.env.CI,
    launchOptions: {
      slowMo: process.env.CI ? 0 : 500,
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
