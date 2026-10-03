import logo from "../../assets/logo.svg";
import Container from "../container/Container";
import style from './Footer.module.css'
import insta from '../../assets/insta.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'

function Footer() {
  return (
    <footer className={style.footer}>
      <Container>
        <a href="">
          <img src={logo} alt="" />
        </a>

        <div className={style.wrap}>
        <div className={style.box_address}>
            <h3 className={style.address}>Address</h3>
             <a href="" className={style.text}>Svobody str. 35 Kyiv Ukraine</a>
        </div>

        <div className={style.box_contact}>
            <h3 className={style.title}>Contact us</h3>
            <ul className={style.list}>
                <li>
                    <a href="">
                        <img src={insta} alt="" />
                    </a>
                </li>
                <li> <a href="">
                        <img src={facebook} alt="" />
                    </a></li>
                <li> <a href="">
                        <img src={whatsapp} alt="" />
                    </a>
                </li>
            </ul>
        </div>
        </div>
       
      </Container>
    </footer>
  );
}

export default Footer;
