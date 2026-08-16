# HW04 - Automation Testing

Nguon de bai: `2026.HW04.Automation Testing_En.pdf`

## 1. Thong Tin Chung

- **Exercise ID:** HW04-AI
- **Thoi luong:** 10 gio
- **Deadline:** Xem tren Moodle
- **Hinh thuc:** Bai tap ca nhan
- **Noi nop:** Moodle, nop report
- **Giang vien/TA:** Dr. Lam Quang Vu, Dr. Tran Duy Hoang, MSc. Tran Thi Bich Hanh, MSc. Truong Phuoc Loc, MSc. Ho Tuan Thanh
- **Lien he:** lqvu@fit.hcmus.edu.vn, tdhoang@fit.hcmus.edu.vn, ttbhanh@fit.hcmus.edu.vn, tploc@fit.hcmus.edu.vn, hthanh@fit.hcmus.edu.vn
- **AI Policy:** Duoc dung AI, nhung bat buoc khai bao va dinh kem AI Audit Report
- **Bloom-AI Level:** G9.1 den G9.6 tuy bai; rieng HW04 tap trung G9.2, G9.3, G9.4

## 2. Nguyen Tac Lam Bai

- **AI-first:** Phai dung AI cho ky thuat test automation da hoc, nhung khong duoc chi prompt chung chung nhu "viet tat ca automation scripts". Can huong dan AI tung buoc.
- **Human review:** Moi ket qua AI sinh ra phai duoc sinh vien doc, review, sua va chiu trach nhiem.
- **AI Audit Report:** Phai ghi log day du qua trinh dung AI. Neu khong dung AI cung phai khai bao ro.
- **Documentation:** Toan bo qua trinh lam viec phai duoc ghi bang text, uu tien Markdown.
- **Quality over completion:** Cham dua tren chat luong script, data files, HTML reports, bug reports, demo video va cac link tham chieu, khong chi dua tren viec co du deliverables.

## 3. Learning Outcomes

Sau bai nay can chung minh duoc kha nang:

- Dung AI de tao automation test scripts cho web frontend bang Playwright hoac Selenium, sau do review va tinh chinh.
- Ap dung data-driven testing va assertion patterns, chay suite tren nhieu browser.
- Phan tich loi cua AI-generated automation, sua loi, tao HTML reports va bug reports.
- The hien Bloom-AI G9.2 Apply, G9.3 Analyse, G9.4 Collaborate with AI.

## 4. System Under Test

- **SUT:** EShop, ung dung demo thuong mai dien tu tieng Viet cho testing practice.
- **Repository:** <https://github.com/ttbhanh/eshop-sut>

### Pool A - Authentication, Categories, and Products

- FR-01: Account registration
- FR-02: Login and account lockout
- FR-03: Forgot password and password reset, two steps
- FR-04: Personal profile management
- FR-05: Product listing and search
- FR-06: Product detail view

### Pool B - Shopping Cart and Checkout

- FR-07: Shopping cart
- FR-08: Checkout
- FR-09: Discount coupons
- FR-10: Order state machine
- FR-11: Order history view, user

### Pool C - Web Admin

- FR-12: Access control
- FR-13: Dashboard
- FR-14: Category management, CRUD
- FR-15: Product management, CRUD
- FR-16: Product import from CSV
- FR-17: Coupon management, CRUD
- FR-18: Order management, admin
- FR-19: User management, admin

### Pool D - Mobile App

Pool D khong dung trong HW04 vi bai nay automate web frontend.

## 5. Chon Feature

- Automate dung 3 web features da chon o HW02.
- Moi pool A, B, C chon 1 feature.
- Neu chua lam HW02, tu khai bao 3 web features tu Pools A-C trong report va neu ro ly do khong co HW02.
- Trong cung nhom, feature khong duoc trung nhau nhu HW02.

## 6. Requirements

### Task 1 - AI-generated Automation Scripts

Cho moi feature trong 3 feature:

- Dung AI tung buoc de chuyen it nhat **12 test cases** thanh automation scripts.
- 12 test cases co the gom positive, negative, edge cases.
- Scripts phai **data-driven**:
  - Test data luu trong file rieng `.csv` hoac `.json`.
  - Khong chap nhan hardcode inline arrays/objects trong script.
- Scripts phai dung it nhat **3 assertion patterns** khac nhau.
- Chay tren it nhat **3 browsers**:
  - Chromium / Firefox / WebKit, hoac Chrome / Edge / Firefox.
  - Moi feature phai chay tren ca 3 browsers.
  - Tong toi thieu 9 browser runs tren suite.
- Moi lan chay phai tao **HTML report** bang Allure hoac Playwright HTML reporter.
- Report phai hien thi ro `"Run by: {StudentID}"` trong title, header, footer, hoac metadata.
- Phai review va sua AI-generated scripts:
  - Ghi ro AI sai/thieu gi: selector mong manh, assertion yeu/thieu, thieu edge cases, flaky waits, v.v.
  - Giai thich vi sao AI sai/thieu: prompt quality, model limitation, dac diem cua feature.
