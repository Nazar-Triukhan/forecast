import { useState } from "react"
import Container from "../container/Container"
import style from './Header.module.css'
import logo from '../../assets/logo.svg'
import user from '../../assets/user.png'
import { IoIosArrowForward } from "react-icons/io";


function Header ({openModal, name}) {

    const [menu, setMenu] = useState(false)

    function hendelMenu () {
        if (menu) {
            setMenu(false)
        } else {
            setMenu(true)
        }
    } 

    function clickMenu () {
        openModal()
        setMenu(false)
    }



    return (
        <>
    <header className={style.header}>
            <Container>
                <a href="">
                    <img src={logo} alt="" />
                </a>

                <ul className={style.list}>
                    <li><a href="#">Who we are</a></li>
                    <li><a href="#">Contacts</a></li>
                    <li><a href="#">Menu</a></li>
                </ul>

                {
                    name ? <p className={style.hello}>Hello , {name}</p>: <div className={style.wrap}>
                    <button className={style.button} type="button" onClick={openModal}>Sign Up</button>
                    <img src={user} alt="" className={style.user}/>
                    </div>
                }

                <button type="button" className={style.menu} onClick={hendelMenu}>menu<IoIosArrowForward className={menu ? style.arrow_open : style.arrow}/></button>
               
            </Container>
 <div className={ `${menu ? style.menu_open: style.menu_close} ${style.menu_backdrop} `}>
                    <ul className={style.menu_list}>
                    <li><a href="#">Who we are</a></li>
                    <li><a href="#">Contacts</a></li>
                    <li><a href="#">Menu</a></li>
                </ul>

                  <div className={style.menu_wrap}>
                    <img src={user} alt="" className={style.user}/>
                    <button className={style.button} type="button" onClick={clickMenu}>Sign Up</button>
                  </div>
                </div>

    </header>



        </>
    )
}

export default Header