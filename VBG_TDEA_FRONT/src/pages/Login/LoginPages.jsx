import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import logoLogin from '../../assets/img/logoLogin.png';
import { useMsal } from '@azure/msal-react';

const LoginPage = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginRequest = {
      scopes: ["openid", "profile"]
    };

    instance.loginPopup(loginRequest)
      .then(response => {
        console.log("Login response:", response); 
        navigate('/home'); 
      })
      .catch(error => {
        console.error("Error en el login:", error);  
      });
  };

  return (
    <div className='login-background'>
      <div className="outer-container">
        <div className="transparent-box top-box"></div>
        <div className="container">
          <div className="inner-box">
            <img className="logo" src={logoLogin} alt="presentation" />
            <div className="content-box">
              <p>Continuar a Outlook</p>
              <button className="LoginButton" onClick={handleLogin}>
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
        <div className="transparent-box bottom-box"></div>
      </div>
    </div>
  );
};

export default LoginPage;
