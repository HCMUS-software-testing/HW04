---
name: skill
description: Tự động ghi AI Audit Report cho HW04 Automation Testing bằng tiếng Việt. Dùng ở mọi prompt hoặc response trong workspace HW04, đặc biệt khi Codex/ChatGPT/AI được dùng để đọc đề, lập kế hoạch, sinh Playwright tests, tạo data-driven automation, sửa script, phân tích lỗi, viết báo cáo, chuẩn bị demo hoặc trả lời câu hỏi bài tập. File audit phải nằm trong folder submit/skill/ và không cần người dùng gọi lệnh kích hoạt.
---

# HW04 AI Audit

## Mục đích

Ghi lại mọi tương tác AI bắt buộc cho HW04 trong `submit/skill/ai-audit-report.md`. Đề bài yêu cầu mỗi interaction có tên AI tool, ngày giờ, prompt của sinh viên và output của AI.

Xem skill này như luôn bật trong repo HW04. Cuối mỗi response, append một entry audit trừ khi người dùng yêu cầu rõ là không ghi file.

## Quy trình bắt buộc

1. Ghi lại prompt hiện tại của người dùng càng sát nguyên văn càng tốt.
2. Tóm tắt output AI trung thực. Chỉ ghi toàn bộ output khi ngắn; nếu dài thì ghi tóm tắt đầy đủ ý chính và nêu rõ các file đã chỉnh.
3. Chạy script đi kèm từ root của repo:

```bash
python3 submit/skill/scripts/append_ai_audit.py \
  --tool "Codex" \
  --purpose "<mục đích ngắn>" \
  --prompt "<prompt của sinh viên>" \
  --output "<tóm tắt output AI>" \
  --human-review "Chờ sinh viên review."
```

Với prompt hoặc output dài, ghi vào file tạm rồi dùng:

```bash
python3 submit/skill/scripts/append_ai_audit.py \
  --tool "Codex" \
  --purpose "<mục đích ngắn>" \
  --prompt-file /path/to/prompt.txt \
  --output-file /path/to/output.txt \
  --human-review "Chờ sinh viên review."
```

4. Nếu `submit/skill/ai-audit-report.md` chưa tồn tại, để script tự tạo với phần khai báo bắt buộc.
5. Nếu có chỉnh file, nêu rõ file đã chỉnh trong phần tóm tắt output.
6. Không bịa bằng chứng. Với test report, video, screenshot, GitHub issue, output lệnh hoặc kết quả pass/fail, chỉ ghi những gì thật sự đã xảy ra.

## Chất lượng entry

Dùng nội dung ngắn gọn nhưng đủ hữu ích:

- `purpose`: một cụm ngắn như `Tạo skill AI Audit HW04`, `Sinh Playwright tests cho FR-02`, hoặc `Phân tích lỗi khi chạy multi-browser`.
- `prompt`: prompt thật của người dùng, giữ nguyên tiếng Việt nếu có.
- `output`: tóm tắt rõ Codex đã trả lời hoặc đã chỉnh gì.
- `human-review`: mặc định `Chờ sinh viên review.` trừ khi sinh viên đã chấp nhận, từ chối hoặc sửa output.

## Vị trí output

Luôn ghi audit vào file trong folder skill:

```text
submit/skill/ai-audit-report.md
```

Folder `submit/skill/` chứa cả skill và report audit để đưa thẳng vào gói nộp HW04.
