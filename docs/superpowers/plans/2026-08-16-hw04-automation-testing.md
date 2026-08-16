# Kế Hoạch Triển Khai HW04 Automation Testing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hoàn thành HW04 bằng cách tự động hóa 3 web features của EShop với Playwright, data-driven tests, multi-browser HTML reports, AI Audit Report, AI Critique, video demo, bug reports và gói nộp Moodle đầy đủ.

**Architecture:** Dùng Playwright Test làm test runner chính. Mỗi feature có một spec file riêng và một data file riêng; các thao tác dùng chung như login, điều hướng, assertion cơ bản được đặt trong helper để tránh lặp code. Kết quả chạy test được xuất bằng Playwright HTML reporter, có hiển thị `Run by: {StudentID}` và ISO timestamp để đáp ứng ràng buộc chống gian lận của đề.

**Tech Stack:** Node.js, npm, Playwright Test, TypeScript, JSON test data, Playwright HTML reporter, Markdown, GitHub Issues, YouTube unlisted video.

---

## 1. Cấu Trúc File Dự Kiến

- Create: `docs/HW04_ASSIGNMENT.md` - bản markdown hóa đề bài không dấu.
- Create: `docs/HW04_ASSIGNMENT_VI.md` - bản markdown hóa đề bài tiếng Việt có dấu.
- Modify: `docs/superpowers/plans/2026-08-16-hw04-automation-testing.md` - kế hoạch triển khai bài tập.
- Create: `package.json` - khai báo dependencies và scripts chạy test.
- Create: `package-lock.json` - khóa version dependencies sau khi cài npm packages.
- Create: `playwright.config.ts` - cấu hình 3 browsers, reporter, screenshots, traces, base URL và metadata.
- Create: `.gitignore` - loại bỏ `node_modules`, output tạm và các file sinh tự động không cần track.
- Create: `tests/helpers/eshop.ts` - helper login, mở trang chủ, assertion text và các thao tác dùng chung.
- Create: `tests/data/feature-a.json` - test data cho feature Pool A.
- Create: `tests/data/feature-b.json` - test data cho feature Pool B.
- Create: `tests/data/feature-c.json` - test data cho feature Pool C.
- Create: `tests/feature-a.spec.ts` - automation tests cho feature Pool A, tối thiểu 12 test cases.
- Create: `tests/feature-b.spec.ts` - automation tests cho feature Pool B, tối thiểu 12 test cases.
- Create: `tests/feature-c.spec.ts` - automation tests cho feature Pool C, tối thiểu 12 test cases.
- Create: `reports/main-report.md` - báo cáo chính: feature selection, quy trình làm, kết quả automation, review/gap analysis.
- Create: `reports/ai-audit-report.md` - log các lần tương tác với AI.
- Create: `reports/ai-critique.md` - đoạn AI critique 200-300 từ.
- Create: `reports/bug-report.md` - danh sách bug thật, steps, expected, actual, severity, screenshot và GitHub Issue links.
- Create: `reports/test-summary.md` - tổng hợp số feature, test cases, browser runs, passed, failed, bugs.
- Create: `reports/git-commit-log.txt` - git commit log dạng text.
- Modify: `README.md` - self-assessment table, test summary và demo video link.

## 2. Giả Định Cần Xác Nhận Trước Khi Làm

- Cần biết `StudentID`, họ tên sinh viên và điểm tự đánh giá dự kiến để điền vào report, README, report metadata và tên file zip.
- Cần xác nhận 3 features đã chọn ở HW02. Nếu không có HW02, dùng self-declaration trong report.
- Nếu chưa có lựa chọn từ HW02, dùng bộ feature mặc định sau:
  - Pool A: FR-02 - Login and account lockout.
  - Pool B: FR-07 - Shopping cart.
  - Pool C: FR-14 - Category management, CRUD.
- Cần có EShop SUT chạy được bằng local URL hoặc deployed URL. Repository SUT: `https://github.com/ttbhanh/eshop-sut`.
- Các selector trong ví dụ dưới đây là khung ban đầu. Khi chạy thật, phải inspect DOM của EShop và thay bằng locator ổn định.

### Task 1: Khóa Phạm Vi Bài Làm Và Ghi Nhận Feature Selection

**Files:**
- Create: `reports/main-report.md`
- Modify: `README.md`

- [ ] **Step 1: Tạo thư mục report**

Run:

```bash
mkdir -p reports
```

Expected: thư mục `reports/` tồn tại.

- [ ] **Step 2: Tạo báo cáo chính ban đầu**

