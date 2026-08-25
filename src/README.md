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

Set the EShop URL and student ID before running the suite:

```bash
STUDENT_ID=23127075 BASE_URL=<eshop-url> npm test
```

Useful commands:

```bash
npm run test:headed     # Run with a visible browser
npm run test:fr01       # Run FR-01 only
npm run test:fr07       # Run FR-07 only
npm run test:fr18       # Run FR-18 only
npm run report          # Open the latest HTML report
```

The full suite is configured for Chromium, Firefox, and WebKit. Test outputs are written to `playwright-report/` and `test-results/`; do not claim results until the tests have actually run against the EShop SUT.

## Submission Checklist

Before packaging this folder, confirm that all three feature specs, real multi-browser reports, the main report, AI critique, completed AI audit, bug report, commit log, and demo video link are present. Do not fabricate screenshots, timestamps, reports, or bug evidence.
