import React, { useState, useEffect } from "react"; 
import logo from "../../assets/img/logoLogin.png";
import './Navbar.css';
import { MenuData } from "./MenuData";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { logout, userRole } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [clicked, setClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(true); 

    const handleClick = () => {
        setClicked(!clicked);
    };

   
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false); 
            } else {
                setIsVisible(true); 
            }
            lastScrollY = window.scrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`NavbarItems ${isVisible ? '' : 'hidden'}`}> 
            <a href="/home">
                <img src={logo} alt="Logo" style={{ height: '50px' }} />
            </a>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"} style={{ listStyleType: 'none', padding: 0 }}>
                {MenuData.map((item, index) => {
                    if (item.title === 'En proceso' && userRole !== 'admin') {
                        return null;
                    }
                    if (item.title === 'Dashboard' && userRole !== 'admin') {
                        return null;
                    }
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
