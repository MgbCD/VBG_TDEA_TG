import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
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

    try {
      await onSubmit(formData);

      toast.success('¡Ticket creado exitosamente!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTitle('');
      setDescription('');
      setFile(null);

      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error("Error al crear el ticket:", error);

      toast.error('Error al crear el ticket. Inténtalo de nuevo.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="ticket-modal">
      <div className="ticket-modal-content">
        <span className="ticket-close" onClick={onClose}>&times;</span>
        <h2>Formulario de ticket</h2>
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
