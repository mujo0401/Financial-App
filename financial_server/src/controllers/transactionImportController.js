import parsingController from './parsingController.js';
import transactionController from './transactionController.js';
import messageController from '../controllers/messageController.js';

const transactionImportController = {
  importData: async (files) => {
    try {
        console.log('Starting file import...'); // Added console log

        if (!files) {
            console.log('No files provided.'); // Added console log
            const message = await messageController.getMessage('Empty_Error');
            return { messageType: 'Empty_Error', message }; 
        }   

        console.log(`File type: ${files.mimetype}`); // Added console log

        if (files.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            console.log('Handling XLSX file...'); // Added console log
            await parsingController.readXLSXFile(files.buffer);
        } else if (files.mimetype === 'application/json') {
            console.log('Handling JSON file...'); // Added console log
            const records = JSON.parse(files.buffer.toString());
            for (const record of records) {
                try {
                    const result = await transactionController.addTransaction(record);
                    console.log(`Transaction added: ${result.message}`); // Added console log
                } catch (error) {
                    console.error('Error adding transaction:', error);
                    const message = await messageController.getMessage('Transaction_Error');
                    return { messageType: 'Transaction_Error', message }; 
                }
            }
        } else {
            console.log('Unsupported file type.'); // Added console log
            const message = await messageController.getMessage('Unsupported_Error');
            return { messageType: 'Unsupported_Error', message }; 
        }
    } catch (error) {
        console.error('Error processing file:', error);
        const message = await messageController.getMessage('Server_Error');
        return { messageType: 'Server_Error', message }; 
    }
  }
};

export default transactionImportController;