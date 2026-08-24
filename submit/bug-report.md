# HW04 Bug Report

## Run Context

- Student ID: 23127326
- Test run timestamp: 2026-08-20T15:45:31Z
- Browsers: Chromium, Firefox, WebKit
- Total executions: 132
- Failed executions: 72
- HTML report: `submit/playwright-report/index.html`
- Failure artifacts: `submit/test-results/` and `submit/playwright-report/data/`

The following bugs are grouped from repeated failures across the three browsers. GitHub Issue links are marked `TBD` and should be replaced after creating public GitHub Issues.

## BUG-01: Login API Exposes User Password

- Feature: FR-02 Login and account lockout
- Severity: Critical
- Related test: `FR02-TC01 Login succeeds with valid default user`
- Browsers observed: Chromium, Firefox, WebKit
- Screenshot: `submit/screenshots/BUG-01-password-leak-login-response.png`
- GitHub Issue: `TBD`

### Steps To Reproduce

1. Start the SUT backend.
2. Send `POST /api/login` with valid user credentials.
3. Inspect the JSON response body.

### Expected

The response should include authentication data and safe user profile fields only. It must not expose the user's password.

### Actual

The response body contains a `password` property with value `Test1234!`, causing the assertion `not.toHaveProperty("password")` to fail.

## BUG-02: Login Form Uses Text Input Instead Of Email Input

- Feature: FR-02 Login and account lockout
- Severity: Medium
- Related test: `FR02-TC03 Login form rejects malformed email before submit`
- Browsers observed: Chromium, Firefox, WebKit
- Screenshot: `submit/screenshots/BUG-02-login-email-input-type.png`
- GitHub Issue: `TBD`

### Steps To Reproduce

1. Open the customer login page.
2. Inspect the username/email field.
3. Enter malformed email text and submit the form.

### Expected

The login field should use browser-level email validation or equivalent validation before submitting malformed email values.

### Actual

The field type is `text`, not `email`. The browser does not provide native email validation for malformed email input.

## BUG-03: Account Lockout Duration Does Not Match Requirement

- Feature: FR-02 Login and account lockout
- Severity: High
- Related test: `FR02-TC07 Account is locked after three consecutive wrong passwords`
- Browsers observed: Chromium, Firefox, WebKit
- Screenshot: `submit/screenshots/BUG-03-lockout-duration.png`
- GitHub Issue: `TBD`

### Steps To Reproduce

1. Reset the default user state.
2. Submit three consecutive wrong password attempts.
3. Read `locked_until` from the database.

### Expected

The account should be locked for approximately 30 seconds according to the HW02-derived test expectation.

### Actual

The observed remaining lock duration is approximately 180 seconds, which does not match the expected 30-second lockout window.

## BUG-04: Coupon API Handles Invalid Totals As Minimum-Order Errors

- Feature: FR-09 Coupon checkout
- Severity: High
- Related tests: `FR09-TC11 Reject negative total amount`, `FR09-TC12 Reject non-numeric total amount`
- Browsers observed: Chromium, Firefox, WebKit
- Screenshot: `submit/screenshots/BUG-04-negative-total-validation.png`
- GitHub Issue: `TBD`

### Steps To Reproduce

1. Log in as a normal user.
2. Call `POST /api/apply-coupon` with coupon code and an invalid `total_amount`, such as a negative value or non-numeric value.
3. Inspect the response message.

### Expected

The API should reject the request with a validation error that clearly mentions invalid total/order amount.

### Actual

The API returns a minimum-order error message, for example: `Đơn hàng chưa đủ giá trị tối thiểu...`, which hides the real invalid input problem.

## Additional Observations

The Playwright run also shows repeated failures for authorization and validation edge cases in FR-09 and FR-17. Some of these may be product bugs, while others may be test-oracle gaps where the expected status code was stricter than the implemented API behavior. They are preserved in the HTML report and should be triaged before final issue creation.
