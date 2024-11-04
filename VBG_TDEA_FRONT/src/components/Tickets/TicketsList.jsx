import React, { useState, useEffect } from 'react';
import './TicketsList.css';
import useAxios from '../../services/axiosConfig';
import TicketForm from './TicketForm';
import TicketDetails from './TicketDetails';
import useAuth from '../../hooks/useAuth';

const TicketsList = () => {
  const { user, userRole } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const ticketsPerPage = 10;
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/api/ticket/my-tickets');
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error retrieving tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const refreshTickets = async () => {
    try {
        const response = await axiosInstance.get('/api/ticket/my-tickets');
        setTickets(response.data.tickets);
    } catch (error) {
        console.error("Error retrieving tickets:", error);
    }
  };

  const handleCreateTicket = async (newTicket) => {
    try {
      const response = await axiosInstance.post('/api/ticket/saveTicket', newTicket);
      const updatedTicketsResponse = await axiosInstance.get('/api/ticket/my-tickets');
      setTickets(updatedTicketsResponse.data.tickets);
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleUpdate = async () => {
    await refreshTickets();
  };

  const calculateDaysCreated = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const differenceInTime = today - createdDate;
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  const formatDaysText = (ticket) => {
    let days;
    let statusText;

    if (ticket.statusId?.status === "En proceso") {
      days = calculateDaysCreated(ticket.updatedAt);
      statusText = `${days} día(s) en progreso`;
    } else {
      days = calculateDaysCreated(ticket.createdAt);
      statusText = `${days} día(s) creado`;
    }

    return statusText;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "En proceso":
        return "status-indicator status-in-progress";
      case "Creado":
        return "status-indicator status-created";
      case "Archivado":
        return "status-indicator status-archived";
      default:
        return "status-indicator";
    }
  };

  const filteredTickets = tickets
  .filter(ticket => {
    const ticketStatus = ticket.statusId ? ticket.statusId.status : 'Sin estado';
    return (filterStatus === 'Todos' || ticketStatus === filterStatus) &&
      (ticketStatus === "En proceso" || ticketStatus === "Creado");
  })
  .sort((a, b) => {
    const statusOrder = { "Creado": 1, "En proceso": 2 }; // Definir prioridad
    const statusA = a.statusId ? a.statusId.status : 'Sin estado';
    const statusB = b.statusId ? b.statusId.status : 'Sin estado';
    return (statusOrder[statusA] || 3) - (statusOrder[statusB] || 3); // Asigna prioridad para ordenar
  });
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTickets.length / ticketsPerPage)));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  const openDetailsModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        {userRole !== 'admin' && (
          <button className="create-ticket-button" onClick={() => setShowModal(true)}>
            Crear ticket nuevo <i className="fa-solid fa-plus"></i>
          </button>
        )}
        <h2>TICKETS ACTIVOS</h2>
      </div>

      <div className="filter-container">
        <label htmlFor="status-filter">
          <i className="fa-solid fa-filter" style={{ marginRight: '5px' }}></i>
          Filtrar por estado:
        </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Todos">Todos</option>
          <option value="En proceso">En proceso</option>
          <option value="Creado">Creado</option>
        </select>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <table className="table tickets-table">
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
              {currentTickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.title}</td>
                  <td>
                    <span className={getStatusClass(ticket.statusId?.status)}>
                      {ticket.statusId ? ticket.statusId.status : 'Sin estado'}
                    </span>
                  </td>
                  <td>
                    <i className="fa-solid fa-circle-user" style={{ marginRight: '5px' }}></i>
                    {ticket.createdBy ? ticket.createdBy.username : 'Desconocido'}
                  </td>
                  <td>{formatDaysText(ticket)}</td>
                  <td>
                    <button onClick={() => openDetailsModal(ticket)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <i className="fa-solid fa-eye" style={{ color: 'blue' }}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Anterior
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`page-button ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      {showModal && (
        <TicketForm
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateTicket}
        />
      )}

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onRefresh={refreshTickets}
          onDelete={refreshTickets}
        />
      )}
    </div>
  );
};

export default TicketsList;
