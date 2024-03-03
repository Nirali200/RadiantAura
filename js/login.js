
const li = document.querySelector('.navLeft').childNodes[1].childNodes;
const pathName = window.location.pathname;
for(let i=3;i<li.length;i++){
    if(i%2 == 1){
        console.log(li[i].childNodes[0].href);
        console.log(pathName);
        if(li[i].childNodes[0].href.includes(pathName)){
            li[i].childNodes[0].classList.add('active');
        }
}
}

if(document.querySelector('.log').href.includes(pathName)){
    document.querySelector('.log').classList.add('active');
}

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