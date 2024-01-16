import sequelize from "../services/connectionService.js";
import crypto from 'crypto';

const fileController = {
    generateFileHash: (fileBuffer) => {
        return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    },
        
    addFile: async (fileData) => {
        try {
            // Check if fileData.filehash is truthy
            if (!fileData.filehash) {
                throw new Error('File hash is missing or invalid');
            }
    
            // Check if a file with the same hash already exists
            const [existingFile] = await sequelize.query('EXEC sp_CheckFile @filehash = :filehash', {
                replacements: { filehash: fileData.filehash },
                type: sequelize.QueryTypes.SELECT
            });
    
            if (existingFile && existingFile.length > 0) {
                return existingFile;
                // Handle existing file (skip insertion, update record, etc.)
            } else {
                // Insert the new file
                const [results] = await sequelize.query('EXEC sp_AddFile @filename = :filename, @filesize = :filesize, @importdate = :importdate, @filehash = :filehash, @mediatype = :mediatype, @encoding = :encoding, @isprocessed = :isprocessed', {
                    replacements: fileData,
                    type: sequelize.QueryTypes.INSERT
                   
                });
                return results
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteFile: async (hash) => {
        try {
            await sequelize.query('EXEC sp_DeleteFile @filehash = :filehash', {
                replacements: { filehash: hash }
            });
        } catch (error) {
            throw new Error('Error deleting file: ' + error.message);
        }
    }
};

export default fileController;
