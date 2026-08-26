# FR-18 State Isolation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Give every FR-18 mutation and final-state case an independent deterministic order.

**Architecture:** The JSON fixture remains the single source for seeded orders. The seed script clears orders, inserts fixtures in declared order, and verifies assigned SQLite IDs. FR-18 test data references those stable IDs while the existing data-driven spec and assertions remain unchanged.

**Tech Stack:** SQLite, Node.js, JSON fixtures, Playwright Test, TypeScript.

### Task 1: Expand deterministic fixture

**Files:** `eshop-sut/backend/seed-data/fr18-orders.json`, `src/test/seed-data/FR-18-orders.json`

- Add one uniquely keyed order for each mutation, final-state, and XSS case.
- Keep initial statuses required by each case and assign expected IDs in insertion order.
- Preserve the XSS payload on the dedicated XSS order.

### Task 2: Verify IDs during seeding

**File:** `eshop-sut/backend/scripts/seed-fr18-orders.js`

- Delete existing orders before insertion.
- Insert fixtures sequentially and require each inserted ID to equal its fixture `orderId`.
- Fail loudly on an ID mismatch instead of silently producing unusable test data.

### Task 3: Point data-driven cases at isolated orders

**File:** `src/test/test-data/FR-18.json`

- Give every update, cancel, invalid-transition, and XSS case its own `orderId` matching the fixture.
- Leave filter cases data-driven and keep expected behavior unchanged.

### Task 4: Seed and verify

- Restart the SUT, run `npm run seed:fr18`, and verify order IDs/statuses in SQLite.
- Run FR-18 with `--workers=1` for Chrome, Edge, and Firefox.
- Store real artifacts under `src/findings/fr18-04-admin-order-isolated-final/` and classify failures honestly.
