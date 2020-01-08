import React from "react";
import "./Day.css";

const columnLine = {
  display: "flex",
};

const col = {
    flexDirection: "column",
    margin: "0 auto",
};

const day = (props) => {
    return (
        <div className="Card">
            <p>{props.weekDay}</p>
            <img src={"https://www.metaweather.com/static/img/weather/" + props.weather + ".svg"} alt="Weather Icon"/>
            <p>{props.temp}º</p>
            
            {/* <div className="Line">
                <div className="ColumnLine">
                    <p>Min</p>
                    <p>{props.minTemp}º</p>
                </div>
                <div className="ColumnLine">
                    <p>Max</p>
                    <p>{props.maxTemp}º</p>
                </div>
            </div> */}
            
            <div style={columnLine}>
                <div style={col}>
                    <p>Min</p>
                    <p>{props.minTemp}º</p>
                </div>
                <div style={col}>
                    <p>Max</p>
                    <p>{props.maxTemp}º</p>
                </div>
            </div>
            
            <div style={columnLine}>
                <div style={col}>
                    <p>wind speed</p>
                    <p>{props.windSpeed}</p>
                </div>
                <div style={col}>
                    <p>wind dir</p>
                    <p>{props.windDir}</p>
                </div>
            </div>
        </div>
    );
}

export default day;
