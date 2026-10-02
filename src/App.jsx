import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header.jsx'
import Hero from './Components/Hero/Hero.jsx'
import Modal from './Components/Modal/Modal'
import Footer from './Components/Footer/Footer'

function App() {

    const [modal, setModal] = useState(false)
    const [name , setName] = useState('')

    function openModal () {
      setModal(true)
    }

    function closeModal () {
      console.log('sdfghjkl;')
      setModal(false)
    }

    function userName (name) {
      setName(name)
    }




  return (
    <>
    <Modal modal={modal} closeModal={closeModal} userName={userName}/>
    <Header openModal={openModal} name={name}/>
    <Hero />
    <Footer />


    
    </>
  )
}

export default App
