// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth'; 
import ProgramSelectionModal from '../../components/Modals/ProgramSelectionModal'; 
import axios from 'axios';

const Home = () => {
  const { user } = useAuth(); 
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const checkFirstLogin = async () => {
      if (user && user.roleId === 'student') {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/checkFirstLogin?email=${user.email}`);
          if (response.data.firstLogin) {
            setShowModal(true);
          }
        } catch (error) {
          console.error("Error al verificar el primer inicio de sesión:", error);
        }
      }
    };

    checkFirstLogin();
  }, [user]);

  const handleProgramSave = async (program) => {
    try {
      await axios.post('http://localhost:3000/api/user/saveUser', { 
        email: user.email, 
        program 
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar el programa:", error);
    }
  };

  return (
    <div>
      <h1>Bienvenido {user ? user.username : 'invitado'}</h1>
      {showModal && (
        <ProgramSelectionModal
          onClose={() => setShowModal(false)}
          onSave={handleProgramSave}
        />
      )}
      {/* Resto del contenido de Home */}
    </div>
  );
};

export default Home;
