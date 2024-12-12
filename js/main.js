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
// burger end


// form
document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactsForm');
    const input = document.querySelectorAll('.input');
    
    let formValid = true;
  
    input.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('invalid');
        formValid = false;
        input.placeholder = "* נא למלא את השדה";
      } else {
        input.classList.remove('invalid');
      }
    });
  
    if (formValid) {
      form.submit();
    }
  });
  // form end