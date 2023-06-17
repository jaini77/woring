const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.querySelector('.weather-info');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const locationData = locationInput.value;
  fetchWeatherData(locationData);
});

function fetchWeatherData(location) {
  const apiKey = '3265874a2c77ae4a04bb96236a642d2f'; // API key
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      saveData(location, data);
    })
    .catch(error => {
      console.log('An error occurred while fetching weather data:', error);
    });
}

function updateWeatherData(data) {
  let dataOfArray = data;
  let weatherInfo = document.getElementById("weatherInfo");
  dataOfArray.map((item) => {
    let divContainer = document.createElement("div");
    const locationName = item.data.name;
    const temperatureMet = Math.round(item.data.main.temp - 273.15);
    const descriptionDetails = item.data.weather[0].description;
    const iconCode = item.data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    
    
    let location = document.createElement("div");
    let temperature = document.createElement("div");
    let description = document.createElement("div");
    let time = document.createElement("p");
    
    let icon = document.createElement("div");
    icon.className = "icon";
    let image = document.createElement("img")
    image.src = iconUrl;
    icon.appendChild(image);
    
    divContainer.className = "box";
    location.className = "location";
    description.className = "description";
    temperature.className = "temperature";
    location.innerHTML = locationName;
    temperature.innerHTML = temperatureMet;
    description.innerHTML = descriptionDetails;
    time.innerHTML = item.time;

    divContainer.appendChild(location);
    divContainer.appendChild(description);
    divContainer.appendChild(temperature);
    divContainer.appendChild(icon);
    divContainer.appendChild(time);

    weatherInfo.appendChild(divContainer);
  });
}
//savedata
function saveData(locationData, data) {
  const storedData = localStorage.getItem('weatherData');  
  if(storedData){
    if(JSON.parse(storedData).length > 0){
      if(JSON.parse(storedData).length > 10){
        let weatherData = {
          location: locationData,
          data: data,
          time: Date()
        };
        let historyArray = JSON.parse(storedData);
        historyArray.push(weatherData);
        let newHistoryArray = historyArray.slice(1);
        localStorage.setItem('weatherData', JSON.stringify(newHistoryArray));
        updateWeatherData(newHistoryArray.reverse());
        location.reload();
      }
      else {
        let weatherData = {
          location: locationData,
          data: data,
          time: Date()
        };
        let historyArray = JSON.parse(storedData);
        console.log(historyArray);
        historyArray.push(weatherData);
        localStorage.setItem('weatherData', JSON.stringify(historyArray));
        updateWeatherData(historyArray.reverse());
        location.reload()      }
    }
    else{
      let weatherDataArrayLocalStorage = [{
        location: locationData,
        data: data,
        time: Date()
      }];
      localStorage.setItem('weatherData', JSON.stringify(weatherDataArrayLocalStorage));
      updateWeatherData(weatherDataArrayLocalStorage.reverse());
      location.reload();
    }
  }
  else{
    let weatherDataArrayLocalStorage = [{
      location: locationData,
      data: data,
      time: Date()
    }];
    localStorage.setItem('weatherData', JSON.stringify(weatherDataArrayLocalStorage));
    updateWeatherData(weatherDataArrayLocalStorage.reverse());
    location.reload();
  }
}


function loadData() {
  console.log("loading data are load");
  const storedData = localStorage.getItem('weatherData'); 
  if (storedData) {
    const weatherData = JSON.parse(storedData);
    updateWeatherData(weatherData.reverse());
  }
  else{
    console.log("No Data Found");
  }
}
loadData();