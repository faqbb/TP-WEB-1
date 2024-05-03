let colorSwitch = document.getElementById('#mode')
function changeTheme(ev) {
    if (ev.target.checked) {
        document.documentElement.setAttribute('mode', 'dark')
    } else {
        document.documentElement.setAttribute('mode', 'light')
    }
}

colorSwitch.addEventListener('change', changeTheme)