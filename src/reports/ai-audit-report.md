# AI Audit Report

## 1. Thông tin nhóm
- Họ tên: `Lê Trung Kiên`
- MSSV: `23127075`
- Nhóm/Lớp: `[TODO]`

## 2. Bảng audit

### 2.1. Tóm tắt audit

| STT | Prompt + Tool | Verdict |
| --- | --- | --- |
| 1 | Time: `2026-08-19 23:42 +07`<br>Tool: `Codex / grok-4.6`<br>Prompt:<br>Hãy thực hiện các công việc sau:<br><br>1. Convert req/2026.HW04.Automation<br>   Testing_En.pdf ra file markdown đầy đủ<br>   nội dung và layout. Có 2 bản tiếng anh<br>   tiêng việt. Output trong folder req/<br>2. Sau khi convert xong, check .agents/<br>   skills/ai-audit-entry đã phù hợp cho<br>   project này chưa vì cấu trúc folder đã khác. Mình sẽ làm bài trong folder src | valid |
| 2 | Time: `2026-08-19 23:51 +07`<br>Tool: `Codex / GPT-5.4`<br>Prompt:<br>Thêm rule trong folder req và ai-reasoning là chỉ đọc markdown để tiết kiệm token | valid |
| 3 | Time: `2026-08-20 23:56 +07`<br>Tool: `Gemini 3.6 Flash`<br>Prompt:<br>Convert ref/10_Automation Testing.pdf sang markdown đúng theo nội dung và layout. Các sơ đồ có thể để dưới dạng mermaid, còn các ảnh có thể screenshot. Còn lại nội dung thì chuyển full sang text có heading, bullet points... layout đẹp. Output bỏ vào folder ref. Tạo cả 2 bản tiếng anh và tiếng việt. | valid |
| 4 | Time: `2026-08-21 00:08 +07`<br>Tool: `Gemini 3.6 Flash`<br>Prompt:<br>/using-superpowers Dựa vào eshop-sut/README.md và eshop-sut/api_specification.md hãy phân tích và tạo file test data JSON cho 3 tính năng FR-01, FR-07 và FR-18 (mỗi feature tối thiểu 12 test cases gồm positive, negative, edge cases) lưu vào thư mục src/test/test-data/. | valid |
| 5 | Time: `2026-08-24 22:57 +07`<br>Tool: `Claude Opus 4.6`<br>Prompt:<br>/using-superpowers <br>Hãy thực hiện các công việc sau để thiết lập dự án Playwright Automation cho HW04:<br>1. Khởi tạo `package.json` và `playwright.config.ts` với cấu hình:<br>   - Chạy trên 3 trình duyệt: Chromium, Firefox, WebKit.<br>   - Base URL mặc định: `http://localhost:5173`.<br>   - Cấu hình Playwright HTML Reporter hiển thị tiêu đề: `HW04 Automation Testing - Run by: 23127075`.<br>   - Tạo file helper `tests/helpers/eshop.ts` chứa các hàm dùng chung (gotoHome, login, expectVisibleText...).<br>2. Viết file test script đầu tiên `tests/feature-a.spec.ts`:<br>   - Thực thi Data-Driven Testing cho FR-01 bằng cách đọc dữ liệu từ `src/test/test-data/FR-01.json`.<br>   - Áp dụng ít nhất 3 dạng assertion patterns (URL, Visible Text, Control State).<br>   - Đảm bảo script cấu trúc rõ ràng, dễ bảo trì và sử dụng các locator ổn định. | valid |
| 6 | Time: `2026-08-25 22:32 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)<br><br>Đổi tên src/test/specs/feature-a.spec.ts thành src/test/specs/fr01.spec.ts<br><br>Viết file test script /src/test/specs/fr07.spec.ts:<br><br>- Thực thi Data-Driven Testing cho FR-07: Shopping Cart bằng cách đọc dữ liệu từ src/test/test-data/FR-07.json.<br>- Tạo test case tự động từ toàn bộ mảng testCases trong file JSON.<br>- Áp dụng ít nhất 3 dạng assertion patterns phù hợp:<br>  - URL assertion để kiểm tra điều hướng đến trang giỏ hàng.<br>  - Visible Text assertion để kiểm tra trạng thái giỏ hàng, tên sản phẩm, tổng tiền và thông báo.<br>  - Control State assertion để kiểm tra quantity input, nút tăng/giảm, nút xóa và trạng thái nút checkout.<br>- Sử dụng các locator ổn định như role, label, text hoặc data-testid; tránh locator phụ thuộc vào CSS class thay đổi thường xuyên.<br>- Tách các thao tác dùng chung thành helper functions nếu cần.<br>- Cấu trúc script rõ ràng, dễ bảo trì, mô tả đúng action và expected result của từng test case.<br>- Không hardcode danh sách test case trong file .spec.ts; dữ liệu phải lấy từ FR-07.json. | [Manual by user] |
| 7 | Time: `2026-08-25 22:42 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)<br><br>Viết file test script đầu tiên src/test/specs/fr18.spec.ts:<br><br>- Thực thi Data-Driven Testing cho FR-18: Admin Order Management bằng cách đọc dữ liệu từ src/test/test-data/FR-18.json.<br>- Tạo test case tự động từ toàn bộ mảng testCases trong file JSON.<br>- Áp dụng ít nhất 3 dạng assertion patterns phù hợp:<br>  - URL assertion để kiểm tra truy cập đúng trang quản lý đơn hàng và các trang liên quan.<br>  - Visible Text assertion để kiểm tra danh sách đơn hàng, tiêu đề cột, trạng thái đơn hàng, thông báo lỗi và thông báo thành công.<br>  - Control State assertion để kiểm tra bộ lọc trạng thái, nút thao tác, form cập nhật trạng thái và quyền truy cập của admin.<br>- Bao phủ các hành vi được mô tả trong dữ liệu FR-18, gồm xem danh sách, lọc trạng thái, chuyển trạng thái, trạng thái cuối, kiểm tra XSS và access control.<br>- Sử dụng các locator ổn định như role, label, text hoặc data-testid; tránh locator phụ thuộc vào CSS class thay đổi thường xuyên.<br>- Tách thao tác đăng nhập admin, điều hướng và cập nhật trạng thái thành helper functions nếu cần.<br>- Cấu trúc script rõ ràng, dễ bảo trì và không hardcode danh sách test case trong .spec.ts. | [Manual by user] |
| 8 | Time: `2026-08-26 12:01 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated) FR-18 cần dùng http://localhost:5174 chứ không phải /admin trong user frontend. Hãy kiểm tra rồi sửa lại cho đúng. | [Manual by user] |
| 9 | Time: `2026-08-26 13:47 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated) \\n\\nHãy sửa script để kết quả của lượt chạy có thể set đường dẫn như sau:\\nsrc/findings/\\n├── frXX-run-name/\\n│   ├── test-results/\\n│   └── playwright-report/\\n└── bug-report.md. | [Manual by user] |
| 10 | Time: `2026-08-26 13:58 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)\\n\\nSửa src/test/specs/fr01.spec.ts dựa trên findings tại\\nsrc/findings/fr01-registration-locator-failure/.\\n\\nKết quả:\\n- Chrome, Edge và Firefox đều fail REG_001.\\n- Lỗi: locator.fill timeout khi dùng getByLabel(/họ tên/i).\\n- DOM của SUT có label Họ Tên, Email, Mật khẩu nhưng label không liên kết với input.\\n- SUT không render trường Confirm Password.\\n\\nYêu cầu:\\n- Kiểm tra Register.jsx để xác nhận DOM thực tế.\\n- Thay getByLabel() bằng locator ổn định phù hợp với DOM, ưu tiên role và thứ tự input.\\n- Không sửa source code của EShop SUT.\\n- Không dùng evaluate để xóa required.\\n- Xử lý đúng việc Confirm Password không tồn tại.\\n- Giữ Data-Driven Testing từ FR-01.json.\\n- Giữ URL, Visible Text và Control State assertions.\\n- Chạy lại trên Chrome, Edge và Firefox.\\n- Báo cáo pass/fail chính xác theo từng browser. | [Manual by user] |
| 11 | Time: `2026-08-26 14:17 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)<br><br>Dựa trên findings tại src/findings/fr01-02-fix-locator-fixed/, hãy cải thiện<br>src/test/specs/fr01.spec.ts mà không sửa source code của EShop SUT.<br><br>Kết quả:<br>- Locator đã được sửa và hoạt động trên Chrome, Edge, Firefox.<br>- REG_001 fail trên cả 3 browser vì URL vẫn là /register thay vì /login.<br>- Password Password123! bị SUT từ chối.<br>- Register.jsx dùng regex yêu cầu whitespace thay vì ký tự đặc biệt.<br>- Suite đang serial nên 13 case còn lại không chạy.<br><br>Yêu cầu:<br>- Giữ nguyên expected behavior theo FR-01.json, không hạ thấp assertion để che giấu bug SUT.<br>- Ghi nhận lỗi password validation như một product bug rõ ràng.<br>- Giữ URL, Visible Text và Control State assertions.<br>- Xử lý test case Confirm Password không tồn tại một cách trung thực.<br>- Cân nhắc bỏ serial để các test độc lập vẫn được chạy và findings đầy đủ.<br>- Không sửa source code EShop SUT.<br>- Chạy lại trên Chrome, Edge và Firefox.<br>- Báo cáo chính xác pass/fail/skip và nguyên nhân. | [Manual by user] |
| 12 | Time: `2026-08-26 14:33 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>có, nhưng lệnh này làm gì npx playwright test test/specs/fr07.spec.ts --workers=1 tôi tưởng npm run kia là được rồi | [Manual by user] |
| 13 | Time: `2026-08-26 14:55 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr07-03-shopping-cart-state/, hãy hoàn thiện src/test/specs/fr07.spec.ts mà không sửa source code EShop SUT.<br><br>Kết quả hiện tại:<br>- 9 passed, 9 failed, 24 skipped trên Chrome, Edge và Firefox.<br>- CART_001, CART_008 và CART_014 đã pass.<br>- Cart state đã được giữ đúng khi chuyển route.<br>- CART_002 fail vì SUT hiển thị “Tổng tạm tính” thay vì expected “Tổng cộng”.<br>- CART_003 và CART_004 fail do getByText tên sản phẩm bị strict mode vì tên xuất hiện ở nhiều cart rows.<br>- 24 case được skip vì SUT không có quantity controls, quantity validation hoặc confirmation dialog.<br><br>Yêu cầu:<br>- Sửa assertion tên sản phẩm để giới hạn trong tbody/cart row hoặc dùng getByRole('cell').<br>- Giữ assertion row count riêng biệt cho CART_003 và CART_004.<br>- Assert quantity, subtotal và total amount đúng theo dữ liệu FR-07.json khi các giá trị có thể kiểm chứng.<br>- Không hạ thấp assertion và không sửa source code SUT.<br>- Giữ CART_002 là failure/product bug nếu label thực tế vẫn là “Tổng tạm tính”.<br>- Giữ các case không có control tương ứng ở trạng thái skip với lý do rõ ràng.<br>- Chạy lại toàn bộ 42 lượt trên Chrome, Edge và Firefox bằng --workers=1.<br>- Lưu kết quả vào src/findings/fr07-04-shopping-cart-final/.<br>- Báo cáo chính xác pass/fail/skip và phân biệt lỗi test script với product bug.<br>- Vì bạn đã nắm được web hiện có những sản phẩm nào nên có thể sửa src/test/test-data/FR-07.json nếu cần thiết. | [Manual by user] |
| 14 | Time: `2026-08-26 15:08 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Sửa Json test data của fr07 để có thể test phù hợp với seed data sản phẩm của eshop. Sau đó kiểm tra lại flow của test script của fr07 hiện tại. | [Manual by user] |
| 15 | Time: `2026-08-26 15:10 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên src/test/test-data/FR-07.json đã được cập nhật theo seed data thật của EShop SUT, hãy tiếp tục cải thiện src/test/specs/fr07.spec.ts mà không sửa source code trong eshop-sut.<br><br>Yêu cầu:<br><br>- Giữ Data-Driven Testing bằng toàn bộ mảng testCases trong src/test/test-data/FR-07.json.<br>- Sử dụng đúng productId, productName, price, quantity và subtotal từ JSON; không hardcode sản phẩm hoặc giá trong file .spec.ts.<br>- Với CART_002, bổ sung assertion:<br>  - Đúng tên sản phẩm trong cart row.<br>  - Đúng quantity.<br>  - Đúng subtotal.<br>  - Đúng total amount.<br>  - Đúng số lượng cart row.<br>- Với CART_003:<br>  - Giữ assertion row count riêng biệt.<br>  - Kiểm tra quantity, subtotal và total amount theo JSON.<br>  - Không sửa assertion để che giấu lỗi SUT khi cùng sản phẩm tạo nhiều row.<br>- Với CART_004:<br>  - Kiểm tra đúng hai cart rows.<br>  - Kiểm tra tên từng sản phẩm bằng getByRole('cell') trong đúng row.<br>  - Kiểm tra quantity và subtotal của từng sản phẩm.<br>  - Kiểm tra tổng tiền 88.000.000 theo JSON.<br>- Với CART_005–CART_007 và CART_009–CART_012:<br>  - Giữ trạng thái skip nếu SUT thực tế không có quantity controls, quantity validation hoặc confirmation dialog.<br>  - Ghi lý do skip rõ ràng và phân biệt đây là thiếu chức năng của SUT.<br>- Với CART_001:<br>  - Assert empty message.<br>  - Nếu JSON yêu cầu hasIllustration: true thì kiểm tra illustration thực tế.<br>  - Nếu SUT không render illustration, giữ test fail trung thực hoặc ghi nhận product bug; không bỏ assertion.<br>- Với cart có sản phẩm:<br>  - Assert nút “Tiến hành thanh toán” tồn tại và trạng thái control phù hợp.<br>- Giữ URL assertion cho /cart, visible text assertion và control-state assertion.<br>- Tiếp tục dùng locator ổn định: role, label, text, data-testid hoặc phạm vi tbody/tr/td; tránh CSS class dễ thay đổi.<br>- Không dùng evaluate để can thiệp state hoặc bỏ required.<br>- Không sửa source code EShop SUT.<br>- Không thay đổi expected result chỉ để làm test pass.<br>- Kiểm tra flow addProduct để bảo đảm không dùng page.goto('/cart') sau khi thêm sản phẩm và không làm mất React cart state.<br>- Chạy toàn bộ FR-07 trên Chrome, Edge và Firefox bằng --workers=1.<br>- Lưu kết quả vào:<br>  src/findings/fr07-05-cart-data-aligned/<br>- Báo cáo chính xác pass/fail/skip theo từng browser.<br>- Phân loại rõ lỗi test script, lỗi dữ liệu test và product bug của SUT. | [Manual by user] |
| 16 | Time: `2026-08-26 15:15 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên src/test/specs/fr07.spec.ts hiện tại, hãy sửa helper productCard để tìm product card bằng productName đọc từ src/test/test-data/FR-07.json thay vì dựa vào thứ tự heading với nth(productId - 1). | [Manual by user] |
| 17 | Time: `2026-08-26 15:28 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr18-01/, hãy cải thiện src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Kiểm tra DOM, seed dữ liệu đủ coverage FR-18, cập nhật locator theo các nút hành động thực tế, giữ data-driven testing, assertions và chạy trên Chrome Edge Firefox; lưu findings fr18-02 và báo cáo chính xác. | [Manual by user] |
| 18 | Time: `2026-08-26 16:56 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr18-03-admin-order-isolated-rerun/, hãy khắc phục state isolation cho FR-18.\\n\\n- Không sửa source code frontend/backend trong eshop-sut.\\n- Tạo fixture order riêng cho từng test mutation trong seed-data/fr18-orders.json.\\n- Mỗi case update/cancel/final-state phải có orderId riêng và không được dùng lại order của case khác.\\n- Cập nhật src/test/test-data/FR-18.json theo các orderId mới.\\n- Nếu cần, cập nhật seed script để xóa và tạo lại toàn bộ fixture với ID ổn định.\\n- Bảo đảm seed được thực hiện sau khi server khởi động và trước mỗi browser run.\\n- Không để test mutation ảnh hưởng đến test khác.\\n- Giữ locator theo orderId, Data-Driven Testing, URL/visible-text/control-state assertions.\\n- Kiểm tra final-state delivered/canceled một cách trung thực; nếu SUT vẫn hiển thị action hoặc cho phép cập nhật, giữ failure và phân loại product bug.\\n- Kiểm tra XSS đúng order fixture.\\n- Chạy Chrome, Edge và Firefox với --workers=1.\\n- Lưu kết quả vào src/findings/fr18-04-admin-order-isolated-final/.\\n- Báo cáo pass/fail/skip và phân loại lỗi script, fixture, môi trường, product bug. | [Manual by user] |
| 19 | Time: `2026-08-26 17:24 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr18-04-admin-order-isolated-final-rerun-2/ và kết quả API đã xác nhận backend trả đầy đủ order ID 1–13, hãy sửa src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Cập nhật orderRow theo DOM thực tế, giữ data-driven testing, assertions, fixture isolation, chạy Chrome Edge Firefox, lưu findings fr18-05-admin-order-locator-fixed và báo cáo phân loại lỗi. | [Manual by user] |

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

