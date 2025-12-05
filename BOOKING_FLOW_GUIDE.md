# Hướng Dẫn Flow Tạo Booking - Tutor App

## 📋 Mục lục

1. [Tổng quan](#tổng-quan)
2. [Flow cho Phụ Huynh (Customer)](#flow-cho-phụ-huynh-customer)
3. [Flow cho Gia Sư (Tutor)](#flow-cho-gia-sư-tutor)
4. [Điều kiện để tạo được Booking](#điều-kiện-để-tạo-được-booking)
5. [Chi tiết từng bước](#chi-tiết-từng-bước)

---

## 🎯 Tổng quan

Hệ thống Tutor App cho phép Phụ huynh và Gia sư kết nối với nhau thông qua việc đăng bài và tìm kiếm. Để tạo được một Booking thành công, cả hai bên cần thực hiện đúng các bước và đảm bảo thông tin khớp nhau.

### Quy trình tổng quát:

```
Đăng ký → Đăng nhập → Đăng bài → Tìm kiếm → Chat → Thỏa thuận → Booking
```

---

## 👨‍👩‍👧 Flow cho Phụ Huynh (Customer)

### Bước 1: Đăng ký tài khoản

1. Truy cập trang đăng ký
2. Điền thông tin:
   - Họ tên
   - Email
   - Số điện thoại
   - Mật khẩu
   - Địa chỉ (Đường, Phường, Quận, Thành phố)
3. Click "Đăng ký"

### Bước 2: Đăng nhập

1. Nhập email và mật khẩu
2. Hệ thống sẽ chuyển đến Trang Chủ

### Bước 3: Tạo bài đăng tìm gia sư

1. Vào menu **"Tạo bài đăng"**
2. Điền đầy đủ thông tin:
   - **Tiêu đề bài đăng**: Ví dụ: "Cần tìm gia sư dạy Toán lớp 9"
   - **Môn học** ⚠️: Chọn chính xác (Toán, Văn, Tiếng Anh, Vật lý, Hóa học, Sinh học, Lịch sử, Địa lý, Tin học)
   - **Lớp học**: Chọn chính xác (Lớp 1-12, Khác)
   - **Số buổi/tuần**: Ví dụ: 3 buổi
   - **Lương/buổi**: Ví dụ: 300,000 VNĐ
   - **Thời gian học**: Ví dụ: "18:00 - 20:00"
   - **Ngày học**: Ví dụ: "Thứ 2, Thứ 4, Thứ 6"
   - **Mô tả thêm**: Yêu cầu chi tiết khác
3. Click **"Đăng bài"**

### Bước 4: Xem bài đăng của bản thân

1. Vào menu **"Bài đăng tìm gia sư của tôi"**
2. Bấm vào nút tìm gia sư ở bài đăng:
   - **lưu ý**: hệ thống dựa theo môn học của bài đăng từ phụ huynh và gia sư để tìm ra bài đăng phụ hợp
3. Chọn bài đăng phù hợp hệ thống trả ra từ bước 4.2 ( CLick vào bài đăng )

### Bước 5: Gửi yêu cầu chat với Gia sư

1. Click vào nút **"Liên hệ**ở bài đăng
2. Bấm vào nút **"Thanh toán online"** và tiến thành chuyển khoản 50.000 VND
3. Sau khi thanh toán thành công bấm vào nút **"Vào phòng chat"**

### Bước 6: Thảo luận trong phòng chat

1. Đọc **Nội quy phòng chat** (không được chia sẻ thông tin cá nhân)
2. Thảo luận với gia sư về:
   - Chi tiết lớp học
   - Thời gian cụ thể
   - Lương thỏa thuận
   - Yêu cầu đặc biệt
3. Có thể chỉnh sửa thông tin lớp học bằng nút **✏️ Edit**:
   - Lương/buổi
   - Ngày học trong tuần
   - Thời gian học

### Bước 7: Xác nhận nhận lớp

1. Sau khi thỏa thuận xong
2. Click nút **"Xác nhận nhận lớp"** (màu xanh)
3. Hệ thống sẽ:
   - Tạo Booking với thông tin đã thỏa thuận
   - Lưu địa chỉ từ bài đăng vào Security Code
   - Xóa phòng chat
   - Chuyển đến trang "Booking"

### Bước 8: Quản lý Booking

1. Vào menu **"Booking"**
2. Xem thông tin booking:
   - ID Booking
   - Giá/Tiết
   - Buổi/tuần
   - Ngày dạy
   - Giờ dạy
   - **Địa chỉ** (hiển thị tự động)
3. Theo dõi Tracking của gia sư
4. Đánh giá sau khi hoàn thành

---

## 👨‍🏫 Flow cho Gia Sư (Tutor)

### Bước 1: Đăng ký tài khoản

1. Truy cập trang đăng ký
2. Điền thông tin:
   - Họ tên
   - Email
   - Số điện thoại
   - Mật khẩu
   - Địa chỉ

### Bước 2: Đăng nhập

1. Nhập email và mật khẩu
2. Hệ thống sẽ chuyển đến Tutor Dashboard

### Bước 3: Tạo bài đăng tìm học sinh

1. Vào menu **"Đăng bài tìm học sinh"**
2. Điền đầy đủ thông tin:
   - **Tiêu đề bài đăng**: Ví dụ: "Tìm học sinh học Toán lớp 9"
   - **Môn học** ⚠️: Chọn chính xác môn mình có thể dạy
   - **Lớp học**: Có thể chọn nhiều lớp
   - **Số buổi/tuần**: Số buổi có thể dạy
   - **Lương/buổi**: Mức lương mong muốn
   - **Thời gian học**: Khung giờ có thể dạy
   - **Ngày học**: Các ngày trong tuần
   - **Mô tả thêm**: Kinh nghiệm, yêu cầu
3. Click **"Đăng bài"**

### Bước 4: Xem bài đăng của Phụ huynh

1. Vào menu **"Bài đăng phụ huynh"**
2. Sử dụng bộ lọc:
   - **Lọc theo lớp**: Chọn lớp muốn dạy
   - **Lọc theo môn** ⚠️: Phải chọn đúng môn mà mình có thể dạy
3. Xem danh sách lớp phù hợp

### Bước 5: Nhận tin nhắn từ Phụ huynh

1. Vào menu **"Tin nhắn"**
2. Xem danh sách phòng chat
3. Click vào phòng chat để thảo luận
4. Hệ thống tự động refresh mỗi 5 giây

### Bước 6: Thảo luận trong phòng chat

1. Xem thông tin phụ huynh (tên hiển thị ở header)
2. Xem thông tin lớp học bên phải:
   - Thứ dạy
   - Giờ dạy
   - Lương mỗi buổi
   - Môn học
3. Trao đổi chi tiết
4. Có thể đề xuất chỉnh sửa thông tin

### Bước 7: Chờ Phụ huynh xác nhận

1. Sau khi thỏa thuận
2. Chờ phụ huynh click **"Xác nhận nhận lớp"**
3. Hệ thống sẽ tự động tạo Booking

### Bước 8: Quản lý Booking

1. Vào menu **"Booking"**
2. Xem thông tin booking:
   - ID Booking
   - Giá/Tiết
   - Buổi/tuần
   - Ngày dạy
   - Giờ dạy
   - **Địa chỉ** (địa chỉ học - tự động hiển thị)
3. Ghi nhận Tracking:
   - Click nút **"Tracking"**
   - Chọn hành động: "Arrived" (Đã đến) hoặc "Completed" (Hoàn thành)
   - Nhập vị trí
   - Nhập mã bảo mật đã dùng
4. Đánh giá phụ huynh sau khi hoàn thành

---

## ⚠️ Điều kiện để tạo được Booking

### 1. Thông tin phải khớp nhau

#### Môn học phải giống nhau ✅

- Phụ huynh đăng tìm gia sư **Toán** → Gia sư phải có bài đăng dạy **Toán**
- Nếu không trùng môn → Không tìm thấy nhau trong danh sách

#### Lớp học phải trùng khớp

- Phụ huynh tìm gia sư cho **Lớp 9** → Gia sư phải chọn dạy **Lớp 9**
- Gia sư có thể chọn nhiều lớp (Lớp 7, 8, 9) → Sẽ match với các bài đăng tương ứng

### 2. Phụ huynh phải có đủ tiền trong ví

- Mỗi lần gửi yêu cầu chat = **50,000 VNĐ**
- Cần nạp tiền vào ví trước khi gửi yêu cầu
- Vào menu **"Ví tiền"** → **"Nạp tiền"**

### 3. Thông tin địa chỉ

- Phụ huynh **BẮT BUỘC** nhập địa chỉ khi tạo bài đăng
- Địa chỉ này sẽ được lưu vào **Security Code** của Booking
- Gia sư sẽ thấy địa chỉ này trong bảng Booking (cột "Địa chỉ")

### 4. Thời gian thỏa thuận

- Ngày học trong tuần phải phù hợp với lịch của cả hai bên
- Giờ học phải được thống nhất
- Có thể chỉnh sửa trong phòng chat

---

## 📝 Chi tiết từng bước

### A. Tạo bài đăng

#### Phụ huynh tạo bài đăng:

```
POST /api/posts
Body:
{
  "creatorUserId": <userId>,
  "title": "Cần tìm gia sư dạy Toán lớp 9",
  "subject": "Toán",                    // ⚠️ Phải khớp với gia sư
  "studentGrade": "Lớp 9",              // ⚠️ Phải khớp với gia sư
  "sessionsPerWeek": 3,
  "preferredDays": "Thứ 2, Thứ 4, Thứ 6",
  "preferredTime": "18:00 - 20:00",
  "pricePerSession": 300000,
  "location": "123 Nguyễn Văn Linh, Phường 1, Quận 7, TP.HCM",  // ⚠️ BẮT BUỘC
  "description": "Cần gia sư có kinh nghiệm"
}
```

#### Gia sư tạo bài đăng:

```
POST /api/posts
Body:
{
  "creatorUserId": <userId>,
  "title": "Tìm học sinh học Toán lớp 9",
  "subject": "Toán",                    // ⚠️ Phải khớp với phụ huynh
  "studentGrade": "Lớp 7, Lớp 8, Lớp 9", // ⚠️ Có thể nhiều lớp
  "sessionsPerWeek": 3,
  "preferredDays": "Thứ 2, Thứ 4, Thứ 6",
  "preferredTime": "18:00 - 21:00",
  "pricePerSession": 250000,
  "description": "Có 5 năm kinh nghiệm"
}
```

### B. Tìm kiếm và Lọc

#### Bộ lọc hoạt động như thế nào:

1. **Lọc theo lớp**:

   - Hệ thống tách chuỗi lớp học bằng dấu phẩy
   - Ví dụ: "Lớp 7, Lớp 8, Lớp 9" → ["Lớp 7", "Lớp 8", "Lớp 9"]
   - Chọn "Lớp 9" → Hiển thị tất cả bài có chứa "Lớp 9"

2. **Lọc theo môn**:
   - So sánh chính xác tên môn học
   - "Toán" ≠ "Toán học" → Phải thống nhất tên môn

### C. Tạo phòng chat

#### Quy trình tạo chat room:

1. Phụ huynh click "Gửi yêu cầu" trên bài đăng gia sư
2. Hệ thống kiểm tra số dư ví ≥ 50,000 VNĐ
3. Trừ 50,000 VNĐ từ ví:
   ```
   POST /api/Wallet/pay
   Body: {
     "userId": <customerId>,
     "amount": 50000
   }
   ```
4. Tạo chat room:
   ```
   POST /api/ChatRoom
   Body: {
     "parentUserId": <customerId>,
     "tutorUserId": <tutorId>,
     "parentPostId": <postId>,
     "tutorPostId": <tutorPostId>
   }
   ```
5. Chuyển đến trang chat với URL:
   ```
   /phongchat?roomId=<chatRoomId>&parentPostId=<postId>&parentUserId=<customerId>&tutorUserId=<tutorId>
   ```

### D. Chat và thỏa thuận

#### Thông tin hiển thị trong phòng chat:

- **Header**:

  - Phụ huynh thấy: "Phòng trò chuyện với Gia sư <Tên gia sư>"
  - Gia sư thấy: "Phòng trò chuyện với Phụ huynh <Tên phụ huynh>"

- **Thông tin lớp học** (bên phải):

  - Thứ dạy: <preferredDays>
  - Giờ dạy: <preferredTime>
  - Lương mỗi buổi: <pricePerSession>
  - Môn: <subject>

- **Chức năng Edit**:
  - Click nút ✏️ để mở modal
  - Chỉnh sửa:
    - Lương/buổi
    - Ngày học trong tuần
    - Thời gian học
  - Cập nhật real-time (polling mỗi 5 giây)

#### Nội quy phòng chat:

- ❌ Không trao đổi thông tin liên lạc cá nhân (SĐT, email, địa chỉ)
- ❌ Không sử dụng ngôn ngữ xúc phạm
- ✅ Chỉ thảo luận về nội dung lớp học
- ⚠️ Vi phạm có thể bị khóa tài khoản

### E. Tạo Booking

#### Quy trình tạo booking:

1. Phụ huynh click nút **"Xác nhận nhận lớp"**
2. Hệ thống lấy thông tin từ bài đăng (postDetail):
   ```javascript
   const payload = {
     chatRoomId: <chatRoomId>,
     agreedPricePerSession: postDetail.pricePerSession,
     sessionsPerWeek: postDetail.sessionsPerWeek,
     agreedDays: postDetail.preferredDays,
     agreedTime: postDetail.preferredTime,
     securityCode: postDetail.location  // ⚠️ Địa chỉ từ bài đăng
   }
   ```
3. Gọi API:
   ```
   POST /api/Booking
   Body: <payload>
   ```
4. Xóa chat room:
   ```
   DELETE /api/ChatRoom/<chatRoomId>
   ```
5. Chuyển đến trang Booking

### F. Quản lý Booking

#### Xem thông tin Booking:

```
GET /api/Booking/user/<userId>
Response:
[
  {
    "bookingId": 1,
    "chatRoomId": 123,
    "agreedPricePerSession": 300000,
    "sessionsPerWeek": 3,
    "agreedDays": "Thứ 2, Thứ 4, Thứ 6",
    "agreedTime": "18:00 - 20:00",
    "securityCode": "123 Nguyễn Văn Linh, Phường 1, Quận 7, TP.HCM",
    "createdAt": "2024-12-05T10:00:00",
    "reviewed": false
  }
]
```

#### Tracking (Gia sư):

```
POST /api/Tracking
Body: {
  "bookingId": <bookingId>,
  "action": "arrived" hoặc "Completed",
  "location": "Đã đến địa chỉ",
  "securityCodeUsed": "123 Nguyễn Văn Linh..."
}
```

#### Đánh giá:

```
POST /api/BookingReview
Body: {
  "bookingId": <bookingId>,
  "rating": 5,
  "comment": "Gia sư dạy rất tốt!"
}
```

---

## 🔍 Ví dụ Flow Hoàn Chỉnh

### Scenario: Phụ huynh tìm gia sư dạy Toán lớp 9

#### Bước 1: Phụ huynh đăng ký

```
Email: phuhuynh@example.com
Role: Customer
```

#### Bước 2: Phụ huynh đăng bài

```
Tiêu đề: "Cần tìm gia sư dạy Toán lớp 9"
Môn học: "Toán"
Lớp: "Lớp 9"
Số buổi/tuần: 3
Lương/buổi: 300,000 VNĐ
Thời gian: "18:00 - 20:00"
Ngày học: "Thứ 2, Thứ 4, Thứ 6"
Địa chỉ: "123 Nguyễn Văn Linh, Phường 1, Quận 7, TP.HCM"
```

#### Bước 3: Gia sư đăng ký

```
Email: giasu@example.com
Role: Tutor
```

#### Bước 4: Gia sư đăng bài

```
Tiêu đề: "Tìm học sinh học Toán"
Môn học: "Toán"  ✅ TRÙNG
Lớp: "Lớp 7, Lớp 8, Lớp 9"  ✅ CÓ LỚP 9
Số buổi/tuần: 3
Lương/buổi: 250,000 VNĐ
```

#### Bước 5: Phụ huynh tìm kiếm

```
Lọc theo môn: "Toán"
Lọc theo lớp: "Lớp 9"
→ Tìm thấy bài đăng của gia sư ✅
```

#### Bước 6: Phụ huynh nạp tiền

```
Vào Ví tiền → Nạp 100,000 VNĐ
Số dư: 100,000 VNĐ
```

#### Bước 7: Phụ huynh gửi yêu cầu chat

```
Click "Gửi yêu cầu"
→ Trừ 50,000 VNĐ
→ Số dư còn: 50,000 VNĐ
→ Tạo phòng chat
```

#### Bước 8: Thảo luận

```
Phụ huynh: "Chào gia sư, con tôi cần học thêm Toán lớp 9"
Gia sư: "Chào anh/chị, em có thể dạy vào thứ 2, 4, 6"
Phụ huynh: "Lương 300k/buổi được không?"
Gia sư: "Được ạ"
→ Phụ huynh chỉnh sửa thông tin lớp học (Edit)
```

#### Bước 9: Xác nhận

```
Phụ huynh click "Xác nhận nhận lớp"
→ Tạo Booking với:
  - Giá: 300,000 VNĐ/buổi
  - Buổi/tuần: 3
  - Ngày: "Thứ 2, Thứ 4, Thứ 6"
  - Giờ: "18:00 - 20:00"
  - Địa chỉ: "123 Nguyễn Văn Linh, Phường 1, Quận 7, TP.HCM"
→ Xóa phòng chat
```

#### Bước 10: Gia sư xem Booking

```
Vào menu Booking
→ Thấy địa chỉ: "123 Nguyễn Văn Linh, Phường 1, Quận 7, TP.HCM"
→ Đến địa chỉ dạy học
→ Ghi nhận Tracking: "Arrived"
```

#### Bước 11: Sau khi hoàn thành

```
Gia sư ghi nhận: "Completed"
Cả hai đánh giá nhau
```

---

## 📌 Lưu ý quan trọng

### ⚠️ Những điều PHẢI LÀM:

1. ✅ Điền **đầy đủ thông tin** khi đăng bài (đặc biệt là địa chỉ)
2. ✅ Chọn **đúng môn học** để tìm thấy nhau
3. ✅ Chọn **đúng lớp học** phù hợp
4. ✅ **Nạp tiền vào ví** trước khi gửi yêu cầu chat (ít nhất 50,000 VNĐ)
5. ✅ **Thỏa thuận rõ ràng** trong phòng chat trước khi xác nhận
6. ✅ **Kiểm tra kỹ thông tin** trước khi click "Xác nhận nhận lớp"

### ❌ Những điều KHÔNG NÊN:

1. ❌ Tạo bài đăng mà không điền địa chỉ
2. ❌ Chọn sai môn học (không tìm thấy nhau)
3. ❌ Gửi yêu cầu chat khi chưa có tiền trong ví
4. ❌ Chia sẻ thông tin cá nhân trong phòng chat (vi phạm nội quy)
5. ❌ Xác nhận booking khi chưa thỏa thuận rõ ràng

### 💡 Tips:

- Sử dụng bộ lọc để tìm nhanh bài đăng phù hợp
- Nạp đủ tiền để có thể gửi nhiều yêu cầu chat (mỗi lần 50,000 VNĐ)
- Đọc kỹ thông tin lớp học bên phải màn hình chat
- Sử dụng chức năng Edit để điều chỉnh thông tin khi cần
- Theo dõi Tracking để biết tiến độ
- Đánh giá sau khi hoàn thành để xây dựng uy tín

---

## 🆘 Xử lý sự cố

### Không tìm thấy bài đăng phù hợp?

- ✅ Kiểm tra môn học có khớp không
- ✅ Kiểm tra lớp học có khớp không
- ✅ Thử đặt lại bộ lọc về "Tất cả"
- ✅ Làm mới trang (nút "Làm mới")

### Không gửi được yêu cầu chat?

- ✅ Kiểm tra số dư ví ≥ 50,000 VNĐ
- ✅ Nạp thêm tiền vào ví
- ✅ Kiểm tra kết nối internet

### Không thấy địa chỉ trong Booking?

- ✅ Phụ huynh phải nhập địa chỉ khi tạo bài đăng
- ✅ Địa chỉ sẽ tự động hiển thị sau khi tạo Booking
- ✅ Làm mới trang để cập nhật

### Thông tin lớp học không đúng?

- ✅ Chỉnh sửa trong phòng chat (nút Edit)
- ✅ Cập nhật sẽ tự động sync (5 giây)
- ✅ Xác nhận lại thông tin trước khi tạo Booking

---

## 📞 Liên hệ hỗ trợ

Nếu gặp vấn đề hoặc cần hỗ trợ, vui lòng liên hệ:

- Email: support@tutorapp.com
- Hotline: 1900-xxxx

---

**Chúc bạn tìm được gia sư/học sinh phù hợp! 🎓**
