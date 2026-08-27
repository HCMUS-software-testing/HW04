# AI Audit Report

## 1. Thông tin nhóm
- Họ tên: `Lê Trung Kiên`
- MSSV: `23127075`
- Nhóm/Lớp: `06-KDBK`

## 2. Bảng audit

### 2.1. Tóm tắt audit

| STT | Prompt + Tool | Verdict |
| --- | --- | --- |
| 1 | Time: `2026-08-19 23:42 +07`<br>Tool: `Codex / grok-4.6`<br>Prompt:<br>Hãy thực hiện các công việc sau:<br><br>1. Convert req/2026.HW04.Automation<br>   Testing_En.pdf ra file markdown đầy đủ<br>   nội dung và layout. Có 2 bản tiếng anh<br>   tiêng việt. Output trong folder req/<br>2. Sau khi convert xong, check .agents/<br>   skills/ai-audit-entry đã phù hợp cho<br>   project này chưa vì cấu trúc folder đã khác. Mình sẽ làm bài trong folder src | valid |
| 2 | Time: `2026-08-19 23:51 +07`<br>Tool: `Codex / GPT-5.4`<br>Prompt:<br>Thêm rule trong folder req và ai-reasoning là chỉ đọc markdown để tiết kiệm token | valid |
| 3 | Time: `2026-08-20 23:56 +07`<br>Tool: `Gemini 3.6 Flash`<br>Prompt:<br>Convert ref/10_Automation Testing.pdf sang markdown đúng theo nội dung và layout. Các sơ đồ có thể để dưới dạng mermaid, còn các ảnh có thể screenshot. Còn lại nội dung thì chuyển full sang text có heading, bullet points... layout đẹp. Output bỏ vào folder ref. Tạo cả 2 bản tiếng anh và tiếng việt. | valid |
| 4 | Time: `2026-08-21 00:08 +07`<br>Tool: `Gemini 3.6 Flash`<br>Prompt:<br>/using-superpowers Dựa vào eshop-sut/README.md và eshop-sut/api_specification.md hãy phân tích và tạo file test data JSON cho 3 tính năng FR-01, FR-07 và FR-18 (mỗi feature tối thiểu 12 test cases gồm positive, negative, edge cases) lưu vào thư mục src/test/test-data/. | valid |
| 5 | Time: `2026-08-24 22:57 +07`<br>Tool: `Claude Opus 4.6`<br>Prompt:<br>/using-superpowers<br>Hãy thực hiện các công việc sau để thiết lập dự án Playwright Automation cho HW04:<br><br>1. Khởi tạo `package.json` và `playwright.config.ts` với cấu hình:<br>   - Chạy trên 3 trình duyệt: Chromium, Firefox, WebKit.<br>   - Base URL mặc định: `http://localhost:5173`.<br>   - Cấu hình Playwright HTML Reporter hiển thị tiêu đề: `HW04 Automation Testing - Run by: 23127075`.<br>   - Tạo file helper `tests/helpers/eshop.ts` chứa các hàm dùng chung (gotoHome, login, expectVisibleText...).<br>2. Viết file test script đầu tiên `tests/feature-a.spec.ts`:<br>   - Thực thi Data-Driven Testing cho FR-01 bằng cách đọc dữ liệu từ `src/test/test-data/FR-01.json`.<br>   - Áp dụng ít nhất 3 dạng assertion patterns (URL, Visible Text, Control State).<br>   - Đảm bảo script cấu trúc rõ ràng, dễ bảo trì và sử dụng các locator ổn định. | valid |
| 6 | Time: `2026-08-25 22:32 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)<br><br>Đổi tên src/test/specs/feature-a.spec.ts thành src/test/specs/fr01.spec.ts<br><br>Viết file test script /src/test/specs/fr07.spec.ts:<br><br>- Thực thi Data-Driven Testing cho FR-07: Shopping Cart bằng cách đọc dữ liệu từ src/test/test-data/FR-07.json.<br>- Tạo test case tự động từ toàn bộ mảng testCases trong file JSON.<br>- Áp dụng ít nhất 3 dạng assertion patterns phù hợp:<br>  - URL assertion để kiểm tra điều hướng đến trang giỏ hàng.<br>  - Visible Text assertion để kiểm tra trạng thái giỏ hàng, tên sản phẩm, tổng tiền và thông báo.<br>  - Control State assertion để kiểm tra quantity input, nút tăng/giảm, nút xóa và trạng thái nút checkout.<br>- Sử dụng các locator ổn định như role, label, text hoặc data-testid; tránh locator phụ thuộc vào CSS class thay đổi thường xuyên.<br>- Tách các thao tác dùng chung thành helper functions nếu cần.<br>- Cấu trúc script rõ ràng, dễ bảo trì, mô tả đúng action và expected result của từng test case.<br>- Không hardcode danh sách test case trong file .spec.ts; dữ liệu phải lấy từ FR-07.json. | valid |
| 7 | Time: `2026-08-25 22:42 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)<br><br>Viết file test script đầu tiên src/test/specs/fr18.spec.ts:<br><br>- Thực thi Data-Driven Testing cho FR-18: Admin Order Management bằng cách đọc dữ liệu từ src/test/test-data/FR-18.json.<br>- Tạo test case tự động từ toàn bộ mảng testCases trong file JSON.<br>- Áp dụng ít nhất 3 dạng assertion patterns phù hợp:<br>  - URL assertion để kiểm tra truy cập đúng trang quản lý đơn hàng và các trang liên quan.<br>  - Visible Text assertion để kiểm tra danh sách đơn hàng, tiêu đề cột, trạng thái đơn hàng, thông báo lỗi và thông báo thành công.<br>  - Control State assertion để kiểm tra bộ lọc trạng thái, nút thao tác, form cập nhật trạng thái và quyền truy cập của admin.<br>- Bao phủ các hành vi được mô tả trong dữ liệu FR-18, gồm xem danh sách, lọc trạng thái, chuyển trạng thái, trạng thái cuối, kiểm tra XSS và access control.<br>- Sử dụng các locator ổn định như role, label, text hoặc data-testid; tránh locator phụ thuộc vào CSS class thay đổi thường xuyên.<br>- Tách thao tác đăng nhập admin, điều hướng và cập nhật trạng thái thành helper functions nếu cần.<br>- Cấu trúc script rõ ràng, dễ bảo trì và không hardcode danh sách test case trong .spec.ts. | valid |
| 8 | Time: `2026-08-26 12:01 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated) FR-18 cần dùng http://localhost:5174 chứ không phải /admin trong user frontend. Hãy kiểm tra rồi sửa lại cho đúng. | valid |
| 9 | Time: `2026-08-26 13:47 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated) \\n\\nHãy sửa script để kết quả của lượt chạy có thể set đường dẫn như sau:\\nsrc/findings/\\n├── frXX-run-name/\\n│   ├── test-results/\\n│   └── playwright-report/\\n└── bug-report.md. | valid |
| 10 | Time: `2026-08-26 13:58 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)\\n\\nSửa src/test/specs/fr01.spec.ts dựa trên findings tại\\nsrc/findings/fr01-registration-locator-failure/.\\n\\nKết quả:\\n- Chrome, Edge và Firefox đều fail REG_001.\\n- Lỗi: locator.fill timeout khi dùng getByLabel(/họ tên/i).\\n- DOM của SUT có label Họ Tên, Email, Mật khẩu nhưng label không liên kết với input.\\n- SUT không render trường Confirm Password.\\n\\nYêu cầu:\\n- Kiểm tra Register.jsx để xác nhận DOM thực tế.\\n- Thay getByLabel() bằng locator ổn định phù hợp với DOM, ưu tiên role và thứ tự input.\\n- Không sửa source code của EShop SUT.\\n- Không dùng evaluate để xóa required.\\n- Xử lý đúng việc Confirm Password không tồn tại.\\n- Giữ Data-Driven Testing từ FR-01.json.\\n- Giữ URL, Visible Text và Control State assertions.\\n- Chạy lại trên Chrome, Edge và Firefox.\\n- Báo cáo pass/fail chính xác theo từng browser. | valid |
| 11 | Time: `2026-08-26 14:17 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated)<br><br>Dựa trên findings tại src/findings/fr01-02-fix-locator-fixed/, hãy cải thiện<br>src/test/specs/fr01.spec.ts mà không sửa source code của EShop SUT.<br><br>Kết quả:<br><br>- Locator đã được sửa và hoạt động trên Chrome, Edge, Firefox.<br>- REG_001 fail trên cả 3 browser vì URL vẫn là /register thay vì /login.<br>- Password Password123! bị SUT từ chối.<br>- Register.jsx dùng regex yêu cầu whitespace thay vì ký tự đặc biệt.<br>- Suite đang serial nên 13 case còn lại không chạy.<br><br>Yêu cầu:<br><br>- Giữ nguyên expected behavior theo FR-01.json, không hạ thấp assertion để che giấu bug SUT.<br>- Ghi nhận lỗi password validation như một product bug rõ ràng.<br>- Giữ URL, Visible Text và Control State assertions.<br>- Xử lý test case Confirm Password không tồn tại một cách trung thực.<br>- Cân nhắc bỏ serial để các test độc lập vẫn được chạy và findings đầy đủ.<br>- Không sửa source code EShop SUT.<br>- Chạy lại trên Chrome, Edge và Firefox.<br>- Báo cáo chính xác pass/fail/skip và nguyên nhân. | valid |
| 12 | Time: `2026-08-26 14:33 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>có, nhưng lệnh này làm gì npx playwright test test/specs/fr07.spec.ts --workers=1 tôi tưởng npm run kia là được rồi | valid |
| 13 | Time: `2026-08-26 14:55 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr07-03-shopping-cart-state/, hãy hoàn thiện src/test/specs/fr07.spec.ts mà không sửa source code EShop SUT.<br><br>Kết quả hiện tại:<br><br>- 9 passed, 9 failed, 24 skipped trên Chrome, Edge và Firefox.<br>- CART_001, CART_008 và CART_014 đã pass.<br>- Cart state đã được giữ đúng khi chuyển route.<br>- CART_002 fail vì SUT hiển thị “Tổng tạm tính” thay vì expected “Tổng cộng”.<br>- CART_003 và CART_004 fail do getByText tên sản phẩm bị strict mode vì tên xuất hiện ở nhiều cart rows.<br>- 24 case được skip vì SUT không có quantity controls, quantity validation hoặc confirmation dialog.<br><br>Yêu cầu:<br><br>- Sửa assertion tên sản phẩm để giới hạn trong tbody/cart row hoặc dùng getByRole('cell').<br>- Giữ assertion row count riêng biệt cho CART_003 và CART_004.<br>- Assert quantity, subtotal và total amount đúng theo dữ liệu FR-07.json khi các giá trị có thể kiểm chứng.<br>- Không hạ thấp assertion và không sửa source code SUT.<br>- Giữ CART_002 là failure/product bug nếu label thực tế vẫn là “Tổng tạm tính”.<br>- Giữ các case không có control tương ứng ở trạng thái skip với lý do rõ ràng.<br>- Chạy lại toàn bộ 42 lượt trên Chrome, Edge và Firefox bằng --workers=1.<br>- Lưu kết quả vào src/findings/fr07-04-shopping-cart-final/.<br>- Báo cáo chính xác pass/fail/skip và phân biệt lỗi test script với product bug.<br>- Vì bạn đã nắm được web hiện có những sản phẩm nào nên có thể sửa src/test/test-data/FR-07.json nếu cần thiết. | valid |
| 14 | Time: `2026-08-26 15:08 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Sửa Json test data của fr07 để có thể test phù hợp với seed data sản phẩm của eshop. Sau đó kiểm tra lại flow của test script của fr07 hiện tại. | valid |
| 15 | Time: `2026-08-26 15:10 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên src/test/test-data/FR-07.json đã được cập nhật theo seed data thật của EShop SUT, hãy tiếp tục cải thiện src/test/specs/fr07.spec.ts mà không sửa source code trong eshop-sut.<br><br>Yêu cầu:<br><br>- Giữ Data-Driven Testing bằng toàn bộ mảng testCases trong src/test/test-data/FR-07.json.<br>- Sử dụng đúng productId, productName, price, quantity và subtotal từ JSON; không hardcode sản phẩm hoặc giá trong file .spec.ts.<br>- Với CART_002, bổ sung assertion:<br>  - Đúng tên sản phẩm trong cart row.<br>  - Đúng quantity.<br>  - Đúng subtotal.<br>  - Đúng total amount.<br>  - Đúng số lượng cart row.<br>- Với CART_003:<br>  - Giữ assertion row count riêng biệt.<br>  - Kiểm tra quantity, subtotal và total amount theo JSON.<br>  - Không sửa assertion để che giấu lỗi SUT khi cùng sản phẩm tạo nhiều row.<br>- Với CART_004:<br>  - Kiểm tra đúng hai cart rows.<br>  - Kiểm tra tên từng sản phẩm bằng getByRole('cell') trong đúng row.<br>  - Kiểm tra quantity và subtotal của từng sản phẩm.<br>  - Kiểm tra tổng tiền 88.000.000 theo JSON.<br>- Với CART_005–CART_007 và CART_009–CART_012:<br>  - Giữ trạng thái skip nếu SUT thực tế không có quantity controls, quantity validation hoặc confirmation dialog.<br>  - Ghi lý do skip rõ ràng và phân biệt đây là thiếu chức năng của SUT.<br>- Với CART_001:<br>  - Assert empty message.<br>  - Nếu JSON yêu cầu hasIllustration: true thì kiểm tra illustration thực tế.<br>  - Nếu SUT không render illustration, giữ test fail trung thực hoặc ghi nhận product bug; không bỏ assertion.<br>- Với cart có sản phẩm:<br>  - Assert nút “Tiến hành thanh toán” tồn tại và trạng thái control phù hợp.<br>- Giữ URL assertion cho /cart, visible text assertion và control-state assertion.<br>- Tiếp tục dùng locator ổn định: role, label, text, data-testid hoặc phạm vi tbody/tr/td; tránh CSS class dễ thay đổi.<br>- Không dùng evaluate để can thiệp state hoặc bỏ required.<br>- Không sửa source code EShop SUT.<br>- Không thay đổi expected result chỉ để làm test pass.<br>- Kiểm tra flow addProduct để bảo đảm không dùng page.goto('/cart') sau khi thêm sản phẩm và không làm mất React cart state.<br>- Chạy toàn bộ FR-07 trên Chrome, Edge và Firefox bằng --workers=1.<br>- Lưu kết quả vào:<br>  src/findings/fr07-05-cart-data-aligned/<br>- Báo cáo chính xác pass/fail/skip theo từng browser.<br>- Phân loại rõ lỗi test script, lỗi dữ liệu test và product bug của SUT. | valid |
| 16 | Time: `2026-08-26 15:15 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên src/test/specs/fr07.spec.ts hiện tại, hãy sửa helper productCard để tìm product card bằng productName đọc từ src/test/test-data/FR-07.json thay vì dựa vào thứ tự heading với nth(productId - 1). | valid |
| 17 | Time: `2026-08-26 15:28 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr18-01/, hãy cải thiện src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Kiểm tra DOM, seed dữ liệu đủ coverage FR-18, cập nhật locator theo các nút hành động thực tế, giữ data-driven testing, assertions và chạy trên Chrome Edge Firefox; lưu findings fr18-02 và báo cáo chính xác. | valid |
| 18 | Time: `2026-08-26 16:56 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr18-03-admin-order-isolated-rerun/, hãy khắc phục state isolation cho FR-18.\\n\\n- Không sửa source code frontend/backend trong eshop-sut.\\n- Tạo fixture order riêng cho từng test mutation trong seed-data/fr18-orders.json.\\n- Mỗi case update/cancel/final-state phải có orderId riêng và không được dùng lại order của case khác.\\n- Cập nhật src/test/test-data/FR-18.json theo các orderId mới.\\n- Nếu cần, cập nhật seed script để xóa và tạo lại toàn bộ fixture với ID ổn định.\\n- Bảo đảm seed được thực hiện sau khi server khởi động và trước mỗi browser run.\\n- Không để test mutation ảnh hưởng đến test khác.\\n- Giữ locator theo orderId, Data-Driven Testing, URL/visible-text/control-state assertions.\\n- Kiểm tra final-state delivered/canceled một cách trung thực; nếu SUT vẫn hiển thị action hoặc cho phép cập nhật, giữ failure và phân loại product bug.\\n- Kiểm tra XSS đúng order fixture.\\n- Chạy Chrome, Edge và Firefox với --workers=1.\\n- Lưu kết quả vào src/findings/fr18-04-admin-order-isolated-final/.\\n- Báo cáo pass/fail/skip và phân loại lỗi script, fixture, môi trường, product bug. | partially valid |
| 19 | Time: `2026-08-26 17:24 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>Dựa trên findings tại src/findings/fr18-04-admin-order-isolated-final-rerun-2/ và kết quả API đã xác nhận backend trả đầy đủ order ID 1–13, hãy sửa src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Cập nhật orderRow theo DOM thực tế, giữ data-driven testing, assertions, fixture isolation, chạy Chrome Edge Firefox, lưu findings fr18-05-admin-order-locator-fixed và báo cáo phân loại lỗi. | valid |
| 20 | Time: `2026-08-26 20:24 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated) Tổng hợp các bug từ folder src/findings (ngoại từ các folder chạy lần cuối final của từng feature trên các trình duyệt để xíu kiểm dò lại script cuối kiêm đủ không). Sau đó cho ra output dạng file markdown để hoàn thành yêu cầu trong folder req. | valid |
| 21 | Time: `2026-08-26 20:31 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated) Thêm các file cần thiết vào folder src để đầy đủ yêu cầu trong folder req. Những phần nào có file riêng thì file main chỉ cần ghi đường dẫn, không cần ghi lại. Phần nào chưa có thì để placeholder trong các file đó. Ghi audit cho prompt này. | valid |
| 22 | Time: `2026-08-26 21:10 +07`<br>Tool: `Codex / GPT-5`<br>Prompt:<br>[@superpowers](plugin://superpowers@openai-api-curated) [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/399942ed/skills/writing-skills/SKILL.md) <br>Folder src hiện đang là nội dung bài làm của tôi, dựa vào các thành phần trong folder đó kết hợp với slide bài giảng trong folder ref, hãy tạo bộ skill automation-tesing để hoàn thành yêu cầu đề trong folder req. Bộ skill nên tách ra từng bước thành các subskill:<br>- Nhận input spec của project (Ví dụ eshop-sut) rồi tạo test data<br>- Sau đó cài playwright và tạo script, cho chọn đầu ra (output path) findings và report khi chạy playwright.<br>- Tạo folder findíng, gom findings thành bug report<br>Việc chia subskill sẽ do bạn quyết định, miễn là tách thành các bước rõ ràng, logic, đúng với yêu cầu đề. Bạn hãy tham khảo ai audit để hiểu quá trình tôi làm bài. Ngoài ra, bộ skill phải đạt được tính độc lập, portable, tái sử dụng cho các project khác chứ không chỉ eshop-sut, không cần phải bỏ slide vô cho những lần sau (bạn hãy trích xuất kiến thức từ slide vào skill này).  Hãy ghi lần prompt này vào ai audit và ghi hướng dẫn sử dụng bộ skill ở root. | valid |

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

**Reasoning:** Kết quả phù hợp mục tiêu chuyển tài liệu sang Markdown và điều chỉnh skill theo cấu trúc repository. Việc dùng Markdown làm nguồn đọc giúp workflow nhất quán.

**Student Fix:** Sinh viên đã dò lại file markdown được convert đúng, còn bộ skill thì đúng đường dẫn.

### 2.2.2 Entry 2

**Prompt + Tool:**

Time: `2026-08-19 23:51 +07`
Tool: `Codex / GPT-5.4`
Prompt:
Thêm rule trong folder req và ai-reasoning là chỉ đọc markdown để tiết kiệm token

**AI Output:** Đã tạo req/AGENTS.md, siết ai-reasoning/AGENTS.md thành chỉ đọc *.md, và cập nhật AGENTS.md gốc để trỏ hai rule này.

**Verdict:** valid

**Reasoning:** Rule chỉ đọc Markdown là thay đổi đúng phạm vi và giảm nguy cơ đọc nhầm PDF trong quá trình làm bài.

**Student Fix:** Sinh viên đã đọc lại AGENTS.md trong `req/` và `ai-reasoning/`, xác nhận rule chỉ trỏ file `.md` và không còn đọc PDF.

### 2.2.3 Entry 3

**Prompt + Tool:**

Time: `2026-08-20 23:56 +07`
Tool: `Gemini 3.6 Flash`
Prompt:
Convert ref/10_Automation Testing.pdf sang markdown đúng theo nội dung và layout. Các sơ đồ có thể để dưới dạng mermaid, còn các ảnh có thể screenshot. Còn lại nội dung thì chuyển full sang text có heading, bullet points... layout đẹp. Output bỏ vào folder ref. Tạo cả 2 bản tiếng anh và tiếng việt.

**AI Output:** Đã chuyển đổi file ref/10_Automation Testing.pdf sang 2 file Markdown: ref/10_Automation Testing_En.md (bản tiếng Anh) và ref/10_Automation Testing_Vi.md (bản tiếng Việt). Toàn bộ nội dung slide được chuyển thành văn bản chuẩn đẹp với tiêu đề, danh sách bullet points, bảng dữ liệu khảo sát và các sơ đồ quy trình/DevOps/Test Pyramid được mô phỏng bằng Mermaid.

**Verdict:** valid

**Reasoning:** Đầu ra chuyển nội dung slide thành tài liệu có cấu trúc và giữ được sơ đồ dưới dạng Mermaid. Sinh viên vẫn cần đối chiếu bản gốc khi dùng làm tài liệu tham khảo.

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

**AI Output:** Đã đổi tên src/test/specs/feature-a.spec.ts thành fr01.spec.ts và tạo src/test/specs/fr07.spec.ts với 14 test case đọc từ FR-07.json, helper dùng chung và các assertion URL, visible text, control state. Kiểm tra discovery thành công trên các browser đã cấu hình.

**Verdict:** valid

**Reasoning:** Đầu ra đáp ứng yêu cầu data-driven và ba nhóm assertion. Discovery thành công chứng minh cấu trúc test hợp lệ, nhưng chưa chứng minh behavior thực tế trên SUT.

**Student Fix:** Sinh viên đã đổi tên spec theo mã FR và tiếp tục kiểm tra locator, dữ liệu và behavior thực tế trước các lượt sửa tiếp theo.

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

**AI Output:** Đã tạo src/test/specs/fr18.spec.ts với 15 test case đọc từ FR-18.json, helper đăng nhập admin/điều hướng/cập nhật trạng thái, và assertion URL, visible text, control state. Kiểm tra discovery thành công 129 test trên ba browser project.

**Verdict:** valid

**Reasoning:** Script đáp ứng số lượng case, data-driven testing và assertion patterns; locator và behavior admin vẫn cần được kiểm chứng bằng DOM thực tế.

**Student Fix:** Sinh viên xác định FR-18 chạy trên admin frontend riêng và bổ sung kiểm tra DOM, seed data và isolation.

### 2.2.8 Entry 8

**Prompt + Tool:**

Time: `2026-08-26 12:01 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated) FR-18 cần dùng http://localhost:5174 chứ không phải /admin trong user frontend. Hãy kiểm tra rồi sửa lại cho đúng.

**AI Output:** Đã cập nhật src/test/specs/fr18.spec.ts để dùng ADMIN_BASE_URL mặc định http://localhost:5174, đăng nhập tại admin SPA và chọn tab Đơn hàng; cập nhật src/README.md; Playwright discovery thành công 45 tests, tương ứng 15 test cases trên mỗi browser project.

**Verdict:** valid

**Reasoning:** Sửa đúng boundary giữa user frontend và admin frontend. Discovery xác nhận 15 case được nhân trên ba browser project.

**Student Fix:** Sinh viên sử dụng `ADMIN_BASE_URL=http://localhost:5174` và giữ route admin độc lập.

### 2.2.9 Entry 9

**Prompt + Tool:**

Time: `2026-08-26 13:47 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated) \n\nHãy sửa script để kết quả của lượt chạy có thể set đường dẫn như sau:\nsrc/findings/\n├── frXX-run-name/\n│   ├── test-results/\n│   └── playwright-report/\n└── bug-report.md.

**AI Output:** Đã cập nhật src/playwright.config.ts để nhận FINDINGS_DIR, ghi test results và HTML report vào cùng thư mục findings; cập nhật README; xác nhận discovery 42 tests trên Chrome, Edge và Firefox.

**Verdict:** valid

**Reasoning:** Cấu hình cho phép tách artifacts theo lượt chạy, phù hợp yêu cầu lưu HTML report và evidence; kết quả vẫn phải đến từ execution thật.

**Student Fix:** Sinh viên dùng `FINDINGS_DIR` để đặt tên evidence theo feature và mục đích kiểm tra.

### 2.2.10 Entry 10

**Prompt + Tool:**

Time: `2026-08-26 13:58 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated)\n\nSửa src/test/specs/fr01.spec.ts dựa trên findings tại\nsrc/findings/fr01-registration-locator-failure/.\n\nKết quả:\n- Chrome, Edge và Firefox đều fail REG_001.\n- Lỗi: locator.fill timeout khi dùng getByLabel(/họ tên/i).\n- DOM của SUT có label Họ Tên, Email, Mật khẩu nhưng label không liên kết với input.\n- SUT không render trường Confirm Password.\n\nYêu cầu:\n- Kiểm tra Register.jsx để xác nhận DOM thực tế.\n- Thay getByLabel() bằng locator ổn định phù hợp với DOM, ưu tiên role và thứ tự input.\n- Không sửa source code của EShop SUT.\n- Không dùng evaluate để xóa required.\n- Xử lý đúng việc Confirm Password không tồn tại.\n- Giữ Data-Driven Testing từ FR-01.json.\n- Giữ URL, Visible Text và Control State assertions.\n- Chạy lại trên Chrome, Edge và Firefox.\n- Báo cáo pass/fail chính xác theo từng browser.

**AI Output:** Đã sửa src/test/specs/fr01.spec.ts dùng role textbox theo thứ tự, bỏ Confirm Password không tồn tại và bỏ evaluate xóa required. Lần chạy tạo findings/fr01-locator-fixed; Chrome/Edge gặp SIGTRAP khi khởi động, còn Firefox chạy nhưng ghi nhận các lỗi assertion thực tế của SUT.

**Verdict:** valid

**Reasoning:** Locator cũ không phù hợp DOM thực tế và Confirm Password không tồn tại. Bỏ `evaluate` và giữ failure/skip trung thực phù hợp nguyên tắc test oracle.

**Student Fix:** Sinh viên kiểm tra DOM Register.jsx, giữ bằng chứng lỗi SUT và chạy riêng từng browser khi môi trường cho phép.

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

**AI Output:** Đã bỏ serial trong fr01.spec.ts, skip trung thực REG_012 vì SUT thiếu Confirm Password, giữ nguyên các assertion kỳ vọng và chạy lại 42 lượt trên Chrome, Edge, Firefox. Kết quả: 39 failed, 3 skipped; findings được lưu trong thư mục chạy FR-01 tương ứng.

**Verdict:** valid

**Reasoning:** Bỏ serial giúp các case độc lập tiếp tục chạy và tạo evidence đầy đủ hơn; failure còn lại cần phân loại qua findings.

