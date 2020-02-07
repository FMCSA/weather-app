import React, { useState, useEffect } from 'react';
import CityButton from './CityButton/CityButton';
import DayContainer from "./DayContainer/DayContainer";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import axios from 'axios';
import './App.css';

function App() {

  const maxDays = 5;
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = "https://www.metaweather.com/api/location/";

  const [display, setDisplay] = useState(false);
  const [woeid, setWoeid] = useState("");
  const [city, setCity] = useState("");
  const [cities, setButtons] = useState([]);
  const [forecast, setForecast] = useState(undefined);
  const [load, setLoad] = useState(false);


  useEffect(() => {
    // Using proxy to avoid CORS error
    if (city.length > 0) {
      setLoad(true);
      axios.get(proxy + url + "search/?query=" + city)
        .then((resp) => {
          console.log(resp);

          const woeidArr = resp.data; // we can limit the n of suggestions
          setButtons(woeidArr); // setoptions or setsuggestions
          setLoad(false);
        });
    }


  }, [city]);

  useEffect(() => {
    if (city.length > 0) {
      setLoad(true);

      axios.get(proxy + url + woeid)
        .then((resp) => {
          resp.data.consolidated_weather.forEach((elem) => {
            elem.weekDay = getWeekDay(elem.applicable_date);
          });

          setForecast(resp.data.consolidated_weather);
          setLoad(false);
        })
        .catch((error) => { console.log("Error getting weather info: " + error) });
    }
  }, [woeid]);

  const getWeekDay = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  const setInputValue = value => {
    setCity(value);
    setDisplay(false);
  };

  return (
    <div>

      <input
        type="text"
        className="AutoCompleteInput"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {display && (cities.map(city =>
        <CityButton key={city.woeid} city={city} onClick={() => {
          setInputValue(city.title);
          setWoeid(city.woeid);
        }} />))
      }

      <div className="DayForecast">
        {load ? <LoadingSpinner /> : <DayContainer weatherInfo={forecast} maxDays={maxDays} />}
      </div>

    </div>
  );
}

export default App;
