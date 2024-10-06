// src/components/Modals/ProgramSelectionModal.jsx
import React, { useState } from 'react';
import './ModalStyle.css'; // Importa tu archivo CSS para estilos

const ProgramSelectionModal = ({ onClose, onSave }) => {
  const [selectedProgram, setSelectedProgram] = useState('');

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleSave = () => {
    onSave(selectedProgram); 
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecciona tu programa academico</h2>
        <select value={selectedProgram} onChange={handleProgramChange}>
          <option value="">Seleccionar programa</option>
          <option value="programa1">Contaduría Pública</option>
          <option value="programa2">Doctorado en Economía y Finanzas</option>
          <option value="programa4">Maestría en Desarrollo Urbano – Rural</option>
          <option value="programa5">Maestría en Gerencia de Mercadeo</option>
          <option value="programa6">Maestría en Gerencia Financiera</option>
          <option value="programa7">Negocios Internacionales</option>
          <option value="programa8">Profesional en Administración Comercial</option>
          <option value="programa9">Profesional en Administración Financiera</option>
          <option value="programa10">Técnica Profesional en Procesos de Comercio Exterior y Logística</option>
          <option value="programa11">Técnica Profesional en Procesos Financieros</option>
          <option value="programa12">Tecnología en Gestión Comercial</option>
          <option value="programa13">Tecnología en Gestión de Comercio Exterior y Logística</option>
          <option value="programa14">Tecnología en Gestión Financiera</option>
          <option value="programa15">Doctorado en Educación y Estudios Sociales</option>
          <option value="programa16">Maestría en Educación</option>
          <option value="programa17">Maestría en Pedagogía Digital</option>
          <option value="programa18">Licenciatura en Literatura y Lengua Castellana</option>
          <option value="programa19">Licenciatura en Educación Infantil</option>
          <option value="programa20">Licenciatura en Educación Campesina y Rural</option>
          <option value="programa21">Licenciatura en Educación Física, Recreación y Deportes</option>
          <option value="programa22">Trabajo Social</option>
          <option value="programa23">Psicología</option>
          <option value="programa24">Maestría en Ciencias Forenses y Criminalística</option>
          <option value="programa25">Especialización en Derecho Público</option>
          <option value="programa26">Derecho</option>
          <option value="programa27">Profesional en Criminalística</option>
          <option value="programa28">Profesional en Gestión de la Seguridad y Salud en el Trabajo</option>
          <option value="programa29">Tecnología en Investigación Judicial</option>
          <option value="programa30">Tecnología en Sistemas</option>
          <option value="programa31">Tecnología en Implementación de servicios IoT</option>
          <option value="programa32">Tecnología en Gestión Informática</option>
          <option value="programa33">Tecnología en Gestión de la Ciberseguridad</option>
          <option value="programa34">Tecnología en Gestión Agroambiental</option>
          <option value="programa35">Técnica Profesional en Sistemas</option>
          <option value="programa36">Maestría en Gestión del Riesgo y Medio Ambiente</option>
          <option value="programa37">Maestría en Gestión de Tecnología de la Información</option>
          <option value="programa38">Ingeniería en Software</option>
          <option value="programa39">Ingeniería Ambiental</option>
          <option value="programa40">Especialización en Tecnologías aplicadas a la Geomática</option>
        </select>
        <button onClick={handleSave} className="btn btn-primary">Guardar</button>
      </div>
    </div>
  );
};

export default ProgramSelectionModal;
