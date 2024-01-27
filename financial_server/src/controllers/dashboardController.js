import sequelize from "../services/connectionService.js";

const DashboardController = {

    formatSQLDate: (dateString) => {
        // Ensure the date string is correctly formatted (mm-dd-yyyy)
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '-');
    },

    // Spending over time
    getSpendingByCategory: async () => {
        try {
        // In your getSpendingByCategory method
        const startDate = new Date();
        const endDate = new Date();

        // Format the dates in YYYY-MM-DD format
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        const [results] = await sequelize.query('EXEC sp_GetSpendingByCategory @startDate = :startDate, @endDate = :endDate', {
            replacements: { startDate: formattedStartDate, endDate: formattedEndDate },
            type: sequelize.QueryTypes.SELECT
        });
            return results;
        } catch (error) {
            console.error("Error in getting spending over time:", error);
            throw error;
        }
    },

    getMonthlyIncomeVsExpense: async () => {

        const startDate = new Date();
        const endDate = new Date();

        // Format the dates in YYYY-MM-DD format
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        try {
            const [results] = await sequelize.query('EXEC sp_GetMonthlyIncomeVsExpense @startDate = :startDate, @endDate = :endDate', {
                replacements: { startDate: formattedStartDate, endDate: formattedEndDate },
                type: sequelize.QueryTypes.SELECT
            });
            return results;
        } catch (error) {
            console.error("Error in getting monthly income vs expense:", error);
            throw error;
        }
    },


    getSpendingOverTime: async () => {
        try {
            const startDate = new Date();
            const endDate = new Date();
    
            // Format the dates in YYYY-MM-DD format
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];
    
            const [results] = await sequelize.query('EXEC sp_GetSpendingOverTime @startDate = :startDate, @endDate = :endDate', {
                replacements: { startDate: formattedStartDate, endDate: formattedEndDate },
                type: sequelize.QueryTypes.SELECT
            });
            return results;
        } catch (error) {
            console.error("Error in getting spending over time:", error);
            throw error;
        }
    }
};


export default DashboardController;