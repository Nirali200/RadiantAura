const li = document.querySelector('.navLeft').childNodes[1].childNodes;
const pathName = window.location.pathname;
for(let i=1;i<li.length;i++){
    if(i%2 == 1){
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

burger.addEventListener('click',() => {
    navLeft.classList.remove('navLeftres');
    burger.classList.remove('burgerRes');
})