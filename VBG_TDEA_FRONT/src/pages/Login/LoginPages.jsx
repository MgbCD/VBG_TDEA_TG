import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import logoLogin from '../../assets/img/logoLogin.png';
import { useMsal } from '@azure/msal-react';
import useAxios from '../../services/axiosConfig';
import ProgramSelectionModal from '../../components/Modals/ProgramSelectionModal';
import RoleSelectionModal from '../../components/Modals/RoleSelectionModal';
import AuthContext from '../../contexts/authContext';

const LoginPage = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const axiosInstance = useAxios();
  const { setUser, setUserRole, setUserId } = useContext(AuthContext);

  const handleLogin = async () => {
    const loginRequest = {
      scopes: ["openid", "profile", "User.Read"]
    };
    let program = null;
    try {
      const response = await instance.loginPopup(loginRequest);
      const email = response.account.username;
      const username = response.account.name;
      const identityId = response.account.localAccountId;

      const tokenResponse = await instance.acquireTokenSilent({
        scopes: ["openid", "profile"],
        account: response.account
      });

      const idToken = tokenResponse.idToken;
      localStorage.removeItem('token');
      localStorage.setItem('token', idToken);

      let roleId;
      let userId;
      let existingUserResponse;

      try {
        existingUserResponse = await axiosInstance.get(`/api/user/getUser?email=${email}`, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
        roleId = existingUserResponse.data.roleId;
        userId = existingUserResponse.data._id;
        program = existingUserResponse.data.program;
        console.log("Usuario encontrado:", existingUserResponse.data);
        const userData = existingUserResponse.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          roleId = email.endsWith('@correo.tdea.edu.co') ? 'student' : 'other';
          const newUserData = {
            identityId,
            email,
            username,
            roleId,
            program: roleId === 'student' ? "" : undefined,
          };
          await axiosInstance.post('/api/user/saveUser', newUserData, {
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          });
          console.log('Usuario creado:', newUserData);
        } else {
          console.error("Error al obtener el usuario:", error.response?.data || error.message);
          return;
        }
      }

      const userData = {
        email: email,
        username: username,
        token: idToken,
        roleId: roleId,
        program: program || null,
        identityId: identityId,
        userId: userId
      };

      console.log('Datos del usuario y token:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setUserData(userData);
      setUser(userData);
      setUserRole(userData.roleId);
      setUserId(userData.userId);

      const checkFirstLoginResponse = await axiosInstance.get(`/api/user/checkFirstLogin?email=${email}`, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      if (checkFirstLoginResponse.data.firstLogin) {
        if (roleId === 'other') {
          setShowRoleModal(true);
        } else if (roleId === 'student') {
          setShowModal(true);
        }
      } else {
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

      await axiosInstance.post('/api/user/updateProgram', {
        email: email,
        program: program,
      });

      const updatedUserData = { ...userData, program: program };

      localStorage.setItem('user', JSON.stringify(updatedUserData));

      setUserData(updatedUserData);
      setUser(updatedUserData);
      setUserRole(updatedUserData.roleId);
      setUserId(updatedUserData.userId);

      setShowModal(false);

      navigate('/home');
    } catch (error) {
      console.error("Error al guardar el programa:", error);
    }
  };

  const handleRoleSave = async (role) => {
    if (!userData) return;
    try {
      const updatedUserData = { ...userData, roleId: role };

      await axiosInstance.post('/api/user/saveUser', updatedUserData);

      localStorage.setItem('user', JSON.stringify(updatedUserData));

      setUserData(updatedUserData);
      setUser(updatedUserData);
      setUserRole(updatedUserData.roleId);
      setUserId(updatedUserData.userId);

      setShowRoleModal(false);

      navigate('/home');
    } catch (error) {
      console.error("Error al guardar el rol:", error);
    }
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
