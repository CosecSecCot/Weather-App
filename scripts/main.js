const APIKEY = ''; // Enter your openweathermap APIKEY here

let searched_location = document.getElementById('location');
let location_name = document.getElementById('location-name');

searched_location.addEventListener('keyup', (event) => {
    if (event.code == 'Enter') {
        if (searched_location.value != '') {
            console.log(searched_location.value);
            location_name.innerHTML = searched_location.value.trim();

            fetchData();
        }
    }
});

async function fetchData() {
    try {
        let location = await fetchCoordinates(searched_location.value);
        console.log(location);
        let weather = await fetchWeather(location.lat, location.lon);
        console.log(weather);
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
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}
