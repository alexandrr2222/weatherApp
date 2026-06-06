export async function autocompleteSearch(search) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5&language=en&format=json`,
    );
    const responseData = await response.json();
    return createSearchObject(responseData);
  } catch (error) {
    console.log(error);
  }
}
function createSearchObject(responseData) {
  return responseData.results.map((r) => ({
    name: r.name,
    region: r.admin1,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}
export function createSearchDOM(dataObject, parent) {
  parent.innerHTML = "";
  dataObject.forEach((o) => {
    const li = document.createElement("li");
    li.role = "option";
    li.dataset.latitude = o.latitude;
    li.dataset.longitude = o.longitude;
    li.innerHTML = `<p class="autoName">${o.name}</p>
    <p class="autoRegion">${o.region}, ${o.country}</p>`;
    parent.append(li);
  });
}
