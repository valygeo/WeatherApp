import React, { useEffect, useState } from "react";
import hotBg from "./assets/hot.jpg";
import { Description } from "./Components/Description";
import { getFormattedWeatherData } from "./weatherService"; // Assuming you have a function for getting weather data
import "./App.css";
//dd
function App() {
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (location) => {
    try {
      const data = await getFormattedWeatherData(location, units);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentLocationWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting current location:", error);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error in fetchCurrentLocationWeather:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city.trim() === "") {
      // If no city is provided, get current location weather
      fetchCurrentLocationWeather();
    } else {
      // Fetch weather data for the entered city
      fetchData(city);
    }
  }, [city, units]);

  const handleSearch = () => {
    // Trigger fetching weather data for the entered city
    if (city.trim() !== "") {
      fetchData(city);
    } else {
      // If no city is provided, get current location weather
      fetchCurrentLocationWeather();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${hotBg})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <input
              type="text"
              name="city"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <button onClick={handleSearch}>Search</button>
          </div>
          {!loading && weather && weather.name ? (
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon"></img>
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}`}&deg;C</h1>
              </div>
            </div>
          ) : null}
          {!loading && weather && weather.name ? (
            <Description weather={weather}></Description>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