### 2.2.6 Entry 6

**Prompt + Tool:**

Time: `2026-08-25 22:32 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated)

Đổi tên src/test/specs/feature-a.spec.ts thành src/test/specs/fr01.spec.ts

Viết file test script /src/test/specs/fr07.spec.ts:

- Thực thi Data-Driven Testing cho FR-07: Shopping Cart bằng cách đọc dữ liệu từ src/test/test-data/FR-07.json.
- Tạo test case tự động từ toàn bộ mảng testCases trong file JSON.
- Áp dụng ít nhất 3 dạng assertion patterns phù hợp:
  - URL assertion để kiểm tra điều hướng đến trang giỏ hàng.
  - Visible Text assertion để kiểm tra trạng thái giỏ hàng, tên sản phẩm, tổng tiền và thông báo.
  - Control State assertion để kiểm tra quantity input, nút tăng/giảm, nút xóa và trạng thái nút checkout.
- Sử dụng các locator ổn định như role, label, text hoặc data-testid; tránh locator phụ thuộc vào CSS class thay đổi thường xuyên.
- Tách các thao tác dùng chung thành helper functions nếu cần.
- Cấu trúc script rõ ràng, dễ bảo trì, mô tả đúng action và expected result của từng test case.
- Không hardcode danh sách test case trong file .spec.ts; dữ liệu phải lấy từ FR-07.json.

**AI Output:** Đã đổi tên src/test/specs/feature-a.spec.ts thành fr01.spec.ts và tạo src/test/specs/fr07.spec.ts với 14 test case đọc từ FR-07.json, helper dùng chung và các assertion URL, visible text, control state. Kiểm tra disco...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.7 Entry 7

**Prompt + Tool:**

Time: `2026-08-25 22:42 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated)

