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

const settingsButton = document.querySelector(".settingsButton");
const settingsMenu = document.querySelector(".settingsMenu");
const favBoxIcon = document.querySelector(".favBoxIcon");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector("nav");
const closeIcon = document.querySelector(".closeIcon");
const weatherSearch = document.querySelector("#weatherSearch");
const autocomplete = document.querySelector(".autocomplete");
const hourlyCont = document.querySelector(".hourlyCont ul");
const dailyCont = document.querySelector(".dailyCont ul");

const changingValues = {
  locationName: document.querySelector(".cityName"),
  localTime: document.querySelector(".currentTime time"),
  mainWeatherIcon: document.querySelector(".mainWeatherIcon"),
  temp: document.querySelector("#degrees"),
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

let timer;

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
          if (returnedWeather) {
            changeWeatherDOM(changingValues, returnedWeather, selectedSearch);
            buildHourCards(hourlyCont, returnedWeather);
            buildDayCards(dailyCont, returnedWeather);
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
});
closeIcon.addEventListener("click", () => {
  weatherSearch.value = "";
});
closeIcon.addEventListener("mousedown", (e) => {
  e.preventDefault();
});
// ####### maybe not needed with miniCSS
nav.style.transition = "none";
requestAnimationFrame(() => {
  nav.style.transition = "";
});

const mainWeatherIcon = document.querySelector(".mainWeatherIcon");
mainWeatherIcon.innerHTML = `<svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="clear-day">
<g id="Sun">
<circle id="Core" cx="64" cy="63.9999" r="19.5" fill="url(#paint0_linear_1802_5186)" stroke="#F8AF18"/>
<g id="Rays">
<path d="M61 19C61 17.3431 62.3431 16 64 16C65.6568 16 67 17.3431 67 19V33C67 34.6569 65.6568 36 64 36C62.3431 36 61 34.6569 61 33V19Z" fill="#F8AF18"/>
<path d="M93.6985 30.0589C94.87 28.8873 96.7696 28.8873 97.9411 30.0589C99.1127 31.2304 99.1127 33.1299 97.9411 34.3015L88.0416 44.201C86.8701 45.3726 84.9706 45.3726 83.799 44.201C82.6274 43.0294 82.6274 41.1299 83.799 39.9584L93.6985 30.0589Z" fill="#F8AF18"/>
<path d="M109 61C110.657 61 112 62.3432 112 64C112 65.6569 110.657 67 109 67H95C93.3431 67 92 65.6569 92 64C92 62.3432 93.3431 61 95 61H109Z" fill="#F8AF18"/>
<path d="M97.9411 93.6985C99.1127 94.8701 99.1127 96.7696 97.9411 97.9411C96.7696 99.1127 94.8701 99.1127 93.6985 97.9411L83.799 88.0416C82.6274 86.8701 82.6274 84.9706 83.799 83.799C84.9706 82.6274 86.8701 82.6274 88.0416 83.799L97.9411 93.6985Z" fill="#F8AF18"/>
<path d="M61 95C61 93.3431 62.3431 92 64 92C65.6568 92 67 93.3431 67 95V109C67 110.657 65.6568 112 64 112C62.3431 112 61 110.657 61 109V95Z" fill="#F8AF18"/>
<path d="M39.9584 83.799C41.1299 82.6274 43.0294 82.6274 44.201 83.799C45.3726 84.9706 45.3726 86.8701 44.201 88.0416L34.3015 97.9411C33.1299 99.1127 31.2304 99.1127 30.0589 97.9411C28.8873 96.7696 28.8873 94.87 30.0589 93.6985L39.9584 83.799Z" fill="#F8AF18"/>
<path d="M33 61C34.6569 61 36 62.3431 36 64C36 65.6568 34.6569 67 33 67H19C17.3431 67 16 65.6568 16 64C16 62.3431 17.3431 61 19 61H33Z" fill="#F8AF18"/>
<path d="M44.201 39.9584C45.3726 41.1299 45.3726 43.0294 44.201 44.201C43.0294 45.3726 41.1299 45.3726 39.9584 44.201L30.0589 34.3015C28.8873 33.1299 28.8873 31.2305 30.0589 30.0589C31.2305 28.8873 33.1299 28.8873 34.3015 30.0589L44.201 39.9584Z" fill="#F8AF18"/>
<animateTransform attributeName="transform" type="rotate" values="0 64.0 64.0;360 64.0 64.0" dur="30s" begin="0s" repeatCount="indefinite"/></g>
</g>
</g>
<defs>
<linearGradient id="paint0_linear_1802_5186" x1="64" y1="43.9999" x2="64" y2="83.9999" gradientUnits="userSpaceOnUse">
<stop stop-color="#FBBF24"/>
<stop offset="1" stop-color="#F8AF18"/>
</linearGradient>
</defs>
</svg>`;
// #######

// commit often
// branch for major refactor
// keep dom queries in index
// nobody imports from each other

// ##########################################

// MAIN:
