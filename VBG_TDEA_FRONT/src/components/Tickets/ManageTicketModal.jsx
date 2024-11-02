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
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axiosInstance.get('/api/ticket-action/getTicketActions');
        setActions(response.data);
      } catch (error) {
        console.error('Error al obtener las acciones:', error);
      }
    };

    const fetchUsedActions = async () => {
      try {
        const response = await axiosInstance.get(`/api/historico/getHistorico/${ticketId}`);
        const actionIds = response.data.historico.map(historico => historico.actionTaken._id);
        setUsedActionIds(actionIds);
      } catch (error) {
        console.error('Error al obtener el historial de acciones:', error);
      }
    };

    fetchActions();
    fetchUsedActions();
  }, [axiosInstance, ticketId]);

  const handleSave = async () => {
    console.log('Nota:', note);
    console.log('Acción seleccionada:', selectedAction);

    if (!selectedAction || !note) {
      alert("Por favor, seleccione una acción y escriba una nota.");
      return;
    }

    try {
      const historicoData = {
        ticketId: ticketId,
        actionTaken: selectedAction,
        notes: note,
      };

      const response = await axiosInstance.post('/api/historico/saveHistorico', historicoData);
      console.log('Histórico guardado:', response.data);
      onClose();
    } catch (error) {
      console.error('Error al guardar el histórico:', error);
      alert("Hubo un error al guardar el histórico. Inténtalo de nuevo.");
    }
  };

  const handleAddPerson = () => {
    setIsAddPersonModalOpen(true);
  };

  const availableActions = actions.filter(action => !usedActionIds.includes(action._id));

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
