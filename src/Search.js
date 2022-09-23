import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function search() {
    let apiKey = "3e325415f46bc35d8d6a6bc88d7c8554";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function displayWeather(response) {
    setWeatherData({
      ready: true,
      data: response.data,
    });
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  function formatDate(timestamp, timezone) {
    let dtObj = new Date(timestamp + timezone);
    let day = dtObj.getUTCDay();
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
    let hour = dtObj.getUTCHours();
    let minutes = dtObj.getUTCMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${dayOfWeek}, ${hour}:${minutes}`;
  }

  if (weatherData.ready) {
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
        <div className="weatherCondition">
          <div className="overview">
            <h1>{weatherData.data.name}</h1>
            <ul>
              <li>
                {formatDate(
                  weatherData.data.dt * 1000,
                  weatherData.data.timezone * 1000
                )}
              </li>
              <li>{weatherData.data.weather[0].description}</li>
            </ul>
          </div>
          <div className="row">
            <div className="col-6 hstack">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}.png`}
              />
              <div>
                <span className="temperature">
                  {" "}
                  {Math.round(weatherData.data.main.temp)}{" "}
                </span>
                <span className="unit">°C</span>
              </div>
            </div>
            <div className="col-6">
              <ul>
                <li>Humidity: {weatherData.data.main.humidity}%</li>
                <li>Wind: {weatherData.data.wind.speed}kmp</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
