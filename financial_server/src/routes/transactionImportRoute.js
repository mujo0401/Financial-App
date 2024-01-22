import express from 'express';
import fileController from '../controllers/fileController.js';
import transactionImportController from '../controllers/descriptionController.js';
import messageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await transactionImportController.importData(req.body);
        const message = await messageController.getMessage('File_Success');
        return { messageType: 'File_Success', message }; 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:hash', async (req, res) => {
    try {
        const hash = req.params.hash;
        const result = await fileController.deleteFile(hash); 
        if (result.deletedCount === 0) {
            const message = await messageController.getMessage('Delete_Error');
            return { messageType: 'Delete_Error', message }; 
        }
        const message = await messageController.getMessage('Delete_Success');
        return { messageType: 'Delete_Success', message }; 
    } catch (error) {
        const message = await messageController.getMessage('Server_Error');
        return { messageType: 'Server_Error', message }; 
    }
});

export default router;

