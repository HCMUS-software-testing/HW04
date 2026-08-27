---
name: automation-testing
description: Use when a project needs reusable, data-driven browser automation, cross-browser execution, HTML evidence, or defect reporting from Playwright findings.
---

# Automation Testing

## Purpose

Use this portable workflow for a web project with a written specification. It converts observable requirements into external test data, maintainable Playwright scripts, reproducible browser evidence, and an honest defect report. Inspect the application and its fixtures before assuming labels, routes, controls, or seed data.

## Workflow

1. Read the project spec and select the feature scope. Load **subskill `spec-to-test-data`**.
2. Inspect the DOM, routes, API/fixture mechanism, and package manager. Load **subskill `playwright-script-and-run`**.
3. Review failures and skips, distinguish script/fixture/environment failures from product defects, then load **subskill `findings-to-bug-report`**.
4. Re-run after every script or data correction; preserve historical findings and name runs by feature, browser, and purpose.

## Non-negotiable quality gates

- Keep test cases in JSON/CSV, not inline arrays or expected values in the spec.
- Use at least 12 cases per selected feature when the assignment requires it.
- Include URL, visible-text, and control-state assertions where the feature exposes them.
- Prefer role, label, accessible name, test id, and scoped table/card locators. Inspect DOM before falling back to CSS.
- Wait on observable state, never fixed sleeps; do not use evaluation to bypass validation or alter app state.
- Isolate mutation data per test, reseed/reset before each browser run, and avoid navigation that discards client state.
- Never weaken an expected result to hide a failure. Unsupported controls are explicit skips with reasons.
- Reports must contain student/run metadata and ISO timestamps. Evidence must be produced by real executions.

## Portable inputs

`PROJECT_ROOT`, `SPEC_PATH`, `APP_URL`/`ADMIN_URL`, `TEST_DATA_DIR`, `FINDINGS_DIR`, `STUDENT_ID`, browser projects, and the reset/seed command are project parameters. Never assume an EShop route, database, framework, or Vietnamese text in a reusable skill.

See the three subskills for concrete checklists and examples.
