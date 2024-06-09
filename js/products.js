const currentPath = window.location.pathname;

console.log(currentPath);

const findType = (currentPath,data) => {
    
    if(currentPath == "/oilySkin"){
         dataType = data.oilySkin;
        }
        else if(currentPath == "/drySkin"){
        dataType = data.drySkin;
        }
        else if(currentPath == "/sensitiveSkin"){
        dataType = data.sensitiveSkin;
        }
        else if(currentPath == "/allSkin"){
        dataType = data.allSkinType;
        }

        return dataType;
}

 function displayData(data) {
    const container = document.querySelector('.data-container');
    container.innerHTML = ''; 
    
    const dataType = findType(currentPath,data);
    console.log(dataType);

    dataType.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('pItems');

        itemElement.innerHTML = `
            <img src="${item.image_url}">
            <h4 class = "names">${item.name}</h4>
            <h5>RS.${item.price}</h5>
            <p>${item.rating}</p>
            <a href = "${item.url}">${item.website}</a>
        `;

        container.appendChild(itemElement);
    });
}

const dataFetch = () => {
    const apiId = "../JSON/dry.json";
    fetch(apiId).then(response => response.json()).then(data => {
        displayData(data);
    }).catch(err => {
        console.log(err);
    }
    )
}

window.addEventListener('load',dataFetch);






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

inputBox.onkeyup = function(){
    let input = inputBox.value;
    let section = document.querySelectorAll('.names');
    if(input.length){
        section.forEach((sec) =>{
            if(sec.textContent.toLowerCase().includes(input.toLowerCase())){
                console.log(sec.textContent);
                sec.scrollIntoView({behavior:'smooth',block:"nearest"});
                setTimeout(()=>{
                    sec.parentNode.style.transform = 'scale(1.05)';
                    sec.parentNode.style.backgroundColor = 'pink';
                    sec.parentNode.style.border = "0.5px solid white";
                },1000)
                setInterval(()=>{
                    sec.parentNode.style.transform = '';
                    sec.parentNode.style.backgroundColor = '';
                    sec.parentNode.style.border = "";
                },3000);
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
    
