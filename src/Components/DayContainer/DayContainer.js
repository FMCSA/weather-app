import React from "react";
import Day from "../Day/Day";
import "./DayContainer.css";


const dayContainer = props => {
  if(!props.weatherInfo) {
    return null;
  }

  return (
    <div className="CardContainer">
        {props.weatherInfo.slice(0, props.maxDays).map(info => (
            <Day
            key = {info.weekDay} 
            weekDay={info.weekDay} 
            weather={info.weather_state_abbr} 
            temp={Math.round(info.the_temp)}
            minTemp={Math.round(info.min_temp)}
            maxTemp={Math.round(info.max_temp)}
            windSpeed={Math.round(info.wind_speed)}
            windDir={Math.round(info.wind_direction)}
            />  
        ))}
    </div>
  );
};

export default dayContainer;
