const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* ------------------ Helpers ------------------ */
function validateInput(txt, key) {
  if (!txt || !key) return "Vui lòng nhập văn bản và khóa.";
  if (!/^[A-Z]+$/i.test(key)) return "Khóa chỉ được chứa chữ cái A-Z.";
  return null;
}

/* ------------------ Encode & Decode ------------------ */
function vigenereEncrypt(text, key) {
  let result = "";
  let j = 0;
  for (let ch of text) {
    if (/[A-Za-z]/.test(ch)) {
      let base = ch === ch.toUpperCase() ? 65 : 97;
      let pi = ch.charCodeAt(0) - base;
      let ki = key[j % key.length].toUpperCase().charCodeAt(0) - 65;
      result += String.fromCharCode(base + (pi + ki) % 26);
      j++;
    } else result += ch;
  }
  return result;
}

function vigenereDecrypt(text, key) {
  let result = "";
  let j = 0;
  for (let ch of text) {
    if (/[A-Za-z]/.test(ch)) {
      let base = ch === ch.toUpperCase() ? 65 : 97;
      let ci = ch.charCodeAt(0) - base;
      let ki = key[j % key.length].toUpperCase().charCodeAt(0) - 65;
      result += String.fromCharCode(base + (ci - ki + 26) % 26);
      j++;
    } else result += ch;
  }
  return result;
}

/* ------------------ Main ------------------ */
function encryptVigenere() {
  const text = document.getElementById("txt").value;
  const key = document.getElementById("key").value.toUpperCase().trim();

  document.getElementById("stepsBox").style.display = "block";
  const err = validateInput(text, key);
  if (err) { showError(err); return; }

  let cipher = vigenereEncrypt(text, key);

  document.getElementById("log1").innerHTML = `<b>Bước 1:</b> Văn bản: ${text}`;
  document.getElementById("log2").innerHTML = `<b>Bước 2:</b> Khóa được lặp lại: ${key.repeat(Math.ceil(text.length/key.length)).slice(0,text.length)}`;
  document.getElementById("log3").innerHTML = `<b>Bước 3:</b> Kết quả mã hóa: ${cipher}`;
  document.getElementById("final").innerHTML = `<div class="highlight">Kết quả: ${cipher}</div>`;
}

function decryptVigenere() {
  const text = document.getElementById("txt").value;
  const key = document.getElementById("key").value.toUpperCase().trim();

  document.getElementById("stepsBox").style.display = "block";
  const err = validateInput(text, key);
  if (err) { showError(err); return; }

  let plain = vigenereDecrypt(text, key);

  document.getElementById("log1").innerHTML = `<b>Bước 1:</b> Bản mã: ${text}`;
  document.getElementById("log2").innerHTML = `<b>Bước 2:</b> Khóa được lặp lại: ${key.repeat(Math.ceil(text.length/key.length)).slice(0,text.length)}`;
  document.getElementById("log3").innerHTML = `<b>Bước 3:</b> Kết quả giải mã: ${plain}`;
  document.getElementById("final").innerHTML = `<div class="highlight">Kết quả: ${plain}</div>`;
}

/* ------------------ Error ------------------ */
function showError(msg) {
  document.getElementById("log1").innerHTML = `<div class='error'>${msg}</div>`;
  document.getElementById("log2").innerHTML = "";
  document.getElementById("log3").innerHTML = "";
  document.getElementById("final").innerHTML = "";
}
