# AI Review And Human Fixes Report: Feature FR-03 (Forgot Password & Password Reset)

- **Spec File:** `tests/poolA-fr03-forgot-password.spec.ts`
- **Data File:** `tests/data/poolA-fr03-forgot-password.json`
- **Feature:** FR-03 Quên mật khẩu và Đặt lại mật khẩu (Pool A)
- **Student ID:** 23127185
- **Browsers Executed:** Chromium, Firefox, Cốc Cốc
- **HTML Report Path:** `playwright-report/index.html`

---

## 1. Bảng AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| **Locator sai thuộc tính type:** AI ban đầu giả định ô Email dùng `input[type="email"]` theo tiêu chuẩn HTML5, nhưng SUT thực tế lại dùng `input[type="text"]`. | Sửa locator sang `page.locator('input[type="text"]').first()` khớp với DOM thực tế của SUT. | AI suy đoán thuộc tính `type="email"` mặc định của ô nhập email mà không inspect DOM thực tế của SUT. |
| **Logic bóc tách OTP từ banner thông báo cứng:** AI dùng Regex `Mã OTP của bạn là: (\w+)` để tự lấy OTP từ notification và điền vào form. | Loại bỏ Regex parsing trong test script, lấy trực tiếp giá trị `tc.otp` từ data file JSON để đảm bảo tính nhất quán của data-driven testing. | AI tự động thiết kế logic lấy OTP động mà không lường trước việc SUT có thể thay đổi định dạng thông báo. |
| **Bỏ qua trường Confirm Password bị thiếu:** AI dùng `if (await confirmPasswordInput.isVisible())` bọc trường Confirm Password nên test không bắt được lỗi thiếu trường UI. | Loại bỏ điều kiện kiểm tra tồn tại rỗng, kiểm tra trực tiếp sự thiếu hụt của trường Confirm Password theo đúng yêu cầu test case. | AI giả định form đặt lại mật khẩu luôn tuân theo chuẩn có 2 ô mật khẩu và tự động bọc trong kiểm tra `isVisible()`. |
| **Assertion bị gượng ép (Suppressing Failures cho Negative Cases):** AI viết `if (!isVisible && tc.type === 'Negative') expect(tc.type).toBe('Negative')`, làm cho test case luôn Pass dù SUT không hiện thông báo lỗi. | Khắc phục assertion, yêu cầu kiểm tra chính xác thông báo lỗi trên UI bằng `await expect(messageElement).toBeVisible()`. | AI cố gắng xử lý các trường hợp test fail bằng cách thêm logic điều kiện để giữ cho test result "xanh" (PASSED). |
| **Thiếu assertion kiểm tra độ dài mã OTP (TC1):** AI chỉ kiểm tra thông báo hiển thị banner mà không kiểm tra độ dài chuỗi OTP thực tế. | Bổ sung assertion kiểm tra mã OTP trong banner thông báo phải đúng 6 chữ số theo tiêu chuẩn an toàn. | AI chỉ kiểm tra sự tồn tại của chuỗi thông báo chung chung mà không bóc tách kiểm định quy tắc nghiệp vụ của mã OTP. |
| **Assertion chuyển trang (`urlState`) chưa đầy đủ:** AI chỉ kiểm tra URL chứa `/login` hoặc `/reset-success` với timeout ngắn mà không bắt thông báo validate sai password policy. | Bổ sung assertion kiểm tra cả thông báo lỗi validation mật khẩu/OTP (`.alert, .error, .toast`) và trạng thái URL. | AI ưu tiên assertion đơn giản trên URL thay vì kiểm tra toàn diện kết quả nghiệp vụ của SUT. |

---

## 2. Phân Loại Kết Quả Pass/Fail (Bug Thực Tế SUT vs Lỗi Automation)

- **Tổng số Test Cases:** 12 TCs (Chạy trên 3 trình duyệt: Chromium, Firefox, Cốc Cốc)
- **Kết quả Execution:** **4 PASSED**, **8 FAILED**

### A. Bugs Thực Tế Của SUT (SUT Product Bugs) - 8 Test Cases Fail:
1. **TC1 (Lỗi OTP Format & Length - Severity: Medium):**
   - *Mô tả:* SUT sinh ra và hiển thị mã OTP chỉ có 4 chữ số (ví dụ: `1234`), trong khi yêu cầu kỹ thuật chuẩn của FR-03 là mã OTP 6 chữ số.
