import React, { useEffect, useState } from 'react';
import useAxios from '../../services/axiosConfig';
import './HistoricModal.css'; 

const HistoricModal = ({ ticketId, onClose }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchHistoricData = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:3000/api/historico/getHistorico/${ticketId}`);
                setHistoricalData(response.data.historico);
            } catch (error) {
                console.error("Error retrieving historical data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricData();
    }, [ticketId, axiosInstance]);

    return (
        <div className="historic-modal-overlay">
            <div className="historic-modal-content">
                <h2>Histórico del Ticket</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="historic-list">
                        {historicalData.length > 0 ? (
                            historicalData.map((item) => (
                                <div key={item._id} className="historic-item">
                                    <p><strong>Nota:</strong> {item.notes}</p>
                                    <p><strong>Accionado por:</strong> {item.actionBy}</p>
                                    <p><strong>Fecha de acción:</strong> {new Date(item.actionDate).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay datos históricos disponibles.</p>
                        )}
                    </div>
                )}
                <button className="close-button" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default HistoricModal;
