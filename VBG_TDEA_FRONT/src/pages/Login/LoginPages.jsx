import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import logoLogin from '../../utils/img/logoLogin.png';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className='login-background'>
      <div className="outer-container">
        <div className="transparent-box top-box"></div>
        <div className="container">
          <div className="inner-box">
            { }
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

export default Login;
