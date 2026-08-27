# Tóm Tắt Kiểm Thử HW04

## Tổng Quan

- MSSV: 23127326
- SUT: `eshop-sut`
- Công cụ kiểm thử: Playwright
- Cấu hình trình duyệt: Chromium, Firefox, WebKit
- Timestamp lần chạy được ghi nhận: 2026-08-20T15:45:31Z
- Metadata lần chạy: `submit/playwright-report/run-metadata.md`
- Báo cáo HTML: `submit/playwright-report/index.html`
- Video demo Task 2: https://youtu.be/dzViL_yCqds

## Tóm Tắt Kết Quả Chạy

| Chỉ số | Giá trị |
| --- | ---: |
| Số tính năng đã tự động hóa | 3 |
| Số test case data-driven | 44 |
| Số cấu hình trình duyệt | 3 |
| Tổng số lượt chạy | 132 |
| Số lượt đạt | 60 |
| Số lượt không đạt | 72 |
| Số thư mục artifact lỗi | 72 |

## Tóm Tắt Theo Tính Năng

| Tính năng | Mục đích | Số case | Số lượt chạy trên trình duyệt | Script |
| --- | --- | ---: | ---: | --- |
| FR-02 | Kiểm tra đăng nhập và khóa tài khoản | 14 | 42 | `submit/tests/fr02-login-lockout.spec.js` |
| FR-09 | Kiểm tra coupon trong checkout | 14 | 42 | `submit/tests/fr09-coupon-checkout.spec.js` |
| FR-17 | Admin quản lý coupon CRUD và phân quyền | 16 | 48 | `submit/tests/fr17-admin-coupon-crud.spec.js` |

## Diễn Giải Kết Quả

Bộ test tự động đáp ứng kích thước tối thiểu theo yêu cầu đề bài: ít nhất 3 tính năng, ít nhất 12 test case cho mỗi tính năng và chạy trên 3 trình duyệt. Lần chạy đã ghi nhận có 132 lượt chạy, vượt mức tối thiểu 108 lượt chạy theo trình duyệt.

72 lượt chạy không đạt được gom thành các nhóm bug hoặc khoảng lệch lặp lại trong `submit/bug-report.md`. Một số failure cho thấy khả năng có bug thật trong SUT, ví dụ login response bị lộ password, form login kiểm tra email yếu và kiểm tra dữ liệu coupon/admin chưa nhất quán. Một số failure khác ghi nhận khoảng lệch của assertion khi kỳ vọng kiểm thử tự động nghiêm ngặt hơn hành vi hiện tại của SUT.

## Vị Trí Bằng Chứng

- Báo cáo HTML Playwright: `submit/playwright-report/index.html`
- Trace/video/screenshot lỗi: `submit/playwright-report/data/`
- Ảnh chụp màn hình đại diện: `submit/screenshots/`
- Bằng chứng commit: `submit/git-commit-log.txt`
- Video demo Task 2: https://youtu.be/dzViL_yCqds
