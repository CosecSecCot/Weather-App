const APIKEY = '7f40ba42b15fd203179862a120567982';

let searched_location = document.getElementById('location');
let location_name = document.getElementById('location-name');

searched_location.addEventListener('keyup', (event) => {
    if (event.code == 'Enter') {
        if (searched_location.value != '') {
            console.log(searched_location.value);
            location_name.innerHTML = searched_location.value.trim();

            updateCSS(searched_location);
        }
    }
});

async function updateCSS(location) {
    let weather = await fetchData(location);
    console.log(weather);

    let weather_condition = document.querySelector('.weather-condition');
    weather_condition.innerHTML = weather.weather[0].description.replace(
        /\b\w/g,
        (match) => match.toUpperCase()
    );

    let icon_url = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    let weather_icon = document.getElementById('weather-icon');
    weather_icon.outerHTML = `<img id="weather-icon" src="${icon_url}" alt="icon here">`;

    let temp_value = document.querySelector('.temp-value');
    temp_value.innerHTML = Math.round(weather.main.temp - 273.15);

    let visibility = document.querySelector('.visibility');
    let humidity = document.querySelector('.humidity');
    let wind = document.querySelector('.wind');
    visibility.innerHTML = `Visibility: ${(weather.visibility / 10000).toFixed(1)} %`;
    humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;
    wind.innerHTML = `Wind: ${weather.wind.speed.toFixed(1)} m/s`;
}

async function fetchData(location) {
    try {
        let coordinates = await fetchCoordinates(location.value);
        console.log(coordinates);
        let weather = await fetchWeather(coordinates.lat, coordinates.lon);
        return weather;
    } catch (error) {
        console.log(error);
    }
}

async function fetchCoordinates(location) {
    let location_request = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIKEY}`;
    return fetch(location_request)
        .then((response) => response.json())
        .then((data) => {
            return { lat: data[0].lat, lon: data[0].lon };
        })
        .catch((err) => {
            console.log(err);
            return {};
        });
}

async function fetchWeather(latitude, longitude) {
    let weather_request = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
    return fetch(weather_request)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.log(err));
}
