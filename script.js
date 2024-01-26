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
  getForecast(response.data.city);
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

function getForecast(city) {
  let apiKey="fbef01f4et1b02o0d25c27210a43ef3f";
  apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${encodeURIComponent(
    city
  )}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function forecastDay (timestamp) {
let today = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[today.getDay()];
  
}
function displayForecast(response) {

  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
     if (index > 0 && index < 6) {
    forecastHtml =
    forecastHtml +
    `
    <div class="weather-forecast-day">
           <div class="weather-forecast-date">${forecastDay(day.time)}</div>
           <div class="weather-forecast-icon"><img src="${day.condition.icon_url}"/> </div>
           <div class="weather-forecast-temperatures">
                   <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                   <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
          </div>
    </div>
        
        `;
     }});
  let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Antananarivo");

