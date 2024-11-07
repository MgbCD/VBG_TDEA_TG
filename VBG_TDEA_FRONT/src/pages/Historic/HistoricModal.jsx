import React, { useEffect, useState } from 'react';
import useAxios from '../../services/axiosConfig';
import './HistoricModal.css';

const HistoricModal = ({ ticketId, onClose }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasDataLoaded, setHasDataLoaded] = useState(false);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchHistoricData = async () => {
            if (!hasDataLoaded) { 
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/api/historico/getHistorico/${ticketId}`);
                    setHistoricalData(response.data.historico);
                    setHasDataLoaded(true);
                } catch (error) {
                    console.error("Error retrieving historical data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHistoricData();
    }, [ticketId, axiosInstance, hasDataLoaded]);

    return (
        <div className="historic-modal-overlay">
            <div className="historic-modal-content">
                <h2>Histórico del Ticket</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="historic-list">
                        {historicalData.length > 0 ? (
                            historicalData.map((item, index) => (
                                <div key={item._id} className="historic-item">
                                    <h3>Acción {index + 1}</h3>
                                    <p><strong>Acción:</strong> {item.actionTaken.action}</p>
                                    <p><strong>Nota:</strong> {item.notes}</p>
                                    <p><strong>Accionado por:</strong> {item.actionBy.username}</p>
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
