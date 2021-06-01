//selecting classes using document query selector
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector('.weather-icon')
const tempElement = document.querySelector(".temperature-value p")
const descElement=document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p")

// object to store our values
//**onst weather={
  //  temperature : { 
   //     value : 18,
   //     unit:"celcius"
    //},
   // iconId: "01d",
    //decription : "cloudy",
    //city:"Accra",
    //country:"Ghana"
//}
// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

const KELVIN =273;
//API key
const key= "c453a0260702cc06b07f08243f3589c4";

//user has a geolocation service available
if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser doesn't support geolocation services</p>"
    
}


//user's location by geographic cordinates

function setPosition(position){ //props from browser console
    let latitude= position.coords.latitude;
    let longitude= position.coords.longitude;
    getWeather(latitude,longitude);
}

function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`
}

function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
// fetch api
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data
    })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}


//a function using innerHTML to define the element properties using ``(template literal)
function displayWeather(){
    iconElement.innerHTML=`<img src="icons /${weather.iconId}.png" />`;//weather is object and iconid is the property
    tempElement.innerHTML=`${weather.temperature.value} ° <span>C</span>`;
    descElement.innerHTML= weather.description;
    locationElement.innerHTML=`${weather.city}, ${weather.country}`;
}

function celciusToFahrenheit(temperature){
  return  (temperature *9/5)+32
}

// adding event listener for click
//unit conversion
tempElement.addEventListener("click", function(){
    if (weather.temperature.unit === undefined) return; // to check for errors if  the Api failed to fetch temp value
   
    if (weather.temperature.unit =="celsius"){
        let fahrenheit= celciusToFahrenheit(weather.temperature.value);
        fahrenheit=Math.floor(fahrenheit) //only the integer value not decimal
        tempElement.innerHTML = `${fahrenheit} &deg; <span> F</span>`;
        weather.temperature.unit="fahrenheit";
    } else{
        tempElement.innerHTML=`${weather.temperature.value} &deg; <span>C</span>`;
        weather.temperature.unit="celsius"
    }

});



//`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}

