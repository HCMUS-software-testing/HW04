# HW04 Automation Testing — Main Report

## Submission information

- Student ID: `23127075`
- Repository: `[TODO: public GitHub URL]`
- Video: `[TODO: unlisted YouTube URL]`
- PDF export: `[TODO: export this file to PDF before submission]`

## Scope and automation summary

This submission automates FR-01 Account Registration, FR-07 Shopping Cart, and FR-18 Admin Order Management. The three Playwright specs use external JSON data and URL, visible-text, and control-state assertions. Each feature has at least 12 data-driven cases and is configured for Chrome, Edge, and Firefox.

Detailed test commands and evidence paths are documented in [README.md](../README.md). The current bug inventory is in [bug-report.md](bug-report.md), while the raw screenshots, traces, and HTML reports are kept under `../findings/`.

## Results

Final browser-run results are recorded in the nine `../findings/*-final-*` folders. `[TODO: fill the final executed/passed/failed/skipped totals from the final reports.]` Failures must remain visible where they reproduce SUT defects; unsupported controls are documented as skips.

## AI review and gap analysis

The first generated scripts required human correction for label association, product-card selection, React cart-state preservation, order-row selection, fixture isolation, and browser configuration. The final scripts retain data-driven input and do not modify the SUT. See [ai-critique.md](ai-critique.md) and [ai-audit-report.md](ai-audit-report.md).

## Known limitations

The SUT has confirmed gaps documented in [bug-report.md](bug-report.md), including password validation, missing cart controls, missing status filtering, and invalid canceled-order actions. WebKit was not used because its Playwright runtime dependencies are unavailable on the Fedora host; Chrome, Edge, and Firefox satisfy the assignment's alternative browser combination.

## Required attachments before submission

- `[TODO]` Export this report to `main-report.pdf`.
- `[TODO]` Export `ai-critique.md` and `ai-audit-report.md` to PDF.
- `[TODO]` Add public GitHub URL, issue links, screenshots, and video URL.
