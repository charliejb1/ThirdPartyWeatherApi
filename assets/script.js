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
function forecastInfo(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            retrieveData(data)
        })
}

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

function saveToStorage(newCity) {
    if (savedCities.includes(newCity)) {
        return
    }
    savedCities.push(newCity)
    localStorage.setItem("saved-cities", JSON.stringify(savedCities))
}

function retrieve5Day(data) {

}

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

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    getCityName();
    displaySearches();
})
