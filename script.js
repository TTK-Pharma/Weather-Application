let weather = {
  apiKey : "4685c355f14dd37b6d1ccfc16aac564e",
  fetching: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}`
    )
    .then((response) => {
      if(!response.ok) {
        console.log("Data intrepted")
        throw Error("No data found")
      }
      return response.json()
    })
    .then((data)=>this.displayWeather(data))
  },
  displayWeather: function (data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    document.querySelector(".place").innerHTML = `Weather in ${name}`
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    document.querySelector(".description").innerHTML = description
    document.querySelector(".temp").innerHTML = `Temp : ${Math.round(temp)} °C`
    document.querySelector(".humidity").innerHTML = `Humidity : ${humidity} %`
    document.querySelector(".wind").innerHTML = `Wind : ${Math.round(speed)} km/h`
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;

  },
  search: function () {
    this.fetching(document.querySelector('.input').value);
  }
};
document.querySelector(".sear").addEventListener("click", ()=> {
  weather.search();
});
document.querySelector('.input').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    weather.search();
  }
});
weather.fetching("Chennai");