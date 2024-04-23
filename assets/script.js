// List of variables grabbing from HTML or API usage
const APIKey = "c3e27e7ff4cd6c7894a041ab35583de6"
const weatherFinder = document.querySelector(".weatherfinder")
const displayCard = document.querySelector(".card")
const currentDay = document.querySelector("#weather-card")
const fiveDay = document.querySelector(".fiveDay")
const submitButton = document.querySelector("#submit-button")
const previousSearches = document.querySelector("#searches")

var savedCities = JSON.parse(localStorage.getItem("saved-cities"))
if (savedCities == null) {
    savedCities = []
    localStorage.setItem("saved-cities", JSON.stringify(savedCities))
}
// Function for retrieving weather data for current day card
function cityInfo(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`

    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        }).then(function (response) {
            currentDay.innerHTML = ""
            currentDay.innerHTML += `
        <h3>Temp: ${response.main.temp} ºF
        </h3>
        <p>Humidity: ${response.main.humidity} %
        </p>
        <p>Wind: ${response.wind.speed} mph
            </p>
        `
        
            forecastInfo(response.coord.lat, response.coord.lon)
        })
}
// function for retrieving weather data form lat & lon points for five day forecast
function forecastInfo(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            retrieveData(data)
        })
}
// Looping through receievd data and appending to five day cards 
function retrieveData(data) {

    fiveDay.innerHTML = ""
    for (let i = 0; i < data.list.length; i += 8) {
        let weatherData = data.list[i]
        fiveDay.innerHTML += `<div class="fiveday-card"> 
            <h4> ${weatherData.dt_txt}
            </h4>
            <p>Temp: ${weatherData.main.temp} ºF
            <p>
            <p>Humidity: ${weatherData.main.humidity} %
            </p>
            <p>Wind: ${weatherData.wind.speed} mph
            </p>
            </div>`
    }
}
// Saving new city inputs to local storage
function saveToStorage(newCity) {
    if (savedCities.includes(newCity)) {
        return
    }
    savedCities.push(newCity)
    localStorage.setItem("saved-cities", JSON.stringify(savedCities))
}

// function for retrieving saved cities from local storage and dispalying on previous searh card
function displaySearches() {
    const cities = JSON.parse(localStorage.getItem("saved-cities"))
    if (!cities) {
        return

    }
    previousSearches.innerHTML = ""
    for (let i = 0; i < cities.length; i++) {
        previousSearches.innerHTML += `<div id="searches">
    <p> ${cities[i]} <p>
    </div>`

    }
}
// Fucntion that defines what an input is and where it comes from
function getCityName() {
    var inputValue = document.getElementById("city-input")
    var cityValue = inputValue.value.trim()
    

    cityInfo(cityValue)
    saveToStorage(cityValue)
    displaySearches()
    inputValue.value = "";
}

cityInfo("Chicago")
displaySearches()
// On the submit button click, fucntiosn below will be called
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    getCityName();
    displaySearches();
})
