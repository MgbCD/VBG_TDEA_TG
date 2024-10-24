import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TicketForm.css';
import TicketDetails from './TicketDetails';

const EditTicketForm = ({ ticket, onClose, onUpdate }) => {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    setTitle(ticket.title);
    setDescription(ticket.description);
    setAttachments(ticket.filePath ? [ticket.filePath] : []);
  }, [ticket]);

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ticketId: ticket._id,
      title,
      description,
      attachments,
    };

    try {
      await onUpdate(requestData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el ticket:", error);
    }
  };


  return (
    <div className="ticket-modal">
      <div className="ticket-modal-content">
        <span className="ticket-close" onClick={onClose}>&times;</span>
        <h2>Editar Ticket</h2>
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
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditTicketForm;
