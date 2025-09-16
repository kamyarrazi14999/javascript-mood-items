//  this will fetch data from a json file  and display it in the console
// import data from "./db.json" with { type: "json" };
const contentcontiner = document.querySelector(".content-container");
//GET DATA FROM api
// this will fetch data from a json file  and display it in the console

 const getData= async() => {
    const   responsive =  await fetch("./db.json");
    const data = await responsive.json();
   showData(data);
    
}
getData();
// برای تست  
// const getData = () => {
//   fetch("./db.json")
//     .then((res) => res.json())
//     .then((data) => showData(data));
// };

// getData();

// SHOW DATA FROM API
const showData = (data) => {
    data.forEach((item) => {
        const contentitem = `
        <section class='content-item'>    
        <div class="image-box">
        <img src=${item.url} alt='image' class='image'/>
        <div class='description-box'>
        <p class='description-text'>${item.description}</p>
           </div>
        </div>
        <h3 class='name'>${item.name}</h3>
        </section>
        
        
        
        
        `;
        contentcontiner.innerHTML += contentitem;
    });

    data.forEach((item) => {
        console.log(item.name);
    
    });
};


