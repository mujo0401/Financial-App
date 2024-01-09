
import parsingController from './parsingController.js';
import transactionController from './transactionController.js';

const transactionImportController = {
  importData: async (files) => {
    if (!files) {
        throw new Error('No file provided');
    }

    try {
        if (files.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Handle XLSX file
            await parsingController.readXLSXFile(files.buffer);
        } else if (files.mimetype === 'application/json') {
            // Handle JSON file
            const records = JSON.parse(file.buffer.toString());
            for (const record of records) {
                try {
                  const result = await transactionController.addTransaction(record);
                  console.log(result.message); 
                } catch (error) {
                  console.error('Error adding transaction:', error);
                }
            }
        } else {
            throw new Error('Unsupported file type');
        }
    } catch (error) {
        console.error('Error processing file:', error);
    }
  }
};

export default transactionImportController;