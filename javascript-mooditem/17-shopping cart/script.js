
// ELEMENTS
const cartButton = document.getElementById("header-cart-btn");
const productContainer = document.getElementById("product-list-container"); 
const cartcontainer = document.querySelector(".cart-container");
const  headerlink= document.querySelector(".header-link");



// event listener
cartButton.addEventListener ("click", () => { 
    productContainer.classList.remove("show-section");
    cartcontainer.classList.add("show-section");
 
});
headerlink.addEventListener ("click", () => {
    cartcontainer.classList.remove("show-section");
    productContainer.classList.add("show-section");
});