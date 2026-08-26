# Bug Report — EShop SUT

## Scope

This report consolidates reproducible findings from historical `src/findings/` and includes a separate final-run verification section below. Historical findings were deduplicated by root cause; final folders were initially excluded so the last script verification could be reviewed independently.

## Confirmed product bugs and gaps

| ID | Feature | Severity | Expected | Actual | Evidence |
| --- | --- | --- | --- | --- | --- |
| BUG-FR01-01 | FR-01 Registration | High | Successful registration with `Password123!` redirects to `/login`. | SUT rejects the password because validation expects whitespace and remains on `/register`. | `findings/fr01-02-fix-locator-fixed/`, `findings/fr01-03-independent-cases/` |
| BUG-FR01-02 | FR-01 Registration | Medium | Registration form provides a Confirm Password control. | `Register.jsx` does not render Confirm Password. | `findings/fr01-01-locator-fixed/`, `findings/fr01-03-independent-cases/` |
| BUG-FR07-01 | FR-07 Shopping Cart | Medium | Cart summary uses the required “Tổng cộng” label. | SUT renders “Tổng tạm tính”. | `findings/fr07-03-shopping-cart-state/` |
| BUG-FR07-02 | FR-07 Shopping Cart | Medium | Users can change quantity and receive quantity validation/confirmation behavior. | SUT has no quantity input, increase/decrease controls, validation, or confirmation dialog. | `findings/fr07-02-shopping-cart-fixed-2/`, `findings/fr07-03-shopping-cart-state/` |
| BUG-FR07-03 | FR-07 Shopping Cart | Medium | Empty cart renders the required empty-state illustration when specified. | The required illustration is not rendered by the SUT. | `findings/fr07-00-shopping-cart/`, `findings/fr07-01-shopping-cart-fixed/` |
| BUG-FR18-01 | FR-18 Admin Orders | Medium | Successful status updates show the specified Vietnamese success message. | SUT returns/displays English “Order status updated”. | `findings/fr18-02-admin-order-dom-fixed/`, `findings/fr18-03-admin-order-isolated-rerun/` |
| BUG-FR18-02 | FR-18 Admin Orders | High | Delivered and canceled orders are final and cannot be updated. | Canceled orders still expose “Đánh dấu Đã giao” and can be updated. | `findings/fr18-03-admin-order-isolated-rerun/`, `findings/fr18-04-admin-order-isolated-final-rerun-2/` |
| BUG-FR18-03 | FR-18 Admin Orders | Medium | Admin can filter orders by status. | Admin UI has no status filter. | `findings/fr18-01/`, `findings/fr18-02-admin-order-dom-fixed/` |

## Final-run verification

The final evidence folders contain one HTML report per feature/browser: FR-01 (`fr01-final-chrome`, `fr01-final-edge`, `fr01-final-firefox`), FR-07 (`fr07-final-chrome`, `fr07-final-edge`, `fr07-final-firefox`), and FR-18 (`fr18-final-chrome`, `fr18-final-edge`, `fr18-final-firefox`). The repeated failures below match the historical root causes and add two FR-07 details that were not explicit in the original table:

- **FR-01:** all three browsers reproduce the registration oracle failures; Confirm Password remains unautomatable because the control is absent.
- **FR-07:** all three browsers reproduce the missing illustration and cart-summary/product assertion failures. Final runs additionally show that adding the same product creates two rows instead of one, and that the resulting quantity/subtotal does not match the JSON expectation. The quantity and confirmation-control cases remain explicit skips.
- **FR-18:** all three browsers reproduce the English update message and the invalid canceled-order action. Filter cases remain explicit skips because the filter is absent.

The final folders are evidence of the current script/SUT combination and should be cited alongside the historical folders when submitting the report.

## Cases not automatable against the current SUT

The FR-07 quantity, quantity-boundary, and confirmation-dialog cases are kept as explicit skips because the corresponding controls do not exist. FR-18 status-filter cases are also explicit skips because no filter is rendered. These are documented product gaps, not silently passing tests.

## Script and environment findings

Several early failures were test-script or environment issues and are not product bugs: FR-01 initially used an unassociated `getByLabel()` locator; FR-07 initially inferred a card from heading order and later lost cart state during navigation; FR-18 initially searched for `#<orderId>` although the UI rendered the ID without `#`. These were corrected in subsequent specs. Fedora could not run WebKit because Playwright expected Ubuntu/ICU dependencies; the project therefore uses Chrome, Edge, and Firefox as permitted by the assignment. Database fixtures were later seeded with stable order IDs.

## Follow-up

Re-run the three final browser sets after the last script changes, then update this report with final counts and attach the corresponding screenshots or traces to the repository/GitHub Issues.
