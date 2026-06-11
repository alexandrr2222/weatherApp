// error msg on fail load
// saving cords bad

// guardrails against clicking options menu while api loading/or error

// refactor and especially modulate code
// detail changer for hours
// goofy region overflow handling

import "../css/reset.css";
import "../css/global.css";
import "../css/header.css";
import "../css/favoritesNav.css";
import "../css/main.css";
import { initStaticIcons, StaticIconData } from "./icons.js";
import { manipulateClass } from "./helperFunctions.js";
import { getWeatherData } from "./weatherData.js";
import { autocompleteSearch, createSearchDOM } from "./search.js";
import {
  changeWeatherDOM,
  buildHourCards,
  buildDayCards,
} from "./domBuilder.js";
import { timeConverter } from "./unitsTime.js";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  kmhToMph,
  mphToKmh,
} from "./unitConvertors.js";
const settingsButton = document.querySelector(".settingsButton");
const settingsMenu = document.querySelector(".settingsMenu");
const favBoxIcon = document.querySelector(".favBoxIcon");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector("nav");
const closeIcon = document.querySelector(".closeIcon");
const weatherSearch = document.querySelector("#weatherSearch");
const autocomplete = document.querySelector(".autocomplete");
const hourlyCont = document.querySelector(".hourlyCont ul");
const hourlyContReal = document.querySelector(".hourlyCont");
const dailyCont = document.querySelector(".dailyCont ul");
const currentLocation = document.querySelector(".currentLocation");
const tempSetting = document.querySelector(".tempSetting");
const tempSettingText = document.querySelector(".tempSettingText");
const speedUnitSetting = document.querySelector(".speedUnitSetting");
const speedUnitSettingText = document.querySelector(".speedUnitSettingText");
const timeSetting = document.querySelector(".timeSetting");
const timeText = document.querySelector(".timeText");
const favoriteThisButton = document.querySelector(".favoriteThisButton");
const favoriteThisText = document.querySelector(".favoriteThisText");
const starIconFull = document.querySelector(".starIconFull");
const starIconEmpty = document.querySelector(".starIconEmpty");
const favList = document.querySelector(".favList");
const loadScreen = document.querySelector(".loadScreen");
const searchCont = document.querySelector(".searchCont");
let favoritePlaces = [];
const LOADER_TIMEOUT = 600;
loadSettings();
loadFavorites();
getCurrentLocation();
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".favList li");
  if (!btn) return;
  nav.classList.remove("active");
  overlay.classList.remove("active");
});
favBoxIcon.addEventListener("click", () => {
  nav.scrollTop = 0;
});

favoriteThisButton.addEventListener("click", () => {
  const cityName = document.querySelector(".cityName");
  let formattedName;
  if (cityName.textContent.includes(","))
    formattedName = cityName.textContent.split(",")[0];
  else formattedName = cityName.textContent;
  const latitude = cityName.dataset.latitude;
  const longitude = cityName.dataset.longitude;
  if (favoriteThisText.textContent === "Favorite") {
    starIconFull.style.display = "none";
    starIconEmpty.style.display = "block";
    favoriteThisText.textContent = "Unfavorite";
    const li = document.createElement("li");
    li.innerHTML = `
    <button 
    id = "ID${latitude.replace(/\./g, "")}${longitude.replace(/\./g, "")}"
    data-latitude="${latitude}" 
    data-longitude="${longitude}">
        ${formattedName}
    </button>`;
    if (cityName.textContent.includes(",")) {
      li.dataset.region = cityName.textContent.split(", ")[1];
    }
    li.dataset.city = formattedName;
    favoritePlaces.push({
      name: formattedName,
      region: cityName.textContent.split(",")[1],
      latitude: latitude,
      longitude: longitude,
    });
    favList.append(li);
    li.addEventListener("click", async () => {
      loadScreen.classList.remove("hidden");
      const reverseGeoSearch = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const searchResult = await reverseGeoSearch.json();
      console.log(searchResult);
      const reformatedSearchResult = {
        name: li.dataset.city,
        region: li.dataset.region,
        country: searchResult.address.country,
        latitude: latitude,
        longitude: longitude,
      };
      console.log(reformatedSearchResult);
      const returnedWeather = await getWeatherData(latitude, longitude);
      setTimeout(() => {
        loadScreen.classList.add("hidden");
      }, LOADER_TIMEOUT);
      if (returnedWeather) {
        changeWeatherDOM(
          changingValues,
          returnedWeather,
          reformatedSearchResult,
        );
        buildHourCards(hourlyCont, returnedWeather);
        buildDayCards(dailyCont, returnedWeather, StaticIconData);
        checkUnits();
        checkFavorite(latitude, longitude);
        window.scrollTo(0, 0);
        hourlyContReal.scrollLeft = 0;
      }
    });
  } else if (favoriteThisText.textContent === "Unfavorite") {
    starIconFull.style.display = "block";
    starIconEmpty.style.display = "none";
    favoriteThisText.textContent = "Favorite";
    const foundIndex = favoritePlaces.findIndex(
      (obj) => obj.latitude === latitude && obj.longitude === longitude,
    );
    const targetCity = document.querySelector(
      `#ID${latitude.replace(/\./g, "")}${longitude.replace(/\./g, "")}`,
    );
    targetCity.remove();
    favoritePlaces.splice(foundIndex, 1);
  }
  saveFavorites();
});

