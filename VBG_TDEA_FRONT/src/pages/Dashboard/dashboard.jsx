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
    if (user) {
      const startDate = '2024-01-01';
      const endDate = '2024-12-31';
      fetchDashboardData(startDate, endDate);
    }
  }, [user]);

  const handleDateRangeSave = (startDate, endDate) => {
    fetchDashboardData(startDate, endDate);
    setShowDateRangeModal(false);
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
