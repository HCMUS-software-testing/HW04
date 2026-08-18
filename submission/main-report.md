# HW04 Automation Testing Main Report

## 1. Thông Tin Sinh Viên

- **MSSV:** `23127185`
- **Họ tên:** `Mai Thị Kim Duyên`
- **Ngày thực hiện:** `<YYYY-MM-DD>`
- **SUT:** EShop
- **SUT repository:** <https://github.com/ttbhanh/eshop-sut>
- **Automation repository:** `<PublicGitHubRepositoryURL>`

## 2. Feature Selection

| Pool | Feature ID | Feature Name | Reason / Source |
| --- | --- | --- | --- |
| A | `<FR-03>` | `Quên mật khẩu & Đặt lại mật khẩu (2 bước)` | `HW02 selection` |
| B | `<FR-10>` | `Trạng thái Đơn hàng` | `HW02 selection` |
| C | `<FR-14>` | `Quản lý Danh mục (Category CRUD)` | `HW02 selection` |

### HW02 Availability Declaration

I completed HW02 and reused the same three selected web features for HW04.

## 3. Automation Approach

- **Tool:** Playwright / Selenium: `Playwright`
- **Language:** `Python`
- **Reporter:** `Playwright HTML reporter`
- **Browsers:** `<Chromium>`
- **Data-driven format:** `<JSON / CSV>`
- **Run metadata:** HTML report hiển thị `Run by: <23127185>` và ISO timestamp.

## 4. Feature A Automation Report

### 4.1 Feature Information

- **Pool:** A
- **Feature ID:** `<FR-xx>`
- **Feature name:** `<FeatureAName>`
- **Spec file:** `<tests/feature-a.spec.ts>`
- **Data file:** `<tests/data/feature-a.json>`

### 4.2 Reviewed Test Cases

