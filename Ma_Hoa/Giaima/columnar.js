// Xóa khoảng trắng
function removeSpaces(s) {
  return s.replace(/\s+/g, '');
}

// Xác định thứ tự các cột từ key
function keyOrder(key) {
  const arr = key.split('').map((c, i) => ({ c, i }));
  arr.sort((a, b) => a.c.localeCompare(b.c));
  const rank = Array(key.length);
  arr.forEach((e, idx) => rank[e.i] = idx);
  return rank;
}

// Mã hóa Columnar Transposition
function encrypt() {
  const txt = removeSpaces(document.getElementById("txt").value.toUpperCase());
  const key = document.getElementById("key").value.toUpperCase();
  const cols = key.length;
  const rows = Math.ceil(txt.length / cols);

  // tạo lưới
  const grid = Array.from({ length: rows }, () => Array(cols).fill('X'));
  let p = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r][c] = (p < txt.length ? txt[p++] : 'X');
    }
  }

  const rank = keyOrder(key);
  let out = "";

  // đọc theo cột theo thứ tự key
  for (let rnk = 0; rnk < cols; rnk++) {
    for (let c = 0; c < cols; c++) {
      if (rank[c] === rnk) {
        for (let r = 0; r < rows; r++) {
          out += grid[r][c];
        }
      }
    }
  }

  document.getElementById("out").value = out;
}

// Giải mã Columnar Transposition
function decrypt() {
  const cipher = removeSpaces(document.getElementById("txt").value.toUpperCase());
  const key = document.getElementById("key").value.toUpperCase();
  const cols = key.length;
  const rows = Math.ceil(cipher.length / cols);

  const rank = keyOrder(key);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(' '));

  let p = 0;
  for (let rnk = 0; rnk < cols; rnk++) {
    for (let c = 0; c < cols; c++) {
      if (rank[c] === rnk) {
        for (let r = 0; r < rows; r++) {
          if (p < cipher.length) grid[r][c] = cipher[p++];
        }
      }
    }
  }

  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out += grid[r][c];
    }
  }
  out = out.replace(/X+$/, ''); // bỏ ký tự padding

  document.getElementById("out").value = out;
}

// Gắn sự kiện
document.getElementById("enc").onclick = encrypt;
document.getElementById("dec").onclick = decrypt;
