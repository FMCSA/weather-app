import React, {useState, useEffect} from 'react';
import CityButton from './CityButton/CityButton';
import DayContainer from "./DayContainer/DayContainer";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import CityInput from "./CityInput";
import axios from 'axios';
import './App.css';
import cityButton from './CityButton/CityButton';


const getWeekDay = (date) => {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

function App() {  
  
  const maxDays = 5;
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = "https://www.metaweather.com/api/location/";

  const [woeid, setWoeid] = useState("");
  const [city, setCity] = useState("");
  const [cities, setButtons] = useState([]);
  const [forecast, setForecast] = useState(undefined);
  const [load, setLoad] = useState(true);


  useEffect(() => {
    // Using proxy to avoid CORS error
    setLoad(true);
    axios.get(proxy + url + "search/?query=" + city)
      .then((resp) => {
        console.log(resp);

        const woeidArr = resp.data;
        setButtons(woeidArr);
        setLoad(false);
      }
    );

  }, [city]);

  useEffect(() => {
    setLoad(true);

    axios.get(proxy + url + woeid)
      .then((resp) => {
        resp.data.consolidated_weather.forEach((elem) => {
          elem.weekDay = getWeekDay(elem.applicable_date);
        });
        
        setForecast(resp.data.consolidated_weather);
        setLoad(false);
      })
      .catch((error) => {console.log("Error getting weather info: " + error)});

  }, [woeid]);

    return (
      <div>
      
        <CityInput city={city} setCity={setCity}/>
        
        {cities.map(city => 
          <CityButton key={city.woeid} city={city} onClick={() => {
            setWoeid(city.woeid);
          }}/>
        )

        }

        <div className="DayForecast">
          {load ? <LoadingSpinner /> : <DayContainer weatherInfo={forecast} maxDays={maxDays} />}
        </div>

      </div> 
    );  
}

export default App;
