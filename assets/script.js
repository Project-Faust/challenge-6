const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
console.log(searchForm);
console.log(searchForm.value);

// event handler for search button
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('click')
    var userCity = searchForm.value;
    var geoCity = function () {

    };
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userCity + '&units=standard&appid=896dd63ca789f53ced8a876118b951a4')
        .then(function (response) {
            if (!response.ok) {
                throw response.json;
            };

            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            var lat = data[0].lat;
            console.log(lat);
            var lon = data[0].lon;
            console.log(lon);
            return fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=896dd63ca789f53ced8a876118b951a4');
        })
});

var showCurrentWeather = function (data) {

};


var citySearch = function () {

};

var displayExtended = function () {

};

// weather api key
// 896dd63ca789f53ced8a876118b951a4