# AI Audit Report

## Declaration

I use AI tools for the following tasks.

## Summary Table

| No. | AI Tool | Date Time | Purpose | Prompt Summary | AI Output Summary | Human Review / Change |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Gemini 3.6 Flash | 2026-08-18 17:42 | Feature FR-03 script generation | Sử dụng skill @hw04-data-driven-script để tạo Playwright test & JSON data cho FR-03 (12 test cases) | Tạo file tests/data/poolA-fr03-forgot-password.json và tests/poolA-fr03-forgot-password.spec.ts với 3 assertion patterns | Accepted initial draft |
| 2 | Gemini 3.6 Flash | 2026-08-18 21:30 | Feature FR-03 script review & bug classification | Sử dụng skill @hw04-automation-maintenance để review, phân tích lỗi AI script FR-03 và phân loại bug thực tế | Phân tích 5 lỗi AI (locators, regex OTP, missing confirm password, forced pass assertion, weak URL assertion), tạo bảng AI Review And Human Fixes và Bug Report | Reviewed & applied human fixes to test script, updated bug-report.md & main-report.md |
| 3 | Gemini 3.6 Flash | 2026-08-22 08:36 | Feature FR-10 (Order Status) script generation | Sử dụng skill @hw04-data-driven-script để tạo Playwright test & JSON data cho FR-10 (12 test cases) từ file poolB.md | Tạo file tests/data/poolB-fr10-order-status.json và tests/poolB-fr10-order-status.spec.ts với 4 assertion patterns (stateTransition, statusCode, controlState, visibleText) | Refactored test setup fixture for dynamic order state initialization. Verified 24 Passed, 12 Failed across 3 browsers |
| 4 | Gemini 3.6 Flash | 2026-08-22 09:12 | Feature FR-10 script review & bug classification | Sử dụng skill @hw04-automation-maintenance để review, phân tích lỗi AI script FR-10 và tạo bảng AI Review And Human Fixes | Phân tích 5 lỗi AI (setup fixture tĩnh, bỏ qua RBAC, assertion 1 chiều, session token UI flaky, bug masking), tạo bảng AI Review And Human Fixes và Bug Report | Refactored tests/poolB-fr10-order-status.spec.ts with setupOrderWithStatus fixture, updated ai-review-and-human-fixes-fr10.md, verified 24 Passed & 12 Failed |

## Full Interaction Logs

### Interaction 1

- **AI tool:** Gemini 3.6 Flash
- **Date and time:** 2026-08-18 17:42
- **Purpose:** Generate Playwright data-driven test script and JSON data file for Feature FR-03 (Forgot Password & Reset).
- **Prompt:**

```text
Hãy sử dụng skill @hw04-data-driven-script để viết Playwright test và tạo data file cho Feature đầu tiên.

Thông tin Input:
- Feature ID: FR-03 (Forgot password and password reset)
- Pool: A
- Base URL: http://localhost:5173
- Định dạng data: .json
- Đường dẫn Spec Output: tests/poolA-fr03-forgot-password.spec.ts
- Đường dẫn Data Output: tests/data/poolA-fr03-forgot-password.json
- Danh sách 12 Test Cases: Lấy trong bảng Test Case Table của file poolA.md

Yêu cầu Output:
1. Tạo file tests/data/poolA-fr03-forgot-password.json chứa đủ 12 test cases.
2. Tạo file tests/poolA-fr03-forgot-password.spec.ts đọc data từ file JSON trên.
3. Sử dụng ít nhất 3 assertion patterns khác nhau.
4. Ưu tiên các locator Playwright chuẩn như getByRole, getByLabel, getByPlaceholder.
```

- **AI output:**

```text
Đã hoàn thành tạo Data File và Playwright Spec File cho Feature FR-03 (Forgot password and password reset) theo đúng hướng dẫn từ skill @hw04-data-driven-script.

Các Artifacts Đã Tạo:
1. Data File: tests/data/poolA-fr03-forgot-password.json
   - Chứa đủ 12 test cases (TC1 tới TC12) được trích xuất từ bảng Test Case Table trong poolA.md.
   - Cấu trúc chuẩn hóa gồm: id, type, step, title, email, otp, newPassword, confirmPassword, expectedMessage, assertionPattern.

2. Playwright Spec File: tests/poolA-fr03-forgot-password.spec.ts
   - Đọc dữ liệu động từ file JSON poolA-fr03-forgot-password.json.
   - Ưu tiên sử dụng Playwright locators chuẩn: getByRole, getByLabel, getByPlaceholder.
   - Tích hợp 3 assertion patterns khác nhau:
     1. Visible Text / Element Assertion: expect(messageElement).toBeVisible()
     2. Validation Message / Form State Assertion: expect(validationMessage).toBeTruthy()
     3. URL / Navigation State Assertion: expect(page).toHaveURL(...)
```

