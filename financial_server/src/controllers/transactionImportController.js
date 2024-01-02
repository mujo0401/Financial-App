import connect from '../services/connectionService.js';
import parsingController from './parsingController.js';

const transactionImportController = {
  importData: async (file) => {
    if (!file) {
        throw new Error('No file provided');
    }

    try {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // Handle XLSX file
            await parsingController.readXLSXFile(file.buffer);
        } else if (file.mimetype === 'application/json') {
            // Handle JSON file
            const records = JSON.parse(file.buffer.toString());
            for (const record of records) {
                // Call the stored procedure for each record
                await connect.query('EXEC sp_InsertTransaction @field1 = :field1, @field2 = :field2, ...', {
                    replacements: record
                });
            }
        } else {
            throw new Error('Unsupported file type');
        }
        return 'File processed successfully';
    } catch (error) {
        throw new Error('Error processing file: ' + error.message);
    }
  }
};

export default transactionImportController;