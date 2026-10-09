import { useContext, useState } from "react"
import { WeatherContext } from "../../WeatherContext"
import Container from "../container/Container"
import { TbBackground } from "react-icons/tb"
import { GrPowerReset } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import heart from '../../assets/heart.svg'
import style from './Favorites.module.css'
import { apiDetailsWeather } from "../../api/weather";

function Favorites() {
    const [like, setLike] = useState(false)

    function hendelLike () {
        if(like) {
            setLike(false)
        } else {
            setLike(true)
        }
    }

    const {carts, hendelDelete, updateWeather, hendelDetails, hendelTable, hendelDays} = useContext(WeatherContext)

    // console.log(carts)

    async function hendelGetDetails (city) {
        const response = await apiDetailsWeather(city)
        hendelDetails(response)

        // Прокручуємо після отримання даних і появи секції details у DOM.
        requestAnimationFrame(() => {
            document.getElementById('details')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        })
    }

const scrollTo = (id) => {
    // Чекаємо, поки React намалює секцію після зміни state.
    requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
};

    
    return (
        <section className={style.Favorites}>
            <Container>
                <ul className={style.list}>
                    {
                        carts.map(({cityName,countryName,localDate, hours, minutes, time, day, monthNumber, year, dayOfWeek, celius, iconCode, id}) => {
                            return (
                                <li className={style.item} key={id}>
                                    <ul className={style.list_name}>
                                        <li><p className={style.they_elem}>{countryName}</p></li>
                                        <li><p className={style.they_elem}>{cityName}</p></li>
                                    </ul>
                                    
                                    
                                    <h3 className={style.title}>{hours}:{minutes}</h3>
                                    <ul className={style.list_btn}>
                                        <li><button className={`${style.they_elem} ${style.btn}`} type="button" onClick={() => {hendelTable(cityName), scrollTo('table')}}>Hourly forecast</button></li>
                                        <li><button className={`${style.they_elem} ${style.btn}`} type="button" onClick={() => {hendelDays(cityName), scrollTo('info_days')}}>Weekly forecast</button></li>
                                    </ul>
                                    
                                    <div className={style.list_day}>
                                        <p className={style.they_elem}>{day}.{monthNumber}.{year}</p>
                                        <p className={style.they_elem}>{dayOfWeek}</p>
                                    </div>
                                    
                                    <img className={style.icon} src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`} alt="" />
                                    <h3 className={style.celius}>{celius}C</h3>
                                    <ul className={style.list_btn_menu}>
                                        <li><button className={style.they_elem} type="button" ><GrPowerReset className={style.icon_menu}/></button></li>
                                        <li><button className={style.they_elem} type="button" onClick={hendelLike}>{like ?  <FcLike className={style.icon_menu}/>: <img src={heart} alt="" className={style.icon_menu}/>}</button></li>
                                        <li><button className={`${style.they_elem} ${style.btn} ${style.btn_more}`} type="button" onClick={() => hendelGetDetails(cityName)}>See more</button></li>
                                        <li><button className={style.they_elem} type="button" id={id} onClick={(e) => hendelDelete(e)}><FaRegTrashAlt className={style.icon_menu}/></button></li>
                                    </ul>
                                    
                                    
                                    
                                    
                                </li>
                            )
                        })
                    }
                </ul>
            </Container>
        </section>
    )
}

export default Favorites