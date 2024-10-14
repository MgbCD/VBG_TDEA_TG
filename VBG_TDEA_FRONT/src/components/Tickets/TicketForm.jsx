import React, { useState } from 'react';
import './TicketForm.css';

const TicketForm = ({ onClose, onSubmit }) => {
  console.log('Modal abierto');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = { title, description };
    await onSubmit(newTicket);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Crear Nuevo Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Guardar Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;