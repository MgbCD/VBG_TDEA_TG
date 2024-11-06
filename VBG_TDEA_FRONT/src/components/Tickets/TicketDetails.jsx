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
  const [ticketActions, setTicketActions] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    setCurrentTicket(ticket);
    fetchTicketStatuses();
    fetchTicketActions();
  }, [ticket]);

  const fetchTicketActions = async () => {
    try {
      const response = await axiosInstance.get('/api/ticket-action/getTicketActions');
      setTicketActions(response.data);
    } catch (error) {
      toast.error('Error al cargar las acciones de ticket.');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await axiosInstance.put('/api/ticket/updateTicket', data);
      toast.success('¡Ticket actualizado exitosamente!');
      setCurrentTicket(prev => ({ ...prev, ...data }));
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar el ticket.');
    }
  };

  const fetchTicketStatuses = async () => {
    try {
      const response = await axiosInstance.get('/api/ticket-status/getTicketStatus');
      setTicketStatuses(response.data);
    } catch (error) {
      toast.error('Error al cargar los estados de ticket.');
    }
  };

  const updateTicketStatus = async (statusId) => {
    try {
      const response = await axiosInstance.put('/api/ticket/updateTicketStatus', {
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

  const getActionIdByName = (actionName) => {
    const action = ticketActions.find(action => action.action === actionName);
    return action ? action._id : null;
  };

  const getStatusIdByName = (statusName) => {
    const status = ticketStatuses.find(status => status.status === statusName);
    return status ? status._id : null;
  };

  const handleStartRoute = async () => {
    try {
      const statusName = 'En proceso';
      const inProgressStatusId = getStatusIdByName(statusName);

      await updateTicketStatus(inProgressStatusId);

      const actionName = 'Activar Ruta';
      const activateRouteActionId = getActionIdByName(actionName);

      if (!activateRouteActionId) {
        throw new Error('No se encontró la acción "Activar Ruta". Verifica que el nombre es correcto en la base de datos.');
      }

      const historicoData = {
        ticketId: currentTicket._id,
        actionTaken: activateRouteActionId,
        notes: note,
      };
      await axiosInstance.post('/api/historico/saveHistorico', historicoData);
      toast.success('¡Ruta activada y ticket actualizado a "En proceso" exitosamente!');
      window.location.reload();
      setIsRouteModalOpen(false);
      setNote('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al activar la ruta.');
    }
  };

  const handleNoteSubmit = async () => {
    try {
      const statusName = "Archivado";
      const archivedStatusId = getStatusIdByName(statusName);
      await updateTicketStatus(archivedStatusId);

      const actionName = "Archivar";
      const archivedActionId = getActionIdByName(actionName);

      console.log(archivedActionId);

      if (!archivedActionId) {
        throw new Error('No se encontró la acción "Archivar". Verifica que el nombre es correcto en la base de datos.');
      }

      const historicoData = {
        ticketId: currentTicket._id,
        actionTaken: archivedActionId,
        notes: note,
      };
      await axiosInstance.post('/api/historico/saveHistorico', historicoData);
      toast.success('¡Nota guardada y ticket archivado exitosamente!');
      window.location.reload();
      setIsNoteModalOpen(false);
      setNote('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al archivar el ticket.');
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('/api/ticket/deleteTicket', {
        data: { ticketId: ticket._id }
      });
      toast.success('¡Ticket eliminado exitosamente!');
      onDelete();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al eliminar el ticket.');
    }
  };

  const handleAddPerson = () => {
    setIsAddPersonModalOpen(true);
  };

  const handleDownload = async (filePath) => {
    const fileName = filePath.split('/').pop();
    const fullPath = `${process.env.REACT_APP_API_BASE_URL}/api/ticket/download/${fileName.replace(/\\/g, '/')}`;

    try {
      const response = await fetch(fullPath);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Archivo no disponible');
      }
    } catch (error) {
      console.error('Error al descargar:', error);
      toast.error('El archivo no se encuentra disponible.');
    }
  };

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
          </>
        )}
        {currentTicket.filePath && (
          <button className="details-download" onClick={() => handleDownload(currentTicket.filePath)}>
            <i className="fas fa-download"></i> Descargar imagen/archivo adjunto
          </button>
        )}
        <div className="details-ticket-buttons">
          {userRole === 'admin' && currentTicket.statusId?.status === 'Creado' && (
            <>
              <button className="start-route-button" onClick={() => setIsRouteModalOpen(true)}>
                <FontAwesomeIcon icon={faPlay} /> Iniciar Ruta VBG TdeA
              </button>
              <button className="archive-ticket-button" onClick={() => setIsNoteModalOpen(true)}>
                <FontAwesomeIcon icon={faFolderOpen} /> Archivar Ticket
              </button>
            </>
          )}
        </div>
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
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Escribe tu nota aquí..."
            />
            <button className="route-modal-start" onClick={handleStartRoute}>
              Iniciar
            </button>
            <button className="route-modal-button" onClick={handleAddPerson}>
              Agregar Persona Implicada
            </button>
          </div>
        </div>
      )}

      {isAddPersonModalOpen && (
        <AddPersonModal
          onClose={() => setIsAddPersonModalOpen(false)}
          ticketId={ticket._id}
        />
      )}
    </div>
  );
};

export default TicketDetails;