**Student Fix:** Sinh viên giữ REG_012 ở trạng thái skip có lý do và không hạ expected behavior để làm suite pass.

### 2.2.12 Entry 12

**Prompt + Tool:**

Time: `2026-08-26 14:33 +07`
Tool: `Codex / GPT-5`
Prompt:
có, nhưng lệnh này làm gì npx playwright test test/specs/fr07.spec.ts --workers=1 tôi tưởng npm run kia là được rồi

**AI Output:** Đã ghi nhận lượt cải thiện FR-07; giải thích npm run test:fr07 là alias của Playwright spec, còn npx playwright test ... --workers=1 chạy trực tiếp với một worker để ổn định khi debug.

**Verdict:** valid

**Reasoning:** Đây là hướng dẫn vận hành chính xác: npm script là alias, còn `--workers=1` kiểm soát concurrency để giảm nhiễu khi debug stateful tests.

**Student Fix:** Sinh viên dùng script npm cho chạy thường ngày và thêm `--workers=1` khi tạo evidence ổn định.

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

**AI Output:** Đã cập nhật src/test/specs/fr07.spec.ts để giới hạn locator trong cart row, bổ sung assertion quantity/subtotal, giữ nguyên expected label và không sửa SUT. Đã chạy 42 lượt trên Chrome, Edge, Firefox với --workers=1; kết quả được lưu vào findings và các lỗi còn lại được phân loại theo script hoặc product bug.

