# Jones Automation Exercise

Playwright automation for https://test.netlify.app/: fill the callback form, capture a pre-submit screenshot, submit, and verify the thank-you page.

## Project Layout

| Path | Purpose |
|------|---------|
| `package.json` | Node project metadata, npm scripts, and project dependencies |
| `playwright.config.js` | Playwright test runner configuration |
| `data/formData.js` | URLs and test data used by the automation |
| `helpers/formActions.js` | Page Object containing reusable browser actions |
| `utils/logger.js` | Winston logger configuration for console and file logging |
| `tests/callback-form.spec.js` | Playwright test that executes and verifies the complete callback flow |
| `screenshots/` | Generated pre-submit screenshots |
| `logs/` | Generated automation log files |

## Setup

Install all project dependencies:

```bash
npm install
```

This installs the dependencies defined in `package.json`, including Playwright and Winston.

The `postinstall` script also downloads Chromium for Playwright (internet connection required).

If the Playwright browser is missing, run:

```bash
npm run install:browsers
```

## Run Tests

By default, tests run in a visible Chromium window with 500ms slow motion between actions (see `playwright.config.js`).

```bash
npm test
```

To run in headless mode, for example in CI:

```bash
set CI=1&& npm test
```

Optional:

```bash
npm run test:headed
```

## Logging

The project uses Winston for structured logging.

Logs are:
- Displayed in the console during test execution.
- Written to `logs/automation.log`.

Each log entry contains a timestamp, log level, and message, for example:

```text
[2026-09-30T12:30:21.123Z] [INFO] Opening callback form
[2026-09-30T12:30:22.417Z] [INFO] Filling callback form fields
[2026-09-30T12:30:24.102Z] [INFO] Taking pre-submit screenshot
[2026-09-30T12:30:26.005Z] [INFO] Thank-you page reached
```

The logger records the main automation steps without logging sensitive form data.

## Screenshot

A screenshot is captured before the form is submitted and written to the `screenshots/` directory.

The screenshot filename is configured in `data/formData.js`.

## Thank-you Verification

After submission, the test verifies that:

- The browser navigates to `thank-you.html`.
- A heading matching `Thank You` is visible.

These checks confirm that the callback form flow completed successfully.