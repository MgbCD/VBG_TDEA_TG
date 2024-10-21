import React, { useState } from 'react';
import './TicketDetails.css';
import EditTicketForm from './EditTicketForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faPlay } from '@fortawesome/free-solid-svg-icons';
import AddPersonModal from './AddPersonModal'; // Modal para agregar persona implicada

const TicketDetails = ({ ticket, onClose, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [option, setOption] = useState('');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ticket.filePath;
    link.download = ticket.title;
    link.click();
  };

  const handleUpdate = async (formData) => {
    await onEdit(formData);
    setIsEditing(false);
  };

  const handleArchive = () => {
    setIsNoteModalOpen(true);
  };

  const handleRouteStart = () => {
    setIsRouteModalOpen(true);
  };

  const handleAddPerson = () => {
    setIsAddPersonModalOpen(true);
  };

  const handleNoteSubmit = async () => {
  };

  return (
    <div className="details-modal">
      <div className="details-modal-content">
        <span className="details-close" onClick={onClose}>&times;</span>

        <div className="detail-action">
          <button className="icon-button edit" onClick={() => setIsEditing(true)}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="icon-button delete" onClick={() => onDelete(ticket.id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>

        {isEditing ? (
          <EditTicketForm ticket={ticket} onClose={() => setIsEditing(false)} onUpdate={handleUpdate} />
        ) : (
          <>
            <h2>{ticket.title}</h2>
            <p><strong>Descripción:</strong> {ticket.description}</p>
            <p><strong>Creado por:</strong> {ticket.createdBy?.username || 'Desconocido'}</p>
            <p><strong>Fecha de creación:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</p>
            {ticket.filePath && (
              <button className="details-download" onClick={handleDownload}>
                <i className="fas fa-download"></i> Descargar imagen adjunta
              </button>
            )}
            
            <div className="details-ticket-buttons"> 
              <button className="start-route-button" onClick={handleRouteStart}>
                <FontAwesomeIcon icon={faPlay} /> Iniciar Ruta VBG TdeA
              </button>
              <button className="archive-ticket-button" onClick={handleArchive}>
                <FontAwesomeIcon icon={faFolderOpen} /> Archivar Ticket
              </button>
            </div>
          </>
        )}
      </div>

   
      {isNoteModalOpen && (
        <div className="note-modal">
          <div className="note-modal-content">
            <span className="note-close" onClick={() => setIsNoteModalOpen(false)}>&times;</span>
            <h3>Agregar nota para archivar ticket</h3>
            <textarea 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              placeholder="Escribe tu nota aquí..." 
            />
            <button className="submit-note-button" onClick={handleNoteSubmit}>
              Guardar Nota
            </button>
          </div>
        </div>
      )}

{isRouteModalOpen && (
  <div className="route-modal">
    <div className="route-modal-content">
      <span className="route-close" onClick={() => setIsRouteModalOpen(false)}>&times;</span>
      <h3>Iniciar Ruta VBG TdeA</h3>
      <select onChange={(e) => setOption(e.target.value)}>
        <option value="">Selecciona una opción</option>
        <option value="Acciones">Acciones</option>
        <option value="Seguimiento">Seguimiento</option>
      </select>
      <textarea 
        value={note} 
        onChange={(e) => setNote(e.target.value)} 
        placeholder="Escribe tu nota aquí..." 
      />
      <button onClick={handleAddPerson}>Agregar Persona Implicada</button>
      <button onClick={() => setIsRouteModalOpen(false)}>Iniciar</button>
    </div>
  </div>
)}


{isAddPersonModalOpen && (
  <AddPersonModal onClose={() => setIsAddPersonModalOpen(false)} />
)}
    </div>
  );
};

export default TicketDetails;
