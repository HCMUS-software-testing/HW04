# HW04 Kiểm thử tự động — Báo cáo chính

## Thông tin sinh viên

- Student ID: `23127075`
- Mã sinh viên: `23127075`
- Repository: https://github.com/HCMUS-software-testing/HW04
- Video demo AI Skills: https://youtu.be/T96vCNmal-s
- Video demo Scripts: https://youtu.be/DTWXP3eLIns
- PDF: Sinh viên sẽ export trước khi nộp.

## Phạm vi và tóm tắt tự động hóa

Bài làm tự động hóa FR-01 Đăng ký tài khoản, FR-07 Giỏ hàng và FR-18 Quản lý đơn hàng Admin. Ba Playwright spec sử dụng dữ liệu JSON bên ngoài và các assertion URL, visible text và control state. Mỗi feature có ít nhất 12 test case data-driven và chạy trên Chrome, Edge, Firefox.

Các lệnh chạy và đường dẫn evidence được ghi trong [README.md](../README.md). Danh sách bug nằm trong [bug-report.md](bug-report.md); screenshot, trace và HTML report được lưu trong `../findings/`.

## Kết quả kiểm thử

Kết quả chạy final được lưu trong chín folder `../findings/*-final-*`. Tổng cộng 129 lượt test theo feature/browser: 24 passed, 63 failed và 42 skipped do SUT không cung cấp control cần thiết. Theo từng browser: FR-01 = 0 passed, 13 failed, 1 skipped; FR-07 = 2 passed, 4 failed, 8 skipped; FR-18 = 6 passed, 4 failed, 5 skipped. Các failure phản ánh lỗi SUT được giữ nguyên; control chưa hỗ trợ được ghi nhận là skip.

## GitHub Bug Issues

Các product bug được xác nhận từ lượt chạy final đã được gộp thành các GitHub Issue sau. Lỗi script, fixture và môi trường không được tạo thành product issue.

| Bug | Feature | GitHub Issue |
| --- | --- | --- |
| BUG-FR01-01 | FR-01 Registration — redirect/password validation | [#11](https://github.com/HCMUS-software-testing/HW04/issues/11) |
| BUG-FR01-02 | FR-01 Registration — missing Confirm Password | [#12](https://github.com/HCMUS-software-testing/HW04/issues/12) |
| BUG-FR07-01 | FR-07 Shopping Cart — wrong total label | [#13](https://github.com/HCMUS-software-testing/HW04/issues/13) |
| BUG-FR07-02 | FR-07 Shopping Cart — missing quantity/confirmation controls | [#14](https://github.com/HCMUS-software-testing/HW04/issues/14) |
| BUG-FR07-03 | FR-07 Shopping Cart — missing empty-cart illustration | [#15](https://github.com/HCMUS-software-testing/HW04/issues/15) |
| BUG-FR07-04 | FR-07 Shopping Cart — duplicate rows for the same product | [#16](https://github.com/HCMUS-software-testing/HW04/issues/16) |
| BUG-FR18-01 | FR-18 Admin Orders — wrong success message | [#17](https://github.com/HCMUS-software-testing/HW04/issues/17) |
| BUG-FR18-02 | FR-18 Admin Orders — canceled orders remain actionable | [#18](https://github.com/HCMUS-software-testing/HW04/issues/18) |
| BUG-FR18-03 | FR-18 Admin Orders — missing status filter | [#19](https://github.com/HCMUS-software-testing/HW04/issues/19) |

Screenshot dùng trong issue nằm trong [github-evidence](github-evidence/); nội dung issue và mapping evidence nằm trong [github-issues.md](github-issues.md).

## Review AI và phân tích khoảng cách

Các script đầu tiên do AI tạo cần được con người sửa về liên kết label, chọn product card, bảo toàn cart state của React, chọn order row, cô lập fixture và cấu hình browser. Script cuối vẫn giữ data-driven input và không sửa SUT. Xem [ai-critique.md](ai-critique.md) và [ai-audit-report.md](ai-audit-report.md).

## Giới hạn đã biết

SUT có các gap được xác nhận trong [bug-report.md](bug-report.md), gồm validation password, thiếu cart control, thiếu bộ lọc trạng thái và action không hợp lệ trên đơn đã hủy. Không dùng WebKit vì Fedora thiếu dependency runtime của Playwright; Chrome, Edge và Firefox đáp ứng combo browser thay thế của đề.

## Tài liệu cần export trước khi nộp

- Export báo cáo này thành `main-report.pdf`.
- Export `ai-critique.md` và `ai-audit-report.md` thành PDF.
- GitHub URL, issue links, screenshot và video URL đã được ghi ở trên và trong `github-issues.md`.
