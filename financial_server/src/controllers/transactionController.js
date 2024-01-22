import sequelize from '../services/connectionService.js';
import messageController from '../controllers/messageController.js';

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
      if (amount === null) {
        const message = await messageController.getMessage('Amount_Error');
        return { messageType: 'Amount_Error', message }; 
      }
    
      if (categoryId === null) {
        const message = await messageController.getMessage('Category_Error');
        return { messageType: 'Category_Error', message }; 
      }
    
      if (descriptionId === null) {
        const message = await messageController.getMessage('Description_Error');
        return { messageType: 'Description_Error', message }; 
      }

      const [result] = await sequelize.query("EXEC sp_AddTransaction @categoryId = :categoryId, @descriptionId = :descriptionId, @amount = :amount, @date = :date", {
        replacements: { categoryId, descriptionId, amount, date: formattedDate },
        type: sequelize.QueryTypes.RAW 
      });

      if (result[0] && result[0][0] && result[0][0].ErrorMessage) {
        const message = await messageController.getMessage('Server_Error');
        return { messageType: 'Server_Error' , message};
      }

      const newTransactionId = result && result[0] && result[0].NewTransactionId;
      if (!newTransactionId) {
        const message = await messageController.getMessage('Server_Error');
        return { messageType: 'Server_Error' , message}; 
      }

    } catch (error) {
      const message = await messageController.getMessage('Transaction_Error');
      return { messageType: 'Transaction_Error', message }; 
    }
  }
};

export default transactionController;