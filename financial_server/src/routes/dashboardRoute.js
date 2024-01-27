import express from 'express';
import DashboardController from '../controllers/dashboardController.js';

const router = express.Router();

// Route for getting spending over time
router.get('/spending-over-time', async (req, res) => {
    try {
        const data = await dashboardController.getSpendingOverTime(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for getting category-wise spending
router.get('/spending-by-category', async (req, res) => {
    const { startDate, endDate } = req.query;
    console.log('Start Date:', startDate, 'End Date:', endDate);
    try {
        const data = await DashboardController.getSpendingByCategory(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route for getting monthly income vs expense
router.get('/monthly-income-expense', async (req, res) => {
    try {
        const data = await DashboardController.getMonthlyIncomeVsExpense(req.query);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// Add more routes as needed...

export default router;