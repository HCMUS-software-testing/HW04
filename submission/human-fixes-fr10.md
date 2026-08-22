# AI Review And Human Fixes Report: Feature FR-10 (Order Status)

- **Spec File:** `tests/poolB-fr10-order-status.spec.ts`
- **Data File:** `tests/data/poolB-fr10-order-status.json`
- **Feature:** FR-10 Trạng thái Đơn hàng (Pool B)
- **Student ID:** 23127185
- **Browsers Executed:** Chromium, Firefox, Cốc Cốc
- **HTML Report Path:** `playwright-report/index.html`

---

## 1. Bảng AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| **Thiếu Setup Precondition động:** AI giả định order ID cố định (`1`) đã có sẵn trong database với trạng thái mong muốn (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`). | Viết helper function `setupOrderWithStatus(request, targetStatus)` tự động checkout tạo order mới qua API và đẩy trạng thái trung gian tới `targetStatus` trước mỗi test case. | AI giả định môi trường test có sẵn seed data tĩnh và không tính đến tính độc lập (isolation) giữa các test case khi chạy song song. |
| **Bỏ qua phân quyền API Endpoint (Broken Access Control):** AI dùng UI locator chung mà không phân định rõ endpoint admin `/api/admin/orders/:id/status` và endpoint user `/api/orders/:id/cancel`. | Tách biệt 2 nhóm endpoint: gọi đúng endpoint Admin vs User với token tương ứng, assert HTTP Status Code `403 Forbidden` đối với User cố truy cập endpoint Admin. | AI thiếu thông tin chi tiết về sơ đồ phân quyền RBAC (Role-Based Access Control) của backend SUT. |
| **Assertion một chiều trên UI (Bỏ qua State Transition DB):** AI chỉ kiểm tra nút bấm trên UI hoặc điều hướng URL mà không kiểm tra dữ liệu lưu trữ thực tế trong database. | Áp dụng assertion pattern đa chiều: Kiểm tra HTTP Response Status Code (`200`/`403`/`400`) và gọi API GET `/api/orders/:id` để assert trạng thái `status` trong DB. | AI ưu tiên các assertion giao diện trực quan (Frontend) thay vì kiểm tra tính nhất quán dữ liệu lưu trữ ở Backend. |
| **Flaky Session State khi kết hợp API và Page UI:** AI chuyển sang kiểm tra UI profile bằng `page.goto('/profile')` mà không thiết lập session token cho trình duyệt. | Inject Bearer Token vào `localStorage` bằng `page.evaluate()` trước khi điều hướng tới `/profile`, sử dụng Playwright locators chuẩn accessibility `getByRole('button', { name: /hủy/i })`. | AI không nhận diện được cơ chế Client-side Authentication dựa trên `localStorage.getItem('token')` của ứng dụng Single Page Application (SPA). |
| **Cố tình làm xanh test case khi SUT có Bug (Bug Masking):** AI sửa `expectedStatusCode` trong JSON data thành `200` để ép test case PASS khi SUT backend không chặn quyền User. | Khôi phục `expectedStatusCode: 403` (cho TC2, TC4, TC6) và `expectedStatusCode: 400` (cho TC10) theo đúng Requirement Spec để phát hiện chính xác bug bảo mật và logic của SUT. | AI có xu hướng điều chỉnh test assertion/data để khớp với hành vi thực tế của SUT (Self-correcting towards passing test) thay vì tuân thủ đúng requirement spec. |

---

## 2. Phân Loại Kết Quả Pass/Fail (Bug Thực Tế SUT vs Lỗi Automation)

- **Tổng số Test Cases:** 12 TCs (Chạy trên 3 trình duyệt: Chromium, Firefox, Cốc Cốc -> Tổng cộng 36 lượt chạy)
- **Kết quả Execution:** **24 PASSED**, **12 FAILED** (Mỗi browser: **8 PASSED**, **4 FAILED**)

### A. Bugs Thực Tế Của SUT (SUT Product Bugs) - 4 Test Cases Fail per Browser:

1. **BUG-003: Phân quyền API không chặt chẽ (Broken Access Control - RBAC Bypass):**
   - **Test Cases ảnh hưởng:** TC2, TC4, TC6
   - **Severity:** High
   - **Mô tả:** Endpoint API Admin `PUT /api/admin/orders/:id/status` không kiểm tra vai trò (Role) của người dùng từ Token. Tài khoản người dùng thường (`User`) có thể gửi request đổi trạng thái đơn hàng từ `pending` $\rightarrow$ `confirmed` (TC2), `confirmed` $\rightarrow$ `shipping` (TC4), `shipping` $\rightarrow$ `delivered` (TC6). SUT trả về `200 OK` thay vì `403 Forbidden`.

2. **BUG-004: Sai quy tắc chuyển đổi trạng thái đơn hàng (Invalid State Transition):**
   - **Test Cases ảnh hưởng:** TC10
   - **Severity:** Medium
   - **Mô tả:** Endpoint `PUT /api/orders/:id/cancel` cho phép tài khoản User hủy đơn hàng ngay cả khi đơn hàng đang ở trạng thái `shipping` (Đang giao hàng). SUT trả về `200 OK` thay vì `400 Bad Request` với thông báo không được phép hủy khi đang giao.

### B. Trạng Thái Test Suite / Lỗi Automation:

- **8 PASSED (TC1, TC3, TC5, TC7, TC8, TC9, TC11, TC12):** Tất cả các Positive test cases và Boundary test cases hợp lệ đối với Admin/User đều chuyển trạng thái thành công và kiểm tra đúng quy định.
- **Khắc phục lỗi Automation:** Các lỗi thiếu precondition setup và flaky session token đã được sửa triệt để bằng fixture `setupOrderWithStatus()`, giúp bộ test suite chạy ổn định và nhất quán trên 3 trình duyệt (Chromium, Firefox, Cốc Cốc).

---

## 3. Nội Dung Bug Report

| Bug ID | Feature | Severity | Summary | GitHub Issue | Screenshot | Status |
| --- | --- | --- | --- | --- | --- | --- |
| BUG-003 | FR-10 Trạng thái Đơn hàng | High | Lỗi phân quyền API: Tài khoản User có thể trực tiếp gọi API Admin để thay đổi trạng thái đơn hàng | https://github.com/ttbhanh/eshop-sut/issues/3 | playwright-report/data/bug-003.png | Open |
| BUG-004 | FR-10 Trạng thái Đơn hàng | Medium | Cho phép User hủy đơn hàng khi đang trong quá trình giao hàng (shipping) | https://github.com/ttbhanh/eshop-sut/issues/4 | playwright-report/data/bug-004.png | Open |