- **Human review / change:** Accepted and verified that data file contains 12 cases and spec file imports JSON dynamically.

---

### Interaction 2

- **AI tool:** Gemini 3.6 Flash
- **Date and time:** 2026-08-18 21:30
- **Purpose:** Review, analyze AI-generated script issues, fix Playwright test stability, classify product bugs vs automation errors for Feature FR-03.
- **Prompt:**

```text
Hãy dùng skill @hw04-automation-maintenance để review, phân tích các thay đổi và tạo bảng AI Review And Human Fixes cho test script poolA-fr03-forgot-password.spec.ts.

Thông tin đầu vào:
- Spec file: tests/poolA-fr03-forgot-password.spec.ts
- Data file: tests/data/poolA-fr03-forgot-password.json
- Feature: FR-03 Quên mật khẩu và Đặt lại mật khẩu (Pool A)
- Student ID: 23127185
- Browsers: Chromium, Firefox, Cốc Cốc
- Log/Report path: playwright-report/index.html

Yêu cầu xuất ra:
1. Bảng AI Review And Human Fixes (gồm AI Issue, Human Fix, Why AI Missed It).
2. Phân loại kết quả Pass/Fail (Bug thực tế của SUT vs Lỗi automation).
3. Nội dung Bug Report ngắn gọn để ghi vào bug-report.md.
```

- **AI output:**

```text
Phân tích thành công 5 lỗi chính từ AI script:
1. Locators chung chung input[type="text"].first().
2. Regex bóc tách OTP từ notification banner.
3. Bọc trường Confirm Password trong kiểm tra isVisible() làm lỡ bug giao diện.
4. Logic gượng ép expect(tc.type).toBe('Negative') cho Negative cases.
5. Assertion URL quá ngắn và lỏng lẻo.

Kết quả Phân loại Pass/Fail:
- 4 PASSED (TC2, TC3, TC4): Test validation email chuẩn.
- 8 FAILED (TC1, TC5-TC12): Bug sản phẩm SUT (OTP 4 số, thiếu trường Confirm Password, sai validation Password Policy).
```

- **Human review / change:** Verified findings against SUT behavior, updated `tests/poolA-fr03-forgot-password.spec.ts`, updated `bug-report.md` (BUG-001 & BUG-002) and `main-report.md`.

---

### Interaction 3

- **AI tool:** Gemini 3.6 Flash
- **Date and time:** 2026-08-22 08:36
- **Purpose:** Generate Playwright data-driven test script and JSON data file for Feature FR-10 (Order Status - Pool B).
- **Prompt:**

```text
Hãy sử dụng skill @hw04-data-driven-script để viết Playwright test và tạo data file cho Feature đầu tiên.

Thông tin Input:
- Feature ID: FR-10 (Order Status)
- Pool: B
- Base URL: http://localhost:5173
- Định dạng data: .json
- Đường dẫn Spec Output: tests/poolB-fr10-order-status.spec.ts
- Đường dẫn Data Output: tests/data/poolB-fr10-order-status.json
- Danh sách 12 Test Cases: Lấy trong bảng Test Case Table của file poolB.md
```

- **AI output:**

```text
Đã hoàn thành việc khởi tạo Playwright Data-Driven Test Script và Data file JSON cho Feature FR-10 (Order Status - Pool B) bằng skill @hw04-data-driven-script.

Summary Artifacts Created:
- Spec File: tests/poolB-fr10-order-status.spec.ts - File Playwright test đọc test case động từ data file JSON, áp dụng 4 assertion patterns.
- Data File (JSON): tests/data/poolB-fr10-order-status.json - File dữ liệu JSON chứa đầy đủ 12 test cases của Feature FR-10.

4 Assertion Patterns Đã Sử Dụng:
1. stateTransition: Kiểm tra sự chuyên dịch trạng thái đơn hàng trong backend/UI (pending -> confirmed, confirmed -> shipping, shipping -> delivered, confirmed -> canceled).
2. statusCode: Kiểm tra phản hồi HTTP status code (401/403/400) khi tài khoản User cố gắng thao tác các API dành riêng cho Admin hoặc thực hiện chuyển đổi trạng thái sai quy tắc.
3. controlState: Kiểm tra sự tồn tại/ẩn/vô hiệu hóa của các nút điều hướng thao tác trên UI (ví dụ: nút Hủy đơn không hiển thị đối với đơn hàng đã giao).
4. visibleText: Kiểm tra các chuỗi nhãn trạng thái hiển thị trực quan trên giao diện (Chờ xác nhận, Đã xác nhận, Đang giao, Đã giao, Đã hủy).

Danh sách 12 Test Cases (Pool B - FR-10): TC1 tới TC12 (Positive, Negative, Boundary).

Ghi chú Human Review & Verification:
- Preconditions: SUT Backend running at http://localhost:3000, Web SUT running at http://localhost:5173.
- Hành vi thực tế SUT (Bugs ghi nhận): TC2, TC4, TC6 thất bại do SUT Backend thiếu kiểm tra quyền Role Admin trên endpoint status; TC10 thất bại do backend cho phép hủy đơn khi đang ở trạng thái shipping.
```

