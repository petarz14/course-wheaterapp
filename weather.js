// DATE and TIME
let time = new Date();
let showDate = document.querySelector("#true-date");

let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = time.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let year = time.getFullYear();
let date = time.getDate();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[time.getDay()];

let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12];
let month = months[time.getMonth()];

let todaysDate = `${day} ${date}.${month}.${year}. ${hour}:${minutes}`;

showDate.innerHTML = todaysDate;

//CITY DISPLAY
function defaultCity(city) {
  let apiKey = "f95298fd8a5d13e64f0023d1f288f1bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function showTemp(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-show").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function currentLocation(response) {
  document.querySelector("#city").innerHTML = response.data.name;
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-your-city").value;
  defaultCity(city);
}
let temperatureForm = document.querySelector("form");
temperatureForm.addEventListener("submit", getCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "f95298fd8a5d13e64f0023d1f288f1bf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentLocation);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let butt = document.querySelector("#city-butt");
butt.addEventListener("click", getCurrentLocation);

defaultCity("zagreb");
