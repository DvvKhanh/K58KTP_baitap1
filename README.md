# Đậu Văn Khánh - K225480106099
# BÀI TẬP MÔN: An toàn và bảo mật thông tin
# BÀI TẬP 1:
## TÌM HIỂU CÁC PHƯƠNG PHÁP MÃ HOÁ CỔ ĐIỂN
### 1. Caesar
### 2. Affine
### 3. Hoán vị
### 4. Vigenère
### 5. Playfair
## Với mỗi phương pháp, hãy tìm hiểu:
### 1. Tên gọi
### 2. Thuật toán mã hoá, thuật toán giải mã
### 3. Không gian khóa
### 4. Cách phá mã (mà không cần khoá)
### 5. Cài đặt thuật toán mã hoá và giải mã bằng code C++ và bằng html+css+javascript

# BÀI LÀM:
## 1. Phương pháp mã hóa Caesar
### Tên gọi: Mã Caesar (Caesar Cipher), còn gọi là mã dịch chuyển. 
### Thuật toán mã hoá/giải mã:
#### - Mã hóa: Mỗi ký tự trong bản rõ được thay thế bằng một ký tự khác ở vị trí cách nó một số cố định trong bảng chữ cái.
##### Công thức mã hóa: C=(P+K)(mod26)
##### Trong đó:
##### +C: Ký tự trong bản mã
##### + K: Khoảng dịch chuyển (khóa)
#### - Giải mã: Ngược lại, mỗi ký tự trong bản mã được dịch chuyển ngược lại với cùng một khoảng cách.
##### Công thức giải mã: P=(C−K)(mod26)
### Không gian khóa: Không gian khóa của mã Caesar là rất nhỏ, chỉ có 25 khóa có thể (từ 1 đến 25). Vì khóa 0 không làm thay đổi bản rõ, nên nó không được tính.
### Cách phá mã (không cần khoá)
#### - Brute-force: thử tất cả 26 giá trị k và đọc ra plaintext hợp lý. Thường dùng người đọc (human) hoặc kiểm tra bằng từ điển.
#### - Phân tích tần suất: tìm ký tự xuất hiện nhiều nhất trong ciphertext (thường tương ứng E trong tiếng Anh) → suy k bằng cách so sánh.
#### - Kết hợp: dùng scoring (n-gram) để tự động chọn candidate tốt nhất.
