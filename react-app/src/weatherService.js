const API_KEY = "64f06a6c9aa34c32a129a5dc92f52cc2";
const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (location, units = "metric") => {
  let URL;

  if (/^[+-]?\d+(\.\d+)?,[+-]?\d+(\.\d+)?$/.test(location)) {
    // Coordinates format: latitude,longitude
    const [latitude, longitude] = location.split(",");
    URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`;
  } else {
    // City name format
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units}`;
  }

  const data = await fetch(URL)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];
  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export { getFormattedWeatherData };
