# HW04 Automation Testing Plan

## Summary

- Scope chính: tự động hóa đúng 3 feature đã chốt từ `docs/Main_Report.md`: FR-02 Đăng nhập & khóa tài khoản, FR-09 Áp dụng mã giảm giá, FR-17 Admin Coupon CRUD.
- Không dùng FR-07 trong phần nộp chính vì HW04 yêu cầu 1 feature từ mỗi Pool A/B/C; FR-07 chỉ giữ làm tài liệu tham khảo nếu cần.
- Sinh viên: Lê Mai Hoài Bảo, MSSV `23127326`.
- Tooling: Playwright Test + TypeScript + JSON data files + Playwright HTML reporter, chạy Chromium/Firefox/WebKit.

## Key Changes

- Update/replace old plan in `docs/superpowers/plans/2026-08-16-hw04-automation-testing.md` so Feature B becomes FR-09 and Feature C becomes FR-17, not FR-07/FR-14.
- Create Playwright project files: `package.json`, `package-lock.json`, `playwright.config.ts`, `.gitignore`.
- Create shared helpers for:
  - login and token setup using `test@eshop.com / Test1234!` and `admin@eshop.com / Admin123!`;
  - API calls to `/api/login`, `/api/apply-coupon`, `/api/coupons`, `/api/admin/coupons`;
  - report metadata with `Run by: 23127326` and ISO timestamp.
- Create data-driven test files:
  - `tests/data/fr-02-login.json` and `tests/fr-02-login.spec.ts`;
  - `tests/data/fr-09-apply-coupon.json` and `tests/fr-09-apply-coupon.spec.ts`;
  - `tests/data/fr-17-coupon-crud.json` and `tests/fr-17-coupon-crud.spec.ts`.
- Create reports:
  - `reports/main-report.md`;
  - `reports/ai-audit-report.md`;
  - `reports/ai-critique.md`;
  - `reports/bug-report.md`;
  - `reports/test-summary.md`;
  - `reports/git-commit-log.txt`.

## Implementation Plan

- Set up Playwright config with `API_BASE_URL=http://localhost:3000`, `WEB_BASE_URL=http://localhost:5173`, `ADMIN_BASE_URL=http://localhost:5174`, 3 browser projects, HTML report, screenshots/traces/videos on failure.
- FR-02 suite: automate at least 12 cases from `Main_Report.md`, including valid login, nonexistent email, invalid email format, empty required fields, wrong password, lockout after 3 failures, blocked login during lockout, token reuse after lockout, and direct API malformed email.
- FR-09 suite: automate at least 12 coupon apply cases, including `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`, nonexistent coupon, empty code, insufficient total, negative/invalid total, missing/invalid token, wrong `user_id`, max usage, and concurrent/double apply.
- FR-17 suite: automate at least 12 admin coupon CRUD cases, including list coupons, create valid coupon, missing/invalid token, normal user bypass attempt, empty code, duplicate code, invalid type, missing type, zero/negative/non-number discount, missing/invalid expiry, invalid min order, invalid max uses, delete nonexistent coupon, and concurrent duplicate creation.
- Keep all test data outside specs in JSON files; specs only load data and execute cases.
- Use at least 3 assertion patterns across every feature: status/body assertions for API, visible text/row assertions for UI, URL or control-state assertions where UI is used, plus numeric business assertions for discount/final amount.
- Make at least 8 meaningful commits that modify `.spec.ts` files: initial FR-02, initial FR-09, initial FR-17, locator hardening, assertion strengthening, negative case expansion, concurrency/security cases, report metadata/evidence integration.

## Test And Evidence Plan

- Run per-feature:
  - `STUDENT_ID=23127326 npx playwright test tests/fr-02-login.spec.ts --project=chromium --project=firefox --project=webkit`
  - same pattern for FR-09 and FR-17.
- Run full suite:
  - `STUDENT_ID=23127326 npx playwright test --project=chromium --project=firefox --project=webkit`
- Expected minimum: 3 features, 36 automated cases, 9 browser runs, Playwright HTML report showing `Run by: 23127326` and ISO timestamp.
- For each failure, classify as script issue, environment issue, or real product bug. Only real product bugs go into `reports/bug-report.md` and GitHub Issues with screenshot/trace evidence.
- Record AI usage in `reports/ai-audit-report.md`; write `reports/ai-critique.md` in 200-300 words about selector guessing, weak assertions, system-state confusion, and API/UI mismatch.
- Record a Vietnamese unlisted YouTube demo of at least 5 minutes showing `whoami`, `hostname`, one multi-browser run, HTML report, data-driven JSON/spec pair, and one AI-generated issue that was corrected.
- Export PDFs for main report, AI audit, and AI critique, then zip as `23127326_HW04_AI_Automation_<final_score_000_to_100>.zip`.

## Assumptions

- The confirmed HW04 feature set is FR-02, FR-09, FR-17.
- SUT is EShop from `https://github.com/ttbhanh/eshop-sut`; current docs list backend `localhost:3000`, web `localhost:5173`, admin `localhost:5174`, default user/admin accounts, and coupon/admin endpoints.
- Final self-assessed score is calculated after execution, not guessed in the plan.
- FR-07 content in `Main_Report.md` is excluded from the official HW04 scope unless used as optional backup evidence.
