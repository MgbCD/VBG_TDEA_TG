// src/pages/Historic/Historic.js
import React, { useEffect, useState } from 'react';
import useAxios from '../../services/axiosConfig';
import './Historic.css'; 
import TicketDetails from '../../components/Tickets/TicketDetails';
import useAuth from '../../hooks/useAuth';

const HistoricTicketsList = () => {
  const { userRole } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/ticket/my-tickets');
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error retrieving tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const openDetailsModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="historic-tickets-container">
      <h2>Histórico de Tickets</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table historic-tickets-table">
          <thead>
            <tr>
              <th>Título del ticket</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Días del ticket</th>
              <th>Ver ticket</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>
                  <span className={`status-indicator ${ticket.statusId?.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.statusId ? ticket.statusId.status : 'Sin estado'}
                  </span>
                </td>
                <td>
                  <i className="fa-solid fa-circle-user" style={{ marginRight: '5px' }}></i>
                  {ticket.createdBy ? ticket.createdBy.username : 'Desconocido'}
                </td>
                <td>{`${Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 3600 * 24))} día(s)`}</td>
                <td>
                  <button onClick={() => openDetailsModal(ticket)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <i className="fa-solid fa-eye" style={{ color: 'blue' }}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onRefresh={() => { /* Aquí puedes implementar la lógica para refrescar si es necesario */ }}
          onDelete={() => { /* Aquí puedes implementar la lógica para eliminar si es necesario */ }}
        />
      )}
    </div>
  );
};

// Cambiar 'Historic' a 'HistoricTicketsList'
export default HistoricTicketsList;
