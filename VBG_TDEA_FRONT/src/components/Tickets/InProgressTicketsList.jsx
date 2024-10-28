

import React, { useEffect, useState } from 'react';
import useAxios from '../../services/axiosConfig';
import './InProgressTicketsList.css'; 
import TicketDetails from '../../components/Tickets/TicketDetails';
import useAuth from '../../hooks/useAuth';

const InProgressTicketsList = () => {
  const { userRole } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/ticket/my-tickets');
        // Filter tickets with status "En proceso"
        const inProgressTickets = response.data.tickets.filter(ticket => ticket.statusId?.status === 'En proceso');
        setTickets(inProgressTickets);
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
    <div className="in-progress-tickets-container">
      <h2>Tickets En Proceso</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="ticket-card-list horizontal">
          {tickets.map((ticket) => (
            <div className="card ticket-card horizontal-card" key={ticket._id}>
              <div className="card-body">
                <h5 className="card-title">{ticket.title}</h5>
                <p className="card-status">
                  <span className={`status-indicator ${ticket.statusId?.status?.toLowerCase().replace(' ', '-')}`}>
                    {ticket.statusId?.status || 'Sin estado'}
                  </span>
                </p>
                <p className="card-user">
                  <i className="fa-solid fa-circle-user"></i> {ticket.createdBy ? ticket.createdBy.username : 'Desconocido'}
                </p>
                <p className="card-days">
                  {`${Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 3600 * 24))} día(s)` }
                </p>
                <button className="view-ticket-button" onClick={() => openDetailsModal(ticket)}>
                  <i className="fa-solid fa-eye"></i> Ver ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

export default InProgressTicketsList;
