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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let TemperatureElement = document.querySelector("#temperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let FahrenheitTemp = (CelsiusTemp * 9) / 5 + 32;
  TemperatureElement.innerHTML = Math.round(FahrenheitTemp);
}

let CelsiusTemp = null;

function showCelsiusTemp(event) {
  event.preventDefault();
  let TemperatureElement = document.querySelector("#temperature");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  TemperatureElement.innerHTML = Math.round(CelsiusTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searching);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celciusLink = document.querySelector("#celsius");
celciusLink.addEventListener("click", showCelsiusTemp);

search("Kyiv");
