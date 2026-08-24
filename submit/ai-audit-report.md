# Báo Cáo Audit AI - HW04 Kiểm Thử Tự Động

Khai báo: Em có sử dụng công cụ AI để hỗ trợ phân tích yêu cầu, viết mã kiểm thử tự động, chạy test và tổng hợp kết quả cho bài HW04.

## Thông tin sinh viên

- Họ và tên: Lê Mai Hoài Bảo
- MSSV: 23127326
- Bài tập: HW04 - Kiểm thử tự động
- SUT: `eshop-sut`
- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày làm việc chính: 2026-08-20

## Ghi chú

Báo cáo này ghi lại các tương tác AI chính phục vụ trực tiếp cho bài HW04. Các câu lệnh bên dưới được biên tập lại theo dạng yêu cầu rõ ràng, ngắn gọn để dễ đọc trong báo cáo; nội dung vẫn phản ánh đúng nhiệm vụ đã giao cho AI và kết quả đã tạo trong repository.

## Bảng tóm tắt tương tác

| STT | Công cụ AI | Ngày giờ | Mục đích | Prompt / yêu cầu chính | Tóm tắt kết quả AI | Rà soát / chỉnh sửa của sinh viên |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Lập workflow HW04 | Đọc đề bài, `PLAN.md`, tài liệu HW02 và source SUT; thực hiện bài có kiểm soát theo từng phần để sinh viên rà soát trước khi tiếp tục. | Phân tích yêu cầu HW04, xác nhận 3 tính năng cần tự động hóa là FR-02, FR-09, FR-17; chuẩn hóa cấu trúc `submit/`, tạo thư mục báo cáo/kết quả test và file commit log placeholder. | Sinh viên rà soát và xác nhận phần chuẩn bị ban đầu. |
| 2 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Cấu hình Playwright | Thiết lập môi trường Playwright trong thư mục `submit/`, chạy được trên Chromium, Firefox và WebKit, đồng thời cấu hình báo cáo theo yêu cầu bài nộp. | Tạo `package.json`, `package-lock.json`, `playwright.config.js`; cài `@playwright/test`; cấu hình 3 trình duyệt, HTML reporter, thư mục output và metadata `Run by: 23127326`. | Sinh viên rà soát và xác nhận cấu hình Playwright. |
| 3 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Thiết kế test data | Tạo dữ liệu kiểm thử theo hướng data-driven cho FR-02, FR-09 và FR-17 dựa trên yêu cầu chức năng và tài liệu HW02. | Tạo 3 file JSON trong `submit/tests/data/`: FR-02 có 14 case, FR-09 có 14 case, FR-17 có 16 case; mỗi case có input, expected result, precondition và tham chiếu HW02. | Sinh viên rà soát và xác nhận bộ test data. |
| 4 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Viết helper test | Xây dựng helper dùng chung để đăng nhập, gọi API, chuẩn bị dữ liệu SQLite và dọn trạng thái test. | Viết `api.js` và `auth.js` trong `submit/tests/helpers/`, gồm helper login user/admin, coupon API, setup lockout, setup coupon usage và clear web auth. | Sinh viên rà soát và xác nhận helper test. |
| 5 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Tự động hóa FR-02 | Viết Playwright tests cho chức năng login lockout, đọc test case từ JSON và chạy trên 3 trình duyệt. | Tạo `fr02-login-lockout.spec.js`; bao phủ login thành công/thất bại, email malformed, field rỗng, lockout, boundary attempts, brute-force và kiểm tra trạng thái DB. | Sinh viên rà soát và xác nhận test FR-02. |
| 6 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Tự động hóa FR-09 | Viết Playwright tests cho coupon checkout, kết hợp kiểm thử API và UI checkout theo dữ liệu JSON. | Tạo `fr09-coupon-checkout.spec.js`; bao phủ coupon hợp lệ, không tồn tại, inactive, expired, min order, usage limit, missing token, forged user id và invalid total. | Sinh viên rà soát và xác nhận test FR-09. |
| 7 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Tự động hóa FR-17 | Viết Playwright tests cho chức năng admin coupon CRUD và các trường hợp kiểm tra dữ liệu/bảo mật. | Tạo `fr17-admin-coupon-crud.spec.js`; bao phủ list/create/delete coupon bằng admin UI, kiểm tra dữ liệu coupon và các trường hợp thiếu/sai quyền qua API. | Sinh viên rà soát và xác nhận test FR-17. |
| 8 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Chạy test và tạo report | Reset dữ liệu, khởi động SUT, chạy toàn bộ Playwright suite và lưu báo cáo HTML kèm metadata sinh viên. | Chạy 132 lượt trên 3 trình duyệt; kết quả thật là 60 đạt, 72 không đạt. Tạo `submit/playwright-report/index.html`, `run-metadata.md` và artifact lỗi trong `submit/test-results/`. | Sinh viên rà soát và xác nhận kết quả chạy test. |
| 9 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Tổng hợp git commit log | Kiểm tra lịch sử git liên quan đến test scripts và tạo file commit log cho phần nộp bài. | Cập nhật `submit/git-commit-log.txt`; ghi nhận hiện chỉ có 1 qualifying commit chạm `.spec.js`, chưa đủ yêu cầu 8 commits. | Sinh viên được thông báo cần tạo commit thật nếu muốn đạt tiêu chí commit history. |
| 10 | OpenAI ChatGPT / Codex | 2026-08-20, phiên làm việc | Tổng hợp audit AI | Tổng hợp audit AI từ các câu lệnh, kết quả và artifact chính trong phiên làm việc, chỉ giữ các nội dung liên quan trực tiếp đến HW04. | Tạo `submit/ai-audit-report.md` với bảng tóm tắt tương tác và log chi tiết từng bước AI hỗ trợ. | Sinh viên rà soát và yêu cầu bỏ nội dung không liên quan, chỉnh câu lệnh rõ nghĩa hơn. |

