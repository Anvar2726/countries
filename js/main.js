const darkMode = document.querySelector('.body')
const darkModeBtn = document.querySelector('.header__container button')

darkModeBtn.addEventListener('click', function(){
  darkMode.classList.toggle('dark')
})
