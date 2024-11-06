import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ data }) => {
  // Verifica que haya datos disponibles
  if (!data || !Array.isArray(data)) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  // Define un conjunto de colores únicos para cada estado
  const colors = [
    'rgba(255, 206, 86, 0.6)',  // Amarillo para Tickets Creados
    'rgba(54, 162, 235, 0.6)',   // Azul para Tickets En Proceso
    'rgba(255, 99, 132, 0.6)',    // Rojo para Tickets Archivados
    'rgba(75, 192, 192, 0.6)',    // Verde para Tickets Finalizados
    'rgba(153, 102, 255, 0.6)',   // Morado
    'rgba(255, 159, 64, 0.6)',     // Naranja
  ];

  // Estructura de datos del gráfico
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
