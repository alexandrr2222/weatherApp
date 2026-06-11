import { formatInTimeZone } from "date-fns-tz";
import { add, format } from "date-fns";
const DISPLAYED_HOURS = 24;
const DISPLAYED_DAYS = 6;

function renderIcon(description, parent, night) {
  parent.innerHTML = "";
  const img = document.createElement("img");
  img.src = `./icons/animated/${description}${night}.svg`;
  img.onerror = () => {
    img.onerror = null;
    img.src = `./icons/animated/${description}.svg`;
  };
  parent.append(img);
}
export function changeWeatherDOM(DOM, data, searchData) {
  console.log(searchData);
  let currentHour = formatInTimeZone(new Date(), data.timezone, "HH");
  if (currentHour[0] === "0") currentHour = currentHour.slice(1);
  let night = "";
  if (!data.current.is_day) night = "_night";
  const sluggedDescription = weatherConditions[data.current.weather_code]
    .toLowerCase()
    .replace(/\s+/g, "_");
  renderIcon(sluggedDescription, DOM.mainWeatherIcon, night);
  DOM.locationName.dataset.city = searchData.name;
  DOM.locationName.dataset.region = searchData.region;
  DOM.locationName.dataset.latitude = searchData.latitude;
  DOM.locationName.dataset.longitude = searchData.longitude;
  console.log(searchData.country);
  if (
    searchData.name === searchData.region ||
    searchData.region === undefined ||
    searchData.region === "undefined"
  ) {
    if (searchData.country === undefined || searchData.country === "undefined")
      DOM.locationName.textContent = searchData.name;
    else
      DOM.locationName.textContent =
        searchData.name + ", " + searchData.country;
  } else
    DOM.locationName.textContent = searchData.name + ", " + searchData.region;
  DOM.localTime.textContent = formatInTimeZone(
    new Date(),
    data.timezone,
    "HH:mm",
  );
  DOM.temp.textContent = Math.round(data.current.temperature_2m);
  DOM.tempDesc.textContent = weatherConditions[data.current.weather_code];
  DOM.tempMin.textContent = Math.round(data.daily.temperature_2m_min[0]);
  DOM.tempMax.textContent = Math.round(data.daily.temperature_2m_max[0]);
  DOM.wind.textContent = Math.round(data.current.wind_speed_10m);
  let fixedUV = String(data.hourly.uv_index[currentHour].toFixed(1));
  if (fixedUV.at(-1) === "0") fixedUV = fixedUV.slice(0, -2);
  DOM.uvIndex.textContent = fixedUV;
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
        <time datetime="${Number(checkedHour) + ii}:00" class="timeHour time">${Number(checkedHour) + ii}:00</time>
        <div class="whIcon weatherHourIcon${i}"></div>
        <p class="temperatureHour">
            <span class="hourTemp degree">${Math.round(weather.hourly.temperature_2m[Number(currentHour) + i + 1])} </span>
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
  const currentDate = weather.current.time;
  let dayDate = currentDate;
  parent.innerHTML = "";
  for (let i = 0; i < DISPLAYED_DAYS; i++) {
    let fixedUV = String(weather.daily.uv_index_max[i + 1].toFixed(1));
    if (fixedUV.at(-1) === "0") fixedUV = fixedUV.slice(0, -2);
    const sluggedDescription = weatherConditions[
      weather.daily.weather_code[i + 1]
    ]
      .toLowerCase()
      .replace(/\s+/g, "_");
    dayDate = add(dayDate, {
      days: 1,
    });
    const dayName = format(dayDate, "eeee");
    const date = format(dayDate, "do MMMM");

    const li = document.createElement("li");
    li.dataset.day = i;
    li.innerHTML = `
        <li class="dayCard">
            <div class="weatherDayIcon"></div>
            <div class="weatherDayMain">
              <div class="dayAndDateCont">
                <time datetime="" class="dayDay">${dayName}</time>
                <time datetime="" class="dayDate">${date}</time>
              </div>
              <div class="minmaxDayCont">
                <div class="minDayCOnt">
                  <p class="minTempDay">
                    <span class="minTempDayNum degree">${Math.round(
                      weather.daily.temperature_2m_min[i + 1],
                    )}</span>
                    <span class="tempUnit">°C</span>
                  </p>
                  <p class="minTempText">min</p>
                </div>
                <div class="maxDayCont">
                  <p class="maxTempDay">
                    <span class="maxTempDayNum degree">${Math.round(
                      weather.daily.temperature_2m_max[i + 1],
                    )}</span>
                    <span class="tempUnit">°C</span>
                  </p>
                  <p class="maxTempText">max</p>
                </div>
              </div>
            </div>
            <div class="weatherDayDetails">
              <div class="dayWind">
                <div class="dayWindIcon"></div>
                <div>
                  <p class="dayWindText">Wind max</p>
                  <p class="dayWindUnitCont">
                    <span class="dayWindUnit speed">${Math.round(
                      weather.daily.wind_speed_10m_max[i + 1],
                    )}</span>
                    <span class="speedUnit">km/h</span>
                  </p>
                </div>
              </div>
              <div class="dayPrecipitation">
                <div class="dayPrecipitationIcon"></div>
                <div>
                  <p class="dayPrecipitationText">Precipitation</p>
                  <p class="dayPrecipitationUnitCont">
                    <span class="dayPrecipitationUnit">${Math.round(
                      weather.daily.precipitation_probability_max[i + 1],
                    )}</span><span>%</span>
                  </p>
                </div>
              </div>
              <div class="dayUV">
                <div class="dayUVIcon"></div>
                <div>
                  <p class="dayUVText">Max UV</p>
                  <p class="dayUVUnitCont">${fixedUV}</p>
                </div>
              </div>
            </div>
          </li>
          `;
    renderIcon(
      sluggedDescription,
      li.querySelector(".weatherDayIcon"),
      undefined,
    );
    parent.append(li);
  }
}
