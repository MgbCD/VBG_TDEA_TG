import React from "react";
import logo from "../../assets/img/logoLogin.png";
import './Navbar.css';
import { MenuData } from "./MenuData";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [clicked, setClicked] = React.useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav className="NavbarItems">
            <a href="/home">
                <img src={logo} alt="Logo" style={{ height: '50px' }} />
            </a>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"} style={{ listStyleType: 'none', padding: 0 }}>
                {MenuData.map((item, index) => {
                    if (item.title === 'Cerrar sesión') {
                        return (
                            <li key={index}>
                                <button
                                    className={item.cName}
                                    onClick={handleLogout}
                                >
                                    {item.title}
                                </button>
                            </li>
                        );
                    }
                    return (
                        <li key={index}>
                            <a href={item.url} className={item.cName}>
                                <i className={item.icon}></i>{item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
