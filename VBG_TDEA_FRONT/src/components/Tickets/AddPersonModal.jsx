import React, { useState } from 'react';
import './AddPersonModal.css';
import useAxios from '../../services/axiosConfig';
import { toast } from 'react-toastify';

const AddPersonModal = ({ onClose, ticketId, createdBy }) => {
  const [denouncedName, setDenouncedName] = useState('');
  const [denouncedId, setDenouncedId] = useState('');
  const [denouncedPhone, setDenouncedPhone] = useState('');
  const [denouncedEmail, setDenouncedEmail] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const axiosInstance = useAxios();

  const handleSubmit = async () => {
    // Verificar si denouncedName y denouncedId están completos
    if (!denouncedName || !denouncedId) {
      toast.error('Nombre y Cédula son campos obligatorios.');
      return;
    }

    const data = {
      ticketId,
      denouncedName,
      denouncedId,
      denouncedPhone,
      denouncedEmail,
      additionalInfo,
      createdBy,
    };

    try {
      await axiosInstance.post('/api/denounced-register/saveDenouncedRegister', data);
      toast.success('¡Persona implicada agregada exitosamente!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al agregar la persona implicada.');
    }
  };

  return (
    <div className="add-person-modal">
      <div className="add-person-modal-content">
        <span className="add-person-close" onClick={onClose}>&times;</span>
        <h3>Agregar Persona Implicada</h3>
        <input 
          type="text" 
          className="add-person-input" 
          value={denouncedName} 
          onChange={(e) => setDenouncedName(e.target.value)} 
          placeholder="Nombre de la persona" 
        />
        <input 
          type="text" 
          className="add-person-input" 
          value={denouncedId} 
          onChange={(e) => setDenouncedId(e.target.value)} 
          placeholder="Cédula de la persona" 
        />
        <input 
          type="text" 
          className="add-person-input" 
          value={denouncedPhone} 
          onChange={(e) => setDenouncedPhone(e.target.value)} 
          placeholder="Teléfono" 
        />
        <input 
          type="email" 
          className="add-person-input" 
          value={denouncedEmail} 
          onChange={(e) => setDenouncedEmail(e.target.value)} 
          placeholder="Email" 
        />
        <textarea 
          className="add-person-textarea" 
          value={additionalInfo} 
          onChange={(e) => setAdditionalInfo(e.target.value)} 
          placeholder="Información adicional" 
        />
        <button className="add-person-button" onClick={handleSubmit}>Agregar Persona</button>
      </div>
    </div>
  );
};

export default AddPersonModal;
