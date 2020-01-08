import React from "react";

const CityInput = props => {



  return <input type="text" value={props.city} onChange={(e) => {
    props.setCity(e.target.value);
  }}/>;
};

export default CityInput;