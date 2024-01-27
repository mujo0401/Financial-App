import sequelize from '../services/connectionService.js';
import messageController from './messageController.js';

const TransactionController = {
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

    console.log('Checking for an Amount value...');
    try {
      if (amount === null) {
        const message = await messageController.getMessage('Amount_Error');
        return { messageType: 'Amount_Error', message }; 
      }

      console.log('Checking for an Category value...');
      if (categoryId === null) {
        const message = await messageController.getMessage('Category_Error');
        return { messageType: 'Category_Error', message }; 
      }

      console.log('Checking for an Description value...');
      if (descriptionId === null) {
        const message = await messageController.getMessage('Description_Error');
        return { messageType: 'Description_Error', message }; 
      }

      console.log('Printing results...');
      const [result] = await sequelize.query("EXEC sp_AddTransaction @categoryId = :categoryId, @descriptionId = :descriptionId, @amount = :amount, @date = :date", {
        replacements: { categoryId, descriptionId, amount, date: formattedDate },
        type: sequelize.QueryTypes.RAW 
      });

      console.log(result);

      console.log('Transaction data is being created...');
      const newTransactionId = result && result[0] && result[0].NewTransactionId;
      if (!newTransactionId) {
        const message = await messageController.getMessage('Server_Error');
        return { messageType: 'Server_Error' , message}; 
      }

      const message = await messageController.getMessage('Transaction_Success');
      return { messageType: 'Transaction_Success', message };

    } catch (error) {
      const message = await messageController.getMessage('Transaction_Error');
      return { messageType: 'Transaction_Error', message }; 
    }
  }
};

export default TransactionController;