Viết file test script đầu tiên src/test/specs/fr18.spec.ts:

- Thực thi Data-Driven Testing cho FR-18: Admin Order Management bằng cách đọc dữ liệu từ src/test/test-data/FR-18.json.
- Tạo test case tự động từ toàn bộ mảng testCases trong file JSON.
- Áp dụng ít nhất 3 dạng assertion patterns phù hợp:
  - URL assertion để kiểm tra truy cập đúng trang quản lý đơn hàng và các trang liên quan.
  - Visible Text assertion để kiểm tra danh sách đơn hàng, tiêu đề cột, trạng thái đơn hàng, thông báo lỗi và thông báo thành công.
  - Control State assertion để kiểm tra bộ lọc trạng thái, nút thao tác, form cập nhật trạng thái và quyền truy cập của admin.
- Bao phủ các hành vi được mô tả trong dữ liệu FR-18, gồm xem danh sách, lọc trạng thái, chuyển trạng thái, trạng thái cuối, kiểm tra XSS và access control.
- Sử dụng các locator ổn định như role, label, text hoặc data-testid; tránh locator phụ thuộc vào CSS class thay đổi thường xuyên.
- Tách thao tác đăng nhập admin, điều hướng và cập nhật trạng thái thành helper functions nếu cần.
- Cấu trúc script rõ ràng, dễ bảo trì và không hardcode danh sách test case trong .spec.ts.

