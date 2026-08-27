---
name: findings-to-bug-report
description: Use when reviewing Playwright results, organizing run evidence, and consolidating reproducible failures into a traceable defect report.
---

# Findings to Bug Report

## Procedure

1. Preserve each run under `findings/<feature>-<purpose>-<browser>/` with `test-results/` and `playwright-report/`. Do not overwrite earlier evidence.
2. Read the HTML summary, failure messages, screenshots, traces, videos, and test data. Reproduce suspicious failures on the same environment.
3. Classify each result as test-script/locator, fixture or database, environment/dependency, unsupported coverage, or product bug. A failure caused by a wrong selector is not a product bug.
4. Deduplicate the report by root cause. For every defect record ID, feature, severity, precondition, steps, expected, actual, reproducibility/browser scope, and evidence path or issue link.
5. Keep unsupported cases as explicit skips with a reason. Keep genuine assertion failures visible; never convert them to passing assertions.
6. Summarize exact executed/passed/failed/skipped totals per browser and link the final reports. Update totals only from real reports.

## Report template

```markdown
| ID | Feature | Expected | Actual | Classification | Evidence |
| BUG-01 | Cart | ... | ... | Product bug | findings/cart-chrome/... |
```

Screenshots and traces are evidence, not substitutes for reproduction steps. Do not invent timestamps, browser results, issue URLs, or screenshots.
