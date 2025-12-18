// ELEMENTS SELECTION
const cityInput = document.getElementById("city-input");
const weatherInfo = document.querySelector(".weather-form");
const eroreMassage = document.querySelector(".error-message");
const searchBox = document.querySelector(".search-box");
const searchBoxContainer = document.getElementById("search-box-container");
const resultBoxContainer = document.getElementById("result-container");
const backButton = document.querySelector(".back-btn");
const weatherIcon = document.querySelector(".weather-icon");
const temperAture = document.querySelector(".temperature-text");
const humiDity = document.querySelector(".humidity-text");
const City = document.querySelector(".city-text");
const desCription = document.querySelector(".description-text");
const feelsLike = document.querySelector(".feels-like-text");

// API DATA
const API_KEY = "f235a7d1451b2be4b94e8ad0ce5fb084";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`;
// form submit event
weatherInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityInput.value) {
    getWeater(API_URL + cityInput.value);
  }
});
// get weather data from API
const getWeater = (url) => {
  eroreMassage.style.display = "none";
  searchBox.classList.add("loading");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // if city not found or API error occurred then display error message and return from function.
      if (data.cod === "404") {
        displayError(data.message);
      } else {
        searchBoxContainer.style.display = "none";
        resultBoxContainer.style.display = "block";
        backButton.style.display = "block";
        showWeather(data);
      }
    })
    .catch((error) => {
      displayError("An error occurred while fetching the data.");
    })
    .finally(() => {
      searchBox.classList.remove("loading");
    });
};
// function to back to previous section
backButton.addEventListener("click", () => {
  searchBoxContainer.style.display = "block";
  resultBoxContainer.style.display = "none";
  backButton.style.display = "none";
  cityInput.value = "";
});
// show weather info
const showWeather = (data) => {
  // show feels like, humidity, temperature and weather description
  const { feels_like, humidity, temp } = data.main;
  const { id, description } = data.weather[0];
  if (id == 800) {
    weatherIcon.src = "./assets/suny.png";
  } else if (id >= 801 && id <= 804) {
    weatherIcon.src = "./assets/cloudy.png";
  } else if (id >= 701 && id <= 781) {
    weatherIcon.src = "./assets/windy.png";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    weatherIcon.src = "./assets/rainy.png";
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = "./assets/snowy.png";
  } else if (id >= 200 && id <= 232) {
    weatherIcon.src = "./assets/thunder-stormy.png";
  }
  temperAture.innerHTML = `${Math.round(temp - 273.15)}&deg;C`;
  desCription.innerHTML = description;
 
};
// set input direction based on language
cityInput.addEventListener("input", () => {
  const inputDirection = isPersian(cityInput.value) ? "rtl" : "ltr";

  cityInput.style.direction = inputDirection;
});
// check if text is in Persian language
const isPersian = (text) => {
  const persianRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  return persianRegex.test(text);
};
// item display error message
const displayError = (error) => {
  eroreMassage.style.display = "block";
  eroreMassage.textContent = error;
};
