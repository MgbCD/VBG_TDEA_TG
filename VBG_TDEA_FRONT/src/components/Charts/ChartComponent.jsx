import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  const colors = [
    'rgba(255, 206, 86, 0.6)', 
    'rgba(54, 162, 235, 0.6)',   
    'rgba(255, 99, 132, 0.6)',   
    'rgba(75, 192, 192, 0.6)',  
    'rgba(153, 102, 255, 0.6)',  
    'rgba(255, 159, 64, 0.6)',    
  ];

  const chartData = {
    labels: data.map(stat => stat.status),
    datasets: [
      {
        label: 'Tickets',
        data: data.map(stat => stat.count),
        backgroundColor: data.map((stat, index) => colors[index % colors.length]), // Asigna colores de manera cíclica
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default ChartComponent;
