import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom'; 
import logoLogin from '../../utils/img/logoLogin.png';
import LoginButton from '../../components/Login/LoginButton';
import '../../../src/pages/Login/LoginStyle.css';
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
    <div className='container'>
      <div className="header">
        <div className="logo-login">
          <img src={logoLogin} alt="Logo" style={{ height: 80 }} />
        </div>
      </div>
      <div className="modal-body">
        <h2 className="Welcome-message">Bienvenid@ al sistema de gestión de casos de violencia basada en género</h2>
        <LoginButton onLogin={handleLogin} /> {}
      </div>
    </div>
  );
};

export default Login;