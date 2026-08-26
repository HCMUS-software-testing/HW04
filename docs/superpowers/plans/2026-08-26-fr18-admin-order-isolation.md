# FR-18 Admin Order Isolation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make FR-18 admin tests use stable seeded order IDs and produce reliable multi-browser findings without modifying EShop SUT logic.

**Architecture:** Keep JSON as the sole source of generated cases. Add fixture order IDs to the data and scope every order lookup/assertion to the corresponding table row. Use the existing FR-18 seed fixture before the run; run sequentially and report any remaining shared-database limitation honestly.

**Tech Stack:** TypeScript, Playwright Test, JSON fixtures, SQLite seed script.

---

### Task 1: Align FR-18 test data

**Files:**
- Modify: `src/test/test-data/FR-18.json`

- [ ] Change `expected.columns` in `ADM_ORD_001` to `ID`, `Người đặt`, `Tổng tiền`, `Địa chỉ`, `Trạng thái`, `Hành động`.
- [ ] Add `orderId` values matching the seed fixture to transition, final-state, and XSS cases: pending `1`, confirmed `2`, shipping `3`, delivered `4`, canceled/XSS `5`.
- [ ] Preserve all 15 test cases and their expected outcomes.

### Task 2: Make row selection ID-based

**Files:**
- Modify: `src/test/specs/fr18.spec.ts`

- [ ] Replace `orderRow(page, status)` with `orderRow(page, orderId)` using a row scoped to `#${orderId}`.
- [ ] Pass `input.orderId` into all status-transition and final-state actions.
- [ ] Keep status labels only for asserting the target/current status inside the selected row.
- [ ] Scope XSS address assertions to `input.orderId` and preserve the no-dialog check.
- [ ] Keep data-driven generation, URL/text/control assertions, filter skips, and honest unauthorized behavior.

### Task 3: Validate and collect findings

**Files:**
- Create/update: `src/findings/fr18-03-admin-order-isolated/`

- [ ] Run `npx tsc --noEmit` or the repository's available TypeScript check and `npx playwright test test/specs/fr18.spec.ts --list`.
- [ ] Start servers, run `npm run seed:fr18`, then run Chrome, Edge, and Firefox with `--workers=1` and `FINDINGS_DIR=findings/fr18-03-admin-order-isolated`.
- [ ] Review the real report and classify failures as script/locator, fixture/environment, or SUT product bugs.
