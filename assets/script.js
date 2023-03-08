const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const fiveDayEl = document.getElementById('five-day-forecast');
const searchResults = document.getElementById('search-results');
var cityHistory = JSON.parse(localStorage.getItem('city')) ?? [];

// event handler for search button
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log('click')
    // stores search form text in var
    var userCity = searchForm.value;
    // fetches lat/lon for city
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + userCity + '&units=imperial&appid=896dd63ca789f53ced8a876118b951a4')
        .then(function (response) {
            if (!response.ok) {
                throw response.json;
            };

            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            // retrieves lat/lon for city and stores in var
            var lat = data[0].lat;
            var lon = data[0].lon;
            // stores result of search for city
            var currentCity = data[0].name;
            // console.log(currentCity);
            addHistory(currentCity);
            // fetches city given based on lat/lon
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=896dd63ca789f53ced8a876118b951a4')
                // retrieves response and converts to json
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // creates var array for days 2-5
                    var forecastData = data.list.splice(1, 4);

                    // store city name from search
                    var currentCity = data.city.name;
                    let cityTitle = document.getElementById('city-header');

                    // store current unix timestamp as var
                    var currentUnix = data.list[0].dt;

                    // convert unix to ms
                    var currentMilliseconds = currentUnix * 1000;

                    // convert to usable date
                    var currentDateObject = new Date(currentMilliseconds);

                    // store current date
                    var currentHumanTime = currentDateObject.toLocaleDateString(currentDateObject);

                    // define html objects in js
                    var currentIcon = document.getElementById('current-icon');
                    var currentTemp = document.getElementById('current-temp');
                    var currentWind = document.getElementById('current-wind');
                    var currentHumidity = document.getElementById('current-humidity');

                    // give content to html objects
                    cityTitle.textContent = currentCity + ' ' + currentHumanTime;
                    currentIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png")
                    currentTemp.innerHTML = 'Temperature: ' + data.list[0].main.temp + ' F';
                    currentWind.innerHTML = 'Wind speed: ' + data.list[0].wind.speed + ' MPH';
                    currentHumidity.innerHTML = 'Humidity: ' + data.list[0].main.humidity + ' %';

                    clearFiveDay();
                    // loop for day 2-5 to create card and add forecast
                    for (let i = 0; i < 4; i++) {
                        var fiveDayForecast = forecastData[i];

                        // create and append each day's forecast
                        var fiveDayDiv = document.createElement('div');
                        fiveDayEl.appendChild(fiveDayDiv);
                        fiveDayDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-2', 'p-1', 'm-1', 'card', 'p-2');

                        // add date
                        var fiveDayDate = document.createElement('p');
                        var fiveDayUnix = fiveDayForecast.dt
                        var fiveDayMilliseconds = fiveDayUnix * 1000;
                        var fiveDayDateObject = new Date(fiveDayMilliseconds);
                        var fiveDayHumanDate = fiveDayDateObject.toLocaleDateString(fiveDayDateObject);
                        fiveDayDate.textContent = fiveDayHumanDate;

                        // add icon
                        var iconID = fiveDayForecast.weather[0].icon;
                        var fiveDayIcon = document.createElement('img');
                        fiveDayIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + iconID + '.png');

                        // add temp
                        var fiveDayTemp = document.createElement('p');
                        fiveDayTemp.textContent = 'Temperature: ' + fiveDayForecast.main.temp + ' F'

                        // add wind speed
                        var fiveDayWind = document.createElement('p');
                        fiveDayWind.textContent = 'Wind speed: ' + fiveDayForecast.wind.speed + ' MPH'

                        // add humidity
                        var fiveDayHumidity = document.createElement('p');
                        fiveDayHumidity.textContent = 'Humidity: ' + fiveDayForecast.main.humidity + '%';

                        // add items to div
                        fiveDayDiv.appendChild(fiveDayDate);
                        fiveDayDiv.appendChild(fiveDayIcon);
                        fiveDayDiv.appendChild(fiveDayTemp);
                        fiveDayDiv.appendChild(fiveDayWind);
                        fiveDayDiv.appendChild(fiveDayHumidity);
                    };
                });
        });
});

// weather api key
// 896dd63ca789f53ced8a876118b951a4
function addHistory(currentCity) {
    // adds city name search history if not already listed
    if (!cityHistory.includes(currentCity)) {
        cityHistory.push(currentCity);
        localStorage.setItem('city', JSON.stringify(cityHistory));
        displayHistory();
    };

};

// clears the content of fiveDayEl so it doesn't populate more than four days past day 0 (today)
function clearFiveDay() {
    fiveDayEl.innerHTML = '';
};

// display search history
function displayHistory() {
    searchResults.innerHTML = '';
        for (let i = 0; i < cityHistory.length; i++) {
            var historyBtn = document.createElement('button');
            historyBtn.classList.add('btn', 'btn-secondary', 'mb-4', 'p-2')
            historyBtn.textContent = cityHistory[i];
            searchResults.appendChild(historyBtn);
        };
;}

displayHistory();