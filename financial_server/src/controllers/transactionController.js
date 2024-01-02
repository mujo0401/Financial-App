import connect from '../services/connectionService.js';
import categoryController from './categoryController.js';
import descriptionController from './descriptionController.js';

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
    const formattedDate = this.formatDate(date);

    try {
        // Get the category by id
        const category = await categoryController.categoryExists(categoryId);
        if (!category) {
            console.log(`Category not found for categoryId: ${categoryId}`);
        }

        // Check if the description exists
        const description = await descriptionController.descriptionExists(descriptionId);
        if (!description) {
            console.log(`Description not found for descriptionId: ${descriptionId}`);
        }

        // Create transaction
        // Call the stored procedure to add the transaction
        const [result] = await connect.query('EXEC sp_AddTransaction @categoryId = :categoryId, @descriptionId = :descriptionId, @amount = :amount, @date = :formattedDate', {
            replacements: { categoryId, descriptionId, amount, formattedDate },
            type: connect.QueryTypes.SELECT
        });

        const newTransactionId = result && result[0] && result[0].NewTransactionId;
        if (!newTransactionId) {
            throw new Error('Failed to create a new transaction');
        }

        res.status(200).send({ message: 'Transaction added successfully', id: newTransactionId });
    } catch (error) {
        console.error('Error in addTransaction function:', error);
    }
  }
}

export default transactionController;