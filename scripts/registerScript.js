displayCaptcha()

// Seccion Captcha
let refreshButton = document.getElementById('refreshButton')
refreshButton.addEventListener('click', function () {
  displayCaptcha();
  ResetInput();
})

function displayCaptcha() {
  const captchaElement = document.getElementById('TextCaptcha');
  const captcha = generateCaptcha();
  captchaElement.innerHTML = captcha;
  ValueCaptcha();
}

function generateCaptcha() {
  let captcha = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
}

function ValueCaptcha() {
  const StringArray = document.getElementById('TextCaptcha').innerHTML;
  ArrayCaptcha = StringArray.split(""); //el split es para que de un string pase a un arreglo y me lo separe
  return ArrayCaptcha;
}
// Seccion InputCaptcha
let ConfirmButton = document.getElementById('ConfirmButton');
ConfirmButton.addEventListener('click', function () {
  ValueInput();
  CompararArreglos();
})

function ValueInput() {
  const InputCaptcha = document.getElementById('inputCaptcha').value;
  ArrayInput = InputCaptcha.split("");
  return ArrayInput;
}

// seccion comparar
function CompararArreglos() {
  let array1 = ValueCaptcha();
  let array2 = ValueInput();
  let cont = 0;
  let Result;
  for (i = 0; i <= array1.length; i++) {
    if (array1[cont] == array2[cont]) {
      Result = '- Captcha Correcto -';
      cont++;
    } else {
      Result = '- Captcha Incorrecto -';
      i == array1.length;
    }
  }
  document.querySelector('.menssage').innerHTML = Result;
}

function ResetInput() {
  document.getElementById("inputCaptcha").value = '';
  document.getElementById("menssage").innerHTML = '';
}
