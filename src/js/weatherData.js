export async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=c284ebc64e014691990183005260306&q=${location}&days=3&aqi=no&alerts=no`,
    );
    const responseData = await response.json();
    return createWeatherObject(responseData);
  } catch (error) {
    console.log(error);
  }
}
function createWeatherObject(responseData) {
  return {
    location: {
      name: responseData.location.name + ", " + responseData.location.region,
      localTime: responseData.location.localtime,
    },
    current: {
      temp: responseData.current.temp_c,
      description: responseData.current.condition.text,
      minTemp: responseData.forecast.forecastday[0].day.mintemp_c,
      maxTemp: responseData.forecast.forecastday[0].day.maxtemp_c,
      wind: responseData.current.wind_kph,
      uv: responseData.current.uv,
      sunrise: responseData.forecast.forecastday[0].astro.sunrise,
      sunset: responseData.forecast.forecastday[0].astro.sunset,
      rain: responseData.current.chance_of_rain,
      humidity: responseData.current.humidity,
      isDay: responseData.current.is_day,
    },
    days: responseData.forecast.forecastday.map((d) => ({
      minTemp: d.day.mintemp_c,
      maxTemp: d.day.maxtemp_c,
      sunrise: d.astro.sunrise,
      sunset: d.astro.sunset,
      avgTemp: d.day.avgtemp_c,
      avgDescription: d.day.condition.text,
      maxWind: d.day.maxwind_kph,
      avgUV: d.day.uv,
      avgRain: d.day.daily_chance_of_rain,
      avgHumidity: d.day.avghumidity,
      hours: d.hour.map((h) => ({
        displayedTime: h.time_epoch,
        temp: h.temp_c,
        description: h.condition.text,
        wind: h.wind_kph,
        uv: h.uv,
        rain: h.chance_of_rain,
        humidity: h.humidity,
        isDay: h.is_day,
      })),
    })),
  };
}

// kdyz je noc {night}_{object.description}
// jinak {object.description}
