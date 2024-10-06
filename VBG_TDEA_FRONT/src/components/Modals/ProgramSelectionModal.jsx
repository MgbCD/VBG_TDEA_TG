import React, { useState } from 'react';
import './ModalStyle.css';

const ProgramSelectionModal = ({ onClose, onSave }) => {
  const [selectedProgram, setSelectedProgram] = useState('');

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleSave = () => {
    if (selectedProgram) {
      onSave(selectedProgram);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecciona tu programa academico</h2>
        <select value={selectedProgram} onChange={handleProgramChange}>
          <option value="">Seleccionar programa</option>
          <option value="Contaduría Pública">Contaduría Pública</option>
          <option value="Doctorado en Economía y Finanzas">Doctorado en Economía y Finanzas</option>
          <option value="Maestría en Desarrollo Urbano – Rural">Maestría en Desarrollo Urbano – Rural</option>
          <option value="Maestría en Gerencia de Mercadeo">Maestría en Gerencia de Mercadeo</option>
          <option value="Maestría en Gerencia Financiera">Maestría en Gerencia Financiera</option>
          <option value="Negocios Internacionales">Negocios Internacionales</option>
          <option value="Profesional en Administración Comercial">Profesional en Administración Comercial</option>
          <option value="Profesional en Administración Financiera">Profesional en Administración Financiera</option>
          <option value="Técnica Profesional en Procesos de Comercio Exterior y Logística">Técnica Profesional en Procesos de Comercio Exterior y Logística</option>
          <option value="Técnica Profesional en Procesos Financieros">Técnica Profesional en Procesos Financieros</option>
          <option value="Tecnología en Gestión Comercial">Tecnología en Gestión Comercial</option>
          <option value="Tecnología en Gestión de Comercio Exterior y Logística">Tecnología en Gestión de Comercio Exterior y Logística</option>
          <option value="Tecnología en Gestión Financiera">Tecnología en Gestión Financiera</option>
          <option value="Doctorado en Educación y Estudios Sociales">Doctorado en Educación y Estudios Sociales</option>
          <option value="Maestría en Educación">Maestría en Educación</option>
          <option value="Maestría en Pedagogía Digital">Maestría en Pedagogía Digital</option>
          <option value="Licenciatura en Literatura y Lengua Castellana">Licenciatura en Literatura y Lengua Castellana</option>
          <option value="Licenciatura en Educación Infantil">Licenciatura en Educación Infantil</option>
          <option value="Licenciatura en Educación Campesina y Rural">Licenciatura en Educación Campesina y Rural</option>
          <option value="Licenciatura en Educación Física, Recreación y Deportes">Licenciatura en Educación Física, Recreación y Deportes</option>
          <option value="Trabajo Social">Trabajo Social</option>
          <option value="Psicología">Psicología</option>
          <option value="Maestría en Ciencias Forenses y Criminalística">Maestría en Ciencias Forenses y Criminalística</option>
          <option value="Especialización en Derecho Público">Especialización en Derecho Público</option>
          <option value="Derecho">Derecho</option>
          <option value="Profesional en Criminalística">Profesional en Criminalística</option>
          <option value="Profesional en Gestión de la Seguridad y Salud en el Trabajo">Profesional en Gestión de la Seguridad y Salud en el Trabajo</option>
          <option value="Tecnología en Investigación Judicial">Tecnología en Investigación Judicial</option>
          <option value="Tecnología en Sistemas">Tecnología en Sistemas</option>
          <option value="Tecnología en Implementación de servicios IoT">Tecnología en Implementación de servicios IoT</option>
          <option value="Tecnología en Gestión Informática">Tecnología en Gestión Informática</option>
          <option value="Tecnología en Gestión de la Ciberseguridad">Tecnología en Gestión de la Ciberseguridad</option>
          <option value="Tecnología en Gestión Agroambiental">Tecnología en Gestión Agroambiental</option>
          <option value="Técnica Profesional en Sistemas">Técnica Profesional en Sistemas</option>
          <option value="Maestría en Gestión del Riesgo y Medio Ambiente">Maestría en Gestión del Riesgo y Medio Ambiente</option>
          <option value="Maestría en Gestión de Tecnología de la Información">Maestría en Gestión de Tecnología de la Información</option>
          <option value="Ingeniería en Software">Ingeniería en Software</option>
          <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
          <option value="Especialización en Tecnologías aplicadas a la Geomática">Especialización en Tecnologías aplicadas a la Geomática</option>
        </select>
        <button onClick={handleSave} className="btn btn-primary">Guardar</button>
      </div>
    </div>
  );
};

export default ProgramSelectionModal;
