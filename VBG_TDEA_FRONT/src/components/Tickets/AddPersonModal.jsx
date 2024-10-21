import React, { useState } from 'react';
import './AddPersonModal.css';

const AddPersonModal = ({ onClose }) => {
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Cédula:', id, 'Descripción:', description);
    onClose(); // Cierra el modal después de agregar la persona
  };

  return (
    <div className="add-person-modal">
      <div className="add-person-modal-content">
        <span className="add-person-close" onClick={onClose}>&times;</span>
        <h3>Agregar Persona Implicada</h3>
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="Cédula de la persona" 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Descripción del caso" 
        />
        <button onClick={handleSubmit}>Agregar Persona</button>
      </div>
    </div>
  );
};

export default AddPersonModal;