**AI Output:** Đã tạo src/test/specs/fr18.spec.ts với 15 test case đọc từ FR-18.json, helper đăng nhập admin/điều hướng/cập nhật trạng thái, và assertion URL, visible text, control state. Kiểm tra discovery thành công 129 test trên...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.8 Entry 8

**Prompt + Tool:**

Time: `2026-08-26 12:01 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated) FR-18 cần dùng http://localhost:5174 chứ không phải /admin trong user frontend. Hãy kiểm tra rồi sửa lại cho đúng.

**AI Output:** Đã cập nhật src/test/specs/fr18.spec.ts để dùng ADMIN_BASE_URL mặc định http://localhost:5174, đăng nhập tại admin SPA và chọn tab Đơn hàng; cập nhật src/README.md; Playwright discover thành công 45 tests (15 test cas...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.9 Entry 9

**Prompt + Tool:**

Time: `2026-08-26 13:47 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated) \n\nHãy sửa script để kết quả của lượt chạy có thể set đường dẫn như sau:\nsrc/findings/\n├── frXX-run-name/\n│   ├── test-results/\n│   └── playwright-report/\n└── bug-report.md.

**AI Output:** Đã cập nhật src/playwright.config.ts để nhận FINDINGS_DIR, ghi test results và HTML report vào cùng thư mục findings; cập nhật README; xác nhận discovery 42 tests trên Chrome, Edge và Firefox.

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.10 Entry 10

