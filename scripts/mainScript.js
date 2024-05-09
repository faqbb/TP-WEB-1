
// Dropdown Button
function toggleContent() {
  let dropdownButton = document.getElementById("dropdownButton");
  let navList = document.getElementById('navList')
  if (dropdownButton.innerHTML === "▼") {
    dropdownButton.innerHTML = "▲";
    navList.classList.toggle("show");
  } else {
    dropdownButton.innerHTML = "▼";
    navList.classList.toggle("show");
  }
}

// Theme toggler
let colorSwitch = document.getElementById('mode')
colorSwitch.addEventListener('change', () => {
  if (colorSwitch.checked) {
    document.documentElement.setAttribute('mode', 'dark');
  } else {
    document.documentElement.removeAttribute('mode');
  }
}
)

function RefreshCaptcha() {
  displayCaptcha();
}

function displayCaptcha() {
  const captchaElement = document.getElementById('TextCaptcha');
  const captcha = generateCaptcha();
  captchaElement.innerText = captcha;
  captchaElement.dataset.solution = captcha;
}

function generateCaptcha() {
  let captcha = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
}
