# HW04 Playwright Automation

This folder is the self-contained submission package. Run all commands from this directory after copying or renaming it.

## Structure

```text
<submission-folder>/
├── test/specs/       # Playwright feature specs
├── test/helpers/     # Shared EShop helpers
├── test/test-data/   # JSON datasets for FR-01, FR-07, and FR-18
├── reports/          # AI audit and final reports
├── package.json
├── playwright.config.ts
└── README.md
```

Keep `package.json`, `package-lock.json`, and `playwright.config.ts` in this folder. They are required to run the submission. The parent repository's `docs/`, `req/`, `ai-reasoning/`, and `AGENTS.md` are development references and do not need to be copied into the submission folder.

## Setup and Test Commands

```bash
cd <submission-folder>
npm install
npx playwright install
```

Start all three EShop services in separate terminals. The user frontend is `5173`, while the admin frontend is `5174`; both use the backend on `3000`:

```bash
cd ../eshop-sut/backend && node server.js
cd ../eshop-sut/frontend-web && npm run dev
cd ../eshop-sut/frontend-admin && npm run dev
```

Run FR-01 and FR-07 against the user frontend, and FR-18 against the separate admin frontend:

```bash
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr01
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr07
STUDENT_ID=23127075 ADMIN_BASE_URL=http://localhost:5174 npm run test:fr18
``` 

To store a run under a named findings folder, set `FINDINGS_DIR` relative to this package root:

```bash
FINDINGS_DIR=findings/fr01-run-name \
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr01
```

This creates `findings/fr01-run-name/test-results/` and
`findings/fr01-run-name/playwright-report/`. The default is `findings/latest/`.

Useful commands:

```bash
npm run test:headed     # Run with a visible browser
npm run test:fr01       # Run FR-01 only
npm run test:fr07       # Run FR-07 only
npm run test:fr18       # Run FR-18 only (uses ADMIN_BASE_URL, default 5174)
npm run report          # Open the latest HTML report
```

The full suite is configured for Chrome, Edge, and Firefox. Test outputs are written to the configured findings folder; do not claim results until the tests have actually run against the EShop SUT.

## Final Evidence Run (9 HTML Reports)

Run these commands from this package root while the backend and both frontends are running. Each command creates a separate HTML report under `findings/<name>/playwright-report/`.

```bash
# FR-01 — user frontend
FINDINGS_DIR=findings/fr01-final-chrome STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr01 -- --project=chrome --workers=1
FINDINGS_DIR=findings/fr01-final-edge STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr01 -- --project=edge --workers=1
FINDINGS_DIR=findings/fr01-final-firefox STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr01 -- --project=firefox --workers=1

# FR-07 — user frontend
FINDINGS_DIR=findings/fr07-final-chrome STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr07 -- --project=chrome --workers=1
FINDINGS_DIR=findings/fr07-final-edge STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr07 -- --project=edge --workers=1
FINDINGS_DIR=findings/fr07-final-firefox STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr07 -- --project=firefox --workers=1
```

For FR-18, reseed before each browser because mutation cases change order status. Run the seed command from the external SUT checkout, then return to this package root before running Playwright:

```bash
npm --prefix ../eshop-sut/backend run seed:fr18
FINDINGS_DIR=findings/fr18-final-chrome STUDENT_ID=23127075 ADMIN_BASE_URL=http://localhost:5174 npm run test:fr18 -- --project=chrome --workers=1

npm --prefix ../eshop-sut/backend run seed:fr18
FINDINGS_DIR=findings/fr18-final-edge STUDENT_ID=23127075 ADMIN_BASE_URL=http://localhost:5174 npm run test:fr18 -- --project=edge --workers=1

npm --prefix ../eshop-sut/backend run seed:fr18
FINDINGS_DIR=findings/fr18-final-firefox STUDENT_ID=23127075 ADMIN_BASE_URL=http://localhost:5174 npm run test:fr18 -- --project=firefox --workers=1
```

Open a report with `npx playwright show-report findings/fr01-final-chrome/playwright-report`.

## Tài liệu trong package

Package bao gồm các feature spec, test data, findings multi-browser, main report, AI critique, AI audit, bug report, commit log, GitHub Issues và liên kết video. Các PDF được tạo từ ba report Markdown tương ứng và đặt trong `reports/`.

## Test Summary and Self-Assessment

| Item | Current value |
| --- | --- |
| Features automated | 3: FR-01, FR-07, FR-18 |
| Automated test cases | 43 data-driven cases (14 + 14 + 15) |
| Browser runs | 9 final runs (3 features × Chrome, Edge, Firefox) |
| Executed / passed / failed / skipped | 129 / 24 / 63 / 42 |
| Confirmed product bugs | 9 entries in [reports/bug-report.md](reports/bug-report.md) |
| Public GitHub repository | https://github.com/HCMUS-software-testing/HW04 |
| Demo video | [AI Skills Demo](https://youtu.be/T96vCNmal-s); [Scripts Demo](https://youtu.be/DTWXP3eLIns) |

| Criteria | Self-assessed grade |
| --- | ---: |
| Task 1 — Feature A (FR-01) | 35 |
| Task 1 — Feature B (FR-07) | 35 |
| Task 1 — Feature C (FR-18) | 20 |
| Task 2 — Demo video | 5 |
| Agent Skills | 5 |
| Total | 100 |

## Submission Documents

- [Main report](reports/main-report.md) — bản Markdown của báo cáo chính.
- [AI critique](reports/ai-critique.md) — bản Markdown nhận xét output AI.
- [Bug report](reports/bug-report.md).
- [AI audit](reports/ai-audit-report.md) — bản Markdown nhật ký audit AI.
- [Commit log](reports/commit-log.txt).
