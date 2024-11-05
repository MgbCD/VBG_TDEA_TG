
import React from "react";
import "./ShowPersonaModal.css"; 

const ShowPersonaModal = ({ implicatedPerson, onClose }) => {
    return (
        <div className="show-persona-modal">
            <div className="show-persona-modal-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                {implicatedPerson ? (
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
