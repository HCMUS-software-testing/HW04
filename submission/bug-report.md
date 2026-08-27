# Bug Report

## Summary

| Metric | Value |
| --- | ---: |
| Number of confirmed product bugs | 6 |
| Number of GitHub Issues created | 6 |
| Number of screenshots attached | 6 |

## Bug List

| Bug ID | Feature | Severity | Summary | GitHub Issue | Screenshot | Status |
| --- | --- | --- | --- | --- | --- | --- |
| BUG-001 | FR-03 Quên & Đặt lại MK | High | Không thể đặt lại mật khẩu do SUT validate sai Password Policy và thiếu trường Xác nhận mật khẩu | https://github.com/HCMUS-software-testing/HW04/issues/5 | playwright-report/data/bug-001.png | Open |
| BUG-002 | FR-03 Quên & Đặt lại MK | Medium | Hệ thống tạo mã OTP chỉ có 4 chữ số thay vì 6 chữ số theo chuẩn yêu cầu | https://github.com/HCMUS-software-testing/HW04/issues/6 | playwright-report/data/bug-002.png | Open |
| BUG-003 | FR-10 Trạng thái Đơn hàng | High | Lỗi phân quyền API: Tài khoản User có thể trực tiếp gọi API Admin để thay đổi trạng thái đơn hàng | https://github.com/HCMUS-software-testing/HW04/issues/7 | playwright-report/data/bug-003.png | Open |
| BUG-004 | FR-10 Trạng thái Đơn hàng | Medium | Cho phép User hủy đơn hàng khi đang trong quá trình giao hàng (shipping) | https://github.com/HCMUS-software-testing/HW04/issues/8 | playwright-report/data/bug-004.png | Open |
| BUG-005 | FR-14 Quản lý Danh mục | High | Lỗi phân quyền API: Tài khoản User có thể thực hiện Thêm, Sửa, Xóa danh mục sản phẩm trái phép | https://github.com/HCMUS-software-testing/HW04/issues/9 | playwright-report/data/bug-005.png | Open |
| BUG-006 | FR-14 Quản lý Danh mục | Medium | Thiếu validation dữ liệu đầu vào: Cho phép tạo danh mục với tên là chuỗi rỗng | https://github.com/HCMUS-software-testing/HW04/issues/10 | playwright-report/data/bug-006.png | Open |

## Detailed Bug Template

### BUG-001: Không thể đặt lại mật khẩu do SUT validate sai Password Policy và thiếu trường Confirm Password

**Feature:** FR-03 Quên mật khẩu và đặt lại mật khẩu (Pool A)  
**Severity:** High  
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT URL: http://localhost:5173/forgot-password | Test script: tests/poolA-fr03-forgot-password.spec.ts | Test cases: TC5-TC12  

**Description:**  
Tại Bước 2 của chức năng Quên mật khẩu, giao diện form chỉ hiển thị 1 ô nhập mật khẩu mới và thiếu trường "Xác nhận mật khẩu". Ngoài ra, khi người dùng nhập OTP và mật khẩu mới hợp lệ thỏa mãn tất cả tiêu chí độ dài, chữ hoa, chữ thường, chữ số và ký tự đặc biệt (ví dụ: `Aaaaaaa1!`), hệ thống vẫn báo lỗi: *"Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT."* làm người dùng không thể đặt lại mật khẩu.

**Steps to Reproduce:**  
1. Truy cập `http://localhost:5173/forgot-password`.  
2. Nhập email `test@eshop.com` và nhấn "Yêu cầu OTP".  
3. Nhập mã OTP nhận được vào ô OTP.  
4. Nhập mật khẩu mới hợp lệ: `Aaaaaaa1!`.  
5. Nhấn "Đặt lại mật khẩu".  

**Expected Result:** Form Đặt lại mật khẩu có 2 trường (Mật khẩu mới & Xác nhận mật khẩu). Khi nhập thông tin hợp lệ, hệ thống chấp nhận mật khẩu và báo đặt lại mật khẩu thành công.  
**Actual Result:** Thiếu trường Xác nhận mật khẩu; Hệ thống hiển thị thông báo lỗi "Mật khẩu quá yếu!..." và không cho phép đặt lại mật khẩu.  

