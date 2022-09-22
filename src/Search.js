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
    console.log(response.data);
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  function formatDate(seconds) {
    let dtObj = new Date(seconds * 1000);
    let day = dtObj.getDay();
    let weekDay = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayOfWeek = weekDay[day];
    let hour = dtObj.getHours();
    let minutes = dtObj.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${dayOfWeek}, ${hour}:${minutes}`;
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
        <div className="weatherCondition">
          <div className="overview">
            <h1>{city}</h1>
            <ul>
              <li>{formatDate(weatherData.dt)}</li>
              <li>{weatherData.weather[0].description}</li>
            </ul>
          </div>
          <div className="row">
            <div className="col-6 hstack">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              />
              <div>
                <span className="temperature">
                  {" "}
                  {Math.round(weatherData.main.temp)}{" "}
                </span>
                <span>°C</span>
              </div>
            </div>
            <div className="col-6">
              <ul>
                <li>Humidity: {weatherData.main.humidity}%</li>
                <li>Wind: {weatherData.wind.speed}kmp</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
