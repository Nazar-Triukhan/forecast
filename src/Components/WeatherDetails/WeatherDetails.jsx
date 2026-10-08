import Container from "../container/Container"
import { useContext } from "react"
import { WeatherContext } from "../../WeatherContext"
import temperatura from '../../assets/temperatura.svg'
import droplets from '../../assets/droplets.svg'
import gauge from '../../assets/gauge.svg'
import wind from '../../assets/wind.svg'
import visibility from '../../assets/visibility.svg'
import style from './WeatherDetails.module.css'

function WeatherDetails () {

    const {details} = useContext(WeatherContext)

    console.log(details)

    return (
        <section className={style.details} id="details">
            <Container>
                <ul className={style.list}>
                    <li className={style.item}>
                        <p>Feels like</p>
                        <h3 className={style.title}>{details.main.feels_like}c</h3>
                        <img className={style.icon} src={temperatura} alt="" />
                    </li>
                    <li className={style.item}>
                        <p>Min ℃</p>
                        <h3 className={style.title}>{details.main.temp_max}</h3>
                        <p>Max ℃</p>
                        <h3 className={style.title}>{details.main.temp_min}</h3>
                    </li>
                    <li className={style.item}>
                        <p>Humidity</p>
                        <h3 className={style.title}>{details.main.humidity}%</h3>
                        <img className={style.icon} src={droplets} alt="" />
                    </li>
                    <li className={style.item}>
                        <p>Pressure</p>
                        <h3 className={style.title}>{details.main.pressure} Pa</h3>
                        <img className={style.icon} src={gauge} alt="" />
                    </li>
                    <li className={style.item}>
                        <p>Wind speed</p>
                        <h3 className={style.title}>{details.main.temp} m/s</h3>
                        <img className={style.icon} src={wind} alt="" />
                    </li>
                    <li className={style.item}>
                        <p>Visibility</p>
                        <h3 className={style.title}>{details.visibility === 10000? 'Unlimited': 'Limited'}</h3>
                        <img className={style.icon} src={visibility} alt="" />
                    </li>
                </ul>
            </Container>
        </section>
    )
}

export default WeatherDetails