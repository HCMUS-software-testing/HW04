# AI Audit Report

## 1. Thông tin nhóm

- Họ tên: `Lê Trung Kiên`
- MSSV: `23127075`
- Nhóm/Lớp: `[TODO]`

## 2. Bảng audit

### 2.1. Tóm tắt audit

| STT | Prompt + Tool                                                                                                                                                                                                                                                                                                                                                                                                                                            | Verdict |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | Time:`2026-08-19 23:42 +07`Tool: `Codex / grok-4.6`Prompt:Hãy thực hiện các công việc sau:  1. Convert req/2026.HW04.Automation  Testing_En.pdf ra file markdown đầy đủ  nội dung và layout. Có 2 bản tiếng anh  tiêng việt. Output trong folder req/  2. Sau khi convert xong, check .agents/  skills/ai-audit-entry đã phù hợp cho  project này chưa vì cấu trúc folder đã khác. Mình sẽ làm bài trong folder src | valid   |
| 2   | Time:`2026-08-19 23:51 +07`Tool: `Codex / GPT-5.4`Prompt:thêm rule tron folder req và ai-reasoning là chỉ đọc markdown để tiết kiệm token                                                                                                                                                                                                                                                                                                  | valid   |
| 3   | Time:`2026-08-20 23:56 +07`Tool: `Gemini 3.6 Flash`Prompt:Convert ref/10_Automation Testing.pdf sang markdown đúng theo nội dung và layout. Các sơ đồ có thể để dưới dạng mermaid, còn các ảnh có thể screenshot. Còn lại nội dung thì chuyển full sang text có heading, bullet points... layout đẹp. Output bỏ vào folder ref. Tạo cả 2 bản tiếng anh và tiếng việt.                                                                             | valid   |

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

### 2.2.2 Entry 2

**Prompt + Tool:**

Time: `2026-08-19 23:51 +07`
Tool: `Codex / GPT-5.4`
Prompt:
Thêm rule trong folder req và ai-reasoning là chỉ đọc markdown để tiết kiệm token

**AI Output:** Đã tạo req/AGENTS.md, siết ai-reasoning/AGENTS.md thành chỉ đọc *.md, và cập nhật AGENTS.md gốc để trỏ hai rule này.

**Verdict:** valid

**Reasoning:** [Manual by user]

**Student Fix:** Sinh viên đã đọc lại AGENTS.md trong `req/` và `ai-reasoning/`, xác nhận rule chỉ trỏ file `.md` và không còn đọc PDF.

### 2.2.3 Entry 3

**Prompt + Tool:**

Time: `2026-08-20 23:56 +07`
Tool: `Gemini 3.6 Flash`
Prompt:
Convert ref/10_Automation Testing.pdf sang markdown đúng theo nội dung và layout. Các sơ đồ có thể để dưới dạng mermaid, còn các ảnh có thể screenshot. Còn lại nội dung thì chuyển full sang text có heading, bullet points... layout đẹp. Output bỏ vào folder ref. Tạo cả 2 bản tiếng anh và tiếng việt.

**AI Output:** Đã chuyển đổi file ref/10_Automation Testing.pdf sang 2 file Markdown: ref/10_Automation Testing_En.md (bản tiếng Anh) và ref/10_Automation Testing_Vi.md (bản tiếng Việt). Toàn bộ nội dung slide được chuyển thành văn bản chuẩn đẹp với tiêu đề, danh sách bullet points, bảng dữ liệu khảo sát và các sơ đồ quy trình/DevOps/Test Pyramid được mô phỏng bằng Mermaid.

**Verdict:** valid

**Reasoning:** [Manual by user]

**Student Fix:** Sinh viên đã dò với slide gốc.

## 3. Tổng kết độ chính xác AI

- Các nội dung AI tạo đã được rà soát với yêu cầu bài làm: `[TODO]`
- Mức độ chính xác/độ hữu ích tổng quan: `[TODO]`
- Giới hạn hoặc rủi ro còn lại: `[TODO]`

## 4. Kết luận

`[TODO]`

## 5. Disclosure

`[TODO]`
