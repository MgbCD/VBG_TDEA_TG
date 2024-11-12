import React, { useEffect, useState } from "react";
import useAxios from "../../services/axiosConfig";
import "./Historic.css";
import TicketDetails from "../../components/Tickets/TicketDetails";
import HistoricModal from "../Historic/HistoricModal";
import useAuth from "../../hooks/useAuth";
import ShowPersonaModal from "../../components/Modals/ShowPersonaModal";

const HistoricTicketsList = () => {
    const { userRole } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [ticketIdForModal, setTicketIdForModal] = useState(null);
    const [showPersonaModal, setShowPersonaModal] = useState(false);
    const [startPage, setStartPage] = useState(1);
    const ticketsPerPage = 8;
    const pagesToShow = 3;
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axiosInstance.get("/api/ticket/my-tickets");
                setTickets(response.data.tickets);
            } catch (error) {
                console.error("Error retrieving tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const openHistoricModal = (ticketId) => {
        setTicketIdForModal(ticketId);
        setModalVisible(true);
    };

    const openPersonaModal = (ticketId) => {
        setTicketIdForModal(ticketId);
        setShowPersonaModal(true);
    };

    const filteredTickets = filterStatus
        ? tickets.filter((ticket) => ticket.statusId?.status === filterStatus)
        : tickets;

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (page > startPage + pagesToShow - 1) {
            setStartPage(page - pagesToShow + 1);
        } else if (page < startPage) {
            setStartPage(page);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    return (
        <div className="historic-tickets-container">
            <h2>Histórico de Tickets</h2>

            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-filter-dropdown"
            >
                <option value="">Todos</option>
                <option value="En proceso">En proceso</option>
                <option value="Archivado">Archivado</option>
                <option value="Creado">Creado</option>
                <option value="Finalizado">Finalizado</option>
            </select>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <div className="ticket-card-list">
                        {currentTickets.map((ticket) => (
                            <div className="card ticket-card" key={ticket._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{ticket.title}</h5>
                                    <p className="card-status">
                                        <span className={`status-indicator ${ticket.statusId?.status?.toLowerCase().replace(" ", "-")}`}>
                                            {ticket.statusId?.status || "Sin estado"}
                                        </span>
                                    </p>
                                    <p className="card-user">
                                        <i className="fa-solid fa-circle-user"></i> {ticket.createdBy?.username || "Desconocido"}
                                    </p>
                                    <p className="card-days">
                                        {`${Math.floor((new Date() - new Date(ticket.createdAt)) / (1000 * 3600 * 24))} día(s)`}
                                    </p>
                                    <button className="view-ticket-button" onClick={() => openHistoricModal(ticket._id)}>
                                        <i className="fa-solid fa-eye"></i> Ver historico ticket
                                    </button>

                                    {userRole === "admin" && (
                                        <button
                                            className="view-people-involved"
                                            onClick={() => openPersonaModal(ticket._id)}
                                        >
                                            <i className="fa-solid fa-person"></i> Ver persona implicada
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button onClick={handlePrevious} disabled={currentPage === 1} className="page-button">
                            Anterior
                        </button>
                        {Array.from({ length: Math.min(pagesToShow, totalPages - startPage + 1) }, (_, i) => {
                            const page = startPage + i;
                            return (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`page-button ${currentPage === page ? "active" : ""}`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button onClick={handleNext} disabled={currentPage === totalPages} className="page-button">
                            Siguiente
                        </button>
                    </div>
                </>
            )}

            {selectedTicket && (
                <TicketDetails
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                />
            )}

            {modalVisible && (
                <HistoricModal
                    ticketId={ticketIdForModal}
                    onClose={() => setModalVisible(false)}
                />
            )}

            {showPersonaModal && ticketIdForModal && (
                <ShowPersonaModal
                    ticketId={ticketIdForModal}
                    onClose={() => setShowPersonaModal(false)}
                />
            )}
        </div>
    );
};

export default HistoricTicketsList;
