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
    console.log(latitude, longitude)
}


async function getWeather(long,lat){
    var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&days=${numberOfDays}&q=${lat},${long}`)
    var finalresponse = await response.json();
    console.log(finalresponse)
}

let data = {
    
}