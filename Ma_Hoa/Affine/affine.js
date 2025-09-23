const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* ------------------ Math helpers ------------------ */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function modInv(a, m) {
  a = (a % m + m) % m;
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) return i;
  }
  return null;
}

/* ------------------ Validation ------------------ */
function validateInput(txt, a, b) {
  if (!txt || isNaN(a) || isNaN(b)) return "Vui lòng nhập đủ văn bản và khóa.";
  if (!/^[A-Z\s]*$/.test(txt)) return "Chỉ chấp nhận chữ hoa A-Z và khoảng trắng.";
  if (gcd(a, 26) !== 1) return "Khóa a không khả nghịch mod 26 (chọn số nguyên tố cùng nhau với 26).";
  return null;
}

/* ------------------ Encode & Decode ------------------ */
function affineEncrypt(text, a, b) {
  let result = "";
  for (let ch of text) {
    if (ch === " ") { result += " "; continue; }
    let p = ALPHA.indexOf(ch);
    result += ALPHA[(a * p + b) % 26];
  }
  return result;
}

function affineDecrypt(text, a, b) {
  const inv = modInv(a, 26);
  if (inv === null) return null;
  let result = "";
  for (let ch of text) {
    if (ch === " ") { result += " "; continue; }
    let c = ALPHA.indexOf(ch);
    result += ALPHA[(inv * (c - b + 26)) % 26];
  }
  return result;
}

/* ------------------ Main functions ------------------ */
function encryptAffine() {
  const input = document.getElementById("plain").value.toUpperCase().trim();
  const a = parseInt(document.getElementById("keyA").value);
  const b = parseInt(document.getElementById("keyB").value);

  document.getElementById("stepsBox").style.display = "block";
  const err = validateInput(input, a, b);
  if (err) { showError(err); return; }

  let nums = [...input].map(ch => ch === " " ? " " : ALPHA.indexOf(ch));
  let encNums = nums.map(n => n === " " ? " " : (a * n + b) % 26);
  let cipher = affineEncrypt(input, a, b);

  document.getElementById("log1").innerHTML = `
    <b>Bước 1:</b> Chuyển chữ sang số<br>
    Văn bản: ${input}<br>
    Dạng số: [${nums.join(", ")}]`;

  let detail = "";
  nums.forEach((n, i) => {
    if (n !== " ") {
      detail += `<li>(${a} * ${n} + ${b}) mod 26 = ${encNums[i]}</li>`;
    } else detail += "<li>(khoảng trắng)</li>";
  });
  document.getElementById("log2").innerHTML = `
    <b>Bước 2:</b> Áp dụng công thức C = (a.P + b) mod 26<ul>${detail}</ul>`;

  document.getElementById("log3").innerHTML = `
    <b>Bước 3:</b> Đổi số sang chữ: ${cipher}`;

  document.getElementById("final").innerHTML =
    `<div class="result">Kết quả: <b>${cipher}</b></div>`;
}

function decryptAffine() {
  const input = document.getElementById("plain").value.toUpperCase().trim();
  const a = parseInt(document.getElementById("keyA").value);
  const b = parseInt(document.getElementById("keyB").value);

  document.getElementById("stepsBox").style.display = "block";
  const err = validateInput(input, a, b);
  if (err) { showError(err); return; }

  const inv = modInv(a, 26);
  let nums = [...input].map(ch => ch === " " ? " " : ALPHA.indexOf(ch));
  let decNums = nums.map(n => n === " " ? " " : (inv * (n - b + 26)) % 26);
  let plain = affineDecrypt(input, a, b);

  let detail = "";
  nums.forEach((n, i) => {
    if (n !== " ") {
      detail += `<li>${inv} * (${n} - ${b}) mod 26 = ${decNums[i]}</li>`;
    } else detail += "<li>(khoảng trắng)</li>";
  });

  document.getElementById("log1").innerHTML =
    `<b>Bước 1:</b> Chuyển bản mã sang số: [${nums.join(", ")}], a⁻¹ = ${inv}`;
  document.getElementById("log2").innerHTML =
    `<b>Bước 2:</b> Tính P = a⁻¹ * (C - b) mod 26<ul>${detail}</ul>`;
  document.getElementById("log3").innerHTML =
    `<b>Bước 3:</b> Đổi số sang chữ: ${plain}`;
  document.getElementById("final").innerHTML =
    `<div class="result">Kết quả: <b>${plain}</b></div>`;
}

/* ------------------ Error display ------------------ */
function showError(msg) {
  document.getElementById("log1").innerHTML = `<div class='error'>${msg}</div>`;
  document.getElementById("log2").innerHTML = "";
  document.getElementById("log3").innerHTML = "";
  document.getElementById("final").innerHTML = "";
}
