---
name: playwright-script-and-run
description: Use when building or executing Playwright tests that must remain maintainable, data-driven, cross-browser, and backed by selectable output folders.
---

# Playwright Script and Run

## Build

- Install Playwright in the target project with its existing package manager; do not overwrite project dependencies without review.
- Configure browser projects explicitly. Use Chromium/Firefox/WebKit, or Chrome/Edge/Firefox when the assignment permits it.
- Read datasets with `fs`/imports and generate tests from the complete `testCases` array.
- Create small helpers for login, navigation, fixtures, and scoped locators. Verify actual DOM semantics before choosing `getByLabel`, `getByRole`, or CSS.
- Assert URL, visible text, and control state. Scope repeated text to its row/card/cell.
- Use observable waits such as `expect(locator).toBeVisible()` or `waitForURL`; never use arbitrary sleep.

## Run outputs

Make output configurable, for example:

```bash
FINDINGS_DIR=findings/feature-browser \
STUDENT_ID=12345678 BASE_URL=http://localhost:3000 \
npx playwright test tests/feature.spec.ts --project=chrome --workers=1
```

Configure `outputDir` as `$FINDINGS_DIR/test-results` and the HTML reporter as `$FINDINGS_DIR/playwright-report`, with title/metadata containing `Run by: $STUDENT_ID` and an ISO timestamp.

For stateful systems, start services, run the documented reset/seed command before each browser run, then execute Chrome, Edge, and Firefox separately. Save the exact command and raw result. A browser launch error is an environment finding, not a product pass.
