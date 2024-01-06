import sequelize from "../services/connectionService.js";

const dashboardController = {
    // Spending over time
    getSpendingOverTime: async (startDate, endDate) => {
        try {
            const [results] = await sequelize.query('EXEC sp_GetSpendingOverTime @startDate = :startDate, @endDate = :endDate', {
                replacements: { startDate, endDate },
                type: sequelize.QueryTypes.SELECT
            });
            return results;
        } catch (error) {
            console.error("Error in getting spending over time:", error);
            throw error;
        }
    },

    getMonthlyIncomeVsExpense: async (startDate, endDate) => {
        try {
            const [results] = await sequelize.query('EXEC sp_GetMonthlyIncomeVsExpense @startDate = :startDate, @endDate = :endDate', {
                replacements: { startDate, endDate },
                type: sequelize.QueryTypes.SELECT
            });
            return results;
        } catch (error) {
            console.error("Error in getting monthly income vs expense:", error);
            throw error;
        }
    }
};

export default dashboardController;