## Log tương tác chi tiết

### Tương tác 1 - Lập workflow HW04

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Đọc các tài liệu hiện có của bài HW04, bao gồm đề bài, PLAN, tài liệu HW02 và source SUT. Sau đó thực hiện bài theo từng bước, mỗi bước hoàn tất thì dừng để sinh viên duyệt trước khi tiếp tục.
```

- Kết quả AI:

```text
AI đọc yêu cầu bài, plan và source SUT; xác định phạm vi tự động hóa gồm FR-02 login lockout, FR-09 coupon checkout và FR-17 admin coupon CRUD. AI chuẩn hóa cấu trúc submit/, tạo các thư mục dành cho báo cáo Playwright, kết quả test, ảnh chụp màn hình và file commit log placeholder.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận phần chuẩn bị ban đầu.

### Tương tác 2 - Cấu hình Playwright

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Thiết lập Playwright trong thư mục submit, cấu hình chạy đa trình duyệt, lưu báo cáo đúng thư mục bài nộp và ghi metadata MSSV vào báo cáo.
```

- Kết quả AI:

```text
AI tạo submit/package.json, cài @playwright/test, sinh package-lock.json và viết submit/playwright.config.js. Cấu hình gồm Chromium, Firefox, WebKit, HTML reporter, outputDir, testDir, workers = 1 và metadata Run by: 23127326.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận cấu hình Playwright.

### Tương tác 3 - Thiết kế test data

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Thiết kế test data dạng JSON cho FR-02, FR-09 và FR-17. Mỗi case cần có input, expected result, precondition và tham chiếu đến yêu cầu kiểm thử.
```

- Kết quả AI:

```text
AI tạo dữ liệu kiểm thử:
- fr02-login-lockout.json: 14 cases.
- fr09-coupon-checkout.json: 14 cases.
- fr17-admin-coupon-crud.json: 16 cases.
AI kiểm tra JSON hợp lệ và bảo đảm mỗi case có các trường lõi phục vụ data-driven tests.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận bộ test data.

### Tương tác 4 - Viết helper test

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Tạo helper dùng chung cho Playwright tests, bao gồm login user/admin, gọi API coupon, thao tác SQLite để setup precondition và cleanup dữ liệu test.
```

- Kết quả AI:

```text
AI viết submit/tests/helpers/api.js với các helper loginAsUser, loginAsAdmin, applyCoupon, listCoupons, createCoupon, deleteCoupon, resetDefaultUserState, setUserLockState, setCouponActive, clearCouponUsage và deleteCouponsByCodePrefix.

AI viết submit/tests/helpers/auth.js với các helper loginWeb, loginAdmin, getCustomerLoginFieldTypes và clearWebAuth.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận helper test.

