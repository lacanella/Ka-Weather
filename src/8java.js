function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `your time: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showforecast(responce) {
  let forecast = responce.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="40"
              />
              <div class="forecast-temperature">
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}</span>°
                <span class="forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}</span>°
              </div>
            </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fc91beb744f93e422747179ad98c56f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showforecast);
}

function showTemperature(responce) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#cityname");
  let conditionElement = document.querySelector("#conditions");
  let dateElement = document.querySelector("#currentdate");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  CelsiusTemp = responce.data.main.temp;

  tempElement.innerHTML = Math.round(CelsiusTemp);
  cityElement.innerHTML = responce.data.name;
  conditionElement.innerHTML = responce.data.weather[0].description;
  dateElement.innerHTML = formatDate(responce.data.dt * 1000);
  humidityElement.innerHTML = responce.data.main.humidity;
  windElement.innerHTML = Math.round(responce.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", responce.data.weather[0].description);

  getForecast(responce.data.coord);
}

function search(city) {
  let apiKey = "fc91beb744f93e422747179ad98c56f9";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searching(event) {
  event.preventDefault();
  let typecityElement = document.querySelector("#typecity");
  search(typecityElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searching);

search("Kyiv");
