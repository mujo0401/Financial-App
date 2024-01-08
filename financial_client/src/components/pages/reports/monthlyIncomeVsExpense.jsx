import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchMonthlyIncomeVsExpense } from 'components/services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getmonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const getMonthName = (monthNumber) => {
  return getmonthNames[monthNumber - 1];
}

const MonthlyIncomeVsExpense = () => {
  const currentDate = new Date('01-01-2024');
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const [startDate] = useState(currentDate);
  const [endDate] = useState(oneYearFromNow);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMonthlyIncomeVsExpense(startDate, endDate);
        if (response && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Invalid response:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [startDate, endDate]);

  const labels = data && data.map(item => getMonthName(item.monthNumber));
  const income = data && data.map(item => item.totalIncome);
  const expense = data && data.map(item => item.totalExpense);

  if (!data || !Array.isArray(data)) {
    return <div>No data available or data is loading.</div>;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: income,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Expense',
        data: expense,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income vs Expense'
      }
    }
  };

  return (
    <div>
      <h2>Monthly Income vs Expense</h2>
      <div style={{ width: '500px', height: '400px' }}>
      <Bar
        key={`monthly-income-expense-${new Date().getTime()}`} 
        data={chartData}
        options={options}
      />
      </div>
    </div>
  );
}

export default MonthlyIncomeVsExpense;