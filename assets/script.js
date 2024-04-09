const APIKey = "c3e27e7ff4cd6c7894a041ab35583de6"
console.log(APIKey)
const weatherFinder = document.querySelector(".weatherfinder")
const displayCard = document.querySelector(".card")
const currentDay = document.querySelector("#weather-card")
const fiveDay = document.querySelector(".fiveDay")
var savedCities = JSON.parse(localStorage.getItem("saved-cities"))
if(savedCities == null){
    savedCities = []
    localStorage.setItem("saved-cities", JSON.stringify(savedCities))
}
console.log("Saved cities: ", savedCities)
// String - "" or '' or ``
// Number  - 5 or 5.5
// Boolean - true or false
// Array - [element1, element2]
// Object - {key1: value1, key2:value2}
function cityInfo(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`

    fetch(apiUrl)
    .then(function(response) {
        return response.json()
    }).then( function(response) {
        console.log(response)
        currentDay.innerHTML += `
        <h3>Temp: ${response.main.temp} ºF
        </h3>
        <p>Humidity: ${response.main.humidity} %
        </p>
        `
        console.log(response.main.temp)
        console.log(response.main.humidity)
        forecastInfo(response.coord.lat, response.coord.lon)
    })
}
    function forecastInfo(lat, lon){
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
        fetch(apiUrl)
        .then(function(response){
            console.log("response: ", response)
            return response.json()
    }).then( function(data) {
        console.log("Data: ", data)
        retrieveData(data)
        })
    }

    function retrieveData(data){
        //use for current day
        console.log(data.list[0])
        // use for appending data for current day


        for (let i = 0;i <= data.list.length; i += 8){ 
        let weatherData = data.list[i] 
        console.log("Weather Data: ", weatherData)
            fiveDay.innerHTML += `<div class="fiveday-card"> 
            <h3>Temp: ${weatherData.main.temp} ºF
            </h3>
            <p>Humidity: ${weatherData.main.humidity} %
            </p>
            </div>`
        }
    }

    function saveToStorage(newCity){
        if(savedCities.includes(newCity)){
            return
        }
        savedCities.push(newCity)
        localStorage.setItem("saved-cities", JSON.stringify(savedCities))
    }


    function retrieve5Day(data){

    }
saveToStorage("Chicago")
saveToStorage("Dallas")
cityInfo("Chicago")

