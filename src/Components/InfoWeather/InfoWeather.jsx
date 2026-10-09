import { useEffect, useContext, useState } from "react";
import { WeatherContext } from "../../WeatherContext";
import { apiTableWeather } from "../../api/weather";
import Container from "../container/Container";
import style from './InfoWeather.module.css'

function InfoWeather() {
  const { cityDays } = useContext(WeatherContext);


  const [arrDays, setArrDays] = useState([])


useEffect(() => {
  if (cityDays === null) return;

  apiTableWeather(cityDays)
    .then((res) => {

      const groupedByDay = res.list.reduce((acc, item) => {
        const dateKey = item.dt_txt.split(' ')[0]; // отримуємо "2026-10-13"
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
        return acc;
      }, {});

      const forecast = Object.keys(groupedByDay).map((dateKey) => {
        const dayItems = groupedByDay[dateKey];

        // Рахуємо макс. і мін. температуру за весь день
        const maxTemp = Math.round(
          Math.max(...dayItems.map((item) => item.main.temp_max))
        );
        const minTemp = Math.round(
          Math.min(...dayItems.map((item) => item.main.temp_min))
        );

        const date = new Date(dayItems[0].dt * 1000);
        const dateString = date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });

        const midIndex = Math.floor(dayItems.length / 2);
        const weather = dayItems[midIndex].weather[0];

        return {
          id: dateKey,
          dateString,                            
          tempString: `${maxTemp}/${minTemp}°C`, 
          icon: weather.icon,                    
          description: weather.description,      
        };
      });


    setArrDays(forecast);
    })
    .catch((err) => console.error("Помилка завантаження погоди:", err));
}, [cityDays]);



  return (
    <section className={style.info_days} id="info_days">
      <Container>
                    <p className={style.title}>6-day forecast</p>
        <ul className={style.list}>

            {
                arrDays.map((e) => {
                 
                    return (
            <li key={e.id} className={style.item}>
                <p className={style.day}>{e.dateString}</p>
                <div className={style.wrap}>
                    <img className={style.icon} src={`https://openweathermap.org/img/wn/${e.icon}@4x.png`} alt="" />
                    <p>{e.tempString}</p>
                </div>
                <p className={style.description}>{e.description}</p>
            </li>
                    )
                })
            }
           
        </ul>
      </Container>
    </section>
  );
}

export default InfoWeather;
