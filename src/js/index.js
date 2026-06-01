import "../css/reset.css";
import "../css/global.css";
import "../css/header.css";
import "../css/favoritesNav.css";
import { initStaticIcons, StaticIconData } from "./icons.js";
import { manipulateClass } from "./helperFunctions.js";

const settingsButton = document.querySelector(".settingsButton");
const settingsMenu = document.querySelector(".settingsMenu");
const favBoxIcon = document.querySelector(".favBoxIcon");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector("nav");
const closeIcon = document.querySelector(".closeIcon");
const weatherSearch = document.querySelector("#weatherSearch");

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
// #######

// commit often
// branch for major refactor
// keep dom queries in index
// nobody imports from each other

// ##########################################

// MAIN:
// upper part: temp, minmax temp, condition, feels temp
// lower part details: uv index, sunrise, sunset, chance of rain, humidity, wind
// Hourly switcher = current hour + 12 with condition icon
// Day switcher - 5-7 days with average condition icon