**Verdict:** valid

**Reasoning:** Sửa đã giới hạn locator trong cart row và giữ expected label để phát hiện mismatch của SUT. Các skip được giữ vì control tương ứng không có trong Cart.jsx.

**Student Fix:** Sinh viên đối chiếu Cart.jsx, phân biệt lỗi locator với product gap và giữ failure/skip có thể giải thích.

### 2.2.14 Entry 14

**Prompt + Tool:**

Time: `2026-08-26 15:08 +07`
Tool: `Codex / GPT-5`
Prompt:
Sửa Json test data của fr07 để có thể test phù hợp với seed data sản phẩm của eshop. Sau đó kiểm tra lại flow của test script của fr07 hiện tại.

**AI Output:** Đã cập nhật src/test/test-data/FR-07.json theo seed data thật: iPhone 15 Pro Max 30.000.000 và Samsung Galaxy S24 Ultra 28.000.000, đồng thời cập nhật các subtotal/total. Đã kiểm tra JSON hợp lệ và chạy FR-07 trên Chrome, Edge và Firefox.

**Verdict:** valid

**Reasoning:** Test data phải phản ánh seed data thật để tránh false failure do fixture sai. Kiểm tra JSON hợp lệ chưa thay thế full browser verification.

**Student Fix:** Sinh viên cập nhật tên, giá và subtotal theo sản phẩm seed thật, sau đó dùng findings để tiếp tục kiểm tra flow.

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

