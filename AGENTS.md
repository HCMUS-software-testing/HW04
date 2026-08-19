# Repository Guidelines

This repository is the HW04 Playwright automation homework for the EShop demo store. Keep work reviewable: Markdown first, real test runs, and no fabricated reports.

## Project Structure & Module Organization

- `docs/` — assignment text and the implementation plan
- `req/` — original PDF brief
- `ai-reasoning/` — ISTQB CT-AI syllabus; prefer `*.md` over PDFs
- `.agents/skills/` — Codex skills, including AI audit logging
- Planned test tree:
  - `tests/feature-{a,b,c}.spec.ts`
  - `tests/data/feature-{a,b,c}.json`
  - `tests/helpers/eshop.ts`
  - `playwright.config.ts`
  - `reports/` — main report, AI audit, critique, bugs, commit log
  - `playwright-report/` — HTML results titled `Run by: {StudentID}`

## Build, Test, and Development Commands

```bash
npm install
npx playwright install
STUDENT_ID=<id> BASE_URL=<eshop-url> npm test
npm run test:feature-a
npm run report
python3 .agents/skills/ai-audit-entry/scripts/test_append_ai_audit_entry.py
```

`npm test` runs all specs on Chromium, Firefox, and WebKit. Feature scripts target one spec. `npm run report` opens the Playwright HTML reporter. The Python command checks the audit-entry helper.

## Coding Style & Naming Conventions

Use TypeScript with 2-space indent, single quotes, and named helper exports. Name specs `feature-<pool>.spec.ts` and keep matching JSON in `tests/data/`. Prefer role, label, and text locators. Store datasets in JSON or CSV; do not hardcode inline arrays.

## Testing Guidelines

Playwright Test is the runner. Automate three features (one each from Pools A–C), at least 12 data-driven cases per feature, and at least three assertion patterns (URL, visible text, control state). Every spec must run on all three browsers. Review AI-generated scripts before commit. Document real product bugs in `reports/bug-report.md` and GitHub Issues with screenshots.

## Commit & Pull Request Guidelines

History uses short imperative subjects, often Conventional Commits (`feat: add plan`, `test: harden playwright locators`). Only commits that change `.spec.ts` or `.spec.js` count toward the required eight test-script commits. PRs should list feature IDs, browser results, report or video links, and failure screenshots.

## Agent-Specific Instructions

Do not invent HTML reports, ISO timestamps, or demo evidence. Offer an audit entry before writing `src/reports/ai-audit-report.md`. Follow `ai-reasoning/AGENTS.md` when reading syllabus files and `docs/superpowers/plans/2026-08-16-hw04-automation-testing.md` for implementation order.
