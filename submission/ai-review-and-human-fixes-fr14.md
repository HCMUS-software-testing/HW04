# AI Review And Human Fixes Report: Feature FR-14 (Category Management)

- **Spec File:** `tests/poolC-fr14-category-management.spec.ts`
- **Data File:** `tests/data/poolC-fr14-category-management.json`
- **Feature:** FR-14 Quản lý Danh mục (Pool C)
- **Student ID:** 23127185
- **Browsers Executed:** Chromium, Firefox, Cốc Cốc
- **HTML Report Path:** `playwright-report/index.html`

---

## 1. Bảng AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| **Flaky Navigation & Sai Port Giao Diện Admin UI (TC12):** AI dùng `page.goto('/')` (trỏ tới `http://localhost:5173` - Frontend Web khách hàng), nơi không có ô đăng nhập Admin và tab Quản lý Danh mục, gây timeout 30000ms. | Điều hướng chính xác đến `http://localhost:5174` (Frontend Admin URL) và điều chỉnh locators khớp với giao diện Admin Login (`placeholder="Email"`, `placeholder="Password"`, nút `"Login"`). | AI mặc định ứng dụng SUT chỉ chạy trên 1 port `baseURL` (5173) và không nhận diện việc SUT tách thành 2 ứng dụng Web (5173) và Admin UI (5174). |
| **Locator UI bị mismatch ngôn ngữ trên màn hình Login (TC12):** AI dùng các regex Tiếng Việt `/email/i`, `/mật khẩu/i`, `/Đăng nhập/i` trong khi giao diện `frontend-admin` sử dụng Tiếng Anh (`Email`, `Password`, `Login`). | Cập nhật locators chuẩn theo đúng DOM của `frontend-admin`: `getByPlaceholder('Email')`, `getByPlaceholder('Password')`, `getByRole('button', { name: 'Login' })`. | AI tự suy đoán giao diện ứng dụng dùng Tiếng Việt đồng bộ theo prompt mẫu mà không inspect trực tiếp code DOM của `frontend-admin`. |
| **Bỏ qua Phân Quyền API Endpoint (Broken Access Control - RBAC Bypass):** AI giả định backend luôn chặn user thường nên chỉ viết assertion đơn giản trên status code mà không kiểm tra DB state khi test fail. | Giữ nguyên `expectedStatusCode: 403` cho TC7, TC8, TC9 theo đúng Requirement Spec, đồng thời bổ sung assertion kiểm tra DB state để chứng minh SUT thực sự cho phép User thao tác trái phép. | AI không lường trước việc SUT Backend bỏ qua hoàn toàn bước kiểm tra vai trò người dùng (`req.user.role === 'admin'`) trong middleware/controller. |
| **Thiếu Cleanup / Isolation sau các Boundary Cases (TC10 & TC11):** AI tạo danh mục với tên rỗng (TC10) và tên 255 ký tự (TC11) nhưng không xóa dữ liệu rác sau khi test kết thúc, làm bẩn database test. | Bổ sung logic cleanup/delete category rác sau khi assertion hoàn tất để giữ database luôn sạch sẽ cho các lần chạy test tiếp theo. | AI tập trung viết test case độc lập ngắn hạn nhưng bỏ qua việc dọn dẹp dữ liệu rác (data hygiene) ảnh hưởng đến môi trường lâu dài. |
| **Cố tình làm xanh Test Case khi SUT có Bug (Bug Masking):** Trong quá trình sinh script ban đầu, AI có xu hướng sửa `expectedStatusCode` thành `200` để ép test PASSED theo hành vi thực tế của SUT. | Khôi phục đúng `expectedStatusCode: 403` cho TC7, TC8, TC9 và `400` cho TC10 theo Requirement Spec để phát hiện chính xác bug sản phẩm của SUT. | AI có xu hướng điều chỉnh test assertion/data để khớp với hành vi hiện tại của SUT (Self-correcting towards passing state) hơn là bảo vệ tính đúng đắn của thiết kế requirement. |

---

## 2. Phân Loại Kết Quả Pass/Fail (Bug Thực Tế SUT vs Lỗi Automation)

- **Tổng số Test Cases:** 12 TCs (Chạy trên 3 trình duyệt: Chromium, Firefox, Cốc Cốc -> Tổng cộng 36 lượt chạy)
- **Kết quả Execution:** **24 PASSED**, **12 FAILED** (Mỗi browser: **8 PASSED**, **4 FAILED**)

### A. Bugs Thực Tế Của SUT (SUT Product Bugs) - 4 Test Cases Fail per Browser:

1. **BUG-005: Lỗi phân quyền API Quản lý Danh mục (Broken Access Control - RBAC Bypass):**
   - **Test Cases ảnh hưởng:** TC7, TC8, TC9
   - **Severity:** High
   - **Mô tả:** Các endpoint API Category (`POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`) chỉ yêu cầu Token đăng nhập mà không kiểm tra vai trò Admin. Tài khoản người dùng thông thường (`User`) có thể tự do Tạo mới (TC7), Cập nhật (TC8), và Xóa (TC9) danh mục sản phẩm trong hệ thống. SUT trả về `200 OK` thay vì `403 Forbidden`.

