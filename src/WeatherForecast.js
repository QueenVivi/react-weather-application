import React, { useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  const [ready, setReady] = useState(false);
  const [weatherDaily, setWeatherDaily] = useState(null);

  function Search() {
    let lat = props.coords.lat;
    let lon = props.coords.lon;
    let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
    let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiForecastUrl).then(displayForecast);
  }

  function displayForecast(response) {
    setWeatherDaily(response.data.daily);
    setReady(true);
  }

  if (ready) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          <div className="col-2">
            <div className="WeatherForecast-day">{weatherDaily[0].dt}</div>
            <div className="WeatherForecast-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weatherDaily[0].weather[0].icon}.png`}
                alt={`icon: ${weatherDaily[0].weather[0].description}`}
              />
            </div>
            <div className="WeatherForecast-temp">
              <span className="WeatherForecast-temp-max">
                {Math.round(weatherDaily[0].temp.max)}°C
              </span>
              <span className="WeatherForecast-temp-min">
                {Math.round(weatherDaily[0].temp.min)}°C
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    Search();
  }
}
