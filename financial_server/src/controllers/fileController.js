import sequelize from "../services/connectionService.js";
import crypto from 'crypto';
import messageController from '../controllers/messageController.js';

const fileController = {
    createFileData: (file) => {
        console.log('Creating file medta data...');
        const fileData = {
            filename: file.originalname,
            filesize: file.size,
            mediatype: file.mimetype,
            encoding: file.encoding,
            isprocessed: false,
            importdate: new Date().toLocaleDateString()
        };
        fileData.filehash = crypto.createHash('sha256').update(file.buffer).digest('hex');
        return fileData;
    },

    generateFileHash: (fileBuffer) => {
        console.log('Generating file hash...'); // Added console log
        return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    },
        
    addFile: async (fileData) => {
        console.log('Checking for existing file...');
        const [existingFile] = await sequelize.query('EXEC sp_CheckFile @filehash = :filehash', {
            replacements: { filehash: fileData.filehash },
            type: sequelize.QueryTypes.SELECT
        });

      if (existingFile) {
        console.log('File already exists.');
        const message = await messageController.getMessage('Duplication_Error');
        return { messageType: 'Duplication_Error', message };
    }

    try {
        console.log('Adding new file...');
        const [results] = await sequelize.query('EXEC sp_AddFile @filename = :filename, @filesize = :filesize, @importdate = :importdate, @filehash = :filehash, @mediatype = :mediatype, @encoding = :encoding, @isprocessed = :isprocessed', {
            replacements: fileData,
            type: sequelize.QueryTypes.INSERT
        });
        return results;
        
    } catch (error) {
        console.error('Error adding file:', error);
        const message = await messageController.getMessage('Server_Error');
        return { messageType: 'Server_Error', message };
    }
},
    
    deleteFile: async (hash) => {
        try {
            console.log(`Deleting file with hash: ${hash}`); // Added console log
            await sequelize.query('EXEC sp_DeleteFile @filehash = :filehash', {
                replacements: { filehash: hash }
            });
        } catch (error) {
            const message = await messageController.getMessage('Delete_Error');
            console.error('Error fetching error message:', error);
            return { messageType: 'Delete_Error', message }; 
        }
    }
};

export default fileController;