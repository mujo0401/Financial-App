const DASHBOARD_URL = 'http://localhost:3000/api/dashboard'

const DashboardService = {
// Fetch spending data over time
  fetchSpendingOverTime: async (startDate, endDate) => {
  try {
    const response = await fetch(`${DASHBOARD_URL}/spending-over-time?startDate=${startDate}&endDate=${endDate}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching spending over time:', error);
    throw error;
  }
},

// Fetch category-wise spending data
 fetchSpendingByCategory: async (startDate, endDate) => {
  try {
    const response = await fetch(`${DASHBOARD_URL}/spending-by-category?startDate=${startDate}&endDate=${endDate}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching spending by category data:', error);
    throw error;
  }
},

// Fetch monthly income vs expense data
 fetchMonthlyIncomeVsExpense: async (startDate, endDate) => {
  try {
    const response = await fetch(`${DASHBOARD_URL}/monthly-income-expense?startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching monthly income vs expense:', error);
    throw error;
  }
 }
};

export default DashboardService;
