import { /*getCategoryWiseSpending,*/ getSpendingOverTime, getMonthlyIncomeVsExpense } from '../repositories/dashboardRepository.js';

// Helper function to validate date
const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

// Controller function for getting spending over time
export const handleSpendingOverTime = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).send('Invalid date format');
  }

  try {
    const data = await getSpendingOverTime(new Date(startDate), new Date(endDate));
    res.json(data);
  } catch (error) {
    console.error("Error in getSpendingOverTime:", error);
    res.status(500).send("Error fetching spending over time data");
  }
};

// Controller function for getting category-wise spending
/*export const handleCategoryWiseSpendingRequest = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).send('Invalid date format');
  }

  try {
    const data = await getCategoryWiseSpending(new Date(startDate), new Date(endDate));
    res.json(data);
  } catch (error) {
    console.error("Error in getCategoryWiseSpending:", error);
    res.status(500).send("Error fetching category-wise spending data");
  }
};*/

// Controller function for monthly income vs expense
export const handleMonthlyIncomeVsExpense = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return res.status(400).send('Invalid date format');
  }

  try {
    const data = await getMonthlyIncomeVsExpense(new Date(startDate), new Date(endDate));
    res.json(data);
  } catch (error) {
    console.error("Error in getMonthlyIncomeVsExpense:", error);
    res.status(500).send("Error fetching monthly income vs expense data");
  }
};
