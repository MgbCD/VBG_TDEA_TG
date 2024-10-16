// src/components/Modals/DateRangeModal.js
import React, { useState } from 'react';

const DateRangeModal = ({ onClose, onSave }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(startDate, endDate);
  };

  return (
    <div className="modal">
      <h2>Seleccionar Rango de Fechas</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha de Inicio:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Fecha de Fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default DateRangeModal;
