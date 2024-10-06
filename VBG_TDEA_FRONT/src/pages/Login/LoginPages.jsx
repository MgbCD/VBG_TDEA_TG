import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';  // Importa tu archivo CSS para estilos
import logoLogin from '../../assets/img/logoLogin.png';  // Imagen del logo
import { useMsal } from '@azure/msal-react';
import axios from 'axios';  // Importa axios para realizar las solicitudes al backend
import ProgramSelectionModal from '../../components/Modals/ProgramSelectionModal'; // Importa el modal

const LoginPage = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [userData, setUserData] = useState(null); // Almacenar datos del usuario

  // Función para manejar el login
  const handleLogin = async () => {
    const loginRequest = {
      scopes: ["openid", "profile"]
    };

    try {
      const response = await instance.loginPopup(loginRequest);

      const email = response.account.username; 
      const username = response.account.name;   
      const roleId = email.endsWith('@correo.tdea.edu.co') ? 'student' : 'profesor'; 

      // Guardar al usuario con el programa como null
      const userData = {
        email: email,
        username: username,
        roleId: roleId,
        program: null,  // Establecer el campo program como null
      }; 

      console.log('Datos del usuario antes de guardar:', userData);  // Verificar los datos a enviar

      setUserData(userData);

      // Guardar o actualizar el usuario en MongoDB
      await axios.post('http://localhost:3000/api/user/saveUser', userData);

      // Verificar si es el primer inicio de sesión
      const checkFirstLoginResponse = await axios.get(`http://localhost:3000/api/user/checkFirstLogin?email=${email}`);
      if (checkFirstLoginResponse.data.firstLogin && roleId === 'student') {
        setShowModal(true);  // Mostrar el modal si es el primer inicio de sesión
      } else {
        setIsAuthenticated(true);
        navigate('/home'); // Redirigir al home si no es primer inicio de sesión
      }

    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
    }
  };

  // Función para manejar la selección y el guardado del programa
  const handleProgramSave = async (program) => {
    // Actualiza userData con el programa seleccionado
    setUserData((prevData) => ({
      ...prevData,
      program: program,
    }));

    // Guarda el programa en el backend
    await axios.post('http://localhost:3000/api/user/updateProgram', {
      email: userData.email,
      program: program,
    });

    setIsAuthenticated(true);
    navigate('/home'); // Redirigir al home después de guardar el programa
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
          onSave={handleProgramSave} // Pasa la función para guardar el programa
        />
      )}
    </div>
  );
};

export default LoginPage;
