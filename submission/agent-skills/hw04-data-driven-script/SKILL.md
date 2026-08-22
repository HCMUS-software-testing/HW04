---
name: hw04-data-driven-script
description: Dùng khi cần chuyển test cases của HW04 EShop thành automation scripts Playwright theo hướng data-driven, tách dữ liệu ra file JSON hoặc CSV, có selector ổn định và assertion rõ ràng.
---

# HW04 Data-Driven Script

## Mục tiêu

Tạo automation script cho một feature web của EShop trong HW04. Script phải dựa trên test cases đã review, đọc test data từ file riêng, chạy được bằng Playwright, và không hardcode mảng dữ liệu trực tiếp trong file spec.

## Khi nào dùng skill này

Dùng skill này khi người dùng yêu cầu:

- Sinh automation script cho một feature thuộc Pool A, B hoặc C.
- Chuyển test cases thủ công thành Playwright tests.
- Tạo data-driven tests cho EShop.
- Tách test data ra `.json` hoặc `.csv`.
- Bổ sung assertion patterns cho test script.

## Input

Người dùng hoặc repo cần cung cấp:

- **Feature ID:** ví dụ `FR-03`, `FR-10`, `FR-14`.
- **Feature name:** tên chức năng bằng tiếng Việt hoặc tiếng Anh.
- **Pool:** `A`, `B` hoặc `C`.
- **Danh sách test cases:** tối thiểu 12 test cases, gồm positive, negative và Coc Coc cases nếu có.
- **Base URL của SUT:** ví dụ `http://localhost:3000`.
- **Thông tin tài khoản test:** email, mật khẩu, vai trò user/admin nếu feature cần đăng nhập.
- **Định dạng data mong muốn:** `.json` hoặc `.csv`.
- **Đường dẫn output mong muốn:** ví dụ `tests/feature-a.spec.ts` và `tests/data/feature-a.json`.

Nếu thiếu thông tin, tự đánh dấu placeholder rõ ràng bằng `<...>` và ghi vào phần cần xác nhận, không bịa dữ liệu thật.

## Output

Skill phải tạo hoặc đề xuất các artifact sau:

- **Spec file Playwright:** ví dụ `tests/feature-a.spec.ts`.
- **Data file:** ví dụ `tests/data/feature-a.json` hoặc `tests/data/feature-a.csv`.
- **Danh sách assertion patterns đã dùng:** tối thiểu 3 loại, ví dụ URL assertion, visible text assertion, form/control state assertion, business value assertion.
- **Ghi chú review:** các giả định selector, precondition và dữ liệu cần kiểm chứng thủ công.
- **Mục báo cáo ngắn:** nội dung có thể chèn vào `main-report.md`.

## Quy trình thực hiện

1. Đọc feature requirement và test cases.
2. Chuẩn hóa mỗi test case thành cấu trúc:
   - `id`
   - `type`
   - `preconditions`
   - `data`
   - `steps`
   - `expected`
   - `assertionPattern`
3. Tạo data file ngoài script.
4. Tạo spec file đọc data từ file ngoài.
5. Dùng Playwright locator ưu tiên theo thứ tự:
   - `getByRole`
   - `getByLabel`
   - `getByPlaceholder`
   - `getByText`
   - `data-testid` nếu SUT có sẵn
6. Tránh selector mong manh như CSS chain dài, XPath dài, hoặc selector phụ thuộc vị trí nếu chưa bắt buộc.
7. Với mỗi test case, gắn ít nhất một assertion có ý nghĩa nghiệp vụ.
8. Không dùng `waitForTimeout` trừ khi có lý do rõ ràng; ưu tiên auto-wait của Playwright và assertion có timeout.
9. Chạy test nếu môi trường SUT sẵn sàng.
10. Ghi lại mọi phần cần con người kiểm chứng vào báo cáo.

## Yêu cầu chất lượng

- Mỗi feature có ít nhất 12 test cases.
- Test data nằm trong file riêng.
- Spec không chứa inline array/object làm nguồn dữ liệu chính.
- Assertion không chỉ kiểm tra “không lỗi”; phải kiểm tra kết quả thấy được hoặc trạng thái nghiệp vụ.
- Tên test nên chứa mã test case, ví dụ `A-001`.
- Test phải đủ rõ để giải thích trong oral defense.

## Mẫu prompt sử dụng

```text
Hãy dùng skill hw04-data-driven-script để tạo Playwright data-driven tests cho feature <FeatureID> - <FeatureName> của EShop.

Input:
- Pool: <A/B/C>
- Base URL: <URL>
- Account: <role/email/password>
- Data format: <json/csv>
- Spec output: <path>
- Data output: <path>
- Test cases:
  <dán tối thiểu 12 test cases>

Output cần có:
- File spec Playwright
- File test data
- Ít nhất 3 assertion patterns
- Ghi chú các điểm cần human review
```
