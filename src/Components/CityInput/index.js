import React from "react";

const style = {
  display: "flex",
  margin: "auto",
  padding: "10px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "lightgray"
};

const CityInput = props => {
  return <input type="text"
    style={style}
    placeholder="Type to Search"
    value={props.city}
    onChange={(e) => {
      props.setCity(e.target.value);
    }} />;
};

export default CityInput;