const API_KEY = 'e069cfa88f95ec69c83ecc15074225db'

export default function apiWeather (city ) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then(res => res.json())
}