**Prompt + Tool:**

Time: `2026-08-26 13:58 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated)\n\nSửa src/test/specs/fr01.spec.ts dựa trên findings tại\nsrc/findings/fr01-registration-locator-failure/.\n\nKết quả:\n- Chrome, Edge và Firefox đều fail REG_001.\n- Lỗi: locator.fill timeout khi dùng getByLabel(/họ tên/i).\n- DOM của SUT có label Họ Tên, Email, Mật khẩu nhưng label không liên kết với input.\n- SUT không render trường Confirm Password.\n\nYêu cầu:\n- Kiểm tra Register.jsx để xác nhận DOM thực tế.\n- Thay getByLabel() bằng locator ổn định phù hợp với DOM, ưu tiên role và thứ tự input.\n- Không sửa source code của EShop SUT.\n- Không dùng evaluate để xóa required.\n- Xử lý đúng việc Confirm Password không tồn tại.\n- Giữ Data-Driven Testing từ FR-01.json.\n- Giữ URL, Visible Text và Control State assertions.\n- Chạy lại trên Chrome, Edge và Firefox.\n- Báo cáo pass/fail chính xác theo từng browser.

**AI Output:** Đã sửa src/test/specs/fr01.spec.ts dùng role textbox theo thứ tự, bỏ Confirm Password không tồn tại và bỏ evaluate xóa required. Lần chạy tạo findings/fr01-locator-fixed; Chrome/Edge gặp SIGTRAP khi khởi động, Firefox...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.11 Entry 11

**Prompt + Tool:**

Time: `2026-08-26 14:17 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated)

