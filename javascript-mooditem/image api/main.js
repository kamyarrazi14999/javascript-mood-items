// ELEMENTS SELECTION
const loadingBox = document.querySelector(".loading-img");
const photosListContainer = document.getElementById("image-list-container");


// aPI DATA
const API_KEY = "guyzoV7LTTyH63GnYE15V57E07YLVArXfqiOWgN7ZOw";
const API_URl = `https://api.unsplash.com/photos?page=1&client_id=${API_KEY}`;

// Fetch Images From Unsplash API\
const getImages = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
      showImages(data);
      loadingBox.style.display = "none";
  } catch (error) {
    photosListContainer.innerHTML = `h2 class='error-message'>${error.message}</h2>`;
    loadingBox.style.display = "none";
  }
};
const showImages = (photos) => {
  photosListContainer.innerHTML = "";
  photos.forEach((photo) => {
    const img = `
   `
  });
};

// Show Images
getImages(API_URl);
