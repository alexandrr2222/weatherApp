export function createSearchDOM(dataObject, parent) {
  parent.innerHTML = "";
  dataObject.forEach((o) => {
    const li = document.createElement("li");
    li.role = "option";
    li.dataset.city = o.name;
    li.innerHTML = `<p class="autoName">${o.name}</p>
    <p class="autoRegion">${o.region}, ${o.country}</p>`;
    parent.append(li);
  });
}
export function changeWeatherDOM(DOM, data, currentD, currentH) {
  let currentDay;
  let currentHour;
  if (currentD === "current") {
    currentDay = 0;
    currentHour = data.location.localTime.slice(-5, -3);
  } else {
    currentDay = currentD;
    // tady do currentu pujde data-day
    currentHour = 12;
    // a pokud klikame na den tak automaticky hour 12
  }
  console.log(currentDay, currentHour);
  console.log(data);
  DOM.locationName.textContent = data.location.name;
  DOM.localTime.textContent = data.location.localTime.slice(-5);

  DOM.temp.textContent = data.days[currentDay].hours[currentHour].temp;
  DOM.tempDesc.textContent =
    data.days[currentDay].hours[currentHour].description;
  DOM.tempMin.textContent = data.days[currentDay].minTemp;
  DOM.tempMax.textContent = data.days[currentDay].maxTemp;
  DOM.wind.textContent = data.days[currentDay].hours[currentHour].wind;
  DOM.uvIndex.textContent = data.days[currentDay].hours[currentHour].uv;
  DOM.sunrise.textContent = data.days[currentDay].sunrise;
  DOM.sunset.textContent = data.days[currentDay].sunset;
  DOM.rain.textContent = data.days[currentDay].hours[currentHour].rain;
  DOM.humidity.textContent = data.days[currentDay].hours[currentHour].humidity;
  //   if have dataset day or dataset hour do x
}

export function buildHourCards(parent) {
  for (let i = 0; i < 24; i++) {
    const li = document.createElement("li");
    li.dataset.hour = i;
    let currentHour;
    if (i < 12) currentHour = i + 1 + " AM";
    else currentHour = i - 12 + 1 + " PM";
    li.innerHTML = `
        <time datetime="" class="timeHour">${currentHour}</time>
        <div class="weatherHourIcon"></div>
        <p class="temperatureHour">
            <span class="hourTemp">20 </span>
            <span class="tempUnit">°C</span>
        </p>`;
    parent.append(li);
  }
}
export function buildDayCards(parent, days) {
  for (let i = 0; i < days; i++) {
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

// currentLocation a input > location a current
// hour
//
// day
// bude mit event listener > na nej kliknes rekne ti dataset pres (e) > volas construction funkci a vkladas do ni dataset 0,1,2 podle toho pak selectujes rendr napr object.days[0] + vzdycky data z 12 hodiny
