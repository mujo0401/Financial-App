import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import DashboardService from 'components/services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const getMonthName = (monthNumber) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[monthNumber - 1];
}

const SpendingOverTime = () => {
  const currentDate = new Date('01-01-2024');
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const [startDate] = useState(currentDate);
  const [endDate] = useState(oneYearFromNow);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DashboardService.fetchSpendingOverTime(startDate, endDate);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const labels = Array.isArray(data) ? data.map(item => `${getMonthName(item._id)}`) : [];
  const expense = Array.isArray(data) ? data.map(item => item.totalAmount) : [];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Spending Over Time',
        data: expense,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Spending Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Spending Over Time</h2>
      <div style={{ width: '500px', height: '400px' }}>
      <Line 
     key={`spending-over-time-${new Date().getTime()}`} 
  data={chartData} 
  options={options} 
/>
</div>
    </div>
  );
};

export default SpendingOverTime;
