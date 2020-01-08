import React from "react";
import "./LoadingSpinner.css";
import spinner from "./spinner.svg"

const loadingSpinner = props => {
  return <img src={spinner} alt="Loading Spinner"/>;
};

export default loadingSpinner;
