import { createContext, useEffect, useState } from "react";
import apiWeather from "./api/weather";
export const WeatherContext = createContext(null)

function WeatherProvider ({children}) {
    const [text, setText] = useState('')
    const [carts, setCarts] = useState([])
    const [city, setCity] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {

        if(text.trim() === '' ) return

        if(text !== '' ) {
            //  apiWeather(text).then(res => setCity(res)).catch(error => console.log(error))
             apiWeather(text).then(res => {
                if(res.cod === 200) {
                    setCity(res)
                } else {
                    setError(true)
                }
             })
        }

    }, [text])
    
    
    function getInfoCity () {
            const cityName = city.name
            const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(city.sys.country);
            const localDate = new Date((city.dt + city.timezone) * 1000);
            const hours = String(localDate.getUTCHours()).padStart(2, '0');
            const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`; // "14:00"

            const day = String(localDate.getUTCDate()).padStart(2, '0');
            const monthNumber = String(localDate.getUTCMonth() + 1).padStart(2, '0');
            // const monthName = localDate.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
            const year = localDate.getUTCFullYear();
            const dayOfWeek = localDate.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
            const celius = Math.round(city.main.temp)
            const iconCode = city.weather[0].icon

            // const arrInfo =  [cityName,countryName,localDate, hours, minutes, time, day, monthNumber, year, dayOfWeek, celius, iconCode]
            return (
                {cityName,countryName,localDate, hours, minutes, time, day, monthNumber, year, dayOfWeek, celius, iconCode}
            )
        
    }
    



    if(city !== null) {
        setCarts(prev => {
            if(prev.length >= 1) {
                setCarts([...prev , getInfoCity()])
            } else {
                setCarts([getInfoCity()])
            }
        })

        setCity(null)
    }

    function inputText (textHero) {
        setText(textHero)
    }

    return (
        <WeatherContext.Provider value={{inputText, carts}}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider