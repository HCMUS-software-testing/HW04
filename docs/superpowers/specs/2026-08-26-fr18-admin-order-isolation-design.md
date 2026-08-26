# FR-18 Admin Order Test Isolation Design

## Goal

Make the FR-18 Playwright suite deterministic against the existing EShop admin DOM without changing `eshop-sut` application logic.

## Data model

Update `src/test/test-data/FR-18.json` so the expected table headers match the observed DOM: `ID`, `Người đặt`, `Tổng tiền`, `Địa chỉ`, `Trạng thái`, and `Hành động`. Add a stable `orderId` to every case that reads or mutates a specific order. IDs map to the FR-18 seed fixture: pending 1, confirmed 2, shipping 3, delivered 4, and canceled/XSS 5.

## Test flow

Keep the entire `testCases` array as the source for generated tests. Replace status-based row lookup with a row locator scoped to the order ID (`#1`, `#2`, etc.). Status and action assertions remain scoped to that row. The XSS case also targets the seeded canceled order by ID and checks escaped text without allowing a dialog.

## State isolation

The suite will run with one worker, and the documented seed command will be run after servers start and before the test run. Since status-transition tests mutate shared SQLite state, each transition case must use its dedicated fixture order. The implementation will avoid relying on display order or another test's status. If the repository cannot reset state between individual tests, that limitation will be reported as a fixture/environment constraint rather than hidden in assertions.

## Verification

Run TypeScript/Playwright validation, list all generated cases, then run FR-18 on Chrome, Edge, and Firefox with `--workers=1`. Store the real artifacts under `src/findings/fr18-03-admin-order-isolated/` and classify failures as script, fixture/environment, or SUT product bugs.
