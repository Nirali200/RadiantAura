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
        else if(currentPath == "/allSkinType"){
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
            <h4>${item.name}</h4>
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

