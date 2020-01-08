import React from "react";
import "./CityButton.css"

const cityButton = props => {
  return <button className="CityBtn" onClick={() => props.onClick()}>{props.city.title}</button>;
};

export default cityButton;
