function updateWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let timeElement = document.querySelector("#time");
  let windSpeedElement = document.querySelector("#wind-speed");
  let date = new Date(response.data.time * 1000);
  let emoji = document.querySelector("#emoji");
  
let emojiElement = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`
 
  emoji.innerHTML = emojiElement;

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours} : ${minutes}`;
}
function searchCity(city) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(
    city
  )}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");