

function weatherApi() {
    const cityEl = $('#cityInput').val();
    let apiKey = '10e29da6a649e69fabcd957dd59a3c59'
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + cityEl + `&units=imperial&APPID=10e29da6a649e69fabcd957dd59a3c59`)
        .then(function (response) {
            return response.json();
            
        })
        .then(function (data) {
            let weatherData = data;
            console.log(weatherData);
            const today = new Date(weatherData.dt * 1000)
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const currentWeatherContainer = $('#today-weather');
            const weatherIcon = document.createElement('img');
            const currentTemp = document.createElement('p');
            const currentWind = document.createElement('p');
            const currentHumidity = document.createElement('p');
            const currentUvIndex = document.createElement('p');
            
            const cityNameEl = document.createElement('h3');
            cityNameEl.innerHTML = weatherData.name + " (" + month + "/" + day + "/" + year + ") ";
            let currentIcon = weatherData.weather[0].icon;
            
            weatherIcon.setAttribute = src=`https://openweathermap.org/img/wn/${currentIcon}@2x.png`;
            weatherIcon.setAttribute = alt= weatherData.weather.description;
            console.log(cityNameEl);
            currentTemp.textContent = 'Temperature: ' + weatherData.main.temp + '\u00B0';
            currentWind.textContent = 'Wind Speed: ' + weatherData.wind.speed + 'mph';
            currentHumidity.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
            

            
            currentWeatherContainer.append(cityNameEl);
            weatherIcon.append(currentIcon);
            currentWeatherContainer.append(weatherIcon);
            currentWeatherContainer.append(currentTemp);
            currentWeatherContainer.append(currentWind);
            currentWeatherContainer.append(currentHumidity);
            
            // uv index
            const lattitude = weatherData.coord.lat;
            const longitude = weatherData.coord.lon;
            console.log(lattitude);
            console.log(longitude);
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial&APPID=10e29da6a649e69fabcd957dd59a3c59&")
                .then(function(response) {
                    console.log(fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&APPID=10e29da6a649e69fabcd957dd59a3c59&cnt=1"))
                    return response.json;
                
                }) 
                .then(function(data) {
                    let uvData = data;
                    console.log(data);
                    uvIndex = uvData.current.uvi;
                    let currentUvIndex = document.createElement("span");
                    
                    if (uvData.current.uvi < 4 ) {
                        uvIndex.setAttribute("class", "badge badge-success");
                    }
                    else if (uvData.current.uvi < 8) {
                        uvIndex.setAttribute("class", "badge badge-warning");
                    }
                    else {
                        uvIndex.setAttribute("class", "badge badge-danger");
                    }
                    
                    currentUvIndex.innerHTML = "UV Index: ";
                    currentUvIndex.append(uvIndex);
                    currentWeatherContainer.append(currentUvIndex);
                })   

            console.log(currentIcon);
        })
}

$('#searchBtn').click(function() {
    weatherApi();
})