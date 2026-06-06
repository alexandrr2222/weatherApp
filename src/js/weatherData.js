export async function getWeatherData(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max,weather_code,precipitation_probability_max&hourly=temperature_2m,uv_index,wind_speed_10m,relative_humidity_2m,precipitation_probability,is_day,weather_code&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`,
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
