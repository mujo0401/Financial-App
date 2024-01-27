import parsingController from './parsingController.js';
import TransactionEntryController from './transactionEntryController.js';
import MessageController from './messageController.js';

const TransactionImportController = {
  importData: async (files) => {
    try {
        console.log('Starting file import...'); 

        if (!files) {
            console.log('No files provided.'); 
            const message = await MessageController.getMessage('Empty_Error');
            return { messageType: 'Empty_Error', message }; 
        }   

        console.log(`File type: ${files.mimetype}`); 

        if (files.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            console.log('Handling XLSX file...'); 
            await parsingController.readXLSXFile(files.buffer);
            return; 
        } else if (files.mimetype === 'application/json') {
            console.log('Handling JSON file...'); 
            const records = JSON.parse(files.buffer.toString());
            for (const record of records) {
                try {
                    const result = await TransactionEntryController.addTransaction(record);
                    console.log(`Transaction added: ${result.message}`); 
                } catch (error) {
                    console.error('Error adding transaction:', error);
                    const message = await messageController.getMessage('Transaction_Error');
                    return { messageType: 'Transaction_Error', message }; 
                }
            }
            return; 
        } else {
            console.log('Unsupported file type.'); 
            const message = await MessageController.getMessage('Unsupported_Error');
            return { messageType: 'Unsupported_Error', message }; 
        }
    } catch (error) {
        console.error('Error processing file:', error);
        const message = await MessageController.getMessage('Server_Error');
        return { messageType: 'Server_Error', message }; 
    }
  }
};

export default TransactionImportController;