**AI Output:** Đã cải thiện src/test/specs/fr07.spec.ts để dùng dữ liệu sản phẩm và expected values từ FR-07.json, bổ sung assertion tên sản phẩm, quantity, subtotal, total, illustration và checkout control; giữ các case unsupported ở trạng thái skip với lý do rõ ràng.

**Verdict:** valid

**Reasoning:** Script tăng coverage bằng expected values từ JSON và control-state checks; giữ skip/failure trung thực khi SUT thiếu chức năng.

**Student Fix:** Sinh viên tiếp tục rà soát product-card locator và flow addProduct để loại lỗi test script trước khi kết luận product bug.

### 2.2.16 Entry 16

**Prompt + Tool:**

Time: `2026-08-26 15:15 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên src/test/specs/fr07.spec.ts hiện tại, hãy sửa helper productCard để tìm product card bằng productName đọc từ src/test/test-data/FR-07.json thay vì dựa vào thứ tự heading với nth(productId - 1).

**AI Output:** Đã sửa productCard và addProduct để dùng productName từ FR-07.json, thêm helper tra tên theo productId cho các case cần thiết, giữ nguyên assertions và không sửa SUT. Đã chạy 42 lượt trên Chrome, Edge và Firefox; kết quả được lưu tại src/findings/fr07-06-product-card-by-name/.

**Verdict:** valid

**Reasoning:** Chọn product card theo tên từ JSON bền vững hơn phụ thuộc thứ tự heading và vẫn bảo toàn data-driven oracle.

**Student Fix:** Sinh viên kiểm tra final findings để xác nhận còn lỗi nào thuộc locator hay thuộc behavior của SUT.

### 2.2.17 Entry 17

**Prompt + Tool:**

Time: `2026-08-26 15:28 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên findings tại src/findings/fr18-01/, hãy cải thiện src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Kiểm tra DOM, seed dữ liệu đủ coverage FR-18, cập nhật locator theo các nút hành động thực tế, giữ data-driven testing, assertions và chạy trên Chrome Edge Firefox; lưu findings fr18-02 và báo cáo chính xác.