Dựa trên findings tại src/findings/fr01-02-fix-locator-fixed/, hãy cải thiện
src/test/specs/fr01.spec.ts mà không sửa source code của EShop SUT.

Kết quả:
- Locator đã được sửa và hoạt động trên Chrome, Edge, Firefox.
- REG_001 fail trên cả 3 browser vì URL vẫn là /register thay vì /login.
- Password Password123! bị SUT từ chối.
- Register.jsx dùng regex yêu cầu whitespace thay vì ký tự đặc biệt.
- Suite đang serial nên 13 case còn lại không chạy.

Yêu cầu:
- Giữ nguyên expected behavior theo FR-01.json, không hạ thấp assertion để che giấu bug SUT.
- Ghi nhận lỗi password validation như một product bug rõ ràng.
- Giữ URL, Visible Text và Control State assertions.
- Xử lý test case Confirm Password không tồn tại một cách trung thực.
- Cân nhắc bỏ serial để các test độc lập vẫn được chạy và findings đầy đủ.
- Không sửa source code EShop SUT.
- Chạy lại trên Chrome, Edge và Firefox.
- Báo cáo chính xác pass/fail/skip và nguyên nhân.

**AI Output:** Đã bỏ serial trong fr01.spec.ts, skip trung thực REG_012 vì SUT thiếu Confirm Password, giữ nguyên các assertion kỳ vọng và chạy lại 42 lượt trên Chrome, Edge, Firefox. Kết quả: 39 failed, 3 skipped; findings lưu tại...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.12 Entry 12

**Prompt + Tool:**

Time: `2026-08-26 14:33 +07`
Tool: `Codex / GPT-5`
Prompt:
có, nhưng lệnh này làm gì npx playwright test test/specs/fr07.spec.ts --workers=1 tôi tưởng npm run kia là được rồi

**AI Output:** Đã ghi nhận lượt cải thiện FR-07; giải thích npm run test:fr07 là alias của Playwright spec, còn npx playwright test ... --workers=1 chạy trực tiếp với một worker để ổn định khi debug.

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.13 Entry 13

**Prompt + Tool:**

Time: `2026-08-26 14:55 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên findings tại src/findings/fr07-03-shopping-cart-state/, hãy hoàn thiện src/test/specs/fr07.spec.ts mà không sửa source code EShop SUT.

Kết quả hiện tại:
- 9 passed, 9 failed, 24 skipped trên Chrome, Edge và Firefox.
- CART_001, CART_008 và CART_014 đã pass.
- Cart state đã được giữ đúng khi chuyển route.
- CART_002 fail vì SUT hiển thị “Tổng tạm tính” thay vì expected “Tổng cộng”.
- CART_003 và CART_004 fail do getByText tên sản phẩm bị strict mode vì tên xuất hiện ở nhiều cart rows.
- 24 case được skip vì SUT không có quantity controls, quantity validation hoặc confirmation dialog.

Yêu cầu:
- Sửa assertion tên sản phẩm để giới hạn trong tbody/cart row hoặc dùng getByRole('cell').
- Giữ assertion row count riêng biệt cho CART_003 và CART_004.
- Assert quantity, subtotal và total amount đúng theo dữ liệu FR-07.json khi các giá trị có thể kiểm chứng.
- Không hạ thấp assertion và không sửa source code SUT.
- Giữ CART_002 là failure/product bug nếu label thực tế vẫn là “Tổng tạm tính”.
- Giữ các case không có control tương ứng ở trạng thái skip với lý do rõ ràng.
- Chạy lại toàn bộ 42 lượt trên Chrome, Edge và Firefox bằng --workers=1.
- Lưu kết quả vào src/findings/fr07-04-shopping-cart-final/.
- Báo cáo chính xác pass/fail/skip và phân biệt lỗi test script với product bug.
- Vì bạn đã nắm được web hiện có những sản phẩm nào nên có thể sửa src/test/test-data/FR-07.json nếu cần thiết.

**AI Output:** Đã cập nhật src/test/specs/fr07.spec.ts để giới hạn locator trong cart row, bổ sung assertion quantity/subtotal, giữ nguyên expected label và không sửa SUT. Đã chạy 42 lượt trên Chrome, Edge, Firefox với --workers=1:...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.14 Entry 14

**Prompt + Tool:**

Time: `2026-08-26 15:08 +07`
Tool: `Codex / GPT-5`
Prompt:
Sửa Json test data của fr07 để có thể test phù hợp với seed data sản phẩm của eshop. Sau đó kiểm tra lại flow của test script của fr07 hiện tại.

**AI Output:** Đã cập nhật src/test/test-data/FR-07.json theo seed data thật: iPhone 15 Pro Max 30.000.000 và Samsung Galaxy S24 Ultra 28.000.000, đồng thời cập nhật các subtotal/total. Đã kiểm tra JSON hợp lệ và chạy FR-07 trên Chr...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.15 Entry 15

**Prompt + Tool:**

Time: `2026-08-26 15:10 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên src/test/test-data/FR-07.json đã được cập nhật theo seed data thật của EShop SUT, hãy tiếp tục cải thiện src/test/specs/fr07.spec.ts mà không sửa source code trong eshop-sut.

