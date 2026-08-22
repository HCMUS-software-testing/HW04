# Pool A - FR-03 Quên mật khẩu và đặt lại mật khẩu, gồm hai bước

## 1. Thông Tin Feature

- **Pool:** A
- **Feature ID:** FR-03
- **Feature name:** Quên mật khẩu và đặt lại mật khẩu, gồm hai bước
- **SUT:** EShop
- **Repository SUT:** <https://github.com/ttbhanh/eshop-sut>
- **Automation tool:** `Playwright`
- **Language:** `TypeScript`
- **Spec file:** `tests/poolA-fr03-forgot-password.spec.ts`
- **Data file:** `tests/data/poolA-fr03-forgot-password.json`
- **HTML report:** `playwright-report`
- **Run by:** `23127185`
- **Run timestamp:** `2026-08-22T16:11:30.133Z`

## 2. Mục Tiêu Kiểm Thử

Kiểm thử luồng FR-03 gồm hai bước:

1. Người dùng nhập email để yêu cầu OTP đặt lại mật khẩu.
2. Người dùng nhập OTP và mật khẩu mới để đặt lại mật khẩu.

Các test case tập trung vào:

- Email hợp lệ, email sai định dạng, email rỗng, email chưa đăng ký.
- OTP đúng.
- Mật khẩu mới hợp lệ theo các lớp biên về độ dài, chữ hoa, chữ thường, chữ số và ký tự đặc biệt.
- Kiểm tra lỗi UI/logic thực tế nếu hệ thống không có trường xác nhận mật khẩu hoặc validate sai password policy.

## 3. Preconditions

- SUT EShop đang chạy tại: `localhost:5173`.
- Có tài khoản đã đăng ký với email: `test@eshop.com`.
- Có cách lấy hoặc quan sát OTP hợp lệ:
  - `<email inbox / database / log / test mode / admin panel>`.
- Browser cần chạy:
  - Chromium
  - Firefox
  - Cốc Cốc (Chromium-based)
- HTML report phải hiển thị:
  - `Run by: 23127185`
  - ISO timestamp: `2026-08-18T13:48:29.000Z`

## 4. Test Case Table

### 4.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | 12 | 4 | 8 | `playwright-report/index.html` |
| Firefox | 12 | 4 | 8 | `playwright-report/index.html` |
| Cốc Cốc | 12 | 4 | 8 | `playwright-report/index.html` |

| Test Case ID | Phân loại | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC1 | Positive | Kiểm tra yêu cầu OTP thành công với email hợp lệ (E1, E4) | Email: `test@eshop.com` (đã đăng ký) | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống gửi OTP (6 chữ số) thành công và chuyển sang giao diện Bước 2. | Hệ thống gửi OTP thành công nhưng mã OTP chỉ có 4 số. Chuyển sang giao diện Bước 2. | FAIL |
| TC2 | Negative | Kiểm tra lỗi định dạng email không hợp lệ (E2) | Email: `user_validgmail.com` | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi user không tồn tại. | Hệ thống báo lỗi user không tồn tại. | PASS |
| TC3 | Negative | Kiểm tra lỗi bỏ trống email (E3) | Email: *(Để trống)* | 1. Để trống email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi không được để trống trường email. | Hệ thống báo lỗi không được để trống trường email. | PASS |
| TC4 | Negative | Kiểm tra lỗi email chưa được đăng ký (E5) | Email: `unknown@gmail.com` (chưa đăng ký) | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống. | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống. | PASS |
| TC5 | Coc Coc Case | Kiểm tra đặt lại mật khẩu thành công với độ dài tối thiểu 8 ký tự (B1) | OTP: Đúng<br>MK mới: `Aaaaaaa1!`<br>Xác nhận MK: `Aaaaaaa1!` | 1. Nhập OTP.<br>2. Nhập MK mới và Xác nhận MK.<br>3. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC6 | Positive | Kiểm tra đặt lại mật khẩu thành công với độ dài 9 ký tự (B3) | OTP: Đúng<br>MK mới: `Aaaaaaaa1!`<br>Xác nhận MK: `Aaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công và hiển thị thông báo. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC7 | Positive | Kiểm tra đặt lại mật khẩu thành công với 1 chữ hoa (B4) | OTP: Đúng<br>MK mới: `Aaaaaaaaa1!`<br>Xác nhận MK: `Aaaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC8 | Positive | Kiểm tra đặt lại mật khẩu thành công với 2 chữ hoa (B6) | OTP: Đúng<br>MK mới: `AAaaaaaaa1!`<br>Xác nhận MK: `AAaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC9 | Positive | Kiểm tra đặt lại mật khẩu thành công với 1 chữ thường (B7) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC10 | Positive | Kiểm tra đặt lại mật khẩu thành công với 2 chữ thường (B9) | OTP: Đúng<br>MK mới: `AAAAAAAAaa1!`<br>Xác nhận MK: `AAAAAAAAaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC11 | Positive | Kiểm tra đặt lại mật khẩu thành công với 1 chữ số (B10) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC12 | Positive | Kiểm tra đặt lại mật khẩu thành công với 2 chữ số (B12) | OTP: Đúng<br>MK mới: `AAAAAAAAa12!`<br>Xác nhận MK: `AAAAAAAAa12!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