2. **BUG-006: Thiếu kiểm soát dữ liệu đầu vào khi tạo danh mục (Missing Input Validation):**
   - **Test Cases ảnh hưởng:** TC10
   - **Severity:** Medium
   - **Mô tả:** Endpoint `POST /api/categories` không kiểm tra độ dài hoặc tính hợp lệ của trường `name`. Khi Admin gửi request tạo danh mục với tên là chuỗi rỗng `""`, SUT vẫn tiếp nhận, lưu vào database và trả về `200 OK` thay vì `400 Bad Request`.

### B. Trạng Thái Test Suite / Lỗi Automation:

- **8 PASSED (TC1, TC2, TC3, TC4, TC5, TC6, TC11, TC12):** Tất cả các Positive cases (Tạo/Xem/Sửa/Xóa với Admin), Unauthenticated cases (TC5, TC6), Boundary max length (TC11) và Web UI Admin test (TC12) đều chạy ổn định và đạt kết quả PASS trên 3 trình duyệt.
- **Khắc phục lỗi Automation:** Lỗi timeout và mismatch locators ở TC12 đã được sửa triệt để bằng việc điều hướng đúng tới `http://localhost:5174` (Frontend Admin UI) và dùng chuẩn accessibility locators.

---

## 3. Nội Dung Bug Report

| Bug ID | Feature | Severity | Summary | GitHub Issue | Screenshot | Status |
| --- | --- | --- | --- | --- | --- | --- |
| BUG-005 | FR-14 Quản lý Danh mục | High | Lỗi phân quyền API: Tài khoản User có thể thực hiện Thêm, Sửa, Xóa danh mục sản phẩm trái phép | https://github.com/ttbhanh/eshop-sut/issues/5 | playwright-report/data/bug-005.png | Open |
| BUG-006 | FR-14 Quản lý Danh mục | Medium | Thiếu validation dữ liệu đầu vào: Cho phép tạo danh mục với tên là chuỗi rỗng | https://github.com/ttbhanh/eshop-sut/issues/6 | playwright-report/data/bug-006.png | Open |

---

## 4. Detailed Bug Template

### BUG-005: Lỗi phân quyền API Quản lý Danh mục (Broken Access Control - RBAC Bypass)

**Feature:** FR-14 Quản lý Danh mục (Pool C)  
**Severity:** High  
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT Backend: http://localhost:3000 | Spec: tests/poolC-fr14-category-management.spec.ts | Test cases: TC7, TC8, TC9  

**Description:**  
Các API endpoint quản lý danh mục (`POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`) không kiểm tra quyền hạn Admin. Khi gửi request kèm theo Bearer Token của tài khoản `User` thông thường (`test@eshop.com`), SUT vẫn thực thi các thao tác Thêm, Sửa, Xóa danh mục và trả về `200 OK` thay vì từ chối truy cập với mã lỗi `403 Forbidden`.

**Steps to Reproduce:**
1. Đăng nhập tài khoản User thông thường: `POST /api/login` với `{ email: "test@eshop.com", password: "Test1234!" }` để lấy token.
2. Gửi request `POST /api/categories` với Header `Authorization: Bearer <user_token>` và Body `{ name: "Danh mục trái phép" }`.
3. Gửi request `PUT /api/categories/1` với Header `Authorization: Bearer <user_token>` và Body `{ name: "Tên mới trái phép" }`.
4. Gửi request `DELETE /api/categories/1` với Header `Authorization: Bearer <user_token>`.

**Expected Result:** SUT trả về `403 Forbidden` cho cả 3 thao tác và không thay đổi dữ liệu trong database.  
**Actual Result:** SUT trả về `200 OK` và thực hiện Thêm/Sửa/Xóa danh mục thành công trong database.

---

### BUG-006: Thiếu validation dữ liệu đầu vào khi tạo danh mục (Empty Category Name Accepted)

**Feature:** FR-14 Quản lý Danh mục (Pool C)  
**Severity:** Medium  
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT Backend: http://localhost:3000 | Spec: tests/poolC-fr14-category-management.spec.ts | Test case: TC10  

**Description:**  
Endpoint `POST /api/categories` không kiểm tra giá trị rỗng của trường `name`. Khi gửi request tạo danh mục với `name: ""`, hệ thống vẫn chấp nhận và lưu một bản ghi danh mục có tên rỗng vào cơ sở dữ liệu.

**Steps to Reproduce:**
1. Đăng nhập tài khoản Admin: `POST /api/login` với `{ email: "admin@eshop.com", password: "Admin123!" }`.
2. Gửi request `POST /api/categories` với Header `Authorization: Bearer <admin_token>` và Body `{ name: "" }`.

**Expected Result:** SUT trả về `400 Bad Request` kèm thông báo lỗi tên danh mục không được để trống.  
**Actual Result:** SUT trả về `200 OK` và tạo bản ghi danh mục với tên rỗng trong database.
