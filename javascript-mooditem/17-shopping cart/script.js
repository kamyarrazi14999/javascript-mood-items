// Elements
const cartButton = document.getElementById("header-cart-btn");
const productContainer = document.getElementById("product-list-container");
const cartContainer = document.querySelector(".cart-container");
const headerLink = document.querySelector(".header-link");
const conditionText = document.querySelector(".condition-text");
const productList = document.getElementById("product-list");
let cartData = [];
// Show basket cart
cartButton.addEventListener("click", () => {
  productContainer.classList.remove("show-section");
  cartContainer.classList.add("show-section");
});

// Show products list
headerLink.addEventListener("click", (e) => {
  e.preventDefault();
  cartContainer.classList.remove("show-section");
  productContainer.classList.add("show-section");
});

// Fetch & get products from API
const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    productList.classList.add("full-list"); // Add Class To Product List

    conditionText.style.display = "none"; // Hide Loading When Data Arrived
    renderPorducts(data); // Show Products
  } catch (error) {
    conditionText.textContent = error.message;
    productList.classList.remove("full-list");
 
  }
};

// Function to render product in DOM
const renderPorducts = (products) => {
  products.map((product) => {
    // create product item
    const productElement = document.createElement("div");
    productElement.className = "product";

    // destructure product info
    const {id, image, title, price, description } = product;

    productElement.innerHTML = `
    <div class="product-img-wrapper">
      <img
        src="${image}"
        alt="${shortenTitle(title)}"
        class="product-img"
      />
      <div class="product-description">
        <p>
         ${description}
        </p>
      </div>
    </div>
    <h3 class="product-name">${shortenTitle(title)}</h3>
    <div class="product-info-box">
      <p class="product-price">$${price}</p>
      <div>
        <button class="add-to-cart-btn" data-id="${id}">Add to Cart</button>
      </div>
    </div>
    `;
    // Add event to add product to cart function and get product id
    const addToCartBtn = productElement.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      // get product id
      const productId = parseInt(addToCartBtn.getAttribute("data-id")
      );
      // method to find product by id
      const selectedProduct = products.find(product => {
        return product.id === productId;
      });
        addtocart(selectedProduct);
    });
    // append product element to product list
    productList.appendChild(productElement);
  });
};
// Add product to cart function
const addtocart = (product) => { 
  const cartItem = cartData.find(item => item.id === product.id);
  if (cartItem === undefined) {
    // spread operater to copy product object and add quantity property
    cartData.push({ ...product, quantity: 1 });
   
  }
  else {
    // quantity items already
    cartItem.quantity++;
   }
  

  saveproductlocalstorage();
  
  renderCart();
  
}
// Render cart items function
const renderCart = () => {
  cartData.map((item) => {

  
  })
};
// Save product to local storage function
const saveproductlocalstorage = () => {
  localStorage.setItem("cart", JSON.stringify(cartData));
}
// short products title
const shortenTitle = (title) => {
  const splitedTitle = title.split(" ");
  let newTitle = null;
  if (splitedTitle[1] === "-") {
    newTitle =` ${splitedTitle[0]}  ${splitedTitle[1]} ${splitedTitle[2]}`;
  } else {
    newTitle = `${splitedTitle[0]} ${splitedTitle[1]} `;
  }
  return newTitle;
}

// Start Initialy Project
getProducts();