**AI Output:** Đã cập nhật fr18.spec.ts theo DOM admin thực tế, status tiếng Việt và action buttons; các filter không tồn tại được skip trung thực. Playwright --list xác nhận 45 test trên Chrome, Edge và Firefox; full run được giữ lại để thực hiện sau khi hoàn tất fixture seed.

**Verdict:** valid

**Reasoning:** Cập nhật theo DOM thật và action button thực tế là cần thiết; filter không tồn tại nên skip có lý do, không phải pass giả.

**Student Fix:** Sinh viên bổ sung fixture FR-18 và yêu cầu seed trước khi chạy full suite.

### 2.2.18 Entry 18

**Prompt + Tool:**

Time: `2026-08-26 16:56 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên findings tại src/findings/fr18-03-admin-order-isolated-rerun/, hãy khắc phục state isolation cho FR-18.\n\n- Không sửa source code frontend/backend trong eshop-sut.\n- Tạo fixture order riêng cho từng test mutation trong seed-data/fr18-orders.json.\n- Mỗi case update/cancel/final-state phải có orderId riêng và không được dùng lại order của case khác.\n- Cập nhật src/test/test-data/FR-18.json theo các orderId mới.\n- Nếu cần, cập nhật seed script để xóa và tạo lại toàn bộ fixture với ID ổn định.\n- Bảo đảm seed được thực hiện sau khi server khởi động và trước mỗi browser run.\n- Không để test mutation ảnh hưởng đến test khác.\n- Giữ locator theo orderId, Data-Driven Testing, URL/visible-text/control-state assertions.\n- Kiểm tra final-state delivered/canceled một cách trung thực; nếu SUT vẫn hiển thị action hoặc cho phép cập nhật, giữ failure và phân loại product bug.\n- Kiểm tra XSS đúng order fixture.\n- Chạy Chrome, Edge và Firefox với --workers=1.\n- Lưu kết quả vào src/findings/fr18-04-admin-order-isolated-final/.\n- Báo cáo pass/fail/skip và phân loại lỗi script, fixture, môi trường, product bug.

**AI Output:** Đã mở rộng fixture thành 13 order độc lập, cập nhật FR-18.json để mỗi mutation/final-state/XSS dùng orderId riêng, bổ sung reset sqlite_sequence và kiểm tra ID trong seed script. Seed thành công với order ID 1–13 đúng trạng thái. Lượt Playwright tạo artifacts nhưng không có kết quả hợp lệ vì môi trường/browser không truy cập được localhost:5174 và phát sinh SIGTRAP, Target page has been closed và NS_ERROR_OUT_OF_MEMORY.

**Verdict:** partially valid

**Reasoning:** Fixture isolation và stable IDs là thiết kế đúng, nhưng lượt chạy chưa có kết quả Playwright hợp lệ do môi trường/browser; không thể dùng artifacts đó để kết luận behavior.

**Student Fix:** Sinh viên kiểm tra database, seed 13 order độc lập và chạy lại sau khi server/môi trường hoạt động.

### 2.2.19 Entry 19

**Prompt + Tool:**

Time: `2026-08-26 17:24 +07`
Tool: `Codex / GPT-5`
Prompt:
Dựa trên findings tại src/findings/fr18-04-admin-order-isolated-final-rerun-2/ và kết quả API đã xác nhận backend trả đầy đủ order ID 1–13, hãy sửa src/test/specs/fr18.spec.ts mà không sửa source code trong eshop-sut. Cập nhật orderRow theo DOM thực tế, giữ data-driven testing, assertions, fixture isolation, chạy Chrome Edge Firefox, lưu findings fr18-05-admin-order-locator-fixed và báo cáo phân loại lỗi.

**AI Output:** Đã kiểm tra Admin App.jsx: cột ID thực tế render dạng # o.id. Đã sửa orderRow để tìm cell ID theo regex ^#?orderId$, tránh bắt nhầm số tiền/địa chỉ. Seed/fixture không thay đổi. TypeScript không chạy được vì repository không có tsconfig.json. Playwright probe Chrome vẫn bị môi trường đóng browser với SIGTRAP trước khi vào DOM, nên chưa có báo cáo pass/fail hợp lệ cho lượt fr18-05.

**Verdict:** valid

**Reasoning:** Locator được sửa theo cấu trúc ID thực tế và tránh bắt nhầm số trong các cell khác; giới hạn execution do môi trường được ghi nhận chính xác.

**Student Fix:** Sinh viên xác nhận API trả đủ order ID và tiếp tục chạy từng browser sau khi xử lý môi trường.

### 2.2.20 Entry 20

**Prompt + Tool:**

Time: `2026-08-26 20:24 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated) Tổng hợp các bug từ folder src/findings (ngoại từ các folder chạy lần cuối final của từng feature trên các trình duyệt để xíu kiểm dò lại script cuối kiêm đủ không). Sau đó cho ra output dạng file markdown để hoàn thành yêu cầu trong folder req.

