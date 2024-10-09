import { Component } from "react";
import logo from "../../assets/img/logoLogin.png";
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import './Navbar.css'
import { MenuData } from "./MenuData";

class Navbar extends Component {
    state ={clicked: false};
    handleClick =()=>{
        this.setState({clicked:
            !this.state.clicked
        })
    }
    render() {
        return (
            <nav className="NavbarItems">
                <img src={logo} alt="Logo" style={{ height: '50px' }} />
                <div className="menu-icons"
                onClick={this.handleClick}>
                    <i className= {this.state.clicked ? 
                        "fas fa-times" : "fas fa-bars"
                    }></i>
                </div>
                <ul className={this.state.clicked? "nav-menu active" :"nav-menu" }
                style={{ listStyleType: 'none', padding: 0 }}>  
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={item.url}
                                    className={item.cName}
                                >
                                    <i className={item.icon}>

                                    </i>{item.title}
                                </a>

                            </li>
                        );
                    })}

                </ul>
            </nav>
        );
    }
}

export default Navbar;
