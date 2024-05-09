
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




