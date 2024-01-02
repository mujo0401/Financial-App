import connect from "../services/connectionService.js";
import crypto from 'crypto';

const fileController = {
    generateFileHash: (fileBuffer) => {
        return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    },

    getFile: async (hash) => {
        try {
            const [files] = await connect.query('EXEC sp_GetFileByHash @fileHash = :hash', {
                replacements: { hash },
                type: sequelize.QueryTypes.SELECT
            });
            return files[0];
        } catch (error) {
            throw new Error('Error fetching files: ' + error.message);
        }
    },

    importFile: async (fileData) => {
        try {
            // Generate file hash
            const fileHash = fileController.generateFileHash(fileData.buffer);

            // Update fileData with the generated hash
            fileData.fileHash = fileHash;

            // Call the stored procedure to import the file
            await connect.query('EXEC sp_ImportFile @filename = :filename, @filesize = :filesize, @importdate = :importdate, @fileHash = :fileHash, @mediatype = :mediatype, @encoding = :encoding, @path = :path, @isprocessed = :isprocessed', {
                replacements: fileData
            });

            return fileData; // Returning the file data including the new hash
        } catch (error) {
            throw new Error('Error importing file: ' + error.message);
        }
    },

    deleteFile: async (hash) => {
        try {
            await connect.query('EXEC sp_DeleteFileByHash @fileHash = :hash', {
                replacements: { hash }
            });
            // You can return the result or a confirmation message
        } catch (error) {
            throw new Error('Error deleting file: ' + error.message);
        }
    }
};

export default fileController;