const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function normalize(str) {
  return str.toUpperCase().replace(/[^A-Z\s]/g, "");
}

function toNumbers(str) {
  return str.split("").map(ch => ch === " " ? " " : AZ.indexOf(ch));
}

function toLetters(arr) {
  return arr.map(x => x === " " ? " " : AZ[x]).join("");
}

function showSteps(original, numbers, afterShift, result, isEncrypt, k) {
  document.getElementById("details").style.display = "block";

  let s1 = `<strong>Bước 1:</strong> Chuyển thành số<br>${original} → [${numbers}]`;
  document.getElementById("stage1").innerHTML = s1;

  let formula = isEncrypt ? "C = (P + k) mod 26" : "P = (C - k) mod 26";
  let s2 = `<strong>Bước 2:</strong> ${formula}<br>K = ${k}<br>[${afterShift}]`;
  document.getElementById("stage2").innerHTML = s2;

  let s3 = `<strong>Bước 3:</strong> Chuyển lại sang chữ<br>${result}`;
  document.getElementById("stage3").innerHTML = s3;

  document.getElementById("final").innerHTML =
    `<div class="highlight">Kết quả cuối: <b>${result}</b></div>`;
}

function encrypt() {
  const txt = normalize(document.getElementById("inputText").value);
  const k = parseInt(document.getElementById("shift").value);

  if (!txt || isNaN(k)) {
    alert("Vui lòng nhập văn bản (A-Z) và khóa k!");
    return;
  }

  let nums = toNumbers(txt);
  let shifted = nums.map(x => x === " " ? " " : (x + k) % 26);
  let encoded = toLetters(shifted);

  showSteps(txt, nums, shifted, encoded, true, k);
}

function decrypt() {
  const txt = normalize(document.getElementById("inputText").value);
  const k = parseInt(document.getElementById("shift").value);

  if (!txt || isNaN(k)) {
    alert("Vui lòng nhập văn bản (A-Z) và khóa k!");
    return;
  }

  let nums = toNumbers(txt);
  let shifted = nums.map(x => x === " " ? " " : (x - k + 26) % 26);
  let decoded = toLetters(shifted);

  showSteps(txt, nums, shifted, decoded, false, k);
}
