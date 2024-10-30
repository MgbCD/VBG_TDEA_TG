import React, { useState } from 'react';
import './ManageTicketModal.css'; 
import AddPersonModal from './AddPersonModal'; // Ensure you have this component

const ManageTicketModal = ({ onClose, ticketId, createdBy }) => {
  const [note, setNote] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);

  const actions = ['Acción 1', 'Acción 2', 'Acción 3']; // Replace with real actions

  const handleSave = async () => {
    console.log('Nota:', note);
    console.log('Acción seleccionada:', selectedAction);
    
    // Logic to save the note and action
    onClose();
  };

  const handleAddPerson = () => {
    setIsAddPersonModalOpen(true);
  };

  return (
    <div className="manage-overlay">
      <div className="manage-modal">
        <span className="manage-close" onClick={onClose}>&times;</span>
        <h2>Gestionar Ticket</h2>
        
        <div className="manage-form-group">
          <label htmlFor="actionSelect">Seleccionar Acción:</label>
          <select
            id="actionSelect"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="">Seleccione una acción</option>
            {actions.map((action, index) => (
              <option key={index} value={action}>{action}</option>
            ))}
          </select>
        </div>

        <div className="manage-form-group">
          <label htmlFor="note">Nota:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Escribe tu nota aquí..."
          />
        </div>

        <button className="manage-save-button" onClick={handleSave}>Guardar</button>
        <button className="manage-add-person-button" onClick={handleAddPerson}>Agregar Persona Implicada</button>

        {/* Add the add person modal here */}
        {isAddPersonModalOpen && (
          <AddPersonModal
            onClose={() => setIsAddPersonModalOpen(false)}
            ticketId={ticketId}
            createdBy={createdBy}
          />
        )}
      </div>
    </div>
  );
};

export default ManageTicketModal;
