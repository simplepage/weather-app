import { useState, useEffect } from 'react';
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
let key = "f68eeead0451edeb88050ccabb0c61c2";
const App = () => {

  const [city, setCity] = useState("");
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    if (city.length < 3) { return }
    else {
      setLoading(true);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`).then((res) => {
        return res.json();
      }).then((data) => {
        if (data.cod == "404") {
          setValue(undefined);
        }
        else {
          // console.log(data);
          setValue(data);
        }
        setLoading(false);
      }
      )
    }
    setCity("");
  }

  const [toggle, setToggle] = useState(() => {
    let newToggle = localStorage.getItem("react");
    if (!newToggle) {
      return false;
    }
    else {
      return JSON.parse(newToggle);
    }
  });

  useEffect(() => {
    localStorage.setItem("react", JSON.stringify(toggle));
  }, [toggle]);

  return (
    <div className={`main ${toggle ? "m1" : ""}`}>
      <div className={`toggle ${toggle ? "x2" : ""}`} onClick={() => setToggle(!toggle)}>
        <div className={`toggle1 ${toggle ? "x1" : ""}`}></div>
      </div>
      <p className="heading">Weather App</p>
      <div className="p1">

        <div className="box1">
          <form>
            <input type="search" value={city} name="uname" onChange={(event) => setCity(event.target.value)} placeholder="Enter City Name..."/>
            <input type="submit" value="Search" onClick={handleClick} />
          </form>
        </div>
        <div className="loader">
          {loading ? <img src="./images/loader.gif" alt="Broken Image" /> : ""}
        </div>
        {value !== undefined ? <>
          <div className="box2">
            <div className="weather-image">
              <img src={`http://openweathermap.org/img/w/${value.weather[0].icon}.png`} alt={value.weather[0].description} />
            </div>
            <div className="weather-image">
              <p className="weather-text">{value.weather[0].main}</p>
            </div>
          </div>
          <div className="box3">
            <p>{value.name}</p>
            <p>{value.sys.country}</p>
          </div>
          <div className="box4">
            <p>Temperature: {Math.floor(value.main.temp)} <span className="maxtemp"><sup>o</sup>C</span></p>
            <p className="mtemp"><span className="sp1">Max-temp: {Math.floor(value.main.temp_max)} <span className="mintemp"><sup>o</sup>C</span></span> &nbsp;<span className="sp1">Min-temp: {Math.floor(value.main.temp_min)} <span className="mintemp"><sup>o</sup>C</span></span></p>
          </div>
          <div className="box5">
            <div className="humidity">
              <div className="child"><WiHumidity className="image1" /></div>
              <div className="child1"><p className="sp2">{value.main.humidity} %</p><p className="sp2">Humidity</p></div>
            </div>
            <div className="humidity">
              <div className="child"><LuWind className="image2" /></div>&nbsp;
              <div className="child1"><p className="sp2">{value.wind.speed} km/h</p><p className="sp2">Wind</p></div>
            </div>
          </div>
        </> : <p className="data">Data not found</p>}
      </div>
    </div>
  );
};
export default App;



