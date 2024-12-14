
const characters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", 
  "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", 
  "?", "/"
];

let password = [];
const passwordLengthInput = document.getElementById("password-length");
const generatedPasswordElement = document.getElementById("generated-password");
let isPasswordGenerated = false;

function generatePassword() {
  const passwordLength = parseInt(passwordLengthInput.value);
  if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 15) {
    generatedPasswordElement.textContent = "Invalid password length. Enter a value between 8 and 15 (inclusive).";
    generatedPasswordElement.style.color = "red";
    return;
  }
  password = [];
  const array = new Uint32Array(passwordLength);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = array[i] % characters.length;
    password.push(characters[randomIndex]);
  }
  generatedPasswordElement.textContent = password.join("");
  generatedPasswordElement.style.color = "";
  isPasswordGenerated = true;
}
function copyToClipboard() {
  if (isPasswordSet) {
    const generatedPassword = document.getElementById("generated-password").textContent;
    navigator.clipboard.writeText(generatedPassword).then(() => {
      document.getElementById("generated-password").textContent = "Password copied to clipboard!";
      document.getElementById("generated-password").style.color = "green";
      setTimeout(() => {
        document.getElementById("generated-password").textContent = generatedPassword;
        document.getElementById("generated-password").style.color = "";
      }, 2000);
    }).catch((error) => {
      document.getElementById("generated-password").textContent = "Error copying password to clipboard: " + error;
      document.getElementById("generated-password").style.color = "red";
      setTimeout(() => {
        document.getElementById("generated-password").textContent = generatedPassword;
        document.getElementById("generated-password").style.color = "";
      }, 2000);
    });
  }
  isPasswordGenerated=false;
}
