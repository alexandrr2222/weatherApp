import { parse, format } from "date-fns";
let temperatureStorage = [];
export function celsiusToFahrenheit(degrees, unitMarkers) {
  Array.from(degrees).forEach((degree) => {
    temperatureStorage.push(degree.textContent);
    const celsius = degree.textContent;
    const fahrenheit = celsius * (9 / 5) + 32;
    degree.textContent = Math.round(fahrenheit);
  });
  console.log(temperatureStorage);
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "°F";
  });
}
export function fahrenheitToCelsius(degrees, unitMarkers) {
  Array.from(degrees).forEach((degree) => {
    const fahrenheit = degree.textContent;
    const celsius = (fahrenheit - 32) * (5 / 9);
    degree.textContent = Math.round(celsius);
  });
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "°C";
  });
}
// load from object, but then into what
//
export function kmhToMph(speeds, unitMarkers) {
  Array.from(speeds).forEach((speed) => {
    const kmh = speed.textContent;
    const mph = kmh / 1.609344;
    speed.textContent = Math.round(mph);
  });
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "mph";
  });
}
export function mphToKmh(speeds, unitMarkers) {
  Array.from(speeds).forEach((speed) => {
    const mph = speed.textContent;
    const kmh = mph * 1.609344;
    speed.textContent = Math.round(kmh);
  });
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "km/h";
  });
}
export function timeConverter(times, preference) {
  Array.from(times).forEach((time) => {
    if (preference === "12") {
      const currentTime = time.textContent;
      const parsed = parse(currentTime, "HH:mm", new Date());
      if (time.classList.contains("timeHour"))
        time.textContent = format(parsed, "h a");
      else time.textContent = format(parsed, "h:mm a");
    } else if (preference === "24") {
      let parsed;
      const currentTime = time.textContent;
      if (time.classList.contains("timeHour"))
        parsed = parse(currentTime, "hh a", new Date());
      else parsed = parse(currentTime, "hh:mm a", new Date());
      time.textContent = format(parsed, "HH:mm");
    }
  });
}
