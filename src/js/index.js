import "../css/reset.css";
import "../css/global.css";
import { initStaticIcons, StaticIconData } from "./icons.js";

initStaticIcons(StaticIconData);

// commit often
// branch for major refactor
// keep dom queries in index
// nobody imports from each other

// ##########################################

// HEADER: 1. searchbar, 2. settings > f/c, km/miles, 3. current location button, 4. favorite burger menu > all the favorited places
// MAIN:
// Right now weather panel:
// upper part: temp, minmax temp, condition, feels temp
// lower part details: uv index, sunrise, sunset, chance of rain, humidity, wind
// Hourly switcher = current hour + 12 with condition icon
// Day switcher - 5-7 days with average condition icon
