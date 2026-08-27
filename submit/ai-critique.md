# Nhận Xét Về AI

Trong HW04, AI hỗ trợ đọc yêu cầu, dựng cấu trúc Playwright, tạo test theo dữ liệu và viết helper API/UI. Tuy nhiên, kết quả ban đầu chưa đủ tin cậy để dùng trực tiếp. AI có xu hướng suy đoán hành vi mong muốn từ tên tính năng thay vì kiểm chứng source SUT. Ví dụ, AI kỳ vọng login response không trả password, input email phải là `type="email"`, lockout kéo dài 30 giây và API phải trả mã lỗi cụ thể. Khi chạy thật, các kỳ vọng này thất bại do SUT hoạt động khác hoặc test oracle quá chặt.

AI cũng dễ tạo selector theo giả định. Một số UI test phụ thuộc placeholder hoặc text cụ thể, trong khi giao diện dùng nhãn tiếng Việt không đồng nhất. AI cũng chưa tự phát hiện hết rủi ro database state còn lại từ case trước. Vì vậy, em bổ sung helper reset/cleanup và chạy serial cho các nhóm có trạng thái dùng chung.

AI không thể tự bảo đảm oracle đúng nếu không chạy test và đọc lỗi thật. AI giỏi tạo khung nhanh, nhưng sinh viên phải kiểm tra bằng report, trace, screenshot và source code. Bài học rút ra là nên dùng AI như cộng tác viên tạo bản nháp, sau đó xác minh bằng lần chạy thật, tách bug SUT khỏi lỗi assertion và ghi nhận kết quả trung thực.
