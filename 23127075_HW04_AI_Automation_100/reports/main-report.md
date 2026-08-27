# HW04 Kiểm thử tự động — Báo cáo chính

## Thông tin sinh viên

- Mã sinh viên: `23127075`
- Repository: https://github.com/HCMUS-software-testing/HW04
- Video demo AI Skills: https://youtu.be/T96vCNmal-s
- Video demo Scripts: https://youtu.be/DTWXP3eLIns
- PDF: Sinh viên sẽ export trước khi nộp.

## Cấu trúc folder nộp

Folder này là package độc lập; mọi đường dẫn bên dưới đều tính từ root của `23127075_HW04_AI_Automation_100/`.

```text
23127075_HW04_AI_Automation_100/
├── test/specs/             # Script Playwright cho FR-01, FR-07, FR-18
├── test/test-data/         # Dữ liệu kiểm thử JSON data-driven
├── test/helpers/            # Hàm trợ giúp dùng chung
├── test/seed-data/          # Fixture seed cho FR-18
├── findings/               # 9 HTML report final và test artifact
│   ├── fr01-final-*/
│   ├── fr07-final-*/
│   └── fr18-final-*/
├── reports/                # Báo cáo chính, bug report, AI audit/critique
│   └── github-evidence/    # Screenshot dùng cho GitHub Issue
├── .agents/                # Skill automation-testing và các subskill
├── playwright.config.ts    # Cấu hình browser và thư mục output
├── package.json            # Các lệnh npm chạy test
└── README.md               # Hướng dẫn cài đặt, chạy và tự đánh giá
```

SUT EShop không nằm trong package nộp; các test kết nối tới user frontend `http://localhost:5173`, admin frontend `http://localhost:5174` và backend theo hướng dẫn trong `README.md`. Khi chạy test, `FINDINGS_DIR` được đặt tương đối với root folder này.

## Phạm vi và tóm tắt tự động hóa

Bài làm tự động hóa FR-01 Đăng ký tài khoản, FR-07 Giỏ hàng và FR-18 Quản lý đơn hàng Admin. Ba Playwright spec sử dụng dữ liệu JSON bên ngoài và các assertion URL, visible text và control state. Mỗi feature có ít nhất 12 test case data-driven và chạy trên Chrome, Edge, Firefox.

Các lệnh chạy và đường dẫn evidence được ghi trong [README.md](../README.md). Danh sách bug nằm trong [bug-report.md](bug-report.md); screenshot, trace và HTML report được lưu trong `../findings/`.

## Kết quả kiểm thử

Kết quả chạy final được lưu trong chín folder `../findings/*-final-*`. Tổng cộng 129 lượt test theo feature/browser: 24 passed, 63 failed và 42 skipped do SUT không cung cấp control cần thiết. Theo từng browser: FR-01 = 0 passed, 13 failed, 1 skipped; FR-07 = 2 passed, 4 failed, 8 skipped; FR-18 = 6 passed, 4 failed, 5 skipped. Các failure phản ánh lỗi SUT được giữ nguyên; control chưa hỗ trợ được ghi nhận là skip.

## GitHub Bug Issues

Các product bug được xác nhận từ lượt chạy final đã được gộp thành các GitHub Issue sau. Lỗi script, fixture và môi trường không được tạo thành product issue.

| Bug | Feature | GitHub Issue |
| --- | --- | --- |
| BUG-FR01-01 | FR-01 Đăng ký — redirect/password validation | [#11](https://github.com/HCMUS-software-testing/HW04/issues/11) |
| BUG-FR01-02 | FR-01 Đăng ký — thiếu Confirm Password | [#12](https://github.com/HCMUS-software-testing/HW04/issues/12) |
| BUG-FR07-01 | FR-07 Giỏ hàng — sai nhãn tổng tiền | [#13](https://github.com/HCMUS-software-testing/HW04/issues/13) |
| BUG-FR07-02 | FR-07 Giỏ hàng — thiếu control quantity/confirmation | [#14](https://github.com/HCMUS-software-testing/HW04/issues/14) |
| BUG-FR07-03 | FR-07 Giỏ hàng — thiếu illustration khi rỗng | [#15](https://github.com/HCMUS-software-testing/HW04/issues/15) |
| BUG-FR07-04 | FR-07 Giỏ hàng — trùng row cùng sản phẩm | [#16](https://github.com/HCMUS-software-testing/HW04/issues/16) |
| BUG-FR18-01 | FR-18 Đơn hàng Admin — sai success message | [#17](https://github.com/HCMUS-software-testing/HW04/issues/17) |
| BUG-FR18-02 | FR-18 Đơn hàng Admin — đơn hủy vẫn có action | [#18](https://github.com/HCMUS-software-testing/HW04/issues/18) |
| BUG-FR18-03 | FR-18 Đơn hàng Admin — thiếu bộ lọc trạng thái | [#19](https://github.com/HCMUS-software-testing/HW04/issues/19) |

Screenshot dùng trong issue nằm trong [github-evidence](github-evidence/); nội dung issue và mapping evidence nằm trong [github-issues.md](github-issues.md).

## Review AI và phân tích khoảng cách

Các script đầu tiên do AI tạo cần được con người sửa về liên kết label, chọn product card, bảo toàn cart state của React, chọn order row, cô lập fixture và cấu hình browser. Script cuối vẫn giữ data-driven input và không sửa SUT. Xem [ai-critique.md](ai-critique.md) và [ai-audit-report.md](ai-audit-report.md).

## Giới hạn đã biết

SUT có các gap được xác nhận trong [bug-report.md](bug-report.md), gồm validation password, thiếu cart control, thiếu bộ lọc trạng thái và action không hợp lệ trên đơn đã hủy. Không dùng WebKit vì Fedora thiếu dependency runtime của Playwright; Chrome, Edge và Firefox đáp ứng combo browser thay thế của đề.

## Định dạng tài liệu nộp

Các bản PDF tương ứng có tên `main-report.pdf`, `ai-critique.pdf` và `ai-audit-report.pdf`, đặt cùng thư mục `reports/` sau khi sinh viên export. GitHub URL, issue links, screenshot và video URL đã được ghi ở trên và trong `github-issues.md`.
