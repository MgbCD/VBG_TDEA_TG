import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ProgramSelectionModal from '../../components/Modals/ProgramSelectionModal';
import RoleSelectionModal from '../../components/Modals/RoleSelectionModal';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    const checkFirstLogin = async () => {
      console.log("Usuario actual:", user);

      if (user) {
        const email = user.email || user.username;
        if (user.roleId === 'student' && !user.program) {
          setShowProgramModal(true);
        } else if (user.roleId === 'other') {
          setShowRoleModal(true);
        }
      }
    };

    checkFirstLogin();
  }, [user]);

  const handleProgramSave = async (program) => {
    try {
      await axios.post('http://localhost:3000/api/user/updateProgram', {
        email: user.email || user.username,
        program
      });
      setShowProgramModal(false);
    } catch (error) {
      console.error("Error al guardar el programa:", error);
    }
  };

  const handleRoleSave = async (role) => {
    try {
      await axios.post('http://localhost:3000/api/user/saveUser', {
        email: user.email || user.username,
        roleId: role
      });
      setShowRoleModal(false);
    } catch (error) {
      console.error("Error al guardar el rol:", error);
    }
  };

  return (
    <div>
      {showProgramModal && (
        <ProgramSelectionModal
          onClose={() => setShowProgramModal(false)}
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

export default Home;
