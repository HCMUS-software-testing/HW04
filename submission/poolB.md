# Pool B - FR-10 Trạng thái Đơn hàng

## 1. Thông Tin Feature

- **Pool:** B
- **Feature ID:** FR-10
- **Feature name:** Trạng thái Đơn hàng
- **SUT:** EShop
- **Repository SUT:** <https://github.com/ttbhanh/eshop-sut>
- **Automation tool:** `Playwright`
- **Language:** `TypeScript`
- **Spec file:** `tests/poolB-fr10-order-status.spec.ts`
- **Data file:** `tests/data/poolB-fr10-order-status.json`
- **HTML report:** `playwright-report`
- **Run by:** `23127185`
- **Run timestamp:** `<ISO timestamp>`

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
| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
|---|---|---|---|---|---|---|
| TC1 | Kiểm tra Admin xác nhận đơn hàng từ `pending` sang `confirmed` | Vai trò: `Admin`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Xác nhận | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `pending`<br>3. Thực hiện thao tác Xác nhận | Đơn hàng chuyển sang `confirmed` thành công | Đơn hàng chuyển sang Đã xác nhận | PASS |
| TC2 | Kiểm tra User không có quyền xác nhận đơn hàng `pending` | Vai trò: `User`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Xác nhận | 1. Lấy Token (User): Chọn method POST, URL: http://localhost:3000/api/login, Tab Body (raw > JSON): {"email": "user@...","password": "..."}. Copy chuỗi token. 2. Thực hiện Xác nhận: Tạo request mới PUT http://localhost:3000/api/admin/orders/{id}/status (id của đơn hàng pending). Tab Auth > Bearer Token: dán Token của User. Tab Body (raw > JSON): {"status": "confirmed"}. Bấm Send. | Báo lỗi không có quyền thay đổi trạng thái | Chuyển đổi thành công| FAIL |
| TC3 | Kiểm tra Admin giao hàng từ `confirmed` sang `shipping` | Vai trò: `Admin`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Giao hàng | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `confirmed`<br>3. Thực hiện thao tác Giao hàng | Đơn hàng chuyển sang `shipping` thành công | Đơn hàng chuyển sang giao hàng thành công | PASS |
| TC4 | Kiểm tra User không có quyền giao hàng đối với đơn `confirmed` | Vai trò: `User`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Giao hàng | 1. Lấy Token (User): Làm tương tự bước 1 của TC2. 2. Thực hiện Hoàn tất: Tạo request mới PUT http://localhost:3000/api/admin/orders/{id}/status (id của đơn hàng shipping). Tab Auth > Bearer Token: dán Token của User. Tab Body (raw > JSON): {"status": "shipping"}. Bấm Send. | Báo lỗi không có quyền thay đổi trạng thái | Chuyển đổi thành công| FAIL |
| TC5 | Kiểm tra Admin hoàn tất đơn hàng từ `shipping` sang `delivered` | Vai trò: `Admin`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hoàn tất | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hoàn tất | Đơn hàng chuyển sang `delivered` thành công | Đơn hàng chuyển sang Đã giao | PASS |
| TC6 | Kiểm tra User không có quyền hoàn tất đơn hàng `shipping` | Vai trò: `User`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hoàn tất |1. Lấy Token (User): Làm tương tự bước 1 của TC2. 2. Thực hiện Hoàn tất: Tạo request mới PUT http://localhost:3000/api/admin/orders/{id}/status (id của đơn hàng shipping). Tab Auth > Bearer Token: dán Token của User. Tab Body (raw > JSON): {"status": "delivered"}. Bấm Send. | Báo lỗi không có quyền thay đổi trạng thái | Chuyển đổi thành công | FAIL |
| TC7 | Kiểm tra User hủy đơn hàng `pending` | Vai trò: `User`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `pending`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | Đơn hàng chuyển sang đã hủy thành công | PASS |
| TC8 | Kiểm tra Admin hủy đơn hàng `confirmed` | Vai trò: `Admin`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Hủy | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `confirmed`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | Đơn hàng chuyển sang đã hủy thành công | PASS |
| TC9 | Kiểm tra Admin hủy đơn hàng `shipping` | Vai trò: `Admin`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hủy | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | Không có nút hủy | FAIL |
| TC10 | Kiểm tra User không có quyền hủy đơn hàng `shipping` | Vai trò: `User`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hủy | Báo lỗi User không được phép hủy khi đang giao hàng | Đơn hàng chuyển sang đã hủy thành công | FAIL |
| TC11 | Kiểm tra không thể hủy đơn hàng từ trạng thái kết thúc | Vai trò: `User`<br>Trạng thái hiện tại: `delivered`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `delivered`<br>3. Thực hiện thao tác Hủy | Báo lỗi không thể thay đổi từ trạng thái kết thúc | Không có nút báo hủy | PASS |
| TC12 | Kiểm tra không thể chuyển trạng thái đơn hàng đã hủy | Vai trò: `Admin`<br>Trạng thái hiện tại: `canceled`<br>Thao tác: Xác nhận | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `canceled`<br>3. Thực hiện thao tác Xác nhận | Báo lỗi không thể thay đổi từ trạng thái kết thúc | Không có nút chuyển đổi | PASS |
