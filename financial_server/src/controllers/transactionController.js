import sequelize from '../services/connectionService.js';

const transactionController = {
  formatDate: () => {
    const d = new Date();
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
    let { categoryId, descriptionId, amount } = transactionData;
    categoryId = isNaN(parseInt(categoryId)) ? null : parseInt(categoryId);
    descriptionId = isNaN(parseInt(descriptionId)) ? null : parseInt(descriptionId);
    amount = isNaN(parseFloat(amount)) ? null : parseFloat(amount);
    const formattedDate = transactionController.formatDate();
  
    try {
      const [result] = await sequelize.query("EXEC sp_AddTransaction @categoryId = :categoryId, @descriptionId = :descriptionId, @amount = :amount, @date = :date", {
        replacements: { categoryId, descriptionId, amount, date: formattedDate },
        type: sequelize.QueryTypes.RAW 
      });
  
      if (result[0] && result[0][0] && result[0][0].ErrorMessage) {
        throw new Error(result[0][0].ErrorMessage);
      }
  
      const newTransactionId = result && result[0] && result[0].NewTransactionId;
      if (!newTransactionId) {
        throw new Error('Failed to create a new transaction');
      }
  
      return { message: 'Transaction added successfully', categoryId: newTransactionId };
    } catch (error) {
      console.error('Error in addTransaction function:', error);
      throw error; // Propagate the error up to the caller
    }
  }
}

export default transactionController;