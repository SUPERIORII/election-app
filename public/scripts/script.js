// const { text } = require("body-parser");

const sidebarLinks = document.querySelectorAll('.sidebar-link');
const mainContainer = document.querySelector('.main-container');

// fetch('http://localhost:3000').then(res=>res.json()).then(data=>console.log(data)
// )



// sidebarLinks.forEach(link=>{
//    link.addEventListener('click',(e)=>{
//     e.preventDefault();
//     const urlLink = link.getAttribute('href');
//     //console.log(urlLink);

//     fetch(urlLink).then(res=>res.text())
//     .then(data =>{
//         const parser = new DOMParser();
//         const convertedRes = parser.parseFromString(data, 'text/html')

//         console.log(convertedRes);

//         const result = document.querySelector('.main-container');

//         console.log(result);
        
        
//         // mainContainer.innerHTML= convertedRes

        
//     })
    
//    })
   
// })
