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

  function formatDay(timestamp) {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dt = new Date(timestamp);
    const day = dt.getDay();
    return weekDays[day];
  }

  if (ready) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {weatherDaily.map(function(forecast, index) {
            if (index < 5) {
              return (
                <div className="col-2">
                  <div className="WeatherForecast-day">
                    {formatDay(forecast.dt * 1000)}
                  </div>
                  <div className="WeatherForecast-icon">
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                      alt={`icon: ${forecast.weather[0].description}`}
                    />
                  </div>
                  <div className="WeatherForecast-temp">
                    <span className="WeatherForecast-temp-max">
                      {Math.round(forecast.temp.max)}°
                    </span>
                    <span className="WeatherForecast-temp-min">
                      {Math.round(forecast.temp.min)}°
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    Search();
  }
}
