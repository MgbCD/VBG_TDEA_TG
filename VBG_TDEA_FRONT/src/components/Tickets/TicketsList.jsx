import React, { useEffect, useState } from 'react';
import './TicketsList.css';
import useAxios from '../../services/axiosConfig';

const TicketsList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/ticket/my-tickets');
        setTickets(response.data.tickets);
      } catch (error) {
        console.error("Error al obtener los tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [axiosInstance]);

  const calculateDaysCreated = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const differenceInTime = today - createdDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const handleCreateNewTicket = () => {
    console.log('Crear nuevo ticket');
  };

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <button className="create-ticket-button" onClick={handleCreateNewTicket}>
          Crear ticket nuevo    <i className="fa-solid fa-plus"></i>
        </button>
        <h2>TICKETS ACTIVOS</h2>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table tickets-table">
          <thead>
            <tr>
              <th>Título del ticket</th>
              <th>Estado</th>
              <th>Creador</th>
              <th>Días del ticket</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>{ticket.statusId ? ticket.statusId.status : 'Sin estado'}</td>
                <td>{ticket.createdBy ? ticket.createdBy.username : 'Desconocido'}</td>
                <td>{calculateDaysCreated(ticket.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketsList;
