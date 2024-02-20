
const li = document.querySelector('.navLeft').childNodes[1].childNodes;
const pathName = window.location.pathname;
for(let i=1;i<li.length;i++){
    if(i%2 == 1){
        console.log(li[i].childNodes[0].href);
        console.log(pathName);
        if(li[i].childNodes[0].href.includes(pathName)){
            li[i].childNodes[0].classList.add('active');
        }
}
}

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


