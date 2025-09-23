// Elements
const cartButton = document.getElementById("header-cart-btn");
const productContainer = document.getElementById("product-list-container");
const cartContainer = document.querySelector(".cart-container");
const headerLink = document.querySelector(".header-link");
const conditionText = document.querySelector(".condition-text");
const productList = document.getElementById("product-list");

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

    conditionText.style.display = "none"; // Hide Loading When Data Arrived
    productList.classList.add("full-list");
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
    const { image, title, price, description } = product;

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
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
    `;

    productList.appendChild(productElement);
  });
};

// short products title
const shortenTitle = (text) => {
  const splitedTitle = text.split(" ");

  let newTitle = null;

  if (splitedTitle[1] === "-") {
    newTitle = `${splitedTitle[0]} ${splitedTitle[1]} ${splitedTitle[2]}`;
  } else {
    newTitle = `${splitedTitle[0]} ${splitedTitle[1]}`;
  }

  return newTitle;
};

// Start Initialy Project
getProducts();