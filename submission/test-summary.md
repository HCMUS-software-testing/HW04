# Test Summary Report

## Overall Summary

| Metric | Value |
| --- | ---: |
| Number of features | 3 |
| Number of test cases automated | 36 |
| Number of test cases executed (per browser run) | 36 |
| Total test executions (3 browsers) | 108 |
| Number passed (per browser run / total executions) | 19 / 57 |
| Number failed (per browser run / total executions) | 17 / 51 |
| Number of browser runs | 9 (3 features × 3 browsers) |
| Number of confirmed product bugs | 6 |

## Feature Summary

| Feature | Test Cases Automated | Chromium Passed / Failed | Firefox Passed / Failed | Cốc Cốc Passed / Failed | Notes |
| --- | ---: | --- | --- | --- | --- |
| Feature A - FR-03 Quên & Đặt lại MK | 12 | 3 / 9 | 3 / 9 | 3 / 9 | Failed TCs due to OTP length bug & password policy validation bug |
| Feature B - FR-10 Trạng thái Đơn hàng | 12 | 8 / 4 | 8 / 4 | 8 / 4 | Failed TCs due to RBAC bypass (TC2, TC4, TC6) & cancel shipping order bug (TC10) |
| Feature C - FR-14 Quản lý Danh mục | 12 | 8 / 4 | 8 / 4 | 8 / 4 | Failed TCs due to Category RBAC bypass (TC7, TC8, TC9) & empty name bug (TC10) |

## Browser Run Evidence

| Run ID | Command | Browser | Feature(s) | Started At | Report Path / Link |
| --- | --- | --- | --- | --- | --- |
| RUN-001 | `npx playwright test tests/poolA-fr03-forgot-password.spec.ts` | Chromium, Firefox, Cốc Cốc | FR-03 | 2026-08-22T01:15:00.000Z | `playwright-report/index.html` |
| RUN-002 | `npx playwright test tests/poolB-fr10-order-status.spec.ts` | Chromium, Firefox, Cốc Cốc | FR-10 | 2026-08-22T01:30:00.000Z | `playwright-report/index.html` |
| RUN-003 | `npx playwright test tests/poolC-fr14-category-management.spec.ts` | Chromium, Firefox, Cốc Cốc | FR-14 | 2026-08-22T01:43:00.000Z | `playwright-report/index.html` |

## HTML Report Metadata Check

| Report | Contains `Run by: 23127185` | Contains ISO Timestamp | Verified By |
| --- | --- | --- | --- |
| `playwright-report/index.html` | Yes | Yes | Mai Thị Kim Duyên (23127185) |

## Failed Tests Summary

| Test ID | Feature | Browser | Failure Type | Root Cause | Action Taken |
| --- | --- | --- | --- | --- | --- |
| TC1 | FR-03 | All | Product Bug | SUT sinh OTP 4 chữ số thay vì 6 chữ số | Logged BUG-002 |
| TC5-TC12 | FR-03 | All | Product Bug | SUT thiếu ô Confirm Password và validate sai Password Policy | Logged BUG-001 |
| TC2, TC4, TC6 | FR-10 | All | Product Bug | SUT backend thiếu RBAC check trên endpoint Admin order status | Logged BUG-003 |
| TC10 | FR-10 | All | Product Bug | SUT backend cho phép User hủy đơn khi đang ở trạng thái shipping | Logged BUG-004 |
| TC7, TC8, TC9 | FR-14 | All | Product Bug | SUT backend thiếu RBAC check trên các endpoint Category CRUD | Logged BUG-005 |
| TC10 | FR-14 | All | Product Bug | SUT backend chấp nhận tạo danh mục với tên chuỗi rỗng `""` | Logged BUG-006 |
