# Jones Automation Exercise

Playwright automation for [https://test.netlify.app/](https://test.netlify.app/): fill the callback form, capture a pre-submit screenshot, submit, and verify the thank-you page.

## Project layout

| Path | Purpose |
|------|---------|
| `package.json` | Node project metadata, `npm test` script, Playwright dependency |
| `playwright.config.js` | Test runner settings (base URL, Chromium, timeouts) |
| `data/formData.js` | URLs and form values used by the test |
| `helpers/formActions.js` | Reusable browser steps (navigation, fill, screenshot, submit) |
| `tests/callback-form.spec.js` | Single spec that runs the full flow in order |
| `screenshots/` | Output folder for the required pre-submit screenshot |

## Setup

```bash
npm install
```

`npm install` installs `@playwright/test` and runs **`postinstall`**, which downloads **Chromium** for Playwright (needs internet). If browsers are missing, run:

```bash
npm run install:browsers
```

## Run tests

By default, tests run in a **visible** Chromium window with **500ms slow motion** between actions (see `playwright.config.js`).

```bash
npm test
npm test -- --grep "opens the landing page"
```

Headless (no window), e.g. for CI:

```bash
set CI=1&& npm test
```

Optional: `npm run test:headed` (same as `npm test` locally with current config).

Pre-submit screenshots are written to `screenshots/` (see `screenshotName` in `data/formData.js`).

## Thank-you verification

After submit, the test waits for URL `thank-you.html` and a heading matching **Thank You** (`waitForThankYouPage` in `helpers/formActions.js`).
