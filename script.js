const API_KEY = "48cac4a5af1020cc9257eb3e7bfb2324";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const weather_ICON = "https://openweathermap.org/img/wn/";

const inputCity = document.querySelector("input");
const btn = document.querySelector(".add-city");
const weatherContainer = document.querySelector(".weather-card");

let set = new Set();

btn.addEventListener("click", () => {
  let searchQuery = inputCity.value;
  if (searchQuery == "") {
    alert("please enter city name");
  }

  fetchWeather(searchQuery);
});

async function fetchWeather(cityName) {
  try {
    const response = await fetch(
      BASE_URL + `q=${cityName}` + `&appid=${API_KEY}` + `&units=metric`
    );
    const data = await response.json();
    let cityadd = false;
    set.forEach((city) => {
      if (city.name == data.name) {
        cityadd = true;
        alert("city already added");
      }
    });

    if (cityadd == false) {
      set.add(data);
      // for sorting set , first convert it into array
      // then sort array by sort method
      // then convert array to set again
      let myArray = Array.from(set);
      myArray.sort((a, b) => {
        return a.main.temp - b.main.temp;
      });
      set.clear();
      set = new Set(myArray);

      displayWeather();
    }
  } catch (err) {
    console.log(err);
  }
}
function displayWeather() {
  weatherContainer.innerHTML = "";
  set.forEach((city) => {
    let card = document.createElement("div");
    card.className = "card";

    let infoCon = document.createElement("div");
    infoCon.className = "info";

    let temp = document.createElement("div");
    temp.className = "temp";
    temp.innerText = city.main.temp+"°";

    let ht = document.createElement("div");
    ht.className = "ht";
    ht.innerText = "H:" + city.main.temp_max  + "° L:" +city.main.temp_min+"°";

    let name = document.createElement("div");
    name.className = "cityname";
    name.innerText = city.name;

    infoCon.append(temp, ht, name);

    let weatherImg = document.createElement("div");
    weatherImg.className = "weather-img";

    let imgOf = document.createElement("div");
    imgOf.className = "img-api";

    let imgFromApi = document.createElement("img");
    imgFromApi.src = weather_ICON + city.weather[0].icon + "@4x.png";

    imgOf.append(imgFromApi);

    let weatherCondition = document.createElement("div");
    weatherCondition.className = "weather-condition";
    weatherCondition.innerText = city.weather[0].main;

    weatherImg.append(imgOf, weatherCondition);

    card.append(infoCon, weatherImg);
    weatherContainer.append(card);
  });
}
