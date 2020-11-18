function formatTime(time) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let timeElement = document.querySelector("#time");
let currentTime = new Date();

timeElement.innerHTML = formatTime(currentTime);

function formatDate(date) {
  let dayIndex = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  let monthIndex = currentDate.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[monthIndex];

  let year = currentDate.getFullYear();
  let datenow = currentDate.getDate();

  return ` ${day}, ${month} ${datenow}, ${year}`;
}
let dateElement = document.querySelector("#date");
let currentDate = new Date();

dateElement.innerHTML = formatDate(currentDate);

//

function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#latitude").innerHTML = response.data.coord.lat;
  document.querySelector("#longitude").innerHTML = response.data.coord.lon;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
}

//

function handleSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "a443edec30a183c88b00d1c6adfc3dcd";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

//

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "a443edec30a183c88b00d1c6adfc3dcd";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Search a city on load
searchCity("San Francisco");
