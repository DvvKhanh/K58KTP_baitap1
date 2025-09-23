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
# 1. Phương pháp mã hóa Caesar
## Tên gọi: Mã Caesar (Caesar Cipher), còn gọi là mã dịch chuyển. 
## Thuật toán mã hoá/giải mã:
### Mã hóa: Mỗi ký tự trong bản rõ được thay thế bằng một ký tự khác ở vị trí cách nó một số cố định trong bảng chữ cái.

Công thức mã hóa: C=(P+K)(mod26)

Trong đó:
+ C: Ký tự trong bản mã
+ K: Khoảng dịch chuyển (khóa)
  
### Giải mã: Ngược lại, mỗi ký tự trong bản mã được dịch chuyển ngược lại với cùng một khoảng cách.

Công thức giải mã: P=(C−K)(mod26)
## Không gian khóa: Không gian khóa của mã Caesar là rất nhỏ, chỉ có 25 khóa có thể (từ 1 đến 25). Vì khóa 0 không làm thay đổi bản rõ, nên nó không được tính.
## Cách phá mã (không cần khoá):
- Brute-force: thử tất cả 26 giá trị k và đọc ra plaintext hợp lý. Thường dùng người đọc (human) hoặc kiểm tra bằng từ điển.
- Phân tích tần suất: tìm ký tự xuất hiện nhiều nhất trong ciphertext (thường tương ứng E trong tiếng Anh) → suy k bằng cách so sánh.
- Kết hợp: dùng scoring (n-gram) để tự động chọn candidate tốt nhất.

## Mã hóa:

<img width="1919" height="1138" alt="image" src="https://github.com/user-attachments/assets/e3998e0f-211e-403e-9b40-1a4e3c23997e" />

## Giải mã:

<img width="1917" height="1138" alt="image" src="https://github.com/user-attachments/assets/447d30cf-3c35-4354-8948-ebf5473c41fd" />

# 2. Phương pháp mã hóa Affine
## Tên gọi: Mã Affine
## Thuật toán:
### Mã hóa: Mỗi ký tự P được mã hóa thành C theo công thức: C=(aP+b)(mod26)
- Trong đó: a,b là khóa (khóa a phải là số nguyên tố cùng nhau với 26)
### Giải mã: Để giải mã, ta cần tìm nghịch đảo của a modulo 26, ký hiệu là a^−1.
- P=a^−1(C−b)(mod26)
- Lưu ý: a^−1 phải thỏa mãn (a×a^−1)(mod26)=1.
## Không gian khóa: Không gian khóa của mã Affine lớn hơn Caesar. Khóa a có 12 giá trị có thể (1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25) và khóa b có 26 giá trị có thể (0-25). Tổng số khóa là 12×26=312 khóa.
## Cách phá mã:
- Tìm nghịch đảo modulo: Tìm a⁻¹.
- Thử mọi khóa (bất kỳ): Thử tất cả các cặp (a, b) phù hợp với điều kiện gcd(a, m) = 1.

## Mã hóa:

<img width="1919" height="1138" alt="image" src="https://github.com/user-attachments/assets/c8f1996d-766c-423d-b0a0-a522dd423be1" />

## Giải mã:

<img width="1919" height="1137" alt="image" src="https://github.com/user-attachments/assets/c97eed0a-9cd7-469b-beb9-3a5021c71b74" />

# 3. Phương pháp mã hóa hoán vị
## Tên gọi: Columnar Transposition (Mã hoán vị cột) — viết plaintext theo hàng vào một lưới có số cột = độ dài khóa, rồi đọc cột theo thứ tự khóa đã được sắp xếp.
## Thuật toán:
### Thuật toán mã hoá:
Khóa: một từ (ví dụ "ZEBRA") — độ dài m.

Các bước:
- Loại bỏ/giữ spaces theo cách bạn muốn (thường bỏ spaces để đơn giản).
- Viết plaintext theo hàng vào bảng có m cột (độ dài khóa). Nếu cần, padding ký tự (ví dụ 'X') để đầy hàng cuối.
- Gán thứ tự cho các cột bằng cách sắp chữ cái khóa theo bảng chữ cái, nếu trùng chữ thì dùng chỉ số xuất hiện.
- Đọc ciphertext theo cột theo thứ tự tăng dần của thứ tự gán (tức cột có chữ nhỏ nhất trước...).
### Thuật toán giải mã:
- Biết độ dài khóa m → bạn biết số cột. Từ chiều dài ciphertext tính số hàng rows = ceil(len(cipher)/m).
- Dựa vào thứ tự khóa, phân chia ciphertext thành từng cột theo thứ tự đó (mảng cột có rows ký tự mỗi cột, có thể cột cuối thiếu ký tự nếu padding không đầy).
- Sau đó dựng lại bảng hàng xột và đọc theo hàng để lấy plaintext (loại padding nếu có).
## Không gian khóa
- Nếu khóa dài m và ký tự khác nhau, có m! hoán vị khả dĩ — không gian tăng rất nhanh. Nhưng nếu khóa là từ tự nhiên thì không gian thực tế nhỏ hơn.
## Cách phá mã (không cần khoá)
- Brute-force: thử tất cả m! hoán vị — chỉ khả thi khi m nhỏ (ví dụ m ≤ 8).
- Kết hợp với scoring n-gram: dùng thuật toán tìm kiếm trên không gian hoán vị, tính điểm bằng n-gram (bigrams/trigrams) để chọn hoán vị hợp lý.
- Known-plaintext / crib: nếu biết đoạn plaintext xuất hiện ở đâu, dùng để tìm hoán vị phù hợp.
- Phân tích cấu trúc: dựa vào vị trí khoảng trắng/điểm, tần suất chữ, độ dài từ để suy.

## Mã hóa:

