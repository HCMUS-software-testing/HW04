# Repository Guidelines

This repository contains the HW04 Playwright automation project for the EShop demo store. The self-contained submission package is `src/`; run its npm commands from that directory. Keep changes reviewable, use real test results, and never invent reports or evidence.

## Project Structure & Module Organization

- `src/test/specs/` — Playwright specs, one per selected feature pool.
- `src/test/helpers/eshop.ts` — reusable navigation, login, and assertion helpers.
- `src/test/test-data/` — feature datasets; keep new datasets in JSON or CSV.
- `src/playwright.config.ts` — test directory, browser projects, reporter, and runtime settings.
- `req/` and `ai-reasoning/` — assignment and syllabus Markdown; read Markdown only, not PDFs.
- `docs/` — implementation plans and supporting documentation.
- `src/reports/` — AI audit material; generated Playwright output belongs in `playwright-report/`.

## Build, Test, and Development Commands

From `src/`, install dependencies with `npm install`, then install browser binaries with `npx playwright install`. Run the complete suite with `npm test`; it targets Chromium, Firefox, and WebKit. Use `npm run test:headed` for interactive debugging, or target one feature with `npm run test:feature-a` (and the corresponding `-b` or `-c` command). Open the latest HTML report with `npm run report`.

Set the system-under-test URL and student metadata when needed, for example: `STUDENT_ID=<id> BASE_URL=<eshop-url> npm test`.

## Coding Style & Naming Conventions

Use TypeScript, two-space indentation, single quotes, and named helper exports. Prefer accessible role, label, and text locators over brittle CSS or XPath selectors. Name specs `feature-<pool>.spec.ts` and matching datasets `feature-<pool>.json`.

## Testing Guidelines

Use Playwright Test with data-driven cases: at least 12 cases per feature, with one feature from each pool A–C. Include URL, visible-text, and control-state assertions. Review generated scripts before committing and record only reproducible product bugs in `src/reports/`.

## Commit & Pull Request Guidelines

Use short imperative subjects, commonly Conventional Commit style (for example, `test: harden playwright locators`). PRs should describe feature IDs, browser results, report or video links, and failure screenshots. Only commits changing test specs count toward the required test-script commit total.

## Agent-Specific Instructions

Offer an AI audit entry before editing `src/reports/ai-audit-report.md`. Follow the implementation order in `docs/superpowers/plans/2026-08-16-hw04-automation-testing.md`, and do not fabricate timestamps, HTML reports, screenshots, or demo evidence.
