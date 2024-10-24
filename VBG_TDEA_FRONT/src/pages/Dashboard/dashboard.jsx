import React, { useEffect, useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../services/axiosConfig';
import DateRangeModal from '../../components/Modals/DateRangeModal'; 
import ChartComponent from '../../components/Charts/ChartComponent'; 
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Dashboard.css'; 

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const Dashboard = () => {
  const { user } = useAuth();
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [dashboardData, setDashboardData] = useState(null);
  const axiosInstance = useAxios();
  const dashboardRef = useRef();

  const fetchDashboardData = async (month) => {
    const year = new Date().getFullYear();
    const startDate = new Date(year, month, 1).toISOString();
    const endDate = new Date(year, month + 1, 0).toISOString();

    try {
      const response = await axiosInstance.get('http://localhost:3000/api/dashboard/dashboard-stats', {
        params: { startDate, endDate },
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error al obtener datos del dashboard:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData(selectedMonth);
    }
  }, [user, selectedMonth]);

  const handleDateRangeSave = (startDate, endDate) => {
    fetchDashboardData(selectedMonth);
    setShowDateRangeModal(false);
  };

  const handleMonthSelect = (index) => {
    setSelectedMonth(index);
  };

  const downloadPDF = () => {
    html2canvas(dashboardRef.current, { 
      backgroundColor: null, // Evitar fondo gris
      scale: 2 // Mayor escala para mejor calidad
    }).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190; // Ajustar según tus necesidades
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('dashboard.pdf');
    });
  };

  return (
    <div className="dashboard-container" ref={dashboardRef}>
      <h1 className="dashboard-title">Dashboard</h1>
      {showDateRangeModal && (
        <DateRangeModal
          onClose={() => setShowDateRangeModal(false)}
          onSave={handleDateRangeSave}
        />
      )}
      <button className="pdf-button" onClick={downloadPDF}>
        <i className='fa-solid fa-download' style={{marginRight: '5px'}}></i>
        Descargar PDF
      </button>

      <div className="month-carousel">
        {months.map((month, index) => (
          <div
            key={index}
            className={`month-item ${selectedMonth === index ? 'active' : ''}`}
            onClick={() => handleMonthSelect(index)}
          >
            {month}
          </div>
        ))}
      </div>
      {dashboardData && (
        <>
          <ChartComponent data={dashboardData.ticketStats} />
          <h2>Usuarios registrados: {dashboardData.userStats}</h2>
        </>
      )}
    </div>
  );
};

export default Dashboard;
