# FR-01 Bug Report

## Run summary

The three browser runs executed all 14 data-driven cases. Every case stopped while filling the first field, so the Confirm Password skip branch and the registration assertions were not reached.

| Browser | Total | Passed | Failed | Skipped | Report |
|---|---:|---:|---:|---:|---|
| Chrome | 14 | 0 | 14 | 0 | [`playwright-report`](findings/fr01-chrome/playwright-report/index.html) |
| Edge | 14 | 0 | 14 | 0 | [`playwright-report`](findings/fr01-edge/playwright-report/index.html) |
| Firefox | 14 | 0 | 14 | 0 | [`playwright-report`](findings/fr01-firefox/playwright-report/index.html) |

## Defects and test limitations

### DEMO-TEST-001 — Form locator does not match the real DOM

| Field | Details |
|---|---|
| Feature | FR-01 — Account Registration |
| Severity | Test-blocking |
| Classification | Test-script / locator error |
| Preconditions | EShop frontend is running at `http://localhost:5173/register` |
| Steps | Navigate to `/register`; attempt to fill the first registration input |
| Expected | The script fills the name field and continues to the registration assertions |
| Actual | `locator.fill` times out waiting for `getByRole('form').locator('input[type="text"]').first()` |
| Scope | Reproduced in Chrome, Edge, and Firefox |
| Evidence | [`Chrome test-results`](findings/fr01-chrome/test-results/), [`Edge test-results`](findings/fr01-edge/test-results/), [`Firefox test-results`](findings/fr01-firefox/test-results/) |

The accessibility snapshot shows the registration inputs under `main`, but no accessible `form` node. The script should scope fields to a stable rendered container or use page-level semantic locators after inspecting the DOM. This is not a product bug because the test cannot yet exercise the registration behavior.

## Not yet classified

The run does not provide valid evidence for URL redirect, password validation, duplicate email, required fields, or Confirm Password behavior. Re-run after fixing `DEMO-TEST-001`; retain the Confirm Password case as an explicit unsupported skip if the SUT still does not render that control.
