import React, { useState, useEffect } from 'react';
import { Spinner } from 'components/assets/localStyle';
import SpendingByCategory from 'components/pages/reports/spendingByCategory';
import SpendingOverTime from 'components/pages/reports/spendingOverTime';
import MonthlyIncomeVsExpense from 'components/pages/reports/monthlyIncomeVsExpense';
import {fetchSpendingByCategory, fetchMonthlyIncomeVsExpense, fetchSpendingOverTime} from 'components/services/dashboardService';
import DateForm from 'components/pages/forms/dateForm';

const DashboardForm = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(true);
  const [categoricalSpendingData, setCategoricalSpendingData] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);

  // Handle changes to the start date and end date
  const handleDateChange = (newStartDate, newEndDate) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    if (!startDate || !endDate) return; // Don't fetch data if startDate or endDate is not set

    let isMounted = true; // add a flag
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching category-wise spending data
        const categoryData = await fetchSpendingByCategory(startDate, endDate);
        if (isMounted) setCategoricalSpendingData(categoryData);

        // Fetching monthly income vs expense data
        const incomeExpenseData = await fetchMonthlyIncomeVsExpense(startDate, endDate);
        if (isMounted) setIncomeExpenseData(incomeExpenseData);
  
        // Fetching spending over time data
        const spendingData = await fetchSpendingOverTime(startDate, endDate);
        if (isMounted) setSpendingData(spendingData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      if (isMounted) setLoading(false);
    };
  
    fetchData();

    return () => {
      isMounted = false; // cleanup function to prevent memory leaks
    };
  }, [startDate, endDate]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
      <DateForm startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
      </div>

      {loading ? (
  <Spinner Title="Loading reports...">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </Spinner>
) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <SpendingByCategory data={categoricalSpendingData} />
          <MonthlyIncomeVsExpense data={incomeExpenseData} />
          <SpendingOverTime data={spendingData} />
        </div>
      )}
    </div>
  );
};

export default DashboardForm;