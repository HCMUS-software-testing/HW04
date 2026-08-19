# AI Audit Report

## 1. Thông tin nhóm
- Họ tên: `Lê Trung Kiên`
- MSSV: `23127075`
- Nhóm/Lớp: `[TODO]`

## 2. Bảng audit

### 2.1. Tóm tắt audit

| STT | Prompt + Tool | Verdict |
| --- | --- | --- |
| 1 | Time: `2026-08-19 23:42 +07`<br>Tool: `Codex / grok-4.6`<br>Prompt:<br>Hãy thực hiện các công việc sau:<br>  1. Convert req/2026.HW04.Automation<br>  Testing_En.pdf ra file markdown đầy đủ<br>  nội dung và layout. Có 2 bản tiếng anh<br>  tiêng việt. Output trong folder req/<br>  2. Sau khi convert xong, check .agents/<br>  skills/ai-audit-entry đã phù hợp cho<br>  project này chưa vì cấu trúc folder đã khác. Mình sẽ làm bài trong folder src | valid |

### 2.2. Chi tiết audit

### 2.2.1 Entry 1

**Prompt + Tool:**

Time: `2026-08-19 23:42 +07`
Tool: `Codex / grok-4.6`
Prompt:
Hãy thực hiện các công việc sau:
  1. Convert req/2026.HW04.Automation
  Testing_En.pdf ra file markdown đầy đủ
  nội dung và layout. Có 2 bản tiếng anh
  tiêng việt. Output trong folder req/
  2. Sau khi convert xong, check .agents/
  skills/ai-audit-entry đã phù hợp cho
  project này chưa vì cấu trúc folder đã khác. Mình sẽ làm bài trong folder src

**AI Output:** Đã tạo req/2026.HW04.Automation Testing_En.md và req/2026.HW04.Automation Testing_Vi.md đủ 17 mục. Skill ai-audit-entry đổi default path sang src/reports/ai-audit-report.md.

**Verdict:** valid

**Reasoning:** [Manual by user]

**Student Fix:** Sinh viên đã dò lại file markdown được convert đúng, còn bộ skill thì đúng đường dẫn.

## 3. Tổng kết độ chính xác AI
- Các nội dung AI tạo đã được rà soát với yêu cầu bài làm: `[TODO]`
- Mức độ chính xác/độ hữu ích tổng quan: `[TODO]`
- Giới hạn hoặc rủi ro còn lại: `[TODO]`

## 4. Kết luận
`[TODO]`

## 5. Disclosure
`[TODO]`
