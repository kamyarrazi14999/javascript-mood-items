// ELEMENTS SELECTION
const loadingBox = document.querySelector(".loading-img");
const photosListContainer = document.getElementById("image-list-container");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const notFound = document.querySelector(".not-found-img");
const pagination = document.querySelector(".pagination");
const pageButton = document.querySelectorAll(".page-btn");
const prevButton = document.querySelector(".prev-btn");

// VARIABLES
let currentPage = 1;
let lastURL = null;
// aPI DATA
const API_KEY = "guyzoV7LTTyH63GnYE15V57E07YLVArXfqiOWgN7ZOw";
const API_URl = `https://api.unsplash.com/photos?page=${currentPage}&client_id=${API_KEY}`;
const API_SEARCH_URL = `https://api.unsplash.com/search/photos?page =${currentPage}&client_id=${API_KEY}&query=`;

// Fetch Images From Unsplash API\
const getImages = async (url) => {
  // update current page
  lastURL = url;
  try {
    const response = await fetch(url);
    const data = await response.json();
    loadingBox.style.display = "none";
    pagination.style.display = "flex";
    if (data.results) {
      showImages(data.results);
    } else {
      showImages(data);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } catch (error) {
    photosListContainer.innerHTML = `<h2 class='error-message'>${error.message}</h2>`;
    loadingBox.style.display = "none";
  }
};
// Search Images
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchvalue = searchInput.value;
  if (searchvalue) {
    // activate loading box
    photosListContainer.innerHTML = "";
    loadingBox.style.display = "block";
    notFound.style.display = "none";
    pagination.style.display = "none";
    // active frast page button
    pageButton.forEach((btn) => btn.classList.remove("active"));
    document.querySelector("[data-page='1']").classList.add("active");
    getImages(API_SEARCH_URL + searchvalue);
    searchInput.value = "";
  }
});
// item show template for images list display

const showImages = (photos) => {
  photosListContainer.innerHTML = "";
  if (photos.length) {
    photos.forEach((photo) => {
      const { urls } = photo;
      const image = `
      <div class="image-item">
        <img src="${urls.regular}" alt="Image"
        class="image" 
        />
      

  </div>
    `;
      photosListContainer.innerHTML += image;
    });
  } else {
    notFound.style.display = "block";
    loadingBox.style.display = "none";
    pagination.style.display = "none";
  }
};
// Pagination item show template for pagination display
pageButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    pageButton.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    // get page & call function
    const buttonpage = btn.dataset.page;
    callpage(buttonpage);
  });
});
// Pagination function
const callpage = (page) => {
  const urlsplit = lastURL.split("?");
  const searchParams = new URLSearchParams(urlsplit[1]);
  searchParams.set("page", page);
  const url = urlsplit[0] + "?" + searchParams.toString();
  console.log(url);
  getImages(url);
};
// Show Images
getImages(API_URl);
