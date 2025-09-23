/* ------------------ Helpers ------------------ */
function buildSquare(key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  let used = {}, seq = '';
  for (let ch of key) if (!used[ch]) { used[ch] = 1; seq += ch; }
  for (let c = 65; c <= 90; c++) {
    let ch = String.fromCharCode(c);
    if (ch === 'J') continue;
    if (!used[ch]) { used[ch] = 1; seq += ch; }
  }
  let square = [];
  for (let r = 0; r < 5; r++) square.push(seq.slice(r * 5, r * 5 + 5).split(''));
  return square;
}

function findPos(sq, ch) {
  if (ch === 'J') ch = 'I';
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++)
      if (sq[r][c] === ch) return [r, c];
  return [-1, -1];
}

function prepareText(raw) {
  let s = raw.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  let out = '';
  for (let i = 0; i < s.length;) {
    let a = s[i], b = (i + 1 < s.length ? s[i + 1] : '');
    if (!b) { out += a + 'X'; i++; }
    else if (a === b) { out += a + 'X'; i++; }
    else { out += a + b; i += 2; }
  }
  return out;
}

/* ------------------ Encrypt & Decrypt ------------------ */
function playfairEncrypt(txt, sq) {
  let s = prepareText(txt);
  let out = '';
  for (let i = 0; i < s.length; i += 2) {
    let A = s[i], B = s[i + 1];
    let pa = findPos(sq, A), pb = findPos(sq, B);
    if (pa[0] === pb[0]) { // cùng hàng
      out += sq[pa[0]][(pa[1] + 1) % 5] + sq[pb[0]][(pb[1] + 1) % 5];
    } else if (pa[1] === pb[1]) { // cùng cột
      out += sq[(pa[0] + 1) % 5][pa[1]] + sq[(pb[0] + 1) % 5][pb[1]];
    } else { // hình chữ nhật
      out += sq[pa[0]][pb[1]] + sq[pb[0]][pa[1]];
    }
  }
  return out;
}

function playfairDecrypt(txt, sq) {
  let out = '';
  for (let i = 0; i < txt.length; i += 2) {
    let A = txt[i], B = txt[i + 1];
    let pa = findPos(sq, A), pb = findPos(sq, B);
    if (pa[0] === pb[0]) {
      out += sq[pa[0]][(pa[1] + 4) % 5] + sq[pb[0]][(pb[1] + 4) % 5];
    } else if (pa[1] === pb[1]) {
      out += sq[(pa[0] + 4) % 5][pa[1]] + sq[(pb[0] + 4) % 5][pb[1]];
    } else {
      out += sq[pa[0]][pb[1]] + sq[pb[0]][pa[1]];
    }
  }
  return out;
}

/* ------------------ Main ------------------ */
function encryptPlayfair() {
  const key = document.getElementById('key').value;
  const txt = document.getElementById('txt').value;

  document.getElementById("stepsBox").style.display = "block";
  const sq = buildSquare(key);
  const prepared = prepareText(txt);
  const cipher = playfairEncrypt(txt, sq);

  document.getElementById("log1").innerHTML = `<b>Bước 1:</b> Văn bản đã chuẩn hóa: ${prepared}`;
  document.getElementById("log2").innerHTML = `<b>Bước 2:</b> Bảng chữ cái được tạo từ khóa.`;
  document.getElementById("log3").innerHTML = `<b>Bước 3:</b> Kết quả mã hóa: ${cipher}`;
  document.getElementById("final").innerHTML = `<div class="highlight">Kết quả: ${cipher}</div>`;
  document.getElementById("sq").textContent = sq.map(r => r.join(' ')).join('\n');
}

function decryptPlayfair() {
  const key = document.getElementById('key').value;
  const txt = document.getElementById('txt').value.toUpperCase().replace(/[^A-Z]/g, '');

  document.getElementById("stepsBox").style.display = "block";
  const sq = buildSquare(key);
  const plain = playfairDecrypt(txt, sq);

  document.getElementById("log1").innerHTML = `<b>Bước 1:</b> Bản mã: ${txt}`;
  document.getElementById("log2").innerHTML = `<b>Bước 2:</b> Bảng chữ cái được tạo từ khóa.`;
  document.getElementById("log3").innerHTML = `<b>Bước 3:</b> Kết quả giải mã: ${plain}`;
  document.getElementById("final").innerHTML = `<div class="highlight">Kết quả: ${plain}</div>`;
  document.getElementById("sq").textContent = sq.map(r => r.join(' ')).join('\n');
}
