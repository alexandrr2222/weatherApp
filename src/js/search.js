export async function autocompleteSearch(search) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=c284ebc64e014691990183005260306&q=${search}`,
    );
    const responseData = await response.json();
    return createSearchObject(responseData);
  } catch (error) {
    console.log(error);
  }
}
function createSearchObject(responseData) {
  return responseData.map((s) => ({
    name: s.name,
    region: s.region,
    country: s.country,
  }));
}