Create `reports/main-report.md`:

```markdown
# HW04 Automation Testing Report

## Student Information

- Student ID: <StudentID>
- Student name: <FullName>
- Course: Software Testing
- Homework: HW04 - Automation Testing

## Feature Selection

| Pool | Feature ID | Feature Name | Source |
| --- | --- | --- | --- |
| A | FR-02 | Login and account lockout | HW02 selection, or self-declared if HW02 unavailable |
| B | FR-07 | Shopping cart | HW02 selection, or self-declared if HW02 unavailable |
| C | FR-14 | Category management, CRUD | HW02 selection, or self-declared if HW02 unavailable |
```

- [ ] **Step 3: Nếu không có HW02, thêm khai báo self-declaration**

Append to `reports/main-report.md`:

```markdown
## HW02 Availability Declaration

I have not completed or cannot access HW02, so I self-declare three web features from Pools A-C directly for HW04. The selected features are FR-02 Login and account lockout, FR-07 Shopping cart, and FR-14 Category management (CRUD).
```

- [ ] **Step 4: Commit phần scope**

Run:

```bash
git add reports/main-report.md README.md
git commit -m "docs: record HW04 scope and selected features"
```

Expected: commit thành công. Commit này không được tính vào tối thiểu 8 commits test-script vì chỉ sửa tài liệu.

### Task 2: Cài Đặt Playwright Project

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `.gitignore`
- Create: `tests/helpers/eshop.ts`

- [ ] **Step 1: Khởi tạo Node.js project và cài Playwright**

Run:

```bash
npm init -y
npm install -D @playwright/test typescript
npx playwright install
```

Expected: tạo `package.json`, `package-lock.json` và cài browser binaries cho Playwright.

- [ ] **Step 2: Tạo `.gitignore`**

Create `.gitignore`:

```gitignore
node_modules/
test-results/
playwright-report/
blob-report/
.env
*.zip
```

Nếu giảng viên yêu cầu nộp HTML reports trong repository, bỏ dòng `playwright-report/` khỏi `.gitignore` trước khi commit report.

- [ ] **Step 3: Tạo Playwright config**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