Yêu cầu:

- Giữ Data-Driven Testing bằng toàn bộ mảng testCases trong src/test/test-data/FR-07.json.
- Sử dụng đúng productId, productName, price, quantity và subtotal từ JSON; không hardcode sản phẩm hoặc giá trong file .spec.ts.
- Với CART_002, bổ sung assertion:
  - Đúng tên sản phẩm trong cart row.
  - Đúng quantity.
  - Đúng subtotal.
  - Đúng total amount.
  - Đúng số lượng cart row.
- Với CART_003:
  - Giữ assertion row count riêng biệt.
  - Kiểm tra quantity, subtotal và total amount theo JSON.
  - Không sửa assertion để che giấu lỗi SUT khi cùng sản phẩm tạo nhiều row.
- Với CART_004:
  - Kiểm tra đúng hai cart rows.
  - Kiểm tra tên từng sản phẩm bằng getByRole('cell') trong đúng row.
  - Kiểm tra quantity và subtotal của từng sản phẩm.
  - Kiểm tra tổng tiền 88.000.000 theo JSON.
- Với CART_005–CART_007 và CART_009–CART_012:
  - Giữ trạng thái skip nếu SUT thực tế không có quantity controls, quantity validation hoặc confirmation dialog.
  - Ghi lý do skip rõ ràng và phân biệt đây là thiếu chức năng của SUT.
- Với CART_001:
  - Assert empty message.
  - Nếu JSON yêu cầu hasIllustration: true thì kiểm tra illustration thực tế.
  - Nếu SUT không render illustration, giữ test fail trung thực hoặc ghi nhận product bug; không bỏ assertion.
- Với cart có sản phẩm:
  - Assert nút “Tiến hành thanh toán” tồn tại và trạng thái control phù hợp.
- Giữ URL assertion cho /cart, visible text assertion và control-state assertion.
- Tiếp tục dùng locator ổn định: role, label, text, data-testid hoặc phạm vi tbody/tr/td; tránh CSS class dễ thay đổi.
- Không dùng evaluate để can thiệp state hoặc bỏ required.
- Không sửa source code EShop SUT.
- Không thay đổi expected result chỉ để làm test pass.
- Kiểm tra flow addProduct để bảo đảm không dùng page.goto('/cart') sau khi thêm sản phẩm và không làm mất React cart state.
- Chạy toàn bộ FR-07 trên Chrome, Edge và Firefox bằng --workers=1.
- Lưu kết quả vào:
  src/findings/fr07-05-cart-data-aligned/
- Báo cáo chính xác pass/fail/skip theo từng browser.
- Phân loại rõ lỗi test script, lỗi dữ liệu test và product bug của SUT.

**AI Output:** Đã cải thiện src/test/specs/fr07.spec.ts để dùng dữ liệu sản phẩm và expected values từ FR-07.json, bổ sung assertion tên sản phẩm, quantity, subtotal, total, illustration và checkout control; giữ các case unsupported...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.16 Entry 16

**Prompt + Tool:**