function checkFavorite(latitude, longitude) {
  if (
    document.querySelector(
      `#ID${String(latitude).replace(/\./g, "")}${String(longitude).replace(/\./g, "")}`,
    )
  ) {
    starIconFull.style.display = "none";
    starIconEmpty.style.display = "block";
    favoriteThisText.textContent = "Unfavorite";
  } else {
    starIconFull.style.display = "block";
    starIconEmpty.style.display = "none";
    favoriteThisText.textContent = "Favorite";
  }
}

const changingValues = {
  locationName: document.querySelector(".cityName"),
  localTime: document.querySelector(".currentTime time"),
  mainWeatherIcon: document.querySelector(".mainWeatherIcon"),
  temp: document.querySelector("#currentDegrees"),
  tempDesc: document.querySelector(".weatherDesc"),
  tempMin: document.querySelector("#degreesMin"),
  tempMax: document.querySelector("#degreesMax"),
  wind: document.querySelector("#wind"),
  uvIndex: document.querySelector("#uvIndex"),
  sunrise: document.querySelector("#sunrise"),
  sunset: document.querySelector("#sunset"),
  rain: document.querySelector("#precipitation"),
  humidity: document.querySelector("#humidity"),
};

function saveSettings() {
  const settings = {
    tempSettingText: document.querySelector(".tempSettingText").textContent,
    speedUnitSettingText: document.querySelector(".speedUnitSettingText")
      .textContent,
    timeText: document.querySelector(".timeText").textContent,
  };
  localStorage.setItem("settings", JSON.stringify(settings));
}
function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("settings"));
  if (!settings) return;
  document.querySelector(".tempSettingText").textContent =
    settings.tempSettingText;
  document.querySelector(".speedUnitSettingText").textContent =
    settings.speedUnitSettingText;
  document.querySelector(".timeText").textContent = settings.timeText;
}
function saveFavorites() {
  localStorage.setItem("favObject", JSON.stringify(favoritePlaces));
}
function loadFavorites() {
  const favObject = JSON.parse(localStorage.getItem("favObject") || "[]");
  favoritePlaces = favObject;

  favList.innerHTML = "";
  favObject.forEach((fav) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <button 
    id = "ID${fav.latitude.replace(/\./g, "")}${fav.longitude.replace(/\./g, "")}"
    data-latitude="${fav.latitude}" 
    data-longitude="${fav.longitude}">
        ${fav.name}
    </button>`;
    if (fav.region) {
      li.dataset.region = fav.region;
    }
    li.dataset.name = fav.name;
    favList.append(li);
    const targetCity = document.querySelector(
      `#ID${fav.latitude.replace(/\./g, "")}${fav.longitude.replace(/\./g, "")}`,
    );
    const latitude = targetCity.dataset.latitude;
    const longitude = targetCity.dataset.longitude;
    li.addEventListener("click", async () => {
      loadScreen.classList.remove("hidden");
      const reverseGeoSearch = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const searchResult = await reverseGeoSearch.json();

      const reformatedSearchResult = {
        name: li.dataset.name,
        region: li.dataset.region,
        country: searchResult.address.country,
        latitude: latitude,
        longitude: longitude,
      };
      const returnedWeather = await getWeatherData(latitude, longitude);
      setTimeout(() => {
        loadScreen.classList.add("hidden");
      }, LOADER_TIMEOUT);
      if (returnedWeather) {
        changeWeatherDOM(
          changingValues,
          returnedWeather,
          reformatedSearchResult,
        );
        buildHourCards(hourlyCont, returnedWeather);
        buildDayCards(dailyCont, returnedWeather, StaticIconData);
        checkUnits();
        checkFavorite(latitude, longitude);
        window.scrollTo(0, 0);
        hourlyContReal.scrollLeft = 0;
      }
    });
  });
}

let timer;

currentLocation.addEventListener("click", () => {
  getCurrentLocation();
});

function getCurrentLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let reformatedSearchResult;
    loadScreen.classList.remove("hidden");
    try {
      const reverseGeoSearch = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        { headers: { "User-Agent": "Z-Weather" } },
      );
      const searchResult = await reverseGeoSearch.json();
      const name =
        searchResult.address.city ||
        searchResult.address.town ||
        searchResult.address.village ||
        searchResult.address.hamlet ||
        searchResult.address.municipality ||
        searchResult.address.county ||
        `${latitude}, ${longitude}`;
      reformatedSearchResult = {
        name: name,
        region: searchResult.address.region,
        country: searchResult.address.country,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch {
      reformatedSearchResult = {
        name: position.coords.latitude + ", " + position.coords.longitude,
        region: undefined,
        country: undefined,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    }

    const returnedWeather = await getWeatherData(latitude, longitude);
    setTimeout(() => {
      loadScreen.classList.add("hidden");
    }, LOADER_TIMEOUT);
    if (returnedWeather) {
      changeWeatherDOM(changingValues, returnedWeather, reformatedSearchResult);
      buildHourCards(hourlyCont, returnedWeather);
      buildDayCards(dailyCont, returnedWeather, StaticIconData);
      checkUnits();
      checkFavorite(latitude, longitude);
      window.scrollTo(0, 0);
      hourlyContReal.scrollLeft = 0;
    }
  });
}
function checkUnits() {
  const degrees = document.querySelectorAll(".degree");
  const tempMarkers = document.querySelectorAll(".tempUnit");
  const speeds = document.querySelectorAll(".speed");
  const speedMarkers = document.querySelectorAll(".speedUnit");
  const times = document.querySelectorAll(".time");
  if (tempSettingText.textContent === "Celsius")
    celsiusToFahrenheit(degrees, tempMarkers);
  if (speedUnitSettingText.textContent === "km/h")
    kmhToMph(speeds, speedMarkers);
  if (timeText.textContent === "24h") timeConverter(times, "12");
}
timeSetting.addEventListener("click", () => {
  const times = document.querySelectorAll(".time");
  timeConverter(times, timeText);
  saveSettings();
});
tempSetting.addEventListener("click", () => {
  const degrees = document.querySelectorAll(".degree");
  const unitMarkers = document.querySelectorAll(".tempUnit");
  if (tempSettingText.textContent === "Celsius") {
    fahrenheitToCelsius(degrees, unitMarkers);
    tempSettingText.textContent = "Fahrenheit";
  } else if (tempSettingText.textContent === "Fahrenheit") {
    celsiusToFahrenheit(degrees, unitMarkers);
    tempSettingText.textContent = "Celsius";
  }
  saveSettings();
});
speedUnitSetting.addEventListener("click", () => {
  const speeds = document.querySelectorAll(".speed");
  const unitMarkers = document.querySelectorAll(".speedUnit");
  if (speedUnitSettingText.textContent === "km/h") {
    mphToKmh(speeds, unitMarkers);
    speedUnitSettingText.textContent = "mph";
  } else if (speedUnitSettingText.textContent === "mph") {
    kmhToMph(speeds, unitMarkers);
    speedUnitSettingText.textContent = "km/h";
  }
  saveSettings();
});

weatherSearch.addEventListener("input", (e) => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const returnedSearch = await autocompleteSearch(e.target.value);
    if (returnedSearch) {
      createSearchDOM(returnedSearch, autocomplete);
      const autocompleteOptions = Array.from(
        document.querySelectorAll(".autocomplete li"),
      );
      autocompleteOptions.forEach((opt) => {
        opt.addEventListener("click", async (e) => {
          loadScreen.classList.remove("hidden");
          weatherSearch.value = "";
          const elementLatitude = e.target.closest("li").dataset.latitude;
          const elementLongitude = e.target.closest("li").dataset.longitude;
          const selectedSearch = returnedSearch.find(
            (selected) =>
              selected.latitude.toString() === elementLatitude &&
              selected.longitude.toString() === elementLongitude,
          );
          autocomplete.innerHTML = "";
          const returnedWeather = await getWeatherData(
            elementLatitude,
            elementLongitude,
          );
          setTimeout(() => {
            loadScreen.classList.add("hidden");
          }, LOADER_TIMEOUT);
          if (returnedWeather) {
            changeWeatherDOM(changingValues, returnedWeather, selectedSearch);
            buildHourCards(hourlyCont, returnedWeather);
            buildDayCards(dailyCont, returnedWeather, StaticIconData);
            checkUnits();
            checkFavorite(selectedSearch.latitude, selectedSearch.longitude);
            window.scrollTo(0, 0);
            hourlyContReal.scrollLeft = 0;
          }
        });
      });
    }
  }, 0);
});
initStaticIcons(StaticIconData);
manipulateClass(settingsButton, settingsMenu, "active", "toggle");
manipulateClass(favBoxIcon, [overlay, nav], "active", "add");
manipulateClass(overlay, [overlay, nav], "active", "remove");
document.addEventListener("click", (e) => {
  if (!settingsMenu.contains(e.target) && !settingsButton.contains(e.target)) {
    settingsMenu.classList.remove("active");
  }
  if (!autocomplete.contains(e.target) && !searchCont.contains(e.target))
    autocomplete.innerHTML = "";
});
closeIcon.addEventListener("click", () => {
  weatherSearch.value = "";
  autocomplete.innerHTML = "";
});
closeIcon.addEventListener("mousedown", (e) => {
  e.preventDefault();
});

nav.style.transition = "none";
requestAnimationFrame(() => {
  nav.style.transition = "";
});
