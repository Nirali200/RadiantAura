
burger = document.querySelector('.hamburger');
navLeft = document.querySelector('.navLeft');
navLeftUl = document.querySelector('.navLeft').childNodes[1];

burger.addEventListener('click',() => {
    navLeftUl.classList.add('resAnimate');
    navLeft.classList.remove('navLeftres');
    burger.classList.remove('burgerRes');
})

cross = document.querySelector('.cross');

cross.addEventListener('click',()=>{
    burger.classList.add('burgerRes');
    navLeft.classList.add('navLeftres');
    navLeftUl.classList.remove('resAnimate');
})

let otp = document.querySelector(".otp").childNodes;

for(let i=1;i<8;i++){

    if(i%2 == 1){
otp[i].addEventListener('input',(e) =>{
    const target = e.target;
    const val = target.value;

    if(isNaN(val)){
        target.val = "";
        return;
    }

    if(val != ""){
        const next = target.nextElementSibling;
        if(next)
        next.focus();
    }

})

otp[i].addEventListener('keyup',(e)=>{
    const target = e.target;
    const key = e.key.toLowerCase();

    if(key == "backspace" || key == "delete"){
        target.value = "";
        const pre = target.previousElementSibling;
        if(pre)
        pre.focus();

        return;
    }

})

}
}

const err = document.querySelector('.error');
if(err){
    setTimeout(()=>{
        err.style.display="none";
    },5000);
}