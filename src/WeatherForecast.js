import React from "react";
import "./WeatherForecast.css";

export default function WeatherForecast() {
  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col-2">
          <div className="WeatherForecast-day">Fri</div>
          <div className="WeatherForecast-icon">
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt="weather icon: rain"
            />
          </div>
          <div className="WeatherForecast-temp">
            <span className="WeatherForecast-temp-max">19</span>
            <span className="WeatherForecast-temp-min">11</span>
          </div>
        </div>
      </div>
    </div>
  );
}
