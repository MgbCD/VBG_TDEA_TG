import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './TicketForm.css';

const EditTicketForm = ({ ticket, onClose, onUpdate }) => {
    const [title, setTitle] = useState(ticket.title);
    const [description, setDescription] = useState(ticket.description);
    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('ticketId', ticket.id); // Agrega el ID del ticket
      formData.append('title', title);
      formData.append('description', description);
      if (file) {
        formData.append('file', file);
      }
  
      try {
        await onUpdate(formData);
        toast.success('¡Ticket actualizado exitosamente!');
        onClose(); // Cierra el formulario
      } catch (error) {
        console.error("Error al actualizar el ticket:", error);
        toast.error('Error al actualizar el ticket. Inténtalo de nuevo.');
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