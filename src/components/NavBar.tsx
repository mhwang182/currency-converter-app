import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import '../sass/components/NavBar.scss';

const NavBar = () => {

    const navigate = useNavigate();
    return(
        <div className="navBar">
            <div className="nav-content">
                <img src={logo}></img>
                <div className="title" onClick={()=>{navigate('/')}}>Currency Converter</div>
                <div className='menu'>Menu
                    <div className="dropdown-content">
                        <a href="/">Home</a>
                        <a href="/country-info">Country Info</a>
                        <a href="/products">Products</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar