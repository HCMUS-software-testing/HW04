# Báo cáo bug — EShop SUT

## Phạm vi

Báo cáo tổng hợp các findings có thể tái hiện từ `findings/` và có phần xác minh riêng cho các lượt chạy final. Các findings lịch sử được gộp theo nguyên nhân gốc; các folder final được giữ riêng để kiểm tra độc lập script cuối.

## Product bug và gap đã xác nhận

| ID | Feature | Mức độ | Kỳ vọng | Thực tế | Evidence |
| --- | --- | --- | --- | --- | --- |
| BUG-FR01-01 | FR-01 Registration | Cao | Successful registration with `Password123!` redirects to `/login`. | SUT rejects the password because validation expects whitespace and remains on `/register`. | `findings/fr01-final-chrome/`, `findings/fr01-final-edge/`, `findings/fr01-final-firefox/` |
| BUG-FR01-02 | FR-01 Registration | Medium | Registration form provides a Confirm Password control. | `Register.jsx` does not render Confirm Password. | `findings/fr01-final-chrome/`, `findings/fr01-final-edge/`, `findings/fr01-final-firefox/` |
| BUG-FR07-01 | FR-07 Shopping Cart | Medium | Cart summary uses the required “Tổng cộng” label. | SUT renders “Tổng tạm tính”. | `findings/fr07-final-chrome/`, `findings/fr07-final-edge/`, `findings/fr07-final-firefox/` |
| BUG-FR07-02 | FR-07 Shopping Cart | Medium | Users can change quantity and receive quantity validation/confirmation behavior. | SUT has no quantity input, increase/decrease controls, validation, or confirmation dialog. | `findings/fr07-final-chrome/`, `findings/fr07-final-edge/`, `findings/fr07-final-firefox/` |
| BUG-FR07-03 | FR-07 Shopping Cart | Medium | Empty cart renders the required empty-state illustration when specified. | The required illustration is not rendered by the SUT. | `findings/fr07-final-chrome/`, `findings/fr07-final-edge/`, `findings/fr07-final-firefox/` |
| BUG-FR18-01 | FR-18 Admin Orders | Medium | Successful status updates show the specified Vietnamese success message. | SUT returns/displays English “Order status updated”. | `findings/fr18-final-chrome/`, `findings/fr18-final-edge/`, `findings/fr18-final-firefox/` |
| BUG-FR18-02 | FR-18 Admin Orders | High | Delivered and canceled orders are final and cannot be updated. | Canceled orders still expose “Đánh dấu Đã giao” and can be updated. | `findings/fr18-final-chrome/`, `findings/fr18-final-edge/`, `findings/fr18-final-firefox/` |
| BUG-FR18-03 | FR-18 Admin Orders | Medium | Admin can filter orders by status. | Admin UI has no status filter. | `findings/fr18-final-chrome/`, `findings/fr18-final-edge/`, `findings/fr18-final-firefox/` |

## Xác minh từ lượt chạy final

Các folder evidence final có một HTML report cho mỗi feature/browser: FR-01 (`fr01-final-chrome`, `fr01-final-edge`, `fr01-final-firefox`), FR-07 (`fr07-final-chrome`, `fr07-final-edge`, `fr07-final-firefox`) và FR-18 (`fr18-final-chrome`, `fr18-final-edge`, `fr18-final-firefox`). Các failure lặp lại khớp với nguyên nhân lịch sử và bổ sung hai chi tiết FR-07 chưa có trong bảng ban đầu:

- **FR-01:** cả ba browser tái hiện failure của oracle đăng ký; không thể tự động hóa Confirm Password vì control này không tồn tại.
- **FR-07:** cả ba browser tái hiện lỗi thiếu illustration và lỗi assertion cart summary/product. Lượt final còn cho thấy thêm cùng một sản phẩm tạo hai row thay vì một row, quantity/subtotal không khớp JSON. Các case quantity và confirmation vẫn là skip rõ ràng.
- **FR-18:** cả ba browser tái hiện thông báo cập nhật bằng tiếng Anh và action không hợp lệ trên đơn đã hủy. Các case filter vẫn là skip vì UI không có filter.

Các folder final là evidence của phiên bản script/SUT hiện tại và nên được trích dẫn cùng findings lịch sử khi nộp báo cáo.

## Case chưa thể tự động hóa trên SUT hiện tại

Các case quantity, boundary và confirmation dialog của FR-07 được giữ là skip vì control tương ứng không tồn tại. Các case filter status của FR-18 cũng là skip vì UI không render filter. Đây là product gap được ghi nhận, không phải test pass ngầm.

## Finding về script và môi trường

Một số failure ban đầu thuộc script hoặc môi trường, không phải product bug: FR-01 dùng locator `getByLabel()` không liên kết; FR-07 suy luận card theo thứ tự heading rồi làm mất cart state khi điều hướng; FR-18 tìm `#<orderId>` trong khi UI hiển thị ID không có `#`. Các lỗi này đã được sửa ở các spec sau. Fedora không chạy được WebKit vì thiếu dependency Ubuntu/ICU của Playwright; project dùng Chrome, Edge và Firefox theo lựa chọn được đề cho phép. Fixture database sau đó được seed bằng order ID ổn định.

## Việc tiếp theo

Các lượt chạy final đã được lưu và được liên kết trong báo cáo chính cùng GitHub Issues.
