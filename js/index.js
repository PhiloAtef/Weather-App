const apikey = 'e960d9800f004f859c8174437240301';
const numberOfDays = 3;
const baseUrl =
  "https://api.weatherapi.com/v1/forecast.json?key=" + apikey +"&days=" + numberOfDays;
let latitude = ""
let longitude = ""
const defaultCity = "London";

let data = {
    current: {
        city: document.querySelector("#city-text"),
        day: document.querySelector("#weather-content-date-1"),
        temp: document.querySelector("#current-degree-text"),
        weatherDetails:{
            rain: document.querySelector("#current-weather-details-rain"),
            windSpeed: document.querySelector("#current-weather-details-wind-speed"),
            windDirection: document.querySelector("#current-weather-details-wind-direction"),
        },
    },
    dates: document.querySelectorAll("[id^='weather-content-day-']"),
    conditions: document.querySelectorAll("[id^='weather-text-day-']"),
    forecastPictures: document.querySelectorAll("[id^='weather-condition-icon-day-']"),
    maxDegrees: document.querySelectorAll("[id^='weather-content-max-degree-']"),
    minDegrees: document.querySelectorAll("[id^='weather-content-min-degree-']"),
};

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
    refreshDisplay(finalresponse);
}



function refreshDisplay(response){
    data.current.city.innerHTML = response.location.name;
    data.current.temp.innerHTML = response.current.temp_c + "°C";
    data.current.weatherDetails.rain.innerHTML = response.forecast.forecastday[0].day.daily_chance_of_rain+"%";
    data.current.weatherDetails.windSpeed.innerHTML =
    Math.round(Number(response.current.wind_kph)) + "km/h";
    /**need to parse wind direction */
    console.log(response.current.wind_dir)
    data.current.weatherDetails.windDirection.innerHTML =
    WindDir(response.current.wind_dir);

    let date = new Date(response.forecast.forecastday[0].date);
    let dayMonth = date.toLocaleDateString("en-US",{
        day: "numeric",
        month: "long",
    });
    data.current.day.innerHTML = dayMonth;
    
    for (let i = 0; i < numberOfDays; i++) {
        date = new Date(response.forecast.forecastday[i].date);
        let day = date.toLocaleDateString("en-US",{weekday:"long"});
        data.dates[i].innerHTML = day;

        data.forecastPictures[i].innerHTML = `<img src="${response.forecast.forecastday[i].day.condition.icon}" alt="">`
        data.conditions[i].innerHTML = response.forecast.forecastday[i].day.condition.text;

        if (i>0) {
            data.maxDegrees[i - 1].innerHTML =
            response.forecast.forecastday[i].day.maxtemp_c + "°C";
          data.minDegrees[i - 1].innerHTML =
            response.forecast.forecastday[i].day.mintemp_c + "°C";
        }
    }
}

function WindDir(wind){
    let result = "";
    for (let i = 0; i < wind.length; i++) {
        const element = wind[i].toLowerCase();
        if (i > 0) {
          result += " ";
        }
    
        switch (element) {
          case "n":
            result += "North";
            break;
          case "e":
            result += "East";
            break;
          case "w":
            result += "West";
            break;
          default:
            result += "South";
            break;
        }
      }
      console.log(result)
      return result;
}