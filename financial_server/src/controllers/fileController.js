import sequelize from "../services/connectionService.js";
import crypto from 'crypto';

const fileController = {
    generateFileHash: (fileBuffer) => {
        return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    },

    getFile: async (fileHash) => {
        try {
            const [files] = await sequelize.query('EXEC sp_GetFile @fileHash = :fileHash', {
                replacements: { fileHash },
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
            await sequelize.query('EXEC sp_ImportFile @filename = :filename, @filesize = :filesize, @importdate = :importdate, @fileHash = :fileHash, @mediatype = :mediatype, @encoding = :encoding, @path = :path, @isprocessed = :isprocessed', {
                replacements: { fileData }
            });

            return fileData; // Returning the file data including the new hash
        } catch (error) {
            throw new Error('Error importing file: ' + error.message);
        }
    },

    deleteFile: async (hash) => {
        try {
            await sequelize.query('EXEC sp_DeleteFile @fileHash = :hash', {
                replacements: { hash }
            });
            // You can return the result or a confirmation message
        } catch (error) {
            throw new Error('Error deleting file: ' + error.message);
        }
    }
};

export default fileController;