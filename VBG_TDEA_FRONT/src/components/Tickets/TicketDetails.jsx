import React, { useState, useEffect } from 'react';
import './TicketDetails.css';
import EditTicketForm from './EditTicketForm';
import AddPersonModal from './AddPersonModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../services/axiosConfig';
import { toast } from 'react-toastify';

const TicketDetails = ({ ticket, onClose, onDelete }) => {
  const { userRole, userId } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [note, setNote] = useState('');
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const [ticketStatuses, setTicketStatuses] = useState([]);
  const [option, setOption] = useState('');
  const axiosInstance = useAxios();

  useEffect(() => {
    setCurrentTicket(ticket);
  }, [ticket]);

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.put('http://localhost:3000/api/ticket/updateTicket', data);
      toast.success('¡Ticket actualizado exitosamente!');
      setCurrentTicket(prev => ({ ...prev, ...data }));
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar el ticket.');
    }
  };

  const fetchTicketStatuses = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:3000/api/ticket-status/getTicketStatus');
      setTicketStatuses(response.data);
    } catch (error) {
      toast.error('Error al cargar los estados de ticket.');
    }
  };

  const updateTicketStatus = async (statusId) => {
    try {
      const response = await axiosInstance.put('http://localhost:3000/api/ticket/updateTicketStatus', {
        ticketId: currentTicket._id,
        statusId,
      });
      toast.success('¡Estado del ticket actualizado exitosamente!');
      setCurrentTicket(response.data.ticket);
      setIsRouteModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar el estado del ticket.');
    }
  };

  const handleOptionChange = (e) => {
    const selectedStatusId = e.target.value;
    setOption(selectedStatusId);
    if (selectedStatusId) {
      updateTicketStatus(selectedStatusId);
    }
  };

  const handleRouteStart = () => {
    fetchTicketStatuses();
    setIsRouteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('http://localhost:3000/api/ticket/deleteTicket', {
        data: { ticketId: ticket._id }
      });
      toast.success('¡Ticket eliminado exitosamente!');
      onDelete();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar el ticket.');
    }
  };

  const handleNoteSubmit = () => {
    setIsNoteModalOpen(false);
    setNote('');
  };

  const handleAddPerson = () => {
    setIsAddPersonModalOpen(true);
  };

  if (!currentTicket) {
    return <div>Error: Ticket no encontrado.</div>;
  }

  return (
    <div className="details-modal">
      <div className="details-modal-content">
        <span className="details-close" onClick={onClose}>&times;</span>

        <div className="detail-action">
          {userRole !== 'admin' && currentTicket.statusId?.status === 'Creado' && (
            <>
              <button className="icon-button edit" onClick={() => setIsEditing(true)}>
                <i className="fas fa-edit"></i>
              </button>
              <button className="icon-button delete" onClick={handleDelete}>
                <i className="fas fa-trash"></i>
              </button>
            </>
          )}
        </div>

        {isEditing ? (
          <EditTicketForm
            ticket={currentTicket}
            onClose={() => setIsEditing(false)}
            onUpdate={handleUpdate}
          />
        ) : (
          <>
            <h2>{currentTicket.title}</h2>
            <p><strong>Descripción:</strong> {currentTicket.description}</p>
            <p><strong>Creado por:</strong> {currentTicket.createdBy?.username || 'Desconocido'}</p>
            <p><strong>Fecha de creación:</strong> {new Date(currentTicket.createdAt).toLocaleDateString()}</p>
            {currentTicket.filePath && (
              <button className="details-download" onClick={() => handleDownload(currentTicket.filePath)}>
                <i className="fas fa-download"></i> Descargar imagen adjunta
              </button>
            )}

            <div className="details-ticket-buttons">
              {userRole === 'admin' && currentTicket.statusId?.status === 'Creado' && (
                <>
                  <button className="start-route-button" onClick={handleRouteStart}>
                    <FontAwesomeIcon icon={faPlay} /> Iniciar Ruta VBG TdeA
                  </button>
                  <button className="archive-ticket-button" onClick={() => setIsNoteModalOpen(true)}>
                    <FontAwesomeIcon icon={faFolderOpen} /> Archivar Ticket
                  </button>
                </>
              )}
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
            <select onChange={handleOptionChange} value={option}>
              <option value="">Selecciona un estado</option>
              {ticketStatuses.map((status) => (
                <option key={status._id} value={status._id}>
                  {status.status}
                </option>
              ))}
            </select>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe tu nota aquí..."
            />
            <button onClick={handleAddPerson}>Agregar Persona Implicada</button>
            <button onClick={() => setIsRouteModalOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {isAddPersonModalOpen && (
        <AddPersonModal
          onClose={() => setIsAddPersonModalOpen(false)}
          ticketId={ticket._id}
          createdBy={userId}
        />
      )}
    </div>
  );
};

export default TicketDetails;
