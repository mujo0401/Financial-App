import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {fetchSpendingByCategory} from 'components/services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingByCategory = () => {
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
      const currentDate = new Date('01-01-2024');
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);;

    const [startDate] = useState(formatDate(currentDate));
    const [endDate] = useState(formatDate(oneYearFromNow));

  const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
            {
                label: 'Total Spending',
                data: [], 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ],
      });

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetchSpendingByCategory(startDate, endDate);
            if (response && Array.isArray(response.data)) {
              const fetchedData = response.data;
              setChartData({
                ...chartData,
                labels: fetchedData.map(item => item.categoryName),
                datasets: [{
                  ...chartData.datasets[0],
                  data: fetchedData.map(item => item.TotalAmount)
                }]
              });
            } else {
              console.error('Invalid response:', response);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [startDate, endDate, chartData]);

  const options = {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  };

  return (
    <div>
        <h2>Spending By Category</h2>
        <div style={{ width: '500px', height: '400px' }}>
            <Bar data={chartData} options={options} />
        </div>
    </div>
  );
};
export default SpendingByCategory;