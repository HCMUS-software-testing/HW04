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
| 4   | Time:`2026-08-21 00:08 +07`Tool: `Gemini 3.6 Flash`Prompt:/using-superpowers Dựa vào eshop-sut/README.md và eshop-sut/api_specification.md hãy phân tích và tạo file test data JSON cho 3 tính năng FR-01, FR-07 và FR-18 (mỗi feature tối thiểu 12 test cases gồm positive, negative, edge cases) lưu vào thư mục src/test/test-data/. | valid |
| 5   | Time:`2026-08-24 22:57 +07`Tool: `Claude Opus 4.6`Prompt:/using-superpowers Thiết lập Playwright Automation cho HW04 (package.json, playwright.config.ts 3 browsers + watermark 23127075, helpers/eshop.ts) và viết script Data-Driven tests/feature-a.spec.ts cho FR-01 đọc từ src/test/test-data/FR-01.json dùng 3 assertion patterns. | valid |

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

### 2.2.4 Entry 4

**Prompt + Tool:**

Time: `2026-08-21 00:08 +07`
Tool: `Gemini 3.6 Flash`
Prompt:
/using-superpowers Dựa vào eshop-sut/README.md và eshop-sut/api_specification.md hãy phân tích và tạo file test data JSON cho 3 tính năng FR-01, FR-07 và FR-18 (mỗi feature tối thiểu 12 test cases gồm positive, negative, edge cases) lưu vào thư mục src/test/test-data/.

**AI Output:** Đã tạo 3 file test data JSON dưới thư mục src/test/test-data/: feature-a.json (FR-01: Đăng ký tài khoản - 14 test cases), feature-b.json (FR-07: Giỏ hàng - 14 test cases), và feature-c.json (FR-18: Quản lý đơn hàng Admin - 15 test cases). Bộ test data bao gồm các kịch bản positive, negative và edge cases.

**Verdict:** valid

**Reasoning:** Theo chuẩn ISTQB CT-AI Syllabus (Mục 9.3 - AI Test Generation & Test Oracle): Sử dụng AI để sinh test data từ tài liệu đặc tả (Specification-based Test Design) giúp tối ưu hóa độ bao phủ yêu cầu (Requirements Coverage). Tuy nhiên, mô hình AI sinh có thể gặp phải giới hạn về Test Oracle / Boundary Constraint (ví dụ: sinh mật khẩu phức tạp chứa các ký tự nằm ngoài danh sách ký tự đặc biệt được SRS cho phép). Do đó, quy trình Human-in-the-Loop Verification là bắt buộc để đối chiếu và kiểm tra tính tuân thủ nghiêm ngặt của test data đối với Test Oracle (tài liệu SRS).

**Student Fix:** Sinh viên đã kiểm tra và rà soát kỹ lưỡng toàn bộ 3 file test data JSON so với đặc tả SRS (`eshop-sut/README.md`): (1) Đã hiệu chỉnh kịch bản biên `REG_014` trong `FR-01.json` để mật khẩu phức tạp chỉ sử dụng các ký tự đặc biệt hợp lệ theo đúng FR-01 (`@`, `$`, `!`, `%`, `*`, `?`, `&`); (2) Chuẩn hóa tên các file theo đúng mã số tính năng chuẩn (`FR-01.json`, `FR-07.json`, `FR-18.json`) trong `src/test/test-data/`; (3) Đảm bảo độ bao phủ từ 14 đến 15 test cases/feature (vượt mốc 12 cases), phủ đầy đủ positive, negative và edge cases.

### 2.2.5 Entry 5

**Prompt + Tool:**

Time: `2026-08-24 22:57 +07`
Tool: `Claude Opus 4.6`
Prompt:
/using-superpowers 
Hãy thực hiện các công việc sau để thiết lập dự án Playwright Automation cho HW04:
1. Khởi tạo `package.json` và `playwright.config.ts` với cấu hình:
   - Chạy trên 3 trình duyệt: Chromium, Firefox, WebKit.
   - Base URL mặc định: `http://localhost:5173`.
   - Cấu hình Playwright HTML Reporter hiển thị tiêu đề: `HW04 Automation Testing - Run by: 23127075`.
   - Tạo file helper `tests/helpers/eshop.ts` chứa các hàm dùng chung (gotoHome, login, expectVisibleText...).
2. Viết file test script đầu tiên `tests/feature-a.spec.ts`:
   - Thực thi Data-Driven Testing cho FR-01 bằng cách đọc dữ liệu từ `src/test/test-data/FR-01.json`.
   - Áp dụng ít nhất 3 dạng assertion patterns (URL, Visible Text, Control State).
   - Đảm bảo script cấu trúc rõ ràng, dễ bảo trì và sử dụng các locator ổn định.

**AI Output:** Đã khởi tạo thành công `package.json`, `playwright.config.ts` (cấu hình 3 trình duyệt Chromium/Firefox/WebKit, HTML report title chứa watermark `Run by: 23127075`), `tests/helpers/eshop.ts` (chứa các helper functions login, navigation, text assertion), `tests/feature-a.spec.ts` (script Data-Driven cho FR-01 đọc `src/test/test-data/FR-01.json`, áp dụng đủ 3 dạng assertion patterns: URL, Visible Text, Control State, và ghi nhận bug annotation nếu ô `confirmPassword` bị thiếu trong DOM), và cập nhật file `.gitignore`.

**Verdict:** valid

**Reasoning:** Theo chuẩn ISTQB CT-AI Syllabus (Mục 9.3 - AI-Based Test Generation & Test Automation): AI hỗ trợ sinh tự động khung cấu hình và script kiểm thử E2E giúp tăng tốc độ thiết lập suite automation. Việc tích hợp Data-Driven Testing và multi-assertion patterns (URL, Visible Text, Control State) đảm bảo tính toàn vẹn của kết quả kiểm thử.

**Student Fix:** Sinh viên đã kiểm tra lại file `playwright.config.ts` (đảm bảo cấu hình đúng 3 trình duyệt Chromium/Firefox/WebKit và watermark Student ID), review lại file `tests/feature-a.spec.ts` (xác nhận script đọc đúng dữ liệu từ `FR-01.json`, sử dụng locator bền vững như `getByLabel`, `getByRole` và xử lý bẫy lỗi SUT bị thiếu trường `confirmPassword` một cách có kiểm soát). Sau khi chuẩn hóa cấu trúc bài làm, sinh viên đã refactor các đường dẫn về root `src/`: spec nằm tại `src/test/specs/feature-a.spec.ts`, helper tại `src/test/helpers/eshop.ts`, còn test data tại `src/test/test-data/`.

## 3. Tổng kết độ chính xác AI

- Các nội dung AI tạo đã được rà soát với yêu cầu bài làm: `[TODO]`
- Mức độ chính xác/độ hữu ích tổng quan: `[TODO]`
- Giới hạn hoặc rủi ro còn lại: `[TODO]`

## 4. Kết luận

`[TODO]`

## 5. Disclosure

`[TODO]`
