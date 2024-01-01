function getWeather() {
  const apiKey = "f20f308b4dfef9c605356d708343cfae";
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
      const temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32); // Convert to Fahrenheit
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const currentDate = new Date(data.dt * 1000); // Convert timestamp to milliseconds
      const currentHour = currentDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });


      const temperatureHTML = `
            <p>${temperature}°F</p>
        `;
  
      const weatherHtml = `
            <p>${city}</p>
            <p>${currentDate}</p>
            <p>${currentHour}</p>
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
    const next4Hours = hourlyData.slice(0, 4);
  
    hourlyForecast.innerHTML = "";
    
    next4Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
      const hour = dateTime.getHours();
      const amOrPm = hour >= 12? "pm" : "am"; // Convert to AM/PM
      const hour12 = hour % 12 || 12; // Convert to 12-hour format
      const temperature =Math.round((item.main.temp - 273.15) * 9/5 + 32); // Convert to Fahrenheit
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
      const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour12}:00 ${amOrPm}</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature}°F</span>
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
