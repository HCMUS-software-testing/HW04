# HW04 - Kiểm Thử Tự Động

Nguồn đề bài: `2026.HW04.Automation Testing_En.pdf`

## 1. Thông Tin Chung

- **Mã bài tập:** HW04-AI
- **Thời lượng:** 10 giờ
- **Hạn nộp:** Xem tại liên kết nộp bài trên Moodle
- **Hình thức:** Bài tập cá nhân
- **Nơi nộp:** Moodle, nộp báo cáo
- **Giảng viên/Trợ giảng:** Dr. Lâm Quang Vũ, Dr. Trần Duy Hoàng, MSc. Trần Thị Bích Hạnh, MSc. Trương Phước Lộc, MSc. Hồ Tuấn Thành
- **Liên hệ:** lqvu@fit.hcmus.edu.vn, tdhoang@fit.hcmus.edu.vn, ttbhanh@fit.hcmus.edu.vn, tploc@fit.hcmus.edu.vn, hthanh@fit.hcmus.edu.vn
- **Chính sách AI:** Được phép dùng AI, nhưng bắt buộc phải khai báo và đính kèm AI Audit Report
- **Bloom-AI Level yêu cầu:** G9.1 đến G9.6 tùy bài; riêng HW04 tập trung G9.2, G9.3 và G9.4

## 2. Nguyên Tắc Làm Bài

- **Chiến lược AI-first:** Sinh viên phải áp dụng AI vào các kỹ thuật kiểm thử đã học. Không được chỉ dùng một prompt chung chung như "viết tất cả automation scripts cho feature này". Cần hướng dẫn AI từng bước theo đúng kỹ thuật đã học.
- **Con người phải review:** Mọi kết quả do AI tạo ra phải được sinh viên kiểm tra, sửa lỗi và tinh chỉnh. Sinh viên chịu hoàn toàn trách nhiệm về độ đúng của kết quả cuối cùng.
- **AI Audit Report:** Toàn bộ quá trình sử dụng AI phải được ghi lại đầy đủ. Nếu không dùng AI, vẫn phải khai báo rõ.
- **Tài liệu hóa:** Toàn bộ quá trình làm việc phải được ghi bằng định dạng văn bản, ưu tiên Markdown.
- **Chất lượng quan trọng hơn hoàn thành hình thức:** Bài được chấm dựa trên số lượng và chất lượng của automation scripts, data files, HTML reports, bug reports, video demo và các liên kết tham chiếu.

## 3. Kết Quả Học Tập

Sau khi hoàn thành bài tập, sinh viên cần chứng minh được khả năng:

- Dùng AI để tạo automation test scripts cho web frontend của SUT bằng Playwright hoặc Selenium, sau đó review và tinh chỉnh.
- Áp dụng data-driven testing và các mẫu assertion, đồng thời chạy test suite đầy đủ trên nhiều trình duyệt.
- Phân tích automation do AI tạo ra: sửa lỗi, chỉ ra AI sai hoặc thiếu ở đâu, và tạo đầy đủ HTML reports cùng bug reports.
- Thể hiện năng lực Bloom-AI ở các mức G9.2, G9.3 và G9.4.

## 4. System Under Test

- **SUT:** EShop, một ứng dụng demo thương mại điện tử tiếng Việt dùng cho thực hành kiểm thử.
- **Repository:** <https://github.com/ttbhanh/eshop-sut>

### Pool A - Xác Thực, Danh Mục Và Sản Phẩm

- FR-01: Đăng ký tài khoản
- FR-02: Đăng nhập và khóa tài khoản
- FR-03: Quên mật khẩu và đặt lại mật khẩu, gồm hai bước
- FR-04: Quản lý hồ sơ cá nhân
- FR-05: Danh sách sản phẩm và tìm kiếm
- FR-06: Xem chi tiết sản phẩm

### Pool B - Giỏ Hàng Và Thanh Toán

