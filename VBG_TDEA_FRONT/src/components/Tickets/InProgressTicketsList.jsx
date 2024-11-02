import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import useAxios from '../../services/axiosConfig';
import './InProgressTicketsList.css'; 
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import ManageTicketModal from './ManageTicketModal'; // Update the import

Modal.setAppElement('#root');

const InProgressTicketsList = () => {
  const { userId } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/api/ticket/my-tickets');
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

  const openManageModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
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
                <button className="view-ticket-button" onClick={() => openManageModal(ticket)}>
                  <i className="fa-solid fa-pen"></i> Gestionar ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para gestionar el ticket */}
      {isModalOpen && selectedTicket && (
        <ManageTicketModal
          onClose={() => setIsModalOpen(false)}
          ticketId={selectedTicket._id}
          createdBy={userId}
        />
      )}
    </div>
  );
};

export default InProgressTicketsList;
