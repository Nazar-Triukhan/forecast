import { useState, useContext } from 'react'
import './App.css'
import Header from './Components/Header/Header.jsx'
import Hero from './Components/Hero/Hero.jsx'
import Modal from './Components/Modal/Modal'
import Footer from './Components/Footer/Footer'
import Slider from './Components/Slider/Slider'
import News from './Components/News/News'
import Favorites from './Components/Favorites/Favorites'
import { WeatherContext } from './WeatherContext'
import WeatherDetails from './Components/WeatherDetails/WeatherDetails'
import WeatherTable from './Components/WeatherTable/WeatherTable'
import InfoWeather from './Components/InfoWeather/InfoWeather'

function App() {

    const {carts, details, cityTable, cityDays,  hendelNull} = useContext(WeatherContext)

    const [modal, setModal] = useState(false)
    const [name , setName] = useState('')

    function openModal () {
      setModal(true)
    }

    function closeModal () {
      setModal(false)
    }

    function userName (name) {
      setName(name)
    }

    if(carts.length === 0 ) {
       hendelNull()
    }
 
  return (
    <>
    <Modal modal={modal} closeModal={closeModal} userName={userName}/>
    <Header openModal={openModal} name={name}/>
    <Hero />
    {carts.length >= 1? <Favorites />: ''}
    {details && carts.length > 0? <WeatherDetails /> : null}
    {cityTable && carts.length > 0? <WeatherTable />: null}
    {cityDays && carts.length > 0? <InfoWeather />: null}
    <News /> 
    <Slider />
    <Footer />



    
    </>
  )
}

export default App
