import React, { useEffect, useState } from "react";
import hotBg from "./assets/hot.jpg";
import { Description } from "./Components/Description";
import { getFormattedWeatherData } from "./weatherService";
import "./App.css";

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
      fetchCurrentLocationWeather();
    } else {
      fetchData(city);
    }
  }, [city, units]);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchData(city);
    } else {
      fetchCurrentLocationWeather();
    }
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
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
              onChange={(e) => setCity(e.target.value)}></input>
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
                <h1>
                  {`${weather.temp.toFixed()}`}&deg;
                  {units === "metric" ? "C" : "F"}
                </h1>
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
