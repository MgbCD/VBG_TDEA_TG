import React, { useState } from 'react';
import './TicketForm.css';

const TicketForm = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="ticket-modal">
      <div className="ticket-modal-content">
        <span className="ticket-close" onClick={onClose}>&times;</span>
        <h2>Formulario de Ticket</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <div>
            <label>Adjuntar archivo (PDF o imagen):</label>
            <input
              type="file"
              accept=".pdf, image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Guardar Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
