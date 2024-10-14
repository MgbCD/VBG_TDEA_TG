import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../services/axiosConfig';
import DateRangeModal from '../../components/Modals/DateRangeModal'; 
import ChartComponent from '../../components/Charts/ChartComponent'; 
import './Dashboard.css'; 

const Dashboard = () => {
  const { user } = useAuth();
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const axiosInstance = useAxios();

  // Función para obtener las estadísticas del dashboard
  const fetchDashboardData = async (startDate, endDate) => {
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
    // Llama a la función de obtención de datos si el usuario está definido
    if (user) {
      // Aquí puedes establecer un rango de fechas predeterminado si lo deseas
      const startDate = '2024-01-01';
      const endDate = '2024-10-14';
      fetchDashboardData(startDate, endDate);
    }
  }, [user]);

  const handleDateRangeSave = (startDate, endDate) => {
    fetchDashboardData(startDate, endDate); // Vuelve a obtener datos con el nuevo rango
    setShowDateRangeModal(false); // Cierra la modal
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {showDateRangeModal && (
        <DateRangeModal
          onClose={() => setShowDateRangeModal(false)}
          onSave={handleDateRangeSave}
        />
      )}
      <button onClick={() => setShowDateRangeModal(true)}>Seleccionar Rango de Fechas</button>
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
