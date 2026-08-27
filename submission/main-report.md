# HW04 Automation Testing Main Report

## 1. Thông Tin Sinh Viên

- **MSSV:** `23127185`
- **Họ tên:** `Mai Thị Kim Duyên`
- **Ngày thực hiện:** `18-27/08/2026`
- **SUT:** EShop
- **SUT repository:** <https://github.com/ttbhanh/eshop-sut>
- **Automation repository:** `https://github.com/HCMUS-software-testing/HW04/tree/melyen`

## 2. Feature Selection

| Pool | Feature ID | Feature Name | Reason / Source |
| --- | --- | --- | --- |
| A | FR-03 | Quên mật khẩu & Đặt lại mật khẩu (2 bước) | HW02 selection |
| B | FR-10 | Trạng thái Đơn hàng (Order State Machine) | HW02 selection |
| C | FR-14 | Quản lý Danh mục (Category CRUD) | HW02 selection |

### HW02 Availability Declaration

I completed HW02 and reused the same three selected web features for HW04.

## 3. Automation Approach

- **Tool:** `Playwright`
- **Language:** `TypeScript`
- **Reporter:** `Playwright HTML reporter`
- **Browsers:** `Chromium`, `Firefox`, `Cốc Cốc` (Chromium-based)
- **Data-driven format:** `.json`
- **Run metadata:** HTML report hiển thị `Run by: 23127185` và ISO timestamp.

---

## 4. Feature A Automation Report (FR-03: Quên & Đặt lại Mật khẩu)

### 4.1 Feature Information

- **Pool:** A
- **Feature ID:** FR-03
- **Feature name:** Quên mật khẩu và đặt lại mật khẩu (2 bước)
- **Spec file:** `tests/poolA-fr03-forgot-password.spec.ts`
- **Data file:** `tests/data/poolA-fr03-forgot-password.json`

### 4.2 Reviewed Test Cases

| Test ID | Type | Preconditions | Test Data | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | Positive | SUT running | `test@eshop.com` | 1. Nhập email.<br>2. Click Yêu cầu OTP. | Nhận OTP 6 chữ số thành công. | `visibleText` |
| TC2 | Negative | SUT running | `user_validgmail.com` | 1. Nhập email sai định dạng.<br>2. Click Yêu cầu OTP. | Báo lỗi email sai định dạng. | `visibleText` |
| TC3 | Negative | SUT running | *(Rỗng)* | 1. Bỏ trống email.<br>2. Click Yêu cầu OTP. | Báo lỗi không được để trống email. | `visibleText` |
| TC4 | Negative | SUT running | `unknown@gmail.com` | 1. Nhập email chưa đăng ký.<br>2. Click Yêu cầu OTP. | Báo lỗi email chưa đăng ký. | `visibleText` |
| TC5 | Coc Coc Case | Step 1 passed | OTP đúng, MK: `Aaaaaaa1!` | 1. Nhập OTP & MK 8 chars.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |
| TC6 | Positive | Step 1 passed | OTP đúng, MK: `Aaaaaaaa1!` | 1. Nhập OTP & MK 9 chars.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |
| TC7 | Positive | Step 1 passed | OTP đúng, MK: `Aaaaaaaaa1!` | 1. Nhập OTP & MK 1 chữ hoa.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |
| TC8 | Positive | Step 1 passed | OTP đúng, MK: `AAaaaaaaa1!` | 1. Nhập OTP & MK 2 chữ hoa.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |
| TC9 | Positive | Step 1 passed | OTP đúng, MK: `AAAAAAAAa1!` | 1. Nhập OTP & MK 1 chữ thường.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |
| TC10 | Positive | Step 1 passed | OTP đúng, MK: `AAAAAAAAaa1!` | 1. Nhập OTP & MK 2 chữ thường.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |
| TC11 | Positive | Step 1 passed | OTP đúng, MK: `AAAAAAAAa1!` | 1. Nhập OTP & MK 1 chữ số.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |
| TC12 | Positive | Step 1 passed | OTP đúng, MK: `AAAAAAAAa12!` | 1. Nhập OTP & MK 2 chữ số.<br>2. Click Đặt lại MK. | Đặt lại MK thành công. | `urlState` / `visibleText` |

### 4.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | 12 | 3 | 9 | `playwright-report/index.html` |
| Firefox | 12 | 3 | 9 | `playwright-report/index.html` |
| Cốc Cốc | 12 | 3 | 9 | `playwright-report/index.html` |