**AI Output:**

```markdown
# Bug Report — EShop SUT

## Scope

This report consolidates reproducible findings from `src/findings/`, excluding the latest final-run folders reserved for final script verification (`fr01-03-independent-cases`, `fr07-04-cart-assertions-check`, `fr07-05-cart-data-aligned`, `fr07-06-product-card-by-name`, `fr18-04-admin-order-isolated-final*`, and `fr18-05-*`). Historical findings were deduplicated by root cause. Browser-specific results are reported where the same behavior was observed across browsers.

## Confirmed product bugs and gaps

| ID | Feature | Severity | Expected | Actual | Evidence |
| --- | --- | --- | --- | --- | --- |
| BUG-FR01-01 | FR-01 Registration | High | Successful registration with `Password123!` redirects to `/login`. | SUT rejects the password because validation expects whitespace and remains on `/register`. | `findings/fr01-02-fix-locator-fixed/`, `findings/fr01-03-independent-cases/` |
| BUG-FR01-02 | FR-01 Registration | Medium | Registration form provides a Confirm Password control. | `Register.jsx` does not render Confirm Password. | `findings/fr01-01-locator-fixed/`, `findings/fr01-03-independent-cases/` |
| BUG-FR07-01 | FR-07 Shopping Cart | Medium | Cart summary uses the required “Tổng cộng” label. | SUT renders “Tổng tạm tính”. | `findings/fr07-03-shopping-cart-state/` |
| BUG-FR07-02 | FR-07 Shopping Cart | Medium | Users can change quantity and receive quantity validation/confirmation behavior. | SUT has no quantity input, increase/decrease controls, validation, or confirmation dialog. | `findings/fr07-02-shopping-cart-fixed-2/`, `findings/fr07-03-shopping-cart-state/` |
| BUG-FR07-03 | FR-07 Shopping Cart | Medium | Empty cart renders the required empty-state illustration when specified. | The required illustration is not rendered by the SUT. | `findings/fr07-00-shopping-cart/`, `findings/fr07-01-shopping-cart-fixed/` |
| BUG-FR18-01 | FR-18 Admin Orders | Medium | Successful status updates show the specified Vietnamese success message. | SUT returns/displays English “Order status updated”. | `findings/fr18-02-admin-order-dom-fixed/`, `findings/fr18-03-admin-order-isolated-rerun/` |
| BUG-FR18-02 | FR-18 Admin Orders | High | Delivered and canceled orders are final and cannot be updated. | Canceled orders still expose “Đánh dấu Đã giao” and can be updated. | `findings/fr18-03-admin-order-isolated-rerun/`, `findings/fr18-04-admin-order-isolated-final-rerun-2/` |
| BUG-FR18-03 | FR-18 Admin Orders | Medium | Admin can filter orders by status. | Admin UI has no status filter. | `findings/fr18-01/`, `findings/fr18-02-admin-order-dom-fixed/` |

## Cases not automatable against the current SUT

The FR-07 quantity, quantity-boundary, and confirmation-dialog cases are kept as explicit skips because the corresponding controls do not exist. FR-18 status-filter cases are also explicit skips because no filter is rendered. These are documented product gaps, not silently passing tests.

## Script and environment findings

Several early failures were test-script or environment issues and are not product bugs: FR-01 initially used an unassociated `getByLabel()` locator; FR-07 initially inferred a card from heading order and later lost cart state during navigation; FR-18 initially searched for `#<orderId>` although the UI rendered the ID without `#`. These were corrected in subsequent specs. Fedora could not run WebKit because Playwright expected Ubuntu/ICU dependencies; the project therefore uses Chrome, Edge, and Firefox as permitted by the assignment. Database fixtures were later seeded with stable order IDs.