- Neu failing assertion phat hien bug that, phai:
  - Ghi bug trong Markdown report.
  - Tao GitHub Issue.
  - Dinh kem screenshot vao issue.
- Neu test case nao khong automate duoc, phai document ly do.

### Task 2 - Demo Video

- Quay video YouTube unlisted toi thieu **5 phut**.
- Thuyet minh bang tieng Viet.
- Demo mot automation script chay end-to-end, gom:
  - Multi-browser run.
  - HTML report da generate.
  - It nhat mot fix da sua tu AI-generated script.
- Video phai co bang chung tac gia:
  - Face-cam, hoac
  - Terminal chay `whoami` va `hostname`.

## 7. Agent Skill

- Duoc khuyen khich tao Agent Skill cho workflow automation:
  - Data-driven script generation.
  - Multi-browser execution.
  - Script maintenance.
- Neu lam, nop skill kem demo video YouTube cho thay dung skill end-to-end tren mot feature hoan chinh.

## 8. Tools Duoc Dung

- Bat ky AI tool nao: ChatGPT, Claude, Gemini, Copilot, Cursor, v.v.
- Playwright, recommended, hoac Selenium 4+.
- Allure hoac Playwright HTML reporter.

## 9. AI Audit Report

Phu luc bat buoc. Neu co dung AI, khai bao:

> I use AI tools for the following tasks.

Moi interaction can co:

- Ten AI tool.
- Ngay gio.
- Prompt.
- AI output.

Neu khong dung AI:

> I do not use any AI help in this exercise.

## 10. AI Critique

- Bat buoc viet 200-300 tu.
- Noi dung can tra loi:
  - AI sai, thien lech, hoac thieu o dau?
  - Vi sao AI khong bat duoc van de?
  - Hoc duoc nguyen tac gi khi cong tac voi AI trong bai nay?

## 11. Anti-AI-Cheat Constraints

Khong duoc AI-generate hoac fabricate cac bang chung sau:

- HTML reports phai co `"Run by: {StudentID}"` va ISO timestamp.
- Demo video phai co giong noi cua sinh vien va face-cam hoac terminal chay `whoami`, `hostname`.

## 12. Git Commit Log

- Can public GitHub repository co history co y nghia.
- Toi thieu **8 commits**.
- Chi commits thay doi test-script files moi duoc tinh:
  - `.spec.js`
  - `.spec.ts`
  - hoac tuong duong
- Commits chi sua README, PDF, docs khong duoc tinh.
- Phai cung cap git commit log o text-based file format.

## 13. Oral Defense

- 30% sinh vien co the duoc chon ngau nhien phong van 5-7 phut trong tuan sau deadline.
- Can giai thich cach hoan thanh bai.

## 14. Quy Dinh Nop Bai

### Ten file zip

```text
<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip
```

Trong do `SelfAssessedGrade` la so 3 chu so tu `000` den `100`.

Vi du:

```text
25127001_HW04_AI_Automation_090.zip
```

### Noi dung bat buoc trong zip

- Main report, Markdown va PDF, gom automation report va review/gap analysis cua AI-generated scripts.
- Public GitHub repository link, gom scripts, data files va HTML reports.
- Multi-browser HTML reports, Allure hoac Playwright.
- Unlisted YouTube demo video link.
- AI Critique va AI Audit Report, Markdown va PDF.
- Git commit log, text file.
- Bug report va screenshot bugs tren GitHub Issues, neu co.
- README.md co:
  - Bang self-assessment.
  - Test summary report: so feature, so test cases automated/executed/passed/failed, so browser runs, so bug, demo video link.
- Cac supporting materials khac.

## 15. Assessment Template

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | ---: | --- |
| 1 | Task 1 - Feature A | 25 | |
| 1 | Task 1 - Feature B | 25 | |
| 1 | Task 1 - Feature C | 25 | |
| 2 | Task 2 - Demo video | 15 | |
| 3 | Agent Skills | 10 | |
| | Total | 100 | |

## 16. References

- ISTQB Foundation Level Syllabus, latest edition.
- Hardman, P. (2025). A Post-AI Learning Taxonomy.
- Fuster Rabella, M. (2025). OECD Education Working Paper No. 338.
- Anthropic (2025). Building Reliable AI Test Agents, engineering blog.
- DeepEval and Promptfoo documentation, LLM testing frameworks.

## 17. Quy Dinh Khac

- Khong chap nhan nop tre.
- Thieu bat ky document bat buoc nao thi bi 0 diem.
- Copy bai giua sinh vien, bao gom prompts, thi ca hai ben bi 0 diem.
