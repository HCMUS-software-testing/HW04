# HW04 Test Summary

## Overview

- Student ID: 23127326
- SUT: `eshop-sut`
- Test framework: Playwright
- Browser projects: Chromium, Firefox, WebKit
- Last recorded run timestamp: 2026-08-20T15:45:31Z
- Run metadata: `submit/playwright-report/run-metadata.md`
- HTML report: `submit/playwright-report/index.html`

## Execution Summary

| Metric | Value |
| --- | ---: |
| Features automated | 3 |
| Data-driven test cases | 44 |
| Browser projects | 3 |
| Total executions | 132 |
| Passed executions | 60 |
| Failed executions | 72 |
| Failure artifact folders | 72 |

## Feature Summary

| Feature | Purpose | Cases | Browser executions | Script |
| --- | --- | ---: | ---: | --- |
| FR-02 | Login validation and account lockout | 14 | 42 | `submit/tests/fr02-login-lockout.spec.js` |
| FR-09 | Coupon validation during checkout | 14 | 42 | `submit/tests/fr09-coupon-checkout.spec.js` |
| FR-17 | Admin coupon CRUD and authorization | 16 | 48 | `submit/tests/fr17-admin-coupon-crud.spec.js` |

## Result Interpretation

The automated suite satisfies the minimum execution size required by the assignment: at least 3 features, at least 12 test cases per feature, and execution across 3 browsers. The recorded result contains 132 executions, exceeding the minimum 108 browser executions.

The 72 failed executions are grouped into recurring bug or gap categories in `submit/bug-report.md`. Several failures reveal likely SUT issues, such as password leakage in login response, weak login form validation, and inconsistent coupon/admin validation. Some failures also document assertion gaps where the automated expectation was stricter than the current SUT behavior.

## Evidence Locations

- Playwright HTML report: `submit/playwright-report/index.html`
- Failure traces/videos/screenshots: `submit/playwright-report/data/`
- Representative screenshots: `submit/screenshots/`
- Git commit evidence: `submit/git-commit-log.txt`
