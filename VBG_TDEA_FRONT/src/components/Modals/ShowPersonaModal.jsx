import React, { useState, useEffect } from "react";
import useAxios from "../../services/axiosConfig";
import "./ShowPersonaModal.css";

const ShowPersonaModal = ({ ticketId, onClose }) => {
    const [implicatedPerson, setImplicatedPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasDataLoaded, setHasDataLoaded] = useState(false);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchDenouncedRegister = async () => {
            if (!hasDataLoaded) {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(`/api/denounced-register/getDenouncedRegister/${ticketId}`);
                    setImplicatedPerson(response.data.denouncedRegister);
                    setHasDataLoaded(true);
                } catch (error) {
                    console.error("Error al obtener los datos:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchDenouncedRegister();
    }, [ticketId, axiosInstance, hasDataLoaded]);

    return (
        <div className="show-persona-modal">
            <div className="show-persona-modal-content">
                <span className="close-button-person" onClick={onClose}>
                    &times;
                </span>
                {loading ? (
                    <p>Cargando información...</p>
                ) : implicatedPerson ? (
                    <>
                        <h2>Información de la Persona Implicada</h2>
                        <p><strong>Nombre:</strong> {implicatedPerson.denouncedName}</p>
                        <p><strong>ID:</strong> {implicatedPerson.denouncedId}</p>
                        <p><strong>Teléfono:</strong> {implicatedPerson.denouncedPhone}</p>
                        <p><strong>Email:</strong> {implicatedPerson.denouncedEmail}</p>
                        <p><strong>Información Adicional:</strong> {implicatedPerson.additionalInfo}</p>
                    </>
                ) : (
                    <p>No hay personas implicadas en este ticket.</p>
                )}
            </div>
        </div>
    );
};

export default ShowPersonaModal;
