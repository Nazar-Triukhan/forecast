const API_KEY = 'e069cfa88f95ec69c83ecc15074225db'

export default function apiWeather (city ) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then(res => res.json())
}

export const  apiDetailsWeather = (city) =>  {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then(res => res.json())
}

export const apiTableWeather = (city) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`).then(res => res.json())
}

// export const apiDays  = (city) =>  {
//     return fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`).then(res => res.json())
// }

// export const apiDaysFull = (lat, lon) => {
//     return fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=auto`).then(res => res.json())
// }