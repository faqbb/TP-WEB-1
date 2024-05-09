
  function generateCaptcha() {
    let captcha = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
  }

  function displayCaptcha() {
    const captchaElement = document.getElementById('TextCaptcha');
    const captcha = generateCaptcha();
    captchaElement.innerText = captcha;
    captchaElement.dataset.solution = captcha;
  }

  displayCaptcha()
  
  let refreshButton = document.getElementById('refreshButton')
  refreshButton.addEventListener('click', function() {
    displayCaptcha();
  })