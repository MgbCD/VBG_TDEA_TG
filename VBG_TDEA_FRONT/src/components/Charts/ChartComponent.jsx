// src/components/Charts/ChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  
  if (!data || !Array.isArray(data)) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  const chartData = {
    labels: data.map(stat => stat.status),
    datasets: [
      {
        label: 'Tickets',
        data: data.map(stat => stat.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ChartComponent;