---

### BUG-002: Mã OTP được tạo chỉ có 4 chữ số thay vì 6 chữ số

**Feature:** FR-03 Quên mật khẩu và đặt lại mật khẩu (Pool A)  
**Severity:** Medium  
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT URL: http://localhost:5173/forgot-password | Test script: tests/poolA-fr03-forgot-password.spec.ts | Test case: TC1  

**Description:**  
Khi yêu cầu OTP thành công với email hợp lệ (`test@eshop.com`), hệ thống sinh ra và hiển thị mã OTP dạng 4 chữ số (ví dụ `1234`) thay vì mã 6 chữ số theo độ dài tiêu chuẩn an toàn của chức năng.

**Steps to Reproduce:**  
1. Truy cập `http://localhost:5173/forgot-password`.  
2. Nhập email hợp lệ `test@eshop.com`.  
3. Nhấn nút "Yêu cầu OTP".  
4. Quan sát mã OTP trả về trong thông báo.  

**Expected Result:** Mã OTP tạo ra phải bao gồm 6 chữ số.  
**Actual Result:** Mã OTP tạo ra chỉ có 4 chữ số.  

---

### BUG-003: Lỗi phân quyền API: Tài khoản User có thể trực tiếp gọi API Admin để thay đổi trạng thái đơn hàng

**Feature:** FR-10 Trạng thái Đơn hàng (Pool B)  
**Severity:** High  
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT Backend: http://localhost:3000 | Test script: tests/poolB-fr10-order-status.spec.ts | Test cases: TC2, TC4, TC6  

**Description:**  
Endpoint API Admin `PUT /api/admin/orders/:id/status` không kiểm tra vai trò (Role) của người dùng từ Token. Tài khoản người dùng thường (`User`) có thể gửi request đổi trạng thái đơn hàng từ `pending` -> `confirmed` (TC2), `confirmed` -> `shipping` (TC4), `shipping` -> `delivered` (TC6). SUT trả về `200 OK` thay vì `403 Forbidden`.

**Steps to Reproduce:**  
1. Đăng nhập User thông thường để có token.  
2. Gọi request `PUT http://localhost:3000/api/admin/orders/{id}/status` với Header `Authorization: Bearer <user_token>` và Body `{ status: "confirmed" }`.  

**Expected Result:** SUT trả về `403 Forbidden`.  
**Actual Result:** SUT trả về `200 OK` và đổi trạng thái đơn hàng thành công.  

---

### BUG-004: Cho phép User hủy đơn hàng khi đang trong quá trình giao hàng (shipping)

**Feature:** FR-10 Trạng thái Đơn hàng (Pool B)  
**Severity:** Medium  
**Environment:** Linux | Chromium, Firefox, Cốc Cốc | SUT Backend: http://localhost:3000 | Test script: tests/poolB-fr10-order-status.spec.ts | Test case: TC10  

**Description:**  
Endpoint `PUT /api/orders/:id/cancel` cho phép tài khoản User hủy đơn hàng ngay cả khi đơn hàng đang ở trạng thái `shipping` (Đang giao hàng). SUT trả về `200 OK` thay vì `400 Bad Request` với thông báo không được phép hủy khi đang giao.

**Steps to Reproduce:**  
1. Tạo đơn hàng ở trạng thái `shipping`.  
2. Đăng nhập User chủ đơn hàng.  
3. Gọi request `PUT http://localhost:3000/api/orders/{id}/cancel` với Token User.  

**Expected Result:** SUT trả về `400 Bad Request` không cho phép hủy đơn hàng đang giao.  
**Actual Result:** SUT trả về `200 OK` và chuyển đơn hàng về trạng thái `canceled`.  

---

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
2. Gửi request `POST /api/categories` với Header `Authorization: Bearer <admin_token>` and Body `{ name: "" }`.  

**Expected Result:** SUT trả về `400 Bad Request` kèm thông báo lỗi tên danh mục không được để trống.  
**Actual Result:** SUT trả về `200 OK` và tạo bản ghi danh mục với tên rỗng trong database.  
