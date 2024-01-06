import sequelize from '../services/connectionService.js';

const transactionController = {
  formatDate: (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    let month = '' + (d.getUTCMonth() + 1);
    let day = '' + d.getUTCDate();
    const year = d.getUTCFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  },

  addTransaction: async (transactionData) => {
    const { categoryId, descriptionId, amount, date } = transactionData;
    const formattedDate = transactionController.formatDate(date);

    try {
        const [result] = await sequelize.query('EXEC sp_AddTransaction @categoryId = categoryId, @descriptionId = descriptionId, @amount = amount, @date = formattedDate', {
            replacements: { categoryId, descriptionId, amount, formattedDate },
            type: sequelize.QueryTypes.SELECT
        });

        const newTransactionId = result && result[0] && result[0].NewTransactionId;
        if (!newTransactionId) {
            throw new Error('Failed to create a new transaction');
        }

        res.status(200).send({ message: 'Transaction added successfully', categoryId: newTransactionId });
    } catch (error) {
        console.error('Error in addTransaction function:', error);
    }
  }
}

export default transactionController;