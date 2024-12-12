const burger = document.querySelector(".menu__icons");
const menu = document.querySelector(".menu");
const bgMenu = document.querySelector('.background-menu')

if (burger && menu){
    burger.addEventListener("click",() => {
        burger.classList.toggle('active-burger');
        menu.classList.toggle('_active');
        bgMenu.classList.toggle('menu-close')
     })
}