- FR-07: Giỏ hàng
- FR-08: Thanh toán
- FR-09: Mã giảm giá
- FR-10: Máy trạng thái đơn hàng
- FR-11: Xem lịch sử đơn hàng của người dùng

### Pool C - Web Admin

- FR-12: Kiểm soát truy cập
- FR-13: Bảng điều khiển
- FR-14: Quản lý danh mục, CRUD
- FR-15: Quản lý sản phẩm, CRUD
- FR-16: Import sản phẩm từ CSV
- FR-17: Quản lý mã giảm giá, CRUD
- FR-18: Quản lý đơn hàng, admin
- FR-19: Quản lý người dùng, admin

### Pool D - Mobile App

Pool D không dùng trong HW04 vì bài này yêu cầu tự động hóa web frontend.

## 5. Chọn Feature

- Tự động hóa đúng 3 web features đã chọn ở HW02.
- Chọn 1 feature từ mỗi Pool A, B và C. 
- Nếu chưa hoàn thành HW02, sinh viên tự khai báo 3 web features từ Pools A-C trực tiếp trong báo cáo và nêu rõ lý do không có HW02.
- Trong cùng nhóm, feature được chọn không được trùng nhau như ở HW02.

## 6. Yêu Cầu

### Task 1 - Automation Scripts Do AI Tạo

Đối với mỗi feature trong 3 feature đã chọn:

- Dùng AI từng bước để chuyển ít nhất **12 test cases** thành automation scripts.
- 12 test cases có thể gồm positive cases, negative cases và edge cases.
- Scripts phải **data-driven**:
  - Test data phải được lưu trong file riêng `.csv` hoặc `.json`.
  - Không chấp nhận hardcode inline arrays hoặc objects trực tiếp trong script.
- Scripts phải sử dụng ít nhất **3 assertion patterns** khác nhau.
- Chạy trên ít nhất **3 trình duyệt**:
  - Chromium / Firefox / WebKit, hoặc Chrome / Edge / Firefox.
  - Mỗi feature phải chạy trên cả 3 trình duyệt.
  - Toàn bộ suite phải có tối thiểu 9 browser runs.
- Mỗi lần chạy phải tạo **HTML report** bằng Allure hoặc Playwright HTML reporter.
- Report phải hiển thị rõ `"Run by: {StudentID}"` trong title, header, footer hoặc metadata.
- Phải review và sửa automation scripts do AI tạo:
  - Ghi rõ AI sai hoặc thiếu gì, ví dụ: selector mong manh, assertion yếu hoặc thiếu, thiếu edge cases, flaky waits.
  - Giải thích vì sao AI sai hoặc thiếu, ví dụ: chất lượng prompt, giới hạn mô hình, hoặc đặc điểm của feature.
- Nếu failing assertion phát hiện bug thật:
  - Ghi bug trong Markdown report.
  - Tạo GitHub Issue.
  - Đính kèm screenshot vào issue.
- Nếu có test case không tự động hóa được, phải ghi rõ lý do.

### Task 2 - Video Demo

- Quay video YouTube unlisted tối thiểu **5 phút**.
- Thuyết minh bằng tiếng Việt.
- Demo một automation script chạy end-to-end, bao gồm:
  - Multi-browser run.
  - HTML report đã generate.
  - Ít nhất một lỗi hoặc thiếu sót đã sửa từ script do AI tạo.
- Video phải có bằng chứng tác giả:
  - Face-cam, hoặc
  - Terminal chạy `whoami` và `hostname`.

## 7. Agent Skill

- Khuyến khích xây dựng Agent Skill cho workflow automation:
  - Tạo script theo hướng data-driven.
  - Chạy multi-browser.
  - Bảo trì và tinh chỉnh script.
- Nếu làm phần này, cần nộp skill kèm video demo YouTube cho thấy cách dùng skill end-to-end trên một feature hoàn chỉnh.

## 8. Công Cụ Được Phép Dùng

