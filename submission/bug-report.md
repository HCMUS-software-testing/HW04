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

**Environment:**

- OS: Linux
- Browser: Chromium, Firefox, Cốc Cốc
- SUT URL: http://localhost:5173/forgot-password
- Test script: tests/poolA-fr03-forgot-password.spec.ts
- Test case: TC5, TC6, TC7, TC8, TC9, TC10, TC11, TC12

**Description:**

Tại Bước 2 của chức năng Quên mật khẩu, giao diện form chỉ hiển thị 1 ô nhập mật khẩu mới và thiếu trường "Xác nhận mật khẩu". Ngoài ra, khi người dùng nhập OTP và mật khẩu mới hợp lệ thỏa mãn tất cả tiêu chí độ dài, chữ hoa, chữ thường, chữ số và ký tự đặc biệt (ví dụ: `Aaaaaaa1!`), hệ thống vẫn báo lỗi: *"Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."* làm người dùng không thể đặt lại mật khẩu.

**Steps to Reproduce:**

1. Truy cập `http://localhost:5173/forgot-password`.
2. Nhập email `test@eshop.com` và nhấn "Yêu cầu OTP".
3. Nhập mã OTP nhận được vào ô OTP.
4. Nhập mật khẩu mới hợp lệ: `Aaaaaaa1!`.
5. Nhấn "Đặt lại mật khẩu".

**Expected Result:**

Form Đặt lại mật khẩu phải có 2 trường (Mật khẩu mới & Xác nhận mật khẩu). Khi nhập thông tin hợp lệ, hệ thống chấp nhận mật khẩu và báo đặt lại mật khẩu thành công.

**Actual Result:**

Thiếu trường Xác nhận mật khẩu; Hệ thống hiển thị thông báo lỗi "Mật khẩu quá yếu!..." và không cho phép đặt lại mật khẩu.

**Evidence:**

- Screenshot: `playwright-report/data/bug-001.png`
- Playwright report: `playwright-report/index.html`
- Trace/video if available: `test-results/`
- GitHub Issue: https://github.com/ttbhanh/eshop-sut/issues/1

---

### BUG-002: Mã OTP được tạo chỉ có 4 chữ số thay vì 6 chữ số

**Feature:** FR-03 Quên mật khẩu và đặt lại mật khẩu (Pool A)

**Severity:** Medium

**Environment:**

- OS: Linux
- Browser: Chromium, Firefox, Cốc Cốc
- SUT URL: http://localhost:5173/forgot-password
- Test script: tests/poolA-fr03-forgot-password.spec.ts
- Test case: TC1

**Description:**

Khi yêu cầu OTP thành công với email hợp lệ (`test@eshop.com`), hệ thống sinh ra và hiển thị mã OTP dạng 4 chữ số (ví dụ `1234`) thay vì mã 6 chữ số theo độ dài tiêu chuẩn an toàn của chức năng.

**Steps to Reproduce:**

1. Truy cập `http://localhost:5173/forgot-password`.
2. Nhập email hợp lệ `test@eshop.com`.
3. Nhấn nút "Yêu cầu OTP".
4. Quan sát mã OTP trả về trong thông báo.

**Expected Result:**

Mã OTP tạo ra phải bao gồm 6 chữ số.

**Actual Result:**

Mã OTP tạo ra chỉ có 4 chữ số.

**Evidence:**

- Screenshot: `playwright-report/data/bug-002.png`
- Playwright report: `playwright-report/index.html`
- Trace/video if available: `test-results/`
- GitHub Issue: https://github.com/ttbhanh/eshop-sut/issues/2

