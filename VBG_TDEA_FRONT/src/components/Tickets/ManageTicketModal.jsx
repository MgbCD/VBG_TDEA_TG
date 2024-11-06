import React, { useState, useEffect } from 'react';
import './ManageTicketModal.css'; 
import AddPersonModal from './AddPersonModal';
import useAxios from '../../services/axiosConfig';

const ManageTicketModal = ({ onClose, ticketId, createdBy }) => {
  const [note, setNote] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [isAddPersonModalOpen, setIsAddPersonModalOpen] = useState(false);
  const [actions, setActions] = useState([]);
  const [usedActionIds, setUsedActionIds] = useState([]);
  const [ticketStatuses, setTicketStatuses] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axiosInstance.get('/api/ticket-action/getTicketActions');
        setActions(response.data);
      } catch (error) {
        console.error('Error al obtener las acciones:', error.message);
      }
    };

    const fetchUsedActions = async () => {
      try {
        const response = await axiosInstance.get(`/api/historico/getHistorico/${ticketId}`);
        const actionIds = response.data.historico.map(historico => historico.actionTaken._id);
        setUsedActionIds(actionIds);
      } catch (error) {
        console.error('Error al obtener el historial de acciones:', error.message);
      }
    };

    const fetchTicketStatuses = async () => {
      try {
        const response = await axiosInstance.get('/api/ticket-status/getTicketStatus');
        setTicketStatuses(response.data);
      } catch (error) {
        console.error('Error al cargar los estados de ticket:', error.message);
      }
    };

    if (ticketId && !dataLoaded) {
      fetchActions();
      fetchUsedActions();
      fetchTicketStatuses();
      setDataLoaded(true);
    }
  }, [axiosInstance, ticketId, dataLoaded]);

  const getStatusIdByName = (statusName) => {
    const status = ticketStatuses.find(status => status.status === statusName);
    return status ? status._id : null;
  };

  const updateTicketStatus = async (statusId) => {
    try {
      const response = await axiosInstance.put('/api/ticket/updateTicketStatus', {
        ticketId,
        statusId,
      });
      console.log('¡Estado del ticket actualizado exitosamente!');
    } catch (error) {
      console.error('Error al actualizar el estado del ticket:', error.message);
    }
  };

  const handleActionChange = async (e) => {
    const selectedActionId = e.target.value;
    setSelectedAction(selectedActionId);

    const actionName = actions.find(action => action._id === selectedActionId)?.action;

    if (actionName === 'Sanciones') {
      const finalizadoStatusId = getStatusIdByName('Finalizado');
      if (finalizadoStatusId) {
        await updateTicketStatus(finalizadoStatusId);
      } else {
        console.error('No se encontró el estado "Finalizado".');
      }
    }
  };

  const handleSave = async () => {
    if (!selectedAction || !note) {
      alert("Por favor, seleccione una acción y escriba una nota.");
      return;
    }

    try {
      const historicoData = {
        ticketId,
        actionTaken: selectedAction,
        notes: note,
      };

      const response = await axiosInstance.post('/api/historico/saveHistorico', historicoData);
      console.log('Histórico guardado:', response.data);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error('Error al guardar el histórico:', error.message);
      alert("Hubo un error al guardar el histórico. Inténtalo de nuevo.");
    }
  };

  const handleAddPerson = () => {
    setIsAddPersonModalOpen(true);
  };

  const availableActions = actions.filter(action => 
    !usedActionIds.includes(action._id) &&
    !["activar ruta", "archivar"].includes(action.action.toLowerCase())
  );

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
            onChange={handleActionChange}  // Aquí invocas la función correctamente
          >
            <option value="">Seleccione una acción</option>
            {availableActions.map((action) => (
              <option key={action._id} value={action._id}>{action.action}</option>
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
