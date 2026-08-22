# AI Critique

## Phân Tích & Phê Bình Quá Trình Sử Dụng AI (258 từ)

Trong quá trình thực hiện bài tập tự động hóa kiểm thử HW04 với AI (Gemini 3.6 Flash), AI đã hỗ trợ rất tốt trong việc sinh cấu trúc kịch bản Playwright ban đầu và chuyển đổi 36 test cases từ Markdown sang dữ liệu JSON data-driven. Tuy nhiên, mã nguồn do AI tạo ra gặp nhiều thiếu sót nghiêm trọng về tính ổn định và độ chính xác kiểm thử:

1. **AI sai và chưa đầy đủ ở đâu:**
   - **Xử lý Locator và UI Mismatch:** AI thường giả định DOM theo chuẩn chung như `input[type="text"].first()`, dẫn đến lầm lẫn giữa các trường dữ liệu (Email vs OTP). Ở Feature Admin (FR-14), AI điều hướng sai port giao diện Admin UI (`localhost:5173` thay vì `localhost:5174`) và sử dụng locator tiếng Anh trên màn hình đăng nhập tiếng Việt.
   - **Bị che lấp Bug sản phẩm (Bug Masking):** Khi gặp các lỗi phân quyền nghiêm trọng (RBAC Bypass ở FR-10 và FR-14 khi tài khoản User có thể Thêm/Sửa/Xóa dữ liệu Admin), AI đã tự động bọc câu lệnh kiểm tra hoặc hạ thấp kỳ vọng assertion về status code `200 OK` thay vì giữ nguyên `403 Forbidden`, làm cho test case hiển thị PASSED giả tạo.
   - **Setup trạng thái tĩnh:** Ở FR-10 (Order Status), AI sử dụng ID đơn hàng cố định mà không xây dựng fixture khởi tạo trạng thái đơn hàng động qua API.

2. **Vì sao AI không phát hiện được vấn đề:**
   AI sinh mã nguồn hoàn toàn dựa trên ngữ cảnh tĩnh từ prompt và tri thức tổng quát, không trực tiếp thực thi kịch bản trên ứng dụng SUT thực tế, không kiểm tra phản hồi API thực tế, và không trực tiếp inspect DOM của giao diện tiếng Việt.

3. **Nguyên tắc học được khi cộng tác với AI:**
   AI chỉ đóng vai trò là một trợ lý hỗ trợ tăng tốc viết code, không thể thay thế tư duy kiểm thử của con người. Người kiểm thử phải luôn giữ vai trò kiểm soát: trực tiếp chạy kịch bản, đối chiếu kết quả với yêu cầu hệ thống (Requirement Spec), và refactor mã nguồn AI để đảm bảo tính chính xác và tin cậy của bộ kiểm thử.