2. **TC5 - TC12 (Lỗi Validation Password Policy & Thiếu trường Confirm Password - Severity: High):**
   - *Mô tả:*
     - Tại Bước 2 (Đặt lại mật khẩu), form chỉ có 1 trường nhập mật khẩu mới, **thiếu hoàn toàn trường Xác nhận mật khẩu** (`confirmPassword`).
     - Khi nhập mật khẩu mới hợp lệ theo quy định (độ dài $\ge 8$, chữ hoa, chữ thường, chữ số, ký tự đặc biệt: `Aaaaaaa1!`, `AAAAAAAAa1!`), SUT vẫn báo lỗi: *"Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."* làm người dùng không thể hoàn tất đặt lại mật khẩu.

### B. Trạng Thái Test Suite / Lỗi Automation:
- **4 PASSED (TC2, TC3, TC4):** Các Negative test cases ở Bước 1 kiểm tra validation email hoạt động đúng nghiệp vụ.
- **Khắc phục lỗi Automation:** Các lỗi locator trùng lặp và logic soft-assertion của AI đã được chỉnh sửa hoàn tất, giúp bộ test script đạt độ ổn định cao trên Chromium, Firefox và Cốc Cốc.

---

## 3. Nội Dung Bug Report (Trích từ `bug-report.md`)

```markdown
# Bug Report

## Summary

| Metric | Value |
| --- | ---: |
| Number of confirmed product bugs | 2 |
| Number of GitHub Issues created | 2 |
| Number of screenshots attached | 2 |

## Bug List

| Bug ID | Feature | Severity | Summary | GitHub Issue | Screenshot | Status |
| --- | --- | --- | --- | --- | --- | --- |
| BUG-001 | FR-03 Quên & Đặt lại MK | High | Không thể đặt lại mật khẩu do SUT validate sai Password Policy và thiếu trường Xác nhận mật khẩu | https://github.com/ttbhanh/eshop-sut/issues/1 | playwright-report/data/bug-001.png | Open |
| BUG-002 | FR-03 Quên & Đặt lại MK | Medium | Hệ thống tạo mã OTP chỉ có 4 chữ số thay vì 6 chữ số theo chuẩn yêu cầu | https://github.com/ttbhanh/eshop-sut/issues/2 | playwright-report/data/bug-002.png | Open |

## Detailed Bug Template

### BUG-001: Không thể đặt lại mật khẩu do SUT validate sai Password Policy và thiếu trường Confirm Password

**Feature:** FR-03 Quên mật khẩu và đặt lại mật khẩu (Pool A)
**Severity:** High
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT: http://localhost:5173/forgot-password | Test spec: tests/poolA-fr03-forgot-password.spec.ts | Test cases: TC5-TC12

**Description:**
Tại Bước 2 của chức năng Quên mật khẩu, giao diện form chỉ hiển thị 1 ô nhập mật khẩu mới và thiếu trường "Xác nhận mật khẩu". Ngoài ra, khi người dùng nhập OTP và mật khẩu mới hợp lệ thỏa mãn tất cả tiêu chí độ dài, chữ hoa, chữ thường, chữ số và ký tự đặc biệt (ví dụ: `Aaaaaaa1!`), hệ thống vẫn báo lỗi: *"Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."* làm người dùng không thể đặt lại mật khẩu.

**Steps to Reproduce:**
1. Truy cập `http://localhost:5173/forgot-password`.
2. Nhập email `test@eshop.com` và nhấn "Yêu cầu OTP".
3. Nhập mã OTP nhận được vào ô OTP.
4. Nhập mật khẩu mới hợp lệ: `Aaaaaaa1!`.
5. Nhấn "Đặt lại mật khẩu".

**Expected Result:** Form có 2 trường MK mới & Xác nhận MK. Nhập MK hợp lệ hệ thống báo thành công.
**Actual Result:** Thiếu trường Xác nhận MK; Báo lỗi "Mật khẩu quá yếu!..." và không cho đặt lại mật khẩu.

---

### BUG-002: Mã OTP được tạo chỉ có 4 chữ số thay vì 6 chữ số

**Feature:** FR-03 Quên mật khẩu và đặt lại mật khẩu (Pool A)
**Severity:** Medium
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT: http://localhost:5173/forgot-password | Test spec: tests/poolA-fr03-forgot-password.spec.ts | Test case: TC1

**Description:**
Khi yêu cầu OTP thành công với email hợp lệ (`test@eshop.com`), hệ thống sinh ra và hiển thị mã OTP dạng 4 chữ số (ví dụ `1234`) thay vì mã 6 chữ số theo độ dài tiêu chuẩn an toàn.

**Steps to Reproduce:**
1. Truy cập `http://localhost:5173/forgot-password`.
2. Nhập email `test@eshop.com`.
3. Nhấn nút "Yêu cầu OTP".
4. Quan sát mã OTP trả về.

**Expected Result:** Mã OTP phải có 6 chữ số.
**Actual Result:** Mã OTP chỉ có 4 chữ số.
```
