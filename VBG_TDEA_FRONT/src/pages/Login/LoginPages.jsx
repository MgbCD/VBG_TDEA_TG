import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import logoLogin from '../../assets/img/logoLogin.png';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import ProgramSelectionModal from '../../components/Modals/ProgramSelectionModal';
import RoleSelectionModal from '../../components/Modals/RoleSelectionModal'; // Importa el nuevo modal

const LoginPage = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"]
    };

    try {
      const response = await instance.loginPopup(loginRequest);

      const email = response.account.username;
      const username = response.account.name;
      const roleId = email.endsWith('@correo.tdea.edu.co') ? 'student' : 'other';
      const identityId = response.account.localAccountId;

      const tokenResponse = await instance.acquireTokenSilent({
        scopes: ["openid", "profile"],
        account: response.account
      });
      const idToken = tokenResponse.idToken;
      localStorage.removeItem('token');
      localStorage.setItem('token', idToken);

      const userData = {
        email: email,
        username: username,
        token: idToken,
        roleId: roleId,
        program: null,
        identityId: identityId,
      };

      console.log('Datos del usuario y token:', userData);
      setUserData(userData);

      await axios.post('http://localhost:3000/api/user/saveUser', userData, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      const checkFirstLoginResponse = await axios.get(`http://localhost:3000/api/user/checkFirstLogin?email=${email}`, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
      if (checkFirstLoginResponse.data.firstLogin) {
        if (roleId === 'student') {
          setShowModal(true);
        } else {
          setShowRoleModal(true);
        }
      } else {
        setIsAuthenticated(true);
        navigate('/home');
      }
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
    }
  };

  const handleProgramSave = async (program) => {
    try {
      const email = userData?.email;
      if (!email) {
        console.error("Email no encontrado en userData.");
        return;
      }
      await axios.post('http://localhost:3000/api/user/updateProgram', {
        email: email,
        program: program,
      });
      setIsAuthenticated(true);
      setShowModal(false);
      navigate('/home');
    } catch (error) {
      console.error("Error al guardar el programa:", error);
    }
  };


  const handleRoleSave = async (role) => {
    if (!userData) return;
    const userDataWithRole = { ...userData, roleId: role };
    await axios.post('http://localhost:3000/api/user/saveUser', userDataWithRole);

    setShowRoleModal(false);
    setIsAuthenticated(true);
    navigate('/home');
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

      {showModal && (
        <ProgramSelectionModal
          onClose={() => setShowModal(false)}
          onSave={handleProgramSave}
        />
      )}
      {showRoleModal && (
        <RoleSelectionModal
          onClose={() => setShowRoleModal(false)}
          onSave={handleRoleSave}
        />
      )}
    </div>
  );
};

export default LoginPage;