## Follow-up

Re-run the three final browser sets after the last script changes, then update this report with final counts and attach the corresponding screenshots or traces to the repository/GitHub Issues.
```

**Verdict:** valid

**Reasoning:** Báo cáo tổng hợp đúng các findings trong phạm vi historical run và phân biệt product bug với lỗi script/môi trường. Việc bổ sung final findings sau đó giúp report phản ánh đầy đủ hơn.

**Student Fix:** Sinh viên đã bổ sung các findings final của FR-01, FR-07 và FR-18 vào `src/reports/bug-report.md`, đối chiếu kết quả trên Chrome, Edge và Firefox, đồng thời bổ sung các lỗi FR-07 về duplicate cart rows và quantity/subtotal mismatch.

### 2.2.21 Entry 21

**Prompt + Tool:**

Time: `2026-08-26 20:31 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated) Thêm các file cần thiết vào folder src để đầy đủ yêu cầu trong folder req. Những phần nào có file riêng thì file main chỉ cần ghi đường dẫn, không cần ghi lại. Phần nào chưa có thì để placeholder trong các file đó. Ghi audit cho prompt này.

**AI Output:** Đã bổ sung main-report.md, ai-critique.md, commit-log.txt và cập nhật README.md với test summary, self-assessment, các đường dẫn tài liệu và placeholder cho PDF, GitHub, video, issue links và kết quả tổng cuối. Không bịa dữ liệu chưa có.

**Verdict:** valid

**Reasoning:** Bộ hồ sơ phản ánh các deliverable bắt buộc và tách tài liệu theo đúng trách nhiệm. Placeholder được giữ lại vì chưa có bằng chứng/link thực tế tại thời điểm tạo.

**Student Fix:** Sinh viên sẽ hoàn thiện PDF, số liệu final, link công khai và video trước khi nộp.

### 2.2.22 Entry 22

**Prompt + Tool:**

Time: `2026-08-26 21:10 +07`
Tool: `Codex / GPT-5`
Prompt:
[@superpowers](plugin://superpowers@openai-api-curated) [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/399942ed/skills/writing-skills/SKILL.md) 
Folder src hiện đang là nội dung bài làm của tôi, dựa vào các thành phần trong folder đó kết hợp với slide bài giảng trong folder ref, hãy tạo bộ skill automation-tesing để hoàn thành yêu cầu đề trong folder req. Bộ skill nên tách ra từng bước thành các subskill:
- Nhận input spec của project (Ví dụ eshop-sut) rồi tạo test data
- Sau đó cài playwright và tạo script, cho chọn đầu ra (output path) findings và report khi chạy playwright.
- Tạo folder findíng, gom findings thành bug report
Việc chia subskill sẽ do bạn quyết định, miễn là tách thành các bước rõ ràng, logic, đúng với yêu cầu đề. Bạn hãy tham khảo ai audit để hiểu quá trình tôi làm bài. Ngoài ra, bộ skill phải đạt được tính độc lập, portable, tái sử dụng cho các project khác chứ không chỉ eshop-sut, không cần phải bỏ slide vô cho những lần sau (bạn hãy trích xuất kiến thức từ slide vào skill này).  Hãy ghi lần prompt này vào ai audit và ghi hướng dẫn sử dụng bộ skill ở root.

**AI Output:** Đã tạo bộ skill portable tại automation-testing/: một skill điều phối và ba subskill cho spec-to-test-data, playwright-script-and-run, và findings-to-bug-report. Đã trích xuất các nguyên tắc từ yêu cầu/slide như data-driven testing, tối thiểu 12 case, ba assertion patterns, locator ổn định, observable waits, cross-browser HTML evidence, fixture isolation và phân loại lỗi trung thực. Đã cập nhật README root với hướng dẫn copy skill và các input cần cung cấp. Đã chạy quick_validate.py thành công cho cả bốn skill.

**Verdict:** valid

**Reasoning:** Bộ skill được tách thành workflow và ba subskill có phạm vi rõ ràng, có nguyên tắc portable và phù hợp với quy trình tạo data, dựng script, chạy cross-browser và tổng hợp findings.

**Student Fix:** Sinh viên đã review và bổ sung bộ skill vào `.agents/skills/` của folder nộp, sau đó kiểm tra lại nội dung trước khi đóng gói.

## 3. Tổng kết độ chính xác AI
- Các nội dung AI tạo đã được rà soát với yêu cầu bài làm: Có; các script được chạy, đối chiếu DOM/source và sửa qua nhiều lượt.
- Mức độ chính xác/độ hữu ích tổng quan: Hữu ích ở mức khởi tạo và refactor, nhưng cần human review để xác nhận locator, oracle, fixture và product gaps.
- Giới hạn hoặc rủi ro còn lại: Một số expected behavior không tồn tại trong SUT; browser/environment failures và placeholder deliverables không được xem là bằng chứng hoàn tất.

## 4. Kết luận
AI được dùng để sinh script, test data, phân tích findings và soạn tài liệu; sinh viên chịu trách nhiệm kiểm chứng và phân loại kết quả.

## 5. Disclosure
Quy trình đạt mục tiêu AI-first có human-in-the-loop, nhưng hồ sơ chỉ hoàn tất sau khi bổ sung PDF, link công khai, issue evidence và video demo thực tế.
