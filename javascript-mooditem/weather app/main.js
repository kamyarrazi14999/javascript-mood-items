// ELEMENTS SELECTION
const cityInput = document.getElementById("city-input");
const weatherInfo = document.querySelector(".weather-form");
eroreMassage = document.querySelector(".error-message");

// API DATA
const API_KEY = "f235a7d1451b2be4b94e8ad0ce5fb084";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`;
weatherInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityInput.value) {
    getWeater(API_URL + cityInput.value);
  }
});
const getWeater = async (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        eroreMassage.style.display = "block"; // show error message
        eroreMassage.textContent = data.message;
      }
      else { 
        eroreMassage.style.display = "none"; // hide error message
        eroreMassage.textContent = "";
        cityInput.value = "";
      }

    });
};
