import Container from "../container/container"
import logo from '../../assets/logo.svg'

function Header () {


    return (
        <>
    <header>
            <Container>
                <a href="">
                    <img src={logo} alt="" />
                </a>
        <h1>hjkl</h1>
                <ul>
                    <li><a href="">Who we are</a></li>
                    <li><a href="">Contacts</a></li>
                    <li><a href="">Menu</a></li>
                </ul>
            </Container>

    </header>

        </>
    )
}

export default Header