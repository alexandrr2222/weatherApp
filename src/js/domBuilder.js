import { formatInTimeZone } from "date-fns-tz";
const DISPLAYED_HOURS = 12;
// current location grab
// animation load
async function renderIcon(description, parent, night) {
  try {
    const icon = await import(`../icons/animated/${description}${night}.svg`);
    parent.innerHTML = icon.default;
    const svg = parent.querySelector("svg");
    const clone = svg.cloneNode(true);
    svg.replaceWith(clone);
  } catch {
    const icon = await import(`../icons/animated/${description}.svg`);
    parent.innerHTML = icon.default;
    const svg = parent.querySelector("svg");
    const clone = svg.cloneNode(true);
    svg.replaceWith(clone);
  }
}
export function changeWeatherDOM(DOM, data, searchData) {
  let currentHour = formatInTimeZone(new Date(), data.timezone, "HH");
  if (currentHour[0] === "0") currentHour = currentHour.slice(1);
  let night = "";
  if (!data.current.is_day) night = "_night";
  const sluggedDescription = weatherConditions[data.current.weather_code]
    .toLowerCase()
    .replace(/\s+/g, "_");
  renderIcon(sluggedDescription, DOM.mainWeatherIcon, night);
  DOM.locationName.dataset.latitude = searchData.latitude;
  DOM.locationName.dataset.longitude = searchData.longitude;
  if (searchData.name === searchData.region)
    DOM.locationName.textContent = searchData.name;
  else
    DOM.locationName.textContent = searchData.name + ", " + searchData.region;
  DOM.localTime.textContent = formatInTimeZone(
    new Date(),
    data.timezone,
    "HH:mm",
  );
  DOM.temp.textContent = data.current.temperature_2m;
  DOM.tempDesc.textContent = weatherConditions[data.current.weather_code];
  DOM.tempMin.textContent = data.daily.temperature_2m_min[0];
  DOM.tempMax.textContent = data.daily.temperature_2m_max[0];
  DOM.wind.textContent = data.current.wind_speed_10m;
  DOM.uvIndex.textContent = data.hourly.uv_index[currentHour];
  DOM.sunrise.textContent = data.daily.sunrise[0].slice(-5);
  DOM.sunset.textContent = data.daily.sunset[0].slice(-5);
  DOM.rain.textContent = data.current.precipitation;
  DOM.humidity.textContent = data.current.relative_humidity_2m;
}
const weatherConditions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export function buildHourCards(parent, weather) {
  parent.innerHTML = "";
  let currentHour = formatInTimeZone(new Date(), weather.timezone, "HH");
  if (currentHour[0] === "0") currentHour = currentHour.slice(1);
  let ii = 0;
  let night;
  let checkedHour = Number(currentHour) + 1;
  for (let i = 0; i < DISPLAYED_HOURS; i++) {
    if (Number(checkedHour) + ii > 23) {
      checkedHour = 0;
      ii = 0;
    }
    const li = document.createElement("li");
    li.innerHTML = `
        <time datetime="" class="timeHour">${Number(checkedHour) + ii}:00</time>
        <div class="weatherHourIcon${i}"></div>
        <p class="temperatureHour">
            <span class="hourTemp">${weather.hourly.temperature_2m[Number(currentHour) + i + 1]} </span>
            <span class="tempUnit">°C</span>
        </p>`;
    parent.append(li);
    night = "";
    if (!weather.hourly.is_day[Number(currentHour) + i + 1]) night = "_night";
    const sluggedDescription = weatherConditions[
      weather.hourly.weather_code[Number(currentHour) + i + 1]
    ]
      .toLowerCase()
      .replace(/\s+/g, "_");
    renderIcon(
      sluggedDescription,
      document.querySelector(`.weatherHourIcon${i}`),
      night,
    );
    ii++;
  }
}
export function buildDayCards(parent, weather) {
  parent.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const li = document.createElement("li");
    li.dataset.day = i;
    li.innerHTML = `
        <time datetime="" class="dayTime"></time>
        <div class="weatherDayIcon"></div>
        <p class="minMaxDay">
          <span class="maxDay">20</span><span class="tempUnit">°C</span>
          <span>/</span>
          <span class="minDay">13</span><span class="tempUnit">°C</span>
        </p>`;
    parent.append(li);
  }
}
