function getWeather() {
  const apiKey = 'f20f308b4dfef9c605356d708343cfae';
  const city = document.getElementById("city").value;
  
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching current weather:", error);
      alert("Error fetching current weather. Please try again later.");
    });
  
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayHourlyForecast(data.list);
    })
    .catch(error => {
      console.error("Error fetching forecast:", error);
      alert("Error fetching hourly forecast. Please try again later.");
    });
  
  function displayWeather(data) {
    const temp = document.getElementById("temp");
    const weatherInfo = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
    const hourlyForecast = document.getElementById("hourly-forecast");
  
    weatherInfo.innerHTML = "";
    hourlyForecast.innerHTML = "";
    temp.innerHTML = "";
  
    if (data.cod === "404") {
      weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
      const city = data.name;
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
      const temperatureHTML = `
            <p>${temperature}°C</p>
        `;
  
      const weatherHtml = `
            <p>${city}</p>
            <p>${description}</p>
        `;
  
      temp.innerHTML = temperatureHTML;
      weatherInfo.innerHTML = weatherHtml;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;
  
      showImage();
    }
  }
  
  function displayHourlyForecast(hourlyData) {
    const hourlyForecast = document.getElementById("hourly-forecast");
    const next24Hours = hourlyData.slice(0, 8);
  
    next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
      const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature}°C</span>
                </div>
            `;
  
      hourlyForecast.innerHTML += hourlyItemHtml;
    });
  }
  
  function showImage() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
  }
}
