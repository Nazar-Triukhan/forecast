import Container from "../container/Container"
import style from './Hero.module.css'
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { WeatherContext } from "../../WeatherContext";

function Hero () {

    const now = new Date()

    const monthName = now.toLocaleDateString('en-US', { month: 'long' });
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    const year = now.getFullYear();
    const dayNumber = now.getDate();

    const {inputText} = useContext(WeatherContext)

    function hendelText (e) {
        e.preventDefault()
        const text = e.currentTarget.elements.weather.value
        if(text !== ''){
        inputText(text)
        e.currentTarget.elements.weather.value = ''
        }

    }

    return (
        <section className={style.hero}>
            <Container >
                <h1 className={style.title}>Weather dashboard</h1>
                <div className={style.wrap}>
                    <div>
                        <p className={style.text}>Create your personal list of favorite cities and always be aware of the weather.</p>
                    </div>
                    {/* <span className={style.data_list}></span> */}
                    <div >
                        <p className={style.data}>{monthName} {year}</p>
                        <p className={style.data}>{dayOfWeek} , {dayNumber} </p> 
                        {/* <sub className={style.data_sub}>th</sub> */}
                    </div>
                </div>


                <form className={style.form} onSubmit={hendelText}>
                    <input className={style.input} type="text" name="weather" placeholder="Search location..."/>
                    <button className={style.search} type="submit"><FaSearch className={style.icon}/></button>
                </form>
                
               
                

            </Container>
        </section>

    )
}

export default Hero