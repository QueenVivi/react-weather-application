import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);

  function handleSubmit(event) {
    let apiKey = "3e325415f46bc35d8d6a6bc88d7c8554";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    event.preventDefault();
  }

  function displayWeather(response) {
    setWeatherData(response.data);
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              onChange={showCity}
              type="search"
              placeholder="Enter a city.."
              className="form-control"
              autoFocus="on"
            />
          </div>
          <div className="col-3">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w-100"
            />
          </div>
        </div>
      </form>
      {weatherData && (
        <p>
          It is {Math.round(weatherData.main.temp)} degree in {city}.
        </p>
      )}
    </div>
  );
}