### Tương tác 5 - Tự động hóa FR-02

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Viết Playwright spec cho FR-02 login lockout, đọc case từ JSON, chạy trên 3 trình duyệt và kiểm tra cả API response, kiểm tra UI lẫn trạng thái database.
```

- Kết quả AI:

```text
AI tạo submit/tests/fr02-login-lockout.spec.js. Test bao phủ login thành công, sai mật khẩu, email sai định dạng, field rỗng, tài khoản bị khóa, boundary attempts, brute-force song song, token cũ và kiểm tra password không bị lộ trong response. Playwright discovery nhận 14 case x 3 trình duyệt = 42 lượt chạy.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận test FR-02.

### Tương tác 6 - Tự động hóa FR-09

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Viết Playwright spec cho FR-09 coupon checkout, dùng data-driven JSON và kết hợp kiểm thử API với UI checkout.
```

- Kết quả AI:

```text
AI tạo submit/tests/fr09-coupon-checkout.spec.js. Test bao phủ SAVE10, BIGBUY, coupon không tồn tại, coupon inactive, code rỗng, below min order, expired coupon, usage limit, missing token, forged user_id, invalid total và boundary min order. Playwright discovery nhận 14 case x 3 trình duyệt = 42 lượt chạy.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận test FR-09.

### Tương tác 7 - Tự động hóa FR-17

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Viết Playwright spec cho FR-17 admin coupon CRUD, bao phủ thao tác admin UI, kiểm tra dữ liệu coupon và các trường hợp bảo mật qua API.
```

- Kết quả AI:

```text
AI tạo submit/tests/fr17-admin-coupon-crud.spec.js. Test bao phủ admin list, create, delete coupon, kiểm tra code/discount/min order/dates/usage limit, và các trường hợp bảo mật như user thường hoặc thiếu token gọi admin API. Playwright discovery nhận 16 case x 3 trình duyệt = 48 lượt chạy.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận test FR-17.

### Tương tác 8 - Chạy test và tạo báo cáo

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Reset database, khởi động backend/web/admin, chạy toàn bộ Playwright suite và tạo báo cáo HTML cùng artifact lỗi để nộp bài.
```

- Kết quả AI:

```text
AI reset database, khởi động SUT và chạy npm test trong thư mục submit. Kết quả thật của lần chạy là 132 lượt chạy, 60 đạt, 72 không đạt. AI tạo submit/playwright-report/index.html, submit/playwright-report/run-metadata.md và artifact lỗi trong submit/test-results/.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát và xác nhận kết quả chạy test.

### Tương tác 9 - Tổng hợp git commit log

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Kiểm tra git history liên quan đến các file test script và tạo submit/git-commit-log.txt theo yêu cầu bài nộp.
```

- Kết quả AI:

```text
AI kiểm tra git history bằng git log. Kết quả tại thời điểm kiểm tra: chỉ có 1 qualifying commit chạm file .spec.js, chưa đủ yêu cầu 8 commits. AI cập nhật submit/git-commit-log.txt với trạng thái hiện tại và các commit gần nhất để sinh viên dễ kiểm tra.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên cần tạo thêm commit thật nếu muốn hoàn tất tiêu chí commit history.

### Tương tác 10 - Tổng hợp audit AI

- Công cụ AI: OpenAI ChatGPT / Codex
- Ngày giờ: 2026-08-20, phiên làm việc
- Prompt / yêu cầu chính:

```text
Tạo báo cáo audit AI cho bài HW04 dựa trên các tương tác chính trong phiên làm việc. Chỉ ghi các bước liên quan trực tiếp đến bài kiểm thử tự động, trình bày câu lệnh theo dạng yêu cầu rõ ràng và tóm tắt kết quả AI tương ứng.
```

- Kết quả AI:

```text
AI tạo submit/ai-audit-report.md gồm thông tin sinh viên, ghi chú phạm vi, bảng tóm tắt 10 tương tác và log chi tiết cho từng bước: lập workflow, cấu hình Playwright, thiết kế test data, viết helper, tự động hóa FR-02/FR-09/FR-17, chạy test/tạo báo cáo, tổng hợp git commit log và tổng hợp audit AI.
```

- Rà soát / chỉnh sửa của sinh viên: Sinh viên rà soát, yêu cầu bỏ nội dung không liên quan và chỉnh câu lệnh cho rõ nghĩa hơn.
