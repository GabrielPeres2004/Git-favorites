let darkMode = true
const buttonToggleTheme = document.querySelector('.iconsTheme')
const messageToggleTheme = document.querySelector('.iconsTheme span')

buttonToggleTheme.addEventListener('click', () => {
    darkMode = !darkMode
    document.documentElement.classList.toggle('light')

    if (darkMode) {
        messageToggleTheme.innerHTML = 'DarkMode Ativado!'
    } else {
        messageToggleTheme.innerHTML = 'LightMode Ativado!'
    }
})


