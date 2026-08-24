# Báo Cáo Chính HW04 - Kiểm Thử Tự Động Bằng AI

## 1. Tổng Quan

- Họ và tên: Lê Mai Hoài Bảo
- MSSV: 23127326
- SUT: `eshop-sut`
- Kho mã nguồn: https://github.com/HCMUS-software-testing/HW04.git
- Công cụ kiểm thử tự động: Playwright
- Trình duyệt: Chromium, Firefox, WebKit
- Lần chạy được ghi nhận gần nhất: 2026-08-20T15:45:31Z
- Báo cáo HTML: `submit/playwright-report/index.html`
- Video demo: `TBD - bổ sung link YouTube unlisted sau khi quay`

Bài làm tự động hóa 3 tính năng được chọn từ thiết kế kiểm thử HW02 và chạy trên 3 trình duyệt. Bộ test kết hợp luồng UI trên trình duyệt, gọi API trực tiếp và helper chuẩn bị/dọn dữ liệu trong database.

## 2. SUT Và Thiết Lập Công Cụ

SUT là ứng dụng thương mại điện tử gồm backend API, web app khách hàng và web app admin. Dự án kiểm thử tự động được đặt trong thư mục `submit/` và dùng Playwright với file test CommonJS.

Các file chính:

- Cấu hình: `submit/playwright.config.js`
- Khai báo package: `submit/package.json`
- Helper API/database: `submit/tests/helpers/api.js`
- Helper đăng nhập UI: `submit/tests/helpers/auth.js`

Lệnh chạy:

```bash
cd submit
npm install
npm test
npm run report
```

## 3. Ma Trận Trình Duyệt

| Cấu hình trình duyệt | Mục đích |
| --- | --- |
| Chromium | Kiểm thử chính trên trình duyệt desktop phổ biến |
| Firefox | Kiểm tra khác biệt hành vi giữa trình duyệt |
| WebKit | Kiểm tra hành vi gần với Safari, đặc biệt ở form và UI |

## 4. Tính Năng Đã Tự Động Hóa

| Tính năng | Mô tả | Test data | Script | Số case | Số lượt chạy trên trình duyệt |
| --- | --- | --- | --- | ---: | ---: |
| FR-02 | Kiểm tra đăng nhập và khóa tài khoản | `submit/tests/data/fr02-login-lockout.json` | `submit/tests/fr02-login-lockout.spec.js` | 14 | 42 |
| FR-09 | Kiểm tra coupon khi checkout | `submit/tests/data/fr09-coupon-checkout.json` | `submit/tests/fr09-coupon-checkout.spec.js` | 14 | 42 |
| FR-17 | Admin quản lý coupon CRUD và phân quyền | `submit/tests/data/fr17-admin-coupon-crud.json` | `submit/tests/fr17-admin-coupon-crud.spec.js` | 16 | 48 |

## 5. Mapping Với HW02

| Tham chiếu tính năng HW02 | Phạm vi tự động hóa |
| --- | --- |
| FR-02 login lockout | Đăng nhập hợp lệ, email không tồn tại, email sai định dạng, trường rỗng, sai mật khẩu, khóa tài khoản, brute-force, token cũ, biên số lần thử |
| FR-09 coupon checkout | Coupon percent/fixed hợp lệ, coupon không tồn tại/inactive/expired, code rỗng, min order, usage limit, thiếu token, forged user id, invalid total |
| FR-17 admin coupon CRUD | Admin list/create/delete, kiểm tra field coupon, duplicate code, invalid type, lỗi phân quyền |

Mỗi dòng JSON có các trường `id`, `title`, `type`, `mode`, `precondition`, `input`, `expected` và `hw02Reference` để trace được từ thiết kế HW02 sang automation script.

## 6. Kết Quả Chạy Test

| Chỉ số | Giá trị |
| --- | ---: |
| Số tính năng đã tự động hóa | 3 |
| Số test case đã tự động hóa | 44 |
| Số cấu hình trình duyệt | 3 |
| Tổng số lượt chạy | 132 |
| Số lượt đạt | 60 |
| Số lượt không đạt | 72 |

Số lượt chạy vượt yêu cầu tối thiểu 108 lượt chạy của đề. Báo cáo HTML có metadata `Run by: 23127326` và timestamp của lần chạy.

## 7. Phân Tích Bug Và Gap

Các test failed phát hiện một số vấn đề có khả năng là bug thật của SUT:

- Login API trả về password của user trong response.
- Login UI dùng input text thay vì kiểm tra email.
- Thời gian khóa tài khoản khoảng 180 giây thay vì kỳ vọng 30 giây.
- Coupon API trả lỗi min-order cho dữ liệu `total_amount` không hợp lệ.

Một số failure khác cần phân loại thêm vì có thể là khoảng lệch của test oracle chứ chưa chắc là bug SUT. Ví dụ, nhiều test kiểm tra admin coupon kỳ vọng một nhóm HTTP status cụ thể, trong khi SUT trả status khác. Các lỗi này được giữ trong báo cáo Playwright và ghi nhận trong `submit/bug-report.md`.

## 8. Review Script Do AI Sinh

AI hữu ích trong việc tạo cấu trúc Playwright ban đầu, tạo test case theo dữ liệu và helper dùng chung. Tuy nhiên, script do AI sinh cần được rà soát vì AI suy đoán quá nhiều về hành vi SUT. Ví dụ: AI kỳ vọng response login không có password, giả định `input[type=email]`, giả định khóa tài khoản 30 giây và kỳ vọng thông báo kiểm tra dữ liệu rất cụ thể. Sau khi chạy test thật, script được bổ sung setup/cleanup database rõ ràng, chạy tuần tự cho các tính năng có trạng thái dùng chung và thêm annotation để báo cáo thể hiện metadata của từng tính năng/case.

## 9. Bằng Chứng

- Tóm tắt kiểm thử: `submit/test-summary.md`
- Báo cáo bug: `submit/bug-report.md`
- Nhận xét về AI: `submit/ai-critique.md`
- Báo cáo audit AI: `submit/ai-audit-report.md`
- Git commit log: `submit/git-commit-log.txt`
- Báo cáo HTML: `submit/playwright-report/index.html`
- Ảnh chụp màn hình đại diện: `submit/screenshots/`
