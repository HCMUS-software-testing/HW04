# GitHub Issue Drafts — EShop SUT

> Được tổng hợp từ `reports/bug-report.md` và chín lượt chạy final. Các issue đã được tạo trên GitHub; screenshot evidence được commit trong repository và liên kết trực tiếp trong từng issue.

## BUG-FR01-01 — Valid registration does not redirect to `/login`

- Feature/cases: FR-01, `REG_001`, `REG_013`, `REG_014`
- Severity/Priority: High / P1
- Environment: `http://localhost:5173`; Chrome, Edge, Firefox
- Preconditions: Registration page is available; use a valid registration dataset.
- Steps: Open `/register`; enter valid name, email, and password; submit the form.
- Expected: Registration succeeds and the browser navigates to `/login`.
- Actual: The SUT rejects the valid special-character password with its generic weak-password message and remains on `/register`.
- Reproducibility: Reproduced in all three final browser runs.
- Evidence: `findings/fr01-final-chrome/`, `findings/fr01-final-edge/`, `findings/fr01-final-firefox/`; screenshot `reports/github-evidence/bug-fr01-registration.png`.
- Suggested fix: Align password validation with the requirement and navigate to `/login` after successful registration.

## BUG-FR01-02 — Registration form has no Confirm Password control

- Feature/cases: FR-01, `REG_012`
- Severity/Priority: Medium / P2
- Environment: `http://localhost:5173/register`; Chrome, Edge, Firefox
- Preconditions: Open the registration form.
- Steps: Inspect the registration controls and attempt the confirm-password scenario.
- Expected: A Confirm Password input is rendered and mismatch is validated.
- Actual: `Register.jsx` renders no Confirm Password input, so the required scenario cannot be exercised.
- Reproducibility: Confirmed during the FR-01 final runs and DOM review.
- Evidence: `findings/fr01-final-chrome/`, `findings/fr01-final-edge/`, `findings/fr01-final-firefox/`; registration screenshot `reports/github-evidence/bug-fr01-registration.png`.
- Suggested fix: Add a Confirm Password control and validate it before submitting.

## BUG-FR07-01 — Cart uses the wrong total label

- Feature/cases: FR-07, cart summary case
- Severity/Priority: Medium / P2
- Environment: `http://localhost:5173/cart`; Chrome, Edge, Firefox
- Steps: Add the data-driven product to the cart and open `/cart`.
- Expected: The summary displays the required label `Tổng cộng`.
- Actual: The SUT displays `Tổng tạm tính` instead.
- Reproducibility: Reproduced in all three final browser runs.
- Evidence: `findings/fr07-final-chrome/`, `findings/fr07-final-edge/`, `findings/fr07-final-firefox/`; `reports/github-evidence/bug-fr07-summary.png`.
- Suggested fix: Use the specified total label consistently in the cart UI.

## BUG-FR07-02 — Cart lacks quantity and confirmation controls

- Feature/cases: FR-07, quantity, boundary, delete-confirmation cases
- Severity/Priority: Medium / P2
- Environment: `http://localhost:5173/cart`; Chrome, Edge, Firefox
- Expected: Cart rows provide quantity input, increase/decrease controls, validation, delete confirmation, and the required checkout state.
- Actual: The corresponding controls/dialog are not rendered; cases are explicit skips rather than false passes.
- Reproducibility: Confirmed across the final browser runs.
- Evidence: `findings/fr07-final-chrome/`, `findings/fr07-final-edge/`, `findings/fr07-final-firefox/`.
- Suggested fix: Implement the required cart quantity, validation, and confirmation interactions.

## BUG-FR07-03 — Empty cart does not render the required illustration

- Feature/cases: FR-07, empty-cart case
- Severity/Priority: Medium / P2
- Environment: `http://localhost:5173/cart`; Chrome, Edge, Firefox
- Steps: Open the cart with no items.
- Expected: The empty-cart message and required illustration are visible.
- Actual: The message is present, but no image/illustration is rendered.
- Reproducibility: Reproduced in all three final browser runs.
- Evidence: `findings/fr07-final-chrome/`, `findings/fr07-final-edge/`, `findings/fr07-final-firefox/`; `reports/github-evidence/bug-fr07-empty-illustration.png`.
- Suggested fix: Render the specified empty-cart illustration with an accessible alternative.

