const productsList = document.querySelector(".products-list");
const loadingElement = document.querySelector(".loading-element");
const errorElement = document.querySelector(".error-element");

// GET PRODUCTS FROM API WITH ASYNC AWAIT
// const getProducts = async () => {
//   try {
//     const response = await fetch("https://fakesdfdftoreapi.com/products");
//     const data = await response.json();
//     hideLoading();
//     showProducts(data);
//   } catch (err) {
//     hideLoading();
//     errorElement.innerText = err.message;
//   }
// };

// GET PRODUCTS FROM API WITH THEN
const getProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      hideLoading();
      showProducts(data);
    })
    .catch((err) => {
      hideLoading();
      errorElement.innerText = err.message;
    });
};

// CALL PRODUCTS FROM API
getProducts();

// SHOW PRODUCTS
const showProducts = (products) => {
  products.map((product) => {
    const { title, image, price } = product;

    const productCard = `
      <li class='product-item'>
        <img src=${image} alt=${shortenTitle(title)} class='product-img' />
        <h3>${shortenTitle(title)}</h3>

        <div class='product-details-box'>
          <button type='button' class='product-btn'>Buy</button>
          <p class="product-price">$ ${price}</p>
        </div>
      </li>
    `;

    productsList.innerHTML += productCard;
  });
};

// SHORTEN PRODUCT TITLE
const shortenTitle = (title) => {
  const splittedTitle = title.split(" ");
  const newTitle = `${splittedTitle[0]} ${splittedTitle[1]} ${splittedTitle[2]}`;

  return newTitle;
};

// HIDE LAODING
const hideLoading = () => {
  loadingElement.style.display = "none";
};
