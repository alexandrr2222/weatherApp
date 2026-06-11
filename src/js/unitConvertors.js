let temperatureStorage = [];
let speedStorage = [];
export function celsiusToFahrenheit(degrees, unitMarkers) {
  temperatureStorage = [];
  Array.from(degrees).forEach((degree) => {
    temperatureStorage.push(degree.textContent);
    const celsius = degree.textContent;
    const fahrenheit = celsius * (9 / 5) + 32;
    degree.textContent = Math.round(fahrenheit);
  });
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "°F";
  });
}
export function fahrenheitToCelsius(degrees, unitMarkers) {
  let i = 0;
  Array.from(degrees).forEach((degree) => {
    degree.textContent = temperatureStorage[i];
    i++;
  });
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "°C";
  });
  temperatureStorage = [];
}

export function kmhToMph(speeds, unitMarkers) {
  speedStorage = [];
  Array.from(speeds).forEach((speed) => {
    speedStorage.push(speed.textContent);
    const kmh = speed.textContent;
    const mph = kmh / 1.609344;
    speed.textContent = Math.round(mph);
  });
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "mph";
  });
}
export function mphToKmh(speeds, unitMarkers) {
  let i = 0;
  Array.from(speeds).forEach((speed) => {
    speed.textContent = speedStorage[i];
    i++;
  });
  Array.from(unitMarkers).forEach((marker) => {
    marker.textContent = "km/h";
  });
  speedStorage = [];
}