Time: `2026-08-26 15:15 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên src/test/specs/fr07.spec.ts hiện tại, hãy sửa helper productCard để tìm product card bằng productName đọc từ src/test/test-data/FR-07.json thay vì dựa vào thứ tự heading với nth(productId - 1).

**AI Output:** Đã sửa productCard và addProduct để dùng productName từ FR-07.json, thêm helper tra tên theo productId cho các case cần thiết, giữ nguyên assertions và không sửa SUT. Đã chạy 42 lượt trên Chrome, Edge và Firefox: tổng...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.17 Entry 17

**Prompt + Tool:**

Time: `2026-08-26 15:28 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên findings tại src/findings/fr18-01/, hãy cải thiện src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Kiểm tra DOM, seed dữ liệu đủ coverage FR-18, cập nhật locator theo các nút hành động thực tế, giữ data-driven testing, assertions và chạy trên Chrome Edge Firefox; lưu findings fr18-02 và báo cáo chính xác.

**AI Output:** Đã cập nhật fr18.spec.ts theo DOM admin thực tế, status tiếng Việt và action buttons; các filter không tồn tại được skip trung thực. Playwright --list xác nhận 45 test trên Chrome, Edge và Firefox; chưa chạy full vì c...

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.18 Entry 18

**Prompt + Tool:**

Time: `2026-08-26 16:56 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên findings tại src/findings/fr18-03-admin-order-isolated-rerun/, hãy khắc phục state isolation cho FR-18.\n\n- Không sửa source code frontend/backend trong eshop-sut.\n- Tạo fixture order riêng cho từng test mutation trong seed-data/fr18-orders.json.\n- Mỗi case update/cancel/final-state phải có orderId riêng và không được dùng lại order của case khác.\n- Cập nhật src/test/test-data/FR-18.json theo các orderId mới.\n- Nếu cần, cập nhật seed script để xóa và tạo lại toàn bộ fixture với ID ổn định.\n- Bảo đảm seed được thực hiện sau khi server khởi động và trước mỗi browser run.\n- Không để test mutation ảnh hưởng đến test khác.\n- Giữ locator theo orderId, Data-Driven Testing, URL/visible-text/control-state assertions.\n- Kiểm tra final-state delivered/canceled một cách trung thực; nếu SUT vẫn hiển thị action hoặc cho phép cập nhật, giữ failure và phân loại product bug.\n- Kiểm tra XSS đúng order fixture.\n- Chạy Chrome, Edge và Firefox với --workers=1.\n- Lưu kết quả vào src/findings/fr18-04-admin-order-isolated-final/.\n- Báo cáo pass/fail/skip và phân loại lỗi script, fixture, môi trường, product bug.

**AI Output:** Đã mở rộng fixture thành 13 order độc lập, cập nhật FR-18.json để mỗi mutation/final-state/XSS dùng orderId riêng, bổ sung reset sqlite_sequence và kiểm tra ID trong seed script. Seed thành công với order ID 1–13 đúng trạng thái. Lượt Playwright tạo artifacts nhưng không có kết quả hợp lệ vì môi trường/browser không truy cập được localhost:5174 và phát sinh SIGTRAP, Target page has been closed và NS_ERROR_OUT_OF_MEMORY.

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

### 2.2.19 Entry 19

**Prompt + Tool:**

Time: `2026-08-26 17:24 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên findings tại src/findings/fr18-04-admin-order-isolated-final-rerun-2/ và kết quả API đã xác nhận backend trả đầy đủ order ID 1–13, hãy sửa src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Cập nhật orderRow theo DOM thực tế, giữ data-driven testing, assertions, fixture isolation, chạy Chrome Edge Firefox, lưu findings fr18-05-admin-order-locator-fixed và báo cáo phân loại lỗi.

**AI Output:** Đã kiểm tra Admin App.jsx: cột ID thực tế render dạng # o.id. Đã sửa orderRow để tìm cell ID theo regex ^#?orderId$, tránh bắt nhầm số tiền/địa chỉ. Seed/fixture không thay đổi. TypeScript không chạy được vì repository không có tsconfig.json. Playwright probe Chrome vẫn bị môi trường đóng browser với SIGTRAP trước khi vào DOM, nên chưa có báo cáo pass/fail hợp lệ cho lượt fr18-05.

**Verdict:** [Manual by user]

**Reasoning:** [Manual by user]

**Student Fix:** [Manual by user]

## 3. Tổng kết độ chính xác AI
- Các nội dung AI tạo đã được rà soát với yêu cầu bài làm: `[TODO]`
- Mức độ chính xác/độ hữu ích tổng quan: `[TODO]`
- Giới hạn hoặc rủi ro còn lại: `[TODO]`

## 4. Kết luận
`[TODO]`

## 5. Disclosure
`[TODO]`