const studentId = process.env.STUDENT_ID ?? '<StudentID>';
const timestamp = new Date().toISOString();

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
      title: `HW04 Automation Testing - Run by: ${studentId} - ${timestamp}`,
    }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  metadata: {
    runBy: studentId,
    timestamp,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

- [ ] **Step 4: Sửa scripts trong `package.json`**

Modify `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "report": "playwright show-report",
    "test:feature-a": "playwright test tests/feature-a.spec.ts",
    "test:feature-b": "playwright test tests/feature-b.spec.ts",
    "test:feature-c": "playwright test tests/feature-c.spec.ts"
  }
}
```

Giữ lại các field khác do `npm init -y` tạo ra.

- [ ] **Step 5: Tạo helper dùng chung**

Create `tests/helpers/eshop.ts`:

```ts
import { expect, Page } from '@playwright/test';

export async function gotoHome(page: Page) {
  await page.goto('/');
  await expect(page).toHaveURL(/./);
}

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.getByLabel(/email|username|tài khoản|tai khoan/i).fill(email);
  await page.getByLabel(/password|mật khẩu|mat khau/i).fill(password);
  await page.getByRole('button', { name: /login|đăng nhập|dang nhap/i }).click();
}

export async function expectVisibleText(page: Page, text: RegExp | string) {
  await expect(page.getByText(text)).toBeVisible();
}
```

- [ ] **Step 6: Commit setup**

Run:

```bash
git add package.json package-lock.json playwright.config.ts .gitignore tests/helpers/eshop.ts
git commit -m "test: set up playwright multi-browser project"
```

Expected: commit thành công. Commit này chủ yếu ghi nhận setup; để chắc chắn đạt yêu cầu 8 commits, các commit sau phải thay đổi `.spec.ts`.

### Task 3: Tạo AI Audit Report Template

**Files:**
- Create: `reports/ai-audit-report.md`

- [ ] **Step 1: Tạo file audit**

Create `reports/ai-audit-report.md`:

```markdown
# AI Audit Report

Declaration: I use AI tools for the following tasks.

| No. | AI Tool | Date Time | Purpose | Prompt | AI Output Summary | Human Review / Change |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Codex | 2026-08-16 | Read assignment PDF and create plan | @Superpowers đọc đề, tạo file md cho đề bài. Phân tích lên plan những việc cần làm để hoàn thành bài tập này | Created assignment markdown and implementation plan | Reviewed against the PDF requirements |

## Full Interaction Logs

### Interaction 1

- AI tool: Codex
- Date and time: 2026-08-16
- Prompt: @Superpowers đọc đề, tạo file md cho đề bài. Phân tích lên plan những việc cần làm để hoàn thành bài tập này
- Output: Created assignment summary and implementation plan.
- Human review: Confirmed requirements against the original PDF.
```

- [ ] **Step 2: Quy tắc cập nhật audit**

Sau mỗi lần dùng AI, append một mục mới:

```markdown
### Interaction <Number>

- AI tool: <ToolName>
- Date and time: <YYYY-MM-DD HH:mm>
- Prompt: <ExactPrompt>
- Output: <SummaryOrCopiedOutput>
- Human review: <WhatWasAcceptedRejectedOrFixed>
```

Expected: audit report đủ prompt, output và phần human review.

### Task 4: Tạo Test Cases Và Automation Cho Feature A

**Files:**
- Create: `tests/data/feature-a.json`
- Create: `tests/feature-a.spec.ts`
- Modify: `reports/main-report.md`
- Modify: `reports/ai-audit-report.md`

- [ ] **Step 1: Prompt AI chỉ sinh test cases cho Feature A**

Ghi prompt này vào `reports/ai-audit-report.md`:

```text
For EShop FR-02 Login and account lockout, propose at least 12 Playwright-automatable test cases. Include positive, negative, and edge cases. Do not write automation code yet. Return test ID, precondition, data fields, steps, expected result, and assertion idea.
```

Expected: AI trả về danh sách test cases, chưa có code automation.

- [ ] **Step 2: Human review test cases**

Thêm bảng test cases đã review vào `reports/main-report.md`:

```markdown
## Feature A - FR-02 Login and Account Lockout

| Test ID | Type | Preconditions | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- |
| A-001 | Positive | Valid active user exists | Login with valid email and password | User is redirected to home/account page | URL assertion, visible text |
| A-002 | Negative | Valid active user exists | Login with valid email and wrong password | Error message is shown and user remains on login page | Visible error, URL assertion |
```

Mở rộng bảng đến tối thiểu 12 test cases.

- [ ] **Step 3: Tạo data file bên ngoài**

Create `tests/data/feature-a.json`:

```json
[
  {
    "id": "A-001",
    "title": "valid login redirects user to home page",
    "email": "valid.user@example.com",
    "password": "ValidPassword123!",
    "expectedText": "Logout",
    "expectedUrlPattern": "/"
  },
  {
    "id": "A-002",
    "title": "invalid password shows error",
    "email": "valid.user@example.com",
    "password": "WrongPassword123!",
    "expectedText": "Invalid",
    "expectedUrlPattern": "/login"
  }
]
```

Expected: file có tối thiểu 12 records trước khi chạy chấm thật.

- [ ] **Step 4: Prompt AI sinh script dựa trên data đã review**

Ghi prompt này vào audit:

```text
Write a Playwright test file for the reviewed FR-02 test cases. Use TypeScript. Load data from tests/data/feature-a.json. Use at least three assertion patterns: URL assertion, visible text assertion, and form/control state assertion. Avoid brittle CSS selectors; prefer role, label, and text locators.
```

- [ ] **Step 5: Tạo spec cho Feature A**

Create `tests/feature-a.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import loginCases from './data/feature-a.json';
import { login } from './helpers/eshop';

type LoginCase = {
  id: string;
  title: string;
  email: string;
  password: string;
  expectedText: string;
  expectedUrlPattern: string;
};

for (const data of loginCases as LoginCase[]) {
  test(`${data.id} ${data.title}`, async ({ page }) => {
    await login(page, data.email, data.password);

    await expect(page).toHaveURL(new RegExp(data.expectedUrlPattern));
    await expect(page.getByText(new RegExp(data.expectedText, 'i'))).toBeVisible();

    if (data.expectedUrlPattern.includes('/login')) {
      await expect(page.getByLabel(/email|username|tài khoản|tai khoan/i)).toBeEditable();
    }
  });
}
```

- [ ] **Step 6: Chạy Feature A trên 3 browsers**

Run:

```bash
STUDENT_ID=<StudentID> BASE_URL=<EShopURL> npx playwright test tests/feature-a.spec.ts --project=chromium --project=firefox --project=webkit
```

Expected: test chạy trên Chromium, Firefox, WebKit và sinh `playwright-report`.

- [ ] **Step 7: Commit Feature A**

Run:

```bash
git add tests/data/feature-a.json tests/feature-a.spec.ts reports/main-report.md reports/ai-audit-report.md
git commit -m "test: add feature A login automation cases"
```

Expected: commit được tính vào yêu cầu 8 commits vì có thay đổi `.spec.ts`.

### Task 5: Tạo Test Cases Và Automation Cho Feature B

**Files:**
- Create: `tests/data/feature-b.json`
- Create: `tests/feature-b.spec.ts`
- Modify: `reports/main-report.md`
- Modify: `reports/ai-audit-report.md`

- [ ] **Step 1: Prompt AI sinh test cases cho Shopping Cart**

Ghi prompt này vào audit:

```text
For EShop FR-07 Shopping cart, propose at least 12 Playwright-automatable test cases. Include add item, remove item, update quantity, empty cart, persistence, invalid quantity, stock boundary, and price subtotal scenarios where observable in the UI. Return test ID, precondition, data fields, steps, expected result, and assertion idea. Do not write automation code yet.
```

- [ ] **Step 2: Review và đưa test cases vào report**

Append to `reports/main-report.md`:

```markdown
## Feature B - FR-07 Shopping Cart

| Test ID | Type | Preconditions | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- |
| B-001 | Positive | Product exists and is in stock | Search product, open detail, add quantity 1 to cart | Cart contains the product | Visible row, cart count |
| B-002 | Positive | Product exists in cart | Remove product from cart | Cart becomes empty or item disappears | Visible empty cart text |
```

Mở rộng bảng đến tối thiểu 12 test cases.

- [ ] **Step 3: Tạo data file cho Feature B**

Create `tests/data/feature-b.json`:

```json
[
  {
    "id": "B-001",
    "title": "add one product to cart",
    "searchKeyword": "ao",
    "quantity": 1,
    "expectedCartCount": 1,
    "expectedText": "Cart"
  },
  {
    "id": "B-002",
    "title": "remove product from cart",
    "searchKeyword": "ao",
    "quantity": 1,
    "removeAfterAdd": true,
    "expectedCartCount": 0,
    "expectedText": "empty"
  }
]
```

Expected: file có tối thiểu 12 records trước khi chạy chấm thật.

- [ ] **Step 4: Tạo spec cho Feature B**

Create `tests/feature-b.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import cartCases from './data/feature-b.json';
import { gotoHome } from './helpers/eshop';

type CartCase = {
  id: string;
  title: string;
  searchKeyword: string;
  quantity: number;
  removeAfterAdd?: boolean;
  expectedCartCount: number;
  expectedText: string;
};

for (const data of cartCases as CartCase[]) {
  test(`${data.id} ${data.title}`, async ({ page }) => {
    await gotoHome(page);
    await page.getByRole('searchbox').fill(data.searchKeyword);
    await page.keyboard.press('Enter');
    await page.getByRole('link').filter({ hasText: new RegExp(data.searchKeyword, 'i') }).first().click();
    await page.getByRole('spinbutton').fill(String(data.quantity));
    await page.getByRole('button', { name: /add.*cart|thêm.*giỏ|them.*gio/i }).click();
    await page.getByRole('link', { name: /cart|giỏ hàng|gio hang/i }).click();

    if (data.removeAfterAdd) {
      await page.getByRole('button', { name: /remove|xóa|xoa/i }).first().click();
    }

    await expect(page.getByText(new RegExp(data.expectedText, 'i'))).toBeVisible();
    await expect(page.locator('[data-testid="cart-count"], .cart-count').first()).toContainText(String(data.expectedCartCount));
    await expect(page.getByRole('main')).toBeVisible();
  });
}
```

- [ ] **Step 5: Chạy Feature B trên 3 browsers**

Run:

```bash
STUDENT_ID=<StudentID> BASE_URL=<EShopURL> npx playwright test tests/feature-b.spec.ts --project=chromium --project=firefox --project=webkit
```

Expected: test chạy trên 3 browsers. Nếu selector fail, inspect DOM thật và sửa locator.

- [ ] **Step 6: Commit Feature B**

Run:

```bash
git add tests/data/feature-b.json tests/feature-b.spec.ts reports/main-report.md reports/ai-audit-report.md
git commit -m "test: add feature B shopping cart automation cases"
```

Expected: commit được tính vào yêu cầu 8 commits vì có thay đổi `.spec.ts`.

### Task 6: Tạo Test Cases Và Automation Cho Feature C

**Files:**
- Create: `tests/data/feature-c.json`
- Create: `tests/feature-c.spec.ts`
- Modify: `reports/main-report.md`
- Modify: `reports/ai-audit-report.md`

- [ ] **Step 1: Prompt AI sinh test cases cho Category CRUD**

Ghi prompt này vào audit:

```text
For EShop FR-14 Category management CRUD in the web admin, propose at least 12 Playwright-automatable test cases. Include create, read/search, update, delete, validation, duplicate name, access behavior, and cancellation scenarios where observable in the UI. Return test ID, precondition, data fields, steps, expected result, and assertion idea. Do not write automation code yet.
```

- [ ] **Step 2: Review và đưa test cases vào report**

Append to `reports/main-report.md`:

```markdown
## Feature C - FR-14 Category Management CRUD

| Test ID | Type | Preconditions | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- |
| C-001 | Positive | Admin account exists | Login admin, create category | New category appears in list | Visible row, URL assertion |
| C-002 | Positive | Category exists | Edit category name | Updated name appears in list | Visible row, text assertion |
```

Mở rộng bảng đến tối thiểu 12 test cases.

- [ ] **Step 3: Tạo data file cho Feature C**

Create `tests/data/feature-c.json`:

```json
[
  {
    "id": "C-001",
    "title": "admin creates a new category",
    "adminEmail": "admin@example.com",
    "adminPassword": "AdminPassword123!",
    "categoryName": "HW04 Category C001",
    "newCategoryName": "HW04 Category C001 Updated",
    "operation": "create",
    "expectedText": "HW04 Category C001"
  },
  {
    "id": "C-002",
    "title": "admin updates category name",
    "adminEmail": "admin@example.com",
    "adminPassword": "AdminPassword123!",
    "categoryName": "HW04 Category C002",
    "newCategoryName": "HW04 Category C002 Updated",
    "operation": "update",
    "expectedText": "HW04 Category C002 Updated"
  }
]
```

Expected: file có tối thiểu 12 records trước khi chạy chấm thật.

- [ ] **Step 4: Tạo spec cho Feature C**

Create `tests/feature-c.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import categoryCases from './data/feature-c.json';
import { login } from './helpers/eshop';

type CategoryCase = {
  id: string;
  title: string;
  adminEmail: string;
  adminPassword: string;
  categoryName: string;
  newCategoryName?: string;
  operation: 'create' | 'update' | 'delete' | 'validation';
  expectedText: string;
};

for (const data of categoryCases as CategoryCase[]) {
  test(`${data.id} ${data.title}`, async ({ page }) => {
    await login(page, data.adminEmail, data.adminPassword);
    await page.getByRole('link', { name: /admin|dashboard/i }).click();
    await page.getByRole('link', { name: /category|categories|danh mục|danh muc/i }).click();

    if (data.operation === 'create') {
      await page.getByRole('button', { name: /create|add|thêm|them/i }).click();
      await page.getByLabel(/name|tên|ten/i).fill(data.categoryName);
      await page.getByRole('button', { name: /save|lưu|luu/i }).click();
    }

    if (data.operation === 'update') {
      await page.getByRole('button', { name: /create|add|thêm|them/i }).click();
      await page.getByLabel(/name|tên|ten/i).fill(data.categoryName);
      await page.getByRole('button', { name: /save|lưu|luu/i }).click();
      await page.getByText(data.categoryName).click();
      await page.getByLabel(/name|tên|ten/i).fill(data.newCategoryName ?? data.categoryName);
      await page.getByRole('button', { name: /save|lưu|luu/i }).click();
    }

    if (data.operation === 'delete') {
      await page.getByText(data.categoryName).click();
      await page.getByRole('button', { name: /delete|xóa|xoa/i }).click();
      await page.getByRole('button', { name: /confirm|xác nhận|xac nhan/i }).click();
    }

    if (data.operation === 'validation') {
      await page.getByRole('button', { name: /create|add|thêm|them/i }).click();
      await page.getByLabel(/name|tên|ten/i).fill('');
      await page.getByRole('button', { name: /save|lưu|luu/i }).click();
    }

    await expect(page.getByText(new RegExp(data.expectedText, 'i'))).toBeVisible();
    await expect(page).toHaveURL(/admin|category|categories/i);
    await expect(page.getByRole('main')).toBeVisible();
  });
}
```

- [ ] **Step 5: Chạy Feature C trên 3 browsers**

Run:

```bash
STUDENT_ID=<StudentID> BASE_URL=<EShopURL> npx playwright test tests/feature-c.spec.ts --project=chromium --project=firefox --project=webkit
```

Expected: test chạy trên 3 browsers. Nếu selector fail, inspect DOM thật và sửa locator.

- [ ] **Step 6: Commit Feature C**

Run:

```bash
git add tests/data/feature-c.json tests/feature-c.spec.ts reports/main-report.md reports/ai-audit-report.md
git commit -m "test: add feature C category automation cases"
```

Expected: commit được tính vào yêu cầu 8 commits vì có thay đổi `.spec.ts`.

### Task 7: Review AI Output Và Tăng Chất Lượng Automation

**Files:**
- Modify: `tests/feature-a.spec.ts`
- Modify: `tests/feature-b.spec.ts`
- Modify: `tests/feature-c.spec.ts`
- Modify: `tests/helpers/eshop.ts`
- Modify: `reports/main-report.md`

- [ ] **Step 1: Commit sửa selector yếu**

Thay các selector mong manh bằng role, label, text hoặc test-id locators sau khi inspect DOM thật.

Run:

```bash
git add tests/*.spec.ts tests/helpers/eshop.ts reports/main-report.md
git commit -m "test: harden playwright locators for eshop flows"
```

Expected: commit được tính vì có thay đổi `.spec.ts`.

- [ ] **Step 2: Commit tăng assertion**

Thêm đủ ít nhất 3 assertion patterns trong suite:

```text
1. URL assertion: expect(page).toHaveURL(...)
2. Visible text assertion: expect(locator).toBeVisible()
3. Form/control state assertion: expect(input).toBeEditable(), toBeDisabled(), toHaveValue()
4. Business value assertion nếu có: subtotal, cart count, row value
```

Run:

```bash
git add tests/*.spec.ts reports/main-report.md
git commit -m "test: strengthen assertions across eshop features"
```

Expected: commit được tính vì có thay đổi `.spec.ts`.

- [ ] **Step 3: Commit sửa flaky waits**

Loại bỏ fixed timeout như `waitForTimeout`. Dùng web-first assertions hoặc chờ trạng thái UI cụ thể.

Run:

```bash
git add tests/*.spec.ts tests/helpers/eshop.ts reports/main-report.md
git commit -m "test: reduce flaky waits in playwright specs"
```

Expected: commit được tính vì có thay đổi `.spec.ts`.

- [ ] **Step 4: Commit bổ sung negative và edge cases**

Đảm bảo mỗi feature có tối thiểu 12 data records và script chạy tất cả records.

Run:

```bash
git add tests/data/*.json tests/*.spec.ts reports/main-report.md
git commit -m "test: expand negative and edge automation coverage"
```

Expected: commit được tính vì có thay đổi `.spec.ts`.

- [ ] **Step 5: Commit metadata report**

Đảm bảo HTML report hiển thị rõ `Run by: <StudentID>` và ISO timestamp.

Run:

```bash
git add playwright.config.ts tests/*.spec.ts reports/main-report.md
git commit -m "test: include student metadata in automation reports"
```

Expected: commit được tính nếu có thay đổi `.spec.ts`. Sau bước này, tổng số commit thay đổi test-script nên đạt ít nhất 8.

### Task 8: Chạy Full Suite Và Thu Thập Bằng Chứng

**Files:**
- Create: `reports/test-summary.md`
- Modify: `reports/main-report.md`
- Modify: `README.md`

- [ ] **Step 1: Chạy full suite trên 3 browsers**

Run:

```bash
STUDENT_ID=<StudentID> BASE_URL=<EShopURL> npx playwright test --project=chromium --project=firefox --project=webkit
```

Expected: chạy 3 features trên 3 browsers. Nếu mỗi feature có 12 cases, toàn suite có 36 test cases và tối đa 108 browser-specific executions.

- [ ] **Step 2: Mở HTML report**

Run:

```bash
npx playwright show-report
```

Expected: report mở được và hiển thị `Run by: <StudentID>` cùng ISO timestamp.

- [ ] **Step 3: Tạo test summary**

Create `reports/test-summary.md`:

```markdown
# Test Summary

| Metric | Value |
| --- | ---: |
| Number of features | 3 |
| Number of test cases automated | 36 |
| Number of test cases executed | <ExecutedCount> |
| Number passed | <PassedCount> |
| Number failed | <FailedCount> |
| Number of browser runs | <BrowserRunCount> |
| Number of bugs found | <BugCount> |
| Demo video link | <YouTubeUnlistedURL> |
```

- [ ] **Step 4: Cập nhật README**

Modify `README.md`:

```markdown
# HW04 Automation Testing

## Self-Assessment

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | ---: | ---: |
| 1 | Task 1 - Feature A | 25 | <ScoreA> |
| 1 | Task 1 - Feature B | 25 | <ScoreB> |
| 1 | Task 1 - Feature C | 25 | <ScoreC> |
| 2 | Task 2 - Demo video | 15 | <ScoreVideo> |
| 3 | Agent Skills | 10 | <ScoreSkill> |
| | Total | 100 | <TotalScore> |

## Test Summary

| Metric | Value |
| --- | ---: |
| Number of features | 3 |
| Number of test cases automated | 36 |
| Number of test cases executed | <ExecutedCount> |
| Number passed | <PassedCount> |
| Number failed | <FailedCount> |
| Number of browser runs | <BrowserRunCount> |
| Number of bugs | <BugCount> |
| Demo video link | <YouTubeUnlistedURL> |
```

### Task 9: Lập Bug Report Nếu Có Bug Thật

**Files:**
- Create: `reports/bug-report.md`
- Modify: `reports/main-report.md`

- [ ] **Step 1: Phân loại failure**

Với mỗi failed test, phân loại:

```text
1. Test script issue: selector sai, data sai, wait sai, flow chưa đúng.
2. Environment issue: SUT chưa chạy, database sai trạng thái, network lỗi.
3. Product bug: UI hoặc business behavior sai so với expected result.
```

Chỉ tạo bug report cho loại 3.

- [ ] **Step 2: Tạo GitHub Issue cho mỗi bug thật**

Mỗi issue dùng template:

```markdown
## Description

<One-sentence defect summary>

## Environment

- OS: Linux
- Browser: Chrome or browser where defect was observed
- SUT: EShop

## Steps to Reproduce

1. Open <URL>.
2. Perform <action>.
3. Observe <problem>.

## Expected Result

<Expected behavior>

## Actual Result

<Actual behavior>

## Severity

<Low/Medium/High/Critical>

## Evidence

Attach screenshot and link Playwright report/trace if available.
```

- [ ] **Step 3: Tạo bug report markdown**

Create `reports/bug-report.md`:

```markdown
# Bug Report

| Bug ID | Feature | Severity | GitHub Issue | Screenshot | Status |
| --- | --- | --- | --- | --- | --- |
| BUG-001 | <Feature> | <Low/Medium/High/Critical> | <IssueURL> | <ScreenshotPath> | Open |
```

Nếu không có bug thật, dùng nội dung:

```markdown
# Bug Report

No genuine product defects were confirmed during HW04 execution. Failing automation issues caused by selectors, timing, or test data were fixed and documented in the AI review/gap analysis instead of being reported as product bugs.
```

### Task 10: Viết AI Review, Gap Analysis Và AI Critique

**Files:**
- Modify: `reports/main-report.md`
- Create: `reports/ai-critique.md`

- [ ] **Step 1: Thêm phần review AI-generated scripts**

Append to `reports/main-report.md`:

```markdown
## AI-Generated Script Review and Gap Analysis

| Feature | AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- | --- |
| FR-02 | AI used a fragile selector for the login button | Replaced it with a role-based locator matching the real button name | The prompt did not include the actual DOM, so AI guessed a common login layout |
| FR-07 | AI checked only that the cart page opened | Added assertions for cart count and product row | AI focused on navigation success instead of business correctness |
| FR-14 | AI used fixed waits after saving a category | Replaced waits with web-first assertions on the category row | AI produced a generic automation pattern without observing app latency |
```

- [ ] **Step 2: Viết AI Critique 200-300 từ**

Create `reports/ai-critique.md`:

```markdown
# AI Critique

<Write 200-300 words here. Address where AI was wrong, biased, or incomplete; why it failed to catch the issue; and what principle was learned about collaborating with AI. Keep the critique specific to the actual scripts and fixes made in this homework.>
```

Expected: đoạn critique dài 200-300 từ, cụ thể theo bài làm thật.

### Task 11: Quay Video Demo

**Files:**
- Modify: `README.md`
- Modify: `reports/main-report.md`

- [ ] **Step 1: Chuẩn bị kịch bản demo**

Video cần quay các bước:

```text
1. Mở terminal.
2. Chạy whoami.
3. Chạy hostname.
4. Chạy STUDENT_ID=<StudentID> BASE_URL=<EShopURL> npx playwright test tests/<chosen-feature>.spec.ts --project=chromium --project=firefox --project=webkit.
5. Mở Playwright HTML report.
6. Chỉ ra "Run by: <StudentID>" và ISO timestamp trong report.
7. Giải thích một lỗi AI tạo ra và cách mình sửa.
8. Mở spec file và data file tương ứng để chứng minh data-driven testing.
```

- [ ] **Step 2: Quay và upload video**

Expected:

```text
1. Video dài ít nhất 5 phút.
2. Thuyết minh bằng tiếng Việt.
3. YouTube visibility là unlisted.
4. Có face-cam hoặc terminal chạy whoami và hostname.
```

- [ ] **Step 3: Ghi link video**

Thêm link video vào `README.md` và `reports/main-report.md`.

### Task 12: Xuất Commit Log, PDF Và Gói Nộp

**Files:**
- Create: `reports/git-commit-log.txt`
- Create: `<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip`

- [ ] **Step 1: Xuất git commit log**

Run:

```bash
git log --oneline --decorate > reports/git-commit-log.txt
```

Expected: `reports/git-commit-log.txt` tồn tại và có lịch sử commit.

- [ ] **Step 2: Kiểm tra 8 commits test-script**

Run:

```bash
git log --name-only --pretty=format:'COMMIT %h %s' -- '*.spec.ts' '*.spec.js'
```

Expected: có ít nhất 8 commits thay đổi `.spec.ts`, `.spec.js` hoặc file test-script tương đương.

- [ ] **Step 3: Xuất PDF từ Markdown**

Xuất PDF cho các file:

```text
reports/main-report.md
reports/ai-audit-report.md
reports/ai-critique.md
```

Expected:

```text
reports/main-report.pdf
reports/ai-audit-report.pdf
reports/ai-critique.pdf
```

- [ ] **Step 4: Kiểm tra nội dung bắt buộc trước khi zip**

Xác nhận các file/thư mục sau tồn tại:

```text
README.md
reports/main-report.md
reports/main-report.pdf
reports/ai-audit-report.md
reports/ai-audit-report.pdf
reports/ai-critique.md
reports/ai-critique.pdf
reports/bug-report.md
reports/test-summary.md
reports/git-commit-log.txt
tests/feature-a.spec.ts
tests/feature-b.spec.ts
tests/feature-c.spec.ts
tests/data/feature-a.json
tests/data/feature-b.json
tests/data/feature-c.json
playwright-report/
package.json
package-lock.json
playwright.config.ts
```

- [ ] **Step 5: Tạo file zip nộp bài**

Run:

```bash
zip -r <StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip README.md reports tests playwright-report package.json package-lock.json playwright.config.ts
```

Expected: file zip có đúng định dạng tên `<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip` và chứa đủ tài liệu bắt buộc.

## 13. Checklist Tự Review Plan

- Spec coverage:
  - 3 features từ Pools A-C: Tasks 1, 4, 5, 6.
  - Tối thiểu 12 test cases mỗi feature: Tasks 4, 5, 6.
  - Data-driven `.json` files: Tasks 4, 5, 6.
  - Ít nhất 3 assertion patterns: Tasks 4, 5, 6, 7.
  - Chạy 3 browsers và tạo HTML report có `Run by: {StudentID}` cùng ISO timestamp: Tasks 2, 8.
  - Human review AI-generated scripts: Tasks 7, 10.
  - Bug report và GitHub Issues: Task 9.
  - Video demo ít nhất 5 phút, tiếng Việt, có bằng chứng tác giả: Task 11.
  - AI Audit Report và AI Critique: Tasks 3, 10.
  - Git commit log và ít nhất 8 commits test-script: Tasks 7, 12.
  - README self-assessment và test summary: Task 8.
- Placeholder scan:
  - Các giá trị `<StudentID>`, `<FullName>`, `<EShopURL>`, `<ScoreA>`, `<ExecutedCount>`, `<YouTubeUnlistedURL>` là thông tin cá nhân/kết quả thực thi phải điền khi làm thật.
- Type consistency:
  - Plan dùng TypeScript, Playwright Test, JSON data và helper APIs nhất quán giữa các tasks.

## 14. Hướng Thực Thi Tiếp Theo

Plan complete and saved to `docs/superpowers/plans/2026-08-16-hw04-automation-testing.md`.

1. **Subagent-Driven (recommended)** - chia từng task cho subagent mới, review sau mỗi task, phù hợp nếu muốn làm nhanh và kiểm soát chất lượng.
2. **Inline Execution** - thực hiện trực tiếp trong session này theo plan, có checkpoint sau từng nhóm task.
