# HW04 Main Report - AI Automation Testing

## 1. Overview

- Student: Le Mai Hoai Bao
- Student ID: 23127326
- SUT: `eshop-sut`
- Repository: https://github.com/HCMUS-software-testing/HW04.git
- Automation framework: Playwright
- Browsers: Chromium, Firefox, WebKit
- Last recorded run: 2026-08-20T15:45:31Z
- HTML report: `submit/playwright-report/index.html`
- Demo video: `TBD - add unlisted YouTube link after recording`

This assignment automates three features selected from the HW02 test design and executes them across three browsers. The tests combine browser UI flows, direct API calls, and database setup/cleanup helpers.

## 2. SUT And Tool Setup

The SUT is an e-commerce application with a backend API, customer web app, and admin web app. The automation project is placed under `submit/` and uses Playwright with CommonJS test files.

Key files:

- Config: `submit/playwright.config.js`
- Package manifest: `submit/package.json`
- API/database helpers: `submit/tests/helpers/api.js`
- UI auth helpers: `submit/tests/helpers/auth.js`

Commands:

```bash
cd submit
npm install
npm test
npm run report
```

## 3. Browser Matrix

| Browser project | Purpose |
| --- | --- |
| Chromium | Main desktop browser coverage |
| Firefox | Cross-browser behavior validation |
| WebKit | Safari-like rendering and form behavior validation |

## 4. Automated Features

| Feature | Description | Test data | Script | Cases | Browser executions |
| --- | --- | --- | --- | ---: | ---: |
| FR-02 | Login validation and account lockout | `submit/tests/data/fr02-login-lockout.json` | `submit/tests/fr02-login-lockout.spec.js` | 14 | 42 |
| FR-09 | Coupon validation during checkout | `submit/tests/data/fr09-coupon-checkout.json` | `submit/tests/fr09-coupon-checkout.spec.js` | 14 | 42 |
| FR-17 | Admin coupon CRUD and authorization | `submit/tests/data/fr17-admin-coupon-crud.json` | `submit/tests/fr17-admin-coupon-crud.spec.js` | 16 | 48 |

## 5. HW02 Mapping

| HW02 feature reference | Automation coverage |
| --- | --- |
| FR-02 login lockout test design | Valid login, unknown email, malformed email, empty fields, wrong password, lockout, brute-force, old token, boundary attempts |
| FR-09 coupon checkout test design | Valid percent/fixed coupon, unknown/inactive/expired coupon, empty code, min order, usage limit, missing token, forged user id, invalid total |
| FR-17 admin coupon CRUD test design | Admin list/create/delete, validation for coupon fields, duplicate code, invalid type, authorization failures |

Each JSON row includes `id`, `title`, `type`, `mode`, `precondition`, `input`, `expected`, and `hw02Reference` to keep the implementation traceable to the HW02 design.

## 6. Execution Result

| Metric | Value |
| --- | ---: |
| Features automated | 3 |
| Test cases automated | 44 |
| Browser projects | 3 |
| Total executions | 132 |
| Passed | 60 |
| Failed | 72 |

The execution exceeds the assignment minimum of 108 executions. The HTML report includes `Run by: 23127326` and timestamp metadata.

## 7. Bug And Gap Analysis

The failing tests revealed several likely SUT issues:

- Login API exposes the user's password in the response.
- Login UI uses a plain text input instead of email validation.
- Account lockout duration is around 180 seconds instead of the expected 30 seconds.
- Coupon API reports invalid total values as minimum-order errors.

Some failures require further triage because they may be assertion gaps rather than confirmed SUT defects. For example, several admin coupon validation tests expected a specific failure status range while the SUT returned a different error code. These are documented in `submit/bug-report.md` and preserved in the Playwright report.

## 8. Review Of AI-Generated Scripts

AI was useful for producing the initial Playwright structure, data-driven case files, and shared helpers. However, the generated scripts needed human review because AI over-assumed SUT behavior. Examples include expecting no password in login response, assuming `input[type=email]`, assuming a 30-second lockout duration, and expecting strict validation error messages. After running the tests, the scripts were refined with explicit database setup/cleanup, serial execution for stateful feature suites, and test annotations for feature/case metadata.

## 9. Evidence

- Test summary: `submit/test-summary.md`
- Bug report: `submit/bug-report.md`
- AI critique: `submit/ai-critique.md`
- AI audit: `submit/ai-audit-report.md`
- Git commit log: `submit/git-commit-log.txt`
- HTML report: `submit/playwright-report/index.html`
- Representative screenshots: `submit/screenshots/`
