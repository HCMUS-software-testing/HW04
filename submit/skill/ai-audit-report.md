# Báo cáo AI Audit

Khai báo: Em có sử dụng công cụ AI cho các nhiệm vụ sau.

## Thông tin sinh viên

- Họ và tên: Lê Mai Hoài Bảo
- MSSV: 23127326
- Bài tập: HW04 - Kiểm thử tự động

## Bảng tóm tắt

| STT | Công cụ AI | Ngày giờ | Mục đích | Prompt | Tóm tắt output AI | Review / chỉnh sửa của sinh viên |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Codex | 2026-08-17T18:53:51+07:00 | Tạo skill AI Audit HW04 | Hãy đọc đề bài docs/HW04_ASSIGNMENT_VI.md và xây dựng cho tôi agent skill để ghi AI AUDIT tự động mỗi lần prompt trong phiên chat (không cần lệnh kích hoạt). output sẽ nằm trong folder submit. Follow-up: cài trong folder submit thôi | Đã đọc docs/HW04_ASSIGNMENT_VI.md và ngữ cảnh repo; tạo skill submit/hw04-ai-audit; thêm script append_ai_audit.py; cấu hình metadata implicit invocation; validate skill; tạo file audit ban đầu. | Chờ sinh viên review. |
| 2 | Codex | 2026-08-17T18:57:33+07:00 | Sửa skill AI Audit sang tiếng Việt và đặt report trong folder skill | dùng tiéng việt chứ và phải để trong folder skill | Đã chuyển SKILL.md, script, openai.yaml và file AI Audit Report sang tiếng Việt; đổi đường dẫn mặc định của report thành submit/hw04-ai-audit/ai-audit-report.md; chuyển file audit hiện có vào trong folder skill. | Chờ sinh viên review. |
| 3 | Codex | 2026-08-17T19:00:52+07:00 | Đổi tên folder skill | đổi cái hw04-ai-audit thành folder tên skill đi | Đã đổi folder submit/hw04-ai-audit thành submit/skill, cập nhật name trong SKILL.md thành skill, sửa đường dẫn trong SKILL.md, openai.yaml, append_ai_audit.py và tiếp tục ghi audit vào submit/skill/ai-audit-report.md. | Chờ sinh viên review. |

## Log tương tác đầy đủ

### Tương tác 1

- Công cụ AI: Codex
- Ngày giờ: 2026-08-17T18:53:51+07:00
- Mục đích: Tạo skill AI Audit HW04
- Prompt:

```text
Hãy đọc đề bài docs/HW04_ASSIGNMENT_VI.md và xây dựng cho tôi agent skill để ghi AI AUDIT tự động mỗi lần prompt trong phiên chat (không cần lệnh kích hoạt). output sẽ nằm trong folder submit. Follow-up: cài trong folder submit thôi
```

- Output AI:

```text
Đã đọc docs/HW04_ASSIGNMENT_VI.md và ngữ cảnh repo; tạo skill submit/hw04-ai-audit; thêm script append_ai_audit.py; cấu hình metadata implicit invocation; validate skill; tạo file audit ban đầu.
```

- Review / chỉnh sửa của sinh viên: Chờ sinh viên review.

### Tương tác 2

- Công cụ AI: Codex
- Ngày giờ: 2026-08-17T18:57:33+07:00
- Mục đích: Sửa skill AI Audit sang tiếng Việt và đặt report trong folder skill
- Prompt:

```text
dùng tiéng việt chứ và phải để trong folder skill
```

- Output AI:

```text
Đã chuyển SKILL.md, script, openai.yaml và file AI Audit Report sang tiếng Việt; đổi đường dẫn mặc định của report thành submit/hw04-ai-audit/ai-audit-report.md; chuyển file audit hiện có vào trong folder skill.
```

- Review / chỉnh sửa của sinh viên: Chờ sinh viên review.

### Tương tác 3

- Công cụ AI: Codex
- Ngày giờ: 2026-08-17T19:00:52+07:00
- Mục đích: Đổi tên folder skill
- Prompt:

```text
đổi cái hw04-ai-audit thành folder tên skill đi
```

- Output AI:

```text
Đã đổi folder submit/hw04-ai-audit thành submit/skill, cập nhật name trong SKILL.md thành skill, sửa đường dẫn trong SKILL.md, openai.yaml, append_ai_audit.py và tiếp tục ghi audit vào submit/skill/ai-audit-report.md.
```

- Review / chỉnh sửa của sinh viên: Chờ sinh viên review.
