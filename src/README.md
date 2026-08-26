# HW04 Playwright Automation

This folder is the self-contained submission package. Run all commands from this directory after copying or renaming it.

## Structure

```text
src/
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
cd eshop-sut/backend && node server.js
cd eshop-sut/frontend-web && npm run dev
cd eshop-sut/frontend-admin && npm run dev
```

Run FR-01 and FR-07 against the user frontend, and FR-18 against the separate admin frontend:

```bash
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr01
STUDENT_ID=23127075 BASE_URL=http://localhost:5173 npm run test:fr07
STUDENT_ID=23127075 ADMIN_BASE_URL=http://localhost:5174 npm run test:fr18
``` 

To store a run under a named findings folder, set `FINDINGS_DIR` relative to `src/`:

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

## Submission Checklist

Before packaging this folder, confirm that all three feature specs, real multi-browser reports, the main report, AI critique, completed AI audit, bug report, commit log, and demo video link are present. Do not fabricate screenshots, timestamps, reports, or bug evidence.
