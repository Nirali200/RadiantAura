
window.addEventListener('scroll',()=>{
    const title = document.querySelector('.title');
    const scrollPosition = window.scrollY+window.innerHeight;   
     
    if(scrollPosition>title.offsetTop){
        title.classList.add('animate')
    }
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


window.addEventListener('scroll',()=>{
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY + window.innerHeight;   
     
    if(scrollPosition>navbar.offsetTop + 400){
        navLeftUl.style.zIndex = -1;
        burger.classList.add('burgerRes');
        navLeft.classList.add('navLeftres');
        navLeftUl.classList.remove('resAnimate');
    }
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

const scrollToSection = (sectionId) =>{
    const section = document.getElementById(sectionId);
    if(section){
        section.scrollIntoView({behavior: 'smooth', block: 'start'}); 
    }
}


const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function(){
    let input = inputBox.value;
    let section = document.querySelectorAll('section');
    if(input.length){
        section.forEach((sec) =>{
            console.log(sec.childNodes[1]);
            if(sec.id.toLowerCase().includes(input.toLowerCase())){
                console.log(sec.id);
                scrollToSection(sec.id);
            }
        })
    }
}

    const display = (result) =>{
        const content = result.map((list)=>{
            return "<li onClick = selectInput(this)>"+ list + "</li>";
        });
        resultBox.innerHTML = "<ul>" + content +"</ul>";
    }


    const selectInput = (list) => {
        inputBox.value = list.innerHTML;
        resultBox.innerHTML = '';
    }

    const media = document.querySelectorAll('.local');

    for(let i=0;i<media.length;i++){
        media[i].addEventListener('click',(e)=>{
            const imageUrl = e.target.parentElement.childNodes[1].src;
            localStorage.setItem('imageUrl', imageUrl);
        })
    }
    

const product = document.querySelector(".type_wrap");

product.addEventListener('click',()=>{
    
})
    