### 4.4 AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| **Locator sai thuộc tính type:** AI giả định ô Email dùng `input[type="email"]`, nhưng SUT thực tế dùng `input[type="text"]`. | Sửa locator sang `page.locator('input[type="text"]').first()` khớp với DOM thực tế của SUT. | AI suy đoán thuộc tính `type="email"` mặc định mà không inspect DOM thực tế SUT. |
| **Logic bóc tách OTP linh tinh:** dùng Regex bóc OTP từ notification banner. | Loại bỏ Regex parsing, đọc trực tiếp `tc.otp` từ JSON data. | AI thiết kế logic bóc tách OTP động mà không lường trước format thông báo thay đổi. |
| **Bỏ qua trường Confirm Password:** bọc ô Confirm Password trong `isVisible()` làm trôi bug thiếu UI. | Loại bỏ kiểm tra điều kiện, assert trực tiếp trường Confirm Password theo yêu cầu spec. | AI giả định form luôn có đủ 2 ô MK và bọc điều kiện để tránh crash script. |
| **Assertion gượng ép (Suppressing Failures):** viết `if (!isVisible) expect(tc.type).toBe('Negative')`. | Bắt buộc kiểm tra thông báo lỗi hiển thị thực tế trên UI bằng `expect(msg).toBeVisible()`. | AI cố tình viết logic giữ test result PASSED giả tạo khi UI không hiện lỗi. |

---

## 5. Feature B Automation Report (FR-10: Trạng thái Đơn hàng)

### 5.1 Feature Information

- **Pool:** B
- **Feature ID:** FR-10
- **Feature name:** Trạng thái Đơn hàng (Order State Machine)
- **Spec file:** `tests/poolB-fr10-order-status.spec.ts`
- **Data file:** `tests/data/poolB-fr10-order-status.json`

### 5.2 Reviewed Test Cases

| Test ID | Type | Preconditions | Test Data | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | Positive | Admin order `pending` | Admin token, Order ID | 1. Admin gọi API status `confirmed`. | 200 OK, Status -> `confirmed`. | `stateTransition` |
| TC2 | Negative | User order `pending` | User token, Order ID | 1. User gọi API Admin status `confirmed`. | 403 Forbidden (RBAC). | `statusCode` |
| TC3 | Positive | Admin order `confirmed` | Admin token, Order ID | 1. Admin gọi API status `shipping`. | 200 OK, Status -> `shipping`. | `stateTransition` |
| TC4 | Negative | User order `confirmed` | User token, Order ID | 1. User gọi API Admin status `shipping`. | 403 Forbidden (RBAC). | `statusCode` |
| TC5 | Positive | Admin order `shipping` | Admin token, Order ID | 1. Admin gọi API status `delivered`. | 200 OK, Status -> `delivered`. | `stateTransition` |
| TC6 | Negative | User order `shipping` | User token, Order ID | 1. User gọi API Admin status `delivered`. | 403 Forbidden (RBAC). | `statusCode` |
| TC7 | Positive | User order `pending` | User token, Order ID | 1. User gọi API cancel order. | 200 OK, Status -> `canceled`. | `stateTransition` |
| TC8 | Positive | Admin order `confirmed` | Admin token, Order ID | 1. Admin gọi API cancel order. | 200 OK, Status -> `canceled`. | `stateTransition` |
| TC9 | Boundary | Admin order `shipping` | Admin token, Order ID | 1. Check UI Admin tại trạng thái `shipping`. | Nút Hủy đơn bị ẩn/vô hiệu hóa. | `controlState` |
| TC10 | Negative | User order `shipping` | User token, Order ID | 1. User gọi API cancel order khi shipping. | 400 Bad Request (Không được hủy). | `statusCode` |
| TC11 | Boundary | Order `delivered` | User/Admin token | 1. Thử cancel/đổi trạng thái order `delivered`. | Báo lỗi trạng thái kết thúc. | `controlState` / `statusCode` |
| TC12 | Boundary | Order `canceled` | Admin token | 1. Thử đổi trạng thái order `canceled`. | Báo lỗi trạng thái kết thúc. | `controlState` / `statusCode` |

### 5.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | 12 | 8 | 4 | `playwright-report/index.html` |
| Firefox | 12 | 8 | 4 | `playwright-report/index.html` |
| Cốc Cốc | 12 | 8 | 4 | `playwright-report/index.html` |

### 5.4 AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| **Setup trạng thái tĩnh:** AI dùng ID đơn hàng cố định có sẵn trong DB. | Xây dựng helper function `setupOrderWithStatus()` tạo và đẩy trạng thái đơn hàng tự động qua API. | AI không lường trước dữ liệu đơn hàng bị thay đổi trạng thái sau mỗi lần chạy test. |
| **Bỏ qua phân quyền API (RBAC Bypass):** AI dùng chung endpoint User cho mọi thao tác. | Phân định rõ endpoint Admin `/api/admin/orders/:id/status` vs User `/api/orders/:id/cancel`. | AI giả định một endpoint duy nhất xử lý toàn bộ logic chuyển trạng thái đơn hàng. |
| **Assertion 1 chiều trên UI:** AI chỉ check nhãn hiển thị trên web UI. | Bổ sung kiểm tra HTTP status code và query DB/API GET `/api/orders/:id` xác nhận field status. | AI ưu tiên kiểm tra giao diện trực quan thay vì kiểm tra tính toàn vẹn dữ liệu backend. |
| **Bug Masking:** AI sửa expectedStatusCode thành `200 OK` cho TC2, TC4, TC6 để test không bị Fail. | Khôi phục kỳ vọng chuẩn: `expectedStatusCode: 403` (TC2, TC4, TC6) và `400` (TC10). | AI cố gắng làm "xanh" kết quả test bằng cách thay đổi kỳ vọng assertion khớp với bug SUT. |

