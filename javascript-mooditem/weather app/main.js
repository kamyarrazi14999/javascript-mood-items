// ELEMENTS SELECTION
const cityInput = document.getElementById('city-input');
const weatherInfo = document.querySelector('.weather-form');




// API DATA
const API_KEY = 'f235a7d1451b2be4b94e8ad0ce5fb084';
const API_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`;
weatherInfo.addEventListener('submit', (e) => {
  e.preventDefault();
    if (cityInput.value) {
     getWeater(API_URL + cityInput.value)
  }
});
const getWeater = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}  