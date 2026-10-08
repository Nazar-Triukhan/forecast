import { createContext, useEffect, useState } from "react";
import apiWeather from "./api/weather";
import { LiaSeedlingSolid } from "react-icons/lia";
export const WeatherContext = createContext(null);

function WeatherProvider({ children }) {
  const [text, setText] = useState("");
  const [carts, setCarts] = useState([]);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState(null)
  const [cityTable, setCityTable] = useState('')



  useEffect(() => {
    if (text.trim() === "") return;

    if (text !== "") {
      const dublicat = carts.some(
        (item) => item.cityName.toLowerCase() === text.toLowerCase(),
      );

      if (dublicat) {
        setText("");
      } else {
        apiWeather(text).then((res) => {
        if (res.cod === 200) {
          setCity(res);
        } else {
          setError(true);
        }
      });
      }

      
    }
  }, [text]);

  function hendelDelete(e) {
    setCarts(carts.filter((item) => item.id !== e.currentTarget.id));
  }


  function getInfoCity(city) {
    const cityName = city.name;
    const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
      city.sys.country,
    );
    const localDate = new Date((city.dt + city.timezone) * 1000);
    const hours = String(localDate.getUTCHours()).padStart(2, "0");
    const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`; // "14:00"

    const day = String(localDate.getUTCDate()).padStart(2, "0");
    const monthNumber = String(localDate.getUTCMonth() + 1).padStart(2, "0");
    const year = localDate.getUTCFullYear();
    const dayOfWeek = localDate.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    });
    const celius = Math.round(city.main.temp);
    const iconCode = city.weather[0].icon;

    const id = cityName 

    return {
      cityName,
      countryName,
      localDate,
      hours,
      minutes,
      time,
      day,
      monthNumber,
      year,
      dayOfWeek,
      celius,
      iconCode,
      id,
    };
  }

  if (city !== null) {
    setCarts((prev) => {
      if (prev.length >= 1) {
        setCarts([getInfoCity(city), ...prev]);
      } else {
        setCarts([getInfoCity(city)]);
      }
    });

    setCity(null);
  }

  function inputText(textHero) {
    setText(textHero);
  }

  function hendelDetails (data) {
    setDetails(data)
  }

  function hendelTable (city) {
    setCityTable(city)
  }

  





  return (
    <WeatherContext.Provider value={{ inputText, carts, hendelDelete , hendelDetails, details, hendelTable , cityTable}}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherProvider;
