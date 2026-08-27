# HW04 Automation Testing — Main Report

## Submission information

- Student ID: `23127075`
- Repository: `[TODO: public GitHub URL]`
- AI Skills Demo: https://youtu.be/T96vCNmal-s
- Scripts Demo: https://youtu.be/DTWXP3eLIns
- PDF export: `[TODO: export this file to PDF before submission]`

## Scope and automation summary

This submission automates FR-01 Account Registration, FR-07 Shopping Cart, and FR-18 Admin Order Management. The three Playwright specs use external JSON data and URL, visible-text, and control-state assertions. Each feature has at least 12 data-driven cases and is configured for Chrome, Edge, and Firefox.

Detailed test commands and evidence paths are documented in [README.md](../README.md). The current bug inventory is in [bug-report.md](bug-report.md), while the raw screenshots, traces, and HTML reports are kept under `../findings/`.

## Results

Final browser-run results are recorded in the nine `../findings/*-final-*` folders. `[TODO: fill the final executed/passed/failed/skipped totals from the final reports.]` Failures must remain visible where they reproduce SUT defects; unsupported controls are documented as skips.

## Bug issues

Confirmed product bugs from the final browser runs were consolidated into the following GitHub Issues. Script, fixture, and environment failures were excluded.

| Bug | Feature | GitHub Issue |
| --- | --- | --- |
| BUG-FR01-01 | FR-01 Registration — redirect/password validation | [#11](https://github.com/HCMUS-software-testing/HW04/issues/11) |
| BUG-FR01-02 | FR-01 Registration — missing Confirm Password | [#12](https://github.com/HCMUS-software-testing/HW04/issues/12) |
| BUG-FR07-01 | FR-07 Shopping Cart — wrong total label | [#13](https://github.com/HCMUS-software-testing/HW04/issues/13) |
| BUG-FR07-02 | FR-07 Shopping Cart — missing quantity/confirmation controls | [#14](https://github.com/HCMUS-software-testing/HW04/issues/14) |
| BUG-FR07-03 | FR-07 Shopping Cart — missing empty-cart illustration | [#15](https://github.com/HCMUS-software-testing/HW04/issues/15) |
| BUG-FR07-04 | FR-07 Shopping Cart — duplicate rows for the same product | [#16](https://github.com/HCMUS-software-testing/HW04/issues/16) |
| BUG-FR18-01 | FR-18 Admin Orders — wrong success message | [#17](https://github.com/HCMUS-software-testing/HW04/issues/17) |
| BUG-FR18-02 | FR-18 Admin Orders — canceled orders remain actionable | [#18](https://github.com/HCMUS-software-testing/HW04/issues/18) |
| BUG-FR18-03 | FR-18 Admin Orders — missing status filter | [#19](https://github.com/HCMUS-software-testing/HW04/issues/19) |

Screenshots used by the issues are stored in [github-evidence](github-evidence/), and the detailed issue drafts and evidence mapping are in [github-issues.md](github-issues.md).

## AI review and gap analysis

The first generated scripts required human correction for label association, product-card selection, React cart-state preservation, order-row selection, fixture isolation, and browser configuration. The final scripts retain data-driven input and do not modify the SUT. See [ai-critique.md](ai-critique.md) and [ai-audit-report.md](ai-audit-report.md).

## Known limitations

The SUT has confirmed gaps documented in [bug-report.md](bug-report.md), including password validation, missing cart controls, missing status filtering, and invalid canceled-order actions. WebKit was not used because its Playwright runtime dependencies are unavailable on the Fedora host; Chrome, Edge, and Firefox satisfy the assignment's alternative browser combination.

## Required attachments before submission

- `[TODO]` Export this report to `main-report.pdf`.
- `[TODO]` Export `ai-critique.md` and `ai-audit-report.md` to PDF.
- `[TODO]` Add public GitHub URL, issue links, screenshots, and video URL.
