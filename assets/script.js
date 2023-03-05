const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
// console.log(searchForm);
// console.log(searchForm.value);

// event handler for search button
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('click')
    var userCity = searchForm.value;
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userCity + '&units=standard&appid=896dd63ca789f53ced8a876118b951a4')
        .then(function (response) {
            if (!response.ok) {
                throw response.json;
            };

            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat;
            // console.log(lat);
            var lon = data[0].lon;
            // console.log(lon);
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=896dd63ca789f53ced8a876118b951a4')
                .then(response => response.json())
                .then(data => {
                console.log(data);
                var forecastData = data.list.splice(0,5);
                console.log(forecastData);
                // date in text content
                var currentDate = new Date();
                // var currentCity = data.city.name
            })
        })
});

// weather api key
// 896dd63ca789f53ced8a876118b951a4