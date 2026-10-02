import logo from "../../assets/logo.svg";
import Container from "../container/Container";
import style from './Footer.module.css'

function Footer() {
  return (
    <footer className={style.footer}>
      <Container>
        <a href="">
          <img src={logo} alt="" />
        </a>
      </Container>
    </footer>
  );
}

export default Footer;