---

## 6. Feature C Automation Report (FR-14: Quản lý Danh mục)

### 6.1 Feature Information

- **Pool:** C
- **Feature ID:** FR-14
- **Feature name:** Quản lý Danh mục (Category CRUD)
- **Spec file:** `tests/poolC-fr14-category-management.spec.ts`
- **Data file:** `tests/data/poolC-fr14-category-management.json`

### 6.2 Reviewed Test Cases

| Test ID | Type | Preconditions | Test Data | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | Positive | Admin logged in | Name: `Thiết bị số test TC1` | 1. POST `/api/categories` với Admin token. | 200 OK, Tạo danh mục thành công. | `stateTransition` |
| TC2 | Positive | Guest user | *(Rỗng)* | 1. GET `/api/categories` public API. | 200 OK, Trả về danh sách danh mục. | `stateTransition` |
| TC3 | Positive | Admin logged in | Name: `Thiết bị số Cao cấp TC3` | 1. PUT `/api/categories/{id}` với Admin token. | 200 OK, Cập nhật danh mục thành công. | `stateTransition` |
| TC4 | Positive | Admin logged in | Name: `Danh mục sắp xóa TC4` | 1. DELETE `/api/categories/{id}` với Admin token. | 200 OK, Xóa danh mục thành công. | `stateTransition` |
| TC5 | Negative | No token | Header: Unauthenticated | 1. POST `/api/categories` không có auth. | 401 Unauthorized. | `statusCode` |
| TC6 | Negative | Invalid token | Header: `Bearer invalid` | 1. POST `/api/categories` token sai. | 403 Forbidden. | `statusCode` |
| TC7 | Negative | User logged in | User token | 1. POST `/api/categories` với User token. | 403 Forbidden (RBAC). | `statusCode` |
| TC8 | Negative | User logged in | User token | 1. PUT `/api/categories/{id}` với User token. | 403 Forbidden (RBAC). | `statusCode` |
| TC9 | Negative | User logged in | User token | 1. DELETE `/api/categories/{id}` với User token. | 403 Forbidden (RBAC). | `statusCode` |
| TC10 | Boundary | Admin logged in | Name: `""` (Rỗng) | 1. POST `/api/categories` với tên rỗng. | 400 Bad Request. | `statusCode` |
| TC11 | Boundary | Admin logged in | Name: 255 chars | 1. POST `/api/categories` tên 255 ký tự. | 200 OK, Tạo danh mục 255 chars. | `stateTransition` |
| TC12 | Coc Coc Case | Admin UI | Admin login | 1. Admin login UI -> Tab Danh mục -> Thêm mới. | Danh mục hiển thị trên bảng Admin UI. | `visibleText` |

### 6.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | 12 | 8 | 4 | `playwright-report/index.html` |
| Firefox | 12 | 8 | 4 | `playwright-report/index.html` |
| Cốc Cốc | 12 | 8 | 4 | `playwright-report/index.html` |

### 6.4 AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| **Sai Port Admin UI (TC12):** AI gọi UI trên port `5173`. | Đổi URL điều hướng UI Admin sang `http://localhost:5174` (Admin Portal). | AI không biết SUT chạy Admin UI độc lập trên port 5174. |
| **Mismatch Locators màn hình Login:** AI dùng placeholder tiếng Anh `Email address`, `Password`. | Cập nhật locators khớp UI tiếng Việt: `getByPlaceholder('Email')`, `getByPlaceholder('Password')`, `getByRole('button', { name: 'Login' })`. | AI dùng template mặc định tiếng Anh. |
| **Bỏ qua RBAC Bypass (TC7, TC8, TC9):** AI chấp nhận status `200 OK` khi User thao tác danh mục. | Giữ nguyên kỳ vọng spec `403 Forbidden` và kiểm tra dữ liệu DB không bị biến đổi. | AI ưu tiên làm test PASS hơn là bắt bug phân quyền của SUT. |
| **Thiếu Cleanup dữ liệu rác:** sau khi chạy boundary case TC10 & TC11 dữ liệu bị đọng lại DB. | Thêm khối cleanup tự động xóa danh mục thử nghiệm sau mỗi test run. | AI không thiết kế dọn dẹp state cho kịch bản tự động hóa. |

