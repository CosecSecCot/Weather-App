const APIKEY = '7f40ba42b15fd203179862a120567982';
let weather_request = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${APIKEY}`;

let searched_location = document.getElementById('location');
let location_name = document.getElementById('location-name');
searched_location.addEventListener('keyup', (event) => {
    if (event.code == 'Enter') {
        if (searched_location.value != '') {
            console.log(searched_location.value);
            location_name.innerHTML = searched_location.value.trim();
            fetchCordinates(searched_location.value);
        }
        return;
    }
});

function fetchCordinates(location) {
    let location_request = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIKEY}`;
    fetch(location_request)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    // console.log(location_response);
}
