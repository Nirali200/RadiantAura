
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


let scrollContainer = document.querySelector('.media-scroller');
let lftbtn = document.getElementById('lftbtn');
let rigtbtn = document.getElementById('rigtbtn');

rigtbtn.addEventListener('click',()=>{
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft += 400;
})
lftbtn.addEventListener('click',()=>{
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft -= 400;
})


const box = document.querySelector('.box');
const ip = document.getElementById('input-box');

box.addEventListener('mouseout',()=>{
    if(ip.value.length){
        ip.style.width = '150px';
    }
})      
window.onkeyup= ()=>{
    if(!ip.value.length){
        ip.style.width = '';
    }
}

const inputBox = document.getElementById('input-box');
const faqs = document.getElementById('faq').querySelectorAll('p');
// console.log(faqs);


inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;
    if(input.length){
        faqs.forEach((sec) =>{
            if(sec.innerText.toLowerCase().includes(input.toLowerCase())){
                
                sec.scrollIntoView({behavior:'smooth',block:"nearest"});
                setTimeout(()=>{
                    sec.parentNode.style.transform = 'scale(1.05)';
                    sec.parentNode.style.backgroundColor = 'yellow';
                },1000)
                setInterval(()=>{
                    sec.parentNode.style.transform = '';
                },3000);
                console.log(sec.parentNode);
            }
        })
    }
}