- **Human review / change:** Added dynamic order state setup fixture `setupOrderWithStatus()`. Verified 24 Passed, 12 Failed across Chromium, Firefox, Cốc Cốc browsers (8 Passed, 4 Failed per browser).

---

### Interaction 4

- **AI tool:** Gemini 3.6 Flash
- **Date and time:** 2026-08-22 09:12
- **Purpose:** Review, analyze AI-generated script issues, refactor test stability, and create AI Review And Human Fixes report for Feature FR-10 (Order Status).
- **Prompt:**

```text
Hãy dùng skill @hw04-automation-maintenance để review, phân tích các thay đổi và tạo bảng AI Review And Human Fixes cho test script poolA-fr10-order-status.spec.ts.

Thông tin đầu vào:
- Spec file: tests/poolB-fr10-order-status.spec.ts
- Data file: tests/data/poolB-fr10-order-status.json
- Feature: FR-10 Trạng thái Đơn hàng (Pool B)
- Student ID: 23127185
- Browsers: Chromium, Firefox, Cốc Cốc
- Log/Report path: playwright-report/index.html

Yêu cầu xuất ra:
1. Bảng AI Review And Human Fixes (gồm AI Issue, Human Fix, Why AI Missed It).
2. Phân loại kết quả Pass/Fail (Bug thực tế của SUT vs Lỗi automation).
3. Nội dung Bug Report ngắn gọn.
```

- **AI output:**

```text
Phân tích và sửa đổi 5 lỗi chính từ AI script cho FR-10:
1. Thiếu Setup Precondition động -> Viết helper function setupOrderWithStatus() tự động checkout tạo order mới qua API và đẩy trạng thái trung gian tới targetStatus.
2. Bỏ qua phân quyền API Endpoint (Broken Access Control) -> Tách biệt endpoint Admin (/api/admin/orders/:id/status) vs User (/api/orders/:id/cancel).
3. Assertion 1 chiều trên UI -> Bổ sung kiểm tra HTTP status code và gọi API GET /api/orders/:id kiểm tra field status trong DB.
4. Flaky Session State UI -> Inject Bearer Token vào localStorage bằng page.evaluate() trước khi chuyển hướng tới /profile.
5. Bug Masking -> Khôi phục expectedStatusCode: 403 (TC2, TC4, TC6) và expectedStatusCode: 400 (TC10) theo requirement spec.

Kết quả Phân loại Pass/Fail:
- 24 PASSED (8 per browser): TC1, TC3, TC5, TC7, TC8, TC9, TC11, TC12 hoạt động đúng nghiệp vụ.
- 12 FAILED (4 per browser): BUG-003 (Broken Access Control - TC2, TC4, TC6) và BUG-004 (User hủy đơn khi shipping - TC10).
```

- **Human review / change:** Created `submission/ai-review-and-human-fixes-fr10.md`, verified test execution across Chromium, Firefox, Cốc Cốc, updated bug report entries.

---

## Prompt Quality Notes

| Prompt | What Worked | What Failed | Improvement |
| --- | --- | --- | --- |
| `Skill @hw04-data-driven-script invocation for FR-03` | Clarified output paths, base URL, and assertion pattern requirements clearly | None | Specify exact SUT input element selectors if non-standard UI components exist |
| `Skill @hw04-automation-maintenance invocation for FR-03` | Structured review process, identified 5 specific AI script issues, categorized SUT bugs clearly | None | Include raw HTML DOM snippet when requesting AI locator fixes |
| `Skill @hw04-data-driven-script invocation for FR-10` | Extracted 12 test cases from poolB.md, generated clean spec and JSON data file with 4 assertion patterns | SUT permission bugs caused test cases to fail assertion as expected | Document expected HTTP status codes and SUT authorization bugs clearly |
| `Skill @hw04-automation-maintenance invocation for FR-10` | Extracted 5 critical AI automation issues, refactored dynamic precondition fixture, structured Pass/Fail bug classification | None | Specify SUT API endpoint structures and authentication headers explicitly in initial prompt |

## Human Responsibility Statement

I reviewed, corrected, and took responsibility for the final automation scripts, data files, assertions, reports, and bug reports submitted for HW04.


