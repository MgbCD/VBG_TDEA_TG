import React, { useState } from 'react';
import './ModalStyle.css';

const RoleSelectionModal = ({ onClose, onSave }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSave = () => {
    onSave(selectedRole);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecciona tu rol</h2>
        <select value={selectedRole} onChange={handleRoleChange}>
          <option value="">Seleccionar rol</option>
          <option value="admin">Admin</option>
          <option value="professor">Profesor</option>
          <option value="staff">Personal</option>
        </select>
        <button onClick={handleSave} className="btn btn-primary">Guardar</button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
