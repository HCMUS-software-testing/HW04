# Kế hoạch thực hiện HW04 Automation Testing

## Tóm tắt

Làm bài theo hướng tối ưu điểm: dùng Playwright, tự động hóa 3 web features đúng từ HW02 là **FR-02 Đăng nhập & khóa tài khoản**, **FR-09 Mã giảm giá**, **FR-17 Quản lý mã giảm giá admin**. Không dùng FR-07 vì HW04 loại Pool D/mobile.

Thông tin dùng trong report:
- Họ tên: Lê Mai Hoài Bảo
- MSSV / StudentID: `23127326`
- SUT: `eshop-sut`
- Backend: `http://localhost:3000`
- Web: `http://localhost:5173`
- Admin: `http://localhost:5174`

## Các bước thực hiện

1. **Chuẩn hóa cấu trúc bài nộp**
   - Tạo bộ test Playwright ở root repo:
     - `playwright.config.js`
     - `tests/fr02-login-lockout.spec.js`
     - `tests/fr09-coupon-checkout.spec.js`
     - `tests/fr17-admin-coupon-crud.spec.js`
     - `tests/data/fr02-login-lockout.json`
     - `tests/data/fr09-coupon-checkout.json`
     - `tests/data/fr17-admin-coupon-crud.json`
     - `tests/helpers/api.js`
     - `tests/helpers/auth.js`
   - Tạo output:
     - `playwright-report/`
     - `test-results/`
     - `submit/main-report.md`
     - `submit/test-summary.md`
     - `submit/bug-report.md`
     - `submit/ai-critique.md`
     - `submit/ai-audit-report.md`
     - `submit/git-commit-log.txt`

2. **Cài và cấu hình Playwright**
   - Cài `@playwright/test`.
   - Config chạy 3 browser: `chromium`, `firefox`, `webkit`.
   - Dùng Playwright HTML reporter.
   - Gắn metadata/report title có chuỗi:
     - `Run by: 23127326`
     - ISO timestamp thật tại thời điểm chạy.
   - Web server không dùng `eshop-sut/run_servers.sh` vì file này hardcode path máy khác. Chạy thủ công:
     - Backend: `cd eshop-sut/backend && node server.js`
     - Web: `cd eshop-sut/frontend-web && npm run dev -- --host 127.0.0.1 --port 5173`
     - Admin: `cd eshop-sut/frontend-admin && npm run dev -- --host 127.0.0.1 --port 5174`

3. **Thiết kế data-driven test data**
   - Mỗi feature có ít nhất 12 test cases trong file JSON riêng.
   - Không hardcode inline array/object test case trong `.spec.js`.
   - Mỗi test data record có các trường chung:
     - `id`
     - `title`
     - `type`: `positive`, `negative`, hoặc `edge`
     - `mode`: `ui`, `api`, hoặc `hybrid`
     - `precondition`
     - `input`
     - `expected`
     - `hw02Reference`
   - Ưu tiên lấy test case từ HW02:
     - FR-02: TC01-TC10 + TC-BVA-01 đến TC-BVA-07.
     - FR-09: TC01-TC14 + BVA liên quan.
     - FR-17: TC01 trở lên + TC-BVA-01 đến TC-BVA-10.

4. **Viết helper test**
   - `tests/helpers/api.js`:
     - `loginAsUser(request)`
     - `loginAsAdmin(request)`
     - `resetDefaultUserState(request)` bằng API hoặc SQLite helper nếu cần ổn định lockout.
     - `applyCoupon(request, payload)`
     - `createCoupon(request, token, payload)`
     - `deleteCoupon(request, token, id)`
   - `tests/helpers/auth.js`:
     - `loginWeb(page, email, password)`
     - `loginAdmin(page, email, password)`
   - Dùng helper để giảm flaky test và tách setup khỏi assertion chính.

5. **Automate FR-02 Đăng nhập & khóa tài khoản**
   - Bao phủ ít nhất 12 case: login thành công, email không tồn tại, email sai format, email rỗng, password sai, password rỗng, sai liên tiếp gây khóa, đăng nhập khi đang khóa, kiểm token cũ, gọi API email sai format, boundary 0/1/2/3 lần sai và sau thời gian khóa.
   - Assertion patterns tối thiểu:
     - UI assertion: `toHaveURL`, `toContainText`, `toBeVisible`.
     - API assertion: status code `200/401/403`.
     - Payload assertion: token tồn tại, response không được lộ `password`.
   - Bug dự kiến cần ghi:
     - Form login dùng title “Đăng Ký”, email input là `type="text"` thay vì `email`, password input là `type="text"` thay vì `password`.
     - Backend tăng `login_attempts` thêm 2, không phải 1.
     - Backend khóa 180 giây, không phải 30 giây.
     - Login success trả object user có password.

6. **Automate FR-09 Mã giảm giá**
   - Bao phủ ít nhất 12 case: `SAVE10`, `BIGBUY`, mã không tồn tại, mã rỗng, dưới min order, total âm, total sai kiểu, giả mạo `user_id`, thiếu token, mã hết hạn, hết lượt dùng, boundary bằng đúng `min_order_amount`.
   - Dùng UI checkout khi cần quan sát giao diện; dùng API `POST /api/apply-coupon` cho case bảo mật/validation khó tạo bằng UI.
   - Assertion patterns:
     - Giá trị tiền: `discount_amount`, `final_amount`.
     - UI text: thông báo thành công/lỗi.
     - Network/API status.
   - Bug dự kiến cần ghi:
     - Công thức percent sai: `total_amount * (1 - discount_value)` làm discount âm.
     - API apply-coupon không yêu cầu `Authorization`.
     - API tin `user_id` từ body, cho giả mạo user.
     - Điều kiện min order dùng `>` thay vì `>=`.
     - Thông báo lỗi total âm/sai kiểu chưa đúng bản chất.

