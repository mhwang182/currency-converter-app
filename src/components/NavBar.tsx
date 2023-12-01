import logo from '../images/logo.png';
import '../sass/components/NavBar.scss';

const NavBar = () => {
    return(
        <div className="navBar">
            <div className="nav-center">
                <img src={logo}></img>
                <div className="menu-icon">Currency Converter</div>
            </div>
        </div>
    )
}

export default NavBar