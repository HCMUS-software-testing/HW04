# HW04 AI Automation Submission

## Student Information

- Student: Le Mai Hoai Bao
- Student ID: 23127326
- Repository: https://github.com/HCMUS-software-testing/HW04.git
- SUT: `eshop-sut`
- Automation tool: Playwright
- Browser matrix: Chromium, Firefox, WebKit
- Demo video: `TBD - add unlisted YouTube link after recording`

## How To Run

```bash
cd submit
npm install
npm test
npm run report
```

Run one browser only:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

The SUT must be running before executing the tests:

- Backend API: `http://localhost:3000`
- Customer web app: `http://localhost:3001`
- Admin web app: `http://localhost:3002`

## Test Summary

| Metric | Value |
| --- | ---: |
| Features automated | 3 |
| Test case data rows | 44 |
| Browser projects | 3 |
| Total executions | 132 |
| Passed | 60 |
| Failed | 72 |
| Recorded bug groups | 4 |
| HTML report | `submit/playwright-report/index.html` |
| Run metadata | `submit/playwright-report/run-metadata.md` |

## Automated Features

| Feature | Script | Data file | Cases | Executions |
| --- | --- | --- | ---: | ---: |
| FR-02 Login and account lockout | `tests/fr02-login-lockout.spec.js` | `tests/data/fr02-login-lockout.json` | 14 | 42 |
| FR-09 Coupon checkout | `tests/fr09-coupon-checkout.spec.js` | `tests/data/fr09-coupon-checkout.json` | 14 | 42 |
| FR-17 Admin coupon CRUD | `tests/fr17-admin-coupon-crud.spec.js` | `tests/data/fr17-admin-coupon-crud.json` | 16 | 48 |

## Deliverables

- Main report: `submit/main-report.md`
- Test summary: `submit/test-summary.md`
- Bug report: `submit/bug-report.md`
- AI critique: `submit/ai-critique.md`
- AI audit report: `submit/ai-audit-report.md`
- Git commit log: `submit/git-commit-log.txt`
- Playwright HTML report: `submit/playwright-report/index.html`
- Screenshots: `submit/screenshots/`

## Self-Assessment

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | ---: | ---: |
| 1 | Task 1 - Feature A: FR-02 Login lockout | 25 | 21 |
| 2 | Task 1 - Feature B: FR-09 Coupon checkout | 25 | 21 |
| 3 | Task 1 - Feature C: FR-17 Admin coupon CRUD | 25 | 21 |
| 4 | Task 2 - Demo video | 15 | 0 |
| 5 | Agent Skills | 10 | 8 |
| | Total | 100 | 71 |

Note: Demo video score is left as `0` until the unlisted YouTube demo is recorded and linked.