## BUG-FR07-04 — Adding the same product creates duplicate cart rows

- Feature/cases: FR-07, duplicate-product and total-calculation cases
- Severity/Priority: Medium / P2
- Environment: `http://localhost:5173`; Chrome, Edge, Firefox
- Steps: Add `iPhone 15 Pro Max` twice, then open the cart.
- Expected: One row represents the product with the combined quantity and correct subtotal/total.
- Actual: Two rows are created; quantity remains `1` and the calculated values do not match the data-driven expectation.
- Reproducibility: Reproduced in all three final browser runs.
- Evidence: `findings/fr07-final-chrome/`, `findings/fr07-final-edge/`, `findings/fr07-final-firefox/`; `reports/github-evidence/bug-fr07-duplicate-rows.png`.
- Suggested fix: Merge cart entries by product ID and recalculate quantity, subtotal, and total.

## BUG-FR18-01 — Admin status update shows the wrong success message

- Feature/cases: FR-18, pending/confirmed/shipping transitions
- Severity/Priority: Medium / P2
- Environment: `http://localhost:5174`; Chrome, Edge, Firefox
- Steps: Log in as admin; update an order to an allowed next status.
- Expected: The specified Vietnamese success message `Cập nhật trạng thái đơn hàng thành công` is shown.
- Actual: The SUT does not show the expected message; its observed message is English `Order status updated`.
- Reproducibility: Reproduced in all three final browser runs.
- Evidence: `findings/fr18-final-chrome/`, `findings/fr18-final-edge/`, `findings/fr18-final-firefox/`; `reports/github-evidence/bug-fr18-success-message.png`.
- Suggested fix: Use the required localized success message.

## BUG-FR18-02 — Canceled orders remain actionable

- Feature/cases: FR-18, final-state restriction
- Severity/Priority: High / P1
- Environment: `http://localhost:5174`; Chrome, Edge, Firefox
- Steps: Log in as admin; locate a canceled order; inspect and use its action.
- Expected: Canceled orders are final, expose no transition action, or show the required restriction message.
- Actual: The SUT exposes `Đánh dấu Đã giao` for a canceled order and does not show the expected restriction message.
- Reproducibility: Reproduced in all three final browser runs.
- Evidence: `findings/fr18-final-chrome/`, `findings/fr18-final-edge/`, `findings/fr18-final-firefox/`; `reports/github-evidence/bug-fr18-canceled-final-state.png`.
- Suggested fix: Enforce final-state restrictions for canceled orders in both UI and API.

## BUG-FR18-03 — Admin order list has no status filter

- Feature/cases: FR-18, filter-by-status cases
- Severity/Priority: Medium / P2
- Environment: `http://localhost:5174`; Chrome, Edge, Firefox
- Expected: Admin can filter the order list by status.
- Actual: No status filter control is rendered; the related cases are explicit skips.
- Reproducibility: Confirmed by DOM inspection and final runs.
- Evidence: `findings/fr18-final-chrome/`, `findings/fr18-final-edge/`, `findings/fr18-final-firefox/`; no screenshot artifact was generated because skipped tests do not produce screenshots.
- Suggested fix: Add an accessible status filter and apply it to the order list.

## Created issues

The evidence commit is `1620d0c3ba3be1bd8eea1e2e097f812744a1260a`.

| Bug | GitHub issue |
| --- | --- |
| BUG-FR01-01 | https://github.com/HCMUS-software-testing/HW04/issues/11 |
| BUG-FR01-02 | https://github.com/HCMUS-software-testing/HW04/issues/12 |
| BUG-FR07-01 | https://github.com/HCMUS-software-testing/HW04/issues/13 |
| BUG-FR07-02 | https://github.com/HCMUS-software-testing/HW04/issues/14 |
| BUG-FR07-03 | https://github.com/HCMUS-software-testing/HW04/issues/15 |
| BUG-FR07-04 | https://github.com/HCMUS-software-testing/HW04/issues/16 |
| BUG-FR18-01 | https://github.com/HCMUS-software-testing/HW04/issues/17 |
| BUG-FR18-02 | https://github.com/HCMUS-software-testing/HW04/issues/18 |
| BUG-FR18-03 | https://github.com/HCMUS-software-testing/HW04/issues/19 |
