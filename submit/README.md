# Bài Nộp HW04 - Tự Động Hóa Kiểm Thử Bằng AI

## Thông Tin Sinh Viên

- Họ và tên: Lê Mai Hoài Bảo
- MSSV: 23127326
- Kho mã nguồn: https://github.com/HCMUS-software-testing/HW04.git
- SUT: `eshop-sut`
- Công cụ kiểm thử tự động: Playwright
- Trình duyệt kiểm thử: Chromium, Firefox, WebKit
- Video demo Agent Skill: https://youtu.be/BncsesiBxOA

## Cách Chạy

```bash
cd submit
npm install
npm test
npm run report
```

Chạy riêng từng trình duyệt:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

SUT cần được khởi động trước khi chạy test:

- Backend API: `http://localhost:3000`
- Customer web app: `http://localhost:3001`
- Admin web app: `http://localhost:3002`

## Tóm Tắt Kiểm Thử

| Chỉ số | Giá trị |
| --- | ---: |
| Số tính năng đã tự động hóa | 3 |
| Số dòng test data | 44 |
| Số cấu hình trình duyệt | 3 |
| Tổng số lượt chạy | 132 |
| Số lượt đạt | 60 |
| Số lượt không đạt | 72 |
| Nhóm bug đã ghi nhận | 4 |
| Báo cáo HTML | `submit/playwright-report/index.html` |
| Metadata lần chạy | `submit/playwright-report/run-metadata.md` |

## Tính Năng Đã Tự Động Hóa

| Tính năng | Script | File dữ liệu | Số case | Số lượt chạy |
| --- | --- | --- | ---: | ---: |
| FR-02 Đăng nhập và khóa tài khoản | `tests/fr02-login-lockout.spec.js` | `tests/data/fr02-login-lockout.json` | 14 | 42 |
| FR-09 Áp dụng coupon khi checkout | `tests/fr09-coupon-checkout.spec.js` | `tests/data/fr09-coupon-checkout.json` | 14 | 42 |
| FR-17 Admin quản lý coupon CRUD | `tests/fr17-admin-coupon-crud.spec.js` | `tests/data/fr17-admin-coupon-crud.json` | 16 | 48 |

## Tài Liệu Nộp Kèm

- Báo cáo chính: `submit/main-report.md`
- Tóm tắt kiểm thử: `submit/test-summary.md`
- Báo cáo bug: `submit/bug-report.md`
- Nhận xét về AI: `submit/ai-critique.md`
- Báo cáo audit AI: `submit/ai-audit-report.md`
- Git commit log: `submit/git-commit-log.txt`
- Báo cáo HTML Playwright: `submit/playwright-report/index.html`
- Ảnh chụp màn hình bug: `submit/screenshots/`

## Tự Đánh Giá

| STT | Tiêu chí | Điểm tối đa | Tự đánh giá |
| --- | --- | ---: | ---: |
| 1 | Nhiệm vụ 1 - Tính năng A: FR-02 Login lockout | 25 | 21 |
| 2 | Nhiệm vụ 1 - Tính năng B: FR-09 Coupon checkout | 25 | 21 |
| 3 | Nhiệm vụ 1 - Tính năng C: FR-17 Admin coupon CRUD | 25 | 21 |
| 4 | Nhiệm vụ 2 - Video demo | 15 | 15 |
| 5 | Agent Skills | 10 | 8 |
| | Tổng cộng | 100 | 86 |

Ghi chú: Link video demo Agent Skill đã được bổ sung ở phần thông tin sinh viên.