7. **Automate FR-17 Admin Coupon CRUD**
   - Bao phủ ít nhất 12 case: admin login, xem danh sách coupon, tạo coupon hợp lệ percent/fixed, code rỗng, code trùng, type sai, discount âm/0, min order âm, expired_at rỗng/quá khứ, max uses = 0, xóa coupon tồn tại, xóa coupon id = 0/không tồn tại, user thường gọi API admin.
   - Dùng admin UI cho luồng chính và API cho negative/security cases.
   - Assertion patterns:
     - UI table row xuất hiện/biến mất.
     - Dialog/alert hoặc response error.
     - DB/API state sau create/delete.
   - Bug dự kiến cần ghi:
     - Admin coupon API chỉ kiểm token, không kiểm `role = admin`.
     - `POST /api/admin/coupons` thiếu validation nhiều trường.
     - `DELETE /api/admin/coupons/0` có thể trả success dù không xóa gì.
     - UI có `min="1"` cho max uses nhưng backend vẫn nhận giá trị không hợp lệ.

8. **Chạy test và tạo report**
   - Chạy toàn suite:
     - `npx playwright test --project=chromium`
     - `npx playwright test --project=firefox`
     - `npx playwright test --project=webkit`
     - hoặc `npx playwright test` nếu config đã có đủ 3 project.
   - Đảm bảo mỗi feature chạy trên cả 3 browser.
   - Tổng tối thiểu: 3 features × 12 cases × 3 browsers = 108 executions.
   - Mở report:
     - `npx playwright show-report`
   - Chụp screenshot các failing cases quan trọng để đưa vào bug report/GitHub Issues.

9. **Tạo commit log đủ điều kiện**
   - Cần ít nhất 8 commit có thay đổi `.spec.js`.
   - Gợi ý commit sequence:
     - `test: add playwright config`
     - `test: add fr02 login data`
     - `test: automate fr02 login cases`
     - `test: add fr09 coupon data`
     - `test: automate fr09 coupon cases`
     - `test: add fr17 admin coupon data`
     - `test: automate fr17 admin coupon cases`
     - `test: stabilize multi-browser assertions`
   - Xuất log:
     - `git log --oneline --decorate --stat > submit/git-commit-log.txt`

10. **Hoàn thiện báo cáo**
   - `submit/main-report.md` gồm:
     - Giới thiệu SUT, tool, browser matrix.
     - 3 feature đã chọn và lý do đúng HW02.
     - Bảng mapping test case HW02 → automation script.
     - Kết quả chạy theo browser.
     - Review/gap analysis: AI sinh script sai gì, mình sửa gì.
     - Link GitHub repo, link HTML report, link video.
   - `submit/test-summary.md` gồm:
     - Số feature: 3.
     - Số test cases automated: tối thiểu 36.
     - Số browser runs: tối thiểu 9 nhóm run.
     - Tổng executions, passed, failed.
     - Số bug thật.
   - `submit/bug-report.md`:
     - Mỗi bug có ID, feature, steps, expected, actual, severity, screenshot path, GitHub Issue link.
   - `submit/ai-critique.md`:
     - 200-300 từ tiếng Việt.
     - Nêu AI hay sai selector, hardcode data, assertion yếu, bỏ qua auth/role, bỏ qua state reset/flaky waits.
   - `submit/ai-audit-report.md`:
     - Gộp hoặc đồng bộ từ `submit/skill/ai-audit-report.md`.
     - Ghi đầy đủ prompt/output thật, không bịa bằng chứng.

11. **Quay video demo**
   - Video YouTube unlisted, tối thiểu 5 phút, thuyết minh tiếng Việt.
   - Nội dung:
     - Chạy `whoami` và `hostname`.
     - Start backend/web/admin.
     - Chạy một feature end-to-end trên 3 browser, nên chọn FR-09 vì dễ thấy bug tiền âm.
     - Mở HTML report có `Run by: 23127326`.
     - Chỉ ra một script AI ban đầu sai và bản mình sửa.
   - Dán link video vào `submit/main-report.md` và `submit/test-summary.md`.

12. **Đóng gói nộp**
   - Convert Markdown sang PDF cho:
     - Main report.
     - AI Audit Report.
     - AI Critique.
   - Kiểm tra zip có:
     - Markdown + PDF reports.
     - Test scripts/data/helper.
     - HTML reports.
     - Bug reports + screenshots + GitHub Issue links nếu có.
     - Git commit log.
     - README/self-assessment.
     - Skill folder nếu muốn lấy điểm Agent Skill.
   - Tên zip:
     - `23127326_HW04_AI_Automation_090.zip` hoặc điểm tự đánh giá bạn chọn.

## Assumptions

- Chọn mục tiêu tối đa điểm, nên giữ phần `submit/skill` như Agent Skill để nhắm thêm 10 điểm.
- Không sửa lỗi SUT trong `eshop-sut`; bài này cần phát hiện bug bằng automation, không phải fix app.
- Dùng Playwright thay vì Selenium vì phù hợp multi-browser, HTML reporter và API setup.
- Các bug chỉ được ghi là “bug thật” sau khi chạy test thật và có screenshot/report hoặc output làm bằng chứng.
