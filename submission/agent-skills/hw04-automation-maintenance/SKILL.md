---
name: hw04-automation-maintenance
description: Dùng khi cần review, sửa lỗi và bảo trì automation scripts do AI tạo cho HW04 EShop, bao gồm selector, assertion, flaky waits, test data và bug report.
---

# HW04 Automation Maintenance

## Mục tiêu

Review automation scripts do AI tạo, phát hiện điểm sai hoặc thiếu, sửa test để ổn định hơn, và ghi lại phần human review theo yêu cầu HW04. Nếu failing assertion chỉ ra bug thật của SUT, tạo bug report có đủ bằng chứng.

## Khi nào dùng skill này

Dùng skill này khi người dùng yêu cầu:

- Review script do AI sinh.
- Tìm lỗi selector, wait, assertion hoặc test data.
- Sửa Playwright tests bị fail hoặc flaky.
- Viết phần “AI Review And Human Fixes” cho báo cáo.
- Tạo bug report Markdown từ lỗi phát hiện trong automation.

## Input

Người dùng hoặc repo cần cung cấp:

- **Spec file cần review:** ví dụ `tests/feature-a.spec.ts`.
- **Data file liên quan:** ví dụ `tests/data/feature-a.json`.
- **Feature requirement hoặc test cases gốc.**
- **Log chạy test:** terminal output, Playwright trace, screenshot hoặc HTML report.
- **Thông tin môi trường:** browser, base URL, tài khoản test, OS nếu có.
- **Tiêu chí mong đợi:** expected result từ test case hoặc requirement.
- **Student ID:** dùng cho report và bằng chứng.

Nếu thiếu log hoặc screenshot, trước tiên phải chạy lại test hoặc ghi rõ không đủ bằng chứng để kết luận bug thật.

## Output

Skill phải tạo hoặc đề xuất các artifact sau:

- **Danh sách vấn đề automation:** selector yếu, assertion thiếu, wait không ổn định, data sai, setup thiếu, dependency môi trường.
- **Bản sửa script/data:** thay đổi cụ thể trong spec hoặc data file.
- **Bảng AI Review And Human Fixes:** gồm `AI Issue`, `Human Fix`, `Why AI Missed It`.
- **Kết luận fail:** phân loại là bug thật, lỗi automation, lỗi data hoặc lỗi môi trường.
- **Bug report Markdown:** nếu có bug thật, gồm ID, mô tả, steps, expected, actual, severity, OS Linux, browser Chrome, screenshot và GitHub Issue link nếu có.
- **Ghi chú test case không tự động hóa được:** nếu có, nêu lý do rõ ràng.

## Quy trình thực hiện

1. Đọc spec file, data file và test case gốc.
2. Chạy hoặc đọc kết quả test fail.
3. Không sửa ngay theo phỏng đoán; xác định nguyên nhân trước:
   - Locator không tìm thấy element.
   - Page điều hướng khác expected.
   - Data không tồn tại trong database.
   - Assertion quá yếu hoặc quá chặt.
   - Race condition hoặc wait không đúng.
   - SUT có bug thật.
4. Kiểm tra selector theo thứ tự ưu tiên:
   - Role/name accessible.
   - Label/placeholder.
   - Text ổn định.
   - `data-testid`.
   - CSS selector ngắn và có ý nghĩa nếu không còn lựa chọn tốt hơn.
5. Sửa test theo hướng ổn định:
   - Thay `waitForTimeout` bằng assertion hoặc wait theo trạng thái.
   - Tách data sang file ngoài nếu còn hardcode.
   - Tăng chất lượng assertion để kiểm tra kết quả nghiệp vụ.
   - Gom helper chỉ khi có lặp đáng kể.
6. Chạy lại test liên quan trên ít nhất một browser để xác nhận fix.
7. Chạy lại multi-browser nếu thay đổi ảnh hưởng luồng chính.
8. Ghi lại phát hiện vào báo cáo.
9. Nếu là bug thật, tạo bug report và chuẩn bị screenshot để đính kèm GitHub Issue.

## Yêu cầu chất lượng

- Không coi mọi test fail là bug sản phẩm.
- Không ghi bug thật nếu chưa có expected result và bằng chứng rõ ràng.
- Mỗi human fix phải nêu rõ vì sao AI ban đầu sai hoặc thiếu.
- Bug report phải có steps tái hiện đủ ngắn và rõ.
- Các sửa đổi phải giữ data-driven design.
- Không làm mất yêu cầu chạy 3 browsers và HTML report.

## Mẫu bảng review

| AI Issue | Human Fix | Why AI Missed It |
| --- | --- | --- |
| AI dùng selector CSS phụ thuộc thứ tự menu. | Đổi sang `getByRole('link', { name: /.../ })`. | Prompt ban đầu không cung cấp DOM và AI suy đoán cấu trúc giao diện. |
| AI chỉ assert URL sau khi submit form. | Bổ sung assert thông báo thành công và trạng thái dữ liệu hiển thị. | AI ưu tiên kiểm tra điều hướng nhưng bỏ qua kết quả nghiệp vụ. |
| AI dùng `waitForTimeout(3000)`. | Thay bằng `await expect(locator).toBeVisible()`. | AI cố xử lý bất đồng bộ bằng delay cố định nên dễ flaky. |

## Mẫu prompt sử dụng

```text
Hãy dùng skill hw04-automation-maintenance để review và sửa automation script sau.

Input:
- Spec file: <path>
- Data file: <path>
- Feature requirement: <requirement>
- Test run log: <log hoặc report path>
- Browser: <browser>
- Base URL: <BaseURL>
- Student ID: <StudentID>

Output cần có:
- Danh sách lỗi của script do AI tạo
- Bản sửa đề xuất hoặc patch
- Bảng AI Review And Human Fixes
- Kết luận fail là bug thật hay lỗi automation
- Bug report nếu có bug thật
```
