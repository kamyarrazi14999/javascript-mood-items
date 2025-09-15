
// ELEMENTS
const cartButton = document.getElementById("header-cart-btn");
const productContainer = document.getElementById("product-list-container"); 
const cartcontainer = document.querySelector(".cart-container");



// event listener
cartButton.addEventListener ("click", () => { 
    productContainer.classList.remove("show-section");
    cartcontainer.classList.add("show-section");
 
});