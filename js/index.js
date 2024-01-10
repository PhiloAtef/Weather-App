const apikey = 'e960d9800f004f859c8174437240301';
const numberOfDays = 3;
const baseUrl =
  "https://api.weatherapi.com/v1/forecast.json?key=" + apikey +"&days=" + numberOfDays;
let latitude = ""
let longitude = ""
const defaultCity = "London";


document.body.onload = () =>{
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser")
      } else {
        navigator.geolocation.getCurrentPosition(success);
        setTimeout(() => {
            getWeather(longitude, latitude);
        }, 1000);
      }
}
function success(position) {
   latitude = position.coords.latitude;
   longitude = position.coords.longitude;
   /* toberemoved */
    console.log(latitude, longitude)
}


async function getWeather(long,lat){
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&days=${numberOfDays}&q=${lat},${long}`)
    var finalresponse = await response.json();
    console.log(finalresponse)
}

let data = {
    current: {
        city: document.querySelector("#city-text"),
        day: document.querySelector(""),
        temp: document.querySelector(""),
        weatherDetails:{
            rain: document.querySelector(""),
            windSpeed: document.querySelector(""),
            windDirection: document.querySelector(""),
        },
    },
    dates: document.querySelectorAll("[id^='weather-content-day-']"),
    conditions: document.querySelectorAll("[id^='weather-content-condition-']"),
    forecastPictures: document.querySelectorAll("picture img"),
    maxDegrees: document.querySelectorAll("[id^='weather-content-max-degree-']"),
    minDegrees: document.querySelectorAll("[id^='weather-content-min-degree-']"),
};