- Bất kỳ AI tool nào: ChatGPT, Claude, Gemini, Copilot, Cursor, v.v.
- Playwright, được khuyến nghị, hoặc Selenium 4+.
- Allure hoặc Playwright HTML reporter.

## 9. AI Audit Report

Phụ lục bắt buộc. Nếu có dùng AI, khai báo:

> I use AI tools for the following tasks.

Mỗi interaction cần có:

- Tên AI tool.
- Ngày và giờ.
- Prompt của sinh viên.
- Output của AI.

Nếu không dùng AI, khai báo:

> I do not use any AI help in this exercise.

## 10. AI Critique

- Bắt buộc viết 200-300 từ.
- Nội dung cần trả lời:
  - AI sai, thiên lệch hoặc chưa đầy đủ ở đâu?
  - Vì sao AI không phát hiện được vấn đề?
  - Sinh viên học được nguyên tắc gì khi cộng tác với AI trong bài tập này?

## 11. Ràng Buộc Chống Gian Lận Bằng AI

Không được dùng AI để tạo giả hoặc bịa đặt các bằng chứng sau:

- HTML reports phải có `"Run by: {StudentID}"` cùng ISO timestamp.
- Video demo phải có giọng nói thật của sinh viên và face-cam hoặc terminal chạy `whoami`, `hostname`.

## 12. Git Commit Log

- Cần có public GitHub repository với lịch sử commit có ý nghĩa.
- Tối thiểu **8 commits**.
- Chỉ những commit thay đổi test-script files mới được tính:
  - `.spec.js`
  - `.spec.ts`
  - hoặc file tương đương
- Commit chỉ sửa README, PDF hoặc tài liệu khác không được tính.
- Phải cung cấp git commit log ở định dạng text-based file.

## 13. Oral Defense

- 30% sinh viên có thể được chọn ngẫu nhiên để vấn đáp 5-7 phút trong tuần sau hạn nộp.
- Sinh viên cần giải thích được cách mình hoàn thành bài.

## 14. Quy Định Nộp Bài

### Định dạng tên file zip

```text
<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip
```

Trong đó `SelfAssessedGrade` là số 3 chữ số trong khoảng `000` đến `100`.

Ví dụ:

```text
25127001_HW04_AI_Automation_090.zip
```

### Nội dung bắt buộc trong file zip

- Main report, gồm bản Markdown và PDF, bao gồm automation report và phần review / gap analysis của AI-generated scripts.
- Public GitHub repository link, chứa scripts, data files và HTML reports.
- Multi-browser HTML reports, Allure hoặc Playwright.
- Unlisted YouTube demo video link.
- AI Critique và AI Audit Report, gồm bản Markdown và PDF.
- Git commit log, dạng text file.
- Bug report cùng screenshot của bugs trên GitHub Issues, nếu có.
- `README.md` chứa:
  - Bảng self-assessment.
  - Test summary report: số feature, số test cases automated, executed, passed, failed, số browser runs, số bugs và demo video link.
- Các tài liệu hỗ trợ khác nếu có.

## 15. Assessment Template

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | ---: | --- |
| 1 | Task 1 - Feature A | 25 | |
| 1 | Task 1 - Feature B | 25 | |
| 1 | Task 1 - Feature C | 25 | |
| 2 | Task 2 - Demo video | 15 | |
| 3 | Agent Skills | 10 | |
| | Total | 100 | |

## 16. Tài Liệu Tham Khảo

- ISTQB Foundation Level Syllabus, phiên bản mới nhất.
- Hardman, P. (2025). A Post-AI Learning Taxonomy.
- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
- Anthropic (2025). Building Reliable AI Test Agents, engineering blog.
- DeepEval và Promptfoo documentation, LLM testing frameworks.

## 17. Quy Định Khác

- Không chấp nhận nộp trễ.
- Thiếu bất kỳ tài liệu bắt buộc nào sẽ bị 0 điểm.
- Sao chép giữa sinh viên, bao gồm cả prompts, sẽ khiến cả hai bên bị 0 điểm.