| Test ID | Type | Preconditions | Test Data | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- | --- |
| A-001 | Positive | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<URL / visible text / state>` |
| A-002 | Negative | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-003 | Coc Coc | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-004 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-005 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-006 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-007 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-008 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-009 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-010 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-011 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| A-012 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |

### 4.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | 12 | 4 | 8 | `playwright-report/index.html` |
| Firefox | 12 | 4 | 8 | `playwright-report/index.html` |
| Cốc Cốc | 12 | 4 | 8 | `playwright-report/index.html` |

### 4.4 AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| **Locator quá chung chung và thiếu chuẩn accessibility:** AI dùng `page.locator('input[type="text"]').first()` cho cả ô nhập Email và ô nhập OTP. | Sửa sang Playwright Locators chuẩn: `page.getByPlaceholder(/email/i)` cho email và `page.getByPlaceholder(/otp|mã/i)` cho OTP. | AI suy đoán DOM tiêu chuẩn chung, không trực tiếp inspect DOM thực tế của ứng dụng SUT. |
| **Logic bóc tách OTP từ banner thông báo cứng:** AI dùng Regex `Mã OTP của bạn là: (\w+)` để tự lấy OTP từ notification và điền vào form. | Loại bỏ Regex parsing trong test script, lấy trực tiếp giá trị `tc.otp` từ data file JSON để đảm bảo tính nhất quán của data-driven testing. | AI tự động thiết kế logic lấy OTP động mà không lường trước việc SUT có thể thay đổi định dạng thông báo. |
| **Bỏ qua trường Confirm Password bị thiếu:** AI dùng `if (await confirmPasswordInput.isVisible())` bọc trường Confirm Password nên test không bắt được lỗi thiếu trường UI. | Loại bỏ điều kiện kiểm tra tồn tại rỗng, kiểm tra trực tiếp sự thiếu hụt của trường Confirm Password theo đúng yêu cầu test case. | AI giả định form đặt lại mật khẩu luôn tuân theo chuẩn có 2 ô mật khẩu và tự động bọc trong kiểm tra `isVisible()`. |
| **Assertion bị gượng ép (Suppressing Failures cho Negative Cases):** AI viết `if (!isVisible && tc.type === 'Negative') expect(tc.type).toBe('Negative')`, làm cho test case luôn Pass dù SUT không hiện thông báo lỗi. | Khắc phục assertion, yêu cầu kiểm tra chính xác thông báo lỗi trên UI bằng `await expect(messageElement).toBeVisible()`. | AI cố gắng xử lý các trường hợp test fail bằng cách thêm logic điều kiện để giữ cho test result "xanh" (PASSED). |
| **Assertion chuyển trang (`urlState`) chưa đầy đủ:** AI chỉ kiểm tra URL chứa `/login` hoặc `/reset-success` với timeout ngắn mà không bắt thông báo validate sai password policy. | Bổ sung assertion kiểm tra cả thông báo lỗi validation mật khẩu/OTP (`.alert, .error, .toast`) và trạng thái URL. | AI ưu tiên assertion đơn giản trên URL thay vì kiểm tra toàn diện kết quả nghiệp vụ của SUT. |

## 5. Feature B Automation Report

### 5.1 Feature Information

- **Pool:** B
- **Feature ID:** `<FR-xx>`
- **Feature name:** `<FeatureBName>`
- **Spec file:** `<tests/feature-b.spec.ts>`
- **Data file:** `<tests/data/feature-b.json>`

### 5.2 Reviewed Test Cases

| Test ID | Type | Preconditions | Test Data | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- | --- |
| B-001 | Positive | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-002 | Negative | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-003 | Coc Coc | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-004 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-005 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-006 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-007 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-008 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-009 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-010 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-011 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| B-012 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |

### 5.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | `<count>` | `<count>` | `<count>` | `<link/path>` |
| Firefox | `<count>` | `<count>` | `<count>` | `<link/path>` |
| WebKit | `<count>` | `<count>` | `<count>` | `<link/path>` |

### 5.4 AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| `<issue>` | `<fix>` | `<reason>` |

## 6. Feature C Automation Report

### 6.1 Feature Information

- **Pool:** C
- **Feature ID:** `<FR-xx>`
- **Feature name:** `<FeatureCName>`
- **Spec file:** `<tests/feature-c.spec.ts>`
- **Data file:** `<tests/data/feature-c.json>`

### 6.2 Reviewed Test Cases

| Test ID | Type | Preconditions | Test Data | Steps | Expected Result | Assertion Pattern |
| --- | --- | --- | --- | --- | --- | --- |
| C-001 | Positive | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-002 | Negative | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-003 | Coc Coc | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-004 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-005 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-006 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-007 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-008 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-009 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-010 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-011 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |
| C-012 | `<type>` | `<precondition>` | `<data>` | `<steps>` | `<expected>` | `<assertion>` |

### 6.3 Execution Result

| Browser | Executed | Passed | Failed | HTML Report / Evidence |
| --- | ---: | ---: | ---: | --- |
| Chromium | `<count>` | `<count>` | `<count>` | `<link/path>` |
| Firefox | `<count>` | `<count>` | `<count>` | `<link/path>` |
| WebKit | `<count>` | `<count>` | `<count>` | `<link/path>` |

### 6.4 AI Review And Human Fixes

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| `<issue>` | `<fix>` | `<reason>` |

## 7. Data-Driven Testing Evidence

| Feature | Data File | Number Of Records | Notes |
| --- | --- | ---: | --- |
| Feature A | `<path>` | `<count>` | `<notes>` |
| Feature B | `<path>` | `<count>` | `<notes>` |
| Feature C | `<path>` | `<count>` | `<notes>` |

## 8. Assertion Patterns Used

| Assertion Pattern | Example Location | Purpose |
| --- | --- | --- |
| URL assertion | `<spec file + line>` | Verify navigation result |
| Visible text assertion | `<spec file + line>` | Verify message/content appears |
| Form/control state assertion | `<spec file + line>` | Verify input/button state |
| Business value assertion | `<spec file + line>` | Verify cart count, subtotal, row value, or CRUD result |

## 9. Multi-Browser HTML Reports

| Run | Browser | Feature(s) | Report Path / Link | Contains `Run by: <StudentID>` | Contains ISO Timestamp |
| --- | --- | --- | --- | --- | --- |
| 1 | Chromium | `<feature>` | `<path/link>` | `<Yes/No>` | `<Yes/No>` |
| 2 | Firefox | `<feature>` | `<path/link>` | `<Yes/No>` | `<Yes/No>` |
| 3 | WebKit | `<feature>` | `<path/link>` | `<Yes/No>` | `<Yes/No>` |

## 10. Bugs Found

| Bug ID | Feature | Summary | Severity | GitHub Issue | Screenshot |
| --- | --- | --- | --- | --- | --- |
| BUG-001 | FR-03 Quên & Đặt lại MK | Không thể đặt lại mật khẩu do SUT validate sai Password Policy và thiếu trường Xác nhận mật khẩu | High | https://github.com/ttbhanh/eshop-sut/issues/1 | playwright-report/data/bug-001.png |
| BUG-002 | FR-03 Quên & Đặt lại MK | Hệ thống tạo mã OTP chỉ có 4 chữ số thay vì 6 chữ số theo chuẩn yêu cầu | Medium | https://github.com/ttbhanh/eshop-sut/issues/2 | playwright-report/data/bug-002.png |

## 11. Test Cases Not Automated

| Feature | Test Case | Reason Not Automated | Manual Evidence / Note |
| --- | --- | --- | --- |
| `<feature>` | `<test case>` | `<reason>` | `<note>` |

Nếu tất cả test cases đã được tự động hóa, ghi:

```text
All selected test cases were automated.
```

## 12. Demo Video

- **YouTube unlisted link:** `<YouTubeUnlistedURL>`
- **Duration:** `<mm:ss>`
- **Language:** Vietnamese narration
- **Authorship evidence:** `<face-cam / whoami + hostname>`
- **Script demonstrated:** `<spec file>`
- **AI-generated issue explained:** `<issue and fix>`

## 13. Conclusion

`<Tóm tắt kết quả đạt được, các điểm còn hạn chế, và mức độ hoàn thành so với yêu cầu HW04.>`
