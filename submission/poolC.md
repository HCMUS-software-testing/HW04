# Pool C - FR-14 Quản lý Danh mục

## 1. Thông Tin Feature

- **Pool:** C
- **Feature ID:** FR-14
- **Feature name:** Quản lý Danh mục (Category Management CRUD)
- **SUT:** EShop
- **Repository SUT:** <https://github.com/ttbhanh/eshop-sut>
- **Automation tool:** `Playwright`
- **Language:** `TypeScript`
- **Spec file:** `tests/poolC-fr14-category-management.spec.ts`
- **Data file:** `tests/data/poolC-fr14-category-management.json`
- **HTML report:** `playwright-report`
- **Run by:** `23127185`
- **Run timestamp:** `2026-08-22T01:43:00.000Z`

## 2. Mục Tiêu Kiểm Thử

Kiểm thử toàn bộ các thao tác CRUD danh mục sản phẩm (FR-14) bao gồm:

1. Thêm danh mục mới thành công với quyền Admin (API & Web UI).
2. Lấy danh sách danh mục (public API).
3. Cập nhật tên danh mục hiện có với quyền Admin.
4. Xóa danh mục với quyền Admin.
5. Kiểm tra phân quyền RBAC: Đảm bảo người dùng thông thường (`User`) hoặc yêu cầu chưa xác thực không thể Thêm / Sửa / Xóa danh mục.
6. Kiểm tra các trường hợp biên và kiểm soát dữ liệu: Tạo danh mục tên rỗng, tên có độ dài cực đại (255 ký tự).

## 3. Preconditions

- SUT EShop đang chạy tại: `http://localhost:5173` (Frontend Admin / User) và Backend `http://localhost:3000`.
- Tài khoản Admin: `admin@eshop.com` / `Admin123!`.
- Tài khoản User: `test@eshop.com` / `Test1234!`.
- Browser cần chạy:
  - Chromium
  - Firefox
  - Cốc Cốc (Chromium-based)
- HTML report hiển thị:
  - `Run by: 23127185`
  - ISO timestamp: `2026-08-22T01:43:00.000Z`

## 4. Test Case Table

### 4.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | 12 | 8 | 4 | `playwright-report/index.html` |
| Firefox | 12 | 8 | 4 | `playwright-report/index.html` |
| Cốc Cốc | 12 | 8 | 4 | `playwright-report/index.html` |

| Test Case ID | Phân loại | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC1 | Positive | Admin tạo danh mục mới hợp lệ | Role: `Admin`<br>Name: `Thiết bị số test TC1` | 1. Đăng nhập Admin<br>2. POST `/api/categories` | 200 OK, Danh mục được tạo thành công | 200 OK, danh mục tạo thành công | PASS |
| TC2 | Positive | Xem danh sách danh mục public | Role: `Guest`<br>Name: *(Rỗng)* | 1. GET `/api/categories` | 200 OK, Trả về danh sách mảng danh mục | 200 OK, trả về mảng danh mục | PASS |
| TC3 | Positive | Admin cập nhật tên danh mục | Role: `Admin`<br>Name: `Thiết bị số Cao cấp Updated TC3` | 1. Đăng nhập Admin<br>2. PUT `/api/categories/{id}` | 200 OK, Danh mục được cập nhật tên | 200 OK, tên danh mục được cập nhật | PASS |
| TC4 | Positive | Admin xóa danh mục thành công | Role: `Admin`<br>Name: `Danh mục sắp xóa TC4` | 1. Đăng nhập Admin<br>2. DELETE `/api/categories/{id}` | 200 OK, Danh mục bị xóa khỏi hệ thống | 200 OK, danh mục đã bị xóa | PASS |
| TC5 | Negative | Tạo danh mục khi không có Token | Header: Không có Auth Token | 1. POST `/api/categories` | 401 Unauthorized | 401 Unauthorized | PASS |
| TC6 | Negative | Tạo danh mục với Token không hợp lệ | Header: `Bearer invalid_token` | 1. POST `/api/categories` | 403 Forbidden | 403 Forbidden | PASS |
| TC7 | Negative | User không có quyền tạo danh mục | Role: `User` (User token) | 1. Đăng nhập User<br>2. POST `/api/categories` | 403 Forbidden | 200 OK (SUT thiếu kiểm tra RBAC) | FAIL |
| TC8 | Negative | User không có quyền cập nhật danh mục | Role: `User` (User token) | 1. Đăng nhập User<br>2. PUT `/api/categories/{id}` | 403 Forbidden | 200 OK (SUT thiếu kiểm tra RBAC) | FAIL |
| TC9 | Negative | User không có quyền xóa danh mục | Role: `User` (User token) | 1. Đăng nhập User<br>2. DELETE `/api/categories/{id}` | 403 Forbidden | 200 OK (SUT thiếu kiểm tra RBAC) | FAIL |
| TC10 | Boundary | Admin tạo danh mục với tên rỗng | Role: `Admin`<br>Name: `""` | 1. Đăng nhập Admin<br>2. POST `/api/categories` với name rỗng | 400 Bad Request (Lỗi tên rỗng) | 200 OK (SUT chấp nhận name rỗng) | FAIL |
| TC11 | Boundary | Admin tạo danh mục tên dài 255 ký tự | Role: `Admin`<br>Name: 255 chars | 1. Đăng nhập Admin<br>2. POST `/api/categories` với name 255 ký tự | 200 OK, Tạo danh mục thành công | 200 OK, danh mục 255 ký tự tạo thành công | PASS |
| TC12 | Coc Coc Case | Admin thêm danh mục trên Admin UI | Role: `Admin`<br>UI action | 1. Admin login UI<br>2. Chọn tab Danh mục<br>3. Nhập tên và click Thêm mới | Tên danh mục hiển thị trong bảng Admin UI | Tên danh mục mới xuất hiện trên bảng UI | PASS |
