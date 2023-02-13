let now = new Date();

console.log(now.getDate());

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let am_pm = date.toLocaleTimeString();

  let day = document.querySelector("#currentDate");
  day.innerHTML = `${currentDay} ${currentMonth} ${currentDate}`;

  let time = document.querySelector("#currentTime");
  time.innerHTML = `${am_pm}`;
}

formatDate(now);

// search form

function displayWeatherCondition(response) {
  document.querySelector("#currentLocation").innerHTML = response.data.name;
  document.querySelector("#nowtemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#nowhumidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#nowwind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "6a1cbe067fcd0c1dc852d954cfce27aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  //let inputCity = document.querySelector("#inputCity");
  //let currentLocation = document.querySelector("#currentLocation");
  //currentLocation.innerHTML = inputCity.value;
  let city = document.querySelector("#inputCity").value;
  searchCity(city);
}

function searchLocation(position) {
  let units = "metric";
  let apiKey = "6a1cbe067fcd0c1dc852d954cfce27aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let formSearch = document.querySelector("#search");
formSearch.addEventListener("submit", handleSubmit);

let buttonCurrentLocation = document.querySelector("#buttonCurrentLocation");
buttonCurrentLocation.addEventListener("click", getCurrentLocation);

searchCity("New York");

// bonus

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#nowtemperature");
  //let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 60;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#nowtemperature");
  temperatureElement.innerHTML = 20;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#fahrenheit");
celsiusLink.addEventListener("click", convertToCelsius);
