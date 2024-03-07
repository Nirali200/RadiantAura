
burger = document.querySelector('.hamburger');
navLeft = document.querySelector('.navLeft');
navLeftUl = document.querySelector('.navLeft').childNodes[1];

burger.addEventListener('click',() => {
    navLeftUl.style.zIndex = 2;
    navLeftUl.classList.add('resAnimate');
    navLeft.classList.remove('navLeftres');
    burger.classList.remove('burgerRes');
})

cross = document.querySelector('.cross');

cross.addEventListener('click',()=>{
    navLeftUl.style.zIndex = -1;
    burger.classList.add('burgerRes');
    navLeft.classList.add('navLeftres');
    navLeftUl.classList.remove('resAnimate');
})

const otpBlock = document.querySelector('.otpver');


const err = document.querySelector('.err');
if(err){
    setTimeout(()=>{
        err.style.display="none";
    },5000);
}
