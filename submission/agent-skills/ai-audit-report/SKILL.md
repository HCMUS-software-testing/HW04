---
name: ai-audit-report
description: Trích xuất lịch sử chat giữa người dùng và AI Agent (Prompt và Output đầy đủ, không tóm tắt) rồi tự động điền vào file AI_Audit_Report.md khi người dùng gõ lệnh ai_audit_report.
---

# Lập Báo Cáo Kiểm Toán AI Tự Động (AI Audit Report Generator)

## When to use this skill
- Sử dụng kỹ năng này sau mỗi phiên làm việc với AI để ghi lại log (như tạo test case, phân tích BVA, tìm bug) trong bài tập HW02 & HW03.
- Bất cứ khi nào người dùng gõ chuỗi lệnh `ai_audit_report` hoặc `ai-audit-report` trong cửa sổ chat.

## How to use it
1. **Tiếp nhận lệnh**: Khi nhận được chuỗi `ai_audit_report` hoặc `ai-audit-report` từ người dùng.
2. **Đọc lịch sử**: Agent cần đọc lại toàn bộ bộ nhớ hội thoại (hoặc file log hệ thống).
3. **Trích xuất thông tin**: Lọc ra các lượt tương tác phục vụ trực tiếp cho bài tập (bỏ qua giao tiếp thông thường). Với mỗi lượt, trích xuất 4 thông tin:
   - Tên công cụ AI đang sử dụng (ví dụ: Gemini 3.6 Flash).
   - Thời gian tương tác (Date and time).
   - Câu lệnh của người dùng (Prompt).
   - Nội dung trả lời của AI (Output): **KHÔNG TÓM TẮT (do NOT summarize)**. Phải ghi đầy đủ và trọn vẹn câu trả lời nguyên bản của AI dưới phần `### Nội dung trả lời của AI (Output)`.
4. **Cập nhật File**: Sử dụng công cụ sửa file để nối tiếp (append) thông tin vừa trích xuất vào cuối file `AI_Audit_Report.md` (hoặc `HW03/submission/AI_Audit_Report.md`). Định dạng chuẩn của file phải được giữ nguyên.

