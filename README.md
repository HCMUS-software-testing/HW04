# HW04 Submission Checklist

Checklist đối chiếu với yêu cầu trong `req/`. [`src/`](src/) là thư mục làm
bài hiện tại; trước khi nộp, copy toàn bộ thư mục này và đổi tên theo quy định.

| Trạng thái | Hạng mục | Bằng chứng / việc cần làm |
|---|---|---|
| ✅ | Ba feature thuộc pool A–C | FR-01, FR-07, FR-18 trong `src/test/specs/` |
| ✅ | Data-driven testing | JSON riêng trong `src/test/test-data/`, mỗi feature có tối thiểu 12 case |
| ✅ | Ba assertion patterns | URL, visible text và control state trong các spec |
| ✅ | Ba browser cho mỗi feature | Chrome, Edge và Firefox; có 9 thư mục findings final |
| ✅ | HTML reports | Các report Playwright nằm trong `src/findings/` |
| ✅ | Bug report | [`src/reports/bug-report.md`](src/reports/bug-report.md) |
| ⚠️ | Số liệu final chính xác | Cập nhật executed/passed/failed/skipped từ 9 HTML report vào README và main report |
| ⚠️ | AI audit hoàn chỉnh | Thay các verdict `[Manual by user]` còn sót trong bảng tóm tắt |
| ⚠️ | AI critique | Xóa placeholder và xác nhận nội dung 200–300 từ |
| ⚠️ | Main report PDF | Export `src/reports/main-report.md` thành PDF |
| ⚠️ | AI critique PDF | Export `src/reports/ai-critique.md` thành PDF |
| ⚠️ | AI audit PDF | Export `src/reports/ai-audit-report.md` thành PDF |
| ⚠️ | GitHub evidence | Public repository, GitHub Issues và screenshot cho từng bug |
| ⚠️ | Video demo | YouTube unlisted ≥ 5 phút, tiếng Việt, có multi-browser/report và bằng chứng tác giả |
| ✅ | Git history | Ít nhất 8 commit có thay đổi test script; có `src/reports/commit-log.txt` |
| ⚠️ | README submission | Điền GitHub URL, YouTube URL và self-assessed grade trong `src/README.md` |
| ⚠️ | Đóng gói bài nộp | Copy `src/`, đổi tên thư mục nộp theo quy định, rồi tạo `23127075_HW04_AI_Automation_<grade>.zip` |

## Thứ tự hoàn thiện đề xuất

1. Chạy/đọc 9 final reports và điền số liệu chính xác.
2. Hoàn thiện audit, critique, bug report và các link evidence.
3. Quay video, export PDF, cập nhật self-assessment.
4. Copy `src/` thành thư mục nộp, đổi tên đúng quy định và kiểm tra ZIP cuối cùng trước khi nộp Moodle.

## Sử dụng bộ skill automation-testing

Bộ skill portable nằm trong [`automation-testing/`](automation-testing/). Skill
điều phối được tách thành ba subskill theo quy trình: tạo test data từ spec,
dựng/chạy Playwright, và phân tích findings thành bug report.

Để tái sử dụng cho project khác, copy thư mục `automation-testing/` vào thư
mục skills mà agent hỗ trợ (ví dụ `.agents/skills/`), sau đó gọi:

```text
Use $automation-testing for PROJECT_ROOT=..., SPEC_PATH=..., APP_URL=...
```

Ở mỗi project cần cung cấp thêm thư mục test data, đường dẫn spec, browser
projects, lệnh reset/seed nếu có, `STUDENT_ID`, và `FINDINGS_DIR`. Skill không
giả định framework, route, ngôn ngữ giao diện, database hay cấu trúc EShop.
