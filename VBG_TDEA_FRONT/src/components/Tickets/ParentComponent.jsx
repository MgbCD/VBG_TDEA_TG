import React, { useState, useEffect } from 'react';
import TicketDetails from './TicketDetails';
import { toast } from 'react-toastify';

const ParentComponent = () => {
  const [tickets, setTickets] = useState([]); 
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error al cargar tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleEditTicket = async (formData) => {
    try {
      const response = await fetch('/updateTicket', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el ticket');
      }

      const updatedTicket = await response.json();
      setTickets((prevTickets) => 
        prevTickets.map(ticket => 
          ticket.id === updatedTicket.ticket.id ? updatedTicket.ticket : ticket
        )
      );

      toast.success('¡Ticket actualizado exitosamente!');

    } catch (error) {
      console.error("Error al editar el ticket:", error);
      toast.error('Error al actualizar el ticket. Inténtalo de nuevo.');
    }
  };

  const handleDeleteTicket = async (ticketId) => {

  };

  return (
    <div>
      {tickets.map(ticket => (
        <TicketDetails
          key={ticket.id}
          ticket={ticket}
          onClose={() => setSelectedTicket(null)}
          onEdit={handleEditTicket} 
          onDelete={handleDeleteTicket}
        />
      ))}
    </div>
  );
};

export default ParentComponent;