---

## 7. Data-Driven Testing Evidence

| Feature | Data File | Number Of Records | Notes |
| --- | --- | ---: | --- |
| Feature A (FR-03) | `tests/data/poolA-fr03-forgot-password.json` | 12 | Chứa email, otp, newPassword, confirmPassword, expectedMessage |
| Feature B (FR-10) | `tests/data/poolB-fr10-order-status.json` | 12 | Chứa role, initialStatus, targetStatus, action, expectedStatusCode |
| Feature C (FR-14) | `tests/data/poolC-fr14-category-management.json` | 12 | Chứa role, name, updateName, expectedStatusCode, expectedSuccess |

---

## 8. Assertion Patterns Used

| Assertion Pattern | Example Location | Purpose |
| --- | --- | --- |
| `visibleText` | `tests/poolA-fr03-forgot-password.spec.ts:48` | Verify thông báo hiển thị trên giao diện (Toast/Alert/Label) |
| `urlState` | `tests/poolA-fr03-forgot-password.spec.ts:62` | Verify đường dẫn URL chuyển trang chính xác |
| `statusCode` | `tests/poolB-fr10-order-status.spec.ts:112` | Verify mã phản hồi HTTP status code (200, 400, 401, 403) |
| `stateTransition` | `tests/poolC-fr14-category-management.spec.ts:85` | Verify chuyển đổi trạng thái bản ghi trong CSDL via API |
| `controlState` | `tests/poolB-fr10-order-status.spec.ts:156` | Verify trạng thái nút bấm / input trên UI (ví dụ: nút Hủy đơn ẩn/vô hiệu hóa) |

---

## 9. Multi-Browser HTML Reports

| Run | Browser | Feature(s) | Report Path / Link | Contains `Run by: 23127185` | Contains ISO Timestamp |
| --- | --- | --- | --- | --- | --- |
| 1 | Chromium | FR-03, FR-10, FR-14 | `playwright-report/index.html` | Yes | Yes |
| 2 | Firefox | FR-03, FR-10, FR-14 | `playwright-report/index.html` | Yes | Yes |
| 3 | Cốc Cốc | FR-03, FR-10, FR-14 | `playwright-report/index.html` | Yes | Yes |

---

## 10. Bugs Found

| Bug ID | Feature | Summary | Severity | GitHub Issue | Screenshot |
| --- | --- | --- | --- | --- | --- |
| BUG-001 | FR-03 Quên & Đặt lại MK | Không thể đặt lại mật khẩu do SUT validate sai Password Policy và thiếu trường Xác nhận mật khẩu | High | https://github.com/HCMUS-software-testing/HW04/issues/5 | `playwright-report/data/bug-001.png` |
| BUG-002 | FR-03 Quên & Đặt lại MK | Hệ thống tạo mã OTP chỉ có 4 chữ số thay vì 6 chữ số theo chuẩn yêu cầu | Medium | https://github.com/HCMUS-software-testing/HW04/issues/6 | `playwright-report/data/bug-002.png` |
| BUG-003 | FR-10 Trạng thái Đơn hàng | Lỗi phân quyền API: Tài khoản User có thể trực tiếp gọi API Admin để thay đổi trạng thái đơn hàng | High | https://github.com/HCMUS-software-testing/HW04/issues/7 | `playwright-report/data/bug-003.png` |
| BUG-004 | FR-10 Trạng thái Đơn hàng | Cho phép User hủy đơn hàng khi đang trong quá trình giao hàng (shipping) | Medium | https://github.com/HCMUS-software-testing/HW04/issues/8 | `playwright-report/data/bug-004.png` |
| BUG-005 | FR-14 Quản lý Danh mục | Lỗi phân quyền API Quản lý Danh mục: Tài khoản User có thể Thêm, Sửa, Xóa danh mục sản phẩm trái phép | High | https://github.com/HCMUS-software-testing/HW04/issues/9 | `playwright-report/data/bug-005.png` |
| BUG-006 | FR-14 Quản lý Danh mục | Thiếu validation dữ liệu đầu vào: Cho phép tạo danh mục với tên là chuỗi rỗng | Medium | https://github.com/HCMUS-software-testing/HW04/issues/10 | `playwright-report/data/bug-006.png` |

---

## 11. Test Cases Not Automated

All selected 36 test cases across the three features (12 per feature) were successfully automated using Playwright.

```text
All selected test cases were automated.
```

---

## 12. Demo Video

- **YouTube unlisted link:** `https://youtu.be/-G-VOqTk7gQ`
- **Authorship evidence:** Terminal running `whoami`
- **Script demonstrated:** `tests/poolA-fr03-forgot-password.spec.ts`